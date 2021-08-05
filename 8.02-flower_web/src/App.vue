<template>
        <div id="app">
            <transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
                <router-view></router-view> 
            </transition>
        </div>
</template>

<script>
export default {
    data: function () {
        return {
            userIsAppiont : this.$store.state.userIsAppiont
        }
    },
    methods: {
        // 获取登录状态
        getLoginStatus() {
            // 读取客户端cookie值  
            let cookie =  document.cookie && document.cookie.split("=")[1];   
            if (cookie == true) {  
                console.log(1);
                // 更新vuex 里的token
                this.updataVueXtoken(cookie);
                // 更新用户信息
                this.getuserInfo(cookie)
            }
        },
        // 更新vuex里的 token值
        updataVueXtoken(val) { 
            this.$store.commit("updataToken", val)
        },
        // 获取用户信息
        getuserInfo(cookie) {
            this.axios.get(`/api/appointment/show?token=${cookie}`)
            .then(res => { 
                // console.log(res);
                this.$store.commit("updataUserAppoint", {
                    appoint: res.data[0].is_appointment,
                    sessionid: res.data[0].sessions_id
                })
            }) 
        }
    },
    created() {
        this.getLoginStatus()
    }
}
</script>

<style lang="scss"> 
body {
    // position: relative; 
    box-sizing: border-box;
    min-width: 320px;
    // max-width: 750px; 
    width: 10rem;  
    height: 100vh;
    margin: 0 auto; 
    background: url(./assets/images/bgc.png) no-repeat;
    background-size: cover;
}
#app {
    margin: 0 auto;
    width: 100%;
    height: 100%;
}
</style>