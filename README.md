# VCryptoScope

VCryptoScope is a Turkish-language crypto-market dashboard with a treemap, coin list, technical analysis and market-news pages.

## Web app
The existing GitHub Pages site remains the web version. Main pages are `index.html`, `analysis.html`, and `news.html`.

## Android foundation
The repository includes a Capacitor-based Android wrapper foundation:
- App ID: `com.volkancildir.vcryptoscope`
- App name: `VCryptoScope`
- Web assets are copied to `www/` by `npm run build:web`.
- `npm run android:sync` prepares assets and synchronizes an existing Android project.
- GitHub Actions can generate an Android project and build a **debug APK** for testing.

A debug APK is not a Play Store release. A release requires a stable package ID, a signed Android App Bundle (AAB), a Play Console developer account, testing, store listing assets, Data safety declarations and a privacy policy.

## Local Android development
Requirements: Node.js 22+, Android Studio and the Android SDK.
1. `npm install`
2. `npm run build:web`
3. `npx cap add android` (only the first time)
4. `npx cap sync android`
5. `npx cap open android`

## Ads and monetization roadmap
Ads are **not integrated yet**. Before release, register the app in AdMob, add the real AdMob application/ad-unit IDs (never use real IDs for development tests), implement Google's UMP consent/privacy-options flow as applicable, and update the privacy policy and Play Console Data safety/ads declarations. Google recommends requesting updated consent information on each app launch and only requesting ads when consent rules allow it. See [AdMob privacy/consent docs](https://developers.google.com/admob/android/privacy) and [Play Console review checklist](https://support.google.com/googleplay/android-developer/answer/9859455).

## Privacy
The current draft is available at [Gizlilik Politikası](https://volkancildir.github.io/VCryptoScope/privacy.html). Review and update it before public release to match the final SDKs and data handling.

## Market data
The app may call public market/news APIs. API availability, rate limits, CORS and third-party terms may affect some features. Technical indicators and price scenarios are informational and are not guarantees or personalized investment advice.
