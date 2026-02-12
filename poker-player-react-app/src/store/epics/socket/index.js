import { combineEpics, ofType } from "redux-observable";
import { webSocket } from "rxjs/webSocket";
import { concat, EMPTY, interval, of, Subject, timer } from "rxjs";
import {
    catchError,
    flatMap,
    pluck,
    switchMap,
    takeUntil,
    filter,
    mergeMap
  } from "rxjs/operators";

import socketActions from "../../actions/socket";
import errorActions from "../../actions/error"
import { socketSubject } from "../../../streams";
import { 
  INITIAL_DATA,
  DATA_UPDATED,
  PLAYER_BET_LOST, 
  PLAYER_BET_PLACED, 
  PLAYER_BET_WON, 
  DEPOSIT_REQ, 
  DEPOSIT_SUCCESS, 
  WITHDRAW_REQ, 
  WITHDRAW_SUCCESS, 
  PLAYER_CREATED, 
  PLAYER_UPDATED,
  PLAYER_OFFLINE, PLAYER_ONLINE, PLAYER_LOCK, PLAYER_UNLOCK, PLAYER_LOCKED, PLAYER_UNLOCKED 
} from "../../../constants/socketMessages";
import handleInitialData from "./handleInitialData";
import handleUpdatedData from "./handleUpdatedData";

import handleMoneyTransactionsHistory from "./handleMoneyTransactionsHistory";
import handleGameTransactions from "./handleGameTransactions";
import handlePlayerTransactions from "./handlePlayerTransactions";
import handlePlayerOperations from "./handlePlayerOperations";

const {socket} = socketActions

const openEvents = new Subject();
const closeEvents = new Subject();
const errorEvents = new Subject();
const SOCKET_PING_INTERVAL = 30000;

const socketEpic = (action$, state$) =>
  action$.pipe(
    ofType(socket.request),
    switchMap(() => {
        const loc = window.location;
        const protocol = loc.protocol === "https:" ? "wss:" : "ws:";
        const url = `${protocol}//${loc.host}/poker/wsclient/player`
        const initMessage = { MessageType: 'INITIALIZE_PLAYER', ClientIp: "192.168.1.20" }

        const ws = webSocket({
            url,
            openObserver: openEvents,
            closeObserver: closeEvents,
            errorObserver: errorEvents,
        });

        ws.subscribe({
            next: (v) => socketSubject.next(v),
        });

        let errorSub = null;
        let closeSub = null;
        closeSub = closeEvents.subscribe(() => {
          closeSub && closeSub.unsubscribe();
          errorSub && errorSub.unsubscribe();
        });
        errorSub = errorEvents.subscribe(() => {
          closeSub && closeSub.unsubscribe();
          errorSub && errorSub.unsubscribe();
        });

        openEvents.subscribe(() => ws.next(initMessage));

        action$.pipe(
          ofType(socket.send), 
          pluck("payload")).subscribe({
            next: (data) => ws.next(data),
        });

        action$.pipe(
            ofType(socket.send, socket.success),
            switchMap(
                () => interval(SOCKET_PING_INTERVAL).pipe(
                    takeUntil(action$.pipe(ofType(socket.request, socket.failure, socket.close)))
                )
            )).subscribe({
                next: () => ws.next && ws.next("PingMessage"),
            });

        return ws.pipe(
            flatMap((socketMessage) => 
                of(socket.message(socketMessage))
            ),
            takeUntil(
                action$.pipe(ofType(socket.request, socket.failure, socket.close))
            ),
            catchError((error) => {
                return of(
                  socket.failure({
                    error: {
                      message: error.message,
                    },
                  })
                );
            })
        )
    }),
    catchError((error) =>
    of(
      errorActions.error.set({
        code: 1,
        message: error.message,
        title: "errors.game_load_failure_title",
        description: "errors.game_load_failure_desc",
        actionLabel: "general.go_back",
      })
    )
  )
);  

function initialDataEpic(action$, state$) {
  return action$.pipe(
    ofType(socket.message),
    pluck('payload'),
    filter(({ MessageType, }) => MessageType === INITIAL_DATA),
    mergeMap((socketMessage) => handleInitialData(socketMessage, state$.value))
  );
}

function updateDataEpic(action$, state$) {
  return action$.pipe(
    ofType(socket.message),
    pluck('payload'),
    filter(({ MessageType, }) => MessageType === DATA_UPDATED),
    mergeMap((socketMessage) => handleUpdatedData(socketMessage, state$.value))
  );
}

function MoneyTransactionsHistoryEpic(action$, state$) {
  return action$.pipe(
    ofType(socket.message),
    pluck('payload'),
    filter(({ MessageType, }) => (MessageType === DEPOSIT_REQ) ||  (MessageType === DEPOSIT_SUCCESS) ||  (MessageType === WITHDRAW_REQ) ||  (MessageType === WITHDRAW_SUCCESS) ),
    mergeMap((socketMessage) => handleMoneyTransactionsHistory(socketMessage, state$.value))
  );
}

function GameTransactionsEpic(action$, state$) {
  return action$.pipe(
    ofType(socket.message),
    pluck('payload'),
    filter(({ MessageType, }) => (MessageType === PLAYER_BET_PLACED) ||  (MessageType === PLAYER_BET_WON) ||  (MessageType === PLAYER_BET_LOST) ),
    mergeMap((socketMessage) => handleGameTransactions(socketMessage, state$.value))
  );
}

function PlayerTransactionsEpic(action$, state$) {
  return action$.pipe(
    ofType(socket.message),
    pluck('payload'),
    filter(({ MessageType, }) => (MessageType === PLAYER_CREATED) ||  (MessageType === PLAYER_UPDATED) ),
    mergeMap((socketMessage) => handlePlayerTransactions(socketMessage, state$.value))
  );
}

function PlayerOperationsEpic(action$, state$) {
  return action$.pipe(
    ofType(socket.message),
    pluck('payload'),
    filter(({ MessageType, }) => (MessageType === PLAYER_OFFLINE) ||  (MessageType === PLAYER_ONLINE) || (MessageType === PLAYER_LOCK) ||  (MessageType === PLAYER_UNLOCK) ),
    mergeMap((socketMessage) => handlePlayerOperations(socketMessage, state$.value))
  );
}

export default combineEpics(
    socketEpic,
    initialDataEpic,
    updateDataEpic,
    MoneyTransactionsHistoryEpic,
    GameTransactionsEpic,
    PlayerTransactionsEpic,
    PlayerOperationsEpic
);