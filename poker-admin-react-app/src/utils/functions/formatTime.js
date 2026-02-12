/*
 * Copyright 2025 Wildace Private Limited - All Rights Reserved
 *
 * Licensed under Wildace Software License Agreement ("License").
 * You may not use this file except in compliance with the License.
 *
 * NOTICE
 * ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS THE PROPERTY OF WILDACE PRIVATE LIMITED.
 * THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED HEREIN ARE PROPRIETARY TO WILDACE PRIVATE LIMITED AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 * DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED FROM WILDACE PRIVATE LIMITED.
 * **********************************************************************************************************************************************************************
 * Change History
 * **********************************************************************************************************************************************************************
 * |     Date      |     Name     |      Change     |      Details
 * |  01/08/2025   | Wilson Sam   |     Created     |  File Creation
 * **********************************************************************************************************************************************************************
 * */
var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

var TIME_PATTERNS = {
  HOURS: "hh",
  MINUTES: "mm",
  SECONDS: "ss",
  PERIOD: "a",
};

var formatters = {
  hh: function hh(date, period) {
    return (
      "" +
      (period && date.getHours() > 12 ? date.getHours() % 12 : date.getHours())
    ).padStart(2, "0");
  },
  mm: function mm(date) {
    return ("" + date.getMinutes()).padStart(2, "0");
  },
  ss: function ss(date) {
    return ("" + date.getSeconds()).padStart(2, "0");
  },
};

var getPeriod = function getPeriod(date) {
  return date.getHours() >= 12 ? "PM" : "AM";
};

export function formatTime(format, timestamp) {
  var date =
    (typeof timestamp === "undefined" ? "undefined" : _typeof(timestamp)) ===
    "object"
      ? {
          getHours: function getHours() {
            return timestamp.hours;
          },
          getMinutes: function getMinutes() {
            return timestamp.minutes;
          },
          getSeconds: function getSeconds() {
            return timestamp.seconds;
          },
        }
      : new Date(timestamp);
  var period = format.includes(TIME_PATTERNS.PERIOD) ? getPeriod(date) : null;
  var sanitizedFormat = period ? format.split(" ")[0] : format;

  // extract time according to given format
  var timeArr = sanitizedFormat.split(":").map(function (part) {
    return formatters[part](date, period);
  });

  return timeArr.join(":") + (period ? period.padStart(3, " ") : "");
}
