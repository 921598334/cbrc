
import React from 'react';
import 'antd/dist/antd.css';
// import './table/tableCSS';

import Cookies from 'js-cookie'

import { connect } from 'dva';

import { Button, Row, Col, Result, BackTop, Input, Spin } from 'antd';
import { CloudUploadOutlined, SmileOutlined, UserOutlined, PhoneOutlined, UserSwitchOutlined, LockOutlined, DeploymentUnitOutlined } from '@ant-design/icons';



@connect(({ normalUserSettingNameSpace }) => ({
  normalUserSettingNameSpace,
}))



class UserInfoSetting extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [

      ],

      orgid: Cookies.get('orgid'),
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),


      //用户点击按钮上传标记
      isUplaod: false,
      //上传完成后显示成功标记
      isComplete: false,
      //初始化是否加载完成标记
      isLoading:true,
      fileType: 1,
      
    };
  }

  componentWillMount() {
    console.log("UserInfoSetting 的componentWillmount开始执行")

    this.props.dispatch({
      type: "normalUserSettingNameSpace/getUser",
      queryUserInfo: {
        ...this.state
      }
    })
      .then(result => {

        this.setState({
          isLoading: false,
        })

        if (result) {
          //查询成功后
          const { userInfo } = this.props.normalUserSettingNameSpace

          this.setState({
            orgName: userInfo.orgName,
            password: userInfo.password,
            telphone: userInfo.telphone,
            truename: userInfo.truename,
            userid: userInfo.userid,
            username: userInfo.username,

          })

        }
      })


  }


  componentWillUnmount() {
    console.log("UserInfoSetting 的 componentWillUnmount 开始执行")

  }




  dataUpload = (row) => {
    console.log("dataUpload 执行了")

    this.setState({
      isUplaod: true,
    })

    this.props.dispatch({
      type: "normalUserSettingNameSpace/updateUser",
      updateUserInfo: {
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



  render() {



    console.log("UserInfoSetting 的render开始执行")
    const { userInfo } = this.props.normalUserSettingNameSpace

    console.log('userInfo')
    console.log(userInfo)


    if (!this.state.isComplete) {

      return (

        <Spin spinning={this.state.isLoading} tip="数据加载中...">

          <Row gutter={[16, 24]}>
            <Col >
              <h1>用户信息设置</h1>
            </Col >
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Input placeholder="所属机构" prefix={<DeploymentUnitOutlined />} disabled value={this.state.orgName} />
            </Col >
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Input placeholder="用户名" prefix={<UserOutlined />} value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
            </Col >
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Input placeholder="真实姓名" prefix={<UserSwitchOutlined />} value={this.state.truename} onChange={(e) => { this.setState({ truename: e.target.value }) }} />
            </Col >
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Input placeholder="电话" prefix={<PhoneOutlined />} value={this.state.telphone} onChange={(e) => { this.setState({ telphone: e.target.value }) }} />
            </Col >
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Input.Password placeholder="密码" prefix={<LockOutlined />} value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
            </Col >
          </Row>

          <Row gutter={[16, 24]} align="middle">
            <Col className="gutter-row" span={4}>
              <Button type="primary" icon={<CloudUploadOutlined />} onClick={this.dataUpload} loading={this.state.isUplaod}>
                保存
            </Button>
            </Col>
          </Row>


          <BackTop>
            <div style={{
              height: 40,
              width: 40,
              lineHeight: '40px',
              borderRadius: 4,
              backgroundColor: '#1088e9',
              color: '#fff',
              textAlign: 'center',
              fontSize: 14,
            }}>UP</div>
          </BackTop>

        </Spin >


      );
    } else {
      return (
        <Result
          icon={<SmileOutlined />}
          title="您的信息已经成功保存!"
        // extra={<Button type="primary">Next</Button>}
        />)
    }






  }
}

export default UserInfoSetting
