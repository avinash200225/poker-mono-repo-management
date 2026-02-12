import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { pluck, mergeMap } from "rxjs/operators";
import playersActions from '../../actions/players'
import socketActions from '../../actions/socket'

function addMoneyEpic(action$, state$){
    return action$.pipe(
        ofType(playersActions.balance.add),
        pluck('payload'),
        mergeMap((balanceAddMessage) => {
            return of(
                socketActions.socket.send(balanceAddMessage)
            )
        })
    )
}

function removeMoneyEpic(action$, state$) {
    return action$.pipe(
        ofType(playersActions.balance.remove),
        pluck('payload'),
        mergeMap((balanceRemoveMessage) => {
            return of(
                socketActions.socket.send(balanceRemoveMessage)
            )
        })
    )
}

function userCredentialsUpdateEpic(action$, state$) {
    return action$.pipe(
        ofType(playersActions.player.update),
        pluck('payload'),
        mergeMap((credentialsUpdateMessage) => {
            return of(
                socketActions.socket.send(credentialsUpdateMessage)
            )
        })
    )
}

export default combineEpics(
    addMoneyEpic,
    removeMoneyEpic,
    userCredentialsUpdateEpic,
);