import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            token: "", // 用户token值
            is_appointment: "",  //  用户已预约 1是0否
            sessions_id: "",    // 已预约场次id 
        } 
    },
    mutations: {
        // 更新userInfo
        updataVueXuser(state,val) {
            state.userInfo.token = val.token;
            state.userInfo.is_appointment = val.is_appointment;
            state.userInfo.sessions_id = val.sessions_id;
        },
        // 更新token
        updataToken(state,val) { 
            state.userInfo.token = val
        },
        // 更新用户预约状态和预约的场次信息
        updataUserAppoint(state,val) { 
            state.userInfo.is_appointment = val.appoint;
            state.userInfo.sessions_id = val.sessionid;
        }
    },
    actions: {
    }
})
