
import React from 'react';
import 'antd/dist/antd.css';

import Cookies from 'js-cookie'


import { connect } from 'dva';

import { Table, Button, Row, Col, DatePicker, Select, Space,Spin } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';


const { Option } = Select;
const { RangePicker } = DatePicker;




const dateFormat = 'YYYY/MM/DD';




@connect(({ taskNamespace, queryNamespace }) => ({
  taskNamespace, queryNamespace
}))







class TaskComplete extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [
      ],


      fromDate: '',
      endDate: '',
      fileType: '1',
      orgid: Cookies.get('orgid'),
      taskStatus: '0',
       //用户点击按钮上传标记
      isUplaod: false,

      //初始化是否加载完成标记
      isLoading: true,
    };
  }

  componentWillMount() {
    console.log("TaskComplete 的componentWillmount开始执行")


    this.props.dispatch({
      type: "taskNamespace/queryTaskComplete",
      queryInfo: {
        ...this.state

      }
    })
      .then(result => {

        this.setState({
          isLoading:false,
        })
        
        if (result) {
          //查询成功后
         
        }
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


  taskStatusChange = (e) => {

    console.log(e)
    this.setState({
      taskStatus: e,
    })
  }





  startTask = (e) => {
    console.log('点击了开始：')
    console.log(e)

    if (e['filetype'] === '1') {
      //this.props.history.push('/user/table1')
      this.props.history.push({
        pathname: '/user/table1',
        state: {
          taskComplete: e,
        }
      })
    } else if (e['filetype'] === '2') {
      this.props.history.push({
        pathname: '/user/table2',
        state: {
          taskComplete: e,
        }
      })
    } else if (e['filetype'] === '3') {
      this.props.history.push({
        pathname: '/user/table3',
        state: {
          taskComplete: e,
        }
      })
    } else if (e['filetype'] === '4') {
      this.props.history.push({
        pathname: '/user/table4',
        state: {
          taskComplete: e,
        }
      })
    }

  }



  //下载
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



  action(record) {

    console.log('选择了：')
    console.log(record)

    if (record.iscomplete == '0') {
      console.log(record.iscomplete)
      return (
        <a onClick={(e) => { this.startTask(record) }}>开始</a>
      )
    } else if (record.iscomplete == '1') {
      console.log(record.iscomplete)
      return (
        // <h1 >待审核</h1>
        <a onClick={() => this.handleDownload(record.id)}>下载</a>
      )
    } else if (record.iscomplete == '2') {
      console.log(record.iscomplete)
      return (
        // <h1 >通过审核</h1>
        <a onClick={() => this.handleDownload(record.id)}>下载</a>
      )
    } else if (record.iscomplete == '3') {
      console.log(record.iscomplete)
      return (
        // <a onClick={(e) => { this.startTask(record) }}>重新完成</a>
        <a onClick={() => this.handleDownload(record.id)}>下载</a>
      )
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
        //render: text => <a>{text}</a>,
      },
      {
        title: '任务发布时间',
        dataIndex: 'createtime',
        key: 'createtime',
        //render: text => <a>{text}</a>,
      },
      {
        title: '描述',
        dataIndex: 'taskdescribe',
        key: 'taskdescribe',
      },
      // {
      //   title: '开始时间',
      //   dataIndex: 'fromdate',
      //   key: 'fromdate',
      // },
      // {
      //   title: '结束时间',
      //   dataIndex: 'enddate',
      //   key: 'enddate',
      // },

      // {
      //   title: '任务报表',
      //   dataIndex: 'filetype',
      //   key: 'filetype',
      // },
      {
        title: '任务状态',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
      },


      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">

            {this.action(record)}
            {/* <a onClick={(e) => { this.startTask(record) }}>开始</a> */}
          </Space>
        ),
      },
    ];




    //点击查询
    const query = values => {
      console.log('query开始执行');

      this.setState({
        isUplaod: true,
      })

      this.props.dispatch({
        type: "taskNamespace/queryTaskComplete",
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



    return (

      <Spin spinning={this.state.isLoading} tip="数据加载中...">

        <Row gutter={[16, 24]}>
          <Col >
            <h1>数据查询</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} justify="space-between">
          <Col span={4}>
            <h1>任务状态：</h1>
            <Select defaultValue="待完成" onChange={this.taskStatusChange} >
              <Option value="0">待完成</Option>
              <Option value="1">待审核</Option>
              <Option value="2">已完成</Option>
              <Option value="3">被驳回</Option>
            </Select>
          </Col>


          <Col span={6}  >
            <h1>任务发布时间：</h1>
            <RangePicker onChange={this.dateChange} format={dateFormat} />
          </Col>



          <Col span={4}  >
            <h1>操作：</h1>
            <Button type="primary" icon={<FileSearchOutlined />} onClick={query} loading={this.state.isUplaod}>
              查询
            </Button>
          </Col>

        </Row>

        <Row gutter={[16, 24]}  >

        </Row>

        <div>

          <Table columns={columns} dataSource={queryData} />
        </div>



      </Spin >


    );
  }
}

export default TaskComplete
