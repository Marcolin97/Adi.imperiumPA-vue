import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap-italia/dist/css/bootstrap-italia.min.css'
import router from './router'
import  ContextMenu  from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'



createApp(App).use(router).use(ContextMenu).mount('#app')
