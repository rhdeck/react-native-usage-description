# react-native-usage-description

Manage usage text for react-native apps to be deployed in IOS

If you use certain sensors and subsystems on iOS, your app will crash if you do not have the usage description set to ask the user for permission to use the system. This plugin allows you to set that text easily from the react-native command line without ever opening Xcode.

## installation

```bash
yarn add -D react-native-usage-description
#or
npm install --save-dev react-native-usage-description
```

## usage

This adds a series of options to the react-native cli

**Note** that the new description is optional for all utilities, allowing the default text to be applied. This is handy for quick development, but you will want to replace the text with something specific to your app before submitting to the app store.

```bash
$ react-native --help
...
  set-photo-library-add-description [descriptionText]         Set Photo Library Add Usage Description (leave blank for default: "This app adds photos to the user's photo library")
  set-photo-library-description [descriptionText]             Set Photo Library Usage Description (leave blank for default: "This app accesses the user's photo library")
  set-camera-description [descriptionText]                    Set Camera Usage Description (leave blank for default: "This app uses the device camera")
  set-location-always-description [descriptionText]           Set Location Always Usage Description (leave blank for default: "This app uses location services all the time")
  set-location-when-in-use-description [descriptionText]      Set Location When In Use Usage Description (leave blank for default: "This app uses location services only when the app is running")
  set-contacts-description [descriptionText]                  Set Contacts Usage Description (leave blank for default: "This app uses the address book")
  set-calendars-description [descriptionText]                 Set Calendars Usage Description (leave blank for default: "This app uses or modifies the user's calendar information")
  set-reminders-description [descriptionText]                 Set Reminders Usage Description (leave blank for default: "This app creates reminders in the Reminders app")
  set-health-share-description [descriptionText]              Set Health Share Usage Description (leave blank for default: "This app uses data from the Health app")
  set-health-update-description [descriptionText]             Set Health Update Usage Description (leave blank for default: "This app provides health information to the Health app")
  set-nfcreader-description [descriptionText]                 Set NFCReader Usage Description (leave blank for default: "This app uses the NFC reader")
  set-bluetooth-peripheral-description [descriptionText]      Set Bluetooth Peripheral Usage Description (leave blank for default: "This app works with Bluetooth devices")
  set-microphone-description [descriptionText]                Set Microphone Usage Description (leave blank for default: "This app uses the device microphone")
  set-siri-description [descriptionText]                      Set Siri Usage Description (leave blank for default: "This app provides a SiriKit Intent")
  set-speech-recognition-description [descriptionText]        Set Speech Recognition Usage Description (leave blank for default: "This app uses speech recognition")
  set-motion-description [descriptionText]                    Set Motion Usage Description (leave blank for default: "This app uses the device motion tracking hardware")
  set-video-subscriber-account-description [descriptionText]  Set Video Subscriber Account Usage Description (leave blank for default: "(tvOS only) This app uses the video subscriber account")
  set-apple-music-description [descriptionText]               Set Apple Music Usage Description (leave blank for default: "This app uses Apple Music integration")
  set-face-idusage-description [descriptionText]              Set Face IDUsage Description (leave blank for default: "This app uses FaceID")
  set-all-usage-descriptions                                  Set all usage descriptions to the default text in this package
```

Note this will apply all descriptions as defaults.
