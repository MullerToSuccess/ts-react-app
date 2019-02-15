import * as React from "react";
import "./hello.css";
// import Header from '../public/header/header';
// import Footer from '../public/footer/footer';
// import Test from '../public/test/test';
import { Button, Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";
// import 'antd-mobile/dist/antd-mobile.css';

// const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

class Hello extends React.Component<Props, {}> {
  // constructor(props: Props){
  //     super(props);
  //     this.state = {
  //         current: 'mail'
  //     }
  // }
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick = (e: any) => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
  render() {
    const { name, enthusiasmLevel = 1, onDecrement, onIncrement } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error("you could need more enthusiam");
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <div className="hello">
                {/* <Header name='Title'></Header>
                <Footer name='Footer'></Footer> */}
                <div className="greeting">
                  {name}
                  {enthusiasmLevel}
                </div>
                <Button className="btn" type="primary" onClick={onDecrement}>
                  减
                </Button>
                <Button className="btn" type="primary" onClick={onIncrement}>
                  加
                </Button>
                <div />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

// ReactDOM.render(<Hello />, mountNode);
export default Hello;
