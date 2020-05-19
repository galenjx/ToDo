// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路you
Vue.use(VueRouter)

// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// import Vue from 'vue';
import {
 
  Input,
  Divider,
  Checkbox,
  MessageBox,
  Message ,
 
  Button,
 
} from 'element-ui';

Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Divider);



Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;








// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  // router, // 1.4 挂载路由对象到 VM 实例上
  // store // 挂载 store 状态管理对象
})