import { handleActions } from "redux-actions";
import playerActions from "../../actions/player";

export default handleActions(
  {
    //action is an object with 2 fields type & payload
    [playerActions.player.set]: (state, { type, payload, }) => payload,
  },
  {clientId: "-1" }
);
