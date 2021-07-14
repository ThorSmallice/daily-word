<template>
    <div id="productbox">
        <div class="table">
            <div class="table-header">
                <div>
                    <span><input class="inpcheck" type="checkbox" :checked="allcheck" @change="checkChangeAll">全选</span>
                    <span>商品名称</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>小计</span>
                    <span>操作</span>
                </div>
            </div>

            <div class="table-body">
               <div>
                   <template v-for="item in dataList">
                    <div class="table-tr" :key="item.id">
                        <span>
                            <input class="inpcheck" type="checkbox" @change="changeCheck(item)" :checked="item.isCheck">
                        </span>
                        <span>{{ item.productName }} </span>
                        <span> {{ item.productPrice }} </span>
                        <span> <input class="inpcount" type="number" v-model.number="item.productCount"></span>
                        <span> {{  (item.productPrice * item.productCount).toFixed(2)  }} </span>
                        <span> 
                            <button class="delbtn" @click="delItem(item.id)">删除</button>    
                        </span>
                    </div>
               </template>
               </div>
            </div>

            <div class="table-footer">
                <div>
                    <span>已选商品：{{ checkArr.length }}</span>
                    <span>总价：{{ getTotalPrice }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data-list", "allcheck", "check-arr"],
    data: function () {
        return {
           
        }
    },
    methods: {
        changeCheck (item) {
            item.isCheck = !item.isCheck
        },
        delItem(currentId) {
            this.$emit("del-Item", currentId)
        },
        checkChangeAll () {
            this.$emit("change-all")
        } 
    },
    computed: {
        getTotalPrice () {
            let totalPrice = 0;
            this.checkArr.forEach(item => {
                totalPrice += item.productPrice * item.productCount
            })
            return totalPrice.toFixed(2)
        }
    }
     
}
</script>

<style lang="scss" scoped>
    #productbox {
        width: 100%;
        .table {
            width: 80%; 
            margin: 0 auto;
            .inpcheck {
                width: 20px;
                height: 20px;  
            }
            .inpcount {
                outline: none;
                border: 2px solid #ccc;
                border-radius: 5px;
                width: 50px;
                height: 20px;
            }
            .table-header,.table-body,.table-footer {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                line-height: 30px;
                span {
                    display: inline-block; 
                    width: 14.2%;
                    padding: 10px 5px;
                    font-size: 18px; 
                    text-align: center; 
                }
                div { 
                    width: 100%;
                }
            }
            .table-header {
                div{ 
                   
                    background-color: #fff;
                    border-radius: 20px 20px 0 0 ; 
                } 
            }
            .table-body {
                .delbtn {
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 600;
                    user-select: none;
                    letter-spacing: 2px;
                    width: 80px;
                    height: 35px;
                    line-height: 31px;
                    background-color: #fff;
                    border: 2px solid #87ceeb;
                    border-radius: 5px;
                    &:hover {
                        color: #fff;
                        background-color: #ccc;
                    }
                }
            }
            .table-footer { 
                div{ 
                    
                    background-color: #fff;
                    border-radius: 0 0 20px 20px  ; 
                } 
            }
            .table-tr { 
                 
                color: #fff;
                &:nth-child(even) {
                    background-color: rgb(116, 112, 112);
                }
                 &:nth-child(odd) {
                    background-color: rgb(106, 141, 238);
                }
            }
        }
    }
</style>