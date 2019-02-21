import * as React from "react";
import { Table } from "antd";
import store from "../../../store/store";

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
  // { title: 'Column 3', dataIndex: 'address', key: '3' },
  // { title: 'Column 4', dataIndex: 'address', key: '4' },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a href="javascript:;">查看</a>
  }
];
export interface TableData {
  data: any;
}
export interface TableColums {
  columns: any;
}
class Mtable extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = { table: [] };
  componentDidMount() {
    this.getTableData();
  }
  getTableData() {
    store.dispatch({ type: "GET_TABLE" });
    // this.getTableAsyn();
  }
  render() {
    const { table } = this.props;
    return (
      <div>
      <Table
        columns={columns}
        dataSource={table}
        scroll={{ x: 1300 }}
      />
      </div>
    );
  }
}

export default Mtable;
