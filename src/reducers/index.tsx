import { EnthusiamAction } from "../actions";
import { StoreState } from "../types/index";
import {
  INCREMENT_ENTHUSIASM,
  DECREMENT_ENTHUSIASM,
  CHANGE_ITEM
} from "../constants/index";
import { ChangeItem } from "../actions";
import { combineReducers } from "redux";

function enthusiam(state: StoreState, action: EnthusiamAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)
      };
    default:
      return state;
  }
}

function changeItemAsyn(state: StoreState, action: ChangeItem): StoreState {
  switch (action.type) {
    case CHANGE_ITEM:
      return state;
    default:
      return state;
  }
}

export default combineReducers({ enthusiam, changeItemAsyn });
