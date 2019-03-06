import { TOGGLE_VISIBLE, GET_COLUMN } from "../constants";

import { ToggleVisible, GetColumn } from "../actions";

const initState = {
  visible: false,
  userName: '',
  userPhoto: '',
  phone:'',
  idNumber: '', 
  loginName: '',
  status: false,
  department: ''
}
export  function toggleVisible(state = initState, action: ToggleVisible) {
  switch (action.type) {
    case TOGGLE_VISIBLE:
      return { ...state, visible: action.data };
    default:
      return state;
  }
}
export  function getColumn(state = initState, action: GetColumn) {
  switch (action.type) {
    case GET_COLUMN:
      return { ...state, state: action.data };
    default:
      return state;
  }
}