import * as React from "react";
import "./hello.css";
// import Header from '../public/header/header';
// import Footer from '../public/footer/footer';
// import Test from '../public/test/test';
import SideMenu from '../sideMenu/Sidemenu';
import Crumb from '../../containers/Crumb';
import  Mtable  from '../public/table/index';
import UserCenter from '../userCenter/userCenter';
import { Layout} from "antd";
import "antd/dist/antd.css";
// import 'antd-mobile/dist/antd-mobile.css';
import { Map, is } from "immutable"; //引入immutable
// const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;
export interface Props {
  name?: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
/**
 *直接构造的无状态组件
 *
 * @class Hello
 * @extends {React.Component<Props, {}>}
 */
class Hello extends React.Component<Props, {}> {
  constructor(props: Props, context: any) {
    super(props, context);
    // this.state = {
    //     // current: 'mail'
    // }
  }
  public state = {
    collapsed: false,
    test: { value: 0 }
  };

  public onCollapse = (collapsed: any, test: any) => {
    console.log(this.context);
    let data = Map(this.state.test);
    let a = Map({
      select: "users",
      filter: Map({ name: "Cam" })
    });
    let b = a.set("select", "people");

    console.log(is(a, b));
    this.setState({ collapsed, test: data });
  };
  render() {
    const { enthusiasmLevel = 1} = this.props;
    // const { name='mmm', enthusiasmLevel = 1, onDecrement, onIncrement } = this.props;

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
          <SideMenu></SideMenu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <UserCenter></UserCenter>
          <Content style={{ margin: "0 16px" }}>
            <Crumb></Crumb>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <div className="hello">
              <Mtable></Mtable>
                {/* <div className="greeting">
                  {name}
                  {enthusiasmLevel}
                </div>
                <Button className="btn" type="primary" onClick={onDecrement}>
                  pre
                </Button>
                <Button className="btn" type="primary" onClick={onIncrement}>
                  next
                </Button> */}
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
