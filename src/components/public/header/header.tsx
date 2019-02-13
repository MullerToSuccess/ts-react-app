import * as React from 'react';

import './header.css';

export interface head{
    name: string;
}

class Header extends React.Component<head, {}>{
    constructor(props: head){
        super(props);
    }

    render(){
        const {name} = this.props;

        return(
            <div className='header'>
            {name}
            </div>
        )
    }
}

export default Header;