import { notification } from "antd";
import { uploadRequest, getCellRequest } from '../services/uploadService'

import Cookies from 'js-cookie'

export default {

  namespace: 'uploadNamespace',

  state: {
    table1Struct: 'null',
    table2Struct: 'null',
    table3Struct: 'null',
    table4Struct: 'null',
    username: '',
    token: '',
  },

  subscriptions: {

  },

  effects: {



    *exit({ payload }, { call, put }) {
      yield put({ type: 'exitReduce' });

      return true;
    },


    *getCell({ payload }, { call, put }) {

      console.log("*getCell开始执行")

      const response = yield call(getCellRequest);

      console.log("*getCell返回为：")
      console.log(response)


      //如果出现异常
      if (response.data == undefined) {
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }


      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {

        yield put({ type: 'getCellReduce', payload: { ...response } });
        notification.success({ message: '初始化成功' })
        return true;
      }

    },



    *upload({ uploadInfo }, { call, put }) {

      console.log("*upload开始执行")
      const dataSource = uploadInfo.dataSource;
      console.log(dataSource)

      if (uploadInfo.fileType == 3) {

        if (dataSource.length == 0) {
          notification.error({ message: '请输入数据' })
          return false
        } else {

          for (let index in dataSource) {
           
            var amount = dataSource[index]['col1'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第1列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第1列'  })
              return false
            }

             amount = dataSource[index]['col2'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第2列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第2列'  })
              return false
            }

             amount = dataSource[index]['col3'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第3列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第3列'  })
              return false
            }

             amount = dataSource[index]['col4'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第4列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第4列'  })
              return false
            }

             amount = dataSource[index]['col5'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第5列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第5列'  })
              return false
            }

             amount = dataSource[index]['col6'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第6列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第6列'  })
              return false
            }

             amount = dataSource[index]['col7'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第7列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第7列'  })
              return false
            }

             amount = dataSource[index]['col8'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第8列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第8列'  })
              return false
            }

             amount = dataSource[index]['col9'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第9列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第9列'  })
              return false
            }

             amount = dataSource[index]['col10'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第10列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第10列'  })
              return false
            }

             amount = dataSource[index]['col11'].replace(/\s*/g, '')
            if (amount === '') {
              notification.error({ message: '第11列不能全为空格' })
              return false
            }
            if (amount === null) {
              notification.error({ message: '请输入第11列'  })
              return false
            }


          }

        }

      } else {
        //检查输入是否合法
        for (let index in dataSource) {

          //console.log(uploadInfo[index])

          //去除前后空格
          const amount = dataSource[index]['amount'].replace(/\s*/g, '')


          if (amount === '无') {
            notification.error({ message: '请输入 ' + dataSource[index]['cellname'] + ' 的金额' })
            return false
          }

          if (amount === '') {
            notification.error({ message: '请输入 ' + dataSource[index]['cellname'] + ' 的金额' })
            return false
          }

          if (amount === null) {
            notification.error({ message: '请输入 ' + dataSource[index]['cellname'] + ' 的金额' })
            return false
          }

          if (Number.isNaN(Number(amount))) {
            notification.error({ message: dataSource[index]['cellname'] + ' 需要输入数字' })
            return false
          }

        }
      }






      uploadInfo.userid = Cookies.get('userid')



      const response = yield call(uploadRequest, uploadInfo);

      console.log("*upload返回为：")
      console.log(response)

      //如果出现异常
      if (response.data == undefined) {
        notification.error({ message: '网络异常错误，请稍后重试' })
        return false;
      }



      if (response.data.F) {
        notification.error({ message: response.data.F })
        return false;
      } else {
        notification.success({ message: '数据上传成功' })
        yield put({ type: 'uploadReduce', payload: { ...response } });
        return true;
      }

    },



  },

  reducers: {



    //退出登陆
    exitReduce(state, action) {

      console.log("exitReduce开始执行")

      Cookies.remove('username');
      Cookies.remove('token');

      return { ...state };
    },




    //得到cookie中的信息
    getCookieReduce(state, action) {

      console.log("getCookie开始执行")

      state.username = Cookies.get('username');
      state.token = Cookies.get('token');


      return { ...state };
    },









    uploadReduce(state, action) {

      console.log("uploadReduce开始执行")
      console.log(action.payload.data)

      return { ...state, ...action.data };
    },


    getCellReduce(state, action) {

      console.log("getCellReduce开始执行")

      //根据repid把数据才分为响应的表
      const table1Struct = []
      const table2Struct = []
      const table3Struct = []
      const table4Struct = []



      for (let index in action.payload.data) {

        let key = action.payload.data[index]


        //对数据进行筛选，没有'（'的需要滤除，
        if (key['cellname'].indexOf('（') == -1) {
          // console.log('过滤' + key['cellname'])
          continue
        }
        //有'备注'的需要滤除
        if (key['cellname'].indexOf('备注') != -1) {
          // console.log('过滤' + key['cellname'])
          continue
        }


        if (key['repid'] == 1) {
          table1Struct.push(key)
        } else if (key['repid'] == 2) {
          table2Struct.push(key)
        } else if (key['repid'] == 3) {
          table3Struct.push(key)
        } else if (key['repid'] == 4) {
          table4Struct.push(key)
        } else {
          // console.log('没有找到repid')
          // console.log(key)
        }
      }



      // action.payload.data.map((key) => {



      //   if (key['repid'] == 1) {
      //     table1Struct.push(key)
      //   } else if (key['repid'] == 2) {
      //     table2Struct.push(key)
      //   } else if (key['repid'] == 3) {
      //     table3Struct.push(key)
      //   } else if (key['repid'] == 4) {
      //     table4Struct.push(key)
      //   } else {
      //     console.log('没有找到repid')
      //     console.log(key)
      //   }
      // })

      //console.log(table1Struct)

      //console.log(action.payload.data)

      state.table1Struct = table1Struct
      state.table2Struct = table2Struct
      state.table3Struct = table3Struct
      state.table4Struct = table4Struct

      return { ...state, };
    },



  },

};
