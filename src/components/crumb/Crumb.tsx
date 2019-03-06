import * as React from "react";
import { Button, Modal} from "antd";
import './crumb.css';
export interface Item{
    name?: string;
    itemKey?: number;
    changeItem?: () => void; 
}
class Crumb extends React.Component<Item>{
  constructor(props: Item) {
    super(props);
    // this.state={
    //   visible: false
    // }
  }
  state = {
    visible: false
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    console.log(this.props);
    const { name } = this.props;
    return (
      <div>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
      </Breadcrumb> */}
      <div className='currentTitle'>{name}</div>
      <Modal
          title="添加"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        
        </Modal>
      <div className='buttonGroup'>
        <Button type='primary' onClick={this.showModal}>添加用户</Button>
        <Button type='primary'>调整部门</Button>
        <Button type='primary'>批量添加</Button>
        <Button type='danger'>批量删除</Button>
      </div>
      </div>
    );
  }
}

export default Crumb;
