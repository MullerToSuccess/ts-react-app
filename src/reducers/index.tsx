import { EnthusiamAction } from "../actions";
// import { StoreState } from "../types";
import {
  INCREMENT_ENTHUSIASM,
  DECREMENT_ENTHUSIASM,
  CHANGE_ITEM
} from "../constants";
import { ChangeItem } from "../actions";
import { combineReducers } from "redux";

// const enthusiamInitial: StoreState = {
//   languageName: "",
//   enthusiasmLevel: 0,
//   itemName: ""
// };
function enthusiam(
  state = { languageName: "", enthusiasmLevel: 0 },
  action: EnthusiamAction
) {
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

function changeItemAsyn(
  state = {itemName:'初始'},
  action: ChangeItem
) {
  switch (action.type) {
    case CHANGE_ITEM:
      return { ...state, itemName: "dispatchItem" };
    default:
      return state;
  }
}

export default combineReducers({ enthusiam, changeItemAsyn });
