import SideMenu from '../components/sideMenu/Sidemenu';
import * as actions from '../actions';
// import { StoreState } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// import axios from 'axios';


export function mapStateToProps(state: any) {
  return {
    visible: state.toggleVisible.visible,
    userName: state.getColumn.userName
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ToggleVisible>) {
  return {
      toggleVisible: (isVisible: Boolean) => {
        dispatch(actions.toggleVisible(isVisible));
      }
  }
}

//connect 成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);