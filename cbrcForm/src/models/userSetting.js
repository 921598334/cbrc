import { notification } from "antd";
import { getOrgRequest } from '../services/orgService'
import { getUserRequest, updateUserRequest } from '../services/userService'

//普通用户的设置
export default {

  namespace: 'normalUserSettingNameSpace',

  state: {


  },

  subscriptions: {


  },

  effects: {





    //查询用户信息
    *getUser({ queryUserInfo }, { call, put }) {

      console.log("*getUser 开始执行")
      console.log(queryUserInfo)


      //检查输入是否合法


      const response = yield call(getUserRequest, queryUserInfo);

      console.log("*getUser 返回为：")
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

        yield put({ type: 'getUserReduce', payload: { ...response } });
        return true;
      }

    },







    *updateUser({ updateUserInfo }, { call, put }) {

      console.log("*updateUser 开始执行")
      console.log(updateUserInfo)

      //检查输入是否合法
      if (updateUserInfo.password == '') {
        notification.error({ message: '密码不能为空！' })
        return false;
      }
      if (updateUserInfo.telphone == '') {
        notification.error({ message: '电话不能为空！' })
        return false;
      }
      if (updateUserInfo.truename == '') {
        notification.error({ message: '真实姓名不能为空！' })
        return false;
      }
      if (updateUserInfo.username == '') {
        notification.error({ message: '用户名不能为空！' })
        return false;
      }

      const response = yield call(updateUserRequest, updateUserInfo);

      console.log("*updateUser 返回为：")
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

        yield put({ type: 'updateUserReduce', payload: { ...response } });
        return true;
      }

    },

  },

  reducers: {






    getUserReduce(state, action) {

      console.log("getUserReduce")
      console.log(action.payload.data)


      const userInfo = action.payload.data[0]

      return { ...state, userInfo: userInfo[0] };
    },


    updateUserReduce(state, action) {

      console.log("updateUserReduce")
      console.log(action.payload.data)
      return { ...state, };
    },




  },

};
