import { EnthusiamAction } from "../actions";
import {
  INCREMENT_ENTHUSIASM,
  DECREMENT_ENTHUSIASM,
} from "../constants";

export default function enthusiam(
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

