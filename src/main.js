import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/icons/ico.css'

import axios from "axios";
axios.defaults.baseURL='http://localhost:8080'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app=createApp(App)
app.config.globalProperties.$http=axios
app.use(ElementPlus, { locale })
app.use(router).mount('#app')
