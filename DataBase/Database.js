// const mongoose = require("mongoose");

// mongoose.connect(
//   "Database Link",
//   (err) => {
//     if (err) {
//       console.log("error in database ");
//     }
//     console.log("database connection done");
//   }
// );

const mongoose = require("mongoose");

mongoose.connect(
  "Database Link",
  { useNewUrlParser: true },

  (err) => {
    if (err) {
      console.log("error in db", err);
    } else {
      console.log("mongo done");
    }
  }
);
