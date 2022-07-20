const mongoose = require("mongoose");

const jsonSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  original: {
    type: String,
  },
  baselink: {
    type: String,
  },
});

const Json_model = new mongoose.model("Json_test_coll", jsonSchema);
module.exports = Json_model;
