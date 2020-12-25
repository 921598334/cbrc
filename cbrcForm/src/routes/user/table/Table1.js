import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Form, Input, Button, Checkbox, Carousel, Row, Col } from 'antd';
import 'antd/dist/antd.css';



@connect(({ loginNamespace }) => ({
  loginNamespace,
}))

class Table1 extends React.Component {


  render() {


    
    return (

      <div>


      
        <h1>table1</h1>


      </div>




    )
  }
}




export default Table1
