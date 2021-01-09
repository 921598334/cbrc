import Axios from 'axios';
import {myUrl} from '../ip'



export async function updateUserInfoRequest(updateUserInfo) {

  console.log("updateUserInfoRequest 开始执行")




  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'updateUserInfo',
    params: {
      updateOrgType:updateUserInfo['updateOrgType'],
      updatePassword:updateUserInfo['updatePassword'],
      updateTelphone:updateUserInfo['updateTelphone'] ,
      updateTrueName:updateUserInfo['updateTrueName'] ,
      updateUserId:updateUserInfo['updateUserId'],
      updateUserName:updateUserInfo['updateUserName'],
    
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
    url: myUrl.localUrl+'insertUser',
    params: {

      newOrgType:insertUserInfo['newOrgType'],
      newPassword:insertUserInfo['newPassword'],
      newTel:insertUserInfo['newTel'],
      newTrueUserName:insertUserInfo['newTrueUserName'],
      newUserName:insertUserInfo['newUserName'],
      
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}




export async function deleteUserInfoRequest(deleteUserInfo) {

  console.log("deleteUserInfoRequest 开始执行")


  console.log(deleteUserInfo)


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'deleteUser',
    params: {
      userid: deleteUserInfo['userid'],

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
    url: myUrl.localUrl+'initUsers',


  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}



