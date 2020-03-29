<template>
	<div class="Qylogin">
		<div class="loginform">
			<el-tooltip class="item" effect="dark" content="敬请期待..." placement="left-start">
				<div v-if="tabform" class="tab tab1"></div>
			</el-tooltip>
			<!-- <div v-if="tabform" class="tab tab1" @click="tabform = false"></div>
			<div v-if="!tabform" class="tab tab2" @click="tabform = true"></div> -->
			<el-tabs v-if="tabform" v-model="qyactiveName" stretch>
				<el-tab-pane label="短信登录" name="first">
					<el-form :model="dxruleForm" status-icon :rules="dxrules" ref="dxruleForm" class="demo-ruleForm">
						<el-form-item label="" prop="phone">
							<el-input type="text" :maxlength="11" v-model.trim="dxruleForm.phone" placeholder="手机号" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="" prop="verificationCode">
							<el-input type="text" :maxlength="6" v-model.trim="dxruleForm.verificationCode" placeholder="短信验证码" autocomplete="off" @keyup.enter.native="dxsubmitForm('dxruleForm')">
								<el-button type="text" slot="append" class="yzm" v-if="dxruleForm.sendAuthCode" @click="resetForm">获取验证码</el-button>
								<el-button type="text" slot="append" class="yzm" v-if="!dxruleForm.sendAuthCode" @click="resetForm">{{dxruleForm.auth_time}}s</el-button>
							</el-input>
						</el-form-item>
						<el-form-item style="margin-bottom: 0.625rem;">
							<el-button @click="dxsubmitForm('dxruleForm')">登 录</el-button>
						</el-form-item>
						<el-form-item>
							没有账号？ 
							<router-link to="/public/registered" style="color: #ff5656;">立即注册</router-link>
							<router-link to="/public/forgotPassword?user=2" style="color: #ff5656;float: right;">忘记密码</router-link>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="账密登录" name="second">
					<el-form :model="zmruleForm" status-icon :rules="zmrules" ref="zmruleForm" class="demo-ruleForm">
						<el-form-item label="" prop="phone">
							<el-input type="text" v-model.trim="zmruleForm.phone" :maxlength="11" placeholder="用户名/手机号/邮箱" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="" prop="pass">
							<el-input type="password" :maxlength="10" v-model.trim="zmruleForm.pass" placeholder="密码" autocomplete="off"  @keyup.enter.native="zmsubmitForm('zmruleForm')"></el-input>
						</el-form-item>
						<el-form-item style="margin-bottom: 0.625rem;">
							<el-button @click="zmsubmitForm('zmruleForm')">登 录</el-button>
						</el-form-item>
						<el-form-item>
							没有账号？ 
							<router-link to="/public/registered" style="color: #ff5656;">立即注册</router-link>
							<router-link to="/public/forgotPassword?user=2" style="color: #ff5656;float: right;">忘记密码</router-link>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<div v-if="!tabform" class="ewmdl">
				<el-divider>APP 扫码登录</el-divider>
				<div class="ewmimg"></div>
				<div class="ewmtitle1">请打开中研APP“扫一扫”</div>
				<div class="ewmtitle2">
					没有中研APP？<router-link to="" style="float: right;color: #ff5656;">去下载</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import crypto from "crypto"; //密码加密
	export default {
		name: 'Qylogin',
		components: {},
		data() {
			return {
				tabform: true,
				dxruleForm: {
					phone: '',
					verificationCode: '',
					sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */ ,
					auth_time: 0 /*倒计时 计数器*/ ,
				},
				zmruleForm: {
					phone: '',
					pass: '',
				},
				dxrules: {
					phone: [{required: true,message: '请输入手机号',trigger: 'blur'},{min: 11,message: '请输入有效的手机号',trigger: 'blur'}],
					verificationCode: [{required: true,message: '请输入短信验证码',trigger: 'blur'}]
				},
				zmrules: {
					phone: [{required: true,message: '请输入用户名/手机号/邮箱',trigger: 'blur'}, ],
					pass: [{required: true,	message: '请输入密码',trigger: 'blur'}, ]
				},
				qyactiveName: 'first'
			}
		},
		methods: {
			dxsubmitForm(formName) {
				var that = this;
				that.$refs[formName].validate((valid) => {
					if (valid) {
						var phone = that.dxruleForm.phone;
						var pwd = '';
						var activeName_ = that.qyactiveName;
						var logintype = activeName_ == 'first' ? 1 : 0;
						var validatecode = that.dxruleForm.verificationCode;
						that.axios.post("/api/sec/pc/logonHr", {
							phone: phone,
							pwd: pwd,
							logintype: logintype,
							validatecode: validatecode
						}, {
							headers: {
								"content-type": "application/json"
								// 'token':token
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$store.commit('updatehttptoken', response);
								that.$store.commit('updateHR', 'HR');
								that.$message({
									message: "登录成功",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({
										path: "/"
									});
								}, 1500);
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						return false;
					}
				});
			},
			resetForm() {
				var that = this;
				var phone = that.dxruleForm.phone;
				if (phone != "") {
					that.dxruleForm.sendAuthCode = false;
					that.dxruleForm.auth_time = 60;
					var auth_timetimer = setInterval(() => {
						that.dxruleForm.auth_time--;
						if (that.dxruleForm.auth_time <= 0) {
							that.dxruleForm.sendAuthCode = true;
							clearInterval(auth_timetimer);
						}
					}, 1000);
					that.axios.get("/api/sec/pc/loginValidateCode", {
						params: {
							phone: phone
						}
					}).then(function(response) {
						if (response && response.data && response.data.code == 0) {
							that.$message({
								message: "验证码已发送",
								type: "success",
								offset: 400
							});
						}

					}).catch(function(error) {
						console.log(error);
					});
				}
			},
			zmsubmitForm(formName) {
				var that = this;
				that.$refs[formName].validate((valid) => {
					if (valid) {
						var phone = that.zmruleForm.phone;
						var pwd = that.zmruleForm.pass;
						var md5 = crypto.createHash("md5");
						md5.update(pwd); //需要加密的密码
						pwd = md5.digest("hex"); //password 加密完的密码
						var activeName_ = that.qyactiveName;
						var logintype = activeName_ == 'first' ? 1 : 0;
						var validatecode = '';
						that.axios.post("/api/sec/pc/logonHr", {
							phone: phone,
							pwd: pwd,
							logintype: logintype,
							validatecode: validatecode
						}, {
							headers: {
								"content-type": "application/json"
								// 'token':token
							}
						}).then(function(response) {
							console.log(response);
							if (response && response.data && response.data.code == 0) {
								that.$store.commit('updatehttptoken', response);
								that.$store.commit('updateHR', 'HR');
								that.$message({
									message: "登录成功",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({
										path: "/"
									});
								}, 1500);
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						return false;
					}
				});
			},
		}
	}
</script>

<style scoped>
	.Qylogin {
		height: 37.5rem;
		background: url(../../assets/images/common/qiyebg.png) center / cover no-repeat;
	}
	.el-button {
		padding: 12px 20px!important;
	}
	.Qylogin .loginform {
		width: 16.25rem;
		height: 18.75rem;
		-webkit-box-shadow: 0 0 1.25rem #EEEEEE;
		box-shadow: 0 0 1.25rem #EEEEEE;
		float: right;
		margin-top: 6%;
		margin-right: 1.25rem;
		border-radius: 0.625rem;
		padding: 3.125rem 3.75rem 0.625rem;
		background-color: #FFFFFF;
		position: relative;
	}
	.loginform .tab {
		width: 4.375rem;
		height: 4.375rem;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.loginform .tab1 {
		background: url(../../assets/images/common/positionRTsm.png) center no-repeat;
	}
	.loginform .tab2 {
		background: url(../../assets/images/common/positionRTzm.png) center no-repeat;
	}
	.loginform .ewmdl {
		text-align: center;
	}
	.loginform .ewmdl .ewmimg {
		width: 10rem;
		height: 10rem;
		background: url(../../assets/images/common/denglu.png) center no-repeat;
		margin: 0 auto;
	}
	.loginform .ewmtitle1 {
		font-size: 0.9375rem;
		color: #8E8E8E;
		margin-top: 0.9375rem;
	}
	.loginform .ewmtitle2 {
		width: 10rem;
		margin: 0.625rem auto;
		font-size: 0.875rem;
		color: #8E8E8E;
	}

	.Qylogin .el-form {}

	.el-form .el-button {
		width: 100%;
		background-color: #ff5656;
		color: #FFFFFF;
		border-color: #ff5656;
	}

	.el-form .yzm {
		width: 100px;
		background-color: #FFFFFF;
		border: #FFFFFF;
		color: #ff5656;
	}
	/deep/ .el-tabs__item.is-active {
		font-size: 15px;
		font-weight: bold;
	}
	/deep/ .el-tabs__active-bar {
		width: 110px!important;
	}
</style>
