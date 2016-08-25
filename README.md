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



## Legal Stuff

### Overview

The Dot Blockchain Music, Inc. software, tools, and code available on Github (“Tools”) include:

* dotBC Bundler - The main Electron-based desktop app to experiment with the dotBC architecture
* dotBC Plugins - NodeJS adapters to data sources and cloud- or blockchain-based ledgers
* libdotbc - A library written in Rust to read/write to zip-compatible .bc files

### Licensing

The Tools are licensed under the MIT Open Source License.

### No liability and no support.

THE TOOLS ARE PROVIDED AS-IS AND DOT BLOCKCHAIN MUSIC, INC. MAKES NO WARRANTIES WHATSOEVER WITH RESPECT TO THE TOOLS, AND SHALL HAVE NO LIABILITY TO ANY PERSON MAKING USE OF THE TOOLS. THIS IS A FUNDAMENTAL PART OF THE UNDERSTANDING BETWEEN ANY USER AND DOT BLOCKCHAIN MUSIC, INC.  IF YOU DO NOT AGREE, DO NOT DOWNLOAD AND/OR USE THE TOOLS.  THIS README DOCUMENT MUST BE INCLUDED IN ANY FUTURE DISTRIBUTION YOU MAKE OF THE TOOLS.



