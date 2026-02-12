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
import { propOr } from "ramda";
import { createSelector } from "reselect";

const defaultObjectValue = {};
const defaultArrayValue = [];

export const logsSelector = propOr([], "logs");
export const infoLogsSelector = createSelector(logsSelector, (logs) =>
  logs.filter((log) => log.logType == "info")
);
export const warningLogsSelector = createSelector(logsSelector, (logs) =>
  logs.filter((log) => log.logType == "warning")
);
export const errorLogsSelector = createSelector(logsSelector, (logs) =>
  logs.filter((log) => log.logType == "error")
);

export const historySelector = propOr([], "history");
export const tableSelector = propOr({}, "table");

export const seatsSelector = propOr([], "seats");
export const betValueSumSeatsSelector = createSelector(seatsSelector, (seats) =>
  seats.map(({ betList = [], ...rest }) =>
    betList.reduce((res, bet) => res + bet.betValue, 0)
  )
);

export const reducedBetValueSumSeatsSelector = createSelector(
  betValueSumSeatsSelector,
  (sumValues) => sumValues.reduce((res, sumValue) => res + sumValue, 0)
);

export const playersSelector = propOr([], "players");
export const operationsSelector = propOr([], "operations");

export const transactionsSelector = propOr([], "transactions");
export const cashierTransactionsSelector = createSelector(
  transactionsSelector,
  (transactions) =>
    transactions.filter(
      (trans) =>
        trans.transType == "Cashier" && trans.MessageType.includes("SUCCESS")
    )
);
export const betTransactionsSelector = createSelector(
  transactionsSelector,
  (transactions) => transactions.filter((trans) => trans.transType == "Bet")
);
export const winTransactionsSelector = createSelector(
  transactionsSelector,
  (transactions) => transactions.filter((trans) => trans.transType == "Win")
);
export const noWinTransactionsSelector = createSelector(
  transactionsSelector,
  (transactions) => transactions.filter((trans) => trans.transType == "NoWin")
);
