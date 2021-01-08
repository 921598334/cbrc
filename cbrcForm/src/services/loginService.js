
import Axios from 'axios';
import {myUrl} from './ip'




export async function loginRequest(loginInfo) {

  console.log("loginRequest开始执行")
  console.log(loginInfo)

  console.log("服务器的ip为：")
  console.log(myUrl.localUrl)



  return await Axios({
    method: 'post',
    url: myUrl.localUrl+'login',
    params: {
      ...loginInfo
    }
  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });

}



