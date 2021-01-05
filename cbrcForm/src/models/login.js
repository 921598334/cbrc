import { notification } from "antd";
import { loginRequest } from '../services/loginService'

import Cookies from 'js-cookie'

export default {

  namespace: 'loginNamespace',

  state: {
    name: ''
  },

  subscriptions: {
    //检查是否用户登陆的是主页，如果不是主页需要判断当前用户的cookie是否存在用户信息
    check({ dispatch, history }) {
      console.info("subscriptions开始执行")
      history.listen(({ pathname }) => {
        if (pathname != '/') {
          console.info("用户进入的不是主页,而是:" + pathname)

          //检查cookie是否存在，存在就设置用户信息，并且允许用户访问
          const token = Cookies.get('token')

          if(token===undefined || token ===null){
            notification.info({message:'当前用户没有登陆，请登陆！'})
            history.push('/')  
          }else{
            //判断用户是否有访问权限
            const orgid = Cookies.get('orgid')
  
            if(orgid.indexOf("10-") == -1){
              //不是管理员，那判断其访问的是否为管理员也
              if(pathname.indexOf('admin')!=-1){
                notification.info({message:"当前用户没有访问管理员界面的权限"})
                history.push('/user')  
              }

            }
          }


          console.info("用户cookie存在：" + Cookies.get('token'))

        } 

      })
    },
  },

  effects: {

    *login({ loginInfo }, { call, put }) {

      console.log("*login开始执行")
      console.log(loginInfo)

      notification.info({message:'登陆中，请等待.....'})

      const response = yield call(loginRequest, loginInfo);

      console.log("*login返回为：")
      console.log(response.data)

      //如果出现异常
      if(response.data == undefined){
        
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }

      //如果后端返回错误信息
      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '登陆成功页面跳转中.....' })
        yield put({ type: 'loginReduce', payload: { ...response } });
        return true;
      }


    },



  },

  reducers: {


    loginReduce(state, action) {

      console.log("loginReduce开始执行")
      
      var userinfo = action.payload.data

      //把用户的信息写入cooki中
      Cookies.set('userid', userinfo.userid, { expires: 7 });
      Cookies.set('username', userinfo.username, { expires: 7 });
      Cookies.set('truename', userinfo.truename, { expires: 7 });
      Cookies.set('telphone', userinfo.telphone, { expires: 7 });
      Cookies.set('token', userinfo.token, { expires: 7 });
      Cookies.set('userinfo', userinfo, { expires: 7 });
      Cookies.set('orgid', userinfo.orgid, { expires: 7 });
      
      

      return { ...state, ...action.payload.data };
    },

   






  },

};
