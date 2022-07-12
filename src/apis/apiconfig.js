import axios from 'axios';
import {Message} from 'element-ui';
import router from "@/router";

//  让请求在浏览器中允许跨域携带cookie
axios.defaults.withCredentials = true;

// 使用自定义配置新建一个 axios 实例
const service = axios.create({
    // 基础的请求地址
    baseURL: 'http://localhost:8081/',
    // 设置超时时间 5s
    timeout: 5000
});
// 添加超时后的处理（axios中需要你根据error信息来进行判断）
axios().catch(error => {
    const {message} = error;
    if (error.code === 'ECONNABORTED' && message.indexOf('timeout') > -1) {
        // 超时处理，可以直接弹出错误或者重新发起一次请求
        Message.error({message:"请求超时！请检查网络问题"});
    }
    // 若不是超时,则返回未错误信息
    return Promise.reject(error);
})

//结果拦截
/**
 * 相应拦截 可以做一些统一的错误响应
 */
service.interceptors.response.use(success => {
    console.log(success, "响应处理》》》》》》》》成功！");
    //data.msg 是后端RespBean中响应的信息,即作用前面ServerResponse类来输出。
    if (success.status && success.status === -1 && success.data.status === 500) {
        Message.error({message: success.data.msg})
        router.back();
        return ;
    }
       //响应数据出错时 统一操作
    if (success.data.code==200){
        return success.data;
    }
    else{
        Message.error({message: success.data.msg})
    }
    //一般错误弹出消息 特殊错误时可以进行页面跳转之类的操作
}, error => {
    //data.msg 是后端RespBean中响应的信息
    console.log("响应出错：   ",error)
    if (error.response.msg) {
        Message.error({message: error.response.data.msg})
    } else {
        Message.error({message: '未知错误!'})
    }
})
// 请求拦截器，例如请求的时候在头部加上请求的token
service.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.ACCESS_TOKEN = localStorage.getItem('token');
    }
    return config;  //  有且必须有一个config对象被返回
}, error => {
    //   对请求错误做些什么
    console.log(error);
    return Promise.reject();
});

export default service;
