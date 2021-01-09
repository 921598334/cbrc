
import Axios from 'axios';
import {myUrl} from './ip'






export async function getUserRequest(queryUserInfo) {

  console.log("updateRequest 开始执行")


  console.log(queryUserInfo)


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'initUsers',
    params: {
      ...queryUserInfo
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}





export async function updateUserRequest(updateUserInfo) {

  console.log("updateUserRequest 开始执行")


  console.log(updateUserInfo)


  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'updateUserInfo',
    params: {
      
      updatePassword:updateUserInfo.password,
      updateTelphone:updateUserInfo.telphone,
      updateTrueName:updateUserInfo.truename,
      updateUserId:updateUserInfo.userid,
      updateUserName:updateUserInfo.username,
      updateOrgType:updateUserInfo.orgid,
    }

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}
