
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import './tableCSS';
import './tableCSS.css';
import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, Select, Result,BackTop} from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined, SmileOutlined, PhoneOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;

//如果在类外定义变量或者熟悉，可以直接访问，如果在类内定义需要用this
function callback(key) {
  console.log(key);
}




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
            message: `${title} 是必输项`,
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







class Table2 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '统计数据项目',
        dataIndex: 'cellname',
        width: '30%',

      },
      {
        title: '数额(双击可编辑)',
        dataIndex: 'amount',
        width: '20%',
        editable: true,
      },
      {
        title: '备注(双击可编辑)',
        dataIndex: 'mark',
        editable: true,
        width: '30%',
      },
      {
        title: '填报说明',
        dataIndex: 'explain',
        width: '30%',
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
      fileType:2,
    };
  }

  componentWillMount() {
    console.log("Table2的componentWillmount开始执行")
    const { table2Struct } = this.props.uploadNamespace

    //不知道为什么，只有这样才能成功赋值
    this.state.dataSource = table2Struct
  }


  


  handleSave = (row) => {
    console.log("handleSave执行了")

    //原始数据
    const newData = [...this.state.dataSource];
    // console.log('原始数据')
    // console.log(newData)

    //需要修改的索引
    const index = newData.findIndex((item) => row.cellid === item.cellid);
    // console.log('需要修改的索引')
    // console.log(index)


    //需要修改的数据项
    const item = newData[index];
    // console.log('需要修改的数据项')
    // console.log(item)

    newData.splice(index, 1, { ...item, ...row });
    //newData.splice(index, 1, {  ...row });
    this.setState({
      dataSource: newData,
    });

    console.log('修改后的datasource为')
    console.log(this.state.dataSource)
  };



  render() {


    console.log("Table2的render开始执行")
    const dataSource = this.state.dataSource


    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
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
              <h1>重庆保险中介机构季度数据表-公估机构用表</h1>
            </Col >
          </Row>

          <Row gutter={[16, 24]} align="middle">
            

            <Col className="gutter-row" span={4}>
              <Button type="primary" icon={<CloudUploadOutlined />} onClick={dataUpload} loading={this.state.isUplaod}>
                上传
            </Button>
            </Col>
          </Row>



          <Collapse onChange={callback}>

            <Panel header="1.公估业务" key="1">

              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(0, 4)}
                columns={columns}
                pagination={false}
              />

            </Panel>

            <Panel header="2.公估收入" key="2">
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(4, 7)}
                columns={columns}
                pagination={false}
              />
            </Panel>


            <Panel header="3.营业收入及成本" key="3">
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(7, 10)}
                columns={columns}
                pagination={false}
              />
            </Panel>


            <Panel header="4.人员及流动情况" key="4">
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(10, 13)}
                columns={columns}
                pagination={false}
              />
            </Panel>


            <Panel header="5.资金管理情况" key="5">
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(13, 16)}
                columns={columns}
                pagination={false}
              />
            </Panel>



          </Collapse>


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

export default Table2
