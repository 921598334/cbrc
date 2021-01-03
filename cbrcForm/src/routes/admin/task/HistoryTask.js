
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';

import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, DatePicker, Select, Tag, Space } from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined, SmileOutlined, PhoneOutlined, FileSearchOutlined, ZoomInOutlined } from '@ant-design/icons';


const { Option } = Select;
const { RangePicker } = DatePicker;




const dateFormat = 'YYYY/MM/DD';







@connect(({ taskNamespace }) => ({
  taskNamespace,
}))







class HistoryTask extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [
      ],

      orgName: '',
      fromDate: '',
      endDate: '',
      fileType: '1',

    };
  }

  componentWillMount() {
    console.log("HistoryTask的componentWillmount开始执行")

    this.props.dispatch({
      type: "taskNamespace/queryTask",
      queryInfo: {
        ...this.state

      }
    })
      .then(result => {
        if (result) {
          //查询成功后

        }
      })
  }



  taskStatusChange = (e) => {

    console.log(e)
    this.setState({
      taskStatus: e,
    })
  }

  dateChange = (e) => {

    if (e != null || e != undefined) {
      this.setState({
        fromDate: e[0].format('YYYY-MM-DD'),
        endDate: e[1].format('YYYY-MM-DD'),
      })
    } else {
      this.setState({
        fromDate: null,
        endDate: null,
      })
    }

  }



  render() {

    console.log("historyTable的render开始执行")

    console.log(this.props.taskNamespace)

    const { queryData } = this.props.taskNamespace



    const columns = [
      {
        title: '标题',
        dataIndex: 'tasktitle',
        key: 'tasktitle',
        render: text => <a>{text}</a>,
      },
      // {
      //   title: '描述',
      //   dataIndex: 'taskdescribe',
      //   key: 'taskdescribe',
      // },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
      },
      {
        title: '任务报表',
        dataIndex: 'filetype',
        key: 'filetype',
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">

            <a>删除</a>
          </Space>
        ),
      },
    ];








    //点击查询
    const query = values => {
      console.log('query开始执行');

      this.props.dispatch({
        type: "taskNamespace/queryTask",
        queryInfo: {
          ...this.state

        }
      })
        .then(result => {
          if (result) {
            //查询成功后

          }
        })
    };






    return (

      <div>

        <Row gutter={[16, 24]}>
          <Col >
            <h1>任务列表</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} justify="space-between">
          <Col span={4}>
            <Select defaultValue="待完成" onChange={this.taskStatusChange} >
              <Option value="1">待完成</Option>
              <Option value="2">已完成</Option>
              <Option value="3">被驳回</Option>

            </Select>
          </Col>



          <Col span={6}  >
            <RangePicker onChange={this.dateChange} format={dateFormat} />
          </Col>


          <Col span={4}  >
            <Button type="primary" icon={<FileSearchOutlined />} onClick={query}>
              查询
            </Button>
          </Col>

        </Row>

        <Row gutter={[16, 24]}  >

        </Row>





        <div>

          <Table columns={columns} dataSource={queryData} />
        </div>



      </div >


    );






  }
}

export default HistoryTask
