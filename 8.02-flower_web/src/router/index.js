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
    }
]

const router = new VueRouter({
  routes
})

export default router
