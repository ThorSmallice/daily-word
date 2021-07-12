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
                        {{ item.overDate*1000 | formatTime}}
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
        "can-handle"    // 是否允许操作( 删除 更改完成状态 恢复)
    ],
    data: function () {
        return {

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
        }
    },
    filters: {
        formatTime : function (value) {
            if (!value) return "时间错误" ;
            let date = new Date(value);
            
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            
            let hour = date.getHours();
            let minute = date.getMinutes(); 
            hour = hour < 10? String(hour).padStart(2,"0") : hour;
            minute = minute < 10? String(minute).padStart(2,"0") : minute;
            return `${year}年${month}月${day}日   ${hour}:${minute}`
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