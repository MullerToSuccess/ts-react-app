import * as React from "react";
import { Drawer, Button } from "antd";
// import axios from "axios";
import store from "../../store/store";

export interface Visible {
  visible?: boolean;
  /* 定义侧边栏的显示参数 */
  userName?: string;
  userPhoto?: string;
  phone?: number;
  idNumber?: number;
  loginName?: string;
  status?: Boolean;
  department?: string;
}
class SideMenu extends React.Component<Visible, any> {
  constructor(props: Visible) {
    super(props);
  }
  showDrawer = () => {
    store.dispatch({ type: "TOGGLE_VISIBLE", data: true });
  };

  onClose = () => {
    store.dispatch({ type: "TOGGLE_VISIBLE", data: false });
  };
  setItemName = (e: any) => {
    store.dispatch({ type: "CHANGE_ITEM", text: e.key });
  };
  public render() {
    const { visible } = this.props;
    return (
      <div>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          <span>查看用户信息</span>
          <Button>xxxxxxx</Button>
        </Drawer>
      </div>
    );
  }
}

export default SideMenu;
