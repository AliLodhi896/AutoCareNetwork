fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Ship to App Center.

### ios upload_symbols

```sh
[bundle exec] fastlane ios upload_symbols
```



### ios app_store_upload

```sh
[bundle exec] fastlane ios app_store_upload
```

Upload to App Store

----


## Android

### android build_debug

```sh
[bundle exec] fastlane android build_debug
```

Build the Android application.

### android build_release

```sh
[bundle exec] fastlane android build_release
```

Build a custom variant APK

### android ship_debug_appcenter

```sh
[bundle exec] fastlane android ship_debug_appcenter
```

Ship to App Center

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
