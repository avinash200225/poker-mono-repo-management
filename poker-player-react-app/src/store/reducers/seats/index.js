import { mergeDeepRight } from "ramda";
import { handleActions } from "redux-actions";
import seatsActions from "../../actions/seats";

export default handleActions(
  {
    //action is an object with 2 fields type & payload
    [seatsActions.seats.set]: (state, { type, payload, }) => payload,
    [seatsActions.seat.updated]: (state, { type, payload, }) => ([payload, ...state.filter(x => x.client_ip != payload.client_ip)]),
  },
  []
);
