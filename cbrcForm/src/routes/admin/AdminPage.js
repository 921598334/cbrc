
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './adminPage.css';
import { Layout, Menu, Carousel, Spin } from 'antd';
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
import { contentStyle } from './AdminPageCSS'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import RangeTable from './table/RangeTable'
import BasicTable from './table/BasicTable'
import Table2 from './table/Table2'
import Table3 from './table/Table3'
import Table4 from './table/Table4'




const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;



class AdminPage extends React.Component {


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




      <div>


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

                 

                  <Menu.Item key="2" icon={<DesktopOutlined />}>
                    <Link to='/table2'>数据查询与下载2</Link>
                  </Menu.Item>

                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
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



                  <Route exact path="/admin/rangeTable" component={RangeTable} />
                  <Route exact path="/admin/basicTable" component={BasicTable} />

                </Content>
              </Layout>
            </Layout>

          </Router>

        </Spin>



      </div>


    );



  }
}

export default AdminPage
