
import Axios from 'axios';




export async function getOrgTypeRequest() {

  console.log("getOrgTypeRequest 开始执行")
  
 
  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/getOrgType',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}





export async function collectqQueryRequest(queryInfo) {

  console.log("collectqQueryRequest 开始执行")
  console.log(queryInfo)

  
 
  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/collectqQuery',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {
      ...queryInfo,
    }
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function collectDownloadRequest(queryInfo) {

  console.log("collectDownloadRequest开始执行")
  console.log(queryInfo)

  let collectTmp = {}
  //queryInfo的collect需要转换为对象，而不是list
  queryInfo.collect.map((item, key) => {
    collectTmp[key] = item
  })

  queryInfo.collect = collectTmp


 
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

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
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

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
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

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}


