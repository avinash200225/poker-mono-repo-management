import { handleActions } from "redux-actions";
import transactionActions from "../../actions/transactions";

export default handleActions(
  {
    //action is an object with 2 fields type & payload
    [transactionActions.transactions.set]: (state, { type, payload, }) => payload,
    [transactionActions.transactions.add]: (state, { type, payload, }) => ([payload, ...state, ]),
  },
  []
);