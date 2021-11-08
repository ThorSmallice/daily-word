import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
const _axios = require('./utils/_axios');
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import 'ant-design-vue/dist/antd.css';
import { message,Modal,Select } from 'ant-design-vue';  

Vue.config.productionTip = false

_axios.interceptors.request.use((req) => { 
    // req.headers["Access-Control-Allow-Origin"]= "*"
    // req.headers["Access-Control-Allow-Methods"] = "DELETE, POST, GET, OPTIONS";
    // req.headers["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    // console.log(req);
    NProgress.start();
    return req;
})
_axios.interceptors.response.use(res => {
    // res.headers('Access-Control-Allow-Credentials', 'true');
    // res.headers["Access-Control-Allow-Credentials"] = true
    // console.log(res);
    if (res.status === 200) {
        NProgress.done()
        return res.data
    } 
},err => { 
    NProgress.done()
    return  Promise.reject(err)
})
 
Vue.prototype.axios = _axios;
Vue.prototype.$message = message;
Vue.prototype.$modal = Modal;

Vue.use(Select);

// 格式化时间 ==> 10月01日
Vue.filter("fomatTime", (value) => {
    if (!value) return "";  
    let times = new Date(Number(value));
    let month = (times.getMonth()+1).toString().padStart(2,"0");
    let day = times.getDate().toString().padStart(2,"0");
     
    return `${month}月${day}日`
})
// 格式化时间  ==> 09:00 - 10:00
Vue.filter("fomatTiming", (value) => {
    if (!value) return "";
    let startTime = new Date(Number(value[0]));
    let endTime = new Date(Number(value[1]));
    // 开始时间的小时-分钟
    let startHours = startTime.getHours().toString().padStart(2,"0");
    let startMin = startTime.getMinutes().toString().padStart(2,"0");
    // 结束时间的小时-分钟
    let endHours = endTime.getHours().toString().padStart(2,"0");
    let endMin = endTime.getMinutes().toString().padStart(2,"0");

    return  `${startHours}:${startMin} - ${endHours}:${endMin}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 