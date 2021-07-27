<template>
    <div id="comA">
        <fieldset>
            <legend>
                <h2>我是组件AAA</h2>
                <h3>当前vuex的name为: {{ $store.state.name}}</h3>
                <select @change="getCarousel" v-model="selectVal">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option> 
                </select>
                <ul>    
                    <template v-for="(item,index) in $store.state.hobbyArr">
                        <li :key="index">
                            {{item}}
                        </li>
                    </template>
                </ul>
                <button @click="changeName('詹姆斯')">点击我修改name值</button>
                <button @click="addHobby('打篮球','唱歌')">点我添加爱好</button>
                <hr>

                <ul>
                    <template v-for="(item, index) in $store.state.carouselArr">
                        <li :key="index"><img :src="item" style="width:200px"></li>
                    </template>
                </ul>
            </legend>

        </fieldset>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            selectVal : 1
        }
    },
    methods: {
        changeName (newName) {
           this.$store.commit("vuexChangeName",newName)
        },
        addHobby(hobbya,hobbyb) {
            this.$store.commit("vuexAddHobby",[ hobbya, hobbyb ] )
        },
         getCarousel() {
            // this.$store.dispatch("actionsGetCarouserl",this.selectVal);
            this.$store.dispath("actionsGetCarouserl",this.selectVal);
            
        },
        created() {
            this.getCarousel()
        }
    }
}
</script>

<style>

</style>