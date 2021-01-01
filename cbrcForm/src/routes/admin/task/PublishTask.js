
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useEffect, useRef } from 'react';
import { Spin, Input, Button, Popconfirm, Form, Row, Col, DatePicker, Select, TreeSelect, Divider, Result } from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined, SmileOutlined, PhoneOutlined, FileSearchOutlined, ZoomInOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const { SHOW_PARENT } = TreeSelect;
const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';




@connect(({ taskNamespace }) => ({
  taskNamespace,
}))
class PublishTask extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      taskTitle: '',
      taskDescribe: '',
      userid: Cookies.get('userid'),
      fileType: '1',
      isComplete: false,
      selectedValue:[],
    };
  }

  componentWillMount() {
    console.log("PublishTask的componentWillmount开始执行")

    this.props.dispatch({
      type: "taskNamespace/getOrg",

    })
      .then(result => {
        if (result) {


        }
      })

  }


  taskTitleChange = e => {
    this.setState({
      taskTitle: e.target.value,
    })
  }
  taskDescribeChange = (e) => {
    console.log(e)
    this.setState({
      taskDescribe: e.target.value,
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

  tableNameChange = (e) => {
    console.log('表发生了变化')
    console.log(e)
    this.setState({
      fileType: e,
    })
  }


  orgTypeChange = value => {
    console.log('onChange ', value);

    //判断该value对应的树下是否有子树

    this.setState({
      selectedValue: value
    });
  };




  render() {
    console.log("PublishTask的render开始执行")

    const { treeData } = this.props.taskNamespace

    // console.log(orgData)
    console.log(treeData)

    //点击发布
    const publish = values => {
      console.log('publish开始执行');

      this.props.dispatch({
        type: "taskNamespace/publish",
        publishInfo: {
          ...this.state

        }
      })
        .then(result => {
          if (result) {
            //查询成功后
            this.setState({
              isComplete:true,
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

        <Spin spinning={treeData == undefined || treeData == []} tip="数据加载中...">

          <Row gutter={[16, 24]}>
            <Col >
              <h1>任务发布模块</h1>
            </Col >
          </Row>

          <Divider orientation="left">任务标题</Divider>
          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Input placeholder="任务标题" prefix={<SketchOutlined />} onChange={this.taskTitleChange} />
            </Col>
          </Row>

          <Divider orientation="left">任务描述</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={12}>
              <TextArea placeholder="任务描述" prefix={<SketchOutlined />} onChange={this.taskDescribeChange} />
            </Col>
          </Row>



          <Divider orientation="left">推送机构</Divider>
          <Row gutter={[10, 24]}  >

            <Col span={12}>
              <TreeSelect {...tProps} />
            </Col>
          </Row>




          <Divider orientation="left">推送表格</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={12}>
              <Select defaultValue="重庆保险中介机构季度数据表-专业代理、经纪机构用表" onChange={this.tableNameChange} >
                <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
                <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
                <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
                <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
              </Select>
            </Col>
          </Row>

          <Divider orientation="left">任务起止时间</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={12}>
              <RangePicker onChange={this.dateChange} format={dateFormat} />
            </Col>
          </Row>

          <Divider orientation="left">任务季度</Divider>
          <Row gutter={[10, 24]} justify="space-between">
            <Col className="gutter-row" span={4}>
              <Select defaultValue="1" onChange={this.periodChage}>
                <Option value="1">第1季度(1~3月)</Option>
                <Option value="2">第2季度(4~6月)</Option>
                <Option value="3">第3季度(7~9月)</Option>
                <Option value="4">第4季度(10~12月)</Option>
              </Select>
            </Col>
          </Row>

          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Button type="primary" icon={<FileSearchOutlined />} onClick={publish}>
                发布
            </Button>
            </Col>
          </Row>



        </Spin>


      );
    } else {
      return (
        <Result
          status="success"
          title="您已经完成了任务发布!"
          subTitle="在查询界面可以查看已经发布的任务"
        
        />)
    }









  }
}

export default PublishTask
