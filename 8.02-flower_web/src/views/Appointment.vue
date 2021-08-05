<template>
    <div id="appointment">
        <section class="appointment-card">
            <a-select class="selectDate"  v-model="selectValue" @change="changeDate">
                <template v-for="item in selectDateArr">
                    <a-select-option :key="item.id">{{item.time | fomatTime}}</a-select-option>
                </template>
            </a-select>

            <div class="table-wrap">
                <div class="table">
                    <div class="table-th">
                        <div class="tr">
                            <span>场次</span>
                            <span>状态</span>
                        </div>
                    </div>

                    <div class="table-tbody">
                        <template v-for="item in sessionArr">
                            <div class="tr" :key="item.id">
                                <span>{{[item.start_time,item.end_time] | fomatTiming }}</span>
                                <span >
                                    <button class="appbtn" @click="toAppoint(item.id,item.is_appointment)">
                                        {{ item.is_appointment? '可预约': '已约满' }}
                                    </button>
                                    </span>
                            </div> 
                        </template>
                    </div>

                    <div class="table-footer">
                        <p>★ 一个手机号，一天只能预约一场。</p>
                    </div>
                </div>
            </div>

        </section>

        <div class="operation-wrap">
            <router-link :to="`/myappoint/${$store.state.userInfo.token}`" class="yuyue-btn opera-btn">我的预约</router-link>
            <router-link to="/" class="start-btn opera-btn">首页</router-link>
        </div> 
    </div>
</template>

<script>
export default {
    data: () => {
        return { 
            selectValue: "",      // 默认日期
            selectDateArr: [],   // 所有日期
            sessionArr: [],        // 所有场次 
        }
    },
    methods: {
        // 获取日期
        getDateDay() {
            this.axios.get("/api/date/show").then(res => {  
                // 更新日期列表
                this.selectDateArr = res.data; 
                // 更新首选日期值
                this.selectValue = res.data[0].id;
                // 获取当前日期的场次
                this.getSession(res.data[0].id);
            })
        },
        // 获取场次
        getSession (timeID) {
            this.axios.get(`/api/session/show?timeId=${timeID}`).then(res => {
                this.sessionArr = res.data.sort((a,b) => {
                    return a.start_time - b.start_time
                });  
            })
        },
        // 更换选中日期
        changeDate (value) {
            this.getSession(value); 
        },
        // 请求预约
        toAppoint(id,isAppoint) { 
            // 判断用户是否已经预约  
            if (this.$store.state.userInfo.is_appointment) {
                // 用户已经预约过 提示警告
                return  this.$message.warning("您已有预约场次,如需预约该场次,请取消已预约场次~"); 
            }
            // 判断场次是否约满
            if (!isAppoint) { // 已约满
                return this.$message.info("该场次已约满，请预约其他场次~");
            }
            // 发送预约请求
            this.axios.put("/api/appointment/update", {
                token: this.$store.state.userInfo.token,
                sessionId: id,
                isAppointment: 1
            }).then(res => {
                if (res.code === 200 ) {
                    this.$message.success("预约成功~");
                    // 更新vuex 用户预约状态和场次信息
                    this.updataVuexIsAppoint({
                        appoint: 1,
                        sessionid: id
                    })
                    this.$router.push(`/myappoint/${this.$store.state.userInfo.token}`)
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        updataVuexIsAppoint(val) {
            this.$store.commit("updataUserAppoint", val)
        }
    },
    created() {
        // 获取日期
        this.getDateDay();
    },
    
}
</script>

<style lang="scss" scoped>
#appointment {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .appointment-card { 
        width: 7.866667rem;
        height: 11.186667rem;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0px 4px 13px 5px 
            rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        .selectDate {
            margin: .666667rem 0 0 .693333rem;
            padding: 3px;
            font-size: .4rem;
            border: none; 
        }
        .table-wrap { 
            margin-top: 1.133333rem;
            width: 100%; 
            .table { 
                text-align: center;
                span {
                    display: inline-block;
                    white-space: nowrap;
                    width: 2rem;
                    height: 100%;
                    font-size: .346667rem;
                    color:#434242; 
                }
                .table-th {
                    span {
                        color:  #0075c1;
                        font-size: .346667rem;
                    }
                }
                .table-tbody { 
                    line-height: 2.266667rem;
                    height: 6.8rem;
                    overflow: scroll;
                    .appbtn {
                        padding: .066667rem .133333rem;
                        background: transparent;
                        border: none;
                        line-height: .4rem;
                    }
                }
                .table-footer {
                    font-size: .346667rem;
                    color: #434242;
                }
                .table-th,.table-tbody { 
                    padding: 0 1.373333rem;
                    .tr {
                        display: flex;
                        justify-content: space-between;
                    }
                }
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