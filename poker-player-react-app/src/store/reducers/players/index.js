import { mergeDeepRight } from "ramda";
import { handleActions } from "redux-actions";
import playersActions from "../../actions/players";

const PLAYERS_DUMMY_DATA = [
  {client_ip : "192.168.1.2", 
   nickname : "Player 1", 
   balance : 10000, 
   isTurn: false,  
   gameStatus: "Dealer", 
   isDealer: true, 
   cards: ["xx", "xx"], 
   bets: [0,0,0,0],
   actions: {check: false, fold: false, raise: false, bet: false, call: false}
  },
]
export default handleActions(
  {
    //action is an object with 2 fields type & payload
    [playersActions.players.set]: (state, { type, payload, }) => payload,
    [playersActions.player.added]: (state, { type, payload, }) => ([payload, ...state ]),
    [playersActions.player.updated]: (state, { type, payload, }) => ([payload, ...state.filter(x => x.client_ip != payload.client_ip)]),
    [playersActions.player.remove]: (state, { type, payload, }) => ([...state.filter(x => x.client_ip != payload.client_ip)]),
  },
  []
);
