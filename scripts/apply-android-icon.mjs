import { mkdir, readFile, writeFile } from "node:fs/promises";

const root = "android/app/src/main/res";
const dirs = [
  `${root}/drawable`,
  `${root}/mipmap-anydpi-v26`,
  `${root}/values`,
];
for (const dir of dirs) await mkdir(dir, { recursive: true });

const foreground = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp" android:height="108dp"
    android:viewportWidth="512" android:viewportHeight="512">
    <path android:pathData="M65,110 L175,390 L285,110 L365,220 L455,45"
        android:fillColor="#00000000" android:strokeColor="#53E0E5"
        android:strokeWidth="26" android:strokeLineCap="round" android:strokeLineJoin="round"/>
    <path android:pathData="M285,97 m-13,0 a13,13 0,1,0 26,0 a13,13 0,1,0 -26,0"
        android:fillColor="#FFFFFF"/>
    <path android:pathData="M365,207 m-13,0 a13,13 0,1,0 26,0 a13,13 0,1,0 -26,0"
        android:fillColor="#FFFFFF"/>
</vector>
`;
const adaptive = (round = false) => `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`;
await writeFile(`${root}/drawable/ic_launcher_foreground.xml`, foreground);
await writeFile(`${root}/mipmap-anydpi-v26/ic_launcher.xml`, adaptive());
await writeFile(`${root}/mipmap-anydpi-v26/ic_launcher_round.xml`, adaptive(true));
const backgroundPath = `${root}/values/ic_launcher_background.xml`;
let background;
try { background = await readFile(backgroundPath, "utf8"); }
catch { background = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#102A56</color>\n</resources>\n`; }
if (background.includes('name="ic_launcher_background"')) {
  background = background.replace(/(<color\s+name="ic_launcher_background"\s*>)[\s\S]*?(<\/color>)/, '$1#102A56$2');
} else {
  background = background.replace(/<resources([^>]*)>/, (_, attrs) => `<resources${attrs}>\n    <color name="ic_launcher_background">#102A56</color>`);
}
await writeFile(backgroundPath, background);
console.log("Applied VCryptoScope adaptive launcher icon resources.");
