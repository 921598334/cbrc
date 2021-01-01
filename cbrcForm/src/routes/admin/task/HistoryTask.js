
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';

import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, DatePicker, Select, Tag, Space} from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined, SmileOutlined, PhoneOutlined, FileSearchOutlined, ZoomInOutlined } from '@ant-design/icons';


const { Option } = Select;
const { Panel } = Collapse;
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

  }


  orgNameChange = e => {
    this.setState({
      orgName: e.target.value,
    })
  }
  tableNameChange = (e) => {
    console.log('表发生了变化')
    console.log(e)
    this.setState({
      fileType: e,
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



  handleSave = (row) => {


    console.log("handleSave执行了")


    // console.log('row')
    // console.log(row)


    //原始数据
    const newData = [...this.state.dataSource];
    // console.log('原始数据')
    // console.log(newData)

    //需要修改的索引
    const index = newData.findIndex((item) => row.cellid === item.cellid);
    // console.log('需要修改的索引')
    // console.log(index)


    //需要修改的数据项
    const item = newData[index];
    // console.log('需要修改的数据项')
    // console.log(item)

    newData.splice(index, 1, { ...item, ...row });
    //newData.splice(index, 1, {  ...row });
    this.setState({
      dataSource: newData,
    });

    console.log('修改后的datasource为')
    console.log(this.state.dataSource)
  };


  handleDownload = (id) => {

    console.log(id)

    this.props.dispatch({
      type: "queryNamespace/download",
      downloadInfo: {
        id: id,
        ...this.state
      }
    })
      .then(result => {
        if (result) {

          window.open('http://' + this.props.queryNamespace.downloadLink)
        }
      })
  }

  collectDownload = (id) => {

    this.props.dispatch({
      type: "queryNamespace/collectDownload",
      queryInfo: {
        ...this.state
      }
    })
      .then(result => {
        if (result) {

          window.open('http://' + this.props.queryNamespace.downloadLink)
        }
      })
  }






  render() {

    console.log("historyTable的render开始执行")

    console.log(this.props.taskNamespace)

    const { queryData } = this.props.taskNamespace

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


    const columns = [
      {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '描述',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '创建时间',
        dataIndex: 'address',
        key: 'address',
      },
     
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
           
            <a>Delete</a>
          </Space>
        ),
      },
    ];








    //点击查询
    const query = values => {
      console.log('query开始执行');

      this.props.dispatch({
        type: "queryNamespace/query",
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


    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    //const hasSelected = selectedRowKeys.length > 0;

    return (

      <div>

        <Row gutter={[16, 24]}>
          <Col >
            <h1>数据查询</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} justify="space-between">
          <Col span={4}>
            <Input placeholder="机构列表" prefix={<SketchOutlined />} onChange={this.orgNameChange} />
          </Col>


          <Col span={6}  >
            <Select defaultValue="重庆保险中介机构季度数据表-专业代理、经纪机构用表" onChange={this.tableNameChange} style={{ width: '300px' }}>
              <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
              <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
              <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
              <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
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

          <Table columns={columns} dataSource={data} />
        </div>



      </div >


    );






  }
}

export default HistoryTask
