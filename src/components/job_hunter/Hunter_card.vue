<template>
	<div class="Hunter_card">
		<div class="bodys">
			<div class="lo_fl">
				<div class="title">个人信息</div>
				<div class="lo_fl_wrap">
					<div class="user_img">
						<img v-if="userInfo.xbm=='xb_001'" :src="imageUrl||xb_001" class="user_img" />
						<img v-if="userInfo.xbm=='xb_002'" :src="imageUrl||xb_002" class="user_img" />
						<div class="wrap-name_text">
							<el-upload 
								class="upload-demo" 
								action="" 
								:show-file-list="false" 
								:auto-upload="false" 
								:limit="1" 
								:on-change="afterRead"
								:on-success="handleAvatarSuccess" 
								:before-upload="beforeAvatarUpload">
								<el-button size="small" type="danger" plain>更换头像</el-button>
							</el-upload>
						</div>
					</div>
					<div class="user_name">
						<div class="wrap-name-text">当前登录账号：{{userInfo.phone}}</div>
						<div class="wrap-name-text">用户姓名：{{userInfo.xm}}</div>
					</div>
				</div>

			</div>
			<div class="lo_fl">
				<div class="title">账号绑定</div>
				<div class="lo_fl_wrap">
					<div class="phone_img"><img src="../../assets/images/common/icon15.svg" alt=""></div>
					<div class="wrap-text" v-if="userInfo.phone">已绑定手机号:{{userInfo.phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</div>
					<div class="theEditor">
						<el-button size="small" type="text" v-if="!userInfo.phone" @click="EditorPhoneDialogVisible=true">绑定手机号</el-button>
						<el-button size="small" type="text" v-if="userInfo.phone" @click="EditorPhoneDialogVisible=true">更换手机号</el-button>
					</div>
				</div>
				<div class="lo_fl_wrap">
					<div class="email_img"><img src="../../assets/images/common/icon16.svg" alt=""></div>
					<div class="wrap-text" v-if="userInfo.yx">已绑定邮箱:{{userInfo.yx.replace(/(.{2}).+(.{2}@.+)/g,'$1****$2')}}</div>
					<div class="theEditor">
						<el-button size="small" type="text" v-if="!userInfo.yx" @click="EditorEmailDialogVisible=true">绑定邮箱</el-button>
						<el-button size="small" type="text" v-if="userInfo.yx" @click="EditorEmailDialogVisible=true">更换邮箱</el-button>
						<!-- <el-tooltip class="item" effect="dark" content="敬请期待..." placement="right">
							
						</el-tooltip> -->
					</div>
				</div>
				<div class="lo_fl_wrap">
					<div class="wechat_img"><img src="../../assets/images/common/Icon-Chat.png" alt=""></div>
					<div class="wrap-text" v-if="userInfo.wx">已绑定微信:{{userInfo.wx}}</div>
					<div class="theEditor">
						<el-tooltip class="item" effect="dark" content="敬请期待..." placement="right">
							<el-button size="small" type="text" v-if="!userInfo.wx">绑定微信</el-button>
							<el-button size="small" type="text" v-if="userInfo.wx">更换微信</el-button>
						</el-tooltip>
					</div>
				</div>
			</div>
			<div class="lo_fl">
				<div class="title">修改密码</div>
				<div class="lo_fl__wrap">
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="请输入原密码" prop="oldPassWord">
							<el-input type="password" :maxlength="10" v-model.trim="ruleForm.oldPassWord" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="请输入新密码" prop="newPassWord">
							<el-input type="password" :maxlength="10" v-model.trim="ruleForm.newPassWord" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="请确认新密码" prop="newcheckPassWord">
							<el-input type="password" :maxlength="10" v-model.trim="ruleForm.newcheckPassWord" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="EditorpwdsubmitForm('ruleForm')" class="passBtn">保 存</el-button>
						</el-form-item>
					</el-form>
				</div>

			</div>
		</div>
		<el-dialog :visible.sync="EditorPhoneDialogVisible" width="600px" :lock-scroll="true" :show-close="false" :modal="false" @close="close">
			<div class="dialog__body-wrap">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
					<el-form-item label="" prop="verificationCode">
						<el-input placeholder="原手机号短信验证码" :maxlength="6" v-model.trim="ruleForm.oldIphoneCode" autocomplete="off">
							<el-button type="text" slot="append" class="yzm" v-if="ruleForm.oldsendAuthCode" @click="oldresetForm" style="color: #FF5656;">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.oldsendAuthCode">{{ruleForm.oldauth_time}}s</el-button>
						</el-input>
					</el-form-item>
					<el-form-item label="" prop="newphone">
						<el-input type="text" :maxlength="11" v-model.trim="ruleForm.newIphone" placeholder="输入新手机号" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="" prop="verificationNewCode">
						<el-input type="text" :maxlength="6" v-model.trim="ruleForm.newIphoneCode" placeholder="新手机号短信验证码" autocomplete="off">
							<el-button type="text" slot="append" class="yzm" v-if="ruleForm.newsendAuthCode" @click="newresetForm" style="color: #FF5656;">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.newsendAuthCode">{{ruleForm.newauth_time}}s</el-button>
						</el-input>
					</el-form-item>
					<el-form-item style="margin-bottom: 0.625rem;">
						<el-button type="primary" @click="EditorPhoneForm('ruleForm')" v-if="!userInfo.phone" class="phoneBtn">绑定手机号</el-button>
						<el-button type="primary" @click="EditorPhoneForm('ruleForm')" v-if="userInfo.phone" class="phoneBtn">更换手机号</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="title" class="dialog-header">
				<div v-if="!userInfo.phone">绑定手机号</div>
				<div v-if="userInfo.phone">更换绑定手机号</div>
			</span>
		</el-dialog>
		<el-dialog :visible.sync="EditorEmailDialogVisible" width="600px" :lock-scroll="true" :show-close="false" :modal="false"  @close="close">
			<div class="dialog__body-wrap">
				<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-dynamic">
					<el-form-item prop="newEmail" label="邮箱账号" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
						<el-input v-model.trim="ruleForm.newEmail" placeholder="输入邮箱"></el-input>
					</el-form-item>
					<!-- <el-form-item label="验证码">
						<el-input type="text" :maxlength="6" v-model.trim="ruleForm.newEmailCode" placeholder="邮箱验证码" autocomplete="off">
							<el-button type="primary" slot="append" class="yzm" v-if="ruleForm.newEmailsendAuthCode" @click="EmailresetForm"
								style="color: #FF5656;">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.newEmailsendAuthCode" @click="EmailresetForm">{{ruleForm.newEmailauth_time}}</el-button>
						</el-input>
					</el-form-item> -->
					<el-form-item style="margin-bottom: 0.625rem;">
						<el-button type="primary" @click="EditorEmailForm('ruleForm')" class="emailBtn" v-if="!userInfo.yx">绑定邮箱</el-button>
						<el-button type="primary" @click="EditorEmailForm('ruleForm')" class="emailBtn" v-if="userInfo.yx">更换绑定邮箱</el-button>
						<el-button type="text" @click="EditorEmailDialogVisible=false" v-if="!userInfo.yx" style="color: #FF5656;">暂不绑定</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="title" class="dialog-header">
				<div v-if="!userInfo.yx">绑定邮箱账号</div>
				<div v-if="userInfo.yx">更换绑定邮箱账号</div>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import crypto from "crypto"; //密码加密
	import xb_001 from '../../assets/images/common/mine.png'
	import xb_002 from '../../assets/images/common/nv.png'
	export default {
		name: 'Hunter_card',
		components: {},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入原密码'));
				} else {
					callback();
				}
			};
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入新密码'));
				} else {
					if (this.ruleForm.newcheckPassWord !== '') {
						this.$refs.ruleForm.validateField('newcheckPassWord');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入新密码'));
				} else if (value !== this.ruleForm.newPassWord) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

			return {
				xb_001: xb_001,
				xb_002: xb_002,
				userInfo: {},
				imgInfo: {},
				fileList: [],
				
				EditorPhoneDialogVisible: false,
				EditorEmailDialogVisible: false,
				ruleForm: {
					oldIphone: '',
					oldIphoneCode: '',
					oldPassWord: '',
					oldEmail: '',
					oldEmailCode: '',
					oldsendAuthCode: true,
					oldauth_time: 0,

					newIphone: '',
					newIphoneCode: '',
					newPassWord: '',
					newcheckPassWord: '',
					newsendAuthCode: true,
					newauth_time: 0,

					newEmail: '',
					newEmailCode: '',
					newEmailsendAuthCode: true,
					newEmailauth_time: 0,
				},
				rules: {
					oldIphone: [{
						required: true,
						message: '请输入原手机号',
						trigger: 'blur'
					}, {
						min: 11,
						message: '请输入有效的手机号',
						trigger: 'blur'
					}],
					oldIphoneCode: [{
						required: true,
						message: '原手机号短信验证码',
						trigger: 'blur'
					}, ],
					newIphone: [{
						required: true,
						message: '请输入新手机号',
						trigger: 'blur'
					}, {
						min: 11,
						message: '请输入有效的手机号',
						trigger: 'blur'
					}],
					newIphoneCode: [{
						required: true,
						message: '新手机号短信验证码',
						trigger: 'blur'
					}, ],
					oldPassWord: [{
						validator: validatePass,
						trigger: "blur"
					}],
					newPassWord: [{
						validator: validatePass1,
						trigger: "blur"
					}],
					newcheckPassWord: [{
						validator: validatePass2,
						trigger: "blur"
					}],

				},
			};
		},
		created() {
			this.userinfo();
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				'userId': 'getuserId',
				imageUrl: 'getJobseekersimg',
			})
		},
		methods: {
			userinfo() {
				var that = this;
				that.axios.get('/api/qz/qzgrjbxx/myBaseInfo', {
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						var data = response.data.qzGrjbxxBase;
						that.userInfo = data;
						if (data.txid) {
							that.userinfoImg(data.txid)
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			userinfoImg(fileId) {
				this.axios({
					method: 'get',
					url: '/api/qz/qzFile/getFile/'+ fileId,
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					this.$store.commit('updateJobseekersimg', res.data.fileUrl);
				});
			},
			Editoruserinfo() {
				var that = this;
				that.Editor = false;
			},
			EditorPhoneForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid) {
						var newIphone = that.ruleForm.newIphone;
						var oldValidateCode = that.ruleForm.oldIphoneCode;
						var newValidateCode = that.ruleForm.newIphoneCode;
						that.axios({
							url: '/api/sec/secuser/checkPhoneCode',
							method: 'get',
							params: {
								newPhone: newIphone,
								oldValidateCode: oldValidateCode,
								newValidateCode: newValidateCode,
							},
							headers: {
								token: that.token,
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$message({
									message: "修改成功，请重新登录",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({
										path: "/public/login?activeName=second"
									});
								}, 2000);
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					}
				})
			},
			EditorEmailForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid && that.ruleForm.newEmail) {
						var newEmail = that.ruleForm.newEmail;
						that.axios({
							method: 'post',
							url: '/api/sec/secuser/changeEmail',
							params: {
								email: newEmail
							},
							headers: {
								"content-type": "application/json",
								'token': that.token
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$message({
									type: 'success',
									message: '邮箱修改成功',
									offset: 300
								});
								that.EditorEmailDialogVisible = false;
								that.userinfo();
							} else {
								that.$message({
									type: 'error',
									message: response.data.msg,
									offset: 300
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					}
				})
			},
			EditorpwdsubmitForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid) {
						var oldmd = crypto.createHash("md5");
						var oldPwd = that.ruleForm.oldPassWord;
						oldmd.update(oldPwd);
						oldPwd = oldmd.digest("hex");

						var newmd = crypto.createHash("md5");
						var newPwd = that.ruleForm.newcheckPassWord;
						newmd.update(newPwd);
						newPwd = newmd.digest("hex");

						that.axios.get("/api/sec/secuser/updatePwd", {
							params: {
								oldPwd: oldPwd,
								newPwd: newPwd,
							},
							headers: {
								'content-type': 'application/json',
								'token': that.token
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$message({
									message: "修改成功，请重新登录",
									type: "success",
									offset: 400
								});
								sessionStorage.removeItem('token');
								sessionStorage.removeItem('Jobseekers');
								sessionStorage.removeItem('HR');
								sessionStorage.removeItem('roleId');
								sessionStorage.removeItem('userId');
								setTimeout(() => {
									that.$router.push({
										path: "/public/login?activeName=second"
									});
								}, 2000);
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					}
				})
			},
			//

			//
			handleDelete(index, row) {
				console.log(index, row);
			},

			oldresetForm() {
				var that = this;
				that.ruleForm.oldsendAuthCode = false;
				that.ruleForm.oldauth_time = 60;
				var auth_timetimer = setInterval(() => {
					that.ruleForm.oldauth_time--;
					if (that.ruleForm.oldauth_time <= 0) {
						that.ruleForm.oldsendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
				that.axios.get("/api/sec/secuser/sendOldPhoneCode", {
					// params: {
					// 	phone: phone
					// },
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							message: "验证码已发送",
							type: "success",
							offset: 400
						});
					} else {
						that.ruleForm.oldsendAuthCode = true;
						clearInterval(auth_timetimer);
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}

				}).catch(function(error) {
					console.log(error);
				});


			},
			newresetForm() {
				var that = this;
				var phone = that.ruleForm.newIphone;
				if (phone) {
					that.ruleForm.newsendAuthCode = false;
					that.ruleForm.newauth_time = 60;
					var auth_timetimer = setInterval(() => {
						that.ruleForm.newauth_time--;
						if (that.ruleForm.newauth_time <= 0) {
							that.ruleForm.newsendAuthCode = true;
							clearInterval(auth_timetimer);
						}
					}, 1000);
					that.axios.get("/api/sec/secuser/sendNewPhoneCode", {
						params: {
							phone: phone
						},
						headers: {
							'content-type': 'application/json',
							'token': that.token
						}
					}).then(function(response) {
						if (response && response.data && response.data.code == 0) {
							that.$message({
								message: "验证码已发送",
								type: "success",
								offset: 400
							});
						} else {
							that.ruleForm.newsendAuthCode = true;
							clearInterval(auth_timetimer);
							that.$message({
								message: response.data.msg,
								offset: 400
							});
						}

					}).catch(function(error) {
						console.log(error);
					});
				}


			},
			EmailresetForm() {},
			close() {
				this.ruleForm = {
					oldIphone: '',
					oldIphoneCode: '',
					oldPassWord: '',
					oldEmail: '',
					oldEmailCode: '',
					oldsendAuthCode: true,
					oldauth_time: 0,

					newIphone: '',
					newIphoneCode: '',
					newPassWord: '',
					newcheckPassWord: '',
					newsendAuthCode: true,
					newauth_time: 0,

					newEmail: '',
					newEmailCode: '',
					newEmailsendAuthCode: true,
					newEmailauth_time: 0,
				}
			},
			//上传
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			// 上传判断
			beforeAvatarUpload(file) {
				var isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type)
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是图片格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return false;
			},

			//回调上传接口
			uploadmsg(key, data, file) {
				this.axios.post("/api/qz/qzFile/save", {
					wjmc: file.name, //简历名称
					wjbm: "", //简历别名   
					wjgs: "", //文件格式       
					wjdx: file.size, //简历大小
					upid: data.upid,
					host: data.host,
					keyName: key,
					wjlx: 20 //10.简历 20.图像
				}, {
					headers: {
						'token': this.token
					}
				}).then(res => {
						this.userinfoImg(res.data.msg)
				});
			},
			// 文件选择成功后
			afterRead(file) {
				var files = file.raw;
				var isJPG = /^image\/(jpeg|png|jpg)$/.test(files.type)
				const isLt2M = files.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是图片格式!');
					return false;
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					return false;
				}

				if (file.status != "ready") {
					this.$message({
						message: file.status,
						type: 'warning'
					});
					return false
				}
				this.axios.get("/api/qz/qzFile/getOssKey", {
					params: {
						fileType: 20
					},
					headers: {
						'token': this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						var info = res.data.info;
						this.ossupload(info, files);
					} else {
						this.fileList = [];
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				}).catch(err => {
					this.$message({
						message: err.msg,
						type: 'warning'
					});
				});
			},
			ossupload(data, file) {
				var fd = new FormData();
				fd.append("OSSAccessKeyId", data.accessid);
				fd.append("policy", data.policy);
				fd.append("signature", data.signature);
				//文件名字
				fd.append("key", data.dir + file.name);
				fd.append("dir", data.dir);
				fd.append("success_action_status", "200");
				//文件必须声明在最后，否则异常
				fd.append("file", file);
				var key = data.dir + file.name
				return new Promise((resolve, reject) => {
					this.axios.post(data.host, fd, {
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						transformRequest: function(xxx) {
							return xxx;
						}
					}).then(res => {
						this.uploadmsg(key, data, file);
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						resolve(res);
					}).catch(err => {
						reject(err);
					});
				});
			},
			//
		}
	};
</script>

<style scoped>
	.Hunter_card {
		margin-bottom: 1rem;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.lo_fl {
		background-color: #FFFFFF;
		padding: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.lo_fl .title {
		font-size: 1rem;
		font-weight: 600;
	}

	.lo_fl:last-child {
		margin-bottom: 0;
		padding-bottom: 0.625rem;
	}

	.lo_fl .lo_fl_wrap {
		display: flex;
		margin-top: 1rem;
		justify-content: flex-start;
		position: relative;
	}

	.lo_fl .lo_fl__wrap {
		margin-top: 1rem;
		width: 26.875rem;
	}

	.lo_fl_wrap .user_img {
		width: 5.75rem;
		height: 5.75rem;
		margin-right: 20px;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #979797;
		position: relative;
	}

	.lo_fl_wrap .phone_img,
	.lo_fl_wrap .email_img,
	.lo_fl_wrap .wechat_img {
		width: 1.375rem;
		height: 1.375rem;
		margin-right: 0.625rem;
	}

	.lo_fl_wrap .user_name {
		padding-top: 15px;
		line-height: 2;
	}

	.lo_fl_wrap .wrap-name-text {
		font-size: 16px;
		color: #606266;
	}
	.wrap-name_text {
		position: absolute;
		top: 30px;
		left: 6px;
		display: none;
	}
	.user_img:hover .wrap-name_text {
		display: block;
	}

	.lo_fl_wrap .wrap-text {
		font-size: 14px;
		color: #606266;
	}

	.lo_fl .theEditor .el-button {
		padding: 3px 12px;
		color: #FC5E5B;
	}

	.el-form .yzm {
		width: 103px;
	}

	.demo-ruleForm /deep/ .el-input-group__prepend {}

	.phoneBtn,
	.emailBtn,
	.passBtn {
		background-color: #FF5656;
		border-color: #FF5656;
		padding: 12px 20px;
	}

	.phoneBtn,
	.passBtn {
		width: 100%;
	}

	/deep/.el-input__inner {
		width: 100%;
		border: 1px solid #DCDFE6;
		padding-left: 0.9375rem;
	}

	/deep/.el-dialog {
		margin-top: 42vh !important;
	}

	/deep/.el-dialog__body {
		padding: 5px 20px;
	}

	.el-form-item {
		margin-bottom: 20px !important;
	}

	.iphone_code {
		display: flex;
	}

	.edit_btn {
		cursor: default;
		font-size: 14px;
		color: #FC5E5B;
		position: absolute;
		right: 0;
		display: inline-block;
		padding-left: 30px;
		line-height: 30px;
		background: url("../../assets/images/enter/Icon-edit.png") 0 2px no-repeat;
	}

	.el-upload__tip {
		margin-left: 20px;
		display: initial;
	}
</style>
