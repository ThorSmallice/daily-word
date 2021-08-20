import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        siderObj: {
            siderActiveArr: JSON.parse(sessionStorage.getItem("siderActiveArr")) || ["home"],
            subMenuActiveArr:JSON.parse(sessionStorage.getItem("siderActiveArr"))? JSON.parse(sessionStorage.getItem("siderActiveArr")).slice(1) : []
        },
        tabList:[
            { title: '首页', key: 'home' }
        ], // 选项卡列表
        activeKey: "home",
        siderPathObj: {}
    },
    mutations: {
        changesiderActiveArr(state,val) {
            state.siderObj.siderActiveArr = val;
            state.siderObj.subMenuActiveArr = val.slice(1);
            state.siderPathObj[val[0]] = val
        },
        changeTableList (state,val) {  
            // 判断选项的key值在数组里面是否存在
            const isIncludes = state.tabList.filter(item => {
                return item.key === val.key
            }) 
            // 不存在 才添加一个选项卡
            if (!isIncludes.length) {
                state.tabList.push({
                    title:val.domEvent.target.innerText,
                    key:val.key
                })
                // 更改激活的选项卡
                state.activeKey = val.key;
            }
        }
    },
    actions: {
    },
    modules: {
    }
})
