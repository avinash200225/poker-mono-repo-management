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
import { createActions } from "redux-actions";
export default createActions({
  PLAYERS: {
    SET: null,
    CLEAR: null,
  },
  PLAYER: {
    ADD: null,
    ADDED: null,
    UPDATE: null,
    UPDATED: null,
    LOCK: null,
    LOCKED: null,
    UNLOCK: null,
    UNLOCKED: null,
    REMOVE: null,
  },
  BALANCE: {
    ADD: null,
    REMOVE: null,
    SUCCESS: null,
    FAILURE: null,
    UPDATE: null,
  },
});
