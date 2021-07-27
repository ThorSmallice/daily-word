<template>
    <fieldset>
        <legend>我是组件BBB</legend>
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

         <ul>
            <template v-for="(item, index) in $store.state.carouselArr">
                <li :key="index"><img :src="item" style="width:200px"></li>
            </template>
        </ul>
    </fieldset>
</template>

<script>
export default {
    data: function () {
        return {
            selectVal : 1
        }
    },
    methods: {
        getCarousel() {
            // this.$store.dispatch("actionsGetCarouserl",this.selectVal);
            this.$store.commit("actionsGetCarouserl",this.selectVal);
            
        }
    },
    created() {
        this.getCarousel()
    }
}
</script>

<style>

</style>