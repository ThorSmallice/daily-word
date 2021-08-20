import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import("./../views/Index"), 
        redirect:"/home",
        children:[
            {
                path:'home',
                name: 'Home',
                component: () => import("./../views/index/Home")
            },
            {
                path:'data',
                name: 'Data',
                component: () => import("./../views/active/Data")
            },
            {
                path:'session',
                name: 'Session',
                component: () => import("./../views/active/Session")
            },
            {
                path:'appointment',
                name: 'Appointment',
                component: () => import("./../views/user/Appoinment")
            } 
        ]
    }
]

const router = new VueRouter({
  routes
})

export default router
