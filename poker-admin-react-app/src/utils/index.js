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
export { default as getSymbolByCurrencyCode } from "./core/symbol";

export { formatAmount } from "./functions/formatAmount";
export { formatTime } from "./functions/formatTime";
export { navigate } from "./functions/navigation";

export { default as isFullscreen } from "./predicates/isFullscreen";
export { default as isEmpty } from "./predicates/isNil";
export { default as isNil } from "./predicates/isNil";
export { default as isObject } from "./predicates/isObject";
export { default as isUrl } from "./predicates/isUrl";
export { default as isPopup } from "./predicates/isPopup";

export { default as mapPropNames } from "./pointfree/mapPropNames";

export { default as hex2rgba } from "./helpers/hex2rgba";
export { default as ls } from "./helpers/localstorage";
export { getBrowser } from "./helpers/getBrowser";
export { getDevice } from "./helpers/getDevice";
export { getFrame } from "./helpers/getFrame";
export { getOrientation } from "./helpers/getOrientation";
export { getPlatform } from "./helpers/getPlatform";
export { default as shallowEqual } from "./helpers/shallowEqual";
