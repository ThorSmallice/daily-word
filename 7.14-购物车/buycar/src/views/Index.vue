<template>
    <div id="index">
        <div class="container">
            <header>
                <div class="input-box">
                    <input class="inp-name" type="text" placeholder="商品名称" v-model.lazy.trim="inpName"> 
                    <input class="inp-price" type="text" placeholder="商品单价" v-model.lazy.number="inpPrice">
                    <input class="inp-count" type="number" min="0" v-model.lazy="inpCount">
                </div>
                
                <div class="btn-box">
                    <button @click="addProduct"> 加入购物车 </button>
                    <button @click="delAll">清空购物车</button>
                </div>
            </header>

            <main>
                <product-table 
                class="product-table"
                :data-list="productArr"
                @del-Item="delItem"
                :allcheck="allCheck"
                @change-all="changeAll"
                :check-arr="getCountPrice"
                >
                </product-table>
            </main>
        </div> 
    </div>
</template>

<script>
import productTable from "./../components/ProductBox.vue";
export default {
    data: function () {
        return {
            inpName: "",        // 输入框 商品名
            inpPrice: "",       // 输入框 商品单价
            inpCount: 0,        // 输入框 商品数量 
            productArr: [       // 购物车的商品列表
                {
                    id: 1,
                    productName:  "篮球",
                    productPrice:  "50",
                    productCount:  "2",
                    isCheck: false
                }
            ],
            // totalPrice : "",
            // checkCount: "",
            canHandle: true,
            allCheck: false // 全选
        }
    },
    methods: {
        // 加入购物车
        addProduct() {
            if (this.canHandle) {
                if (this.inpName && this.inpPrice && this.inpCount) {
                    if (Number(this.inpPrice)) {
                        this.productArr.push({
                            id: Date.now(),         // 商品id 
                            productName: this.inpName,  // 名称
                            productPrice: Number(this.inpPrice),  // 价格
                            productCount: this.inpCount,    // 数量
                            isCheck: false

                        }) 
                        this.inpName = "";
                        this.inpPrice = "";
                        this.inpCount = 0;
                    } else {
                        this.inpPrice = "";
                        alert("请输入正确的商品数量，必须是数字")
                    }
                }
            }
        },
        // 删除购物车单个商品
        delItem(currentId) {
            this.productArr = this.productArr.filter(item => {
                return item.id != currentId;
            })
        },
        // 清空购物车
        delAll() {
            this.productArr = []
        },
        // 全选
        changeAll() {
            if (this.allCheck) {
                this.allCheck = false;
                this.productArr.forEach(item => { 
                    item.isCheck = false
                }) 
            } else {
                this.allCheck = true;
                this.productArr.forEach(item => { 
                    item.isCheck = true
                }) 
            }
        },
        // 获取本地数据
        getProductArr () {
            if (localStorage.getItem("productArr")) {
                this.productArr = JSON.parse(localStorage.getItem("productArr"));
            } else {
                this.productArr = [        
                    {
                        id: 1,
                        productName:  "篮球",
                        productPrice:  "50",
                        productCount:  "2",
                        isCheck: false
                    }
                ]    
            }
        }
        

    },
    watch: {
        productArr : {
            handler: function () {
                this.allCheck = this.productArr.every(item => {
                    return item.isCheck
                });

                localStorage.setItem("productArr",JSON.stringify(this.productArr));
            },
            deep : true
        }
    }, 
    computed: {
        // 计算已经选择的商品数量和总价格
        getCountPrice() { 
           return this.productArr.filter(item => {
               return item.isCheck
           })
        }
    },
    components: {
       "product-table": productTable
    },
    created() {
        this.getProductArr()
    }
}
</script>

<style lang="scss" scoped>
    #index {
        width: 100%;
        .container {
            width: 80%;
            margin: 0 auto;
            background-color: pink; 
            border-radius: 20px;
            padding: 10px 20px;
            header {
                display: flex;
                justify-content: space-around;
                align-items: center; 
                padding: 10px 20px;
                height: 50px;
                border-radius: 10px;
                .input-box {
                    width: 70%;
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-evenly;
                    align-items: center;
                    input {
                        outline: none;
                        border: 2px solid #87ceeb;
                        border-radius: 15px;
                        font-size: 18px;
                        height: 35px;
                        padding: 10px; 
                    }
                    .inp-name {
                        width: 40%;
                    }
                    .inp-price {
                        width: 30%;
                    }
                    .inp-count {
                        width: 10%;
                    }
                }
                .btn-box {
                    width: 30%;
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-evenly;
                    align-items: center;
                    button {
                        cursor: pointer;
                        width: 45%;
                        height: 40px; 
                        line-height: 30px;
                        font-size: 18px; 
                        border: 2px solid #87ceeb;
                        border-radius: 10px;
                        background-color: #ccc;
                        color: #fff;
                        font-weight: 600;
                        &:hover {
                            background-color: #fff;
                            color: red;
                        }
                    }
                }
            }
            main { 
                padding: 10px 20px; 
                border-radius: 10px; 
            }
        }
    }
</style>