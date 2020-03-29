<template>
  <!-- 忘记密码 -->
  <div class="Forgotpassword">
    <Head />
    <div class="ForgotBody">
      <div class="bodyWrap">
        <div class="forget-wrap-title">
			<el-steps :space="300" :active="active" finish-status="success" align-center>
				<el-step title="验证手机号码"></el-step>
				<el-step title="重置密码"></el-step>
			</el-steps>
        </div>
        <div class="forgot-form">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item label prop="phone" style="margin-bottom: 1.0625rem;" v-if="active==0">
              <el-input
                type="text"
                v-model.trim="ruleForm.phone"
                autocomplete="off"
                :maxlength="11"
                placeholder="输入手机号"
              ></el-input>
            </el-form-item>
			<el-form-item style="margin-bottom: 1.0625rem;"  v-if="active==0">
				<drag-verify 
				:width="390" 
				:height="40" 
				:text="ruleForm.text" 
				:success-text="ruleForm.successText" 
				:background="ruleForm.background" 
				:progress-bar-bg="ruleForm.progressBarBg" 
				:completed-bg="ruleForm.completedBg" 
				:handler-bg="ruleForm.handlerBg" 
				:handler-icon="ruleForm.handlerIcon" 
				:text-size="ruleForm.textSize" 
				:success-icon="ruleForm.successIcon"
				:circle="false"
				ref="Verify"></drag-verify>
			</el-form-item>
            <el-form-item label prop="verificationCode" style="margin-bottom: 1.0625rem;"  v-if="active==0">
             <el-input type="text" :maxlength="6" v-model.trim="ruleForm.verificationCode" placeholder="短信验证码" autocomplete="off">
				<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.drag" @click="resetForm">获取验证码</el-button>
				<el-button type="text" slot="append" class="yzm" v-if="ruleForm.sendAuthCode&&ruleForm.drag" @click="resetForm">获取验证码</el-button>
				<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.sendAuthCode">{{ruleForm.auth_time}}s</el-button>
             </el-input>
            </el-form-item>
            <el-form-item label prop="pass" style="margin-bottom: 1.0625rem;"  v-if="active>=1">
              <el-input
                type="password"
                v-model.trim="ruleForm.pass"
                autocomplete="off"
                :maxlength="10"
                placeholder="输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="checkPass" style="margin-bottom: 2.25rem;"  v-if="active>=1">
              <el-input
                type="password"
                v-model.trim="ruleForm.checkPass"
                autocomplete="off"
				:maxlength="10"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
				<el-button @click="submitForm('ruleForm')" v-if="active==0&&user==1">找回密码</el-button>
				<el-button @click="submitForm('ruleForm')" v-if="active>=1&&user==1">确 认</el-button>
				<el-button @click="submitForm_('ruleForm')" v-if="active==0&&user==2">找回密码</el-button>
				<el-button @click="submitForm_('ruleForm')" v-if="active>=1&&user==2">确 认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <Foot></Foot> -->
  </div>
</template>

<script>
import Head from '../Head.vue'
import dragVerify from 'vue-drag-verify'
import crypto from "crypto"; //密码加密
// import Foot from "../Foot.vue";
export default {
  name: "Forgotpassword",
  components: {
	Head,dragVerify
    // Foot
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
		user: '',
		active: 0,
		ruleForm: {
			phone: "",
			//
			handlerIcon: "el-icon-d-arrow-right",
			successIcon: "el-icon-check",
			background: "#dadada",
			progressBarBg: "#4b0",
			completedBg: "#66cc66",
			handlerBg: "#fff",
			text: "请将滑块拖动到右侧",
			successText: "验证成功",
			textSize: "14px",
			drag: false,
			//
			verificationCode: "",
			sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
			auth_time: 0 /*倒计时 计数器*/,
			pass: "",
			checkPass: "",
			checked: false
		},
		rules: {
			phone: [{required: true,message: '请输入手机号',trigger: 'blur'}, {min: 11,message: '请输入有效的手机号',trigger: 'blur'}],
			verificationCode: [{required: true,message: '请输入短信验证码',trigger: 'blur'},],
			pass: [{ validator: validatePass, trigger: "blur" }],
			checkPass: [{ validator: validatePass2, trigger: "blur" }],
		}
    };
  },
  methods: {
	submitForm(formName) {
		var that = this;
		that.$refs[formName].validate(valid => {
			if (valid) {
				var phone = that.ruleForm.phone;
				var validateCode = that.ruleForm.verificationCode;
				if (phone && validateCode) {
					that.active = 1;
					var pwd = that.ruleForm.checkPass;
					
					if (phone && validateCode && pwd && that.active == 1) {
						var md5 = crypto.createHash("md5");
						md5.update(pwd); //需要加密的密码
						pwd = md5.digest("hex"); //password 加密完的密码
						that.axios.get("/api/sec/pc/getBackPwdQz", {
							params: {
								validateCode: validateCode,
								phone: phone,
								pwd: pwd
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.active = 2;
								that.$message({
									message: "修改成功，请重新登录",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({ path: "/public/login?activeName=second" });
								}, 2000);
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
								that.active = 0;
								that.ruleForm.verificationCode = '';
								that.ruleForm.pwd = '';
								that.ruleForm.checkPass = '';
							}
						}).catch(function(error) {
							console.log(error);
						});
					}
				}
			} else {
				return false;
			}
		});
	},
	submitForm_(formName) {
		var that = this;
		that.$refs[formName].validate(valid => {
			if (valid) {
				var phone = that.ruleForm.phone;
				var validateCode = that.ruleForm.verificationCode;
				if (phone && validateCode) {
					that.active = 1;
					var pwd = that.ruleForm.checkPass;
					
					if (phone && validateCode && pwd && that.active == 1) {
						var md5 = crypto.createHash("md5");
						md5.update(pwd); //需要加密的密码
						pwd = md5.digest("hex"); //password 加密完的密码
						that.axios.get("/api/sec/pc/getBackPwdHr", {
							params: {
								validateCode: validateCode,
								phone: phone,
								pwd: pwd
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.active = 2;
								that.$message({
									message: "修改成功，请重新登录",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({ path: "/public/login?activeName=first" });
								}, 2000);
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
								that.active = 0;
								that.ruleForm.verificationCode = '';
								that.ruleForm.pwd = '';
								that.ruleForm.checkPass = '';
							}
						}).catch(function(error) {
							console.log(error);
						});
					}
				}
			} else {
				return false;
			}
		});
	},
    resetForm() {
		var that = this;
		var phone = that.ruleForm.phone;
		if (phone) {
			var darg = that.$refs.Verify.isPassing;
			that.ruleForm.drag = darg;
			if (darg) {
				that.ruleForm.sendAuthCode = false;
				that.ruleForm.auth_time = 60;
				var auth_timetimer = setInterval(() => {
					that.ruleForm.auth_time--;
					if (that.ruleForm.auth_time <= 0) {
						that.ruleForm.sendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
				that.axios.get("/api/sec/pc/getBackPwdValidateCode", {
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
			} else {
				that.$message({
					message: '请滑动验证',
					offset: 400
				});
			}
		}
    }
  },
  created() {
		var path = this.$route;
		this.user = path.query.user;
  }
};
</script>

<style scoped>

.ForgotBody {
  width: 100%;
  margin-top: 7.5rem;
}
.el-button {
	padding: 12px 20px!important;
}
.ForgotBody .bodyWrap {
  width: 75rem;
  height: 50rem;
  margin: 0 auto;
  padding-top: 1.25rem;
}
/*  */
.bodyWrap .forget-wrap-title {
  width: 37.5rem;
  margin: 1.5625rem auto 3.125rem;
  padding-left: 0.9375rem;
}
.bodyWrap .forgot-form {
  width: 24.375rem;
  overflow: hidden;
  margin: 1.5rem auto;
}
.bodyWrap .forgot-form .el-button {
  width: 17.25rem;
  color: rgba(255, 255, 255, 1);
  font-size: 1rem;
  background-color: #ff5656;
  margin-top: 2.5rem;
}
.bodyWrap .forgot-form .yzm {
	width: 150px;
	background-color: #FFFFFF;
	border: #FFFFFF;
	color: #ff5656;
	margin: 0;
	height: 2.375rem;
}
.ForgotBody /deep/ .el-input-group__append, .el-input-group__prepend {
	padding: 0;
}
</style>
