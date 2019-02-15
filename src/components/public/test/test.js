import * as React from 'react';
import { Button } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';



class Test extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {name} = this.props;
        return(
            <div className='header'>
            <Button></Button>
            {name}
            </div>
        )
    }
}

export default Test;