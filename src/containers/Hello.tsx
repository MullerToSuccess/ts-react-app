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
    onIncrement: () => dispatch(actions.incrementEnthusiam()),
    onDecrement: () => dispatch(actions.decrementEnthusiam()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);