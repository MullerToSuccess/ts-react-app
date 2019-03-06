//引入各个模块需要的reducer函数：
import enthusiam from "./enthusiam";
import changeItemAsyn from "./change";
import getTableAsyn from "./table";
import { toggleVisible, getColumn } from "./toggleVisible";

import { combineReducers } from "redux";

export default combineReducers({
  enthusiam,
  changeItemAsyn,
  getTableAsyn,
  toggleVisible,
  getColumn
});
