import { notification } from "antd";
import { getOrgRequest } from '../services/orgService'
import { publishRequest, queryRequest, queryTaskCompleteRequest } from '../services/taskService'
import Axios from 'axios';
import Cookies from 'js-cookie'

export default {

  namespace: 'taskNamespace',

  state: {


  },

  subscriptions: {


  },

  effects: {




    //用户查询自己机构下的任务
    *queryTaskComplete({ queryInfo }, { call, put }) {

      console.log("*queryTaskComplete 开始执行")
      console.log(queryInfo)


      //检查输入是否合法


      const response = yield call(queryTaskCompleteRequest, queryInfo);

      console.log("*queryTaskComplete 返回为：")
      console.log(response)


      //如果出现异常
      if (response.data == undefined) {
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }


      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'queryTaskCompleteReduce', payload: { ...response } });
        return true;
      }

    },





    //管理元查询任务
    *queryTask({ queryInfo }, { call, put }) {

      console.log("*queryTask 开始执行")
      console.log(queryInfo)


      //检查输入是否合法


      const response = yield call(queryRequest, queryInfo);

      console.log("*queryTask 返回为：")
      console.log(response)

      //如果出现异常
      if (response.data == undefined) {
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'queryTaskReduce', payload: { ...response } });
        return true;
      }

    },




    *getOrg({ payload }, { call, put }) {

      console.log("*getOrg开始执行")

      const response = yield call(getOrgRequest);

      console.log("*getOrg返回为：")
      console.log(response)




      //如果出现异常
      if (response.data == undefined) {
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }


      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {

        yield put({ type: 'getOrgReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }
    },


    *publish({ publishInfo }, { call, put }) {

      console.log("*publish开始执行")

      console.log(publishInfo)

      const response = yield call(publishRequest, publishInfo);

      console.log("*publish返回为：")
      console.log(response)

      //如果出现异常
      if (response.data == undefined) {
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }


      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {

        yield put({ type: 'publishReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }

    },


  },

  reducers: {



    queryTaskCompleteReduce(state, action) {

      console.log("queryTaskCompleteReduce")
      console.log(action.payload.data)


      //得到的结果有很多条任务，现在需要把这些任务的
      for (let i in action.payload.data) {
        const taskinfo = action.payload.data[i].taskinfo
        console.log('taskinfo:')
        console.log(taskinfo)

        console.log('action.payload.data[i]:')
        console.log(action.payload.data[i])

        action.payload.data[i]['createtime'] = taskinfo['createtime']
        action.payload.data[i]['enddate'] = taskinfo['enddate']
        action.payload.data[i]['filetype'] = taskinfo['filetype']
        action.payload.data[i]['fromdate'] = taskinfo['fromdate']
        action.payload.data[i]['taskid'] = taskinfo['id']
        action.payload.data[i]['orgtype'] = taskinfo['orgtype']
        action.payload.data[i]['taskdescribe'] = taskinfo['taskdescribe']
        action.payload.data[i]['tasktitle'] = taskinfo['tasktitle']



        if (action.payload.data[i]['iscomplete'] == 0) {
          action.payload.data[i]['taskStatus'] = '待完成'
        } else if (action.payload.data[i]['iscomplete'] == 1) {
          action.payload.data[i]['taskStatus'] = '待审核'
        } else if (action.payload.data[i]['iscomplete'] == 2) {
          action.payload.data[i]['taskStatus'] = '已完成'
        } else if (action.payload.data[i]['iscomplete'] == 3) {
          action.payload.data[i]['taskStatus'] = '被驳回'
        }


      }


      return { ...state, queryData: action.payload.data };
    },


    queryTaskReduce(state, action) {

      console.log("queryTaskReduce")
      console.log(action.payload.data)



      return { ...state, queryData: action.payload.data };
    },





    getOrgReduce(state, action) {

      console.log("getOrgReduce开始执行")

      const orgData = action.payload.data


      var org = []

      for (let index in orgData) {

        var orgTmp = {}

        orgTmp['title'] = orgData[index]['typename'] + ''
        orgTmp['key'] = orgData[index]['orgtype'] + ''
        orgTmp['value'] = orgData[index]['orgtype'] + ''

        const orgChildrens = orgData[index]['orgs']

        var orgChildrenList = []
        for (let childIndex in orgChildrens) {

          var orgChildrenTmp = {}
          orgChildrenTmp['title'] = orgChildrens[childIndex]['orgname'] + ''
          orgChildrenTmp['key'] = orgChildrens[childIndex]['orgid'] + ''
          orgChildrenTmp['value'] = orgChildrens[childIndex]['orgid'] + ''
          orgChildrenList.push(orgChildrenTmp)
        }

        orgTmp['children'] = orgChildrenList

        org.push(orgTmp)
      }

      console.log('org')
      console.log(org)





      return { ...state, treeData: org };
    },


    publishReduce(state, action) {
      return { ...state }
    },


  },

};
