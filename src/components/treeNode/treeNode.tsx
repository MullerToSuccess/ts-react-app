import * as React from "react";
import { Tree, Input } from "antd";
// import axios from "axios";
import store from "../../store/store";
import "./treeNode.css";

//action
import * as actions from "../../actions";
// import { StoreState } from '../types';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";
// import { get } from '../../axios/axios';

// const thisApi = {
//     getTable: get
// }
const { TreeNode } = Tree;
const Search = Input.Search;
const mockUrl =
  "https://www.easy-mock.com/mock/5a4076786b299a5279fc91fa/example/getTables";

class MtreeNode extends React.Component<any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  componentDidMount() {
    
  }
  /* 设置当前选择的节点名 */
  setItemName = (e: any) => {
    store.dispatch({ type: "CHANGE_ITEM", text: e.key });
  };
  /* 选择树节点 */
  onSelect = (selectedKeys: any, info: any) => {
    store.dispatch({ type: "CHANGE_ITEM", text: info.node.props.title });
    console.log(info);
    let params = {
        params:{
            keys: info.node.props.eventKey
        }
    }
    this.props.getTableAsyn(params);
  };
  /* 搜索获取表格数据 */
  goSearch = (val: any) =>{
    console.log(val);
    this.props.getTableAsyn(val);
  }
  public render() {
    return (
      <div className="sideWrapper">
        <Search
          placeholder="搜索部门成员"
          enterButton="搜索"
          size="small"
          onSearch={this.goSearch}
        />
        <Tree showLine defaultExpandedKeys={["0-0-0"]} onSelect={this.onSelect}>
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
              <TreeNode title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="leaf" key="0-0-1-0" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2">
              <TreeNode title="leaf" key="0-0-2-0" />
              <TreeNode title="leaf" key="0-0-2-1" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    );
  }
}
export function mapStateToProps({ table }: any) {
    return {
        table
    }
  }
export function mapDispatchToProps(dispatch: Dispatch<actions.GetTable>) {
  return {
    getTableAsyn: (params: any) => {
      axios
        .get(mockUrl, params)
        .then(res => {
          console.log(res.data.data);
          dispatch(actions.getTable(res.data.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MtreeNode);
