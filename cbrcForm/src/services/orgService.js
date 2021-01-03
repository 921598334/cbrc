
import Axios from 'axios';






export async function getOrgRequest() {

  console.log("getCellRequest开始执行")


  return await Axios({
    method: 'post',
    url: 'http://localhost:8080/getOrg',

  }).then(function (response) {

    return response

  }).catch(function (error) {
    console.log('出现了错误，错误信息为：');
    console.log(error);
    return error
  });
}



