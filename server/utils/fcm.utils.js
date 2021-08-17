var admin = require('firebase-admin');
const UUID = require("uuid-v4");
const serviceAccount = require('../config/planmttoenelapp-firebase-adminsdk-j026g-a207a42086.json');
const bucketName = "planmttoenelapp.appspot.com"

const stream = require('stream');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	// databaseURL: "https://ms-project-bc2b4.appspot.com",
	storageBucket: "planmttoenelapp.appspot.com"
});

const bucket = admin.storage().bucket();



exports.saveBase64AsImage =  (imageInfo) => {
    let image = imageInfo.filedata;
    let fileName = imageInfo.remotefile

    return new Promise((resolve, reject) => {
      let uuid = UUID();
      let responseURL = ""
    //   const mimeType = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]
      //trim off the part of the payload that is not part of the base64 string
      const base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, '')
      const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(imageBuffer);


      // Create a reference to the new image file
      let file = bucket.file(fileName);

     bufferStream.pipe(file.createWriteStream({
        metadata: {
        //   contentType: mimeType,
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }
        }
      })).on('finish',  ()=> {
        resolve (`https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${file.id}?alt=media&token=${uuid}`);
      })
      .on('error', (error)=> reject("Error Subiendo el archivo"));
    })
  }
