import { notification } from "antd";
import { queryRequest, downloadRequest, collectDownloadRequest,getOrgTypeRequest,collectqQueryRequest,handlePassRequest,handleRefuseRequest } from '../services/queryServiceAndDownload'



export default {

  namespace: 'queryNamespace',

  state: {
    downloadLink: 'null',

  },

  subscriptions: {

  },

  effects: {


    *handlePass({ passInfo }, { call, put }) {

      console.log("*handlePass 开始执行")
      console.log(passInfo)


      //检查输入是否合法


      const response = yield call(handlePassRequest, passInfo);

      console.log("*handlePass 返回为：")
      console.log(response)


       //如果出现异常
       if(response.data == undefined){
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }



      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'handlePassReduce', payload: { ...response } });
        return true;
      }

    },



    *handleRefuse({ refuseInfo }, { call, put }) {

      console.log("*handleRefuse 开始执行")
      console.log(refuseInfo)


      //检查输入是否合法


      const response = yield call(handleRefuseRequest, refuseInfo);

      console.log("*handleRefuse 返回为：")
      console.log(response)


       //如果出现异常
       if(response.data == undefined){
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }



      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'handleRefuseReduce', payload: { ...response } });
        return true;
      }

    },






    //汇总查询    
    *collectqQuery({ queryInfo }, { call, put }) {

      console.log("*collectqQuery 开始执行")
      console.log(queryInfo)


      //检查输入是否合法


      const response = yield call(collectqQueryRequest, queryInfo);

      console.log("*collectqQuery 返回为：")
      console.log(response)


       //如果出现异常
       if(response.data == undefined){
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }



      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'collectqQueryReduce', payload: { ...response } });
        return true;
      }

    },







    *getOrgType({ queryInfo }, { call, put }) {

      console.log("*getOrgType 开始执行")
      

      const response = yield call(getOrgTypeRequest);

      console.log("*getOrgType 返回为：")
      console.log(response)


       //如果出现异常
       if(response.data == undefined){
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'getOrgTypeReduce', payload: { ...response } });
        return true;
      }
    },





    //汇总下载
    *collectDownload({ queryInfo }, { call, put }) {

      console.log("*collectDownload 开始执行")
      console.log(queryInfo)


      //检查输入是否合法

      notification.info({ message: '正在获取数据，请等待....' })
      const response = yield call(collectDownloadRequest, queryInfo);

      console.log("*collectDownload 返回为：")
      console.log(response)


       //如果出现异常
       if(response.data == undefined){
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }



      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'downloadReduce', payload: { ...response } });
        return true;
      }

    },



    //管理员查询用户上传的任务
    *query({ queryInfo }, { call, put }) {

      console.log("*query开始执行")
      console.log(queryInfo)


      //检查输入是否合法



      const response = yield call(queryRequest, queryInfo);

      console.log("*query返回为：")
      console.log(response)

       //如果出现异常
       if(response.data == undefined){
      
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }


      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'queryReduce', payload: { ...response } });
        return true;
      }

    },

    //下载单个文件
    *download({ downloadInfo }, { call, put }) {

      console.log("*download开始执行")
      console.log(downloadInfo)


      //检查输入是否合法
      notification.info({ message: '正在获取数据，请等待....' })
      const response = yield call(downloadRequest, downloadInfo);

      console.log("*download返回为：")
      console.log(response)


       //如果出现异常
       if(response.data == undefined){
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }


      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '正在下载成功' })
        yield put({ type: 'downloadReduce', payload: { ...response } });
        return true;
      }

    },






  },

  reducers: {


    collectqQueryReduce(state, action) {

      console.log("collectqQueryReduce 开始执行")
      console.log(action.payload.data)

      return { ...state, collectqQuery: action.payload.data };
    },





    getOrgTypeReduce(state, action) {
      console.log("getOrgTypeReduce 开始执行")
      console.log(action.payload.data)

      return { ...state, orgList: action.payload.data };
    },





    queryReduce(state, action) {

      console.log("queryReduce开始执行")
      console.log(action.payload.data)

      return { ...state, queryData: action.payload.data };
    },


    downloadReduce(state, action) {

      console.log("downloadReduce开始执行")
      console.log(action.payload)

    
      state.downloadLink = action.payload.data

      return { ...state };
    },


  },

};
