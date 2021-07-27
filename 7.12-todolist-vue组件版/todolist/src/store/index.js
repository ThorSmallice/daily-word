import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name : "melon",
        age: 21,
        hobbyArr: ["敲代码","弹钢琴","开宝马"],
        carouselArr: []
    },
    mutations: {    // 支持同步代码
        vuexChangeName (state,val) {
            state.name = val;
        },
        vuexAddHobby(state,val) { 
            state.hobbyArr = [ ...state.hobbyArr,...val]
        },
        vuexGetCarousel (state,val) {
            state.carouselArr =  val
            console.log(state);
        },
        actionsGetCarouserl(state,carouselId) {
            // console.log(carouselId);
            // console.log(ctx); // 连接上下文的一个对象
            let xhr =  new XMLHttpRequest(); 
            xhr.open("GET",`http://student.0melon0.cn/index/index/get_carousel?position_id=${carouselId}`);
            xhr.send();
            xhr.addEventListener("readystatechange",function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let res = JSON.parse(xhr.responseText);
                        state.carouselArr = res.data
                    }
                }
            })
        }
         
    },
    actions: {      // 支持异步代码
        // actionsGetCarouserl(ctx,carouselId) {
        //     // console.log(carouselId);
        //     // console.log(ctx); // 连接上下文的一个对象
        //     let xhr =  new XMLHttpRequest(); 
        //     xhr.open("GET",`http://student.0melon0.cn/index/index/get_carousel?position_id=${carouselId}`);
        //     xhr.send();
        //     xhr.addEventListener("readystatechange",function() {
        //         if (xhr.readyState == 4) {
        //             if (xhr.status == 200) {
        //                 let res = JSON.parse(xhr.responseText);
        //                 ctx.commit("vuexGetCarousel", res.data)
        //             }
        //         }
        //     })
        // }
    },
    modules: {
    }
})
