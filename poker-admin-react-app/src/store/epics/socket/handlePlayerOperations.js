/*
 * Copyright 2025 Wildace Private Limited - All Rights Reserved
 *
 * Licensed under Wildace Software License Agreement ("License").
 * You may not use this file except in compliance with the License.
 *
 * NOTICE
 * ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS THE PROPERTY OF WILDACE PRIVATE LIMITED.
 * THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED HEREIN ARE PROPRIETARY TO WILDACE PRIVATE LIMITED AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 * DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED FROM WILDACE PRIVATE LIMITED.
 * **********************************************************************************************************************************************************************
 * Change History
 * **********************************************************************************************************************************************************************
 * |     Date      |     Name     |      Change     |      Details
 * |  01/08/2025   | Wilson Sam   |     Created     |  File Creation
 * **********************************************************************************************************************************************************************
 * */
import { of } from "rxjs";
import {
  PLAYER_OFFLINE,
  PLAYER_ONLINE,
  PLAYER_LOCK,
  PLAYER_UNLOCK,
  PLAYER_LOCKED,
  PLAYER_UNLOCKED,
} from "../../../constants/socketMessages";

import playerActions from "../../actions/players";
import opertionsActions from "../../actions/operations";

export default (socketMessage, state) => {
  const { MessageType, player, timestamp } = socketMessage;

  switch (MessageType) {
    case PLAYER_OFFLINE:
    case PLAYER_ONLINE:
      return of(
        opertionsActions.operations.add({ timestamp, MessageType, ...player }),
        playerActions.player.updated(player)
      );
      break;
    case PLAYER_LOCK:
    case PLAYER_UNLOCK:
      break;
    case PLAYER_LOCKED:
    case PLAYER_UNLOCKED:
      return of(
        opertionsActions.operations.add({ timestamp, MessageType, ...player })
      );
  }
};
