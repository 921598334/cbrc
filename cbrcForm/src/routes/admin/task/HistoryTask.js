
import React from 'react';
import 'antd/dist/antd.css';

import { connect } from 'dva';

import { Table, Button, Row, Col, DatePicker, Space,Popconfirm,message,Spin } from 'antd';
import { FileSearchOutlined,QuestionCircleOutlined} from '@ant-design/icons';



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
      isUplaod: false,
      //初始化是否加载完成标记
      isLoading:true,
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

        this.setState({
          isLoading: false,
        })

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

  deleteTask = (id) => {

    console.log(id)
    message.success('正在删除，请等待......');

    this.props.dispatch({
      type: "taskNamespace/deleteTask",
      deleteInfo: {
        id: id,
        ...this.state
      }
    })
      .then(result => {
        if (result) {

          //任务删除后重新获取任务

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
      })
  }

  queryTaskDetail = (id) => {

    console.log(id)


    //跳转到任务细节

    this.props.history.push({ pathname: '/admin/historyTaskDetail', state: { id: id } })




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
        render: (text, record) => (
          <Space size="middle">

            <a onClick={() => this.queryTaskDetail(record.id)}>{text}</a>
          </Space>
        ),
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


          <Popconfirm title="删除后，用户已经完成的任务也会被删除，并且无法找回，您确定要删除吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => this.deleteTask(record.id)}>
            <a >删除</a>
          </Popconfirm>

        
        ),
      },
    ];








    //点击查询任务列表
    const query = values => {
      console.log('query开始执行');


      this.setState({
        isUplaod: true,

      })

      this.props.dispatch({
        type: "taskNamespace/queryTask",
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

      <Spin  spinning={this.state.isLoading} tip="数据加载中...">

        <Row gutter={[16, 24]}>
          <Col >
            <h1>历史任务列表</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} justify="space-between">




          <Col span={6}  >
            <h1>任务创建时间：</h1>
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
          <Table columns={columns} dataSource={queryData} />
        </div>

      </Spin >


    );






  }
}

export default HistoryTask
