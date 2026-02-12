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
import bowser from "bowser";
import { BROWSER } from "../../constants";

export var getBrowser = function getBrowser() {
  var chrome = bowser.chrome,
    safari = bowser.safari,
    msie = bowser.msie,
    msedge = bowser.msedge,
    firefox = bowser.firefox,
    opera = bowser.opera;
  var CHROME = BROWSER.CHROME,
    SAFARI = BROWSER.SAFARI,
    EXPLORER = BROWSER.EXPLORER,
    EDGE = BROWSER.EDGE,
    FIREFOX = BROWSER.FIREFOX,
    OPERA = BROWSER.OPERA,
    UNKNOWN = BROWSER.UNKNOWN;

  return (
    (chrome && CHROME) ||
    (safari && SAFARI) ||
    (msie && EXPLORER) ||
    (msedge && EDGE) ||
    (firefox && FIREFOX) ||
    (opera && OPERA) ||
    UNKNOWN
  );
};
