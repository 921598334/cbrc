
import React from 'react';
import 'antd/dist/antd.css';

import Cookies from 'js-cookie'

import { connect } from 'dva';

import { Spin, Input, Button, Row, Col, Switch, Select, TreeSelect, Divider, Result, Typography,Popover } from 'antd';
import { SketchOutlined, FileSearchOutlined, FieldTimeOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const { TextArea } = Input;


const { Option } = Select;


const content = (
  <div>
    <Title>
      Cron表达式是一个字符串，每一个域代表一个含义
    </Title>
    <Paragraph>
      <table border="1">
        <tr>
          <th>位置</th>
          <th>时间域</th>
          <th>允许值</th>
        </tr>
        <tr>
          <th>1</th>
          <th>秒</th>
          <th>0-59</th>
        </tr>
        <tr>
          <th>2</th>
          <th>分钟</th>
          <th>0-59</th>
        </tr>
        <tr>
          <th>3</th>
          <th>小时</th>
          <th>0-23</th>
        </tr>
        <tr>
          <th>4</th>
          <th>日期</th>
          <th>1-31</th>
        </tr>
        <tr>
          <th>4</th>
          <th>日期</th>
          <th>1-31</th>
        </tr>
        <tr>
          <th>5</th>
          <th>月份</th>
          <th>1-12</th>
        </tr>
        <tr>
          <th>6</th>
          <th>星期</th>
          <th>1-7</th>
        </tr>

      </table>
    </Paragraph>

    <Paragraph>
      (1) *：表示匹配该域的任意值。
      (2) ? :只能用在DayofMonth和DayofWeek两个域。
      (3) - :表示范围。
      (4)/：表示起始时间开始触发，然后每隔固定时间触发一次。
      (5) , :表示列出枚举值值。
      (6) L :表示最后。
      (7) W: 表示有效工作日(周一到周五)。
      (8) LW :表示在某个月最后一个工作日，即最后一个星期五。
      (9) # :用于确定每个月第几个星期几。
    </Paragraph>



    {/* <Paragraph>
      (1) *：表示匹配该域的任意值。
    </Paragraph>
    <Paragraph>
      (2) ? :只能用在DayofMonth和DayofWeek两个域。
    </Paragraph>

    <Paragraph>
      (3) - :表示范围。
    </Paragraph>

    <Paragraph>
      (4)/：表示起始时间开始触发，然后每隔固定时间触发一次。
    </Paragraph>

    <Paragraph>
      (5) , :表示列出枚举值值。
    </Paragraph>

    <Paragraph>
      (6) L :表示最后。
    </Paragraph>

    <Paragraph>
      (7) W: 表示有效工作日(周一到周五)。
    </Paragraph>

    <Paragraph>
      (8) LW :这两个字符可以连用，表示在某个月最后一个工作日，即最后一个星期五。
    </Paragraph>

    <Paragraph>
      (9) # :用于确定每个月第几个星期几。
    </Paragraph> */}



    <Title>
      常用例子
    </Title>
    <Paragraph>
      <table border="1">
        <tr>
          <th>cron表达式</th>
          <th>描述</th>

        </tr>
        <tr>
          <th>0 0 10,15,16 * * ?  </th>
          <th>每天上午10点，下午3点，4点</th>

        </tr>
        <tr>
          <th>0 0/30 9-17 * * ?</th>
          <th>朝九晚五工作时间内每半小时</th>

        </tr>
        <tr>
          <th>0 0 12 * * ?</th>
          <th>每天中午12点触发</th>

        </tr>
        <tr>
          <th>0 00 1 1 4,7,10,1 ?</th>
          <th>每季度第一天，1点发布任务</th>

        </tr>
        <tr>
          <th>0 59 23 L 3,6,9,12 ?</th>
          <th>每季度最后一天23点59分执行任务</th>

        </tr>


      </table>
    </Paragraph>


  </div>
);

@connect(({ taskNamespace }) => ({
  taskNamespace,
}))
class HistoryTimerTaskDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      tasktitle: '',
      taskDescribe: '',
      userid: Cookies.get('userid'),
      filetype: '1',
      isComplete: false,
      selectedValue: [],
      period: '2000-01-01',
      enddate: '2000-01-01',
      fromdate: '2000-01-02',
      //初始化是否加载完成标记
      isLoading: true,
      isUplaod: false,
    };
  }

  async componentWillMount() {
    console.log("HistoryTimerTaskDetail 的componentWillmount 开始执行")

    await this.props.dispatch({
      type: "taskNamespace/getOrg",

    })
      .then(result => {
        if (result) {

        }
      })


    console.log('需要查询的任务ID为：')
    console.log(this.props.location.state.id)

    //查询任务细节
    await this.props.dispatch({
      type: "taskNamespace/queryTimerTaskDetail",
      queryTimerTaskDetailInfo: {
        id: this.props.location.state.id,

      }
    })
      .then(result => {
        if (result) {
          console.log('任务细节查询结束：')
          const { queryTimerTaskDetailData } = this.props.taskNamespace
          this.setState({
            tasktitle: queryTimerTaskDetailData.tasktitle,
            taskDescribe: queryTimerTaskDetailData.taskdescribe,

            filetype: queryTimerTaskDetailData.filetype,
            id: queryTimerTaskDetailData.id,
            selectedValue: queryTimerTaskDetailData.orgtype,
            isenable: queryTimerTaskDetailData.isenable,
            cron: queryTimerTaskDetailData.cron
          })

          console.log('state修改完成：')
        }
      })

    this.setState({
      isLoading: false,
    })

    console.log("HistoryTaskDetail 的componentWillmount 执行结束")

  }


  cronChange = e => {
    console.log('e.target.value')
    console.log(e.target.value)
    this.setState({
      cron: e.target.value,
    })
  }


  taskTitleChange = e => {
    this.setState({
      tasktitle: e.target.value,
    })
  }
  taskDescribeChange = (e) => {
    console.log(e)
    this.setState({
      taskDescribe: e.target.value,
    })
  }

  dateChange = (e) => {
    console.log('时间发生了变化')
    console.log(e)
    if (e != null || e != undefined) {
      this.setState({
        fromdate: e[0].format('YYYY-MM-DD'),
        enddate: e[1].format('YYYY-MM-DD'),
      })
    } else {
      this.setState({
        fromdate: null,
        enddate: null,
      })
    }

  }

  tableNameChange = (e) => {
    console.log('表发生了变化')
    console.log(e)
    this.setState({
      filetype: e,
    })
  }


  orgTypeChange = value => {
    console.log('onChange ', value);

    this.setState({
      selectedValue: value
    });
  };


  periodChage = value => {

    console.log(value.format('YYYY-MM-DD'))
    this.setState({
      period: value.format('YYYY-MM-DD')
    });
  };



  render() {
    console.log("HistoryTaskDetail 的render开始执行")

    const { treeData } = this.props.taskNamespace


    //点击更新
    const update = values => {
      console.log('update 开始执行');

      this.setState({
        isUplaod: true,
      })


      this.props.dispatch({
        type: "taskNamespace/updateTimerTask",
        publishTimerTaskInfo: {
          ...this.state
        }
      })
        .then(result => {

          this.setState({
            isUplaod: false,
          })

          if (result) {
            //查询成功后
            this.setState({
              isComplete: true,
            })
          }
        })
    };



    const tProps = {
      treeData,
      value: this.state.selectedValue,
      onChange: this.orgTypeChange,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_CHILD,
      placeholder: '请选择推送单位',
      style: {
        width: '100%',
      },
    };








    if (!this.state.isComplete) {

      return (

        // <Spin spinning={(treeData == undefined || treeData == []) || (queryTimerTaskDetailData == undefined || queryTimerTaskDetailData == [])} tip="数据加载中...">
        <Spin spinning={this.state.isLoading} tip="数据加载中...">


          <Row gutter={[16, 24]}>
            <Col >
              <h1>定时任务更新模块</h1>
            </Col >
          </Row>

          <Divider orientation="left">任务标题</Divider>
          <Row gutter={[10, 24]} justify="space-between">
            <Col span={16}>
              <Input placeholder="任务标题" prefix={<SketchOutlined />} onChange={this.taskTitleChange} value={this.state.tasktitle} />
            </Col>
          </Row>

          <Divider orientation="left">任务描述</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={16}>
              <TextArea placeholder="任务描述" prefix={<SketchOutlined />} onChange={this.taskDescribeChange} style={{ height: '200px' }} value={this.state.taskDescribe} />
            </Col>
          </Row>



          <Divider orientation="left">推送机构</Divider>
          <Row gutter={[10, 24]}  >

            <Col span={16}>
              <TreeSelect {...tProps} />
            </Col>
          </Row>




          <Divider orientation="left">推送表格</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={16}>
              <Select value={this.state.filetype} onChange={this.tableNameChange} >
                <Option value="1">重庆保险中介机构季度数据表-专业代理、经纪机构用表</Option>
                <Option value="2">重庆保险中介机构季度数据表-公估机构用表</Option>
                <Option value="3">重庆保险中介机构季度数据表-专业中介机构销售寿险公司长期保险产品统计表</Option>
                <Option value="4">重庆保险中介机构季度数据表-银邮代理机构用表</Option>
              </Select>
            </Col>
          </Row>


          <Divider orientation="left">执行时间</Divider>
          <Row gutter={[10, 24]} justify="space-between">

            <Col span={16}>
              <Popover content={content} title="注意" trigger="focus">
                <Input placeholder="Cron表达式" prefix={<FieldTimeOutlined />} onChange={this.cronChange} value={this.state.cron} />
              </Popover>
            </Col>
          </Row>



          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={this.state.isenable == '1'}
                onChange={(e) => {
                  console.log('开关状态')
                  console.log(e)
                  this.setState({
                    isenable: e
                  });
                }}
              />
            </Col>
          </Row>


          <Row gutter={[10, 24]} justify="space-between">
            <Col span={12}>
              <Button type="primary" icon={<FileSearchOutlined />} onClick={update} loading={this.state.isUplaod}>
                更新
            </Button>
            </Col>
          </Row>



        </Spin>


      );
    } else {
      return (
        <Result
          status="success"
          title="您已经更新了该任务!"
          subTitle="在查询界面可以查看已经发布的任务"

        />)
    }



  }
}

export default HistoryTimerTaskDetail
