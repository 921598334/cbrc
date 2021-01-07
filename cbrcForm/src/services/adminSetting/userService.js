
import Axios from 'axios';




export async function deleteUserInfoRequest(deleteUserInfo) {

  console.log("deleteUserInfoRequest 开始执行")

  
  console.log(deleteUserInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/deleteUser',
    params: {
      //orgid:deleteOrgInfo['orgid'],
    
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}







export async function updateUserInfoRequest(updateUserInfo) {

  console.log("updateUserInfoRequest 开始执行")

  
  console.log(updateUserInfo['updateOrgType']+'')
  console.log(updateUserInfo['updatePassword']+'')
  console.log(updateUserInfo['updateTelphone']+'')
  console.log(updateUserInfo['updateTrueName']+'')
  console.log(updateUserInfo['userid']+'')
  console.log(updateUserInfo['updateUserName']+'')




  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/updateUserInfo',
    params: {
      // updateOrgType:'1',
      // updatePassword:'1',
      // updateTelphone:'1',
      // updateTrueName:'1',
      // updateUserId:'1',
      // updateUserName:'1',
      //updateOrgType:'1',
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function inertUserInfoRequest(insertUserInfo) {

  console.log("inertUserInfoRequest 开始执行")

  
  console.log(insertUserInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/insertUser',
    params: {
      
      // newManagerName:insertOrgInfo['newManagerName'],
      // newOrgInfoName:insertOrgInfo['newOrgInfoName'],
      // newOrgType:insertOrgInfo['newOrgType'],
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}










export async function initUserInfoRequest() {

  console.log("initUserInfoRequest 开始执行")

 

  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/initUsers',
  

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}



