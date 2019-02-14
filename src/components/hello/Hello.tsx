import * as  React from 'react';
import './hello.css';
import Header from '../public/header/header';
import Footer from '../public/footer/footer';
// import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
  }

class Hello extends React.Component<Props, {}>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const {name, enthusiasmLevel=1, onDecrement, onIncrement } = this.props;

        if(enthusiasmLevel <= 0){
            throw new Error('you could need more enthusiam');
        }
        return (
            <div className="hello">
                <Header name='Title'></Header>
                <Footer name='Footer'></Footer>
                <div className="greeting">
                {/* <Button>111</Button> */}
                {name}
                {enthusiasmLevel}
                {/* Hello {name + getExclamationMarks(enthusiasmLevel)} */}
                </div>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        )
    }
}

// ReactDOM.render(<Hello />, mountNode);
export default Hello;