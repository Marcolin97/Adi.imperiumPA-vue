import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../components/Dashboard.vue"
import Login from "../components/Login.vue"
import GestUser from "../components/GestUser.vue"
import GestPaut from "../components/GestPaut.vue"
import Determine from "../components/Determine.vue"

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
        component: GestPaut,
    },
    {
        path: '/determine',
        name: 'Determine',
        component: Determine,  
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