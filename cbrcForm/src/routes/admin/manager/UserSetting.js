
import React from 'react';
import 'antd/dist/antd.css';
import '../table/tableCSS';

import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';
import { Table, Input, Button, Form, Row, Col, Result, BackTop, Space, Popconfirm, Select } from 'antd';
import { QuestionCircleOutlined, SmileOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;




@connect(({ userSettingNameSpace }) => ({
  userSettingNameSpace,
}))







class UserSetting extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [

      ],

      orgid: Cookies.get('orgid'),
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),


      isUplaod: false,
      isComplete: false,
      fileType: 1,
    };
  }

  componentWillMount() {
    console.log("UserSetting 的componentWillmount开始执行")

    //得到机构类型和所有用户
    this.props.dispatch({
      type: "userSettingNameSpace/initUserInfo",

    })


  }


  optionCreate(orgData) {

    if (orgData != undefined) {
      return orgData.map((item, index) => {
        return <Option key={item['orgid']} value={item['orgid']}>{item['orgname']}</Option>
      })
    }


  }





  render() {


    console.log("userSettingNameSpace 的render开始执行")


    const { userInfoData, orgInfoData } = this.props.userSettingNameSpace




    const columns = [
      {
        title: '用户ID',
        dataIndex: 'userid',
        key: 'userid',

      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',

      },
      {
        title: '真实姓名',
        dataIndex: 'truename',
        key: 'truename',

      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',

      },
      {
        title: '电话',
        dataIndex: 'telphone',
        key: 'telphone',

      },
      {
        title: '所属机构',
        dataIndex: 'orgName',
        key: 'orgName',

      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">

            <Popconfirm title="删除后，该机构类型下的所有机构与用户信息均会被删除，并且无法恢复，您确定要删除吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}

              onConfirm={() => {
                console.log('点击了删除,删除的ID：')
                console.log(record)

                this.props.dispatch({
                  type: "orgSettingNameSpace/deleteOrg",
                  deleteInfo: {
                    orgtype: record.orgtype
                  }
                })
                  .then(result => {

                    this.setState({
                      isUplaod: false,
                    })

                    if (result) {
                      //数据成功后

                    }
                  })


              }}

            >
              <a >删除</a>
            </Popconfirm>

          </Space>
        ),
      },
    ];



    //机构类型选中
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          updateUserId: selectedRows[0]['userid'],
          updateOrgName: selectedRows[0]['orgName'],
          updatePassword: selectedRows[0]['password'],
          updateTelphone: selectedRows[0]['telphone'],
          updateTrueName: selectedRows[0]['truename'],
          updateUserName: selectedRows[0]['username'],
          updateOrgType:selectedRows[0]['orgid'],
       
        })
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };



    if (!this.state.isComplete) {

      return (

        <div>

          <Row gutter={[16, 24]}>
            <Col >
              <h1>用户管理</h1>
            </Col >
          </Row>




          <Row gutter={[16, 24]}>

            <Col>
              <Input placeholder="用户名"
                value={this.state.newUserName}
                onChange={(e) => {

                  console.log(e.target.value)
                  this.setState({
                    newUserName: e.target.value
                  })
                }}
              />
            </Col>


            <Col>
              <Input placeholder="真实姓名"
                value={this.state.newTrueUserName}
                onChange={(e) => {

                  console.log(e.target.value)
                  this.setState({
                    newTrueUserName: e.target.value
                  })
                }}
              />
            </Col>

            <Col>
              <Input placeholder="电话"
                value={this.state.newTel}
                onChange={(e) => {
                  console.log(e.target.value)
                  this.setState({
                    newTel: e.target.value
                  })
                }}
              />
            </Col>


            <Col>
              <Input.Password placeholder="密码"
                value={this.state.newPassword}
                onChange={(e) => {

                  console.log(e.target.value)
                  this.setState({
                    newPassword: e.target.value
                  })
                }}
              />
            </Col>

            <Col>

              <Select value={this.state.newOrgType} style={{ width: 120 }}
                value={this.state.newOrgType}
                onChange={(e) => {
                  console.log('机构类型')
                  console.log(e)
                  this.setState({
                    newOrgType: e
                  })
                }}
              >
                {this.optionCreate(orgInfoData)}


              </Select>

            </Col>


            <Col span={4}>
              <Button
                onClick={() => {

                  this.props.dispatch({
                    type: "userSettingNameSpace/inertUserInfo",
                    insertUserInfo: {
                      ...this.state
                    }
                  })
                    .then(result => {

                      this.setState({
                        isUplaod: false,
                      })

                      if (result) {
                        //数据成功后

                      }
                    })
                }}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                添加用户
              </Button>
            </Col>

          </Row>


          <Row gutter={[16, 24]}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={userInfoData}
                rowSelection={{
                  type: 'radio',
                  ...rowSelection,
                }} />
            </Col>



          </Row>

          <Row gutter={[16, 24]}>


            <Col>
              <Input placeholder="用户名"
                value={this.state.updateUserName}
                onChange={(e) => {
                  console.log(e.target.value)
                  this.setState({
                    updateUserName: e.target.value
                  })
                }}
              />
            </Col>


            <Col>
              <Input placeholder="真实姓名"
                value={this.state.updateTrueName}
                onChange={(e) => {

                  console.log(e.target.value)
                  this.setState({
                    updateTrueName: e.target.value
                  })
                }}
              />
            </Col>

            <Col>
              <Input placeholder="电话"
                value={this.state.updateTelphone}
                onChange={(e) => {

                  console.log(e.target.value)
                  this.setState({
                    updateTelphone: e.target.value
                  })
                }}
              />
            </Col>


            <Col>
              <Input.Password placeholder="密码"
                value={this.state.updatePassword}
                onChange={(e) => {

                  console.log(e.target.value)
                  this.setState({
                    updatePassword: e.target.value
                  })
                }}
              />
            </Col>

            <Col>

              <Select value={this.state.updateOrgType} style={{ width: 120 }}
                value={this.state.updateOrgType}
                onChange={(e) => {
                  console.log('机构类型')
                  console.log(e)
                  this.setState({
                    updateOrgType: e
                  })
                }}
              >
                {this.optionCreate(orgInfoData)}


              </Select>

            </Col>


            <Col span={4}>
              <Button
                onClick={() => {
                  console.log('保存点击了')
                  this.props.dispatch({
                    type: "userSettingNameSpace/updateUserInfo",
                    updateUserInfo: {
                      ...this.state
                    }
                  })
                    .then(result => {

                      this.setState({
                        isUplaod: false,
                      })

                      if (result) {

                      }
                    })
                }}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                保存
                    </Button>
            </Col>

          </Row>





          <BackTop>
            <div style={{
              height: 40,
              width: 40,
              lineHeight: '40px',
              borderRadius: 4,
              backgroundColor: '#1088e9',
              color: '#fff',
              textAlign: 'center',
              fontSize: 14,
            }}>UP</div>
          </BackTop>

        </div >


      );
    } else {
      return (
        <Result
          icon={<SmileOutlined />}
          title="您的信息已经成功保存!"
        // extra={<Button type="primary">Next</Button>}
        />)
    }






  }
}

export default UserSetting
