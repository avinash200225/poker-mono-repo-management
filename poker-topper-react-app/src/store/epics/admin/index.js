import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { pluck, mergeMap } from "rxjs/operators";
import adminActions from '../../actions/admin'
import tableActions from '../../actions/table'
import socketActions from '../../actions/socket'

function adminGameActionsEpic(action$, state$){
    return action$.pipe(
        ofType(adminActions.game.cancel, adminActions.game.elect, adminActions.game.new ),
        pluck('payload'),
        mergeMap((adminGameMessage) => {
            return of(
                socketActions.socket.send(adminGameMessage)
            )
        })
    )
}

function adminTableActionsEpic(action$, state$){
    return action$.pipe(
        ofType(tableActions.table.update ),
        pluck('payload'),
        mergeMap((adminTableMessage) => {
            return of(
                socketActions.socket.send(adminTableMessage)
            )
        })
    )
}


function adminHandActionsEpic(action$, state$) {
    return action$.pipe(
        ofType(adminActions.hand.fold, adminActions.hand.check,adminActions.hand.raise,adminActions.hand.bet,adminActions.hand.call),
        pluck('payload'),
        mergeMap((handActionMessage) => {
            return of(
                socketActions.socket.send(handActionMessage)
            )
        })
    )
}

export default combineEpics(
    adminTableActionsEpic,
    adminGameActionsEpic,
    adminHandActionsEpic,
);