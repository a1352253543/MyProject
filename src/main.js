// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入ElementUI组件库
import ElementUI from 'element-ui';
// 引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-router插件库
import VueRouter from 'vue-router'
// 引入路由器
import router from './router/index'
// 关闭Vue的生产提示
Vue.config.productionTip = false
// 应用ElementUI
Vue.use(ElementUI);
// 应用vue-router插件库
Vue.use(VueRouter)


// 创建Vue实例对象vm
new Vue({
  el:'#root',
  render: h => h(App),
  router:router,
  tempelate:`<App></App>`,
  components:{App}
})