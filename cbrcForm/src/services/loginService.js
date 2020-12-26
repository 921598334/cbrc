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



