import * as React from "react";
import { Menu, Icon } from "antd";
import axios from "axios";
import store from '../../store/store';

const SubMenu = Menu.SubMenu;
export interface modulesArray {
  defaultModule: any;
}

const mockUrl =
  "https://www.easy-mock.com/mock/5a4076786b299a5279fc91fa/example/getModules";

class SideMenu extends React.Component<any, modulesArray> {
  constructor(prop: any, context: any) {
    super(prop, context);
    this.state = {
      defaultModule: []
    };
  }
  componentDidMount() {
    this.getModules((res: any) => {
      console.log("res:", res);
      this.setState({
        defaultModule: res.data.data.defaultModule
      });
    });
  }
  setItemName = (e: any) => {
    // console.log(e)
    store.dispatch({ type: "CHANGE_ITEM", text: e.key});
  };
  getModules(callback: any) {
    axios
      .get(mockUrl)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  public render() {
    const menuProcess = (nodes: any): any => {
    //   return  <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
    //   <Menu.Item key="1">Option 1</Menu.Item>
    //   <Menu.Item key="2">Option 2</Menu.Item>
    //   <Menu.Item key="3">Option 3</Menu.Item>
    //   <Menu.Item key="4">Option 4</Menu.Item>
    // </SubMenu>;
      return nodes.map((item: any) => {
        if (item.router) {
          const subMenuItem = menuProcess(item.router);
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type="star" />
                  <span>{item.label}</span>
                </span>
              }
            >
              {subMenuItem}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.key}>
              {
                <span>
                  {<Icon type='star' />}
                  {item.label}
                </span>
              }
            </Menu.Item>
          );
        }
      });
    };
    const menu = menuProcess(this.state.defaultModule);
    console.log(menu)
    return (
      <Menu
        onClick={this.setItemName}
        theme="dark"
        defaultSelectedKeys={["4"]}
        mode="inline"
      >
        {menu}
      </Menu>
    );
  }
}

export default SideMenu;
