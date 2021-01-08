
import Axios from 'axios';

import {myUrl} from './ip'




export async function handlePassRequest(passInfo) {

  console.log("handlePassRequest 开始执行")
  
 
  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'handlePass',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {
      ...passInfo,
    }
    
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}






export async function handleRefuseRequest(refuseInfo) {

  console.log("handleRefuseRequest 开始执行")
  
 
  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'handleRefuse',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {
      ...refuseInfo,
    }
    
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}
















export async function getOrgTypeRequest() {

  console.log("getOrgTypeRequest 开始执行")
  
 
  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'getOrgType',
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
    url: myUrl.localUrl+'collectqQuery',
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
    url: myUrl.localUrl+'collectDownload',
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

  
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })

 
  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'query',
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


  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })

 
  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'download',
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


