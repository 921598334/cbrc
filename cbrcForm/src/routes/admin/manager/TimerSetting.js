
import React from 'react';
import 'antd/dist/antd.css';
import '../table/tableCSS';

import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button,  Form, Row, Col, Result, BackTop } from 'antd';
import {  CloudUploadOutlined, SmileOutlined } from '@ant-design/icons';






@connect(({ adminSettingNameSpace }) => ({
  adminSettingNameSpace,
}))







class TimerSetting extends React.Component {

  constructor(props) {
    super(props);
   

    this.state = {
      dataSource: [

      ],

      orgid: Cookies.get('orgid'),
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),


      isUplaod: false,
      isComplete: false,
      fileType: 1,
    };
  }

  componentWillMount() {
    console.log("TimerSetting 的componentWillmount开始执行")
    //const { adminInfo } = this.props.usetSettingNameSpace

   
  }





  dataUpload = (row) => {


    console.log("dataUpload 执行了")


   
  };



  render() {


    console.log("adminNameSpace 的render开始执行")
    



    
    if (!this.state.isComplete) {

      return (

        <div>

          <Row gutter={[16, 24]}>
            <Col >
              <h1>定时作业设置</h1>
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

        </div >


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

export default TimerSetting
