
import Axios from 'axios';






export async function deleteOrgInfoRequest(deleteOrgInfo) {

  console.log("deleteOrgInfoRequest 开始执行")


  console.log(deleteOrgInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/deleteOrgInfo',
    params: {
      orgid: deleteOrgInfo['orgid'],

    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}







export async function updateOrgInfoRequest(updateOrgInfo) {

  console.log("updateOrgInfoRequest 开始执行")


  console.log(updateOrgInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/updateOrgInfo',
    //url: 'http://localhost:8080/updateUserInfo',

    params: {
      updateManager: updateOrgInfo['updateManager'],
      updateOrgTypeName: updateOrgInfo['updateOrgTypeName'],
      updateOrgid: updateOrgInfo['updateOrgid'],
      updateOrgname: updateOrgInfo['updateOrgname'],
      updateOrgtype: updateOrgInfo['updateOrgtype'],
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function inertOrgInfoRequest(insertOrgInfo) {

  console.log("inertOrgInfoRequest 开始执行")


  console.log(insertOrgInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/insertOrgInfo',
    params: {

      newManagerName: insertOrgInfo['newManagerName'],
      newOrgInfoName: insertOrgInfo['newOrgInfoName'],
      newOrgType: insertOrgInfo['newOrgType'],
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function deleteOrgRequest(deleteInfo) {

  console.log("deleteOrgRequest 开始执行")


  console.log(deleteInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/deleteOrg',
    params: {

      id: deleteInfo['orgtype'],
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}






export async function initOrgInfoRequest() {

  console.log("initOrgInfoRequest 开始执行")



  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/initOrgInfo',
    params: {

    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}








export async function insertOrgRequest(insertInfo) {

  console.log("insertOrgRequest 开始执行")


  console.log(insertInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/insertOrg',
    params: {

      orgName: insertInfo['newOrgName'],
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function updateOrgRequest(updateInfo) {

  console.log("updateOrgRequest 开始执行")


  console.log(updateInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/updateOrg',
    params: {
      udateOrgType: updateInfo['updateOrgType'][0],
      udateOrgName: updateInfo['updateOrgName'],
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function initOrgRequest() {

  console.log("initOrgRequest 开始执行")



  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/initOrg',
    params: {

    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}



