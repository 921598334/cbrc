
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';

import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, DatePicker, ConfigProvider } from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined, SmileOutlined, PhoneOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

//如果在类外定义变量或者熟悉，可以直接访问，如果在类内定义需要用this
function callback(key) {
  console.log(key);
}



const dateFormat = 'YYYY/MM/DD';

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
            message: `${title} is required.`,
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


@connect(({ downloadNamespace }) => ({
  downloadNamespace,
}))







class RangeTable extends React.Component {

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

      },
      {
        title: '备注(双击可编辑)',
        dataIndex: 'mark',

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

      orgName: '',
      managerName: '',
      creator: '',
      tel: '',
    };
  }

  componentWillMount() {
    console.log("Table1的componentWillmount开始执行")
    // const { table1Struct } = this.props.downloadNamespace


    // //不知道为什么，只有这样才能成功赋值
    // this.state.dataSource = table1Struct
  }


  orgNameChange = e => {
    this.setState({
      orgName: e.target.value,
    })
  }
  managerNameChange = (e) => {
    this.setState({
      managerName: e.target.value,
    })
  }
  creatorChange = (e) => {
    this.setState({
      creator: e.target.value,
    })
  }
  telChange = (e) => {
    this.setState({
      tel: e.target.value,
    })
  }

  dateChange = (e) => {

    //e是一个数组，内部包括了开始时间与结束时间
    console.log(e)
    this.setState({
      //tel: e.target.value,
    })
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




    console.log("downloadTable的render开始执行")
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
      console.log(this.state)
      this.props.dispatch({
        type: "uploadNamespace/upload",
        uploadInfo: {
          ...this.state
          // dataSource: this.state.dataSource,
          // orgName: this.state.orgName,
          // managerName: this.state.managerName,
          // creator: this.state.creator,
          // tel: this.state.tel,
        }
      })
        .then(result => {
          if (result) {
            //登陆成功后跳转到管理员页面
            //this.props.history.push('/admin')
          }
        })
    };




    return (



  

      <ConfigProvider locale={zhCN}>

        <Row gutter={[16, 24]}>
          <Col >
            <h1>数据查询</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} align="middle">
          <Col className="gutter-row" span={4}>
            <Input size="large" placeholder="机构列表" prefix={<SketchOutlined />} onChange={this.orgNameChange} />
          </Col>

          <Col className="gutter-row" span={4}>
            <Input size="large" placeholder="表明" prefix={<SketchOutlined />} onChange={this.orgNameChange} />
          </Col>

          <Col className="gutter-row" span={4}>
            <RangePicker onChange={this.dateChange} format={dateFormat}/>
          </Col>


          <Col className="gutter-row" span={8}>
            <Button type="primary" icon={<FileSearchOutlined />} onClick={dataUpload}>
              查询
            </Button>
          </Col>
        </Row>


        {/* 
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
 */}

      </ConfigProvider >


    );






  }
}

export default RangeTable
