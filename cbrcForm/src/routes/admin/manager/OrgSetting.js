
import React from 'react';
import 'antd/dist/antd.css';
import '../table/tableCSS';

import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';

import { Table, Input, Button, Row, Col, Spin, BackTop, Space, Popconfirm, Select } from 'antd';
import {  QuestionCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;



@connect(({ orgSettingNameSpace }) => ({
  orgSettingNameSpace,
}))


class OrgSetting extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [

      ],

      orgid: Cookies.get('orgid'),
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),

      count: 0,
      isUplaod: false,
      isComplete: false,
      fileType: 1,


    };
  }


  //保存机构类型
  saveOrgType = (record) => {

    console.log('点击了保存')
    console.log(record)

  }

  componentWillMount() {
    console.log("OrgSetting 的componentWillmount开始执行")

    //得到机构类型
    this.props.dispatch({
      type: "orgSettingNameSpace/initOrg",

    })

    //得到所有机构信息
    this.props.dispatch({
      type: "orgSettingNameSpace/initOrgInfo",

    })


  }



  optionCreate(orgData) {

    if (orgData != undefined) {
      return orgData.map((item, index) => {
        return <Option key={item['orgtype']} value={item['orgtype']}>{item['typename']}</Option>
      })
    }


  }




  render() {


    console.log("OrgSetting 的render开始执行")

    const { orgData, orgInfoData } = this.props.orgSettingNameSpace








    const columns = [
      {
        title: '机构类型ID',
        dataIndex: 'orgtype',
        key: 'orgtype',

      },
      {
        title: '机构类型',
        dataIndex: 'typename',
        key: 'typename',

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




    const columnOrgInfo = [
      {
        title: '机构ID',
        dataIndex: 'orgid',
        key: 'orgid',

      },
      {
        title: '机构名称',
        dataIndex: 'orgname',
        key: 'orgname',

      },
      {
        title: '机构类型',
        dataIndex: 'orgTypeName',
        key: 'orgTypeName',

      },

      {
        title: '管理者姓名',
        dataIndex: 'manager',
        key: 'manager',

      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">

            <Popconfirm title="删除后，该机构下的用户信息均会被删除，并且无法恢复，您确定要删除吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}

              onConfirm={() => {
                console.log('点击了删除,删除的ID：')
                console.log(record)

                this.props.dispatch({
                  type: "orgSettingNameSpace/deleteOrgInfo",
                  deleteOrgInfo: {
                    orgid: record.orgid
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
          updateOrgType: selectedRowKeys,
          updateOrgName: selectedRows[0]['typename'],
        })
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };





    //机构信息选中
    const orgInfoRowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        console.log(this.state.updateOrgtype)

        this.setState({
          updateManager: selectedRows[0]['manager'],
          updatekey: selectedRows[0]['key'],
          updateOrgTypeName: selectedRows[0]['orgTypeName'],
          updateOrgid: selectedRows[0]['orgid'],
          updateOrgname: selectedRows[0]['orgname'],
          updateOrgtype: selectedRows[0]['orgtype'],

        })

        console.log(this.state.updateOrgtype)

      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };







      return (

        <Spin spinning={orgData == undefined || orgInfoData==undefined} tip="数据加载中...">

          <Row gutter={[16, 24]}>
            <Col >
              <h1>机构设置</h1>
            </Col >
          </Row>




          {/* 添加机构类型 */}
          <Collapse  >

            <Panel header="机构类型管理" key="1">
              <div>

                <Row>

                  <Col>
                    <Input placeholder="机构类型"
                      onChange={(e) => {
                        console.log('添加按钮的机构类型变化了')
                        console.log(e.target.value)
                        this.setState({
                          newOrgName: e.target.value
                        })
                      }}
                    />
                  </Col>

                  <Col span={4}>
                    <Button
                      onClick={() => {
                        console.log('添加按钮点击了')

                        this.props.dispatch({
                          type: "orgSettingNameSpace/inertOrg",
                          insertInfo: {
                            ...this.state
                          }
                        })
                          .then(result => {

                            this.setState({
                              isUplaod: false,
                            })

                            if (result) {
                              // 机构类型添加成功后要清空
                              this.setState({
                                newOrgName:'',
                               
                              })
                            }
                          })
                      }}
                      type="primary"
                      style={{
                        marginBottom: 16,
                      }}

                    >
                      添加机构类型
              </Button>
                  </Col>

                </Row>



                <Table
                  columns={columns}
                  dataSource={orgData}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }} />








                <Row>

                  <Col>
                    <Input placeholder="机构类型"

                      onChange={(e) => {
                        console.log('保存的机构类型变化了')
                        console.log(e.target.value)
                        this.setState({
                          updateOrgName: e.target.value
                        })
                      }}
                      value={this.state.updateOrgName}
                    />
                  </Col>

                  <Col span={4}>
                    <Button
                      onClick={() => {
                        console.log('保存点击了')
                        this.props.dispatch({
                          type: "orgSettingNameSpace/updateOrg",
                          updateInfo: {
                            ...this.state
                          }
                        })
                          .then(result => {

                            this.setState({
                              isUplaod: false,
                            })

                            if (result) {
                              // 机构类型保存后
                              this.setState({
                                updateOrgType:'',
                                updateOrgName:''

                              })

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


              </div>




            </Panel>













            <Panel header="机构信息" key="2">


              <div>

                <Row>

                  <Col>
                    <Input placeholder="机构名称"
                      value={this.state.newOrgInfoName}
                      onChange={(e) => {
                        console.log('机构名称')
                        console.log(e.target.value)
                        this.setState({
                          newOrgInfoName: e.target.value
                        })
                      }}
                    />
                  </Col>

                  <Col>


                    <Select value={this.state.newOrgType} style={{ width: 120 }}
                      onChange={(e) => {
                        console.log('机构类型')
                        console.log(e)
                        this.setState({
                          newOrgType: e
                        })
                      }}
                    >
                      {this.optionCreate(orgData)}


                    </Select>



                  </Col>
                  <Col>
                    <Input placeholder="管理者姓名"
                      value={this.state.newManagerName}
                      onChange={(e) => {
                        console.log('管理者姓名')
                        console.log(e.target.value)
                        this.setState({
                          newManagerName: e.target.value
                        })
                      }}
                    />
                  </Col>

                  <Col span={4}>
                    <Button
                      onClick={() => {
                        console.log('添加按钮点击了')

                        this.props.dispatch({
                          type: "orgSettingNameSpace/inertOrgInfo",
                          insertOrgInfo: {
                            ...this.state
                          }
                        })
                          .then(result => {

                            this.setState({
                              isUplaod: false,
                            })

                            if (result) {
                              //数据成功后
                             
                              this.setState({
                                newManagerName: '',
                                newOrgInfoName: '',
                                newOrgType: '',
                              })
                            }
                          })
                      }}
                      type="primary"
                      style={{
                        marginBottom: 16,
                      }}

                    >
                      添加机构
                    </Button>
                  </Col>

                </Row>










                <Table
                  columns={columnOrgInfo}
                  dataSource={orgInfoData}
                  rowSelection={{
                    type: 'radio',
                    ...orgInfoRowSelection,
                  }} />










                <Row>

                  <Col>
                    <Input placeholder="机构名称"
                      value={this.state.updateOrgname}
                      onChange={(e) => {
                        console.log('机构名称')
                        console.log(e.target.value)
                        this.setState({
                          updateOrgname: e.target.value
                        })
                      }}
                    />
                  </Col>

                  <Col>


                    <Select value={this.state.updateOrgTypeName} style={{ width: 120 }}
                      onChange={(e) => {
                        console.log('机构类型')
                        console.log(e)
                        this.setState({
                          updateOrgtype: e
                        })
                      }}
                    >
                      {this.optionCreate(orgData)}

                    </Select>

                  </Col>
                  <Col>
                    <Input placeholder="管理者姓名"
                      value={this.state.updateManager}
                      onChange={(e) => {
                        console.log('管理者姓名')
                        console.log(e.target.value)
                        this.setState({
                          updateManager: e.target.value
                        })
                      }}
                    />
                  </Col>

                  

                  <Col span={4}>
                    <Button

                      onClick={() => {
                        console.log('保存点击了')
                        this.props.dispatch({
                          type: "orgSettingNameSpace/updateOrgInfo",
                          updateOrgInfo: {
                            ...this.state
                          }
                        })
                          .then(result => {

                            if (result) {
                              //数据成功后
                              //数据成功后
                              this.setState({
                                updateManager: '',
                                updateOrgTypeName: '',
                                updateOrgid: '',
                                updateOrgname: '',
                                updateOrgtype: '',
                                updatekey: '',
                              })
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


              </div>


            </Panel>

          </Collapse>





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

        </Spin >


      );
    

  }
}



export default OrgSetting
