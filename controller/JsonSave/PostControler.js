const Json_model = require("../../DataBase/JsonModel.js/JsonModel");

const Json_Post_Fun = async (req, res) => {
  try {
    const { title, link, original, baselink } = req.body;
    console.log("req body is ", req.body);

    const all_post_data = new Json_model({
      title,
      link,
      original,
      baselink,
    });

    console.log("all_post_data", all_post_data);

    console.log("json save in database ", all_post_data);
  } catch (error) {
    console.log("error");
  }
};
const Json_get_Fun = async (req, res) => {
  try {
    const all_get_data = await Json_model.find({});

    res.status(200).send(all_get_data);
  } catch (error) {
    console.log("error");
  }
};

module.exports = { Json_Post_Fun, Json_get_Fun };
