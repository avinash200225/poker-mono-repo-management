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
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";

import {
  loginCredentialsReducer,
  usersReducer,
  usersAccountsHistoryReducer,
  usersMoneyTransactionsHistoryReducer,
  gamesReducer,
  gamesActivityHistoryReducer,
} from "./reducers";

import logsReducer from "./reducers/logs";
import tableReducer from "./reducers/table";
import seatsReducer from "./reducers/seats";
import playersReducer from "./reducers/players";
import transactionsReducer from "./reducers/transactions";
import operationsReducer from "./reducers/operations";
import historyReducer from "./reducers/history";

import socketEpic from "./epics/socket";
import playersEpic from "./epics/players";
import adminEpic from "./epics/admin";

import * as actions from "./actions";
import * as selectors from "./selectors";
export { actions, selectors };

export default () => {
  const appReducers = combineReducers({
    admin: loginCredentialsReducer, //To receive Login User Credentials.
    users: usersReducer,
    usersAccountsHistory: usersAccountsHistoryReducer,
    usersMoneyTransactionsHistory: usersMoneyTransactionsHistoryReducer,
    games: gamesReducer,
    gamesActivityHistory: gamesActivityHistoryReducer,
    logs: logsReducer,
    table: tableReducer,
    seats: seatsReducer,
    players: playersReducer,
    transactions: transactionsReducer,
    operations: operationsReducer,
    history: historyReducer,
  });

  const appEpics = combineEpics(socketEpic, playersEpic, adminEpic);

  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  var epicMiddleware = createEpicMiddleware();

  var store = createStore(
    appReducers,
    {},
    composeEnhancers(applyMiddleware(epicMiddleware, logger))
  );
  epicMiddleware.run(appEpics);

  return {
    store,
    appReducers,
    appEpics,
  };
};
