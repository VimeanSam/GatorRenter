const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: "dxlc7nvb8",
  api_key: "511532738259615",
  api_secret: "3TVvLAgA7I26y7a3cdb6oQnyaR8"
});

exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id
      });
    }, {
      resource_type: "auto",
      folder: folder
    });
  });
}