import * as React from "react";
import { Breadcrumb } from "antd";

export interface Item{
    itemName?: string;
    itemKey?: number;
    changeItem?: () => void; 
}
class Crumb extends React.Component<Item>{
  constructor(props: Item) {
    super(props);
  }
  render() {
    const { itemName } = this.props;
    return (
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>{itemName}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default Crumb;
