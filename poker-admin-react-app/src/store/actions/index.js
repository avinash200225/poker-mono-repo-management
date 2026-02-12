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
export { default as socketActions } from "./socket";

// LOGIN CREDENTIALS
export const ADMIN_ACTIVATED = "ADMIN_ACTIVATED";

export const loginInitialState = {
  userCode: "Missing Code",
  userName: "Missing Name",
  userCategory: "Missing Category",
};
export const usersInitialState = [];
export const usersAccountsHistoryInitialState = [];
export const usersMoneyTransactionsHistoryInitialState = [];
export const gamesInitialState = [];
export const gamesActivityHistoryInitialState = [];

// USERS CONFIG & BANKING STATE INFORMATIONS

export const ADMIN_USERS_DATA_INIT = "ADMIN_USERS_DATA_INIT";
export const ADMIN_USERS_ACTIVITY_LOGS_INIT = "ADMIN_USERS_ACTIVITY_LOGS_INIT";
export const ADMIN_USERS_TRANSACTION_LOGS_INIT =
  "ADMIN_USERS_TRANSACTION_LOGS_INIT";

export const ADMIN_USERS_USER_MONEY_DEPOSIT_REQ =
  "ADMIN_USERS_USER_MONEY_DEPOSIT_REQ";
export const ADMIN_USERS_USER_MONEY_DEPOSIT_OK =
  "ADMIN_USERS_USER_MONEY_DEPOSIT_OK";
export const ADMIN_USERS_USER_MONEY_DEPOSIT_KO =
  "ADMIN_USERS_USER_MONEY_DEPOSIT_KO";

export const ADMIN_USERS_USER_MONEY_WITHDRAW_REQ =
  "ADMIN_USERS_USER_MONEY_WITHDRAW_REQ";
export const ADMIN_USERS_USER_MONEY_WITHDRAW_OK =
  "ADMIN_USERS_USER_MONEY_WITHDRAW_OK";
export const ADMIN_USERS_USER_MONEY_WITHDRAW_KO =
  "ADMIN_USERS_USER_MONEY_WITHDRAW_KO";

export const ADMIN_USERS_USER_CREATE_REQ = "ADMIN_USERS_USER_CREATE_REQ";
export const ADMIN_USERS_USER_CREATE_OK = "ADMIN_USERS_USER_CREATE_OK";
export const ADMIN_USERS_USER_CREATE_KO = "ADMIN_USERS_USER_CREATE_KO";

export const ADMIN_USERS_USER_UPDATE_REQ = "ADMIN_USERS_USER_UPDATE_REQ";
export const ADMIN_USERS_USER_UPDATE_OK = "ADMIN_USERS_USER_UPDATE_OK";
export const ADMIN_USERS_USER_UPDATE_KO = "ADMIN_USERS_USER_UPDATE_KO";

export const ADMIN_GAMES_DATA_INIT = "ADMIN_GAMES_DATA_INIT";
export const ADMIN_GAMES_ACTIVITY_LOGS_INIT = "ADMIN_GAMES_ACTIVITY_LOGS_INIT";
export const ADMIN_GAMES_CONFIGURE_REQ = "ADMIN_GAMES_CONFIGURE_REQ";
export const ADMIN_GAMES_CONFIGURE_OK = "ADMIN_GAMES_CONFIGURE_OK";
export const ADMIN_GAMES_CONFIGURE_KO = "ADMIN_GAMES_CONFIGURE_KO";
