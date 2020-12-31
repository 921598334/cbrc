
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import './tableCSS';
import './tableCSS.css';

import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, Select, Result,BackTop } from 'antd';
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
        // {
        //   key: '0',
        //   item: '（1）产险公司保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '请填报所有来自产险公司的业务，统计不含增值税保费金额（下同）',
        // },
        // {
        //   key: '1',
        //   item: '（1.1）其中：车险保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '包含交强险、商车险保费',
        // },
        // {
        //   key: '2',
        //   item: '（1.11）其中：车险新车保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '新车保费口径为车辆首次登记注册1年以内的承保保费',
        // },
        // {
        //   key: '3',
        //   item: '（1.2）其中：股东业务保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '股东业务口径：以股东和股东下属企业为投保人或被保险人实现的业务保费收入',
        // },
        // {
        //   key: '4',
        //   item: '（1.3）其中：来自股东所属车商保费（车商类专业代理机构填报）',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '请填报通过股东及股东下属车商（4S店）实现车险保费收入，投保人为非股东及其下属车商的第三人',
        // },
        // {
        //   key: '5',
        //   item: '（1.4）合作业务规模最大的产险公司保费',
        //   amount: '双击输入',
        //   mark: '须填写',
        //   explain: '请在备注栏填写该公司简称，如人保财险、平安产险、太保产险等，仅填报规模最大的1家',
        // },
        // {
        //   key: '6',
        //   item: '（1.5）与专业互联网产险公司合作保费',
        //   amount: '双击输入',
        //   mark: '如有业务须填写',
        //   explain: '请填报与经银保监会批准设立的专业互联网财产保险公司合作的业务，包含众安在线、安心财险、易安财险、泰康在线等。请在备注栏填写有业务合作的专业互联网保险公司简称。',
        // },
        // {
        //   key: '7',
        //   item: '（2）寿险公司保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '请填报所有来自寿险公司的业务',
        // },
        // {
        //   key: '8',
        //   item: '（2.1）其中：寿险新单保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '仅统计一年期以上人身保险，不包含短期健康险和意外险',
        // },
        // {
        //   key: '9',
        //   item: '（2.11）其中：寿险新单期缴保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '请填报缴费期超过1年的寿险新单业务首年保费',
        // },
        // {
        //   key: '10',
        //   item: '（2.2）其中：寿险续期保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '',
        // },
        // {
        //   key: '11',
        //   item: '（2.3）合作业务规模最大的寿险公司保费',
        //   amount: '双击输入',
        //   mark: '须填写',
        //   explain: '请在备注栏填写该公司简称，如中国人寿、泰康人寿、太保寿险等，仅填报规模最大的1家',
        // },
        // {
        //   key: '12',
        //   item: '（3）理财型保险产品新单保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '包括但不限于：寿险公司分红、投连、万能寿险及投资型长期健康险、意外险等；产险公司一年期以上带有保本理财功能的投资型家财险、意外险等',
        // },
        // {
        //   key: '13',
        //   item: '（3.1）其中：55岁（含）以上投保人新单保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '请填报投保人年龄55岁及以上保单保费',
        // },  {
        //   key: '14',
        //   item: '（3.2）其中：销售额最大理财型保险产品保费',
        //   amount: '双击输入',
        //   mark: '须填写',
        //   explain: '请在备注栏注明销售额最大产品全称',
        // },  {
        //   key: '15',
        //   item: '（3.3）其中：本机构人员自买单理财保险产品保费',
        //   amount: '双击输入',
        //   mark: '无',
        //   explain: '自买单口径：保单投保人、被保险人或受益人中其一为机构人员的',
        // },  {
        //   key: '16',
        //   item: '（4）产险公司保单件数',
        //   amount: '无',
        //   mark: '如有业务须填写',
        //   explain: '',
        // },  {
        //   key: '17',
        //   item: '（4.1）其中：车险保单件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '请注意：同一车辆同时投保交强险和商业车险仅计1件保单，下同',
        // },  {
        //   key: '18',
        //   item: '（4.11）其中：新车承保数量',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '19',
        //   item: '（5）寿险公司保单件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '20',
        //   item: '（5.1）其中：寿险业务新单保单件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '21',
        //   item: '（5.2）其中：寿险业务续期保单件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '22',
        //   item: '（6）理财型保险产品新单投保件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '23',
        //   item: '（6.1）其中：55岁（含）以上投保人新单投保件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '24',
        //   item: '（6.2）其中：销售额最大理财型保险产品保单件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '25',
        //   item: '（6.3）其中：本机构人员自买单理财保险产品投保件数',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },   {
        //   key: '26',
        //   item: '（7）产险公司手续费收入',
        //   amount: '无',
        //   mark: '',
        //   explain: '',
        // },  



      ],

      orgName: '',
      managerName: '',
      creator: '',
      tel: '',
      isUplaod: false,
      isComplete: false,
      fileType:1,
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

  periodChage = (e) => {
    console.log(e)
    this.setState({
      period: e,
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

      this.setState({
        isUplaod: true,
      })

      console.log(this.state)
      this.props.dispatch({
        type: "uploadNamespace/upload",
        uploadInfo: {
          ...this.state,
         
          dataSource: this.state.dataSource,
          orgName: this.state.orgName,
          managerName: this.state.managerName,
          creator: this.state.creator,
          tel: this.state.tel,
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
            </Col>

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
