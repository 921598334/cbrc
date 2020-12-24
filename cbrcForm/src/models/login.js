import { notification } from "antd";
import { loginRequest } from '../services/loginService'
import Axios from 'axios';


export default {

  namespace: 'loginNamespace',

  state: {
    name: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {

    *login({ loginInfo }, { call, put }) {  // eslint-disable-line

      console.log("*login开始执行")
      console.log(loginInfo)

      const response = yield call(loginRequest, loginInfo); 
      
      console.log("*login返回为：")
      console.log(response)

      if (response.data) {
        console.log("成功")
        yield put({ type: 'loginReduce', payload: { ...response } });
      } else {
        notification.error({ message: '失败' })
      }



      console.log("*login结束")


    },


  },

  reducers: {


    loginReduce(state, action) {

      console.log("loginReduce开始执行")
      console.log(action)

      return { ...state, ...action.data };
    },


  },

};
