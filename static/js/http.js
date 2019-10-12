import axios from 'axios'
import { Message, Loading } from 'element-ui'

// 创建axios实例
const http = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})
let loadingInstance;
// request拦截器
http.interceptors.request.use(config => {
  loadingInstance = Loading.service({ fullscreen: true });
	return config;
//   if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带token
//   }
//   return config
}, error => {
  setTimeout(()=>{
    loadingInstance.close();
  },200)
  Promise.reject(error)
})

// respone拦截器
http.interceptors.response.use(
  response => {
    	setTimeout(()=>{
    		loadingInstance.close();
    	},200)
    	return Promise.resolve(response)
   },
  error => {
    setTimeout(function(){
      loadingInstance.close();
    },200)
    // console.log('err' + error)// for debug
	if(error.response.logout=="401"){
		Message({
		  message: "登录失效，请退出重新登录！",
		  type: 'error',
		  duration: 5 * 1000
		})
	}else{
		Message({
		  message: error.response.data.msg,
		  type: 'error',
		  duration: 5 * 1000
		})
	}

    return Promise.reject(error)
  })
// var http={
// 	get:function(url,params){
// 		return new Promise((resolve,reject)=>{
// 			service.get(url,params)
// 			.then(function(response){
// 				resolve(response.data);
// 			}).catch(function(error){
// 				reject(error);
// 			})
// 		})
// 	},
// 	post:function(url,params){
// 		return new Promise((resolve,reject)=>{
// 			service.post(url,params)
// 			.then(function(response){
// 				resolve(response.data);
// 			}).catch(function(error){
// 				reject(error);
// 			})
// 		})
// 	},
// 	put:function(url,params){
// 		return new Promise((resolve,reject)=>{
// 			service.put(url,params)
// 			.then(function(response){
// 				resolve(response.data);
// 			}).catch(function(error){
// 				reject(error);
// 			})
// 		})
// 	},
// 	delete:function(url,params){
// 		return new Promise((resolve,reject)=>{
// 			service.delete(url,params)
// 			.then(function(response){
// 				resolve(response);
// 			}).catch(function(error){
// 				reject(error);
// 			})
// 		})
// 	}
// }
export default http
