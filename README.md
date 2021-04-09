# Introduction

The application is developed using React Native which is a Javascript framework for creating cross-platform mobile applications (IOS & Android).

# Environment Setup

1.  Install Node JS, preferably 10.19.0 or greater. Make sure it is accessible globally by adding environmental variable to the system environment, if not done by default during the setup.
2.  Install expo-cli using `npm install -g expo-cli` command.
3.  Recommended code-editor: `Visual Studio Code`

# Development Guidelines

1.  Traverse to the project directory and run `npm install` to install all the project specific dependencies and libraries.
2.  Run `expo start` to start a local dev server for the app which can be used to run the application on Android, IOS or Web Browser. Any modifications in the code are reflected in the emulator, in real time.
    1.  `expo start --web` \- Start a Webpack dev server for the web app
    2.  `expo start --android` \- Opens your app in Expo client on a connected Android device
    3.  `expo start --ios` \- Opens your app in Expo client in a currently running iOS simulator on your computer
3.  Run `expo build:android` to build and sign a standalone APK or App Bundle for the Google Play Store
4.  Run `expo build:ios` to build and sign a standalone IPA for the Apple App Store
5.  Run `expo build:web` to build the web app for production

```
assets/
    Asset files such as images and logos
components/
    Files which include code of Individual components such as buttons and card layouts
node_modules/
    Files related to dependencies and libraries
navigation/
    Files which include code of Navigators
screens/
    Files which include code of Individual Screens
.env
    Contains critical information such as secret keys and passwords
.gitignore
    Information about the files that should be ignored by git such as .env
app.json
    Expo specific configuration file for generating bundles and run time binaries
App.tsx
    Entry File
babel.config.js
    Project wide configuration details
package.json
    Metadata about the project specific components such as applications, modules and packages etc
tsconfig.json
    Specifies the root files and the compiler options required to compile the project.
```

# Versioning

Versions of different dependencies and libraries during the development which are liable to modification according to the developer's discretion.

- React - 16.13.1
- React Native - 0.63.4
- Expo - 39.0.2
- TypeScript - 3.9.5
- Bable Core - 7.9.0
- React DOM - 16.13.1
test