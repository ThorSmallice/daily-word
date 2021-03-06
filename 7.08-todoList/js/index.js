let app = new Vue({
    el: "#app",
    data: {
        inputText:"",
        inputDate:"",
        inputList: [],
        hasContent: true,
        canChange: true,
        nowDate: new Date(),
        dateTimer: null
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
                    console.log(this.inputList);
                } else {
                    this.hasContent = false;
                    setTimeout(() => {
                        this.hasContent = true;
                    },2000)
                    this.canChange = true
                }
            } 
        },
        changeStatus (item) {
            if (this.canChange) {
                this.canChange = false;
                item.isFinish = !item.isFinish 
            }
        },
        delItem (oitem) {
            if(this.canChange) {
                this.inputList = this.inputList.filter((item) => {
                    return item.id != oitem.id
                })
            }
        },
        getinfoList () {
            if (localStorage.getItem("inputList"))  {
                this.inputList = JSON.parse(localStorage.getItem("inputList"))
            } else {
                this.inputList = []
            }
        },
        toggleChangeStatus() {
            this.canChange = true; 
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
    }
})