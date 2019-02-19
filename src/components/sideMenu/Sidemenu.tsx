import * as React from 'react';
import {Menu, Icon} from 'antd';
import axios from 'axios';

const SubMenu = Menu.SubMenu;
export interface modulesArray{
    defaultModule: any
}

const mockUrl = 'https://www.easy-mock.com/mock/5a4076786b299a5279fc91fa/example/getModules';

  class SideMenu extends React.Component<any, modulesArray>{
      constructor(prop: any){
        super(prop);
        this.state = {
            defaultModule: []
        }
      }
      public componentDidMount(){
          this.getModules((res: any)=>{
              console.log('res:', res)
              this.setState({
                  defaultModule: res.data.data.defaultModule
              })
          })
      }
      public getModules(callback: any){
        axios.get(mockUrl).then((res) =>{
            callback(res);
        }).catch(err => {
            console.log(err)
        })
      }
      public render(){
        const menuProcess = (nodes: any): any => {
            return nodes.map((item: any, i: any) => {
              const subMenuItem = menuProcess(item.router);
              return (
                <SubMenu
                  key={item.key}
                  title={
                    <span>
                      <Icon type='star' />
                      <span>{item.label}</span>
                    </span>
                  }
                >
                  {subMenuItem}
                </SubMenu>
              );
            });
          };
          const menu = menuProcess(this.state.defaultModule);

          return <Menu theme = "dark" defaultSelectedKeys={["1"]} mode="inline">
          {menu}
        </Menu>
      }
  }

  export default SideMenu;