import { of } from "rxjs";
import { PLAYER_CREATED, PLAYER_UPDATED } from "../../../constants/socketMessages";

import playerActions from "../../actions/players"

export default (socketMessage, state) => {
  const { MessageType, player, timeline } = socketMessage;

  if(MessageType === PLAYER_UPDATED) {
    return of(
      playerActions.player.updated(player),
    );
  } else {
    return of(
      playerActions.player.added(player),
    ); 
  }

};
