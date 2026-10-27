import { describe, it, expect } from 'vitest'
import { detectInAppBrowser } from './useInstallPrompt.js'

// Agents as they arrive in reports; the first is the player's 2e0b0999 (2026-10-27), whose
// "Install app" did nothing.
const IN_APP = {
  'Yandex app': 'Mozilla/5.0 (Linux; arm_64; Android 16; 2312FPCA6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.7680.70 YaSearchBrowser/26.44.1 BroPP/1.0 YaSearchApp/26.44.1 webOmni Mobile Safari/537.36',
  'Android WebView': 'Mozilla/5.0 (Linux; Android 14; SM-A546B Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36',
  Instagram: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Instagram 350.0.0.0',
  Facebook: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/480.0.0.0;]',
}
const BROWSERS = {
  Chrome: 'Mozilla/5.0 (Linux; Android 16; 2312FPCA6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36',
  'Yandex Browser': 'Mozilla/5.0 (Linux; arm_64; Android 16; 2312FPCA6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 YaBrowser/26.10.0.0 Mobile Safari/537.36',
  'Samsung Internet': 'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36',
  'desktop Chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
}

describe('detectInAppBrowser', () => {
  for (const [name, ua] of Object.entries(IN_APP)) {
    it(`sends the player to a browser from the ${name}`, () => expect(detectInAppBrowser(ua)).toBe(true))
  }
  for (const [name, ua] of Object.entries(BROWSERS)) {
    it(`keeps the button in ${name}`, () => expect(detectInAppBrowser(ua)).toBe(false))
  }
})
