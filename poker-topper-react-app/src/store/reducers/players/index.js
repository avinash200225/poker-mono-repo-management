import { mergeDeepRight } from "ramda";
import { handleActions } from "redux-actions";
import playersActions from "../../actions/players";

export default handleActions(
  {
    //action is an object with 2 fields type & payload
    [playersActions.players.set]: (state, { type, payload, }) => payload,
    [playersActions.player.added]: (state, { type, payload, }) => ([payload, ...state ]),

    [playersActions.player.updated]: (state, { type, payload, }) => {
      const foundIndex = state.findIndex(x => x.uid == payload.uid);
      const currentPlayerData = state.find(p => p.uid == payload.uid)

      //When you have eliminated all which is impossible, then whatever remains, however improbable, must be the truth.
      if((foundIndex == -1) || (currentPlayerData === undefined)) return state; 

      const currentHistory = currentPlayerData.history || []
      const newHistory = [{ index: currentHistory.length + 1, type: type, timestamp:  new Date().toUTCString(),...payload}, ...currentHistory,]
      const newState = [...state]
      newState[foundIndex] = {...payload, history: newHistory}//See payload used here

      return newState
    },
    [playersActions.player.update]: (state, { type, payload, }) => {
      const foundIndex = state.findIndex(x => x.uid == payload.uid);
      const currentPlayerData = state.find(p => p.uid == payload.uid)

      console.log( payload.uid, foundIndex, currentPlayerData)
       //When you have eliminated all which is impossible, then whatever remains, however improbable, must be the truth.
      if((foundIndex == -1) || (currentPlayerData === undefined)) return state;

      const currentHistory = currentPlayerData.history || []
      const newHistory = [{ index: currentHistory.length + 1, type: payload.MessageType, timestamp:  new Date().toUTCString(),...currentPlayerData}, ...currentHistory,]
      const newState = [...state]
      newState[foundIndex] = {...currentPlayerData, history: newHistory}//see currentPlayerData used

      console.log(newState)

      return newState

    },
    [playersActions.player.remove]: (state, { type, payload, }) => ([...state.filter(x => x.client_ip != payload.client_ip)]),
  },
  []
);
