import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Icon, Button, Search, Image as VanImage, Empty, Loading } from 'vant'
import 'vant/lib/index.css'

// 创建Vue应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()

// 使用插件
app.use(router)
app.use(pinia)
app.use(Icon)
app.use(Button)
app.use(Search)
app.use(VanImage)
app.use(Empty)
app.use(Loading)

// 挂载到DOM
app.mount('#app')
