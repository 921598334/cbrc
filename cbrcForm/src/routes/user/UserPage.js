
import React,{Fragment} from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './userPage.css';
import { connect } from 'dva';
import { Layout, Menu, Carousel } from 'antd'; 
//import { Router,Route, Switch, Link, withRouter } from 'dva/router'; //天坑，局部路由跳转不能用dva的
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'      //局部路由跳转能用这个

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,

} from '@ant-design/icons';
import Table1 from './table/Table1'
import Table2 from './table/Table2'


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

let MyComponent = Table2




@connect(({ loginNamespace }) => ({
  loginNamespace,
}))


class UserPage extends React.Component {




  //点击按钮进行页面跳转
  buttonClick = (e) => {

    console.log(e)
    if (e.key === '1.1') {
      console.log("1.1执行")
      //this.props.history.push('/content1')
      MyComponent = Table1
    } else if (e.key === '1.2') {
      console.log("1.2执行")
      //this.props.history.push('/content2')
      MyComponent = Table2
    }

  }

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (


      <Router>




        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" style={{
              height: '32px',
              background: 'rgba(255, 255, 255, 0.3)',
              margin: '16px',
            }

            }

            />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

              <SubMenu key="1" icon={<PieChartOutlined />} title="数据上报">
                <Menu.Item key="1.1" onClick={this.buttonClick}>专业代理、经纪用表</Menu.Item>
                <Menu.Item key="1.2" onClick={this.buttonClick}>公估机构用表</Menu.Item>
                <Menu.Item key="1.3" onClick={this.buttonClick}>合作销售寿险公司产品统计表</Menu.Item>
                <Menu.Item key="1.4" onClick={this.buttonClick}>银邮代理机构用表</Menu.Item>
              </SubMenu>


              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <SubMenu key="3" icon={<UserOutlined />} title="User">
                <Menu.Item key="3" >Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="4" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6"><Link to="/table1">用户信息1</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/table2">用户信息2</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
            </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{
              padding: 0,
              style: {
                background: '#fff',
              }

            }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
                style: {
                  color: '#1890ff',
                  fontSize: '18px',
                  lineHeight: '64px',
                  padding: '0 24px',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                }

              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 1080,
              }}
            >

              
                <Route path="/table1" component={Table1} />
                <Route path="/table2" component={Table2} />
          

            </Content>
          </Layout>
        </Layout>




     


      </Router>


    );



  }
}

export default UserPage
