<template>
  <!-- 企业注册 -->
  <div class="Qyreg">
    <div class="forget-wrap-title">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="验证手机号码"></el-step>
        <el-step title="填写账号信息"></el-step>
        <el-step title="注册成功"></el-step>
      </el-steps>
    </div>
    <div class="first-left">
      <div class="forgot-form">
		
        <el-form
          v-if="active==0"
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          :rules="rules"
          label-width="100"
          class="demo-ruleForm"
          style="width: 390px;margin: 0 auto;"
        >
			<el-form-item label style="margin-bottom: 0;font-weight: bold;">
				<el-divider><span style="font-weight: bold;font-size: 16px;">企业单位注册</span></el-divider>
			</el-form-item>
          <el-form-item label prop="phone" style="margin-bottom: 1.125rem;">
            <el-input
              type="text"
              v-model.trim="ruleForm.phone"
              autocomplete="off"
              :maxlength="11"
              placeholder="输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
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
              ref="Verify"
            ></drag-verify>
          </el-form-item>
          <el-form-item label prop="verificationCode" style="margin-bottom: 1.125rem;">
            <el-input
              type="text"
              :maxlength="6"
              v-model.trim="ruleForm.verificationCode"
              placeholder="短信验证码"
              autocomplete="off"
            >
              <el-button
                type="text"
                slot="append"
                class="yzm"
                v-if="!ruleForm.drag"
                @click="resetForm"
              >获取验证码</el-button>
              <el-button
                type="text"
                slot="append"
                class="yzm"
                v-if="ruleForm.sendAuthCode&&ruleForm.drag"
                @click="resetForm"
              >获取验证码</el-button>
              <el-button
                type="text"
                slot="append"
                class="yzm"
                v-if="!ruleForm.sendAuthCode"
              >{{ruleForm.auth_time}}s</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label prop="pass" style="margin-bottom: 1.125rem;">
            <el-input
              type="password"
              v-model.trim="ruleForm.pass"
              :maxlength="10"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="checkPass" style="margin-bottom: 1.125rem;">
            <el-input
              type="password"
              v-model.trim="ruleForm.checkPass"
              :maxlength="10"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label style="margin-bottom: 0;">
            <el-checkbox v-model="ruleForm.checked" style="font-size: 0.875rem;">同意博士投</el-checkbox>
            <div :class="ruleForm.checked ? 'agreement agreementcolor':'agreement'">
              <span @click="agreementDialogVisible=true">《用户服务协议》</span>和
              <span @click="policyDialogVisible=true">《隐私政策》</span>
            </div>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <div style="color: rgba(80, 80, 80, 1);font-size: 0.875rem;">
              已经注册过博士投?请直接
              <router-link to="/public/login" style="color: rgba(42, 130, 228, 1);">登录</router-link>
            </div>
            <el-button @click="submitForm('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          :visible.sync="agreementDialogVisible"
          :show-close="false"
          :modal="false"
          width="800px"
          center
        >
          <Agreement />
          <span slot="title" class="dialog-footer">
            <h1>博士投《用户服务协议》</h1>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="ruleForm.checked=true;agreementDialogVisible=false"
            >同意博士投《用户服务协议》</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="policyDialogVisible"
          :show-close="false"
          :modal="false"
          width="800px"
          center
        >
          <Policy />
          <span slot="title" class="dialog-footer">
            <h1>博士投《隐私政策》</h1>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="ruleForm.checked=true;policyDialogVisible=false"
            >同意博士投《隐私政策》</el-button>
          </span>
        </el-dialog>
        <!--  -->
        <el-form
          v-if="active>=1"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 29.375rem;"
        >
          <h4>个人信息</h4>
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="ruleForm.name" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="s_001">人力资源(HR/HRBF)</el-radio>
              <el-radio label="s_002">用人方(BOSS/主管/员工)</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin: 0;"></el-form-item>
          <el-form-item style="margin: 0;"></el-form-item>
          <el-form-item label="工作邮箱" prop="E_email">
            <el-input v-model.trim="ruleForm.E_email" placeholder="输入企业邮箱,用于接收系统消息"></el-input>
          </el-form-item>
          <!-- <h4>公司信息</h4> -->
          <!-- <el-form-item label="是否已注册" prop="ornotReg">
            <el-radio-group v-model="ruleForm.ornotReg">
              <el-radio label="no">未注册</el-radio>
              <el-radio label="yes">已注册</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="单位搜索" prop="searchunitName" v-if="ruleForm.ornotReg=='yes'">
            <el-input
              v-model.trim="ruleForm.searchunitName"
              placeholder="输入已注册单位名称"
              prefix-icon="el-icon-search"
              @keyup.enter.native="search"
            >
              <el-button slot="append" @click="search">搜 索</el-button>
            </el-input>
            <el-table
              v-if="company_List.length>0"
              :data="company_List"
              size="small"
              style="width: 100%"
              max-height="250"
            >
              <el-table-column fixed prop="dwmc" label="单位名称"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center" width="70">
                <template slot-scope="scope">
                  <el-link type="primary" @click="addRow(scope.row)">确 认</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="单位全称" prop="unitName">
            <el-input v-model.trim="ruleForm.unitName" placeholder="输入与单位证照资料一致的单位全称"></el-input>
          </el-form-item>
          <el-form-item label="注册地" prop="region" v-if="ruleForm.ornotReg!='yes'">
            <el-cascader
              :options="options"
              v-model="ruleForm.region"
              filterable
              placeholder="请选择注册地(省份/城市)"
              style="width: 100%;"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="注册地" v-if="ruleForm.ornotReg=='yes'">
            <el-input v-model.trim="ruleForm.Regregion.city" placeholder="注册地(省份/城市)"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" v-if="ruleForm.ornotReg!='yes'">
            <el-input v-model.trim="ruleForm.detaregion" placeholder="详细地址"></el-input>
          </el-form-item>
          <!-- <h4>账号信息 <h6>用于账号登录时使用</h6></h4>
					<el-form-item label="用户名" prop="username">
						<el-input v-model.trim="ruleForm.username" placeholder="输入用户名"></el-input>
          </el-form-item>-->
          <el-button v-if="ruleForm.ornotReg!='yes'" @click="submitForm('ruleForm')">立 即 注 册</el-button>
          <el-button v-if="ruleForm.ornotReg=='yes'" @click="submitForm('ruleForm')">加 入 企 业</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import crypto from "crypto"; //密码加密
import dragVerify from "vue-drag-verify";
import Agreement from "./Agreemen.vue";
import Policy from "./Policy.vue";
export default {
  name: "Qyreg",
  components: { dragVerify, Agreement, Policy },
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
      active: 0,
      qyDwhrxxEntity: {},
      BsKhglEntity: {},
      searchEnter: {},
      company_List: [],
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
        pass: "",
        checkPass: "",
        checked: false,
        sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
        auth_time: 0 /*倒计时 计数器*/,
        name: "",
        resource: "",
        E_email: "",
        ornotReg: "",
        searchunitName: "",
        unitName: "",
        region: "",
        Regregion: {
          city: "",
          citydm: []
        },
        detaregion: "",
        username: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, message: "请输入有效的手机号", trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],

        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        resource: [
          { required: true, message: "请选择身份", trigger: "change" }
        ],
        E_email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],

        ornotReg: [
          { required: true, message: "请选择是否已注册单位", trigger: "change" }
        ],
        unitName: [
          { required: true, message: "请输入单位名称", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择注册地", trigger: "change" }
        ],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      agreementDialogVisible: false,
      policyDialogVisible: false
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
      findDmList: state => state.findDmList,
      ProvinceList: state => state.ProvinceList,
      CityList: state => state.CityList,
      AreaList: state => state.AreaList,
      ProvinceMap: state => state.ProvinceMap,
      CityMap: state => state.CityMap,
      AreaMap: state => state.AreaMap
    }),
    options() {
      return this.getProvinceList();
    }
  },
  methods: {
    getProvinceList() {
      var options = [];
      if (this.ProvinceList && this.ProvinceList.length > 0) {
        this.ProvinceList.forEach(p => {
          let item = {
            value: p.dm,
            label: p.name,
            children: []
          };
          if (
            this.CityList &&
            this.CityList[p.dm] &&
            this.CityList[p.dm].length > 0
          ) {
            this.CityList[p.dm].forEach(c => {
              item.children.push({
                value: c.dm,
                label: c.name
              });
            });
          }
          options.push(item);
        });
      }
      return options;
    },
    search() {
      var that = this;
      var input = that.ruleForm.searchunitName;
      that.axios
        .get("/api/hr/bskhgl/findDwListByName", {
          params: {
            dwmc: input
          },
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            var data = response.data.list;
            that.company_List = data.map(item => {
              if (item.dwszsf && item.dwszcs) {
                item.Procity =
                  that.ProvinceMap[item.dwszsf] +
                  that.CityMap[item.dwszsf][item.dwszcs];
                return item;
              }
              return item;
            });
            that.ruleForm.unitName = "";
            that.ruleForm.Regregion.city = "";
            if (response.data.list == "") {
              that.$message.error({
                message: "该公司未注册",
                offset: 400
              });
            }
          } else {
            that.$message({
              message: response.data.msg,
              offset: 400
            });
            that.company_List = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addRow(rows) {
      this.searchEnter = rows;
      if (rows.dwmc) {
        this.ruleForm.unitName = rows.dwmc;
      } else {
        this.ruleForm.unitName = "";
      }
      if (rows.dwszsf && rows.dwszcs) {
        this.ruleForm.Regregion.city = rows.Procity;
        this.ruleForm.Regregion.citydm[0] = rows.dwszsf;
        this.ruleForm.Regregion.citydm[1] = rows.dwszcs;
      } else {
        this.ruleForm.Regregion.city = "";
      }
    },
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          console.log(that.ruleForm);
          if (that.ruleForm.checked) {
            var phone = that.ruleForm.phone;
            var validateCode = that.ruleForm.verificationCode;
            var pwd = that.ruleForm.checkPass;
            var md5 = crypto.createHash("md5");
            md5.update(pwd); //需要加密的密码
            pwd = md5.digest("hex"); //password 加密完的密码

            var name = that.ruleForm.name;
            var resource = that.ruleForm.resource;
            var email = that.ruleForm.E_email;

            that.ruleForm.ornotReg = "no"
            var ornotReg = that.ruleForm.ornotReg;
            var unit = that.ruleForm.unitName;
            var region = that.ruleForm.region;
            var detaregion = that.ruleForm.detaregion;
            // var username = that.ruleForm.username;

            if (phone && validateCode && pwd && that.active == 0) {
              that.axios
                .post(
                  "/api/sec/pc/registerHr",
                  {
                    validateCode: validateCode,
                    phone: phone,
                    pwd: pwd
                  },
                  {
                    headers: {
                      "content-type": "application/json"
                      // 'token':token
                    }
                  }
                )
                .then(function(response) {
                  if (response && response.data && response.data.code == 0) {
                    that.$message({
                      message: "注册成功",
                      type: "success",
                      offset: 400
                    });
                    that.axios
                      .post(
                        "/api/sec/pc/logonHr",
                        {
                          phone: phone,
                          pwd: pwd,
                          logintype: 0
                        },
                        {
                          headers: {
                            "content-type": "application/json"
                            // 'token':token
                          }
                        }
                      )
                      .then(function(response) {
                        if (
                          response &&
                          response.data &&
                          response.data.code == 0
                        ) {
                          that.$store.commit("updatehttptoken", response);
                          that.$store.commit("updateHR", "HR");
                        } else {
                          that.$message({
                            message: response.data.msg,
                            offset: 400
                          });
                        }
                      })
                      .catch(function(error) {
                        console.log(error);
                      });
                    that.active = 1;
                  } else {
                    that.$message({
                      message: response.data.msg,
                      offset: 400
                    });
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
            if (ornotReg && that.active == 1) {
              // name && resource && email && unit && region &&
              if (
                name &&
                resource &&
                email &&
                unit &&
                region &&
                ornotReg == "no"
              ) {
                //HR注册
                that.axios
                  .post(
                    "/api/hr/bskhgl/registerDw",
                    {
                      dwmc: unit,
                      dwszsf: region[0],
                      dwszcs: region[1],
                      dwszxxdz: detaregion
                    },
                    {
                      params: {
                        save: true
                      },
                      headers: {
                        "content-type": "application/json",
                        token: that.token
                      }
                    }
                  )
                  .then(function(response) {
                    if (response && response.data && response.data.code == 0) {
                      var dwid = response.data.dwid;
                      that.axios
                        .post(
                          "/api/hr/qydwhrxx/registerHr",
                          {
                            dwid: dwid,
                            xm: name,
                            sflx: resource,
                            yx: email,
                            gh: "",
                            sfzhm: "",
                            sjhm: "",
                            xb: ""
                          },
                          {
                            headers: {
                              "content-type": "application/json",
                              token: that.token
                            }
                          }
                        )
                        .then(function(response) {
                          if (
                            response &&
                            response.data &&
                            response.data.code == 0
                          ) {
                            that.active = 3;
                            that.$message({
                              message: "企业基本信息填写完成",
                              type: "success",
                              offset: 400
                            });
                            setTimeout(() => {
                              that.$router.push({
                                path: "/Enter_home/Enter_info",
								query: {
									enterinfo: true
								}
                              });
                            }, 3000);
                          } else {
                            that.$message({
                              message: response.data.msg,
                              offset: 400
                            });
                          }
                        })
                        .catch(function(error) {
                          console.log(error);
                        });
                    } else {
                      that.$message({
                        message: response.data.msg,
                        offset: 400
                      });
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }

              if (ornotReg == "yes") {
                var dwid = that.searchEnter.dwid;
                that.axios
                  .post(
                    "/api/hr/qydwhrxx/registerHr",
                    {
                      dwid: dwid,
                      xm: name,
                      zw: resource,
                      yx: email,
                      gh: "",
                      sfzhm: "",
                      sjhm: "",
                      xb: ""
                    },
                    {
                      headers: {
                        "content-type": "application/json",
                        token: that.token
                      }
                    }
                  )
                  .then(function(response) {
                    if (response && response.data && response.data.code == 0) {
                      that.active = 3;
                      that.$message({
                        message: "已发送请求待同意",
                        type: "success",
                        offset: 400
                      });
                      setTimeout(() => {
                        that.$router.push({
                          path: "/Enter_home/Enter_center"
                        });
                      }, 3000);
                    } else {
                      that.$message({
                        message: response.data.msg,
                        offset: 400
                      });
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            }
          } else {
            that.$message({
              message: "请同意博士投用户协议",
              offset: 400
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      var that = this;
      var phone = that.ruleForm.phone;
      if (phone != "") {
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
          that.axios
            .get("/api/sec/pc/registerValidateCode", {
              params: {
                phone: phone
              },
              headers: {
                "content-type": "application/x-www-form-urlencoded"
                // 'token':token
              }
            })
            .then(function(response) {
              if (response && response.data && response.data.code == 0) {
                that.$message({
                  message: "验证码已发送",
                  type: "success",
                  offset: 400
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          that.$message({
            message: "请滑动验证",
            offset: 400
          });
        }
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.first-left {
  width: 29.375rem;
  margin: 0 auto;
}
.el-button {
  padding: 12px 20px !important;
}
h4 {
  margin-bottom: 0.3125rem;
}
h6 {
  display: inline-block;
  color: #c0c4cc;
  margin-left: 0.625rem;
}

.forget-wrap-title {
  width: 50rem;
  margin: 1.5625rem auto 3.125rem;
}

.first-left .forgot-form {
  overflow: hidden;
  margin: 1.5rem auto;
}
/deep/ .el-radio__label {
  font-size: 0.75rem;
  padding-left: 0.3125rem;
}
.el-form .el-button {
  width: 100%;
  background-color: #ff5656;
  color: #ffffff;
  border-color: #ff5656;
}
.el-form .yzm {
  width: 100px !important;
  background-color: #ffffff;
  border: #ffffff;
  color: #ff5656;
}
.agreement {
  display: initial;
  font-size: 0.75rem;
}
.agreementcolor {
  color: #409eff;
}
.agreement span {
  color: #409eff;
  cursor: pointer;
}
.agreement span:hover {
  text-decoration: underline;
}
/deep/ .el-checkbox__label {
  font-size: 0.75rem;
  padding-left: 0.3125rem;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #ff5656;
  background: #ff5656;
}
/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #ff5656;
}
/deep/ .el-input-group__append .el-button {
  width: auto;
}
</style>
