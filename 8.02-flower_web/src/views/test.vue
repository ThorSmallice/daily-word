<template>
    <div id="test">
        test
    </div>
</template>

<script>
export default {
     mounted() {
        this.axios({
            method: 'post',
            url: "/api/auth/sso",
            data: {
                username: "13763351376",
                password: 'string'
            }
        }).then(res => console.log(res) , err => console.log(err))
     }
}
</script>

<style>

</style>