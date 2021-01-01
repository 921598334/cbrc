import { notification } from "antd";
import { getOrgRequest ,publishRequest} from '../services/orgService'
import Axios from 'axios';
import Cookies from 'js-cookie'

export default {

  namespace: 'taskNamespace',

  state: {


  },

  subscriptions: {


  },

  effects: {


    *getOrg({ payload }, { call, put }) {

      console.log("*getOrg开始执行")

      const response = yield call(getOrgRequest);

      console.log("*getOrg返回为：")
      console.log(response)

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {

        yield put({ type: 'getOrgReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }
    },


    *publish( {publishInfo} , { call, put }) {

      console.log("*publish开始执行")

      console.log(publishInfo)

      const response = yield call(publishRequest,publishInfo);

      console.log("*publish返回为：")
      console.log(response)

      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {

        yield put({ type: 'publishReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }

    },


  },

  reducers: {

    
    getOrgReduce(state, action) {

      console.log("getOrgReduce开始执行")

      const orgData = action.payload.data


      var org = []

      for (let index in orgData) {
        
        var orgTmp = {}

        orgTmp['title'] = orgData[index]['typename']+''
        orgTmp['key'] = orgData[index]['orgtype']+''
        orgTmp['value'] = orgData[index]['orgtype']+''

        const orgChildrens = orgData[index]['orgs']
        
        var orgChildrenList = []
        for(let childIndex in orgChildrens){
         
          var orgChildrenTmp = {}
          orgChildrenTmp['title'] = orgChildrens[childIndex]['orgname']+''
          orgChildrenTmp['key'] = orgChildrens[childIndex]['orgid']+''
          orgChildrenTmp['value'] = orgChildrens[childIndex]['orgid']+''
          orgChildrenList.push(orgChildrenTmp)
        }

        orgTmp['children'] = orgChildrenList

        org.push(orgTmp)
      }

      console.log('org')
      console.log(org)

    



      return { ...state, treeData: org };
    },


    publishReduce(state, action) {
        return {...state}
    },


  },

};
