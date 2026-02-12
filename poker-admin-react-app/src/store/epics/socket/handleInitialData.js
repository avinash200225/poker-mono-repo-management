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
import { of } from "rxjs";

import socketActions from "../../actions/socket";
import logsActions from "../../actions/logs";
import tableActions from "../../actions/table";
import seatsActions from "../../actions/seats";
import playersActions from "../../actions/players";
import transactionsActions from "../../actions/transactions";
import operationsActions from "../../actions/operations";
import historyActions from "../../actions/history";

export default (socketMessage) => {
  const { data, logs, players, transactions, operations, history } =
    socketMessage;
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
    configData,
  } = data;

  return of(
    logsActions.logs.set(logs),
    tableActions.table.set({ ...data }),
    seatsActions.seats.set(seats),
    playersActions.players.set(players),
    transactionsActions.transactions.set(transactions),
    operationsActions.operations.set(operations),
    historyActions.history.set(history),
    socketActions.socket.success()
  );
};
