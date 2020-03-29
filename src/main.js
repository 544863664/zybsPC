import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import SlideVerify from 'vue-monoplasty-slide-verify' //图片滑块*****
import { Message  } from 'element-ui';
import './assets/styles/reset.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.use(SlideVerify)

Message.install = function (Vue) {
  Vue.prototype.$message = Message
}
Vue.use(Message); //消息提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
