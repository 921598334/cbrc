
import React from 'react';
import 'antd/dist/antd.css';


import {   notification } from 'antd';
import { connect } from 'dva';

import { Table, Button, Spin, Row, Col, DatePicker, Select } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';


const { Option } = Select;

const { RangePicker } = DatePicker;




const dateFormat = 'YYYY/MM/DD';








@connect(({ queryNamespace }) => ({
  queryNamespace,
}))





class RangeTable extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [
      ],

      orgType: '32',
      fromDate: '',
      endDate: '',
      fileType: '1',
    

    };
  }

  componentWillMount() {
    console.log("BasicTable的componentWillmount开始执行")
    // const { table1Struct } = this.props.downloadNamespace


    // //不知道为什么，只有这样才能成功赋值
    // this.state.dataSource = table1Struct


    //获取机构列表
    this.props.dispatch({
      type: "queryNamespace/getOrgType",

    })
      .then(result => {
        if (result) {
          //查询成功后

        }
      })

  }


  orgNameChange = e => {
    console.log(e)
    this.setState({
      orgType: e
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


  collectDownload = (record) => {


    
    let collect = record.collect
    let period = record.period
    let orgTypeName = record.orgTypeName
    

    this.props.dispatch({
      type: "queryNamespace/collectDownload",
      queryInfo: {
        ...this.state,
        collect,
        period,
        orgTypeName,
      }
    })
      .then(result => {
        if (result) {
          if(this.props.queryNamespace.downloadLink==undefined || this.props.queryNamespace.downloadLink==''){
            notification.info({message:'没有查询到数据'})
          }else{
            window.open('http://' + this.props.queryNamespace.downloadLink)
          }      
        }
      })
  }


  optionCreate(orgList) {
    if (orgList != undefined) {
      return orgList.map((item, index) => {
        return <Option value={item.orgtype}>{item.typename}</Option>
      })
    }

  }



  render() {

    console.log("rangeTable的render开始执行")

    const { collectqQuery, orgList } = this.props.queryNamespace

    const columns = [
      // {
      //   title: 'id',
      //   dataIndex: 'id',
      //   width: '30%',
      //   hide:true,
      // },
      {
        title: '机构',
        dataIndex: 'orgTypeName',
        width: '30%',

      },
       {
        title: '报表类型',
        dataIndex: 'fileName',
        width: '30%',

      },
      // {
      //   title: '任务标题',
      //   dataIndex: 'tasktitle',
      //   width: '20%',

      // },
      // {
      //   title: '任务描述',
      //   dataIndex: 'taskdescribe',
      //   width: '20%',

      // },
      {
        title: '季度',
        dataIndex: 'period',
        width: '20%',

      },
      // {
      //   title: '提交时间',
      //   dataIndex: 'date',
      //   width: '30%',
      // },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          <a onClick={() => this.collectDownload(record)}>下载</a>
      },

    ];


    //点击查询
    const query = values => {
      console.log('query开始执行');

      this.props.dispatch({
        type: "queryNamespace/collectqQuery",
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

      <Spin spinning={orgList == undefined} tip="数据加载中...">

        <div>

          <Row gutter={[16, 24]}>
            <Col >
              <h1>数据查询</h1>
            </Col >
          </Row>

          <Row gutter={[16, 24]} justify="space-between">
            <Col span={4}>
              <h1>机构名称：</h1>
              <Select defaultValue="人身险机构" onChange={this.orgNameChange} >
                {this.optionCreate(orgList)}
              </Select>
            </Col>


            <Col span={6}  >
              <h1>报表类型：</h1>
              <Select defaultValue="重庆保险中介机构季度数据表-专业代理、经纪机构用表" onChange={this.tableNameChange} style={{ width: '300px' }}>
                <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
                <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
                <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
                <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
              </Select>
            </Col>


            <Col span={6}  >
               <h1>完成起止时间：</h1>
              <RangePicker onChange={this.dateChange} format={dateFormat} />
            </Col>


            <Col span={4}  >
             <h1>操作：</h1>
              <Button type="primary" icon={<FileSearchOutlined />} onClick={query}>
                查询
              </Button>
            </Col>

          </Row>






          <div>
            <div style={{ marginBottom: 16 }}>
              {/* <Button type="primary" onClick={this.collectDownload} loading={false}>
                全部下载
              </Button> */}
              {/* <Button type="primary" onClick={this.collectDownload} loading={false} style={{ marginLeft: 8 }}>
                汇总下载
              </Button> */}
              <span style={{ marginLeft: 8 }}>
                {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
              </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={collectqQuery}   />
          </div>
        </div >
      </Spin>

    );

  }
}

export default RangeTable
