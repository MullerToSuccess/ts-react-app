import * as React from "react";
import { Drawer, Input, Form } from "antd";
// import axios from "axios";
import store from "../../store/store";
import "./sideMenu.css";

// export interface Visible {
//   visible?: boolean;
//   /* 定义侧边栏的显示参数 */
//   userName?: string;
//   userPhoto?: string;
//   phone?: number;
//   idNumber?: number;
//   loginName?: string;
//   status?: Boolean;
//   department?: string;
//   age?: string;
//   address?: string;
// }
class SideMenu extends React.Component<any, any> {
  constructor(props: any) {
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
    const { getFieldDecorator } = this.props.form;
    console.log(1111,this.props);
    const { visible, userName, sideUserInfo } = this.props;
    return (
      <div>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          <Form.Item
            label="姓名"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <div>姓名：<Input placeholder="" value={userName}/></div>
          <div>年龄：<Input placeholder="" value={sideUserInfo.age}/></div>
          <div>地址：<Input placeholder="" value={sideUserInfo.address}/></div>
        </Drawer>
      </div>
    );
  }
}

export default SideMenu;
