# dotBC Bundler

### Building
In order to build this, you need to be on the platform you want to build for.  E.g., if you want to build for Windows, you need to be on a Windows machine.  If you want to build for Mac, you have to be on a Mac *that has Xcode developer tools installed*.  

Once you are on the right platform, simply run `./scripts/electron/[PLATFORM]/package-dev.sh` and it will build a shareable Electron app.

### Running and Developing Locally

Ensure you have all required tooling installed. This can easily be done via the required makefile target `make install-tools`. 

<sup><sub>***Note, on Windows systems you can run make via git-bash. If your default install does not include make, [cygwin](http://stackoverflow.com/questions/17710209/how-to-run-make-from-cygwin-environment) and [msysgit](http://stackoverflow.com/questions/3219926/using-make-with-msysgit) versions of the make executable can be found online and copied directly into your /usr/bin directory. Alternatively, you can run the commands called by any make targets directly in your command prompt.</sup></sub>

Install any plugins you would like to include. Some dotbc plugins can be installed via the makefile target `make install-plugins`. Note that plugins are installed to a `.plugins` directory in the `dotbc-bunder` dir. 

To run the bundler application directly in electron, run the npm script `npm run electron`. 

### Plugins
Custom plugins are supported but currently must be built and bundled with the app and cannot yet be dynamically installed.

Current plugins can be installed via the included Makefile, via the `make install-plugins` target, or by executing the same command it executes. See that file for details. 

Please see this link for documentation on how to build your own plugins:
TBD

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



