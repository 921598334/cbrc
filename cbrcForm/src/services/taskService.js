
import Axios from 'axios';







export async function updateRequest(publishInfo) {

  console.log("updateRequest 开始执行")

  var orgTypesTmp = {}

  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  publishInfo.selectedValue.map((item, key) => {
    orgTypesTmp[key] = item
  })

  publishInfo.selectedValue = orgTypesTmp

  console.log(publishInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/update',
    params: {
      ...publishInfo
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}









export async function queryTaskDetailRequest(queryDetailInfo) {

  console.log("queryTaskDetailRequest 开始执行")
  console.log(queryDetailInfo)

  var dataSourceTmp = {}
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/queryTaskDetail',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...queryDetailInfo,

    }
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}







export async function deleteTaskRequest(deleteInfo) {

  console.log("deleteTaskRequest 开始执行")
  console.log(deleteInfo)

  var dataSourceTmp = {}
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/deleteTask',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...deleteInfo,

    }
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}













//管理员查询用户
export async function queryTaskCompleteRequest(queryInfo) {

  console.log("queryTaskCompleteRequest 开始执行")
  console.log(queryInfo)

  var dataSourceTmp = {}
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/queryTaskComplete',
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
    url: 'http://localhost:8080/queryTask',
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






export async function publishRequest(publishInfo) {

  console.log("publishRequest开始执行")

  var orgTypesTmp = {}

  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  publishInfo.selectedValue.map((item, key) => {
    orgTypesTmp[key] = item
  })

  publishInfo.selectedValue = orgTypesTmp

  console.log(publishInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/publish',
    params: {
      ...publishInfo
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}


