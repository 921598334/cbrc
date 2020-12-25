import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Form, Input, Button, Checkbox, Carousel, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import {styleTopSpan,layout,tailLayout,contentStyle} from './indexPageCSS'



@connect(({ loginNamespace }) => ({
  loginNamespace,
}))

class IndexPage extends React.Component {


  render() {


    const onFinish = values => {
      console.log('点击了登陆');
      this.props.dispatch({
        type: "loginNamespace/login",
        loginInfo: {
          ...values,
        }
      }).then(result => {
        if(result){
          //登陆成功后跳转到管理员页面
          this.props.history.push('/admin')
        }
        
        
      })
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };


    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    console.log("IndexPage开始渲染")
    console.log(this.props)

    return (

      <div>


        <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>,


        <Fragment>

          <Form
            style={styleTopSpan}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row justify="center" >

              <Col span={4} >

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

              </Col>

            </Row>

            <Row justify="center">
              <Col span={4}>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
              </Col>
            </Row>

          </Form>



        </Fragment>




      </div>




    )
  }
}


// const mapStateToProps=state=>{

//   // console.log(state)
//   // return{
//   //   msg:"我哎北京"
//   // }
// }

//export default connect(mapStateToProps)(IndexPage)



export default IndexPage
