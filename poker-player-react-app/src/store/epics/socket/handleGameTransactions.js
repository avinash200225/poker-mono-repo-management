import { of } from "rxjs";

import transactionsActions from "../../actions/transactions"

export default (socketMessage, state) => {
  return of(
    transactionsActions.transactions.add(socketMessage),
  );
};
