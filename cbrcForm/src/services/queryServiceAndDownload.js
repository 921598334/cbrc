import request from '../utils/request';
import Axios from 'axios';







export async function collectDownloadRequest(queryInfo) {

  console.log("collectDownloadRequest开始执行")
  console.log(queryInfo)

  
 
  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/collectDownload',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {
      ...queryInfo,
    }
  }).then(function (response) {

    return response

  });
}





export async function queryRequest(queryInfo) {

  console.log("queryRequest开始执行")
  console.log(queryInfo)

  var dataSourceTmp = {}
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })

 
  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/query',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...queryInfo,
    
    }
  }).then(function (response) {

    return response

  });
}








export async function downloadRequest(downloadInfo) {

  console.log("downloadRequest开始执行")
  console.log(downloadInfo)

  var dataSourceTmp = {}
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })

 
  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/download',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...downloadInfo,
    
    }
  }).then(function (response) {

    return response

  });
}


