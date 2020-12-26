import { notification } from "antd";
import { uploadRequest, getCellRequest } from '../services/uploadService'
import Axios from 'axios';


export default {

  namespace: 'uploadNamespace',

  state: {
    table1Struct: 'null',
    table2Struct: 'null',
    table3Struct: 'null',
    table4Struct: 'null',
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

    *getCell({ payload }, { call, put }) {

      console.log("*getCell开始执行")

      const response = yield call(getCellRequest);

      console.log("*getCell返回为：")
      console.log(response)

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        
        yield put({ type: 'getCellReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }

    },



    *upload({ uploadInfo }, { call, put }) {

      console.log("*upload开始执行")
      console.log(uploadInfo)


      //检查输入是否合法
      for (let index in uploadInfo.dataSource) {

        //console.log(uploadInfo[index])

        //去除前后空格
        //const amount = uploadInfo.dataSource[index]['amount'].replace(/\s*/g, '')
         

        // if(amount==='请输入'){
        //   notification.error({message:'请输入 '+uploadInfo[index]['cellname']+' 的金额'})
        //   return false
        // }

        // if(amount===''){
        //   notification.error({message:'请输入 '+uploadInfo[index]['cellname']+' 的金额'})
        //   return false
        // }

        // if(amount===null){
        //   notification.error({message:'请输入 '+uploadInfo[index]['cellname']+' 的金额'})
        //   return false
        // }

        // if( Number.isNaN(Number(amount)) ) {
        //   notification.error({message:uploadInfo[index]['cellname']+' 需要输入数字'})
        //   return false
        // }

      }

     

      const response = yield call(uploadRequest, uploadInfo);

      console.log("*upload返回为：")
      console.log(response)

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据上传成功' })
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


    getCellReduce(state, action) {

      console.log("getCellReduce开始执行")

      //根据repid把数据才分为响应的表
      const table1Struct = []
      const table2Struct = []
      const table3Struct = []
      const table4Struct = []

      action.payload.data.map((key) =>{
        
        if(key['repid']==1){
          table1Struct.push(key)
        }else if(key['repid']==2){
          table2Struct.push(key)
        }else if(key['repid']==3){
          table3Struct.push(key)
        }else if(key['repid']==4){
          table4Struct.push(key)
        }else{
          console.log('没有找到repid')
          console.log(key)
        }
      })
    
      //console.log(table1Struct)

      //console.log(action.payload.data)

      state.table1Struct = table1Struct
      state.table2Struct = table2Struct
      state.table3Struct = table3Struct
      state.table4Struct = table4Struct

      return { ...state, };
    },



  },

};
