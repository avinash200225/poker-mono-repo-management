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
import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { pluck, mergeMap } from "rxjs/operators";
import playersActions from "../../actions/players";
import socketActions from "../../actions/socket";

function addMoneyEpic(action$, state$) {
  return action$.pipe(
    ofType(playersActions.balance.add),
    pluck("payload"),
    mergeMap((balanceAddMessage) => {
      return of(socketActions.socket.send(balanceAddMessage));
    })
  );
}

function removeMoneyEpic(action$, state$) {
  return action$.pipe(
    ofType(playersActions.balance.remove),
    pluck("payload"),
    mergeMap((balanceRemoveMessage) => {
      return of(socketActions.socket.send(balanceRemoveMessage));
    })
  );
}

function userCredentialsUpdateEpic(action$, state$) {
  return action$.pipe(
    ofType(playersActions.player.update),
    pluck("payload"),
    mergeMap((credentialsUpdateMessage) => {
      return of(socketActions.socket.send(credentialsUpdateMessage));
    })
  );
}

export default combineEpics(
  addMoneyEpic,
  removeMoneyEpic,
  userCredentialsUpdateEpic
);
