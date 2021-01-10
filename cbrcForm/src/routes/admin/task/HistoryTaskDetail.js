
import React from 'react';
import 'antd/dist/antd.css';

import Cookies from 'js-cookie'

import { connect } from 'dva';

import { Spin, Input, Button, Row, Col, DatePicker, Select, TreeSelect, Divider, Result, Tabs, Table,Space } from 'antd';
import { SketchOutlined, FileSearchOutlined } from '@ant-design/icons';
import moment from 'moment';
const { TabPane } = Tabs;
const { TextArea } = Input;


const { Option } = Select;



const dateFormat = 'YYYY-MM-DD';



@connect(({ taskNamespace,queryNamespace }) => ({
  taskNamespace,queryNamespace
}))
class HistoryTaskDetail extends React.Component {

  constructor(props) {
    super(props);



    this.state = {

      tasktitle: '',
      taskDescribe: '',
      userid: Cookies.get('userid'),
      fileType: '1',
      isComplete: false,
      selectedValue: [],
      period: '2000-01-01',
      enddate: '2000-01-01',
      fromdate: '2000-01-02',
      //初始化是否加载完成标记
      isLoading: true,
      isUplaod: false,
    };
  }

  async componentWillMount() {
    console.log("HistoryTaskDetail 的componentWillmount 开始执行")

    await this.props.dispatch({
      type: "taskNamespace/getOrg",

    })
      .then(result => {
        if (result) {

        }
      })


    console.log('需要查询的任务ID为：')
    console.log(this.props.location.state.id)

    //查询任务细节
    await this.props.dispatch({
      type: "taskNamespace/queryTaskDetail",
      queryDetailInfo: {
        id: this.props.location.state.id,

      }
    })
      .then(result => {
        if (result) {
          console.log('任务细节查询结束：')
          const { taskDetail } = this.props.taskNamespace
          this.setState({
            tasktitle: taskDetail.tasktitle,
            taskDescribe: taskDetail.taskdescribe,
            enddate: taskDetail.enddate,
            fromdate: taskDetail.fromdate,
            fileType: taskDetail.filetype,
            id: taskDetail.id,
            selectedValue: taskDetail.orgtype,
            period: taskDetail.period,

          })

          console.log('state修改完成：')
        }
      })



    //查询该任务下已经完成的机构
    await this.props.dispatch({
      type: "taskNamespace/queryCompletedOrg",
      queryCompletedOrgInfo: {
        taskid: this.props.location.state.id,
      }
    })
      .then(result => {
        if (result) {


        }
      })



    this.setState({
      isLoading: false,
    })




    console.log("HistoryTaskDetail 的componentWillmount 执行结束")

  }


  taskTitleChange = e => {
    this.setState({
      tasktitle: e.target.value,
    })
  }
  taskDescribeChange = (e) => {
    console.log(e)
    this.setState({
      taskDescribe: e.target.value,
    })
  }

  dateChange = (e) => {
    console.log('时间发生了变化')
    console.log(e)
    if (e != null || e != undefined) {
      this.setState({
        fromdate: e[0].format('YYYY-MM-DD'),
        enddate: e[1].format('YYYY-MM-DD'),
      })
    } else {
      this.setState({
        fromdate: null,
        enddate: null,
      })
    }

  }

  tableNameChange = (e) => {
    console.log('表发生了变化')
    console.log(e)
    this.setState({
      fileType: e,
    })
  }


  orgTypeChange = value => {
    console.log('onChange ', value);

    this.setState({
      selectedValue: value
    });
  };


  periodChage = value => {

    console.log(value.format('YYYY-MM-DD'))
    this.setState({
      period: value.format('YYYY-MM-DD')
    });
  };






  handleDownload = (record) => {
    console.log('下载记录的record')
    console.log(record)

    this.props.dispatch({
      type: "queryNamespace/download",
      downloadInfo: {
        
        ...this.state,
        id: record.taskcompleteid,
        fileType:record.fileType
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






  render() {
    console.log("HistoryTaskDetail 的render开始执行")

    const { treeData, completedOrg } = this.props.taskNamespace





    const columns = [
      {
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',

      },

      {
        title: '管理人',
        dataIndex: 'manager',
        key: 'manager',
      },
      {
        title: '机构类型',
        dataIndex: 'typeName',
        key: 'typeName',
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => (

          <Space size="middle">

            <a onClick={() => this.handleDownload(record)}>下载</a>

            {/* <Popconfirm title="驳回后会重新为该用户生成新的任务，您确定要驳回吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => this.handleRefuse(record.taskcompleteid)}>
              <a >驳回</a>
            </Popconfirm>

            <Popconfirm title="您确定要通过吗？通过后仍然可以重新驳回" icon={<QuestionCircleOutlined style={{ color: 'green' }} />} onConfirm={() => this.handlePass(record.taskcompleteid)}>
              <a >通过</a>
            </Popconfirm> */}

          </Space>
        )

      },
    ];







    //点击更新
    const update = values => {
      console.log('update 开始执行');

      this.setState({
        isUplaod: true,
      })


      this.props.dispatch({
        type: "taskNamespace/update",
        publishInfo: {
          ...this.state
        }
      })
        .then(result => {

          this.setState({
            isUplaod: false,
          })

          if (result) {
            //查询成功后
            this.setState({
              isComplete: true,
            })
          }
        })
    };



    const tProps = {
      treeData,
      value: this.state.selectedValue,
      onChange: this.orgTypeChange,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_CHILD,
      placeholder: '请选择推送单位',
      style: {
        width: '100%',
      },
    };








    if (!this.state.isComplete) {

      return (

        <Spin spinning={this.state.isLoading} tip="数据加载中...">


          <Row gutter={[16, 24]}>
            <Col >
              <h1>任务管理模块</h1>
            </Col >
          </Row>


          <Tabs defaultActiveKey="1" >
            <TabPane tab="当前任务" key="1">

              <Divider orientation="left">任务标题</Divider>
              <Row gutter={[10, 24]} justify="space-between">
                <Col span={16}>
                  <Input placeholder="任务标题" prefix={<SketchOutlined />} onChange={this.taskTitleChange} value={this.state.tasktitle} />
                </Col>
              </Row>

              <Divider orientation="left">任务描述</Divider>
              <Row gutter={[10, 24]} justify="space-between">

                <Col span={16}>
                  <TextArea placeholder="任务描述" prefix={<SketchOutlined />} onChange={this.taskDescribeChange} style={{ height: '200px' }} value={this.state.taskDescribe} />
                </Col>
              </Row>



              <Divider orientation="left">推送机构</Divider>
              <Row gutter={[10, 24]}  >

                <Col span={16}>
                  <TreeSelect {...tProps} />
                </Col>
              </Row>




              <Divider orientation="left">推送表格</Divider>
              <Row gutter={[10, 24]} justify="space-between">

                <Col span={16}>
                  <Select value={this.state.fileType} onChange={this.tableNameChange} >
                    <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
                    <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
                    <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
                    <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
                  </Select>
                </Col>
              </Row>

              {/* <Divider orientation="left">任务起止时间</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={16}>
              <RangePicker onChange={this.dateChange} format={dateFormat} value={[moment(this.state.fromdate, dateFormat), moment(this.state.enddate, dateFormat)]}  allowClear={false}/>
            </Col>

          </Row> */}

              <Divider orientation="left">任务季度</Divider>
              <Row gutter={[10, 24]} justify="space-between">


                <Col className="gutter-row" span={16}>
                  <DatePicker onChange={this.periodChage} picker="quarter" value={moment(this.state.period, dateFormat)} allowClear={false} />
                </Col>


              </Row>

              <Row gutter={[10, 24]} justify="space-between">
                <Col span={12}>
                  <Button type="primary" icon={<FileSearchOutlined />} onClick={update} loading={this.state.isUplaod}>
                    更新
                  </Button>
                </Col>
              </Row>


            </TabPane>

            <TabPane tab="完成情况" key="2">

              <Table columns={columns} dataSource={completedOrg} />

            </TabPane>

          </Tabs>






        </Spin>


      );
    } else {
      return (
        <Result
          status="success"
          title="您已经更新了该任务!"
          subTitle="在查询界面可以查看已经发布的任务"

        />)
    }



  }
}

export default HistoryTaskDetail
