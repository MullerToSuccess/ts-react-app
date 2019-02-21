import { GET_TABLE } from "../constants";

import { GetTable } from "../actions";

export default function getTableAsyn(state = { table: [] }, action: GetTable) {
  switch (action.type) {
    case GET_TABLE:
      return { ...state, table: action.data };
    default:
      return state;
  }
}
