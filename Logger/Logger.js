const { transports, createLogger } = require("winston");

const logger = createLogger({
  level: "debug",
  transports: [
    new transports.File({ filename: "Test.log" }),
    new transports.Console(),
  ],
});

module.exports = logger;
