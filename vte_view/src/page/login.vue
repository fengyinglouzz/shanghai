<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>VTE院内防治管理平台</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="form_contianer_item">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">重置</el-button>
				  	</el-form-item>
				</el-form>
				<!--<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>-->
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
    import {setSessionStorage,getSessionStorage} from '../config/mUtils'
	import menuconstants from '../constants/menuconstants'
	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
				isGoNextpage:false,//是否成功跳转
			}
		},
		mounted(){
			this.showLogin = true;
		},
		computed: {
			
		},
		methods: {
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							const res = await login({userAccount: this.loginForm.username, userPassword: this.loginForm.password,piccode:'1111'});
							if (res.status == 1) {
								this.$message({
									type: 'success',
									message: '登录成功'
								});
								const userString =res.message;
								const userINFO = JSON.parse(userString);
								setSessionStorage("LOGIN_USER",userString);
								const loginModelPojoList =  userINFO.loginModelPojoList;
								this.isGoNextpage = false;
								this.jumpNextPage(loginModelPojoList);
							}else{
								this.$message({
									type: 'error',
									message: res.message
								});
							}
						}catch(err) {
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
			jumpNextPage(loginModelPojoList){
				if(loginModelPojoList!=null&&loginModelPojoList.length>0){
					loginModelPojoList.forEach((item, index) => {
						const key = "M"+item.modelCode.replace("-","_");
						if(menuconstants.routernextpath[key]!=null){
							if(!this.isGoNextpage){
								this.isGoNextpage = true;
							    this.$router.push(menuconstants.routernextpath[key]);
							}
						}else{
							this.jumpNextPage(item.loginModelPojoList)
						}
					});
				}
			}
		},
		watch: {
			/**userInfo: function (newValue){
				const userString = getSessionStorage("LOGIN_USER");
				if(userString!=null){
						const userINFO = JSON.parse(userString);
						if (userINFO) {
							this.$message({
								type: 'success',
								message: '检测到您之前登录过，将自动登录'
							});
							const loginModelPojoList =  userINFO.loginModelPojoList;
							this.jumpNextPage(loginModelPojoList);
						}
				}
			} */
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-image: url(../assets/img/login_bg.jpg);
		background-size:100% 100%;   
		.wh(100%, 100%);
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -40px;
		left: 0;
		p{
			font-size: 32px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		.submit_btn{
			width: 47%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: #999;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
