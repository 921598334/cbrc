import { notification } from "antd";

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


      if(updateUserInfo.updateUserId==undefined){
        notification.error({ message: '请选择一个用户后再操作' })
        return
      }



      if (updateUserInfo.updateUserName == null) {
        notification.error({ message: '用户名不能为空' })
        return
      }
      var tmp = updateUserInfo.updateUserName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '用户名不能全为空格' })
        return
      }


      if (updateUserInfo.updateTrueName == null) {
        notification.error({ message: '真实姓名不能为空' })
        return
      }
       tmp = updateUserInfo.updateTrueName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '真实姓名不能全为空格' })
        return
      }


      if (updateUserInfo.updateTelphone == null) {
        notification.error({ message: '电话不能为空' })
        return
      }
       tmp = updateUserInfo.updateTelphone.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '电话不能全为空格' })
        return
      }

      if (updateUserInfo.updatePassword == null) {
        notification.error({ message: '密码不能为空' })
        return
      }
       tmp = updateUserInfo.updatePassword.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '密码不能全为空格' })
        return
      }



      if (updateUserInfo.updateOrgType == null) {
        notification.error({ message: '请选择机构类型' })
        return
      }





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
        yield put({ type: 'initUserInfo' });

        notification.success({ message: '更新成功' })
        return true;
      }

    },








    *inertUserInfo({ insertUserInfo }, { call, put }) {

      console.log("*inertUserInfo 开始执行")

      console.log(insertUserInfo)



      if (insertUserInfo.newUserName == null) {
        notification.error({ message: '用户名不能为空' })
        return
      }
      var tmp = insertUserInfo.newUserName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '用户名不能全为空格' })
        return
      }


      if (insertUserInfo.newTrueUserName == null) {
        notification.error({ message: '真实姓名不能为空' })
        return
      }
       tmp = insertUserInfo.newTrueUserName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '真实姓名不能全为空格' })
        return
      }


      if (insertUserInfo.newTel == null) {
        notification.error({ message: '电话不能为空' })
        return
      }
       tmp = insertUserInfo.newTel.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '电话不能全为空格' })
        return
      }

      if (insertUserInfo.newPassword == null) {
        notification.error({ message: '密码不能为空' })
        return
      }
       tmp = insertUserInfo.newPassword.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '密码不能全为空格' })
        return
      }



      if (insertUserInfo.newOrgType == null) {
        notification.error({ message: '请选择机构类型' })
        return
      }




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
         yield put({ type: 'initUserInfo' });


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
        // notification.success({ message: '初始化成功' })
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