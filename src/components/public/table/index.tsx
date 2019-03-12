import * as React from "react";
import { Table, Modal, Icon } from "antd";
import store from "../../../store/store";
import "./table.css";
export interface TableData {
  data: any;
}
export interface TableColums {
  columns: any;
}
export interface textData {
  name: string;
  age: string;
  address: string;
}
class Mtable extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }
  state = { table: [], visible: false };
  componentDidMount() {
    this.getTableData();
  }
  showModal = (text: textData, record: any) => {
    store.dispatch({ type: "TOGGLE_VISIBLE", data: true });
    store.dispatch({
      type: "GET_COLUMN",
      data: {
        userName: text.name,
        age: text.age,
        address: text.address
      }
    });
  };
  getTableData() {
    store.dispatch({ type: "GET_TABLE" });
  }
  handleOk = (e: any) => {
    this.setState({
      visible: false
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false
    });
  };
  render() {
    const columns: any = [
      {
        title: "姓名",
        width: 100,
        dataIndex: "name",
        key: "name",
        fixed: "left"
      },
      {
        title: "手机",
        width: 100,
        dataIndex: "age",
        key: "age",
        fixed: "left"
      },
      { title: "账户", dataIndex: "address", key: "1" },
      { title: "使用状态", dataIndex: "address", key: "2" },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 200,
        render: (text: textData, record: any) => (
          <div>
            <span
              onClick={() => {
                this.showModal(text, record);
              }}
            >
              <Icon style={{ fontSize: "24px", color: "#08c" }} type="edit" />
            </span>
            <span className="left5">
              <Icon style={{ fontSize: "24px", color: "#08c" }} type="delete" />
            </span>
          </div>
        )
      }
    ];
    const { table } = this.props;
    return (
      <div>
        <Modal
          title="编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
        <Table columns={columns} dataSource={table} scroll={{ x: 1300 }} />
      </div>
    );
  }
}

export default Mtable;
