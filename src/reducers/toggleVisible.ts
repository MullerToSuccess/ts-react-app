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
  department: '',
  age: '',
  address: ''
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
     let newState = state;
     newState = Object.assign({}, newState, action.data);
      return newState;
    default:
      return state;
  }
}