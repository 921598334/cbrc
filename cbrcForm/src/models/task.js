import { notification } from "antd";
import { getOrgRequest } from '../services/orgService'
import { publishRequest, queryRequest, queryTaskCompleteRequest, deleteTaskRequest, queryTaskDetailRequest, updateRequest, publishTimerTaskRequest, queryTimerTaskRequest, deleteTimerTaskRequest, queryTimerTaskDetailRequest, updateTimeTaskRequest, queryCompletedOrgRequest } from '../services/taskService'


export default {

  namespace: 'taskNamespace',

  state: {


  },

  subscriptions: {


  },

  effects: {




    *publishTimerTask({ publishInfo }, { call, put }) {

      console.log("*publishTimerTask 开始执行")

      console.log(publishInfo)

      //去除前后空格
      var title = publishInfo['taskTitle'].replace(/\s*/g, '')

      if (title === '') {
        notification.error({ message: '标题不能全为空格' })
        return false
      }

      if (title === null) {
        notification.error({ message: '请输入标题' })
        return false
      }


      var taskDescribe = publishInfo['taskDescribe'].replace(/\s*/g, '')

      if (taskDescribe === '') {
        notification.error({ message: '描述不能全为空格' })
        return false
      }

      if (taskDescribe === null) {
        notification.error({ message: '请输入描述' })
        return false
      }


      var selectedValue = publishInfo['selectedValue']
      if (selectedValue.length == 0) {
        notification.error({ message: '请选择要推送的机构' })
        return false
      }

      var cron = publishInfo['cron']

      if (cron === '') {
        notification.error({ message: 'cron表达式不能为空' })
        return false
      }




      const response = yield call(publishTimerTaskRequest, publishInfo);

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

        yield put({ type: 'publishTimerTaskReduce', payload: { ...response } });
        notification.success({ message: '任务发布成功' })
        return true;
      }

    },

    //查询定时任务
    *queryTimerTask({ queryTimerInfo }, { call, put }) {

      console.log("*queryTimerTask 开始执行")
      console.log(queryTimerInfo)


      //检查输入是否合法


      const response = yield call(queryTimerTaskRequest, queryTimerInfo);

      console.log("*queryTimerTask 返回为：")
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
        //notification.success({ message: '任务列表获取成功' })
        yield put({ type: 'queryTimerTaskReduce', payload: { ...response } });
        return true;
      }

    },



    //删除任务
    *deleteTimerTask({ deleteTimerInfo }, { call, put }) {

      console.log("*deleteTask 开始执行")
      console.log(deleteTimerInfo)


      //检查输入是否合法


      const response = yield call(deleteTimerTaskRequest, deleteTimerInfo);

      console.log("*deleteTask 返回为：")
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
        notification.success({ message: '任务删除成功' })
        yield put({ type: 'deleteTimerTaskReduce', payload: { ...response } });
        return true;
      }

    },






    //任务更新
    *update({ publishInfo }, { call, put }) {

      console.log("*update 开始执行")

      console.log(publishInfo)



      //去除前后空格
      var title = publishInfo['tasktitle'].replace(/\s*/g, '')

      if (title === '') {
        notification.error({ message: '标题不能全为空格' })
        return false
      }

      if (title === null) {
        notification.error({ message: '请输入标题' })
        return false
      }


      var taskDescribe = publishInfo['taskDescribe'].replace(/\s*/g, '')

      if (taskDescribe === '') {
        notification.error({ message: '描述不能全为空格' })
        return false
      }

      if (taskDescribe === null) {
        notification.error({ message: '请输入描述' })
        return false
      }


      var selectedValue = publishInfo['selectedValue']
      if (selectedValue.length == 0) {
        notification.error({ message: '请选择要推送的机构' })
        return false
      }


      var period = publishInfo['period']
      if (period == '1') {
        notification.error({ message: '请选择季度' })
        return false
      }




      const response = yield call(updateRequest, publishInfo);

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

        yield put({ type: 'updateReduce', payload: { ...response } });
        //notification.success({ message: '初始化成功' })
        return true;
      }

    },




    // 定时任务更新
    *updateTimerTask({ publishTimerTaskInfo }, { call, put }) {

      console.log("*updateTimerTask 开始执行")

      console.log(publishTimerTaskInfo)


      //去除前后空格
      var title = publishTimerTaskInfo['tasktitle'].replace(/\s*/g, '')

      if (title === '') {
        notification.error({ message: '标题不能全为空格' })
        return false
      }

      if (title === null) {
        notification.error({ message: '请输入标题' })
        return false
      }


      var taskDescribe = publishTimerTaskInfo['taskDescribe'].replace(/\s*/g, '')

      if (taskDescribe === '') {
        notification.error({ message: '描述不能全为空格' })
        return false
      }

      if (taskDescribe === null) {
        notification.error({ message: '请输入描述' })
        return false
      }


      var selectedValue = publishTimerTaskInfo['selectedValue']
      if (selectedValue.length == 0) {
        notification.error({ message: '请选择要推送的机构' })
        return false
      }


      var cron = publishTimerTaskInfo['cron']

      if (cron === '') {
        notification.error({ message: 'cron表达式不能为空' })
        return false
      }






      const response = yield call(updateTimeTaskRequest, publishTimerTaskInfo);

      console.log("*updateTimerTask 返回为：")
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

        yield put({ type: 'updateTimerTaskReduce', payload: { ...response } });
        //notification.success({ message: '初始化成功' })
        return true;
      }

    },




    //删除任务
    *deleteTask({ deleteInfo }, { call, put }) {

      console.log("*deleteTask 开始执行")
      console.log(deleteInfo)


      //检查输入是否合法


      const response = yield call(deleteTaskRequest, deleteInfo);

      console.log("*deleteTask 返回为：")
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
        notification.success({ message: '任务删除成功' })
        yield put({ type: 'deleteTaskReduce', payload: { ...response } });
        return true;
      }

    },







    //查询任务
    *queryTaskDetail({ queryDetailInfo }, { call, put }) {

      console.log("*queryTaskDetail 开始执行")
      console.log(queryDetailInfo)


      //检查输入是否合法


      const response = yield call(queryTaskDetailRequest, queryDetailInfo);

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
        //notification.success({ message: '任务查询成功' })
        yield put({ type: 'queryTaskDetailReduce', payload: { ...response } });
        return true;
      }

    },




    //查询已经完成的任务，某个机构下
    *queryCompletedOrg({ queryCompletedOrgInfo }, { call, put }) {

      console.log("*queryCompletedOrg 开始执行")
      console.log(queryCompletedOrgInfo)


      //检查输入是否合法


      const response = yield call(queryCompletedOrgRequest, queryCompletedOrgInfo);

      console.log("*queryCompletedOrg 返回为：")
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
        //notification.success({ message: '任务查询成功' })
        yield put({ type: 'queryCompletedOrgReduce', payload: { ...response } });
        return true;
      }

    },






    *queryTimerTaskDetail({ queryTimerTaskDetailInfo }, { call, put }) {

      console.log("*queryTaskDetail 开始执行")
      console.log(queryTimerTaskDetailInfo)


      //检查输入是否合法


      const response = yield call(queryTimerTaskDetailRequest, queryTimerTaskDetailInfo);

      console.log("*queryTimerTaskDetail 返回为：")
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
        //notification.success({ message: '任务查询成功' })
        yield put({ type: 'queryTimerTaskDetailReduce', payload: { ...response } });
        return true;
      }

    },










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
        //notification.success({ message: '任务查询成功' })
        yield put({ type: 'queryTaskCompleteReduce', payload: { ...response } });
        return true;
      }

    },





    //管理元查询任务列表
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
        //notification.success({ message: '任务列表获取成功' })
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
        //notification.success({ message: '初始化成功' })
        return true;
      }
    },


    *publish({ publishInfo }, { call, put }) {

      console.log("*publish开始执行")

      console.log(publishInfo)



      //去除前后空格
      var title = publishInfo['taskTitle'].replace(/\s*/g, '')

      if (title === '') {
        notification.error({ message: '标题不能全为空格' })
        return false
      }

      if (title === null) {
        notification.error({ message: '请输入标题' })
        return false
      }


      var taskDescribe = publishInfo['taskDescribe'].replace(/\s*/g, '')

      if (taskDescribe === '') {
        notification.error({ message: '描述不能全为空格' })
        return false
      }

      if (taskDescribe === null) {
        notification.error({ message: '请输入描述' })
        return false
      }


      var selectedValue = publishInfo['selectedValue']
      if (selectedValue.length == 0) {
        notification.error({ message: '请选择要推送的机构' })
        return false
      }


      var period = publishInfo['period']
      if (period == '1') {
        notification.error({ message: '请选择季度' })
        return false
      }




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
        notification.success({ message: '任务发布成功' })
        return true;
      }

    },


  },

  reducers: {


    updateReduce(state, action) {

      console.log("deleteTaskReduce")
      console.log(action.payload.data)

      return { ...state };
    },




    updateTimerTaskReduce(state, action) {

      console.log("updateTimerTaskReduce")
      console.log(action.payload.data)

      return { ...state };
    },


    deleteTaskReduce(state, action) {

      console.log("deleteTaskReduce")
      console.log(action.payload.data)

      return { ...state };
    },



    deleteTimerTaskReduce(state, action) {

      console.log("deleteTimerTaskReduce")
      console.log(action.payload.data)

      return { ...state };
    },



    queryTaskDetailReduce(state, action) {

      console.log("queryTaskDetailReduce")
      console.log(action.payload.data)

      const orgtypeTmp = JSON.parse(action.payload.data.orgtype)

      action.payload.data.orgtype = orgtypeTmp



      return { ...state, taskDetail: action.payload.data };
    },


    queryCompletedOrgReduce(state, action) {

      console.log("queryCompletedOrgReduce")
      console.log(action.payload.data)

      return { ...state, completedOrg: action.payload.data };
    },



    queryTaskCompleteReduce(state, action) {

      console.log("queryTaskCompleteReduce")
      console.log(action.payload.data)


      //得到的结果有很多条任务，现在需要把这些任务的
      for (let i in action.payload.data) {
        const taskinfo = action.payload.data[i].taskinfo
        // console.log('taskinfo:')
        // console.log(taskinfo)

        // console.log('action.payload.data[i]:')
        // console.log(action.payload.data[i])

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





    queryTimerTaskDetailReduce(state, action) {

      console.log("queryTimerTaskDetailReduce")
      console.log(action.payload.data)


      const orgtypeTmp = JSON.parse(action.payload.data.orgtype)

      action.payload.data.orgtype = orgtypeTmp



      return { ...state, queryTimerTaskDetailData: action.payload.data };
    },



    queryTimerTaskReduce(state, action) {

      console.log("queryTimerTaskReduce")
      console.log(action.payload.data)

      return { ...state, queryTImerTaskData: action.payload.data };
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

        //如果该机构类型下面没有子机构，就不把他进行展示
        if (orgChildrens == null || orgChildrens.length == 0) {
          continue;
        }

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



    publishTimerTaskReduce(state, action) {
      return { ...state }
    },

  },

};
