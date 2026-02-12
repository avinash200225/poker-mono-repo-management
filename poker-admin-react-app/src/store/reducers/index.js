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

//#############TEMPLATE##################################
//import { ADMIN_ACTIVATED } from "../actions";
// import {usersInitialState} from '../actions'

// export const usersReducer = (state=usersInitialState, action) => {
//     //console.log(action.type)
//     //console.log(action.data)

//     switch (action.type){

//         default:
//             return state;
//     }
// }
//#############TEMPLATE##################################

import { ADMIN_ACTIVATED } from "../actions";
import { loginInitialState } from "../actions";

export const loginCredentialsReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case ADMIN_ACTIVATED:
      return {
        userName: action.data.userFullName,
        userCategory: action.data.userCategory,
      };
    default:
      return state;
  }
};

import {
  ADMIN_USERS_DATA_INIT,
  ADMIN_USERS_ACTIVITY_LOGS_INIT,
  ADMIN_USERS_TRANSACTION_LOGS_INIT,
  ADMIN_USERS_USER_MONEY_DEPOSIT_REQ,
  ADMIN_USERS_USER_MONEY_DEPOSIT_OK,
  ADMIN_USERS_USER_MONEY_DEPOSIT_KO,
  ADMIN_USERS_USER_MONEY_WITHDRAW_REQ,
  ADMIN_USERS_USER_MONEY_WITHDRAW_OK,
  ADMIN_USERS_USER_MONEY_WITHDRAW_KO,
  ADMIN_USERS_USER_CREATE_REQ,
  ADMIN_USERS_USER_CREATE_OK,
  ADMIN_USERS_USER_CREATE_KO,
  ADMIN_USERS_USER_UPDATE_REQ,
  ADMIN_USERS_USER_UPDATE_OK,
  ADMIN_USERS_USER_UPDATE_KO,
} from "../actions";

import { usersInitialState } from "../actions";

export const usersReducer = (state = usersInitialState, action) => {
  // //console.log(action.type)
  // //console.log(action.data)

  switch (action.type) {
    case ADMIN_USERS_DATA_INIT:
      //console.log(action.type)
      //console.log(action.data)
      return action.data;

    case ADMIN_USERS_USER_MONEY_DEPOSIT_OK:
      return state.map((item, index) => {
        // Find the item with the matching code
        if (item.code === action.data.userCode) {
          return {
            ...item, // copy the existing item
            balance: item.balance + action.data.amount, // replace the balance
          };
        }
        return item; // Leave every other item unchanged
      });
    case ADMIN_USERS_USER_MONEY_WITHDRAW_OK:
      return state.map((item, index) => {
        // Find the item with the matching code
        if (item.code === action.data.userCode) {
          return {
            ...item, // copy the existing item
            balance: item.balance - action.data.amount, // replace the balance
          };
        }
        return item; // Leave every other item unchanged
      });
    case ADMIN_USERS_USER_MONEY_DEPOSIT_KO:
    case ADMIN_USERS_USER_MONEY_WITHDRAW_KO:
      return state;
    case ADMIN_USERS_USER_CREATE_OK:
      return [
        // a new array
        ...state, // explode the old state first
        action.data, // then add the new item at the end
      ];
    case ADMIN_USERS_USER_UPDATE_OK:
      return state.map((item, index) => {
        // Find the item with the matching code
        if (item.code === action.data.code) {
          return {
            ...item, // copy the existing item
            name: action.data.name, // replace the
            country: action.data.country, // replace the
            usage: action.data.usage, // replace the
            account: action.data.account, // replace the
            phone: action.data.phone, // replace the
          };
        }
        return item; // Leave every other item unchanged
      });
    default:
      return state;
  }
};
import { usersAccountsHistoryInitialState } from "../actions";

export const usersAccountsHistoryReducer = (
  state = usersAccountsHistoryInitialState,
  action
) => {
  // //console.log(action.type)
  // //console.log(action.data)

  switch (action.type) {
    case ADMIN_USERS_ACTIVITY_LOGS_INIT:
      //console.log(action.type)
      //console.log(action.data)
      return action.data.map((item, index) => {
        return Object.assign({}, { action: item.action }, item.userData);
      });

    case ADMIN_USERS_USER_CREATE_REQ:
      return [
        // a new array
        Object.assign({}, { action: "User Create Request" }, action.payload), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_USERS_USER_UPDATE_REQ:
      return [
        // a new array
        Object.assign({}, { action: "User Update Request" }, action.payload), // then add the new item at the end
        ...state, // explode the old state first
      ];
    case ADMIN_USERS_USER_CREATE_OK:
      return [
        // a new array
        Object.assign({}, { action: "User Create Accepted" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_USERS_USER_UPDATE_OK:
      return [
        // a new array
        Object.assign({}, { action: "User Update Accepted" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];
    case ADMIN_USERS_USER_CREATE_KO:
      return [
        // a new array
        Object.assign({}, { action: "User Create Rejected" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_USERS_USER_UPDATE_KO:
      return [
        // a new array
        Object.assign({}, { action: "User Update Rejected" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];

    default:
      return state;
  }
};

import { usersMoneyTransactionsHistoryInitialState } from "../actions";

export const usersMoneyTransactionsHistoryReducer = (
  state = usersMoneyTransactionsHistoryInitialState,
  action
) => {
  switch (action.type) {
    case ADMIN_USERS_TRANSACTION_LOGS_INIT:
      //console.log(action.type)
      //console.log(action.data)
      return action.data.map((item, index) => {
        return Object.assign({}, { action: item.action }, item.userMoneyData);
      });

    case ADMIN_USERS_USER_MONEY_DEPOSIT_REQ:
      return [
        // a new array
        Object.assign({}, { action: "Deposit Request" }, action.payload), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_USERS_USER_MONEY_WITHDRAW_REQ:
      return [
        // a new array
        Object.assign({}, { action: "Withdraw Request" }, action.payload), // then add the new item at the end
        ...state, // explode the old state first
      ];
    case ADMIN_USERS_USER_MONEY_DEPOSIT_OK:
      return [
        // a new array
        Object.assign({}, { action: "Deposit Success" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];
    case ADMIN_USERS_USER_MONEY_DEPOSIT_KO:
      return [
        // a new array
        Object.assign({}, { action: "Deposit Fail" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_USERS_USER_MONEY_WITHDRAW_OK:
      return [
        // a new array
        Object.assign({}, { action: "Withdraw Success" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];
    case ADMIN_USERS_USER_MONEY_WITHDRAW_KO:
      return [
        // a new array
        Object.assign({}, { action: "Withdraw Fail" }, action.data), // then add the new item at the end
        ...state, // explode the old state first
      ];

    default:
      return state;
  }
};

import {
  ADMIN_GAMES_DATA_INIT,
  ADMIN_GAMES_ACTIVITY_LOGS_INIT,
  ADMIN_GAMES_CONFIGURE_REQ,
  ADMIN_GAMES_CONFIGURE_OK,
  ADMIN_GAMES_CONFIGURE_KO,
} from "../actions";

import { gamesInitialState } from "../actions";

export const gamesReducer = (state = gamesInitialState, action) => {
  switch (action.type) {
    case ADMIN_GAMES_DATA_INIT:
      //console.log(action.type)
      //console.log(action.data)
      return action.data;

    case ADMIN_GAMES_CONFIGURE_OK:
      //console.log(action.type)
      //console.log(action.data)
      return state.map((item, index) => {
        // Find the item with the matching code
        if (item.name === action.data.name) {
          return {
            ...item, // copy the existing item
            minBet: action.data.minBet, // replace the
            maxBet: action.data.maxBet, // replace the
            operationalState: action.data.operationalState,
            dealer: action.data.dealer,
            updated: action.data.updated,
          };
        }
        return item; // Leave every other item unchanged
      });

    default:
      return state;
  }
};
import { gamesActivityHistoryInitialState } from "../actions";

export const gamesActivityHistoryReducer = (
  state = gamesActivityHistoryInitialState,
  action
) => {
  switch (action.type) {
    case ADMIN_GAMES_ACTIVITY_LOGS_INIT:
      //console.log(action.type)
      //console.log(action.data)
      return action.data.map((item, index) => {
        return Object.assign({}, { action: item.action }, item.gameData);
      });

    case ADMIN_GAMES_CONFIGURE_REQ:
      return [
        // a new array
        Object.assign({}, { action: "Config Request" }, action.payload), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_GAMES_CONFIGURE_OK:
      return [
        // a new array
        Object.assign({}, action.data, { action: "Config Accepted" }), // then add the new item at the end
        ...state, // explode the old state first
      ];

    case ADMIN_GAMES_CONFIGURE_KO:
      return [
        // a new array
        Object.assign({}, action.data, { action: "Config Rejected" }), // then add the new item at the end
        ...state, // explode the old state first
      ];

    default:
      return state;
  }
};
