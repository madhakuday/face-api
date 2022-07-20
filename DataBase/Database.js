// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://madhakuday:123@cluster0.1oylo.mongodb.net/Json_Test?retryWrites=true&w=majority",
//   (err) => {
//     if (err) {
//       console.log("error in database ");
//     }
//     console.log("database connection done");
//   }
// );

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://udaymadhak:madhak123@cluster0.qanm5.mongodb.net/Json_Test?retryWrites=true&w=majority",
  { useNewUrlParser: true },

  (err) => {
    if (err) {
      console.log("error in db", err);
    } else {
      console.log("mongo done");
    }
  }
);
