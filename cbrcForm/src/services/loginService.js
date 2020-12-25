import request from '../utils/request';
import Axios from 'axios';


export async function loginRequest(loginInfo) {

  console.log("loginRequest开始执行")
  console.log(loginInfo)

  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/login',
    params: {
      ...loginInfo
    }
  }).then(function (response) {

    return response

  });
}




export async function uploadRequest(uploadInfo) {

  console.log("uploadRequest开始执行")
 
  //把map对象转化为list
  var uploadInfoList = []
  for (let index in uploadInfo) {
    uploadInfoList.push(uploadInfo[index])
  }


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/upload',
    params: {
     
      uploadInfo,
    }
  }).then(function (response) {

    return response

  });
}