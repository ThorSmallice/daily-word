<template>
    <a-layout-sider id="comSider" collapsible v-model="collapsed">
        <a-menu 
        theme="dark" 
        mode="inline" 
        v-model="selectedKeys" 
        @click="onMenu" 
        :openKeys.sync="$store.state.siderObj.subMenuActiveArr"
        >
            <a-menu-item key="home">
                 <a-icon type="home"/>
                <span>首页</span>
            </a-menu-item>

            <a-sub-menu key="activity">
                <template #title>
                    <a-icon type="shopping" />
                    <span>活动设置</span>
                </template>

                <a-menu-item key="data">
                    <a-icon type="calendar" />
                    <span>日期设置</span>
                </a-menu-item>

                <a-menu-item key="session">
                    <a-icon type="database" />
                    <span>场次设置</span>
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="user">
                <template #title>
                    <a-icon type="usergroup-delete" />
                    <span>用户管理</span>
                </template>

                <a-menu-item key="appointment">
                    <a-icon type="cluster" />
                    <span>预约信息</span>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>

        <template #trigger>
            <a-icon type="menu-unfold"  v-if="collapsed"/>
            <a-icon type="menu-fold" v-else/>
        </template>
    </a-layout-sider>
</template>

<script>
export default {
    data: function () {
        return {
            collapsed: false, 
            selectedKeys: this.$store.state.siderObj.siderActiveArr
        }
    },
    methods: {
        onMenu(evObj) {  
            // console.log(evObj);
            // 如果点击跳转的地址时当前页 ，刷新
            if(this.$store.state.siderObj.siderActiveArr[0] === evObj.key) {
                window.location.reload();
            } else { // 点击侧边栏按钮，页面跳转
                 // 存储路径
                sessionStorage.setItem(
                    "siderActiveArr",
                    JSON.stringify(evObj.keyPath)
                );
                // 更改激活的侧边按钮
                this.$store.commit("changesiderActiveArr",evObj.keyPath);
                // 增加一个选项卡
                this.$store.commit("changeTableList",evObj);
                this.$router.push(evObj.key); 
            } 
        }
    }, 
    watch: {
        "$store.state.siderObj.siderActiveArr" : function () { 
            this.selectedKeys = this.$store.state.siderObj.siderActiveArr
        }
    }

}
</script>

<style>

</style>