<template>
    <div id="index">
        <header>
            <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut"> 
                <button @click="offLogin" v-if="isLogin">注销</button>
            </transition>
        </header>
        <section>
            <ul class="form-wrap">
                <transition enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutLeft">
                    <ul v-if="isLogin === 0">
                        <li class="input-box inpName">
                            <span>姓名：</span>
                            <input type="text" v-model.trim="inpName">
                        </li>

                        <li class="input-box inpPhone">
                            <span>+86</span>
                            <input type="tel" v-model.trim="inpTel">
                        </li>

                        <li class="input-box inpIdCard">
                            <span>身份证号码：</span>
                            <input type="text" v-model.trim="inpIdCard">
                        </li>
                    </ul>
                </transition>
                
                <transition enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutLeft">
                    <li class="input-box inpCode" v-if="showZhuce"> 
                        <input type="text" v-model.trim="inpCode" placeholder="请输入验证码~" >
                        <button @click="sendCode" class="sendCode">发送验证码</button>
                    </li>
                </transition>
            </ul> 
        </section>
        <footer>  
                
            <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut"> 
                <div class="operation-wrap" v-if="isLogin === 0">  
                        <div class="operation-wrap" v-if="showZhuce">
                            <button class="login-btn opera-btn" @click="tologin">去登录</button>
                            <button class="login-btn opera-btn" @click="registered" >确定注册</button> 
                        </div>

                        <div class="operation-wrap" v-else>
                            <button class="zhuce-btn opera-btn" @click="toregistered">去注册</button>
                            <button class="login-btn opera-btn" @click="login">登录</button>
                        </div> 
                </div> 
            

            
                <div class="operation-wrap" v-else>
                    <router-link :to="`/myappoint/${$store.state.userInfo.token}`" class="yuyue-btn opera-btn">我的预约</router-link>
                    <router-link to="/appointment" class="start-btn opera-btn">开始预约</router-link>
                </div>
             </transition>
        </footer>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            inpName: "",    // 姓名
            inpTel: "",       //  手机号
            inpIdCard: "",  //  身份证号  
            inpCode: "",         // 验证码
            isLogin: 0,      //  登录状态 1是0否
            showZhuce: false,   // 显示注册按钮 默认否
        }
    },
    methods: {
        // 获取登录状态
        getisLogin() {  
            if (this.$store.state.userInfo.token) { 
                // token 值存在 登录状态为是
                this.isLogin = 1;
            }
        },
        // 发送验证码
        sendCode(e) {
            if (this.inpTel) { 
                // 发送验证码
                this.axios.get(`/api/sms/new?phone=${this.inpTel}`).then(res => {
                    this.$modal.success({
                        title: `发送成功~`,
                        content: `您本次的验证码为${res.data.code}` 
                    });
                })
                // 禁用按钮 60S后重启按钮
                e.target.disabled = true;
                let seconds = 60;
                let timer = setInterval(() => {
                    seconds--;
                    e.target.innerText = `${seconds}S`
                    if (seconds === 0) {
                        clearInterval(timer);
                        e.target.disabled = false;
                        e.target.innerText = "发送验证码"
                    }
                },1000)
                
            } else {
                this.$message.warning("请输入手机号码~")
            }
        },
        // 去注册
        toregistered() {
            // 显示注册按钮和验证码输入框 
            this.showZhuce = true
        },
        // 注册
        registered() {
            if ( this.inpName && this.inpTel && this.inpIdCard && this.inpCode) {
                this.axios.post('/api/user/create', {
                    name: this.inpName,
                    phone: this.inpTel,
                    idCard: this.inpIdCard,
                    code: this.inpCode
                }).then(res => {
                    // 提示注册成功 
                    this.$message.success(res.msg)
                    // 隐藏验证码输入框 隐藏注册按钮
                    this.showZhuce = false
                }).catch((err) => {
                    console.log(err.response); 
                })
            } 
        },
        // 登录
        login () { 
            if (this.inpName && this.inpTel && this.inpIdCard ) { 
                // 信息填写完整 发送登录请求
                this.axios.get(`/api/user/show?name=${this.inpName}&phone=${this.inpTel}&idCard=${this.inpIdCard}`)
                .then(res => {
                   
                    if (res) {
                         // 登录成功 提示
                        this.$message.success("登录成功");
                        // 更改登录状态
                        this.isLogin = 1; 
                        // 写入cookie 过期时间7天 
                        document.cookie = `token=${res.data[0].token};max-age=${60*60*24*7}`;
                        // 更新vuex 里的用户信息userinfo 
                        this.updataVueXuser(res.data[0]);  
                    } 
                })
                .catch(err => { 
                    if (err.response.status === 409 ){
                         this.$message.info("该用户不存在")
                    }
                })
            } else {
                this.$message.warning("请正确填写信息~")
            }
        },
        // 注销
        offLogin() { 
            document.cookie = 'token=';
            this.isLogin = 0;
            this.updataVueXuser({
                token: " ",
                is_appointment: "",
                sessions_id : ""
            });  
        },
        // 切换到登录
        tologin() {
            // 隐藏注册按钮和验证码输入框 
            this.showZhuce = false
        },
        // 更新vuex里的用户信息userinfo 
        updataVueXuser(val) {
            this.$store.commit("updataVueXuser", val)
        }
    },
    created() {
        // 获取登录状态
        this.getisLogin()
    }
}
</script>

<style lang="scss" scoped>
#index {
    padding-top: 1.4rem; 
    header { 
        // position: relative;
        margin: 0 auto;
        margin-bottom: 1.866667rem;
        width: 2.986667rem;
        height: 2.626667rem;
        background: url(./../assets/images/logo2.png) no-repeat;
        background-size: contain; 
        button {
            display: block;
            position: absolute;
            right: .666667rem;
            top: 50px;
            border-radius: .133333rem;
            padding: .133333rem .266667rem;
            outline: none;
            font-size: .4rem;
            text-align: center;
            border: none;
            color: #0075c1;
            user-select: none;
        }
    }
    section {
        margin-bottom: 1.04rem;
        display: flex;
        justify-content: center;
        .form-wrap {
            .input-box {
                box-sizing: border-box;
                display: flex; 
                justify-content: space-between;
                align-items: center;
                width: 7.706667rem;
                height: 1.013333rem;
                // line-height: 1.013333rem;
                padding: .2rem .546667rem ;
                border-radius: .506667rem;
                background-color: rgba(255, 255, 255, .5);
                font-size: .346667rem;
                color: #434242;
                margin-bottom: .666667rem;
                span {
                    display: inline-block;
                    padding-right: 10px;
                    white-space: nowrap;
                }
                input {
                    vertical-align: middle;
                    flex: 1 1 auto; 
                    border: none;
                    outline: none;
                    background-color: transparent;
                }
                .sendCode {
                    border: none;
                    transition: all .5s ease-in;
                    padding: .133333rem;
                    white-space: nowrap;
                    border-radius: .266667rem;
                }
            }
        }
    }
    footer {
        .operation-wrap {  
            transition: all ease-in 1s;
            display: flex;
            margin: 0 auto;
            justify-content: space-evenly; 
            margin-bottom: 10px;
            width: 7.706667rem;
            .opera-btn {
                border: none;
                width: 3.266667rem;
                height: 1.013333rem;
                line-height: 1.013333rem;
                text-align: center;
                color:  #0075c1;
                font-size: .373333rem;
                background-color: rgb(255, 255, 255,.7);
                box-shadow: 0px 4px 4px 1px  rgba(0, 0, 0, 0.39);
                border-radius: .506667rem;
            }
        }
    }
}
</style>