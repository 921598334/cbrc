
import React from 'react';
import 'antd/dist/antd.css';
import '../table/tableCSS';

import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Row, Col, Result, BackTop, Space } from 'antd';
import { CloudUploadOutlined, SmileOutlined } from '@ant-design/icons';

const { Panel } = Collapse;




@connect(({ adminSettingNameSpace }) => ({
  adminSettingNameSpace,
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

    // this.props.dispatch({
    //   type: "adminSettingNameSpace/init",

    // })



  }





  dataUpload = (row) => {


    console.log("dataUpload 执行了")





  };







  render() {


    console.log("OrgSetting 的render开始执行")


    const { dataSource } = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
              <h1>机构设置</h1>
            </Col >
          </Row>

          <Row gutter={[16, 24]} align="middle">


            <Col className="gutter-row" span={4}>
              <Button type="primary" icon={<CloudUploadOutlined />} onClick={this.dataUpload} loading={this.state.isUplaod}>
                保存
            </Button>
            </Col>
          </Row>




          <Collapse  >

            <Panel header="机构类型管理" key="1">
              <div>

                <Button
                  onClick={this.handleAdd}
                  type="primary"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  添加一行
             </Button>

                <Table
                  columns={columns}
                  dataSource={data}
                  rowSelection={{
                     type: 'radio',
                    ...rowSelection,
                  }} />
              </div>



            </Panel>

            {/* <Panel header="机构信息" key="2">

            </Panel> */}




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



export default OrgSetting
