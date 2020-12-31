import request from '../utils/request';
import Axios from 'axios';


export async function uploadRequest(uploadInfo) {

  console.log("uploadRequest开始执行")
  console.log(uploadInfo)

  var dataSourceTmp = {}
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  uploadInfo.dataSource.map((item, key) => {
    dataSourceTmp[key] = item
  })

  


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/upload',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      dataSourceTmp,
      orgName: uploadInfo.orgName,
      managerName: uploadInfo.managerName,
      creator: uploadInfo.creator,
      tel: uploadInfo.tel,
      period: uploadInfo.period,
      fileType:uploadInfo.fileType,
      userid:uploadInfo.userid,
    }
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function getCellRequest() {

  console.log("getCellRequest开始执行")


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/getCellRequest',

  }).then(function (response) {

    return response

  });
}