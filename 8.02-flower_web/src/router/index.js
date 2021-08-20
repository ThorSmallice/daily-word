import Vue from 'vue'
import VueRouter from 'vue-router' 
 
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name:"Index",
        component: () => import('./../views/Index')
    },
    {
        path: "/appointment",
        name: "Appointment",
        component: () => import('./../views/Appointment')
    },
    {
        path: "/myappoint/:id",
        name: "myAppointment",
        component: () => import('./../views/MyAppointment')
    },
    {
        path:"*",
        redirect: "/"
    }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
    const ignore = ['/'];
    if (ignore.includes(to.path)){
        next()
    } else {
        if (document.cookie && document.cookie.split("=")[1].length !== 0 ) {
            next()
        }else {
            next('/')
        }
    }
})
export default router
