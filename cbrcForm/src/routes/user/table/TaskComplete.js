
import React  from 'react';
import 'antd/dist/antd.css';

import Cookies from 'js-cookie'


import { connect } from 'dva';

import { Table,  Button,   Row, Col, DatePicker, Select,   Space } from 'antd';
import {   FileSearchOutlined } from '@ant-design/icons';


const { Option } = Select;
const { RangePicker } = DatePicker;




const dateFormat = 'YYYY/MM/DD';




@connect(({ taskNamespace }) => ({
  taskNamespace,
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
      taskStatus: '0'
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




  action(record) {

    if (record.iscomplete == '0') {
      console.log(record.iscomplete)
      return (
        <a onClick={(e) => { this.startTask(record) }}>开始</a>
      )
    } else if (record.iscomplete == '1') {
      console.log(record.iscomplete)
      return (
        <h1 >待审核</h1>
      )
    } else if (record.iscomplete == '2') {
      console.log(record.iscomplete)
      return (
        <h1 >通过审核</h1>
      )
    } else if (record.iscomplete == '3') {
      console.log(record.iscomplete)
      return (
        <a onClick={(e) => { this.startTask(record) }}>重新完成</a>
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
      {
        title: '开始时间',
        dataIndex: 'fromdate',
        key: 'fromdate',
      },
      {
        title: '结束时间',
        dataIndex: 'enddate',
        key: 'enddate',
      },

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

      this.props.dispatch({
        type: "taskNamespace/queryTaskComplete",
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

export default TaskComplete
