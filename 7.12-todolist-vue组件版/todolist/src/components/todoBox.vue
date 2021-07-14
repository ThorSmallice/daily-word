<template>
    <div class="listbox">
        <div class="title">
            <h2>{{ title }}</h2>
            <span>{{dataArr.length}}</span>
        </div>
        <transition-group tag="ul" 
        enter-active-class="animate__animated animate__bounceInRight" 
        leave-active-class="animate__animated animate__bounceOutLeft"
        >
            <template  v-for="item in dataArr">
                <li :key="item.id">
                    <div class="content">
                        <input type="checkbox" @change="changeFinishStatus(item)" :checked="item.isFinish" :disabled="item.isOver"> 
                        {{item.text}} 
                        {{ {item, systemDate} | formatTime }}
                    </div>
                    <div class="button-wrap">
                        <button @click="recoveItem(item)" v-if="item.isOver">恢复</button>
                        <button @click="delItem(item.id)">删除</button>
                    </div>
                </li>
            </template>
        </transition-group>
    </div> 
</template>

<script>
export default {
    props:[ // 接收传入的数据列表
        "title" ,       // 标题
        "data-arr",     // 要渲染的数组 
        "can-handle",   // 是否允许操作( 删除 更改完成状态 恢复) 
    ],
    data: function () {
        return {
            systemDate: Date.now(),
            systemTimer: null
        }
    },
    methods: {
        // 更改完成状态 
        changeFinishStatus(currentItem) { 
            this.$emit("change-finish-status", currentItem)
        },
        // 删除当前事项
        delItem (currentId) {
            // 派发`delItem`事件交至父组件处理
            this.$emit("del-item", currentId)
        },
        // 恢复当前项
        recoveItem (currentItem) {
            // 派发 `recover-item ` 事件交至父组件处理
            this.$emit("recover-item",currentItem)
        },
        // 实时更新系统当前时间
        setTimer() {
            this.systemTimer = setInterval(() => {
                this.systemDate = Date.now()
            }, 1000);
        } 
    },
    created() {
        this.setTimer();    // 实时更新系统当前时间
    },
    filters: {
        formatTime : function (data) {
            if (!data.item.overDate) return "时间错误" ;         // 过期时间不存在 返回时间错误
            if ( data.item.isFinish || data.item.isOver ) {          // 如果事项已经完成，或者已经过期 返回格式化的过期时间 
                let date = new Date(data.item.overDate);
                // 获取年月日
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                // 获取小时、分钟
                let hour = date.getHours();
                let minute = date.getMinutes(); 
                // 小时、分钟不满两位数的 用0补齐
                hour = hour < 10? String(hour).padStart(2,"0") : hour;
                minute = minute < 10? String(minute).padStart(2,"0") : minute;

                return `${year}年${month}月${day}日   ${hour}:${minute}`
            } 
            // 如果事项是未完成的  并且距离过期时间不足24小时的 返回剩余时间
            if( (!data.item.isFinish) && ( data.item.overDate - data.systemDate < 60*60*24*1000) ) {  
                let timeDifference = parseInt((data.item.overDate - data.systemDate) / 1000);  // 过期时间距离系统时间的时间差 单位s
                let days = parseInt(timeDifference / 86400);                // 计算天
                let hours = parseInt(timeDifference % 86400 / 3600);        // 计算小时
                let minu = parseInt(timeDifference % 86400 % 3600 / 60);    // 计算分钟
                let seconds = parseInt(timeDifference % 86400 % 3600 % 60); // 计算秒

                days = days < 10 ? String(days).padStart(2,"0") : days;
                hours = hours < 10 ? String(hours).padStart(2,"0") : hours;
                minu = minu < 10 ? String(minu).padStart(2,"0") : minu;
                seconds = seconds < 10 ? String(seconds).padStart(2,"0") : seconds;
                return `还有${ days = days > 0 ? days : ''}${ days > 0 ? '天' : ''} ${hours}时${minu}分${seconds}秒过期  `
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.listbox { 
    width: 70%;
    margin: 0 auto 20px;
    border-radius: 20px;
    padding: 20px 20px;
    
    .title {
    
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;
        span {
            display: block;
            width: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 22px;
            height: 35px;
            background-color: #fff;
            border-radius: 50%;
        }
    }
    ul {
        padding-right: 40px;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 60px;
            font-size: 26px; 
            input {
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin-right: 10px;
            }
            button { 
                margin-left: 10px;
                cursor: pointer;
                user-select: none;
                box-sizing: content-box;
                width: 60px;
                height: 30px;
                text-align: center;
                font-size: 18px; 
                line-height: 30px;
                padding:5px;
                vertical-align: middle;
                background-color: #ccc;
                border-radius: 5px;
                border: 2px solid #000;
                color: #fff;
                font-weight: 600;
            }
        } 
    }
}
</style>