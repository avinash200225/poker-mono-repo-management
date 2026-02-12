import { of } from "rxjs";

import socketActions from "../../actions/socket";
import logsActions from "../../actions/logs";
import tableActions from "../../actions/table"
import seatsActions from "../../actions/seats";
import playersActions from "../../actions/players";
import transactionsActions from "../../actions/transactions"
import operationsActions from "../../actions/operations";

export default (socketMessage) => {
  const { data, logs, players, transactions, operations } = socketMessage;
  const {
    action,
    stage = "1", 
    roundId = 0,
    potAmount, 
    betAmount,
    raiseAmount,
    winners,
    gameCards = [], 
    sidePots = [],
    seats,
    configData,
  } = data

  return of(
    logsActions.logs.set(logs),
    tableActions.table.set({...data}),
    seatsActions.seats.set(seats),
    playersActions.players.set(players),
    transactionsActions.transactions.set(transactions),
    operationsActions.operations.set(operations),
    socketActions.socket.success()
  );
};
