let app = new Vue({
    el: "#app",
    data: {
        inputText:"",
        inputDate:"",
        inputList: [],
        hasContent: true,
        canChange: true,
        nowDate: new Date(),
        dateTimer: null,
        showSureBtn : false,
        isDisabled : false,
        recoveObj: null
    },
    methods: {
        addItem () {
            if (this.canChange) {
                this.canChange = false;
                if(this.inputText && this.inputDate) {
                    this.inputList.push({
                        id: Math.ceil(Date.now()),
                        text: this.inputText,
                        isFinish: false,
                        overDate: (new Date(this.inputDate).getTime()) / 1000,
                        isOver: this.isover
                    })
                    this.inputText = "";
                    this.inputDate = "";
                } else {
                    this.hasContent = false;
                    setTimeout(() => {
                        this.hasContent = true;
                    },2000)
                    this.canChange = true
                }
            } 
        },
        getinfoList () {
            if (localStorage.getItem("inputList"))  {
                this.inputList = JSON.parse(localStorage.getItem("inputList"))
            } else {
                this.inputList = []
            }
        },
        recoveItem (item) {
            this.isDisabled = true;
            this.inputText = item.text;
            this.showSureBtn = true;
            this.recoveObj = item
        },
        sure() {
            if (this.inputDate) {
                this.isDisabled = false;
                this.showSureBtn = false;
                this.recoveObj.overDate = (new Date(this.inputDate).getTime()) / 1000;
                this.recoveObj.isOver = this.isover;
                this.inputText = "";
                this.inputDate = "";
                this.recoveObj = null; 
            }else {
                this.hasContent = false;
                setTimeout(() => {
                    this.hasContent = true;
                },2000)
                this.canChange = true
            }
            
        },
        // 监控系统时间 更改事项过期状态
        toggleOver () {
            this.dateTimer = setInterval(() => {
                this.nowDate = new Date();
                if (this.inputList) {
                    this.inputList.forEach(item => {
                        if (item.overDate < (this.nowDate.getTime() )/ 1000) {
                            item.isOver = true
                        }
                    })
                }
            }, 1000)
        }
    },
    computed: {
        loginList : function () {
            return this.inputList.filter((item) => {
                return (item.isFinish == false) && (item.isOver == false);
            })
        },
        finishList: function () {
            return this.inputList.filter((item) => {
                return (item.isFinish == true) && (item.isOver == false);
            })
        },
        overtimeList: function () {
            return this.inputList.filter(item => {
                return item.isOver == true
            })
        },
        isover : function () {
            if (this.inputDate && (new Date(this.inputDate).getTime()) /1000 < (this.nowDate.getTime() )/ 1000) {
                return true
            } else {
                return false
            }
        }
        
    },
    watch: {
        inputList: {
            handler:  function () { 
                localStorage.setItem("inputList",JSON.stringify(this.inputList));
            },
            deep : true
        }
    },
    created() {
        this.getinfoList();
        this.toggleOver();
    },
    components: {
        "event-list" : {
            template: "#eventlist",
            props: ["data-arr","title-text"],
            data: function() {
                return {
                   
                }
            },
            methods: {
                toggleChangeStatus() {
                    this.$parent.canChange = true; 
                },
                changeStatus(item) {
                    if(this.$parent.canChange) {
                        this.$parent.canChange = false;
                        item.isFinish = !item.isFinish 
                    } 
                },
                delItem(obj) {
                    if (this.$parent.canChange) {
                        this.$parent.canChange = false;
                        this.$parent.inputList = this.$parent.inputList.filter(item => {
                            return item.id != obj.id
                        })
                    }
                },
                recove(item) {
                    this.$emit("recover-item",item)
                }
            }
        }
    }
})