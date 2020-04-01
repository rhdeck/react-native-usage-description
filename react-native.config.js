const { resolve, join } = require("path");
const { existsSync, readFileSync, readdirSync, writeFileSync } = require("fs");
const plist = require("plist");
const { sync } = require("glob");
var iosPath = resolve(process.cwd(), "ios");
const addText = (key, value) => {
  if (!existsSync(iosPath)) {
    console.error("Could not find ios in ", thisPath, iosPath);
    console.log(readdirSync(thisPath));
    return false;
  }
  const plists = sync(resolve(join(iosPath, "*", "Info.plist")));
  plists.map(path => {
    const source = readFileSync(path, "utf8");
    var o = plist.parse(source);
    o[key] = value;
    const xml = plist.build(o);
    writeFileSync(path, xml);
  });
};

const a = [
  {
    key: "NSPhotoLibraryAddUsageDescription",
    text: "This app adds photos to the user's photo library"
  },
  {
    key: "NSPhotoLibraryUsageDescription",
    text: "This app accesses the user's photo library"
  },
  { key: "NSCameraUsageDescription", text: "This app uses the device camera" },
  {
    key: "NSLocationAlwaysUsageDescription",
    text: "This app uses location services all the time"
  },
  {
    key: "NSLocationWhenInUseUsageDescription",
    text: "This app uses location services only when the app is running"
  },
  { key: "NSContactsUsageDescription", text: "This app uses the address book" },
  {
    key: "NSCalendarsUsageDescription",
    text: "This app uses or modifies the user's calendar information"
  },
  {
    key: "NSRemindersUsageDescription",
    text: "This app creates reminders in the Reminders app"
  },
  {
    key: "NSHealthShareUsageDescription",
    text: "This app uses data from the Health app"
  },
  {
    key: "NSHealthUpdateUsageDescription",
    text: "This app provides health information to the Health app"
  },
  { key: "NFCReaderUsageDescription", text: "This app uses the NFC reader" },
  {
    key: "NSBluetoothPeripheralUsageDescription",
    text: "This app works with Bluetooth devices"
  },
  {
    key: "NSMicrophoneUsageDescription",
    text: "This app uses the device microphone"
  },
  { key: "NSSiriUsageDescription", text: "This app provides a SiriKit Intent" },
  {
    key: "NSSpeechRecognitionUsageDescription",
    text: "This app uses speech recognition"
  },
  {
    key: "NSMotionUsageDescription",
    text: "This app uses the device motion tracking hardware"
  },
  {
    key: "NSVideoSubscriberAccountUsageDescription",
    text: "(tvOS only) This app uses the video subscriber account"
  },
  {
    key: "NSAppleMusicUsageDescription",
    text: "This app uses Apple Music integration"
  },
  { key: "NSFaceIDUsageDescription", text: "This app uses FaceID" }
];
const commands = a.map(({ key, text }) => {
  const names = (key.startsWith("NS") ? key.substr(2) : key).replace(
    /([a-z])([A-Z])/g,
    "$1 $2"
  );
  const keyName = names
    .toLowerCase()
    .split(" ")
    .filter(w => w !== "usage")
    .map(w => (w.endsWith("usage") ? w.substr(0, w.length - 5) : w))
    .join("-");
  const name = "set-" + keyName + " [descriptionText]";
  const description =
    "Set " + names + ' (leave blank for default: "' + text + '")';
  return {
    name,
    description,
    func: ([desc]) => {
      if (!desc) {
        console.warn(
          "This will use the default text - it may not pass app store check"
        );
        desc = text;
      }
      addText(key, desc);
    }
  };
});

module.exports = {
  commands: [
    ...commands,
    {
      name: "set-all-usage-descriptions",
      description:
        "Set all usage descriptions to the default text in this package",
      func: () => {
        a.forEach(({ key, text }) => {
          addText(key, text);
        });
      }
    }
  ]
};
/*
const defaultPhotoDescription = "This app requires the photo library";
const defaultPhotoAddDescription = "This app must add to the photo library";
const defaultCameraDescription = "This app requires the camera";
const defaultMicrophoneDescription = "This app requires the microphone";
const defaultFaceIDDescription = "This app requires FaceID";
const defaultCalendarDescription = "This app requires access to the calendar";

module.exports = {
  commands: [
    {
      name: "set-photo-description [newdescription]",
      description: "set Photo Library Usage Description for read-only access",
      func: ([description]) => {
        if (!description) {
          console.warn("This default text may get rejected by the appStore");
          description = defaultPhotoDescription;
        }
        return addText("NSPhotoLibraryUsageDescription", description);
      }
    },
    {
      name: "set-photo-add-description [newdescription]",
      description:
        "set Photo Library Usage Description for write (e.g. adding) access",
      func: ([description]) => {
        if (!description) {
          console.warn("This default text may get rejected by the appStore");
          description = defaultPhotoAddDescription;
        }
        return addText("NSPhotoLibraryAddUsageDescription", description);
      }
    },
    {
      name: "set-camera-description [newdescription]",
      description:
        "set Camera Usage Description for write (e.g. adding) access",
      func: ([description]) => {
        if (!description) {
          console.warn("This default text may get rejected by the appStore");
          description = defaultCameraDescription;
        }
        return addText("NSCameraUsageDescription", description);
      }
    },
    {
      name: "set-microphone-description [newdescription]",
      description:
        "set Microphone Usage Description for write (e.g. adding) access",
      func: ([description]) => {
        if (!description) {
          console.warn("This default text may get rejected by the appStore");
          description = defaultMicrophoneDescription;
        }
        return addText("NSMicrophoneUsageDescription", description);
      }
    },
    {
      name: "set-faceid-description [newdescription]",
      description:
        "set FaceID Usage Description for write (e.g. adding) access",
      func: ([description]) => {
        if (!description) {
          console.warn("This default text may get rejected by the appStore");
          description = defaultFaceIDDescription;
        }
        return addText("NSFaceIDUsageDescription", description);
      }
    },
    {
      name: "set-calendar-description [newdescription]",
      description:
        "set Calendar Usage Description for write (e.g. adding) access",
      func: ([description]) => {
        if (!description) {
          console.warn("This default text may get rejected by the appStore");
          description = defaultCalendarDescription;
        }
        return addText("NSCalendarUsageDescription", description);
      }
    },
    {
      name: "set-all-descriptions",
      description:
        "Set all descriptions to the default text. Only really useful for tools that you will never deploy",
      func: () => {
        addText("NSCalendarUsageDescription", defaultCalendarDescription);
        addText("NSCameraUsageDescription", defaultCameraDescription);
        addText("NSFaceIDUsageDescription", defaultFaceIDDescription);
        addText("NSMicrophoneUsageDescription", defaultMicrophoneDescription);
        addText("NSPhotoLibraryUsageDescription", defaultPhotoDescription);
        addText("NSPhotoLibraryAddUsageDescription", defaultPhotoDescription);
      }
    }
  ]
};

*/
