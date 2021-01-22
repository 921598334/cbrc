
import Axios from 'axios';
import {myUrl} from './ip'




export async function loginRequest(loginInfo) {

  console.log("loginRequest1111开始执行")
  console.log(loginInfo)




  if(loginInfo.username.indexOf("_jg")==-1){
    //不是监管机构
    myUrl.localUrl = "http://19.120.250.10:8080/"
  }else{
    myUrl.localUrl = "http://10.120.250.10:8080/" 
  }

 


  console.log("请求服务器的ip为：")
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



