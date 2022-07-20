const cron = require("node-cron");
const logger = require("../Logger/Logger");

let num = 0;
const addLogger = () => {
  try {
    // const b = num + 1;
    cron.schedule("*/2 * * * * *", () => {
      logger.info(`ok i am print ${(num += 1)}`);
    });
  } catch {
    console.log("error in controller ");
  }
};

module.exports = addLogger;
