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
import adminActions from "../../actions/admin";
import tableActions from "../../actions/table";
import socketActions from "../../actions/socket";

function adminGameActionsEpic(action$, state$) {
  return action$.pipe(
    ofType(
      adminActions.game.cancel,
      adminActions.game.elect,
      adminActions.game.new
    ),
    pluck("payload"),
    mergeMap((adminGameMessage) => {
      return of(socketActions.socket.send(adminGameMessage));
    })
  );
}

function adminTableActionsEpic(action$, state$) {
  return action$.pipe(
    ofType(tableActions.table.update),
    pluck("payload"),
    mergeMap((adminTableMessage) => {
      return of(socketActions.socket.send(adminTableMessage));
    })
  );
}

function adminHandActionsEpic(action$, state$) {
  return action$.pipe(
    ofType(
      adminActions.hand.fold,
      adminActions.hand.check,
      adminActions.hand.raise,
      adminActions.hand.bet,
      adminActions.hand.call
    ),
    pluck("payload"),
    mergeMap((handActionMessage) => {
      return of(socketActions.socket.send(handActionMessage));
    })
  );
}

export default combineEpics(
  adminTableActionsEpic,
  adminGameActionsEpic,
  adminHandActionsEpic
);
