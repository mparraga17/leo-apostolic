# 📚 Learnings — Leo Look Up

A guide to mistakes made, good calls, and traps avoided while building and shipping the app. Written for my future self and for anyone tackling a similar project.

---

## 1. Initial setup and stack choice

### ❌ Starting with Swift without checking Xcode first
**The mistake:** I started the project in SwiftUI before checking whether my Mac supported the current version of Xcode. It didn't.

**The lesson:** Before picking a tech stack, verify with a Hello World that **the whole toolchain works** on your machine (compiler, simulator, debugger, IDE). If you don't have a supported Mac, Swift is off the table.

**What we did instead:** pivot to React Native + Expo, which can be developed on Windows.

---

### ✅ React Native + Expo SDK 54 with strict TypeScript
**Good call:** Expo Managed Workflow saves hours of native setup (Xcode, gradle). EAS Build removes the need to own a Mac. Strict TypeScript catches ~80% of bugs before runtime.

**For the future:** this stack is the winner if you don't have a Mac and want iOS+Android from a single codebase.

---

## 2. Native modules in Expo Go = trap

### ❌ Installing `react-native-google-mobile-ads` in Expo Go
**The mistake:** I tried to integrate AdMob while the app ran in Expo Go. AdMob is a native module. Expo Go is a fixed app that can't accept new native modules. The install left residue in `node_modules` and `app.json` that broke the bundle. I ended up creating a fresh Expo project and copying the code over.

**The lesson:**
- **Expo Go only accepts the modules it already ships with.**
- Any new native module (`expo-notifications`, `expo-haptics`, `react-native-google-mobile-ads`, maps, etc.) requires a **Development Build**.
- If you have to install one and your app runs in Expo Go, **wait until you have a Development Build**.

**Rule of thumb:** if a package pulls in `expo-modules-core` or has a `"plugins"` section to add to `app.json`, it's native → it won't work in Expo Go.

---

### ✅ Make a Development Build as early as possible
Once I knew I'd add notifications, haptics, i18n with expo-localization → first Development Build with EAS. From there any native module goes in without drama (another 20-min build and done).

---

## 3. Common Development Build errors

### ❌ Forgetting to install `expo-font` before a build with `@expo/vector-icons`
**The mistake:** The first Development Build threw `Cannot find native module 'ExpoFontLoader'`. Cause: `@expo/vector-icons` needs `expo-font` underneath, but Expo doesn't install it automatically.

**The lesson:** when you use vector icons or any library that uses custom fonts, **`expo-font` must be declared**. `npx expo install expo-font` fixes it.

---

### ❌ Forgetting `expo-notifications` in the build when it's already in code
**The mistake:** After adding the notifications service to the code, I opened the app on the iPhone (running an old build) → `Cannot find native module 'ExpoPushTokenManager'`.

**The lesson:** **any new native module in code requires a new build**. Refresh/reload won't do it.

**Correct workflow:**
1. Install the module: `npx expo install <module>`
2. Write the code that uses it
3. **New build** and reinstall on device
4. Only then test

---

## 4. Git in Expo projects

### ❌ `.gitignore` rule `data/` that also ignores `src/data/`
**The mistake:** To keep the research-notes folder `data/` out of the public repo, I wrote `data/` without a leading slash. That ignores `data/` **in any subdirectory**, so it also hid `src/data/` (prayers, events, places, etc.). For the whole session the data files weren't being pushed to GitHub. If something had happened to the laptop, I'd have lost them.

**The lesson:** `.gitignore` rules without a leading `/` apply recursively. To limit it to the root, use `/data/`.

```gitignore
# WRONG: ignores data/ anywhere
data/

# RIGHT: ignores only /data/ at the repo root
/data/
```

**How I caught it:** `git commit` said "nothing to commit" when I'd clearly modified files. Useful command to diagnose:
```bash
git check-ignore -v <file-path>
```
It tells you which `.gitignore` rule is excluding the file and on which line.

---

### ✅ Force-push to clean sensitive history
When I found the public repo had references to "Product Manager at Amazon" in the first commit, I did:
1. `Remove-Item -Recurse -Force .git` (wipe local history)
2. `git init`, `git add .`, `git commit -m "Initial commit"`
3. `git push --force` to rewrite the remote

Result: a single clean commit, no trace of the problematic text.

---

### ❌ Pushing the repo as private and then trying to use GitHub Pages
**The mistake:** GitHub Pages requires public repos on the Free plan.

**The lesson:** decide up front whether the repo will be public or you're willing to pay GitHub Pro ($4/mo). If you want free GitHub Pages → public repo from day 1.

---

## 5. EAS Build and Expo Cloud

### ❌ Running Expo commands from the wrong folder
**The mistake:** Multiple times I ran `npx expo start` or `eas build` from `C:\Users\parrallo` or `APP_Training` instead of inside `LeonApostolico`. Result: "package.json does not exist" or "Run this command inside a project directory".

**The lesson:** **always** make sure you're inside the project folder before any Expo command:

```bash
cd C:\Users\parrallo\Desktop\APP_Training\LeonApostolico
```

In Kiro, every new terminal starts at the workspace root. Each new tab → repeat the `cd`.

---

### ❌ Thinking a development build works for production
It doesn't. They're **different** builds:

| Type | Purpose | Installs on |
|---|---|---|
| `--profile development` | Development + Hot Reload + Expo client | iPhone via URL |
| `--profile preview` | Internal beta with no Metro server | iPhone via URL |
| `--profile production` | For App Store / TestFlight | TestFlight, App Store |

Development includes `expo-dev-client` and needs `expo start` running on the laptop. Production is self-contained (bundles all the JS).

**Rule:** to ship to the App Store → **production profile**. Always.

---

### ❌ Not knowing that changing the marketing name requires a new build
**The mistake:** I assumed we could change the name only in App Store Connect after uploading the `.ipa`. Not so.

**The lesson:**
- The name shown **under the icon on the iPhone** comes from the `.ipa` (`CFBundleDisplayName` in Info.plist, generated from `app.json`).
- The name shown **in the App Store** is edited in App Store Connect.
- Apple compares both during review. If they differ a lot, it rejects under Guideline 4.0.
- **Conclusion:** changing the marketing name = mandatory new build.

**What you CAN change WITHOUT a build:**
- App Store subtitle
- Description
- Keywords
- Screenshots (with OTA in some cases)
- Promotional text

---

### ❌ Starting `eas build` without Git installed
**The mistake:** EAS needs Git to package the code. My system mentioned Git but didn't have it on PATH. Error: "git command not found".

**The lesson:** **before** the first `eas build`, install Git with `winget install Git.Git` or from git-scm.com. Fully restart Kiro so it picks up the PATH.

---

### ❌ Using an old certificate/profile after changing the bundle ID
It didn't happen to us because we kept `com.leoapostolic.app`, but worth knowing:

**If you change the Bundle ID:**
- You lose the certificates signed to the old ID
- You have to redo the whole credentials flow with EAS
- TestFlight loses the previous builds
- It's half a session lost

**That's why when we changed the marketing name, we did NOT change the bundle ID.** The bundle ID is just an "internal license plate" the user never sees.

---

## 6. App Store Connect

### ❌ Uploading screenshots with an alpha channel (RGBA PNG)
**The mistake:** App Store Connect rejected screenshots with "Images can't contain alpha channels or transparencies."

**The lesson:** iPhone screenshots save as PNG-RGBA by default. Apple wants PNG-RGB (no alpha channel).

**Fix (PowerShell):** create the output bitmap with `PixelFormat.Format24bppRgb` instead of the default `Format32bppArgb`. Snippet:

```powershell
$output = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($output)
$g.Clear([System.Drawing.Color]::White)  # fill background in case of padding
$g.DrawImage($src, $offsetX, $offsetY, $scaledW, $scaledH)
$output.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
```

---

### ❌ Screenshots at the newest iPhone's dimensions aren't accepted directly
**The mistake:** The iPhone 16 Pro captures at 1206×2622 px. App Store Connect wants 1242×2688 px (or 1284×2778 px, or 2688×1242 px landscape).

**The lesson:** Apple accepts ONLY a specific set of dimensions per screen category (6.5", 6.7"). **Real iPhone screenshots almost never land exactly on those dimensions.**

**Fix:** resize keeping aspect ratio. Since the difference is <5%, the result looks identical to the human eye.

---

### ✅ Category "Lifestyle" or "Reference", NEVER "Events"
If your app is tied to a specific event (concert, visit, festival), Apple may reject it under Guideline 4.2 (Minimum Functionality). The **Events** category flags you as a one-off event app and raises rejection risk.

**What we applied:**
- Primary category: **Lifestyle**
- Secondary category: **Reference**
- The description positions the app as a "permanent spiritual companion"; the papal visit is "one of the features"

---

### ✅ Notes for the Apple reviewer
Apple reads the "Notes for the review team" field literally. It's the single most important thing to avoid rejection. Use it:
- Clearly explain what the app does
- Justify why it meets the guidelines (especially 4.2 if there's risk)
- List the external links and why they open
- Give a direct contact
- In English — reviewers are mostly English-speaking

---

### ❌ Not marking the Digital Services Act status as Non-trader
**The mistake:** If you leave it unset, App Store Connect blocks submission.

**The lesson:** if you're not a company, mark yourself as **Non-trader**. If you're a company with a tax ID, mark yourself as Trader and you'll have to give a public postal address. For personal free apps → Non-trader.

---

## 7. Internationalization

### ✅ Detect the system language with expo-localization
```typescript
const tags = Localization.getLocales();
const primary = tags?.[0]?.languageCode ?? 'es';
return primary === 'es' ? 'es' : 'en';
```

This logic gracefully falls every other language back to English, keeping only Spanish/English with auto-detection.

---

### ✅ Do NOT translate devotional content when adding bilingual i18n
**Important lesson:** prayer texts, Latin liturgical chants, Pope quotes are **public domain**, but translating them to multiple languages with religious quality requires professional review. For v1.0 we did:
- UI in ES + EN (translatable)
- Devotional content in Spanish only
- Traditional prayers already include their Latin version

This avoids putting mediocre AI translations into sacred texts.

---

### ❌ i18n-js needs lodash as a hidden peer dependency
**The mistake:** After `npm install i18n-js`, Metro failed with `Unable to resolve "lodash/get"`. The package doesn't declare lodash as an explicit dependency.

**The lesson:** `npm install lodash` after installing i18n-js. Restart Metro with `--clear`.

---

## 8. Graphic assets

### ✅ Use an upscaled version of the logo to downsample
When you handed me the original 1254×1254 icon, I upscaled it to 4000×4000 with Nero AI before generating the final versions (1024, 512, 192). Downsampling from high resolution gives much sharper images than scaling up.

**Rule of thumb:**
- Original logo → upscale to 4× the largest final dimension you need
- From there, downsample with InterpolationMode=HighQualityBicubic

---

### ❌ Assuming the logo's rounded corners will match iOS's mask
**The mistake:** The original logo already had rounded corners drawn in. iOS applies its own rounded mask on top → ugly "double rounding".

**The lesson:** iOS icons must be FULL squares, no rounding. iOS rounds automatically. You have to **crop to the inner design area** before exporting to 1024×1024.

---

### ❌ Auto-detecting the bounding box by the gold color only
When I tried to detect where the icon was inside the padded PNG, I looked for gold pixels only. But the icon includes a dark inner area. Result: the bounding box drifted left (where most of the gold was).

**The right approach:** detect everything that's NOT the outer background color (typically a very low RGB sum = near black). That captures the whole icon, not just a part.

---

## 9. Privacy and legal

### ✅ Privacy policy and T&Cs published BEFORE submitting
Apple requires a public privacy-policy URL. Ours is on GitHub Pages (`mparraga17.github.io/leo-apostolic/privacy-es.html`). Hosting it on GitHub Pages is:
- Free
- Instant
- Lets you edit content without changing the URL
- Bilingual ES/EN

**If your repo is public**, GitHub Pages works out of the box with the `/docs` folder.

---

### ✅ Sign as a natural person in legal docs even if the app has commercial branding
"Pizco Deploy" is a trade name with no legal entity. Under GDPR, the real controller is you as a natural person. That's why the privacy policy / T&Cs show "Manuel Parraga", even though the app and App Store show "Pizco Deploy" as the creator.

---

## 10. UX decisions that paid off

### ✅ Share button on the Pope quote, prayers and events
Each share carries the "— Leo Look Up" signature. Free marketing every time a user shares something on WhatsApp/IG.

### ✅ Haptic feedback when switching tabs
`expo-haptics`. One line of code per tap. Makes the app feel "premium" on iPhone.

### ✅ Cascading splash entry animations
Logo scale + fade, pulsing gold halo, name and tagline arriving with a delay. Cross-fade into the app.

### ✅ "More prayers" as a TouchableOpacity instead of a decorative View
I found it as a user-reported bug. Lesson: any element that LOOKS tappable (chevron, "see more", etc.) **MUST** actually be tappable. Otherwise it's deceptive.

### ✅ "Info" modal with About + credits + contact + share + legal
Standard pattern in professional apps. Better than scattering them around.

---

## 11. The "polish forever" trap

### ❌ Wanting to polish everything before publishing
It's the most common mistake. Every added feature = more time unpublished = the user never gets the app.

**The rule we applied:** v1.0 meets the minimum needed for Apple Review (no AdMob, no experimental features). Everything else → v1.1 via OTA or a new build.

**Mantra:** "perfect is the enemy of good." Apple approves simple, solid apps faster than big apps with risk.

---

## 12. Final publishing pipeline

For future projects, the optimal order:

1. **Apple Developer account ($99/yr)** — first
2. **Free Expo account**
3. **Privacy policy and T&Cs published** (public URL)
4. **Public GitHub repo + GitHub Pages**
5. **App Store Connect: app created with the final bundle ID**
6. **Icons and splash ready in assets/**
7. **Privacy Nutrition Label completed**
8. **Production build** (`eas build --platform ios --profile production`)
9. **Screenshots** resized and WITHOUT an alpha channel
10. **App Store listing filled in**: name, subtitle, description, keywords, copyright, URLs, category, age rating
11. **Digital Services Act** = Non-trader (if you're not a company)
12. **Notes to the reviewer** explaining critical guidelines
13. **Submit with `eas submit --platform ios --latest`**
14. **Attach the build** to version 1.0 in App Store Connect
15. **"Add to review"**
16. **Wait 1–2 days** for Apple's feedback

---

## 13. AdMob, GDPR consent and the "No CMP" problem

### ❌ Shipping ads in the EEA without a consent message (CMP/UMP)
**The mistake:** We shipped the app with AdMob (banners) without having created or published a **GDPR consent message**. It worked for a few days and then banners suddenly stopped showing for EEA/UK/Switzerland users. AdMob showed the restriction **"Consent requirement: No CMP"** and the fill rate collapsed.

**Why it happens:** Google's EU user consent policy requires that, to serve ads (personalized or not) to users in the European Economic Area, the UK and Switzerland, the app gathers consent via a **CMP (Consent Management Platform)**. Google offers one for free: the **"European regulations" message** + the **UMP SDK**. Without it, Google restricts the account automatically.

**The lesson:** if you monetize with AdMob and will have European users, GDPR consent **isn't optional or "for later"**. Set it up BEFORE publishing, not after your fill gets cut.

---

### ❌ Wasting time in the "Settings" tab when the problem was in "Messages"
**The mistake:** The **"Save" button on the GDPR Settings page was greyed out** and I assumed that was the blocker. I tried toggling switches off, reloading, etc. Nothing.

**The real diagnosis:** the greyed-out "Save" simply meant **there were no pending changes** (everything was already saved). The real problem was that in the **"Messages" tab no message had ever been created** — it showed the empty "Just three steps to creating a message" state. Without a published message, the "No CMP" restriction stays active no matter how much you fiddle with Settings.

**The lesson:** in AdMob, **Settings ≠ Messages**. The restriction lifts when there's a **published GDPR message**, not when you save settings. If a "Save/Publish" button is greyed out, the first question is *"is it grey because a required field is missing, or because there's nothing to save?"* instead of fighting it.

---

### ❌ The message's "Publish" button was blocked by a hidden required field
**The mistake:** When creating the message, "Save draft" and "Publish" stayed grey even after I set a name and selected the apps.

**The cause:** the **"Do not consent"** field (User choices) was unset — it showed `Required` with an unselected "Select". Setting it to **On** opens a per-country targeting dialog; you have to **enable the button for all EEA regions** and confirm. Only then do Save/Publish enable.

**The lesson:** when a web form won't save and doesn't say why, scan **every** field for the one marked `Required`/`invalid`. The blocker is almost always a single unfilled required field, not a bug.

---

### ✅ Correct startup order: GDPR → ATT → init AdMob
The UMP SDK integration (`react-native-google-mobile-ads`) must request consent **before** initializing the ads SDK:

```typescript
// 1) GDPR consent (UMP) — first of all
const info = await AdsConsent.requestInfoUpdate({ tagForUnderAgeOfConsent: false });
if (info.status === AdsConsentStatus.REQUIRED && info.isConsentFormAvailable) {
  await AdsConsent.loadAndShowConsentFormIfRequired();
}
// 2) ATT on iOS (wait for AppState 'active' or the dialog is dismissed)
// 3) mobileAds().initialize()
```

Key detail: both the UMP form and the ATT dialog **only show if the app is in the foreground** (`AppState === 'active'`). If you request them during the splash, iOS silently dismisses them and the Apple reviewer never sees them.

---

### ✅ "How does AdMob know it's fixed?" → on its own, automatically
There's no "re-check me" button. Once you publish the GDPR message and integrate the UMP SDK in the build, **AdMob detects the consent signal that starts arriving from real traffic** and **lifts the "No CMP" restriction by itself** (a few hours to a couple of days). All you have to do is publish the message + ship the build with the SDK. Be patient — there's no manual action.

---

### ✅ "Ad unit deployment" OFF when you use the UMP SDK
In the portal, each app has an "Ad unit deployment" toggle for the GDPR message. If you integrate the **UMP SDK in code** (our case), that toggle stays **off**: "ad unit deployment" is the alternative for those who DON'T touch code, and mixing it with the SDK causes conflicts. That said: you do need the **privacy-policy URL** set on each app (it's required before publishing).

---

## 14. Mantras for the future

1. **Don't put native modules in Expo Go.** Wait for the Development Build.
2. **When something fails twice, stop and diagnose the root cause.** Don't patch.
3. **The bundle ID is forever.** Decide it well when creating the project.
4. **Apple rejects event apps.** Always position as permanent.
5. **Apple accepts resized screenshots as long as you keep the aspect ratio.**
6. **PNG without an alpha channel for the App Store.**
7. **The Expo slug can't be changed later** (except by deleting the project).
8. **The marketing name requires a new build if it changes.**
9. **Category Lifestyle, NEVER Events.**
10. **Ship a functional v1.0, iterate with v1.1+ via OTA.**
11. **With AdMob and European users, set up GDPR consent (message + UMP SDK) BEFORE publishing.**
12. **In AdMob, Settings ≠ Messages: the "No CMP" restriction lifts with a published GDPR message, not by saving settings.**
13. **AdMob detects the consent signal on its own and lifts the restriction in hours/days. There's no manual button.**
