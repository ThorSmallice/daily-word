<template>
    <div id="james">
        <h2>James</h2>
        <select @change="getCarousel" v-model="selectVal">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option> 
        </select>

        <comA></comA>
        <comB></comB>
    </div>
</template>

<script>
import comA from './../components/comA.vue'
import comB from './../components/comB.vue'
export default {
    data: function () {
        return {
            selectVal : 1
        }
    },
    components: {
        comA,
        comB
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