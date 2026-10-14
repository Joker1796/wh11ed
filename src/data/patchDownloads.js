// Files to download for an update on the patch notes page, by update id — today the points PDF
// (scripts/gen-points-pdf.mjs, `npm run points:pdf`), built by hand after a points update and
// uploaded by the owner to Yandex Disk (Google Drive from 981 on). Hand-written on purpose: src/data/patches/ is generated,
// and a link is not something the data history knows. A new update gets a line here once its
// files are up; an older one keeps its own, so each update links to the prices it introduced.
export const patchDownloads = {
  981: {
    points: {
      ru: { url: 'https://drive.google.com/file/d/1f4N1fRMdwBrAM1I31YkPwkE0L4df2eGq/view?usp=sharing', size: '1,3 МБ' },
      en: { url: 'https://drive.google.com/file/d/1CSwEdFTcDGqUJZ9Pb2QmDJVLhEyu_Agn/view?usp=sharing', size: '1.3 MB' },
    },
  },
  972: {
    points: {
      ru: { url: 'https://disk.yandex.ru/i/i7E_l2Zl1mP-yw', size: '1,3 МБ' },
      en: { url: 'https://disk.yandex.ru/i/WDD-FMMe8OPpcg', size: '1.3 MB' },
    },
  },
  963: {
    points: {
      ru: { url: 'https://disk.yandex.ru/i/MQsr6J-j3VyLOA', size: '1,4 МБ' },
      en: { url: 'https://disk.yandex.ru/i/ovgOwM0x2KiWAg', size: '1.6 MB' },
    },
  },
}
