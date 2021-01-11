import { notification } from "antd";
import { initOrgRequest, updateOrgRequest, insertOrgRequest, deleteOrgRequest, initOrgInfoRequest, inertOrgInfoRequest, updateOrgInfoRequest, deleteOrgInfoRequest } from '../../services/adminSetting/orgService'


export default {

  namespace: 'orgSettingNameSpace',

  state: {


  },

  subscriptions: {


  },

  effects: {





    *deleteOrgInfo({ deleteOrgInfo }, { call, put }) {

      console.log("*deleteOrgInfo 开始执行")

      console.log(deleteOrgInfo)

      const response = yield call(deleteOrgInfoRequest, deleteOrgInfo);

      console.log("*deleteOrgInfo")
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

        yield put({ type: 'deleteOrgInfoReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrgInfo' });

        notification.success({ message: '删除成功' })
        return true;
      }

    },





    *updateOrgInfo({ updateOrgInfo }, { call, put }) {

      console.log("*updateOrgInfo 开始执行")

      console.log(updateOrgInfo)


      if (updateOrgInfo.updateManager == null) {
        notification.error({ message: '输入的管理人姓名不能为空' })
        return
      }
      var tmp = updateOrgInfo.updateManager.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '输入的管理人姓名不能全为空格' })
        return
      }


      if (updateOrgInfo.updateOrgname == null) {
        notification.error({ message: '输入的机构名称不能为空' })
        return
      }
       tmp = updateOrgInfo.updateOrgname.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '输入的机构名称不能全为空格' })
        return
      }


      if (updateOrgInfo.updateOrgtype == null) {
        notification.error({ message: '请选择机构类型' })
        return
      }








      const response = yield call(updateOrgInfoRequest, updateOrgInfo);

      console.log("*updateOrgInfo")
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

        yield put({ type: 'updateOrgInfoReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrgInfo' });

        notification.success({ message: '更新成功' })
        return true;
      }

    },








    *inertOrgInfo({ insertOrgInfo }, { call, put }) {

      console.log("*inertOrgInfo 开始执行")

      console.log(insertOrgInfo)


      if (insertOrgInfo.newManagerName == null) {
        notification.error({ message: '输入的管理人姓名不能为空' })
        return
      }
      var tmp = insertOrgInfo.newManagerName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '输入的管理人姓名不能全为空格' })
        return
      }


      if (insertOrgInfo.newOrgInfoName == null) {
        notification.error({ message: '输入的机构名称不能为空' })
        return
      }
       tmp = insertOrgInfo.newOrgInfoName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '输入的机构名称不能全为空格' })
        return
      }


      if (insertOrgInfo.newOrgType == null) {
        notification.error({ message: '请选择机构类型' })
        return
      }







      const response = yield call(inertOrgInfoRequest, insertOrgInfo);

      console.log("*inertOrg")
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

        yield put({ type: 'inertOrgInfoReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrgInfo' });

        notification.success({ message: '插入成功' })
        return true;
      }

    },






    *deleteOrg({ deleteInfo }, { call, put }) {

      console.log("*deleteInfo 开始执行")

      console.log(deleteInfo)

      const response = yield call(deleteOrgRequest, deleteInfo);

      console.log("*inertOrg")
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

        yield put({ type: 'deleteOrgReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrg' });

        notification.success({ message: '删除成功' })
        return true;
      }

    },



    *inertOrg({ insertInfo }, { call, put }) {

      console.log("*inertOrg 开始执行")

      console.log(insertInfo)




      if (insertInfo.newOrgName == null) {
        notification.error({ message: '输入的机构类型不能为空' })
        return
      }
      const tmp = insertInfo.newOrgName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '输入的机构类型不能全为空格' })
        return
      }






      const response = yield call(insertOrgRequest, insertInfo);

      console.log("*inertOrg")
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

        yield put({ type: 'inertOrgReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrg' });

        notification.success({ message: '插入成功' })
        return true;
      }

    },




    *initOrgInfo({ publishInfo }, { call, put }) {

      console.log("*initOrgInfo 开始执行")

      console.log(publishInfo)



      const response = yield call(initOrgInfoRequest);

      console.log("*initOrgInfo")
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

        yield put({ type: 'initOrgInfoReduce', payload: { ...response } });
        
        return true;
      }

    },



    //初始化，得到机构的所有信息
    *initOrg({ publishInfo }, { call, put }) {

      console.log("*initOrg 开始执行")

      console.log(publishInfo)

      const response = yield call(initOrgRequest);

      console.log("*initOrg")
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
        // notification.success({ message: '初始化成功' })
        return true;
      }

    },



    *updateOrg({ updateInfo }, { call, put }) {

      console.log("*updateOrg111 开始执行")
      console.log(updateInfo)

      console.log('准备')
      console.log(updateInfo.updateOrgType)
      console.log(updateInfo.updateOrgType==undefined)

      if(updateInfo.updateOrgType==undefined){
        notification.error({ message: '请选择一个机构后再操作' })
        return
      }

      console.log('结束')

      if (updateInfo.updateOrgName == null) {
        notification.error({ message: '输入的机构类型不能为空' })
        return
      }
      const tmp = updateInfo.updateOrgName.replace(/\s*/g, '')
      if (tmp == '') {
        notification.error({ message: '输入的机构类型不能全为空格' })
        return
      }






      const response = yield call(updateOrgRequest, updateInfo);

      console.log("*updateOrg")
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

        yield put({ type: 'updateOrgReduce', payload: { ...response } });

        //重新获取数据
        yield put({ type: 'initOrg' });

        notification.success({ message: '更新成功' })
        return true;
      }

    },





  },

  reducers: {

    deleteOrgInfoReduce(state, action) {

      console.log("deleteOrgInfoReduce")
      console.log(action.payload.data)

      return { ...state };
    },



    updateOrgInfoReduce(state, action) {

      console.log("updateOrgInfoReduce")
      console.log(action.payload.data)

      return { ...state };
    },




    inertOrgInfoReduce(state, action) {

      console.log("inertOrgInfoReduce")
      console.log(action.payload.data)
      return { ...state };
    },






    deleteOrgReduce(state, action) {

      console.log("deleteOrgReduce")
      console.log(action.payload.data)
      return { ...state };
    },




    inertOrgReduce(state, action) {

      console.log("inertOrgReduce")
      console.log(action.payload.data)
      return { ...state };
    },





    initOrgInfoReduce(state, action) {

      console.log("initOrgInfoReduce")
      console.log(action.payload.data)




      //需要添加key，key采用orgtyoe
      for (let index in action.payload.data) {
        action.payload.data[index]['key'] = action.payload.data[index]['orgid']
      }




      return {
        ...state,
        orgInfoData: action.payload.data,

      };
    },







    initReduce(state, action) {

      console.log("initReduce")
      console.log(action.payload.data)



      //需要添加key，key采用orgtyoe
      for (let index in action.payload.data) {
        action.payload.data[index]['key'] = action.payload.data[index]['orgtype']
      }




      return {
        ...state,
        orgData: action.payload.data,

      };
    },





    updateOrgReduce(state, action) {

      console.log("updateOrgReduce")
      console.log(action.payload.data)

      return { ...state };
    },

  },

};
