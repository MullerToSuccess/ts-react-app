import Mtable from '../components/public/table/index';
import * as actions from '../actions';
// import { StoreState } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';

const mockUrl = 'https://www.easy-mock.com/mock/5a4076786b299a5279fc91fa/example/getTables';

export function mapStateToProps(state: any) {
  return {
    table:state.getTableAsyn.table
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.GetTable>) {
  return {
    getTableAsyn: () => {
        axios.get(mockUrl).then((res) => {
            console.log(res);
            dispatch(actions.getTable(res.data.data));
        }).catch(err => {
            console.log(err);
        })
    }
  }
}

//connect 成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Mtable);