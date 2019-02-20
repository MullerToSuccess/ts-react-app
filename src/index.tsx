import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Hello from "./containers/Hello";
import Home from './pages/home/home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store/store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/hello" component={Hello}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
