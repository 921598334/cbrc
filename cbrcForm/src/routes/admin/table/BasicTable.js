
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';

import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, DatePicker, Select } from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined, SmileOutlined, PhoneOutlined, FileSearchOutlined, ZoomInOutlined } from '@ant-design/icons';


const { Option } = Select;
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








@connect(({ queryNamespace }) => ({
  queryNamespace,
}))







class BasicTable extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [
      ],

      orgName: '',
      fromDate: '',
      endDate: '',
      fileType:'1',

    };
  }

  componentWillMount() {
    console.log("BasicTable的componentWillmount开始执行")
    // const { table1Struct } = this.props.downloadNamespace


    // //不知道为什么，只有这样才能成功赋值
    // this.state.dataSource = table1Struct


  }


  orgNameChange = e => {
    this.setState({
      orgName: e.target.value,
    })
  }
  tableNameChange = (e) => {
    console.log('表发生了变化')
    console.log(e)
    this.setState({
      fileType: e,
    })
  }

  dateChange = (e) => {

    if (e != null || e != undefined) {
      this.setState({
        fromDate: e[0].format('YYYY-MM-DD'),
        endDate: e[1].format('YYYY-MM-DD'),
      })
    } else {
      this.setState({
        fromDate: null,
        endDate: null,
      })
    }

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


  handleDownload = (id) => {

    console.log(id)

    this.props.dispatch({
      type: "queryNamespace/download",
      downloadInfo: {
        id: id,
        ...this.state
      }
    })
      .then(result => {
        if (result) {

          window.open('http://' + this.props.queryNamespace.downloadLink)
        }
      })
  }

  collectDownload = (id) => {

    this.props.dispatch({
      type: "queryNamespace/collectDownload",
      queryInfo: {
        ...this.state
      }
    })
      .then(result => {
        if (result) {

          window.open('http://' + this.props.queryNamespace.downloadLink)
        }
      })
  }


  


  render() {

    console.log("basicTable的render开始执行")

    console.log(this.props.queryNamespace)

    const { queryData } = this.props.queryNamespace

    const columns = [
      // {
      //   title: 'id',
      //   dataIndex: 'id',
      //   width: '30%',
      //   hide:true,
      // },
      {
        title: '机构名称',
        dataIndex: 'orgName',
        width: '30%',

      },
      {
        title: '负责人',
        dataIndex: 'managerName',
        width: '20%',

      },
      {
        title: '提交时间',
        dataIndex: 'date',
        width: '30%',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          <a onClick={() => this.handleDownload(record.id)}>下载</a>
      },

    ];


    //点击查询
    const query = values => {
      console.log('query开始执行');

      this.props.dispatch({
        type: "queryNamespace/query",
        queryInfo: {
          ...this.state

        }
      })
        .then(result => {
          if (result) {
            //查询成功后

          }
        })
    };


    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    //const hasSelected = selectedRowKeys.length > 0;

    return (

      <div>

        <Row gutter={[16, 24]}>
          <Col >
            <h1>数据查询</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]}  justify="space-between">
          <Col span={4}>
            <Input placeholder="机构列表" prefix={<SketchOutlined />} onChange={this.orgNameChange} />
          </Col>


          <Col span={6}  >
            <Select defaultValue="重庆保险中介机构季度数据表-专业代理、经纪机构用表" onChange={this.tableNameChange} style={{width:'300px'}}>
              <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
              <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
              <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
              <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
            </Select>
          </Col>


          <Col span={6}  >
            <RangePicker onChange={this.dateChange} format={dateFormat} />
          </Col>


          <Col span={4}  >
            <Button type="primary" icon={<FileSearchOutlined />} onClick={query}>
              查询
            </Button>
          </Col>

        </Row>

        <Row gutter={[16, 24]}  >

        </Row>





        <div>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={this.collectDownload} loading={false}>
              全部下载
              </Button>
            <Button type="primary" onClick={this.collectDownload} loading={false} style={{ marginLeft: 8 }}>
              汇总下载
              </Button>
            <span style={{ marginLeft: 8 }}>
              {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
            </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={queryData} pagination={false} />
        </div>


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

      </div >


    );






  }
}

export default BasicTable
