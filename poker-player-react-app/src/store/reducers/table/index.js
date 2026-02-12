import { mergeDeepRight } from "ramda";
import { handleActions } from "redux-actions";
import tableActions from "../../actions/table";

export default handleActions(
  {
    //action is an object with 2 fields type & payload
    [tableActions.table.set]: (state, { type, payload, }) => payload,
    [tableActions.table.updated]: (state, { type, payload, }) => payload,
  },
  []
);
