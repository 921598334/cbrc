
import React from 'react';
import 'antd/dist/antd.css';
import './adminPage.css';
import zhCN from 'antd/es/locale/zh_CN';
import { Layout, Menu, Spin, ConfigProvider, Dropdown, Row } from 'antd';
import { connect } from 'dva';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  PieChartOutlined,
  ClusterOutlined,
  DownOutlined,

} from '@ant-design/icons';

import Cookies from 'js-cookie'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import BasicTable from './table/BasicTable'
import RangeTable from './table/RangeTable'
import HistoryTask from './task/HistoryTask'
import PublishTask from './task/PublishTask'
import HistoryTaskDetail from './task/HistoryTaskDetail'

import OrgSetting from './manager/OrgSetting'
import TimerSetting from './manager/TimerSetting'
import UserSetting from './manager/UserSetting'


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;




@connect(({ adminNamespace }) => ({
  adminNamespace,
}))

class AdminPage extends React.Component {


  constructor(props) {
    super(props);


    this.state = {
      collapsed: false,
      username: '',
      token:'',
    };
  }


  componentDidMount() {

    console.log('AdminPage的componentWillMount开始执行')

    const username = Cookies.get('username');
    const token = Cookies.get('token');

    this.setState({
      username: username,
      token:token,
    })

   
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  exit = (e) => {
    console.log('开始退出登陆')

    Cookies.remove('username');
    Cookies.remove('token');

    console.log('cookie已经清除，跳转到登陆界面')

    this.props.history.push('/')

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








    return (


      <ConfigProvider locale={zhCN}>


    

        <Spin spinning={false} tip="数据加载中...">

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


                  <SubMenu key="sub1" icon={<PieChartOutlined />} title="监管数据查看">
                    <Menu.Item key="3"> <Link to='/admin/basicTable'>基础报表查看</Link></Menu.Item>
                    <Menu.Item key="4"> <Link to='/admin/rangeTable'>汇总报表查看</Link></Menu.Item>

                  </SubMenu>





                  <SubMenu key="sub2" icon={<DesktopOutlined />} title="任务模块">
                    <Menu.Item key="6"><Link to='/admin/publishTask'>发布任务</Link></Menu.Item>
                    <Menu.Item key="8"><Link to='/admin/historyTask'>历史任务</Link></Menu.Item>
                  </SubMenu>


                  <SubMenu key="sub3" icon={<ClusterOutlined />} title="管理模块">
                    <Menu.Item key="10"><Link to='/admin/userManager'>用户管理</Link></Menu.Item>
                    <Menu.Item key="11"><Link to='/admin/orgManager'>机构管理</Link></Menu.Item>
                    <Menu.Item key="12"><Link to='/admin/timerManager'>定时任务管理</Link></Menu.Item>
                  </SubMenu>


                  {/* <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                  </Menu.Item> */}

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
                        {this.state.username} <DownOutlined />
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
                  <Route exact path="/admin/basicTable" component={BasicTable} />
                  <Route exact path="/admin/rangeTable" component={RangeTable} />
                  <Route exact path="/admin/publishTask" component={PublishTask} />

                  <Route exact path="/admin/historyTask" component={HistoryTask} />
                  <Route exact path="/admin/historyTaskDetail" component={HistoryTaskDetail} />

                  <Route exact path="/admin/userManager" component={UserSetting} />
                  <Route exact path="/admin/orgManager" component={OrgSetting} />
                  <Route exact path="/admin/timerManager" component={TimerSetting} />

                  

                </Content>
              </Layout>
            </Layout>

          </Router>

        </Spin>



      </ConfigProvider>


    );



  }
}

export default AdminPage
