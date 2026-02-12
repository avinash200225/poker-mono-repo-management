import { of } from "rxjs";
import { PLAYER_OFFLINE, PLAYER_ONLINE, PLAYER_LOCK, PLAYER_UNLOCK, PLAYER_LOCKED, PLAYER_UNLOCKED } from "../../../constants/socketMessages";

import playerActions from "../../actions/players"
import opertionsActions from "../../actions/operations"

export default (socketMessage, state) => {
  const { MessageType, player, timestamp } = socketMessage;

  switch(MessageType) {
    case PLAYER_OFFLINE: 
    case PLAYER_ONLINE:
      return of(
        opertionsActions.operations.add({timestamp, MessageType, ...player}),
        playerActions.player.updated(player),
      );
      break;
    case PLAYER_LOCK: 
    case PLAYER_UNLOCK:
      break;
    case PLAYER_LOCKED: 
    case PLAYER_UNLOCKED:
      return of(
        opertionsActions.operations.add({timestamp, MessageType, ...player}),
      );
  }


};
