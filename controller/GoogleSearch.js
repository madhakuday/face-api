const imageSearch = require("image-search-google");
const SerpApi = require("google-search-results-nodejs");
const path = require("path");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const download = require("./download/download");
const { default: axios } = require("axios");

const mongoose = require("mongoose");
const schema = require("../DataBase/JsonModel.js/JsonModel");
const Jimp = require("jimp");

const Json_model = require("../DataBase/JsonModel.js/JsonModel");

/*Search api key */
const search = new SerpApi.GoogleSearch(
  "30257da179951a03c7989b211a4f93e6ceabb35b205cc40f0eecc1abc80c4f52"
);

const modelPathRoot = "./models";

const images = path.join(__dirname, "../" + "/images/download6.jpg");

const GoogleSearchApi = async (req, res, params) => {
  try {
    const api_url = `https://serpapi.com/search.json?q=${params}&tbm=isch&ijn=0&tbs=itp:photos,isz:l&google_domain=google.com&hl=en&gl=us&api_key=30257da179951a03c7989b211a4f93e6ceabb35b205cc40f0eecc1abc80c4f52`;

    const result = await axios.get(api_url);
    res.send(result.data);
    const alldata = result.data.images_results;

    for (const element of alldata) {
      const allDowData = await download(element);
      FaceDetection(allDowData);
    }
    // }
  } catch (error) {
    console.log(error);
  }
};

let optionsSSDMobileNet;
const test = async () => {
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
  });
};
test();

async function detect(tensor) {
  const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
  return result;
}

async function image(file) {
  const decoded = tf.node.decodeImage(file);

  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();

  return result;
}

let glob_obj = [];

const FaceDetection = async (imd_data) => {
  const data = imd_data;
  let str = data[0].toString("base64");
  const img = str.replace(/^data:image\/(png|jpeg);base64,/, "");
  const buffer = Buffer.from(img, "base64");

  const tensor = await image(buffer);
  const result = await detect(tensor);

  if (result.length > 1) {
    return;
  } else if (result.length <= 0) {
    return;
  } else {
    let faceObj = data[1];

    const test_2 = await schema.find({ original: { $eq: faceObj.original } });

    if (test_2.length === 0) {
      const all_post_data = new Json_model({
        title: faceObj.title,
        link: faceObj.link,
        original: faceObj.original,
        baselink: data[0],
      });
      await all_post_data.save();

      if (all_post_data) {
        console.log("all_post_data save  to mongodb ");
      } else {
        console.log("all_post_data is not save ::::::::::");
      }
    } else if (test_2.length > 0) {
      const test_3 = await schema.find({ baselink: { $eq: data[0] } });
      if (test_3.length === 0) {
        console.log("img base64 not match");
        return true;
      } else {
        console.log("img base64  match !");
        return false;
      }
    } else {
      console.log("out side of if ");
    }
  }
};

module.exports = GoogleSearchApi;
