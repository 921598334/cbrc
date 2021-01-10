
import React from 'react';
import 'antd/dist/antd.css';
import '../table/tableCSS';

import Cookies from 'js-cookie'

import { connect } from 'dva';

import { Spin, Input, Button, Row, Col, Select, TreeSelect, Divider, Result } from 'antd';
import {  SketchOutlined, FileSearchOutlined } from '@ant-design/icons';
const { TextArea } = Input;


const { Option } = Select;




@connect(({ taskNamespace }) => ({
  taskNamespace,
}))




class PublishTimerTask extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
    

      orgid: Cookies.get('orgid'),
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),

      taskTitle: '',
      taskDescribe: '',
      
      fileType: '1',
      isComplete: false,
      selectedValue: [],
      period: '1',
      isUplaod: false,
      //初始化是否加载完成标记
      isLoading:true,
    };
  }

  componentWillMount() {
    console.log("TimerSetting 的componentWillmount开始执行")


    this.props.dispatch({
      type: "taskNamespace/getOrg",

    })
      .then(result => {
        
        this.setState({
          isLoading: false,
        })

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




  render() {


    console.log("TimerSetting 的render开始执行")



    const { treeData } = this.props.taskNamespace

    // console.log(orgData)
    console.log(treeData)

    //点击发布
    const publish = values => {
      console.log('publish开始执行');


      this.setState({
        isUplaod: true,
      })


      this.props.dispatch({
        type: "taskNamespace/publishTimerTask",
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
              <h1>定时任务发布模块（定时任务会在每季度第1天凌晨1点执行）</h1>
            </Col >
          </Row>

          <Divider orientation="left">任务标题</Divider>
          <Row gutter={[10, 24]} justify="space-between">
            <Col span={16}>
              <Input placeholder="任务标题" prefix={<SketchOutlined />} onChange={this.taskTitleChange} />
            </Col>
          </Row>

          <Divider orientation="left">任务描述</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={16}>
              <TextArea placeholder="任务描述" prefix={<SketchOutlined />} onChange={this.taskDescribeChange} style={{ height: '200px' }} />
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
              <Select defaultValue="重庆保险中介机构季度数据表-专业代理、经纪机构用表" onChange={this.tableNameChange} >
                <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
                <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
                <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
                <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
              </Select>
            </Col>
          </Row>

     

          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Button type="primary" icon={<FileSearchOutlined />} onClick={publish} loading={this.state.isUplaod}>
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
          title="您已经完成了定时任务的设置!"
          subTitle="在查询界面可以查看已经发布的任务"

        />)
    }







  }
}

export default PublishTimerTask
