# Serein

Serein is a clickable yoga app prototype built with Expo SDK 58, React Native, TypeScript, and Expo Router. The name is French for “calm” or “serene.”

## Run on an Android emulator

You’ll need Node.js 22.13 or newer, npm, and Android Studio with Android SDK Platform-Tools and an Android Virtual Device.

1. In Android Studio, open **Tools → Device Manager** and start a virtual device. If the list is empty, create a device, select a system image, and download it. Wait for the Android home screen.
2. From the project folder, run the following commands in PowerShell:

   ```powershell
   npm.cmd ci
   npx.cmd expo start --android
   ```

3. Expo CLI opens Serein in Expo Go on the emulator and installs a compatible Expo Go version if needed. Keep the terminal running while you use the app. If Metro is already running in an interactive terminal, press **a** there to open the app on Android.

If Expo cannot find your emulator, run `adb devices` and check that the emulator is listed as `device`. If `adb` is unavailable, check that Android SDK Platform-Tools are installed and that the SDK’s `platform-tools` directory is on your Windows `Path`. Open a new terminal after updating it. See the [Expo Android emulator setup guide](https://docs.expo.dev/workflow/android-studio-emulator/).

## Other ways to run

Use these commands from the project folder after installing dependencies:

| Command | Purpose |
| --- | --- |
| `npm run web` | Open the browser preview. |
| `npm run ios` | Open the project on an iOS Simulator with Xcode on macOS. |
| `npm run typecheck` | Check TypeScript without emitting files. |

Use `npm.cmd` in place of `npm` if PowerShell blocks the npm script.

## What to try

- **Today** has a featured practice, a weekly strip, quick sessions, and a mock Foundations program.
- **Explore** lets you search by session title and combine category and duration filters.
- **Practice** starts from any session detail. Toggle the heart, open the dark player, move between poses, and tap **Done** after the final pose to return to Today. The featured practice opens at pose 3 to demonstrate an in-progress session.
- **Progress** shows sample weekly stats and links to recent sessions. **Profile** shows example settings with preview feedback.

Sessions, progress, and artwork are bundled with the app. Filters, favorites, and player controls use temporary screen state. The timer is static, and sound, downloads, and settings are simulated.

## Project structure

| Path | Contents |
| --- | --- |
| `app/_layout.tsx` | Root navigation, fonts, and the branded loading screen. |
| `app/(tabs)/` | Today, Explore, Progress, and Profile. |
| `app/session/[id].tsx` | Session details and pose sequence. |
| `app/player/[id].tsx` | Full-screen player and completion screen. |
| `src/data/mock.ts` | Sessions, poses, program details, and weekly stats. |
| `src/components/` | Shared controls, SVG icons, and abstract placeholder art. |
| `src/theme.ts` | Colors, spacing, radii, and typography. |
| `app.json` | Expo configuration, app name, and deep-link scheme. |
