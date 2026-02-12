import { createActions } from 'redux-actions';
export default createActions({
  GAME: {
    NEW: null,
    CANCEL: null,
    ELECT: null,
    START: null,
    SETTLE: null,
  },
  ROUND: {
    END: null,
  },
  HAND: {
    ALLIN: null,
    FOLD: null,
    CHECK: null,
    RAISE: null,
    BET: null,
    CALL: null,
  },
  CARD: {
    DRAW: null,
    BURN: null
  }
});