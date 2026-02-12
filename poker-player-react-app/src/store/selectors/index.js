import { propOr } from "ramda";
import { createSelector } from "reselect";

export const logsSelector = propOr([], "logs")
export const infoLogsSelector = createSelector(logsSelector,(logs) => logs.filter(log => log.logType == "info"))
export const warningLogsSelector = createSelector(logsSelector,(logs) => logs.filter(log => log.logType == "warning"))
export const errorLogsSelector = createSelector(logsSelector,(logs) => logs.filter(log => log.logType == "error"))

export const playerSelector = propOr({clientId: "-1"}, "player")
export const playerIdSelector = createSelector(playerSelector,(obj) => obj.clientId)

export const tableSelector = propOr({}, "table")
export const gameTypeSelector = createSelector(tableSelector, (tableObj) => tableObj.gameType)
export const limtsSelector = createSelector(tableSelector, (tableObj) => tableObj.limits)
export const rakeSelector = createSelector(tableSelector, (tableObj) => tableObj.rake)

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

export const playerBetsSumSelector =createSelector(
    seatsSelector,
    playerIdSelector,
    (seats, playerId) =>
    seats.filter(seat => seat.uid == playerId).map(({betList = [], ...rest}) => (
        betList.reduce((res, bet) => res + bet.betValue, 0)
    ))
)

export const playerLastBetSelector =createSelector(
    seatsSelector,
    playerIdSelector,
    (seats, playerId) =>
    seats.find(seat => seat.uid == playerId) ? seats.find(seat => seat.uid == playerId).totalBet : 0
)

export const playerLastWinSelector =createSelector(
    seatsSelector,
    playerIdSelector,
    (seats, playerId) =>
    seats.find(seat => seat.uid == playerId) ? seats.find(seat => seat.uid == playerId).lastWin : 0
)

export const playersSelector = propOr([], "players")
export const operationsSelector = propOr([], "operations")

export const transactionsSelector = propOr([], "transactions")
export const cashierTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "Cashier") )
export const betTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "Bet") )
export const winTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "Win") )
export const noWinTransactionsSelector = createSelector(transactionsSelector, (transactions) => transactions.filter(trans => trans.transType == "NoWin") )
