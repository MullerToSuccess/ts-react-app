import * as React from "react";
import { Avatar, Select } from "antd";
import axios from "axios";
// import store from "../../store/store";
import "./userCenter.css";

const Option = Select.Option;
const mockUrl =
  "https://www.easy-mock.com/mock/5a4076786b299a5279fc91fa/example/getUser";

export default class UserCenter extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    userInfo: {
      username: "",
      isLogin: true,
      role: "admin",
      icon: "",
      phone: ""
    }
  };
  componentDidMount() {
    this.getUserInfo((res: any) => {
      console.log("user:" + res);
      this.setState({
        userInfo: res.data.data
      });
    });
  }
  getUserInfo(callback: any) {
    axios
      .get(mockUrl)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="userCenter">
        <Avatar size="large" src={this.state.userInfo.icon} />
        {this.state.userInfo.username}
        <Select defaultValue={this.state.userInfo.role} style={{ width: 120 }}>
          <Option value={this.state.userInfo.role}>
            {this.state.userInfo.role}
          </Option>
          <Option value="">{this.state.userInfo.role}</Option>
        </Select>
      </div>
    );
  }
}
