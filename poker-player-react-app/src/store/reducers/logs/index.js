import { handleActions } from "redux-actions";
import logsActions from "../../actions/logs";
const { logs } = logsActions;

export default handleActions(
  {
    [logs.set]: (state, { type, payload, }) => payload,
  },
  []
);