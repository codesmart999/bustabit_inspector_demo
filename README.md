# Bustabit Crash Value Inspector

This is written in chrome extension with webpack and typescript.

## Getting Started

1. Clone this repository

```bash
    git clone https://github.com/codesmart999/bustabit_inspector_demo.git
```

3. Run `npm install`
4. Run `npm run build`
5. Open chrome and go to `chrome://extensions`
6. Enable developer mode
7. Click on `Load unpacked` and select the `dist` folder
8. You should see the extension in your chrome browser
9. Make changes to the code and run `npm run build` to see the changes

## Directories and Files

- `public/` > You can put your static files here. They will be copied to the `dist` folder.
  - `manifest.json` > This is the manifest file for your chrome extension. You can change the name, description,
    icons, permissions, etc. here.
  - `[size].png` > These are the icons for your chrome extension. You can change them here.
- `src/` > Your codes in typescript must be in here.
  - `background.ts` > This is the background script for your chrome extension.
  - `content.ts` > You can manipulate the DOM of the current tab here.
  - `utils/` > You can put your utility functions here.
  - `types.ts` > You can put your types here. **I recommend use TypeSafe for actions like messaging between
    background.ts and content.ts.**

## Commands

```bash
    # Build the extension
    npm run build

    # Build the extension and watch for changes
    npm run start
```

## Recommendations

- Open a new tab and go to `chrome://extensions` and don't close this tab when developing.
- Start your development server with `npm run start`.
- When you make changes to your code, the dist folder will be updated. In the extensions tab, click on `Reload Icon` to
  see the changes.
- When you are done with your development, run `npm run build` to build the extension. You can then upload the `dist`
  folder to the chrome web store.

## Roadmap

- Babel Support
- SasS Support
