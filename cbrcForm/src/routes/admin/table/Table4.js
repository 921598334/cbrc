import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Form, Input, Button, Checkbox, Carousel, Row, Col } from 'antd';
import 'antd/dist/antd.css';



@connect(({ loginNamespace }) => ({
  loginNamespace,
}))

class Table4 extends React.Component {


  render() {


    
    return (

      <div>

        <h1>Table4</h1>

      </div>


    )
  }
}




export default Table4
