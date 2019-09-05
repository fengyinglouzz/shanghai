<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>VTE院内防治管理平台</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="form_contianer_item">
					
				</el-form>
				<!--<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>-->
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {sso} from '@/api/getData'
    import {setSessionStorage,getSessionStorage} from '../config/mUtils'
	import menuconstants from '../constants/menuconstants'
    import {baseUrl, baseImgPath} from '@/config/env'
	export default {
		inject: ['reload'],
	    data(){
			return {
				loginForm: {
					checkCode :  this.$route.query.checkCode,
				},
				isGoNextpage:false,//是否成功跳转
				patientQueryIndex:{},
				baseUrl,
				baseImgPath
			}
		},
		created(){
			this.submitForm();
		},
		methods: {
			async submitForm() {
						const res = await sso({checkCode: this.loginForm.checkCode})
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
							this.patientQueryIndex = menuconstants.patientQueryIndex;
							const patientQueryIndex = this.patientQueryIndex;
							if(res.modelCode&&res.patientHospitId){
								this.reload();
								if(res.modelCode == '1-001'){
									this.$router.push({ 
										path:'/patientQuery',
										query:{patientHospitId:res.patientHospitId}
            						});
								}else if(res.modelCode == '2'){
									this.$router.push({ 
										path:'/monitor'
            						});
								}else if(res.modelCode == '3'){
									this.$router.push({ 
										path:'/qualityControl'
            						});
								}else{
									this.$router.push({ 
										path:patientQueryIndex[res.modelCode],
										query:{patientHospitId:res.patientHospitId}
            						});
								}

	        					
							}

						}else{
							this.$message({
		                    	type: 'error',
		                    	message: res.message
							});
							this.$router.push("/");
						}
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
