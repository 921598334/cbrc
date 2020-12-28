import { notification } from "antd";
import { queryRequest,downloadRequest,collectDownloadRequest } from '../services/queryServiceAndDownload'
import Axios from 'axios';


export default {

  namespace: 'queryNamespace',

  state: {
    downloadLink: 'null',

  },

  subscriptions: {
   
  },

  effects: {

 

    //汇总下载
    *collectDownload({ queryInfo }, { call, put }) {

      console.log("*collectDownload开始执行")
      console.log(queryInfo)


      //检查输入是否合法
      

      const response = yield call(collectDownloadRequest, queryInfo);

      console.log("*query返回为：")
      console.log(response)

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据查询成功' })
        yield put({ type: 'downloadReduce', payload: { ...response } });
        return true;
      }

    },




    *query({ queryInfo }, { call, put }) {

      console.log("*query开始执行")
      console.log(queryInfo)


      //检查输入是否合法
      
     

      const response = yield call(queryRequest, queryInfo);

      console.log("*query返回为：")
      console.log(response)

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
    
      const response = yield call(downloadRequest, downloadInfo.id);

      console.log("*download返回为：")
      console.log(response)

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


    
    // collectDownloadReduce(state, action) {

    //   console.log("collectDownloadReduce开始执行")
    //   console.log(action.payload.data)

    //   return { ...state, queryData:action.payload.data };
    // },


    queryReduce(state, action) {

      console.log("queryReduce开始执行")
      console.log(action.payload.data)

      return { ...state, queryData:action.payload.data };
    },


    downloadReduce(state, action) {

      console.log("downloadReduce开始执行")
      console.log(action.payload.data)
      state.downloadLink = action.payload.data

      return { ...state };
    },

   
    

  },

};
