import * as React from "react";
import { Breadcrumb, Button } from "antd";

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
    const { itemName, changeItem } = this.props;
    return (
      <div>
        <Button className="btn" type="primary" onClick={changeItem}>
                  {itemName}
                </Button>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>{itemName}</Breadcrumb.Item>
      </Breadcrumb>
      </div>
    );
  }
}

export default Crumb;
