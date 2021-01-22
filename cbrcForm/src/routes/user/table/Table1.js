
import React from 'react';
import 'antd/dist/antd.css';
// import './tableCSS';
// import './tableCSS.css';
import Cookies from 'js-cookie'
import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button,  Form, Row, Col, Result, BackTop } from 'antd';
import {  CloudUploadOutlined, SmileOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


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







class Table1 extends React.Component {

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
      fileType: 1,
    };
  }

  componentWillMount() {
    console.log("Table1的componentWillmount开始执行")
    const { table1Struct } = this.props.uploadNamespace

    //不知道为什么在dva中，下面这种方法setState没用，需要直接赋值 
    // this.setState({
    //   dataSource: tableStruct,
    // });
    // console.log(this.state)

    //不知道为什么，只有这样才能成功赋值
    this.state.dataSource = table1Struct
  }





  handleSave = (row) => {


    console.log("handleSave执行了")


    // console.log('row')
    // console.log(row)


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


    console.log("Table1的render开始执行")
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
          //dataSource: this.state.dataSource,
          // orgName: this.state.orgName,
          // managerName: this.state.managerName,
          // creator: this.state.creator,
          // tel: this.state.tel,
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
         

            <Col className="gutter-row" span={4}>
              <Button type="primary" icon={<CloudUploadOutlined />} onClick={dataUpload} loading={this.state.isUplaod}>
                上传
            </Button>
            </Col>
          </Row>



          <Collapse onChange={callback}>

            <Panel header="保费规模" key="1">

              <Collapse >
                <Panel header="1.产险公司业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(0, 7)}
                    columns={columns}
                    pagination={false}
                  />
                </Panel>
              </Collapse>



              <Collapse >
                <Panel header="2.寿险公司业务方面" key="1">

                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(7, 12)}
                    columns={columns}
                    pagination={false}
                  />

                </Panel>
              </Collapse>



              <Collapse defaultActiveKey="3">
                <Panel header="3.理财型保险业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(12, 16)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
            </Panel>

            <Panel header="保单件数" key="2">
              <Collapse >
                <Panel header="4.产险公司业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(16, 19)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>

              <Collapse >
                <Panel header="5.寿险公司业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(19, 22)}
                    columns={columns}
                    pagination={false}
                  />

                </Panel>
              </Collapse>


              <Collapse >
                <Panel header="6.理财型保险业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(22, 26)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
            </Panel>



            <Panel header="手续费及佣金收入" key="3">
              <Collapse >
                <Panel header="7.产险公司业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(26, 29)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse >
                <Panel header="8.寿险公司业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(29, 33)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse >
                <Panel header="9.理财型保险业务方面" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(33, 37)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
            </Panel>


            <Panel header="其他情况" key="4">
              <Collapse >
                <Panel header="10.营收及成本" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(37, 40)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse >
                <Panel header="11.人员及流动情况" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(40, 43)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse  >
                <Panel header="12.资金管理情况" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(43, 46)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse >
                <Panel header="13.非保险类理财产品销售情况" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(46, 47)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse >
                <Panel header="14.互联网保险业务开展情况" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(47, 48)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
              <Collapse >
                <Panel header="15.落地服务情况" key="1">
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource.slice(48, 49)}
                    columns={columns}
                    pagination={false}
                  />


                </Panel>
              </Collapse>
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

export default Table1
