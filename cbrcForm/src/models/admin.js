import { notification } from "antd";
import { loginRequest } from '../services/loginService'
import Axios from 'axios';
import Cookies from 'js-cookie'

export default {

  namespace: 'adminNamespace',

  state: {
    name: ''
  },

  subscriptions: {

  },

  effects: {



    *getCookie({ loginInfo }, { call, put }) {

      yield put({ type: 'getCookieReduce'});
    },

    *exit({ loginInfo }, { call, put }) {

      yield put({ type: 'exitReduce'});
    },



  },

  reducers: {



     //退出登陆
     exitReduce(state, action) {

      console.log("exitReduce开始执行")


      // Cookies.remove('username');
      // Cookies.remove('token');

      console.log("exitReduce结束")
      return { ...state };
    },




    //得到cookie中的信息
    getCookieReduce(state, action) {

      console.log("getCookie开始执行")

      state.username = Cookies.get('username');
      state.token = Cookies.get('token');


      return { ...state };
    },






  },

};
