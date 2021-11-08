<template>
    <div id="app">
        <router-view></router-view> 
        <footer>
            <a href="https://beian.miit.gov.cn/"> 粤ICP备2021112566号</a>
        </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#app {
    width: 1366px; 
    margin: 0 auto;
    footer {
        width: 1366px;
        text-align: center;
        padding: 20px 0; 
        margin-top:50px;
    }
    
}
</style>