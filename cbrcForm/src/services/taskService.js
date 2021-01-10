
import Axios from 'axios';
import {myUrl} from './ip'






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
    url: myUrl.localUrl+'update',
    params: {
      ...publishInfo,
      filetype:publishInfo.fileType
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}



export async function updateTimeTaskRequest(publishTimerTaskInfo) {

  console.log("updateTimeTaskRequest 开始执行")

  var orgTypesTmp = {}

  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  publishTimerTaskInfo.selectedValue.map((item, key) => {
    orgTypesTmp[key] = item
  })

  publishTimerTaskInfo.selectedValue = orgTypesTmp

  console.log(publishTimerTaskInfo)


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'updateTimerTask',
    params: {
      ...publishTimerTaskInfo
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

  
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'queryTaskDetail',
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







export async function queryCompletedOrgRequest(queryCompletedOrgInfo) {

  console.log("queryCompletedOrgRequest 开始执行")
  console.log(queryCompletedOrgInfo)

  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'queryCompletedOrg',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {
      ...queryCompletedOrgInfo,
    }
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function queryTimerTaskDetailRequest(queryTimerTaskDetailInfo) {

  console.log("queryTimerTaskDetailRequest 开始执行")
  console.log(queryTimerTaskDetailInfo)

 

  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'queryTimerTaskDetail',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...queryTimerTaskDetailInfo,

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

  
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'deleteTask',
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





export async function deleteTimerTaskRequest(deleteTimerInfo) {

  console.log("deleteTimerTaskRequest 开始执行")
  console.log(deleteTimerInfo)

  
  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'deleteTimerTask',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...deleteTimerInfo,

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

  
  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  // uploadInfo.dataSource.map((item, key) => {
  //   dataSourceTmp[key] = item
  // })


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'queryTaskComplete',
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
    url: myUrl.localUrl+'queryTask',
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







export async function queryTimerTaskRequest(queryTimerInfo) {

  console.log("queryTimerTaskRequest 开始执行")
  console.log(queryTimerInfo)

  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'queryTimerTask',
    headers: {
      'Accept': 'application/json,text/plain,*/*'
    },
    params: {

      ...queryTimerInfo,

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
    url: myUrl.localUrl+'publish',
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





export async function publishTimerTaskRequest(publishInfo) {

  console.log("publishTimerTaskRequest 开始执行")

  var orgTypesTmp = {}

  //把list变为map,不知道为什么，如果不这样操作会出现跨域异常
  publishInfo.selectedValue.map((item, key) => {
    orgTypesTmp[key] = item
  })

  publishInfo.selectedValue = orgTypesTmp

  console.log(publishInfo)


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'publishTimerTask',
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
