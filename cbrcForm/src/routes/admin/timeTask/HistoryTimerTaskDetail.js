
import React from 'react';
import 'antd/dist/antd.css';

import Cookies from 'js-cookie'

import { connect } from 'dva';

import { Spin, Input, Button, Row, Col, Switch, Select, TreeSelect, Divider, Result } from 'antd';
import { SketchOutlined, FileSearchOutlined } from '@ant-design/icons';


const { TextArea } = Input;


const { Option } = Select;



const dateFormat = 'YYYY-MM-DD';




@connect(({ taskNamespace }) => ({
  taskNamespace,
}))
class HistoryTimerTaskDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      tasktitle: '',
      taskDescribe: '',
      userid: Cookies.get('userid'),
      filetype: '1',
      isComplete: false,
      selectedValue: [],
      period: '2000-01-01',
      enddate: '2000-01-01',
      fromdate: '2000-01-02',

      isUplaod: false,
    };
  }

  async componentWillMount() {
    console.log("HistoryTimerTaskDetail 的componentWillmount 开始执行")

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
      type: "taskNamespace/queryTimerTaskDetail",
      queryTimerTaskDetailInfo: {
        id: this.props.location.state.id,

      }
    })
      .then(result => {
        if (result) {
          console.log('任务细节查询结束：')
          const { queryTimerTaskDetailData } = this.props.taskNamespace
          this.setState({
            tasktitle: queryTimerTaskDetailData.tasktitle,
            taskDescribe: queryTimerTaskDetailData.taskdescribe,

            filetype: queryTimerTaskDetailData.filetype,
            id: queryTimerTaskDetailData.id,
            selectedValue: queryTimerTaskDetailData.orgtype,

          })

          console.log('state修改完成：')
        }
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
      filetype: e,
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



  render() {
    console.log("HistoryTaskDetail 的render开始执行")

    const { treeData, queryTimerTaskDetailData } = this.props.taskNamespace


    //点击更新
    const update = values => {
      console.log('update 开始执行');

      this.setState({
        isUplaod: true,
      })


      this.props.dispatch({
        type: "taskNamespace/updateTimerTask",
        publishTimerTaskInfo: {
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

        <Spin spinning={(treeData == undefined || treeData == []) || (queryTimerTaskDetailData == undefined || queryTimerTaskDetailData == [])} tip="数据加载中...">


          <Row gutter={[16, 24]}>
            <Col >
              <h1>定时任务更新模块</h1>
            </Col >
          </Row>

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
              <Select value={this.state.filetype} onChange={this.tableNameChange} >
                <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
                <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
                <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
                <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
              </Select>
            </Col>
          </Row>



          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked value={this.state.isenable}
                onChange={(e) => {
                  console.log('开关状态')
                  console.log(e)
                  this.setState({
                    isenable: e
                  });
                }}
              />
            </Col>
          </Row>


          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Button type="primary" icon={<FileSearchOutlined />} onClick={update} loading={this.state.isUplaod}>
                更新
            </Button>
            </Col>
          </Row>



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

export default HistoryTimerTaskDetail
