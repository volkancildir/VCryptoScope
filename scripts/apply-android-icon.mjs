import { mkdir, readFile, writeFile } from "node:fs/promises";

const root = "android/app/src/main/res";
const packageName = "com.volkancildir.vcryptoscope";
const colors = [
  { name: "turquoise", hex: "#53E0E5" },
  { name: "blue", hex: "#7D9CFF" },
  { name: "green", hex: "#31D6A0" },
  { name: "gold", hex: "#F2C66D" },
];
const nl = "\n";

for (const dir of [
  root + "/drawable",
  root + "/mipmap-anydpi-v26",
  root + "/values",
  "android/app/src/main/java/" + packageName.replaceAll(".", "/"),
]) await mkdir(dir, { recursive: true });

function vector(color) {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="512" android:viewportHeight="512">',
    '  <path android:pathData="M65,110 L175,390 L285,110 L365,220 L455,45" android:fillColor="#00000000" android:strokeColor="' + color + '" android:strokeWidth="26" android:strokeLineCap="round" android:strokeLineJoin="round"/>',
    '  <path android:pathData="M285,97 m-13,0 a13,13 0,1,0 26,0 a13,13 0,1,0 -26,0" android:fillColor="#FFFFFF"/>',
    '  <path android:pathData="M365,207 m-13,0 a13,13 0,1,0 26,0 a13,13 0,1,0 -26,0" android:fillColor="#FFFFFF"/>',
    '</vector>',
    ''
  ].join(nl);
}
function adaptive(colorName) {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">',
    '  <background android:drawable="@color/ic_launcher_background"/>',
    '  <foreground android:drawable="@drawable/ic_launcher_foreground_' + colorName + '"/>',
    '</adaptive-icon>',
    ''
  ].join(nl);
}
for (const item of colors) {
  await writeFile(root + "/drawable/ic_launcher_foreground_" + item.name + ".xml", vector(item.hex));
  await writeFile(root + "/mipmap-anydpi-v26/ic_launcher_" + item.name + ".xml", adaptive(item.name));
}
await writeFile(root + "/drawable/ic_launcher_foreground.xml", vector(colors[0].hex));
await writeFile(root + "/mipmap-anydpi-v26/ic_launcher.xml", adaptive(colors[0].name));
await writeFile(root + "/mipmap-anydpi-v26/ic_launcher_round.xml", adaptive(colors[0].name));

const backgroundPath = root + "/values/ic_launcher_background.xml";
let background;
try { background = await readFile(backgroundPath, "utf8"); }
catch {
  background = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<resources>',
    '  <color name="ic_launcher_background">#102A56</color>',
    '</resources>',
    ''
  ].join(nl);
}
if (background.includes('name="ic_launcher_background"')) {
  background = background.replace(/(<color\s+name="ic_launcher_background"\s*>)[\s\S]*?(<\/color>)/, '$1#102A56$2');
} else {
  background = background.replace(/<resources([^>]*)>/, (_, attrs) => '<resources' + attrs + '>' + nl + '  <color name="ic_launcher_background">#102A56</color>');
}
await writeFile(backgroundPath, background);

const javaDir = "android/app/src/main/java/" + packageName.replaceAll(".", "/");
await writeFile(javaDir + "/MainActivity.java", [
  "package " + packageName + ";",
  "",
  "import android.os.Bundle;",
  "import com.getcapacitor.BridgeActivity;",
  "",
  "public class MainActivity extends BridgeActivity {",
  "    @Override",
  "    public void onCreate(Bundle savedInstanceState) {",
  "        super.onCreate(savedInstanceState);",
  "        IconRotation.updateIcon(this);",
  "        IconRotation.schedule(this);",
  "    }",
  "}",
  ""
].join(nl));

await writeFile(javaDir + "/IconRotation.java", [
  "package " + packageName + ";",
  "",
  "import android.app.AlarmManager;",
  "import android.app.PendingIntent;",
  "import android.content.ComponentName;",
  "import android.content.Context;",
  "import android.content.Intent;",
  "import android.content.pm.PackageManager;",
  "",
  "public final class IconRotation {",
  "    private static final long SIX_HOURS_MS = 6L * 60L * 60L * 1000L;",
  "    private static final String[] ALIASES = {",
  '        ".MainActivityTurquoise", ".MainActivityBlue", ".MainActivityGreen", ".MainActivityGold"',
  "    };",
  "    private IconRotation() {}",
  "    public static void updateIcon(Context context) {",
  "        int slot = (int) ((System.currentTimeMillis() / SIX_HOURS_MS) % ALIASES.length);",
  "        PackageManager pm = context.getPackageManager();",
  "        for (int i = 0; i < ALIASES.length; i++) {",
  "            ComponentName component = new ComponentName(context.getPackageName(), context.getPackageName() + ALIASES[i]);",
  "            pm.setComponentEnabledSetting(component,",
  "                i == slot ? PackageManager.COMPONENT_ENABLED_STATE_ENABLED : PackageManager.COMPONENT_ENABLED_STATE_DISABLED,",
  "                PackageManager.DONT_KILL_APP);",
  "        }",
  "    }",
  "    public static void schedule(Context context) {",
  "        AlarmManager alarm = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);",
  "        if (alarm == null) return;",
  "        Intent intent = new Intent(context, IconRotationReceiver.class);",
  "        PendingIntent pending = PendingIntent.getBroadcast(context, 6142, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);",
  "        long nextBoundary = ((System.currentTimeMillis() / SIX_HOURS_MS) + 1L) * SIX_HOURS_MS;",
  "        alarm.setInexactRepeating(AlarmManager.RTC, nextBoundary, SIX_HOURS_MS, pending);",
  "    }",
  "}",
  ""
].join(nl));

await writeFile(javaDir + "/IconRotationReceiver.java", [
  "package " + packageName + ";",
  "",
  "import android.content.BroadcastReceiver;",
  "import android.content.Context;",
  "import android.content.Intent;",
  "",
  "public class IconRotationReceiver extends BroadcastReceiver {",
  "    @Override",
  "    public void onReceive(Context context, Intent intent) {",
  "        IconRotation.updateIcon(context);",
  "    }",
  "}",
  ""
].join(nl));

const manifestPath = "android/app/src/main/AndroidManifest.xml";
let manifest = await readFile(manifestPath, "utf8");
if (!manifest.includes(".MainActivityTurquoise")) {
  const mainNameIndex = manifest.indexOf('android:name=".MainActivity"');
  const start = mainNameIndex < 0 ? -1 : manifest.lastIndexOf("<activity", mainNameIndex);
  if (start < 0) throw new Error("Could not find MainActivity in AndroidManifest.xml");
  const end = manifest.indexOf("</activity>", start);
  if (end < 0) throw new Error("Could not find MainActivity closing tag");
  let activity = manifest.slice(start, end + "</activity>".length);
  const launcherFilter = /<intent-filter>\s*<action android:name="android.intent.action.MAIN"\s*\/>\s*<category android:name="android.intent.category.LAUNCHER"\s*\/>\s*<\/intent-filter>/;
  if (!launcherFilter.test(activity)) throw new Error("Could not find MainActivity launcher intent filter");
  activity = activity.replace(launcherFilter, "");
  manifest = manifest.slice(0, start) + activity + manifest.slice(end + "</activity>".length);
  const aliases = colors.map((item, index) => {
    const cap = item.name[0].toUpperCase() + item.name.slice(1);
    return [
      '        <activity-alias android:name=".MainActivity' + cap + '" android:targetActivity=".MainActivity"',
      '            android:label="@string/app_name" android:icon="@mipmap/ic_launcher_' + item.name + '"',
      '            android:roundIcon="@mipmap/ic_launcher_' + item.name + '" android:enabled="' + (index === 0 ? "true" : "false") + '" android:exported="true">',
      '            <intent-filter>',
      '                <action android:name="android.intent.action.MAIN" />',
      '                <category android:name="android.intent.category.LAUNCHER" />',
      '            </intent-filter>',
      '        </activity-alias>'
    ].join(nl);
  }).join(nl);
  const receiver = [
    '        <receiver android:name=".IconRotationReceiver" android:enabled="true" android:exported="false" />'
  ].join(nl);
  manifest = manifest.replace("</application>", aliases + nl + receiver + nl + "    </application>");
  await writeFile(manifestPath, manifest);
}
console.log("Applied four VCryptoScope launcher icon colors and six-hour rotation.");
