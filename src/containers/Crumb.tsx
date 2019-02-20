import Crumb from '../components/crumb/Crumb';
import * as actions from '../actions';
// import { StoreState } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// export function mapStateToProps({itemName}: StoreState) {
export function mapStateToProps(state: any) {
  return {
    name:state.changeItemAsyn.itemName
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ChangeItem>) {
  return {
    changeItem: () => {
        dispatch(actions.changeAction());
    }
  }
}

//connect 成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Crumb);