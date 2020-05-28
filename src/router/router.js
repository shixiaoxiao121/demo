import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
    routes:[
        {
            path:'/',
            name:"login",
            component: ()=>import('../components/login')
        },
        {
            path: '/register',
            component: ()=>import("../components/register")
        }
    ]
})
