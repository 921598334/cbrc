import request from '../utils/request';
import Axios from 'axios';






export async function getOrgRequest() {

  console.log("getCellRequest开始执行")


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/getOrg',

  }).then(function (response) {

    return response

  });
}



export async function publishRequest(publishInfo) {

  console.log("publishRequest开始执行")

  var orgTypesTmp = {}
   //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
   publishInfo.orgTypes.map((item, key) => {
    orgTypesTmp[key] = item
  })

  publishInfo.orgTypes = orgTypesTmp

  console.log(publishInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/publish',
    params: {
      ...publishInfo
    }

  }).then(function (response) {

    return response

  });
}


