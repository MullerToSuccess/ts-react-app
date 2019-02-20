import {
  CHANGE_ITEM
} from "../constants";
import { ChangeItem } from "../actions";


export default function changeItemAsyn(
  state = {itemName:'初始'},
  action: ChangeItem
) {
  switch (action.type) {
    case CHANGE_ITEM:
      return { ...state, itemName: action.text };
    default:
      return state;
  }
}
