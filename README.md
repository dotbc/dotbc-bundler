# Cardstack Desktop

### Building
In order to build this, you need to be on the platform you want to build for.  E.g., if you want to build for Windows, you need to be on a Windows machine.  If you want to build for Mac, you have to be on a Mac *that has Xcode developer tools installed*.  

Once you are on the right platform, simply run `./scripts/electron/[PLATFORM]/package-dev.sh` and it will build a shareable Electron app.

### Plugins
Custom plugins are supported but currently must be built and bundled with the app and cannot yet be dynamically installed.

Please see this link for documentation on how to build your own plugins:
[INSERT LINK HERE]

### Missing Functionality
The following functionality is desired but currently not implemented:
* Dynamic loading/unloading of plugins at runtime (currently plugins must be shipped with the app and are build-time dependencies)
* Plugin option UIs
