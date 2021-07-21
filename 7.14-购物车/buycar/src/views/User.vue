<template>
    <div id="user">
        user
        {{$route.params.id}}
    </div>
</template>

<script>
export default {
    beforeRouteUpdate (to, from, next) {
        console.log(to);
        console.log(from);
        next(to.pullPath)
    }
    
}
</script>

<style>

</style>