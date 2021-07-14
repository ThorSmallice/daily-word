<template>
    <div id="Index">
        <!-- 弹窗 -->
        <transition
        enter-active-class="animate__animated animate__fadeIn" 
        leave-active-class="animate__animated animate__fadeOut"
        > 
            <div class="diaglog-box" v-if="showDiaglog">
                <div class="diaglog">
                    <div class="close-box">
                        <span @click="cancelRecove">x</span>
                    </div>
                    <div class="inp-box">
                        <h3>恢复事项</h3>
                        <input type="text" disabled v-model.lazy.trim="recoveObj.text">
                        
                        <h3>选择过期时间</h3>
                        <input type="datetime-local" v-model="recoveOverDate">
                        <transition 
                            enter-active-class="animate__animated animate__fadeIn" 
                            leave-active-class="animate__animated animate__fadeOut"
                            >
                                <p class="aleat-date" v-if="showDateAleat">
                                    请选择正确的时间,必须大于系统时间！
                                </p>
                        </transition>

                    </div>
                    <div class="btn-box">
                        <button class="btn-sure" @click="sure">确认</button>
                        <button class="btn-no" @click="cancelRecove">取消</button>
                    </div>
                </div>
            </div>
        </transition>

        <header>
            <!-- 头部 -->
            <div class="container">
                <!-- 标题 -->
                <h2>todoList</h2>
                <!-- 输入框 日期选择 操作按钮 -->
                <div>
                    <input 
                    class="textInp" 
                    type="text" 
                    v-model.lazy.trim="inputText" 
                    @keyup.enter="addItem" 
                    placeholder="输入你即将要做的事情吧~" 
                    > 
                    <input class="dateInp" type="datetime-local" v-model.lazy="inputDate">
                    
                    <button @click="addItem" >新增</button>
                     
                    <transition 
                    enter-active-class="animate__animated animate__fadeIn" 
                    leave-active-class="animate__animated animate__fadeOut"
                    >
                        <p class="aleat-box" v-if="noInputContent">
                            请正确填写内容和未来时间哦~
                        </p>
                    </transition>

                    
                </div>
            </div>

        </header>

        <main>
            <!-- 事项列表 -->
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
            systemDate:  Date.now(),                    // 当前(实时)系统时间  
            showDiaglog: false,                        // 恢复按钮是否显示 默认否
            noInputContent: false,       // 控制输入提示 默认不提示 用户添加事项时若没有输入内容或时间再提示
            dateTimer: null,             // 监视系统时间更改过期事项状态的定时器
            recoveObj: null,             // 临时存储要恢复的事项
            recoveOverDate: "",
            showDateAleat: false
            
        }
    },
    // 方法
    methods: {
        // 添加新事项
        addItem () {
           if (this.canHandle) { // 允许操作 
                this.canHandle = false;  // 禁止操作 
                if (this.inputText && this.inputDate && new Date(this.inputDate).getTime() > this.systemDate) {
                    // 有输入文本和选择时间 并且选择的时间要在未来 也就是大于系统时间 就向数组添加一个新事项对象
                    this.todoArr.push({
                        id: Date.now(),                                         // 事项id
                        text: this.inputText,                                   // 事项内容
                        isFinish: false,                                        // 事项是否完成 默认未完成
                        overDate: new Date(this.inputDate).getTime(),          // 事项的过期时间戳
                        isOver: false                                           // 事项默认不过期
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
                this.recoveObj = item          // 保存要恢复的事项
                this.recoveOverDate = new Date(item.overDate + 60*60*8*1000).toISOString().substr(0,16);
                this.showDiaglog = true;       // 显示提示弹窗
            }
            this.canHandle = true;      // 允许操作  
        },
        // 确认恢复
        sure () {
            if (this.canHandle) { 
                this.canHandle = false;   // 禁止操作
                if (this.recoveObj.overDate && new Date(this.recoveOverDate).getTime()  > this.systemDate) {   // 有选择日期 并且时间是未来时
                    this.recoveObj.overDate = new Date(this.recoveOverDate).getTime();  // 更新过期时间
                    this.recoveObj.isOver = false;                                    // 更改过期状态
                     
                    this.showDiaglog = false;           // 隐藏弹窗 
                    this.recoveObj = null;          // 重置临时存储事项 
                    this.recoveOverDate = "";       // 重置临时存储事项日期
                }else {                             // 没有选择日期
                    this.showDateAleat = true;     // 显示提示 2s后隐藏显示
                    setTimeout(() => {          
                        this.showDateAleat = false;
                    },2000)
                   
                }
                this.canHandle = true;             // 允许操作
            }
            
        },
        // 取消恢复
        cancelRecove() {
            if (this.canHandle) {
                this.canHandle = false;         // 禁止操作 
                this.recoveObj = null;          // 重置临时存储的恢复事项
                this.recoveOverDate = "";       // 重置临时存储事项日期
                this.showDiaglog = false;       // 隐藏提示弹窗
            }
            this.canHandle = true;             // 允许操作
        },
        // 获取本地存储中的事项列表 
        getTodoArr () {
            localStorage.getItem("todoArr") ? ( this.todoArr = JSON.parse(localStorage.getItem("todoArr") ) ) : ( this.todoArr = [] )
        },
        // 监控系统时间 更改事项过期状态
        toggleOver () {
            this.dateTimer = setInterval(() => {
                this.systemDate =  Date.now();
                if (this.todoArr) {
                    this.todoArr.forEach(item => {
                        if (item.overDate < this.systemDate && item.isFinish == false) {
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
                return item.isFinish
            })
        },
        // 已经过期的事项数据列表
        overArr : function () {
            return this.todoArr.filter(item => {
                return item.isOver && !item.isFinish
            })
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
.diaglog-box{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100;
    .diaglog {
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%); 
        padding: 2%;
        display: flex; 
        flex-wrap: wrap;
        box-sizing: border-box;
        border-radius: 15px;
        width: 40%; 
        height: 450px;
        background: #fff;
        box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.2);
        .close-box {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            span { 
                user-select: none;
                cursor: pointer;
                display: block;
                border: 2px solid #87ceeb;
                border-radius: 3px;
                color: red;
                font-size: 18px;
                font-weight: 700;
                background-color: #fff;
                width: 25px; 
                height: 25px;
                line-height: 21px;
                text-align: center;
                &:hover {
                    background-color: #ccc; 
                    color: #fff;
                } 
            }
        } 
        .inp-box {
            position: relative;
            width: 100%;
            input {
                width: 70%;
                padding: 5px 10px;
                height: 30px;
                line-height: 30px; 
                border-radius: 15px;
                margin-right: 10px; 
                font-size: 16px;
                outline: none;
                border: 2px solid #87ceeb;
            }
            .aleat-date {
                position: absolute;
                left: 40px;
                bottom: -40px;
                padding: 10px 15px;
                border: 2px solid red;
                background-color: #F7A440;
                border-radius: 8px;
                color: #fff;
                font-weight: 600;
                font-size: 16px; 
            }
        }
        .btn-box {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            button {
                cursor: pointer;
                user-select: none;
                width: 20%;
                height: 70%; 
                font-size: 20px;
                text-align: center;
                letter-spacing: 5px;
                margin-left: 20px;
                border-radius: 10px;
                font-weight: 700;
                &:hover {
                    background-color: #ccc;
                    color: red;
                }
            }
            .btn-sure {
                background-color: #87ceeb;
                border: 2px solid #000;
                color: #fff;
               
            }
            .btn-no{
                background-color: #fff;
                border: 2px solid #000;
            }
        }
        
    }
}

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
            font-size: 13px;
            text-align: center;
            line-height: 50px;
            height: 50px;
            z-index: 20;
            background-color: #fff;
            padding: 5px 10px;
            border-radius: 10px;
            border: 2px dotted #87ceeb;
            color: #687980;
            &::after {
                content: "";
                display: block;
                position: absolute;
                transform: rotate(134deg);
                z-index: 1;
                left: 45px;
                top: -12px;
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