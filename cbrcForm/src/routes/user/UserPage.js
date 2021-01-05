
import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './userPage.css';
import { connect } from 'dva';
import { Layout, Menu, Carousel, Spin, Row, Col, Dropdown, notification, ConfigProvider } from 'antd';
//import { Router,Route, Switch, Link, withRouter } from 'dva/router'; //天坑，局部路由跳转不能用dva的
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'      //局部路由跳转能用这个
import zhCN from 'antd/es/locale/zh_CN';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,

  ExceptionOutlined,

  DownOutlined,

} from '@ant-design/icons';
import Table1 from './table/Table1'
import Table2 from './table/Table2'
import Table3 from './table/Table3'
import Table4 from './table/Table4'
import TaskComplete from './table/TaskComplete'


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;






@connect(({ uploadNamespace }) => ({
  uploadNamespace,
}))


class UserPage extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      collapsed: false,
    }
  }

  componentDidMount() {
    //初始化时需要读取cellinfo表获取所有的表格信息
    this.props.dispatch({
      type: "uploadNamespace/getCell",

    })


    //获取token
    this.props.dispatch({
      type: "uploadNamespace/getCookieReduce",

    })



  }


  //点击按钮进行页面跳转
  buttonClick = (e) => {

    console.log(e)
    if (e.key === '1.1') {
      console.log("1.1执行")
      //this.props.history.push('/content1')

    } else if (e.key === '1.2') {
      console.log("1.2执行")
      //this.props.history.push('/content2')

    }

  }



  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };



  exit = (e) => {
    console.log('开始退出登陆')
    //获取token
    this.props.dispatch({
      type: "uploadNamespace/exit",

    })
      .then(result => {
        if (result) {
          notification.success({ message: '已安全退出' })
          this.props.history.push('/')

        }
      })


  }




  render() {


    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.exit}>
            退出登陆
          </a>
        </Menu.Item>

      </Menu>
    );


    const { table1Struct } = this.props.uploadNamespace





    return (


      <ConfigProvider locale={zhCN}>

        <Spin spinning={table1Struct === 'null'} tip="数据加载中...">

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

                  {/* <SubMenu key="1" icon={<PieChartOutlined />} title="基础数据上报">
                  <Menu.Item key="1.1" ><Link to="/user/table1">专业代理、经纪用表</Link></Menu.Item>
                  <Menu.Item key="1.2" ><Link to="/user/table2">公估机构用表</Link></Menu.Item>
                  <Menu.Item key="1.3" ><Link to="/user/table3">合作销售寿险公司产品统计表</Link></Menu.Item>
                  <Menu.Item key="1.4" ><Link to="/user/table4">银邮代理机构用表</Link></Menu.Item>
                </SubMenu> */}


                  <Menu.Item key="2" icon={<ExceptionOutlined />} >
                    <Link to="/user/taskcomplete">待处理任务</Link>
                  </Menu.Item>

                  {/* <SubMenu key="3" icon={<DesktopOutlined />} title="临时材料上报">
                    <Menu.Item key="3" >材料1</Menu.Item>
                    <Menu.Item key="4">材料2</Menu.Item>
                    <Menu.Item key="5">材料3</Menu.Item>
                  </SubMenu> */}


                  <Menu.Item key="9" icon={<UserOutlined />}>
                    <Link to="/user/setting">用户信息设置</Link>

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

                  <Row justify="space-between">

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



                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {this.props.uploadNamespace.username} <DownOutlined />
                      </a>
                    </Dropdown>

                  </Row>




                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 1080,
                  }}
                >


                  <Route exact path="/user/table1" component={Table1} />
                  <Route exact path="/user/table2" component={Table2} />
                  <Route exact path="/user/table3" component={Table3} />
                  <Route exact path="/user/table4" component={Table4} />
                  <Route exact path="/user/taskcomplete" component={TaskComplete} />
                  <Route exact path="/user/setting" component={TaskComplete} />


                </Content>
              </Layout>
            </Layout>

          </Router>


        </Spin>


      </ConfigProvider>

    );




  }
}

export default UserPage
