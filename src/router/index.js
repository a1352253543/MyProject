// 引入Vue
import Vue from 'vue'


// 引入路由器
import VueRouter from 'vue-router'

// 引入组件
import OsmMap from '../pages/OsmMap'
import GaoDeMap from '../pages/GaoDeMap'
// import Layout from '../components/Layout'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 创建路由器
export default new VueRouter({
    routes:[
        {
            path:'/OsmMap',
            component:OsmMap
        },
        {
            path:'/GaoDeMap',
            component:GaoDeMap
        }
    ]
})


