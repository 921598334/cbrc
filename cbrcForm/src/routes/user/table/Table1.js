
import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import '../userPage.css';
import { Collapse } from 'antd';
import { connect } from 'dva';
import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col } from 'antd';
import { UserOutlined, SketchOutlined, CloudUploadOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;





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
        dataIndex: 'item',
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
        {
          key: '0',
          item: '（1）产险公司保费',
          amount: '双击输入',
          mark: '无',
          explain: '请填报所有来自产险公司的业务，统计不含增值税保费金额（下同）',
        },
        {
          key: '1',
          item: '（1.1）其中：车险保费',
          amount: '双击输入',
          mark: '无',
          explain: '包含交强险、商车险保费',
        },
        {
          key: '2',
          item: '（1.11）其中：车险新车保费',
          amount: '双击输入',
          mark: '无',
          explain: '新车保费口径为车辆首次登记注册1年以内的承保保费',
        },
        {
          key: '3',
          item: '（1.2）其中：股东业务保费',
          amount: '双击输入',
          mark: '无',
          explain: '股东业务口径：以股东和股东下属企业为投保人或被保险人实现的业务保费收入',
        },
        {
          key: '4',
          item: '（1.3）其中：来自股东所属车商保费（车商类专业代理机构填报）',
          amount: '双击输入',
          mark: '无',
          explain: '请填报通过股东及股东下属车商（4S店）实现车险保费收入，投保人为非股东及其下属车商的第三人',
        },
        {
          key: '5',
          item: '（1.4）合作业务规模最大的产险公司保费',
          amount: '双击输入',
          mark: '须填写',
          explain: '请在备注栏填写该公司简称，如人保财险、平安产险、太保产险等，仅填报规模最大的1家',
        },
        {
          key: '6',
          item: '（1.5）与专业互联网产险公司合作保费',
          amount: '双击输入',
          mark: '如有业务须填写',
          explain: '请填报与经银保监会批准设立的专业互联网财产保险公司合作的业务，包含众安在线、安心财险、易安财险、泰康在线等。请在备注栏填写有业务合作的专业互联网保险公司简称。',
        },

      ],
      count: 7,
      orgName:'',
      managerName:'',
    };
  }


  handleSave = (row) => {
    console.log("handleSave执行了")
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };







  render() {


    const { dataSource } = this.state;
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
      this.props.dispatch({
        type: "uploadNamespace/upload",
        uploadInfo: {
          ...this.state.dataSource
        }
      })
      .then(result => {
        if(result){
          //登陆成功后跳转到管理员页面
          this.props.history.push('/admin')
        }
      })
    };

   






    return (

      <div>

        <Row gutter={[16, 24]}>
          <Col >
            <h1>重庆保险中介机构季度数据表-专业代理、经纪机构用表</h1>
          </Col >
        </Row>

        <Row gutter={[16, 24]} align="middle">
          <Col className="gutter-row" span={6}>
            <Input size="large" placeholder="机构全称" prefix={<SketchOutlined />} />
          </Col>
          <Col className="gutter-row" span={6}>
            <Input size="large" placeholder="负责人" prefix={<UserOutlined />} />
          </Col>
          <Col className="gutter-row" span={6}>
            <Button type="primary" icon={<CloudUploadOutlined />} onClick={dataUpload}>
              上传
            </Button>
          </Col>
        </Row>



        <Collapse onChange={callback}>

          <Panel header="1保费规模" key="1">
            <Collapse defaultActiveKey="1">
              <Panel header="1.1产险公司业务方面" key="1">
                <p>请填报所有来自产险公司的业务，统计不含增值税保费金额</p>

                <Table
                  components={components}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />

              </Panel>
            </Collapse>

            <Collapse defaultActiveKey="2">
              <Panel header="1.2寿险公司业务方面" key="1">

              </Panel>
            </Collapse>



            <Collapse defaultActiveKey="3">
              <Panel header="1.3理财型保险业务方面" key="1">

              </Panel>
            </Collapse>
          </Panel>

          <Panel header="保单件数" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="手续费及佣金收入" key="3">
            <p>{text}</p>
          </Panel>
          <Panel header="其他情况" key="3">
            <p>{text}</p>
          </Panel>

        </Collapse>






      </div >


    );



  }
}

export default Table1
