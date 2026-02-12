import { handleActions } from "redux-actions";
import operationsActions from "../../actions/operations";

export default handleActions(
  {  
    //action is an object with 2 fields type & payload
    [operationsActions.operations.set]: (state, {type, payload}) => {
      return [...payload]
    },
    [operationsActions.operations.add]: (state, {type, payload}) => {
      return [
        payload,
        ...state
      ]
    }
  },
  []
);