import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*-----------Antd UI组件-----------*/ 
import {
    Button, 
    Icon,
    Layout,
    Menu,
    Tabs
} from "ant-design-vue";

Vue.use(Button).use(Layout).use(Icon).use(Menu).use(Tabs);    



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
