import * as React from "react";
import * as ReactDOM from "react-dom";
// import App from './App';
import { Provider } from "react-redux";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import  thunk  from 'redux-thunk';
import  reducers  from "./reducers/index";
import Hello from "./containers/Hello";
import Home from './pages/home/home';
// 安装redux-devtools-extension的可视化工具
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// 定义需要的中间件
const middleware = [thunk];
//initalState:
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        {/* <Button></Button> */}
        <Route exact path="/" component={Home} />
        <Route path="/hello" component={Hello}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
