import importlib.util
import pathlib
import tempfile
import unittest
from unittest.mock import patch


spec = importlib.util.spec_from_file_location('scrape_mfm', pathlib.Path(__file__).with_name('scrape-mfm.py'))
scrape = importlib.util.module_from_spec(spec)
spec.loader.exec_module(scrape)

HEAD = '<div class="font-bold text-xl text-white">UNIT</div><template id="P:2e"></template>'
COMPLETE = HEAD + '<script>$RS("S:2e","P:2e")</script></body></html>'


class DownloadTest(unittest.TestCase):
    def test_incomplete_stream_is_retried(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(scrape, 'CACHE', directory), \
             patch.object(scrape.time, 'sleep'), patch.object(scrape.sys, 'argv', ['scrape-mfm.py']):
            responses = iter([HEAD, COMPLETE])

            def curl(args):
                pathlib.Path(args[args.index('-o') + 1]).write_text(next(responses))
                return type('Result', (), {'returncode': 0})()

            with patch.object(scrape.subprocess, 'run', side_effect=curl) as run:
                self.assertEqual(pathlib.Path(scrape.download('grey-knights')).read_text(), COMPLETE)
                self.assertEqual(run.call_count, 2)

    def test_missing_reveal_and_failed_curl_are_rejected(self):
        self.assertFalse(scrape.complete_page(HEAD + '</body></html>'))
        self.assertTrue(scrape.complete_page(COMPLETE))
        with tempfile.TemporaryDirectory() as directory, patch.object(scrape, 'CACHE', directory), \
             patch.object(scrape.time, 'sleep'), patch.object(scrape.sys, 'argv', ['scrape-mfm.py']):
            def failed_curl(args):
                pathlib.Path(args[args.index('-o') + 1]).write_text(COMPLETE)
                return type('Result', (), {'returncode': 18})()

            with patch.object(scrape.subprocess, 'run', side_effect=failed_curl) as run:
                with self.assertRaises(SystemExit):
                    scrape.download('grey-knights')
                self.assertEqual(run.call_count, 8)


if __name__ == '__main__':
    unittest.main()
