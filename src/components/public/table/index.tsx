import * as React from "react";
import { Table } from "antd";
const columns: any = [
  {
    title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
  },
  {
    title: 'Age', width: 50, dataIndex: 'age', key: 'age', fixed: 'left',
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">action</a>,
  },
];

const data: any= [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 40,
  address: 'London Park',
}];
export interface TableData{
  data: any;
}
export interface TableColums{
  columns: any;
}
class Mtable extends React.Component<any> {
  render() {
    return (
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    );
  }
}

export default Mtable;
