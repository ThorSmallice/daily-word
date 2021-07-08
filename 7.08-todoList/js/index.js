let app = new Vue({
    el: "#app",
    data: {
        inputText:"",
        inputList: [],
        hasContent: true,
        canChange: true
    },
    methods: {
        addItem () {
            if (this.canChange) {
                this.canChange = false;
                if(this.inputText) {
                    this.inputList.push({
                        id: Math.ceil(Date.now()),
                        text: this.inputText,
                        isFinish: false,
                    })
                    this.inputText = ""
                } else {
                    this.hasContent = false;
                    setTimeout(() => {
                        this.hasContent = true;
                    },2000)
                }
            }
        },
        changeStatus (item) {
            if (this.canChange) {
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
        }
    },
    computed: {
        loginList : function () {
            return this.inputList.filter((item) => {
                return item.isFinish == false;
            })
        },
        finishList: function () {
            return this.inputList.filter((item) => {
                return item.isFinish == true;
            })
        }
        
    },
    watch: {
        inputList: {
            handler:  function (newm, oldm) { 
                 localStorage.setItem("inputList",JSON.stringify(this.inputList));
            },
            deep : true
        }
    },
    created() {
        this.getinfoList()
    }
})