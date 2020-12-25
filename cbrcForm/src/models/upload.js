import { notification } from "antd";
import { loginRequest } from '../services/loginService'
import Axios from 'axios';


export default {

  namespace: 'uploadNamespace',

  state: {
    name: ''
  },

  subscriptions: {
    //检查是否用户登陆的是主页，如果不是主页需要判断当前用户的cookie是否存在用户信息
    // check({ dispatch, history }) { 
    //   console.info("subscriptions开始执行")
    //   history.listen(({pathname})=>{
    //     if(pathname!='/'){
    //       console.info("用户进入的不是主页,而是:"+pathname)

    //       //检查cookie是否存在，存在就设置用户信息，并且允许用户访问

    //       //如果不存在，就重定向到登陆页面

    //     }else{
    //       console.info("用户进入主页:"+pathname)

    //     }
        
    //   })
    // },
  },

  effects: {

    *upload({ loginInfo }, { call, put }) {  

      console.log("*upload开始执行")
      console.log(loginInfo)

      const response = yield call(loginRequest, loginInfo); 
      
      console.log("*login返回为：")
      console.log(response)

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '登陆成功页面跳转中.....' })
        yield put({ type: 'uploadReduce', payload: { ...response } });
        return true;
      }



    },


  },

  reducers: {


    uploadReduce(state, action) {

      console.log("uploadReduce开始执行")
      console.log(action.payload.data)

      return { ...state, ...action.data };
    },


  },

};
