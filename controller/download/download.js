// const request = require("request");
// const fs = require("fs");

// const download = function (uri, filename, callback) {
//   console.log("i am call");
//   request.head(uri, function (err, res, body) {
//     console.log("content-type:", res.headers["content-type"]);
//     console.log("content-length:", res.headers["content-length"]);

//     request(uri)
//       .pipe(fs.createWriteStream("./images", filename))
//       .on("close", callback);
//   });
// };

// module.exports = download;

var request = require("request").defaults({ encoding: null });

const download = function (url) {
  return new Promise((resolve, reject) => {
    request.get(url.original, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let data =
          "data:" +
          response.headers["content-type"] +
          ";base64," +
          Buffer.from(body).toString("base64");

        let a = [data, url];
        resolve(a);
      } else {
        reject(error);
      }
    });
  });
};
module.exports = download;
