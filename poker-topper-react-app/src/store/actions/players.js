import { createActions } from 'redux-actions';
export default createActions({
  PLAYERS: {
    SET: null,
    CLEAR: null
  },
  PLAYER: {
    ADD: null,
    ADDED: null,
    UPDATE: null,
    UPDATED: null,
    LOCK: null,
    LOCKED: null,
    UNLOCK: null,
    UNLOCKED: null,
    REMOVE: null,
  },
  BALANCE: {
    ADD: null,
    REMOVE: null,
    SUCCESS: null,
    FAILURE: null,
    UPDATE: null,
  },
});