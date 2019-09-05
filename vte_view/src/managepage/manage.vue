<template>
	<div class="patient fillcontain" style="height: 60px;background-color: #324057;">
		<el-menu :default-active="defaultActive" mode="horizontal" theme="dark" router >
			<div  v-for="(item, index) in  $router.options.routes[1].children" :key="index" >
					<el-menu-item :index="item.meta.path" v-if="item.meta.menuShow" >
						{{item.meta.menuName}}
					</el-menu-item>
			</div>
			<div><el-button type="primary" @click="signout" class="signout" size="small">退出</el-button></div>

		</el-menu>
		<el-col :span="24" style="overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
		</el-col>
  </div>
</template>

<script>
		import {setSessionStorage,getSessionStorage} from '../config/mUtils'
		import menuconstants from '../constants/menuconstants'
		import {logout} from '@/api/getData'
		import router from '../router'
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path;
			}
		},
			created(){
            this.refreshrouter();
			},
			methods: {
				refreshrouter(){
					 const userString =	getSessionStorage("LOGIN_USER");
					 const userINFO = JSON.parse(userString);
					 const loginModelPojoList =  userINFO.loginModelPojoList;
					 loginModelPojoList.forEach((itemModel, index) => {
						    if(itemModel.modelCode == menuconstants.systemRootCode){
									const list = itemModel.loginModelPojoList;
									router.options.routes[1].children.forEach((item, index) => {
											var menuShow = false;
											list.forEach((sitemModel, index) => {
													const key = "M"+sitemModel.modelCode.replace("-","_");
													if(menuconstants.routernextpath[key]!=null){
															if(menuconstants.routernextpath[key] ==item.meta.path ){
																menuShow = true;
															}
													}
											});
											item.meta.menuShow = menuShow;
									});
								}
						});
				},
				async signout(){
					//请求注销地址
					await logout();
					//本地缓存清除
					setSessionStorage("LOGIN_USER",null);
					//跳转到登录页面
					this.$router.push("/");
				}
			}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.signout{
		float: right;
		margin: 15px 20px 0 0;
	}
</style>
