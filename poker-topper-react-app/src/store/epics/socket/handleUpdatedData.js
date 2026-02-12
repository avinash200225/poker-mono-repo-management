import { of } from "rxjs";

import tableActions from "../../actions/table"
import seatsActions from "../../actions/seats";

export default (socketMessage) => {
  const { data} = socketMessage;
  const {
    action,
    stage = "1", 
    roundId = 0,
    potAmount, 
    betAmount,
    raiseAmount,
    winners,
    gameCards = [], 
    sidePots = [],
    seats,
    configData,
  } = data

  return of(
    tableActions.table.set({...data}),
    seatsActions.seats.set(seats),
  );
};
