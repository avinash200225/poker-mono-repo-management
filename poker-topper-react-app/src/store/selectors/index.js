import { propOr } from "ramda";
import { createSelector } from "reselect";

const defaultObjectValue = {};
const defaultArrayValue = [];

export const logsSelector = propOr([], "logs")
export const infoLogsSelector = createSelector(logsSelector,(logs) => logs.filter(log => log.logType == "info"))
export const warningLogsSelector = createSelector(logsSelector,(logs) => logs.filter(log => log.logType == "warning"))
export const errorLogsSelector = createSelector(logsSelector,(logs) => logs.filter(log => log.logType == "error"))

export const tableSelector = propOr({}, "table")

export const seatsSelector = propOr([], "seats")
export const betValueSumSeatsSelector = createSelector(
    seatsSelector, 
    seats => 
        seats.map(({betList = [], ...rest}) => (
            betList.reduce((res, bet) => res + bet.betValue, 0)
        ))
)

export const foldBetValueSumSeatsSelector = createSelector(
    betValueSumSeatsSelector,
    sumValues => 
        sumValues.reduce((res, sumValue) => res + sumValue, 0)
)

export const playersSelector = propOr([], "players")
export const operationsSelector = propOr([], "operations")

export const transactionsSelector = propOr([], "transactions")
export const cashierTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "Cashier") )
export const betTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "Bet") )
export const winTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "Win") )
export const noWinTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "NoWin") )
