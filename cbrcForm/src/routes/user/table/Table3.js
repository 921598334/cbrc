
import React from 'react';
import 'antd/dist/antd.css';
import './tableCSS';
import './tableCSS.css';
import Cookies from 'js-cookie'

import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, Result, BackTop } from 'antd';
import {   CloudUploadOutlined, SmileOutlined } from '@ant-design/icons';

const EditableContext = React.createContext();




const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} 是必输入的.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
            position: 'relative',
            padding: '5px 12px',
            cursor: 'pointer',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',

          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};






@connect(({ uploadNamespace }) => ({
  uploadNamespace,
}))





class Table3 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
     
      {
        
        title: '中介机构名称',
        dataIndex: 'col1',
        width: '10%',
        editable: true,
      },
      {
        title: '合作寿险公司名称',
        dataIndex: 'col2',
        width: '10%',
        editable: true,
      },
      {
        title: '保险产品全称',
        dataIndex: 'col3',
        editable: true,
        width: '10%',
      },
      {
        title: '险种类型',
        dataIndex: 'col4',
        width: '10%',
        editable: true,
      },
      {
        title: '该产品开始代理时间',
        dataIndex: 'col5',
        width: '10%',
        editable: true,
      },
      {
        title: '统计期末累计实现代理保费收入',
        dataIndex: 'col6',
        width: '20%',
        editable: true,
      },
      {
        title: '期/趸缴方式',
        dataIndex: 'col7',
        width: '10%',
        editable: true,
      },
      {
        title: '一般缴费年限',
        dataIndex: 'col8',
        width: '10%',
        editable: true,
      },
      {
        title: '首年保费机构佣金率（%）',
        dataIndex: 'col9',
        width: '20%',
        editable: true,
      },
      {
        title: '首个保单年度末退保现金价值率（%）',
        dataIndex: 'col10',
        width: '20%',
        editable: true,
      },
      {
        title: '备注',
        dataIndex: 'col11',
        width: '10%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },

    ];

    this.state = {
      dataSource: [
     
      ],
      
      orgid: Cookies.get('orgid'),
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),

      isUplaod: false,
      isComplete: false,
      fileType: 3,
    };
  }

  componentWillMount() {
    console.log("Table1的componentWillmount开始执行")
    //const { table1Struct } = this.props.uploadNamespace
  }


 

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count,dataSource } = this.state;
    const newData = {
       key: count,
      // name: `Edward King ${count}`,
      // age: 32,
      // address: `London, Park Lane no. ${count}`,
      col1:'',
      col2:'',
      col3:'',
      col4:'',
      col5:'',
      col6:'',
      col7:'',
      col8:'',
      col9:'',
      col10:'',
      col11:'',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };







  render() {


    console.log("Table3的render开始执行")
    //const dataSource = this.state.dataSource



    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });




    //点击保存数据上传
    const dataUpload = values => {
      console.log('dataUpload开始执行');


      const taskCompleteId = this.props.location.state.taskComplete['id']
      const taskId = this.props.location.state.taskComplete['taskid']




      this.setState({
        isUplaod: true,
      })

      console.log(this.state)
      this.props.dispatch({
        type: "uploadNamespace/upload",
        uploadInfo: {
          ...this.state,

          dataSource: this.state.dataSource,
         
          taskCompleteId: taskCompleteId,
          taskId: taskId,
        }
      })
        .then(result => {

          this.setState({
            isUplaod: false,
          })

          if (result) {
            //数据上传成功后
            this.setState({
              isComplete: true
            })
          }
        })
    };


    if (!this.state.isComplete) {

      return (

        <div>

          <Row gutter={[16, 24]}>
            <Col >
              <h1>重庆保险中介机构季度数据表-专业代理、经纪机构用表</h1>
            </Col >
          </Row>

          <Row gutter={[16, 24]} align="middle">
            {/* <Col className="gutter-row" span={4}>
              <Input placeholder="机构全称" prefix={<SketchOutlined />} onChange={this.orgNameChange} />
            </Col>
            <Col className="gutter-row" span={4}>
              <Input placeholder="负责人" prefix={<UserOutlined />} onChange={this.managerNameChange} />
            </Col>
            <Col className="gutter-row" span={4}>
              <Input placeholder="填表人" prefix={<SmileOutlined />} onChange={this.creatorChange} />
            </Col>
            <Col className="gutter-row" span={4}>
              <Input placeholder="填表人联系方式" prefix={<PhoneOutlined />} onChange={this.telChange} />
            </Col>

            <Col className="gutter-row" span={4}>
              <Select defaultValue="1" onChange={this.periodChage}>
                <Option value="1">第1季度(1~3月)</Option>
                <Option value="2">第2季度(4~6月)</Option>
                <Option value="3">第3季度(7~9月)</Option>
                <Option value="4">第4季度(10~12月)</Option>
              </Select>
            </Col> */}

            <Col className="gutter-row" span={4}>
              <Button type="primary" icon={<CloudUploadOutlined />} onClick={dataUpload} loading={this.state.isUplaod}>
                上传
            </Button>
            </Col>
          </Row>



          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            添加一行
        </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />


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
          title="您已经完成了当前的所有操作!"
        // extra={<Button type="primary">Next</Button>}
        />)
    }






  }
}

export default Table3
