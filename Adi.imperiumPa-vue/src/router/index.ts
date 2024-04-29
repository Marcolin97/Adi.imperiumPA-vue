import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../components/Dashboard.vue"
import Login from "../components/Login.vue"
import GestUser from "../components/GestUser.vue"
import GestPuat from "../components/GestPuat.vue"
import Determine from "../components/Determine.vue"
import Password from "C:/dev/project/Adi.imperiumPA-vue/Adi.imperiumPa-vue/src/components/Password.vue";
import Report from "../components/Report.vue"
import Contatti from "../components/Contatti.vue"


const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard, 
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/utenti',
        name: 'Utenti',
        component: GestUser,
    },
    {
        path: '/pazienti',
        name: 'Pazienti',
        component: GestPuat,
    },
    {
        path: '/determine',
        name: 'Determine',
        component: Determine,  
    },
    {
        path: '/password',
        name: 'Password',
        component: Password,  
    },
    {
        path: '/report',
        name: 'Report',
        component: Report,
    },
    {
        path: '/contatti',
        name: 'Contatti',
        component: Contatti,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    async scrollBehavior() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ left: 0, top: 0 })
        }, 500)
    })
}
})

export default router