import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import { Provider } from "react-redux";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { enthusiam } from "./reducers/index";
// import { StoreState } from './types/index';
import Hello from "./containers/Hello";
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from "redux-devtools-extension";
// import { Route} from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//在storeState泛型定义返回会报错：参数个数不对应
// const store = createStore<StoreState>(enthusiam, {
//   enthusiasmLevel: 1,
//   languageName: 'TypeScript'
// })
const store = createStore(
  enthusiam,
  {
    enthusiasmLevel: 1,
    languageName: ""
  },
  composeWithDevTools()
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/hello" component={Hello}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
