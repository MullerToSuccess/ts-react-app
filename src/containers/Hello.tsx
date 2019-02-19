import Hello from '../components/hello/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiamAction>) {
  return {
    onIncrement: () => {
      setTimeout(() => {
        dispatch(actions.incrementEnthusiam())
      }, 3000);
      dispatch(actions.decrementEnthusiam())
    },
    // dispatch(actions.incrementEnthusiam()),
    onDecrement: () => dispatch(actions.decrementEnthusiam()),
  }
}

//connect 成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Hello);