import { notification } from "antd";
import { getOrgRequest } from '../../services/orgService'
import { deleteUserInfoRequest,updateUserInfoRequest,initUserInfoRequest,inertUserInfoRequest } from '../../services/adminSetting/userService'



export default {

  namespace: 'userSettingNameSpace',

  state: {


  },

  subscriptions: {


  },

  effects: {





    *deleteUserInfo({ deleteUserInfo }, { call, put }) {

      console.log("*deleteUserInfo 开始执行")

      console.log(deleteUserInfo)

      const response = yield call(deleteUserInfoRequest, deleteUserInfo);

      console.log("*deleteUserInfo")
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

        yield put({ type: 'deleteUserInfoReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initUserInfo' });

        notification.success({ message: '删除成功' })
        return true;
      }

    },





    *updateUserInfo({ updateUserInfo }, { call, put }) {

      console.log("*updateUserInfo 开始执行")

      console.log(updateUserInfo)

      const response = yield call(updateUserInfoRequest, updateUserInfo);

      console.log("*updateUserInfo")
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

        yield put({ type: 'updateUserInfoReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrgInfo' });

        notification.success({ message: '更新成功' })
        return true;
      }

    },








    *inertUserInfo({ insertUserInfo }, { call, put }) {

      console.log("*inertUserInfo 开始执行")

      console.log(insertUserInfo)

      const response = yield call(inertUserInfoRequest, insertUserInfo);

      console.log("*inertUserInfo")
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

        yield put({ type: 'inertUserInfoReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrgInfo' });

        notification.success({ message: '插入成功' })
        return true;
      }

    },







    *initUserInfo({ publishInfo }, { call, put }) {

      console.log("*initUserInfo 开始执行")

      console.log(publishInfo)


      const response = yield call(initUserInfoRequest);

      console.log("*initUserInfo")
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

       
        yield put({ type: 'initUserInfoReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }

    },





  },

  reducers: {

    deleteUserInfoReduce(state, action) {

      console.log("deleteUserInfoReduce")
      console.log(action.payload.data)

      return { ...state };
    },



    updateUserInfoReduce(state, action) {

      console.log("updateUserInfoReduce")
      console.log(action.payload.data)

      return { ...state };
    },




    inertUserInfoReduce(state, action) {

      console.log("inertUserInfoReduce")
      console.log(action.payload.data)
      return { ...state };
    },




    initUserInfoReduce(state, action) {

      console.log("initUserInfoReduce")
      console.log(action.payload.data)


      var userList = action.payload.data[0]
      var orgInfoList = action.payload.data[1]


      //需要添加key，
      for (let index in userList) {
        userList[index]['key'] = userList[index]['userid']
      }

      //需要添加key，
      for (let index in orgInfoList) {
        orgInfoList[index]['key'] = orgInfoList[index]['orgid']
      }



      return {
        ...state,
        orgInfoData: orgInfoList,
        userInfoData:userList

      };
    },





  },


}