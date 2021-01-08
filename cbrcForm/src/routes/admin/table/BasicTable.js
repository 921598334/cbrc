
import React from 'react';
import 'antd/dist/antd.css';

import { connect } from 'dva';

import { Table, Button, Spin, Row, Col, DatePicker, Select, Space, Popconfirm } from 'antd';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';


const { Option } = Select;

const { RangePicker } = DatePicker;

//如果在类外定义变量或者熟悉，可以直接访问，如果在类内定义需要用this



const dateFormat = 'YYYY/MM/DD';





@connect(({ queryNamespace }) => ({
  queryNamespace,
}))





class BasicTable extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [
      ],

      orgType: '32',
      fromDate: '',
      endDate: '',
      fileType: '1',
      // queryData:'null',
      // orgList:'null',
      taskStatus: '1',
      isUplaod: false,
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

          console.log('下载连接：')
          console.log(this.props.queryNamespace.downloadLink)

          window.open('http://' + this.props.queryNamespace.downloadLink)
        }
      })
  }






  handlePass = (id) => {

    console.log(id)

    this.props.dispatch({
      type: "queryNamespace/handlePass",
      passInfo: {
        id: id,
        ...this.state
      }
    })
      .then(result => {
        if (result) {

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

        }
      })
  }


  handleRefuse = (id) => {

    console.log(id)

    this.props.dispatch({
      type: "queryNamespace/handleRefuse",
      refuseInfo: {
        id: id,
        ...this.state
      }
    })
      .then(result => {
        if (result) {


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

        }
      })
  }




  allDownload = (id) => {

    this.props.dispatch({
      type: "queryNamespace/allDownload",
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


  optionCreate(orgList) {
    if (orgList != undefined) {
      return orgList.map((item, index) => {
        return <Option value={item.orgtype}>{item.typename}</Option>
      })
    }
  }

  taskStatusChange = (e) => {

    console.log(e)
    this.setState({
      taskStatus: e,
    })
  }



  action(record) {

    //待审核带数据
    if (record.iscomplete == '0') {
      console.log(record.iscomplete)
      return (
        <Space size="middle">
          <h1>待完成</h1>
        </Space>
      )
    } else if (record.iscomplete == '1') {
      console.log(record.iscomplete)
      return (
        <Space size="middle">
          <a onClick={() => this.handleDownload(record.taskcompleteid)}>下载</a>

          <Popconfirm title="驳回后会重新为该用户生成新的任务，您确定要驳回吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => this.handleRefuse(record.taskcompleteid)}>
            <a >驳回</a>
          </Popconfirm>

          <Popconfirm title="您确定要通过吗？通过后仍然可以重新驳回" icon={<QuestionCircleOutlined style={{ color: 'green' }} />} onConfirm={() => this.handlePass(record.taskcompleteid)}>
            <a >通过</a>
          </Popconfirm>

        </Space>

      )
    } else if (record.iscomplete == '2') {
      console.log(record.iscomplete)
      return (
        <Space size="middle">
          <a onClick={() => this.handleDownload(record.taskcompleteid)}>下载</a>

          <Popconfirm title="驳回后会重新为该用户生成新的任务，您确定要驳回吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => this.handleRefuse(record.taskcompleteid)}>
            <a >驳回</a>
          </Popconfirm>



        </Space>

      )
    } else if (record.iscomplete == '3') {
      console.log(record.iscomplete)
      return (
        <Space size="middle">
          <a onClick={() => this.handleDownload(record.taskcompleteid)}>下载</a>

          {/* <Popconfirm title="您确定要通过吗？" icon={<QuestionCircleOutlined style={{ color: 'green' }} />} onConfirm={() => this.handlePass(record.taskcompleteid)}>
            <a >通过</a>
          </Popconfirm> */}
        </Space>
      )
    } else {
      console.log('未知');
    }


  }


  render() {

    console.log("basicTable的render开始执行")



    const { queryData, orgList } = this.props.queryNamespace



    const columns = [
      // {
      //   title: 'id',
      //   dataIndex: 'id',
      //   width: '30%',
      //   hide:true,
      // },
      {
        title: '机构名称',
        dataIndex: 'orgName',
        width: '30%',

      },
      {
        title: '任务标题',
        dataIndex: 'tasktitle',
        width: '20%',

      },
      {
        title: '任务描述',
        dataIndex: 'taskdescribe',
        width: '20%',

      },
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
        render: (text, record) => (

          <Space size="middle">

            { this.action(record)}

          </Space>


        )
        // <Space size="middle">
        //   <a onClick={() => this.handleDownload(record.taskcompleteid)}>下载</a>

        //   <Popconfirm title="您确定要驳回吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => this.handleRefuse(record.taskcompleteid)}>
        //     <a >驳回</a>
        //   </Popconfirm>

        //   <Popconfirm title="您确定要通过吗？" icon={<QuestionCircleOutlined style={{ color: 'green' }} />} onConfirm={() => this.handlePass(record.taskcompleteid)}>
        //     <a >通过</a>
        //   </Popconfirm>

        // </Space>
      },

    ];


    //点击查询
    const query = values => {
      console.log('query开始执行');


      this.setState({
        isUplaod: true,

      })


      this.props.dispatch({
        type: "queryNamespace/query",
        queryInfo: {
          ...this.state

        }
      })
        .then(result => {

          this.setState({
            isUplaod: false,
          })

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
              <h1>任务状态：</h1>
              <Select defaultValue="待审核" onChange={this.taskStatusChange} style={{ width: '100px' }}>
                {/* <Option value="0">待完成</Option> */}
                <Option value="1">待审核</Option>
                <Option value="2">已完成</Option>
                <Option value="3">被驳回</Option>
              </Select>
            </Col>

            <Col span={6}>
              <h1>机构名称：</h1>
              <Select defaultValue="人身险机构" onChange={this.orgNameChange} style={{ width: '200px' }}>
                {this.optionCreate(orgList)}

              </Select>
            </Col>


            <Col span={6}  >
              <h1>重庆保险中介机构季度数据表 类型：</h1>
              <Select defaultValue="专业代理、经纪机构用表" onChange={this.tableNameChange} style={{ width: '250px' }}>
                <Option value="1">专业代理、经纪机构用表</Option>
                <Option value="2">公估机构用表</Option>
                <Option value="3">专业中介机构销售寿险公司长期保险产品统计表</Option>
                <Option value="4">银邮代理机构用表</Option>
              </Select>
            </Col>


            <Col span={6}  >
              <h1>完成起止日期：</h1>
              <RangePicker onChange={this.dateChange} format={dateFormat} />
            </Col>


            <Col span={4}  >
              <h1>操作：</h1>
              <Button type="primary" icon={<FileSearchOutlined />} onClick={query} loading={this.state.isUplaod}>
                查询
              </Button>
            </Col>

          </Row>






          <div>
            <div style={{ marginBottom: 16 }}>
              {/* <Button type="primary" onClick={this.allDownload} loading={false}>
                全部下载
              </Button> */}

              <span style={{ marginLeft: 8 }}>
                {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
              </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={queryData} />
          </div>

        </div >

      </Spin>



    );






  }
}

export default BasicTable
