import * as React from "react";
import { Avatar } from "antd";
import axios from "axios";
// import store from "../../store/store";
import './userCenter.css'

const mockUrl =
  "https://www.easy-mock.com/mock/5a4076786b299a5279fc91fa/example/getUser";

class UserCenter extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    userInfo: {
      username: "",
      isLogin: true,
      role: "",
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
      <div className='userCenter'>
        <Avatar size="large" src={this.state.userInfo.icon} />
        {this.state.userInfo.username}
      </div>
    );
  }
}

export default UserCenter;
