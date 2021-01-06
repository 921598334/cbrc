import { notification } from "antd";
import { getOrgRequest } from '../services/orgService'
import { initRequest } from '../services/adminService'


export default {

  namespace: 'adminSettingNameSpace',

  state: {


  },

  subscriptions: {


  },

  effects: {


    //初始化，得到机构的所有信息
    *init({ publishInfo }, { call, put }) {

      console.log("*init 开始执行")

      console.log(publishInfo)

      const response = yield call(initRequest, publishInfo);

      console.log("*init")
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

        yield put({ type: 'initReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }

    },




   


  },

  reducers: {


    initReduce(state, action) {

      console.log("initReduce")
      console.log(action.payload.data)

      return { ...state };
    },


  

  },

};
