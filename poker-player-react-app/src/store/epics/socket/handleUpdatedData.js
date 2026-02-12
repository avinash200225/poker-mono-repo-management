import { of } from "rxjs";

import tableActions from "../../actions/table"
import seatsActions from "../../actions/seats";

export default (socketMessage) => {
  const { data} = socketMessage;
  const {    
    action,
    stage = "1", 
    roundId = 0,
    gameType = "No Limit",
    rake,
    blind,
    potAmount, 
    betAmount,
    raiseAmount,
    winners,
    gameCards = [], 
    sidePots = [],
    seats,
  } = data

  return of(
    tableActions.table.set({      
      action,
      stage, 
      roundId,
      gameType,
      rake,
      blind,
      potAmount, 
      betAmount,
      raiseAmount,
      winners, 
      gameCards, 
      sidePots,
    }),
    seatsActions.seats.set(seats),
  );
};
