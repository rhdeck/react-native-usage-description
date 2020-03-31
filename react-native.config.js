const { resolve, join } = require("path");
const { existsSync, readFileSync, readdirSync } = require("fs");
const plist = require("plist");
const defaultPhotoDescription = "This app requires the photo library";
const defaultPhotoAddDescription = "This app must add to the photo library";
const defaultCameraDescription = "This app requires the camera";
const defaultMicrophoneDescription = "This app requires the microphone";
const defaultFaceIDDescription = "This app requires FaceID";
const defaultCalendarDescription = "This app requires access to the calendar";
var iosPath = resolve(process.cwd(), "ios");
const addText = (key, value) => {
if (!existsSync(iosPath)) {
  console.error("Could not find ios in ", thisPath, iosPath);
  console.log(readdirSync(thisPath));
  return false
}
const plists = glob.sync(resolve(join(iosPath, "*", "Info.plist")));
plists.map(path => {
  const source = readFileSync(path, "utf8");
  var o = plist.parse(source);
  o[key] = value;
  const xml = plist.build(o);
  writeFileSync(path, xml);
});

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
        return addText("NSPhotoLibraryUsageDescription", description)
      }
    },{
        name: "set-photo-add-description [newdescription]",
        description: "set Photo Library Usage Description for write (e.g. adding) access",
        func: ([description]) => {
          if (!description) {
            console.warn("This default text may get rejected by the appStore");
            description = defaultPhotoAddDescription;
          }
          return addText("NSPhotoLibraryAddUsageDescription", description)
        }
      }
      ,{
        name: "set-camera-description [newdescription]",
        description: "set Camera Usage Description for write (e.g. adding) access",
        func: ([description]) => {
          if (!description) {
            console.warn("This default text may get rejected by the appStore");
            description = defaultCameraDescription;
          }
          return addText("NSCameraUsageDescription", description)
        }
      },{
        name: "set-microphone-description [newdescription]",
        description: "set Microphone Usage Description for write (e.g. adding) access",
        func: ([description]) => {
          if (!description) {
            console.warn("This default text may get rejected by the appStore");
            description = defaultMicrophoneDescription;
          }
          return addText("NSMicrophoneUsageDescription", description)
        }
      },{
        name: "set-faceid-description [newdescription]",
        description: "set FaceID Usage Description for write (e.g. adding) access",
        func: ([description]) => {
          if (!description) {
            console.warn("This default text may get rejected by the appStore");
            description = defaultFaceIDDescription;
          }
          return addText("NSFaceIDUsageDescription", description)
        }
      },{
        name: "set-calendar-description [newdescription]",
        description: "set Calendar Usage Description for write (e.g. adding) access",
        func: ([description]) => {
          if (!description) {
            console.warn("This default text may get rejected by the appStore");
            description = defaultCalendarDescription;
          }
          return addText("NSCalendarUsageDescription", description)
        }
      }
  ]
};
