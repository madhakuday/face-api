const express = require("express");
const app = express();
const addloger = require("./controller/loggerController");
const axios = require("axios");
const bodyParser = require("body-parser");

const { GoogleSearchApi } = require("./controller/GoogleSearch");
const {
  Json_Post_Fun,
  Json_get_Fun,
} = require("./controller/JsonSave/PostControler");

/*App uses start */
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/*App uses end */

/*Database */
require("./DataBase/Database");

/***** Loger Function Start *********/

// r  addloger();

/***** Loger Function End *********/

/*Google Search Api Start*/

app.get("/:name", async (req, res) => {
  try {
    GoogleSearchApi(req, res, req.params.name);
  } catch (error) {
    console.log("error in get api catch", error);
  }
});

/*Google Search Api End*/

/*Post json Data start */

app.get("/api/getpostjson", async (req, res) => {
  try {
    Json_get_Fun(req, res);
  } catch (error) {
    console.log("error in get api catch", error);
  }
});

app.post("/api/postjson", async (req, res) => {
  try {
    Json_Post_Fun(req, res);
  } catch (error) {
    console.log("error in get api catch", error);
  }
});
/*Post json Data end */
app.listen(8000, () => {
  console.log("ok");
});
