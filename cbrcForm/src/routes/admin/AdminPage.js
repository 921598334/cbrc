
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './adminPage.css';
import zhCN from 'antd/es/locale/zh_CN';
import { Layout, Menu, Carousel, Spin, ConfigProvider, Dropdown, Row, Col } from 'antd';
import { connect } from 'dva';
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
  DownOutlined,

} from '@ant-design/icons';
import { contentStyle } from './AdminPageCSS'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import BasicTable from './table/BasicTable'
import Table2 from './table/Table2'
import Table3 from './table/Table3'
import Table4 from './table/Table4'




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







    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (


      <ConfigProvider locale={zhCN}>


        {/* <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel> */}


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


                  <SubMenu key="sub2" icon={<DesktopOutlined />} title="任务发布">
                    <Menu.Item key="6">任务 1</Menu.Item>
                    <Menu.Item key="8">任务 2</Menu.Item>
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
