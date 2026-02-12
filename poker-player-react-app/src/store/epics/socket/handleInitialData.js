import { of } from "rxjs";

import socketActions from "../../actions/socket";
import logsActions from "../../actions/logs";
import tableActions from "../../actions/table"
import seatsActions from "../../actions/seats";
import playersActions from "../../actions/players";
import playerActions from "../../actions/player";
import transactionsActions from "../../actions/transactions"
import operationsActions from "../../actions/operations";

export default (socketMessage) => {
  const { clientId, data, logs, players, transactions, operations } = socketMessage;
  const {
    action,
    stage = "1", 
    roundId = 0,
    gameType = "No Limit",
    rake,
    blind,
    potAmount, 
    betAmount,
    raiseAmount,
    winners,
    gameCards = [], 
    sidePots = [],
    seats, 
  } = data

  return of(
    playerActions.player.set({clientId}),
    logsActions.logs.set(logs),
    tableActions.table.set({
      action,
      stage, 
      roundId,
      gameType,
      rake,
      blind,
      potAmount, 
      betAmount,
      raiseAmount,
      winners, 
      gameCards, 
      sidePots, 
    }),
    seatsActions.seats.set(seats),
    playersActions.players.set(players),
    transactionsActions.transactions.set(transactions),
    operationsActions.operations.set(operations),
    socketActions.socket.success()
  );
};
