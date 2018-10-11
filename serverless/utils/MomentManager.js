"use strict"
const moment = require("moment");

exports.getDay = (time) => {
    switch (time) {
      case "day":
        return moment().subtract(1, "days");
      case "month":
        return moment().subtract(1, "months");
      case "week":
        return moment().subtract(1, "weeks");
      case "year":
        return moment().subtract(1, "years");
      default:
        return moment().subtract(1, "years");
    }
  }