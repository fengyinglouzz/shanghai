import 'babel-polyfill';
require('es6-promise').polyfill();
import 'fetch-detector';
import 'fetch-ie8';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import breadFetch, { fetch } from './config/bread-fetch';
import './common/common.js';
import 'element-ui/lib/theme-default/index.css';


global.fetch = fetch
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
if(breadFetch.interceptors){
	breadFetch.interceptors.push((req, next) => {
	//console.log('interceptors')
	next((res, after) => {
			console.log('interceptorsAfter');
			if(res.status == 220){//登录超时 跳转到登录页
				Message({
					type: 'error',
					message: "登录超时,请重新登录"
				});
				router.push("/");
			}if(res.status == 221){//无权限访问
				Message({
					type: 'error',
					message: "您无权限访问"
				});
				router.push("/");
			}else{
				after();
			}	
		})
	})
}else{
	
}


// 这个官方名字叫导航守卫，挺形象的
router.beforeEach((to, from, next) => {
	// 如果是去登录或注册，那就先把user移除 
	if (to.path === '/login' || to.path === '/regin') {
		sessionStorage.removeItem('LOGIN_USER')
	}
	let user = JSON.parse(sessionStorage.getItem('LOGIN_USER'))
	if (!user && (to.path === '/manger/my' || to.path === '/manger/send' || to.path === '/manger/history')) {
		next({ path: '/login' })
	} else {
		next()
	}
})

