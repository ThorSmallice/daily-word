<template>
    <a-layout id="Index">
        <a-layout-header class="header"> </a-layout-header>

        <a-layout>
            <comSider></comSider>

            <a-layout>
                <a-tabs 
                type="editable-card"
                v-model="$store.state.activeKey"
                @change="toggleTab" 
                >
                        <a-tab-pane v-for="item in $store.state.tabList" :key="item.key" :tab="item.title"></a-tab-pane>
                </a-tabs>

                <router-view></router-view>
            </a-layout>

        </a-layout>
    </a-layout>
</template>

<script>
import comSider from "../components/ComSider.vue";
export default {
    data: () => {
        return {
        
        };
    },
    components: {
        comSider,
    },
    methods:{
        toggleTab(activekey) {
           
            // 界面跳转
            this.$router.push(activekey)
            // 更改激活类
            this.$store.commit("changesiderActiveArr", this.$store.state.siderPathObj[activekey])
            
        }
    }
};
</script>

<style lang="scss" scoped>
#Index {
  height: 100%;
}
</style>