<template>
    <div id="myAppoint">
        <section class="myAppoint-card">
            <div class="user-name">
                {{userInfo.name}}
            </div>

            <div class="apponit-text">
                <p>欢迎您在{{(userInfo.sessions_time) | getFomatTime}}参观{{ userInfo.sessions_time | getFomatYear }}广州国际花卉艺术展暨中国插花花艺展。 </p>
            </div>

            <div class="qrcode-wrap">
                <img :src="userInfo.qrcode" v-if="userInfo.qrcode">
                <p v-else>您暂未预约场次~</p>
                <button class="savebtn" @click="downloadQrcode(userInfo.qrcode)"  v-if="userInfo.qrcode">保存图片</button>
                <p>请保存此页面，进入参观区域前向工作人员出示，谢谢！</p>
            </div>

        </section>

        <div class="operation-wrap">
            <button class="yuyue-btn opera-btn" @click="qsAppiont">取消预约</button>
            <router-link to="/" class="start-btn opera-btn">首页</router-link>
        </div> 
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            userInfo: {},  // 用户预约信息
            qrcode: ""
        }
    },
    methods: {
        // 获取预约信息
        getSessionInfo() {
            this.axios.get(`/api/appointment/show?token=${this.$route.params.id}`)
            .then(res => { 
                this.userInfo = res.data[0];
            }) 
        },
        // 下载二维码到本地
        downloadQrcode(url) {
            this.qrcode = `require('${url}')`
            let alink = document.createElement("a");
            alink.href = this.qrcode;
            alink.download = Date.now(); 
            alink.click(); 
        },
        // 取消预约
        qsAppiont() { 
            if (this.userInfo.sessions_time) { 
                this.axios.put("/api/appointment/update",{
                    token: this.$store.state.userInfo.token,
                    sessionId: this.$store.state.userInfo.sessions_id,
                    isAppointment: 0
                }).then(() => {
                    this.$message.success("取消成功！")
                    // 重新获取预约信息
                    this.getSessionInfo();
                    // 更新vuex 用户预约状态和场次信息
                    this.updataVuexIsAppoint({
                        appoint: 0,
                        sessionid: ""
                    })
                })
            } else {
                this.$message.warning("暂无预约场次~")
            }
        },
        // 更新vuex 用户信息
        updataVuexIsAppoint(val) {
            this.$store.commit("updataUserAppoint",val)
        }
    },
    created() {
        this.getSessionInfo()
    },
    filters: {
        getFomatTime(val) {
            if (!val) return "";
            let date = new Date(Number(val));
            let month = date.getMonth()+1;
            let day = date.getDate().toString().padStart(2,"0");
            let hous = date.getHours().toString().padStart(2,"0");
            let min = date.getMinutes().toString().padStart(2,"0");
            return `${month}月${day}日 ${hous}:${min}`
        },
        getFomatYear(val) {
            if (!val) return "";
            return new Date(Number(val)).getFullYear();
        }
    }
}
</script>


<style lang="scss" scoped>
#myAppoint {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .myAppoint-card { 
        width: 7.866667rem;
        height: 11.186667rem;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0px 4px 13px 5px 
            rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        .user-name {
            margin: 1rem 0 0 .346667rem;
            position: relative;
            width: 3.533333rem;
            height: .693333rem;
            line-height: .693333rem;
            border-bottom:2px solid #434242;
            font-size: .466667rem;
            text-align: center;
            &::after {
                position: absolute;
                display: block;
                content: ":";
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .apponit-text {
            width: 7.106667rem;
            margin: .8rem auto .666667rem;
            p {
                user-select: none;
                text-overflow: ellipsis;
                font-size: .346667rem;
                line-height: .546667rem;
                text-indent: 2em;
                color: #434242;
            }
        }
        .qrcode-wrap {
            
            margin: 0 auto;
            img {
                display: block;
                width: 3.533333rem;
                height: 3.533333rem;
                border: solid .053333rem #434242;
                margin: 0 auto .266667rem;
            }
            button {
                display: block;
                margin: 0 auto .6rem;
                width: 2.493333rem;
                height: .76rem;
                font-size: .32rem;
                border: none;
                background-color: rgba(255, 255, 255, .7);
                box-shadow: 0px 4px 4px 1px 
                    rgba(0, 0, 0, 0.39);
                border-radius: 29px;
            }
            p {
                margin: 0 auto;
                width: 7.106667rem; 
                font-size: .346667rem;
                line-height: .56rem;
                text-indent: 2em;
                color: #434242;
            }
        }
    }
    .operation-wrap {
        position: absolute;
        bottom: .666667rem;
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
</style>