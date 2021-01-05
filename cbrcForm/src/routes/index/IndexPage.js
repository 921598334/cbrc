import React, { Fragment } from 'react';
import { connect } from 'dva';

import { Form, Input, Button, Carousel, Row, Col, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import { styleTopSpan, layout, tailLayout } from './indexPageCSS'
import zhCN from 'antd/es/locale/zh_CN';

import stylestest from './test.css';

@connect(({ loginNamespace }) => ({
  loginNamespace,
}))

class IndexPage extends React.Component {



  constructor(props) {
    super(props)

    this.state = {
      islogin: false,
    }
  }


  render() {


    const onFinish = values => {
      console.log('点击了登陆');

      this.setState({
        islogin:true,
      })

      this.props.dispatch({
        type: "loginNamespace/login",
        loginInfo: {
          ...values,
        }
      }).then(result => {

        this.setState({
          islogin:false,
        })

        if (result) {

          console.log("根据用户的类型进行登陆判断")
          console.log(this.props.loginNamespace)

          //如果用户类型不是10-这个类型，表明是非管理员，此时进入用户页面
          if (this.props.loginNamespace['orgid'].indexOf("10-") == -1) {
            //登陆成功后跳转到管理员页面
            this.props.history.push('/user')
          } else {
            //登陆成功后跳转到管理员页面
            this.props.history.push('/admin')
          }
        }

      })
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };




    console.log("IndexPage开始渲染")
    console.log(this.props)

    return (

      <ConfigProvider locale={zhCN}>


        <Carousel >
          <div >
            <h3 className={stylestest.background1}>1</h3>
          </div>
          {/* <div>
            <h3 className={stylestest.background2}>2</h3>
          </div> */}

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
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名！' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密  码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码！' }]}
                >
                  <Input.Password />
                </Form.Item>

                {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>记住我</Checkbox>
                </Form.Item> */}

              </Col>

            </Row>

            <Row justify="center">
              <Col span={4}>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={this.state.islogin}>
                    登陆
                </Button>
                </Form.Item>
              </Col>
            </Row>

          </Form>



        </Fragment>




      </ConfigProvider>




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
