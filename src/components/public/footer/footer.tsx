import * as React from 'react';

import './footer.css';

export interface footer{
    name: string;
}

class Footer extends React.Component<footer, {}>{
    constructor(props: footer){
        super(props);
    }

    render(){
        const {name} = this.props;

        return(
            <div className='footer'>
            {name}
            </div>
        )
    }
}

export default Footer;