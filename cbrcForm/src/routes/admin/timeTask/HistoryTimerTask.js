
import React from 'react';
import 'antd/dist/antd.css';

import { connect } from 'dva';

import { Table, Tag, Row, Col, Space, Popconfirm, message,Spin } from 'antd';
import {  QuestionCircleOutlined } from '@ant-design/icons';



@connect(({ taskNamespace }) => ({
  taskNamespace,
}))







class HistoryTimerTask extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [
      ],

      orgName: '',
      fromDate: '',
      endDate: '',
      fileType: '1',
      isUplaod: false,
      //初始化是否加载完成标记
      isLoading:true,
    };
  }

  componentWillMount() {
    console.log("HistoryTimerTask 的componentWillmount开始执行")

    this.props.dispatch({
      type: "taskNamespace/queryTimerTask",
      queryTimerInfo: {
        ...this.state

      }
    })
      .then(result => {
        if (result) {
          //查询成功后
          this.setState({
            isLoading:false,
          })
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

  deleteTask = (id) => {

    console.log(id)
    message.success('正在删除，请等待......');

    this.props.dispatch({
      type: "taskNamespace/deleteTimerTask",
      deleteTimerInfo: {
        id: id,
        ...this.state
      }
    })
      .then(result => {
        if (result) {

          //任务删除后重新获取任务

          this.props.dispatch({
            type: "taskNamespace/queryTimerTask",
            queryTimerInfo: {
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

  queryTaskDetail = (id) => {

    console.log(id)

    //跳转到任务细节

    this.props.history.push({ pathname: '/admin/historyTimerTaskDetail', state: { id: id } })


  }





  render() {


    console.log(this.props.taskNamespace)

    const { queryTImerTaskData } = this.props.taskNamespace

    const isSatusEnable=(record)=>{

      if(record.isenable){
        return(<Tag color="#87d068">启用</Tag>)
      }else{
        return(<Tag color="#f50">禁用</Tag>)
      }
    }


    const columns = [
      {
        title: '标题',
        dataIndex: 'tasktitle',
        key: 'tasktitle',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => this.queryTaskDetail(record.id)}>{text}</a>
          </Space>
        ),
      },

      // {
      //   title: '创建时间',
      //   dataIndex: 'createtime',
      //   key: 'createtime',
      // },
      {
        title: '任务报表',
        dataIndex: 'filetype',
        key: 'filetype',
      },
      {
        title: '状态',
        dataIndex: 'isenable',
        key: 'isenable',
        render:  (text, record) => (
          isSatusEnable(record)
        ),
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => (


          <Popconfirm title="删除后，用户已经完成的任务也会被删除，并且无法找回，您确定要删除吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => this.deleteTask(record.id)}>
            <a >删除</a>
          </Popconfirm>


        ),
      },
    ];








    //点击查询任务列表
    // const query = values => {
    //   console.log('query开始执行');


    //   this.setState({
    //     isUplaod: true,

    //   })

    //   this.props.dispatch({
    //     type: "taskNamespace/queryTimerTask",
    //     queryTimerInfo: {
    //       ...this.state

    //     }
    //   })
    //     .then(result => {

    //       this.setState({
    //         isUplaod: false,
    //       })

    //       if (result) {
    //         //查询成功后

    //       }
    //     })
    // };






    return (

      <Spin spinning={this.state.isLoading} tip="数据加载中...">

        <Row gutter={[16, 24]}>
          <Col >
            <h1>已创建的定时任务列表</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} justify="space-between">




          {/* <Col span={6}  >
            <h1>任务创建时间：</h1>
            <RangePicker onChange={this.dateChange} format={dateFormat} />
          </Col> */}


          {/* <Col span={4}  >
            <h1>操作：</h1>
            <Button type="primary" icon={<FileSearchOutlined />} onClick={query} loading={this.state.isUplaod}>
              查询
            </Button>
          </Col> */}

        </Row>

        <div>
          <Table columns={columns} dataSource={queryTImerTaskData} />
        </div>

      </Spin >


    );






  }
}

export default HistoryTimerTask
