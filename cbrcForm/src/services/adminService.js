
import Axios from 'axios';







export async function initRequest(publishInfo) {

  console.log("initRequest 开始执行")

  
  console.log(publishInfo)


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/init',
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



