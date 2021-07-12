<template>
    <div id="Index">
        <header>
            <div class="container">
                <h2>todoList</h2>
                <div>
                    <input 
                    class="textInp" 
                    type="text" 
                    v-model.lazy.trim="inputText" 
                    @keyup.enter="addItem" 
                    placeholder="输入你即将要做的事情吧~" 
                    :disabled="isDisabled"> 
                    <input class="dateInp" type="datetime-local" v-model.lazy="inputDate">
                    <button @click="sure" v-if="showSureBtn">确认</button>
                    <button @click="addItem" >新增</button>
                    
                    <transition 
                    enter-active-class="animate__animated animate__fadeIn" 
                    leave-active-class="animate__animated animate__fadeOut"
                    >
                        <p class="aleat-box" v-if="noInputContent">
                            请填写内容和时间哦~
                        </p>
                    </transition>
                </div>
            </div>

        </header>
        <main>
            <todo-box 
            title="正在进行" 
            class="listbox1"
            :data-arr="unfinishArr" 
            :can-handle="canHandle"
            @del-item="delItem" 
            @change-finish-status="changeFinishStatus"
            ></todo-box>

            <todo-box 
            title="已经完成" 
            :data-arr="finishArr"  
            class="listbox2"
            :can-handle="canHandle"
            @del-item="delItem"
            @change-finish-status="changeFinishStatus"
            >
            </todo-box>

            <todo-box 
            title="已经过期" 
            :data-arr="overArr"  
            class="listbox3"
            :can-handle="canHandle"
            @del-item="delItem"
            @recover-item="recoveItem"
            @change-finish-status="changeFinishStatus"
            >
            </todo-box>
        </main>
    </div>
</template>

<script>
import todoBox from './../components/todoBox.vue';
export default {
    data: function() {
        return {
            canHandle : true,                           // 允许操作
            inputText: "",                              // 用户输入的文本
            inputDate: "",                              // 用户选择的过期时间
            todoArr: [],                                // 所有事项的数据列表 
            systemDate: new Date().getTime() / 1000,   // 当前(实时)系统时间 单位:s
            isDisabled: false,                         // 输入框是否禁用 默认否
            showSureBtn: false,                        // 恢复按钮是否显示 默认否
            noInputContent: false,       // 控制输入提示 默认不提示 用户添加事项时若没有输入内容或时间再提示
            dateTimer: null,             // 监视系统时间更改过期事项状态的定时器
            recoveObj: null              // 临时存储要恢复的事项
        }
    },
    // 方法
    methods: {
        // 添加新事项
        addItem () {
           if (this.canHandle) { // 允许操作 
                this.canHandle = false;  // 禁止操作 
                if (this.inputText && this.inputDate) {
                    // 有输入文本和选择时间 就向数组添加一个新事项对象
                    this.todoArr.push({
                        id: Date.now(),                                         // 事项id
                        text: this.inputText,                                   // 事项内容
                        isFinish: false,                                        // 事项是否完成 默认未完成
                        overDate:  new Date(this.inputDate).getTime()  / 1000,    // 事项的过期时间 单位:s
                        isOver: this.isover                                     // 事项是否过期 根据用户选择的时间戳计算返回 ==> computed：isover进行计算返回
                    })
                    this.inputText = "";        // 重置输入框
                    this.inputDate = "";        // 重置日期选择 
                } else {
                    // 没有输入文本或选择日期
                    this.noInputContent = true;  // 显示提示框 
                    setTimeout(() => {           // 2s后关闭提示框
                        this.noInputContent = false; 
                    },2000) 
                }
                this.canHandle = true;      // 允许操作
               
           }
        },
        // 更改事项状态
        changeFinishStatus (currentItem) {
            if(this.canHandle) {
                this.canHandle = false;  // 禁止操作
                currentItem.isFinish = !currentItem.isFinish // 改变事项状态
                this.canHandle = true;  // 允许操作
            }
        },
        // 删除事项
        delItem (selectId) {
            if (this.canHandle) {       
                this.canHandle = false;         // 禁止操作
                this.todoArr = this.todoArr.filter(item => {    // 将事项总列表过滤掉要删除的项目
                    return item.id != selectId
                })
            }
            this.canHandle = true;
        },
        // 恢复事项
        recoveItem (item) {
            if (this.canHandle) {
                this.canHandle = false;     // 禁止操作
                this.isDisabled = true;     // 输入框禁止输入
                this.inputText = item.text; // 输入框内容为恢复事项文本
                this.showSureBtn = true;    // 显示恢复按钮
                this.recoveObj = item       // 保存要恢复的事项
            }
            this.canHandle = true;      // 允许操作
        },
        // 确认恢复
        sure () {
            if (this.canHandle) { 
                this.canHandle = false;   // 禁止操作
                if (this.inputDate) {   // 有选择日期
                    this.recoveObj.overDate = (new Date(this.inputDate).getTime()) / 1000;  // 更新过期时间
                    this.recoveObj.isOver = this.isover;                                    // 更改过期状态
                    this.isDisabled = false;        // 输入框恢复可输入
                    this.showSureBtn = false;       // 隐藏恢复确认按钮
                    this.inputText = "";            // 重置输入框
                    this.inputDate = "";            // 重置日期
                    this.recoveObj = null;          // 重置临时存储事项 
                }else {                             // 没有选择日期
                    this.noInputContent = true;     // 显示提示 2s后隐藏显示
                    setTimeout(() => {          
                        this.noInputContent = false;
                    },2000)
                   
                }
                this.canHandle = true;             // 允许操作
            }
            
        },
        // 获取本地存储中的事项列表 
        getTodoArr () {
            localStorage.getItem("todoArr") ? ( this.todoArr = JSON.parse(localStorage.getItem("todoArr") ) ) : ( this.todoArr = [] )
        },
        // 监控系统时间 更改事项过期状态
        toggleOver () {
            this.dateTimer = setInterval(() => {
                this.systemDate = new Date().getTime() / 1000;
                if (this.todoArr) {
                    this.todoArr.forEach(item => {
                        if (item.overDate < this.systemDate) {
                            item.isOver = true
                        }
                    })
                }
            }, 1000)
        }

    },
    computed: {
        // 正在进行的事项数据列表
        unfinishArr : function () {
            return this.todoArr.filter(item => {
                return (!item.isFinish) && (!item.isOver) 
            })
        },
        // 已经完成的事项数据列表
        finishArr : function () {
            return this.todoArr.filter(item => {
                return (item.isFinish) && (!item.isOver) 
            })
        },
        // 已经过期的事项数据列表
        overArr : function () {
            return this.todoArr.filter(item => {
                return item.isOver
            })
        },
        // 返回用户新添加的事项选择的日期是否过期
        isover : function () {
            // 有选择日期 并且 选择日期的时间戳小于实时系统时间戳 为已过期 否则 未过期
            if ( this.inputDate && ( new Date(this.inputDate).getTime() / 1000   <  this.systemDate) ) {
                return true
            } else {
                return false
            } 
        }

    },
    created() {
        // 获取本地事项列表数据
        this.getTodoArr();
        // 监控系统时间 更改事项过期状态
        this.toggleOver()
    },
    // 监听
    watch: {
        todoArr: {
            handler: function () { 
                localStorage.setItem("todoArr",JSON.stringify(this.todoArr))
            },
            deep: true
        }
    },
    // 组件
    components: {
        todoBox
    }
}
</script>

<style lang="scss" >
.container {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}
header {
    width: 100%;
    height: 100px;
    background-color: #FFBCBC; 
    border-radius: 20px 20px 0px 0px;
    h2 {
        font-size: 36px;
        display: inline-block;
    }
    div {
        position: relative;
        
        input{
            vertical-align: middle;
            height: 30px;
            line-height: 30px; 
            border-radius: 15px;
            margin-right: 10px; 
            outline: none;
            border: 2px solid #87ceeb;
        }
        .textInp {
            width:400px;
            padding: 10px 30px;
            font-size: 22px;
        }
        .dateInp {
            width: 190px;
            padding: 5px;
            font-size: 15px;
        }
        button {
            vertical-align: middle;
            margin-left: 10px;
            height: 40px;
            line-height: 34px;
            width: 60px;
            border-radius: 5px;
            font-size: 22px;
            background-color: #87ceeb;
            color: #fff;
            border: 2px solid #000;
            cursor: pointer;
        }
        .aleat-box {
            user-select: none;
            position: absolute;
            left: 428px;
            top: 55px;
            display: block;
            width: 140px;
            font-size: 13px;
            text-align: center;
            line-height: 50px;
            height: 50px;
            z-index: 20;
            background-color: #fff;
            border-radius:  50% / 50%;
            border: 2px dotted #87ceeb;
            color: #687980;
            &::after {
                content: "";
                display: block;
                position: absolute;
                transform: rotate(120deg);
                z-index: 1;
                left: 17px;
                top: -6px;
                width: 20px;
                height:20px;
                border-left: 2px dotted #87ceeb;
                border-bottom: 2px dotted #87ceeb;
                background-image:linear-gradient(45deg,#fff 50%, rgba(0,0,0,0) 0);
                
            }
        } 
    }

}

main { 
    width: 100%;
    background-color: #FFEACA;
    padding: 20px 0 5px;
    border-radius: 0px 0px 20px 20px; 
    .listbox1 {
        background-color: #A2DBFA;
        border: 5px solid #343F56;
        .title {
            span {
                border: 3px solid #F7A440 ; 
            }
        }
        ul {
            li { 
                border-bottom: 2px dashed #A0937D ;
            }
        }
    }
    .listbox2 {
        background-color: #C2B8A3;
        border: 5px solid #FF6701;
        .title {
            span {
                border: 3px solid #687980; 
            }
        }
        ul {
            li {
                
                border-bottom: 2px dashed #FAF3F3;
            }
        }
    }
    .listbox3 {
        background-color: #D6D2C4;
        border: 5px solid #444444;
        .title {
            span {
                border: 3px solid #687980; 
            }
        }
        ul {
            li {
                
                border-bottom: 2px dashed #F9F9F9;
            }
        }
    }
}
</style>