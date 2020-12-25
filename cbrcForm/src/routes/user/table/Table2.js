import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Form, Input, Button, Checkbox, Carousel, Row, Col } from 'antd';
import 'antd/dist/antd.css';



@connect(({ loginNamespace }) => ({
  loginNamespace,
}))

class Table2 extends React.Component {


  render() {


    
    return (

      <div>

        <h1>Table2</h1>

      </div>


    )
  }
}




export default Table2
