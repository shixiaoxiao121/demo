import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
    routers:[
        {
            path:'/',
            component:Login
        }
    ]
})
