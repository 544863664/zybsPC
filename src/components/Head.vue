<template>
  <div class="Head">
    <div class="head" :class="!ifloginPath ? 'ifloginpath' : ''">
      <router-link to="/">
        <div class="head-left" title="中研博硕英才网"></div>
      </router-link>
      <div class="head-right" v-if="ifloginPath">
        <div class="head-right-top" :class="ifPath ? '' : 'head-right--top'">
          <el-row :gutter="0" style="width: 60rem; margin-top: 0.625rem;">
            <el-col :span="3">
              <div class="head-title">
                <el-cascader
                  :options="options"
                  v-model="city"
                  @change="handleChange"
                  placeholder="切换城市"
                  :show-all-levels="false"
                  style="width: 100px;"
                ></el-cascader>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="head-title">
                <router-link to>{{city}}</router-link>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="head-title">
                <router-link to="/">首页</router-link>
              </div>
            </el-col>
            <el-col :span="2" v-if="showjob">
              <div class="head-title" @click="getjobretrieve1(1)">
                <router-link to>职位查看</router-link>
              </div>
            </el-col>
            <el-col :span="2" v-if="showHR">
              <div class="head-title">
                <router-link to="/public/PersonalSearch">人才查看</router-link>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="head-title" @click="getjobretrieve2(2)">
                <router-link to>双选会</router-link>
              </div>
            </el-col>
            <el-col :span="2" v-if="notoken&&!showHR">
              <div class="head-title" @click="getmessage">
                <router-link to>消息</router-link>
              </div>
            </el-col>
            <el-col :span="2" v-if="notoken">
              <div class="head-title" >
                <!-- <router-link :to="url" target="_blank" @click="getIm()">聊天</router-link> -->
                <a :href="url" target="_blank">聊天</a>
              </div>
            </el-col>
            <el-col :span="5" class="righttop">
              <div v-if="!ifloginuser" class="dlBtn">
                <span>
                  <router-link :to="{path:'/public/login', query:{id: 1}}">人才登录</router-link>
                </span>
                <span style="font-size: 1rem;margin: 0 0.3125rem;">|</span>
                <span>
                  <router-link :to="{path:'/public/login', query:{id: 2}}">企业登录</router-link>
                </span>
                <!-- <span>
                  <router-link to="/public/login">登录</router-link>
                </span> -->
                <span style="font-size: 1rem;margin: 0 0.3125rem;">|</span>
                <span>
                  <router-link to="/public/registered">注册</router-link>
                </span>
              </div>
              <div v-if="ifloginuser" class="head-user">
                <el-popover placement="bottom-end" width="100" trigger="hover">
                  <ul v-if="popover">
                    <li class="el-dropdown-menu__item" @click="goHRCenter">
                      企业中心
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goJobrelease"
                    >
                      职位发布
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goSelectionagement"
                    >
                      双选会管理
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goResumeagement"
                    >
                      简历管理
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goHRDetail"
                    >
                      账号信息
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="logout"
                    >
                      退出登录
                      <div class="small-title"></div>
                    </li>
                  </ul>
                  <ul v-if="!popover">
                    <li class="el-dropdown-menu__item" @click="goUserCenter">
                      个人中心
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goEditorresume"
                    >
                      编辑在线简历
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goshowObj"
                    >
                      职位查看
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="goinvest"
                    >
                      已投递职位
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="gouserDetail"
                    >
                      账号信息
                      <div class="small-title"></div>
                    </li>
                    <li
                      class="el-dropdown-menu__item el-dropdown-menu__item--divided"
                      @click="logout"
                    >
                      退出登录
                      <div class="small-title"></div>
                    </li>
                  </ul>
                  <el-button class="userBtn" slot="reference">
                    <div class="user" v-text="userDetail.xm||userDetail.phone"></div>
                    <el-avatar
                      v-if="userDetail.xbm=='xb_001'&&Jobseekers"
                      :src="imageUrl||xb_001"
                      size="small"
                    ></el-avatar>
                    <el-avatar
                      v-if="userDetail.xbm=='xb_002'&&Jobseekers"
                      :src="imageUrl||xb_002"
                      size="small"
                    ></el-avatar>
                    <el-avatar v-if="HR" :src="imageUrl_||enterimg" size="small"></el-avatar>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
            <el-col :span="3" class="righttop" v-if="showjl">
              <span>
                <router-link to="/private/resume">简历</router-link>
              </span>
              <span style="font-size: 1rem;margin: 0 0.3125rem;">|</span>
              <span>
                <!-- <router-link to>上传</router-link> -->
                <el-upload
                  ref="upload"
                  :action="host"
                  :limit="3"
                  :accept="fileType"
                  :auto-upload="false"
                  :on-change="afterRead"
                  :show-file-list="showFileList"
                >
                  <span style="font-weight:bold" slot="trigger">上传</span>
                </el-upload>
              </span>
            </el-col>
          </el-row>
        </div>
        <div class="head-right-down" v-if="ifPath">
          <el-input
            placeholder="热门职位 / 公司"
            v-model="input1"
            class="input-with-select"
            @keyup.enter.native="getsearch"
          >
            <el-select
              v-model="select"
              slot="prepend"
              placeholder="公司 / 职位"
              style="width: 8.125rem;"
            >
              <el-option label="公司 / 职位" value="1" v-if="!HR"></el-option>
              <el-option label="招聘会" value="2"></el-option>
            </el-select>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <el-button slot="append" @click="getsearch">
              <router-link
                :to="{path:'/public/jobretrieve',query: {type: select}}"
                style="color: #FFFFFF"
              >搜 索</router-link>
            </el-button>
          </el-input>
        </div>
      </div>
      <div v-if="ifloginPath_" class="khfwrx">客户服务热线：027-87711410</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import xb_001 from "../assets/images/common/mine.png";
import xb_002 from "../assets/images/common/nv.png";
import enterimg from "../assets/images/common/enterDetail.png";
export default {
  name: "Head",
  components: {},
  data() {
    return {
      xb_001: xb_001,
      xb_002: xb_002,
      enterimg: enterimg,
      // imageUrl: '',
      input1: "",
      select: "1",
      popover: false,
      notoken: true,
      showjl: false,
      showjob: true,
      showHR: false,
      ifloginuser: false,
      ifloginPath: true,
      ifloginPath_: false,
      ifPath: true,
      // options: [],
      city: "武汉市",
      userDetail: {},
      //文件上传
      fileType: "*.*",
      fileList: [],
      host: "",
      upid: "",
      filename: "",
      showFileList: false,
      url:"",
      sendCompanyName: this.$route.query.sendCompanyName
        ? this.$route.query.sendCompanyName
        : ""
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      Jobseekers: "getJobseekers",
      HR: "getHR",
      imageUrl: "getJobseekersimg",
      imageUrl_: "getHREnterLogo",
      roleId: "getroleId"
    }),

    ...mapState({
      ProvinceList: state => state.ProvinceList,
      CityList: state => state.CityList,
      CityMap: state => state.CityMap
    }),
    options() {
      return this.getProvinceList();
    }
  },
  mounted() {
    let origin = window.location.origin
    this.url = origin + "/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId;
  },
  watch: {
    select(val) {
      this.$emit("change", val);
    }

    // 'sendCompanyName'(val, oldVal) {
    //   console.log(val)
    //   console.log(oldVal)
    // }
  },

  methods: {
    getuserDetail(token) {
      var that = this;
      that.axios
        .get("/api/qz/qzgrjbxx/myBaseInfo", {
          params: {},
          headers: {
            "content-type": "application/json",
            token: token
          }
        })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            var data = response.data.qzGrjbxxBase;
            that.userDetail = data;
            if (data.txid) {
              that.userinfoImg(data.txid);
            }
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
    },
    userinfoImg(fileId) {
      this.axios({
        method: "get",
        url: "/api/qz/qzFile/getFile/" + fileId,
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        this.$store.commit("updateJobseekersimg", res.data.fileUrl);
      });
    },
    getHrDetail(token) {
      var that = this;
      that.axios
        .get("/api/hr/qydwhrxx/getHrInfo", {
          params: {},
          headers: {
            "content-type": "application/json",
            token: token
          }
        })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            that.userDetail = response.data.qyDwhrxxEntity;
            if (!that.imageUrl_) {
              that.userinfoLogo();
            }
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
    },
    userinfoLogo() {
      var dwid = this.userDetail.dwid;
      this.axios({
        method: "post",
        url: "/api/hr/qydwhrxx/getDwFileList",
        params: {
          dwid: dwid
        },
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        if (res && res.data && res.data.code == 0) {
          var data = res.data.page;
          var logoArr = [];
          var newLogo = "";
          data.map(item => {
            if (item.wjlx == 20) {
              logoArr.push(item);
            }
          });
          if (logoArr.length) {
            newLogo = logoArr[logoArr.length - 1].wjid;
            this.HrinfoImg(newLogo);
          }
        }
      });
    },
    HrinfoImg(fileId) {
      var dwid = this.userDetail.dwid;
      this.axios({
        method: "get",
        url: "/api/hr/qydwhrxx/getFile/" + fileId,
        data: "",
        params: {
          userId: dwid,
          fileType: 20
        },
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        this.$store.commit("updateHREnterLogo", res.data.fileUrl);
      });
    },
    logout() {
      if (this.token) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("Jobseekers");
        sessionStorage.removeItem("HR");
        sessionStorage.removeItem("roleId");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("qzimgUrl");
        sessionStorage.removeItem("hrimgUrl");
        this.$router.push({ path: "/" });
        location.reload();
      }
    },
    getjobretrieve1(val) {
      this.select = "1";
      this.$emit("change", val);
      this.$router.push({
        path: "/public/jobretrieve",
        query: {
          val: val
        }
      });
    },
    getjobretrieve2(val) {
      this.select = "2";
      this.$emit("change", val);
      this.$router.push({
        path: "/public/jobretrieve",
        query: {
          val: val
        }
      });
    },
    getsearch() {
      this.$emit("searchVal", this.input1);
    },
    // 企业跳转
    goHRCenter() {
      this.$router.push("/Enter_home/Enter_center");
    },
    goJobrelease() {
      this.$router.push("/Enter_home/Enter_post");
    },
    goSelectionagement() {
      this.$router.push("/Enter_home/Enter_delivery");
    },
    goResumeagement() {
      this.$router.push("/Enter_home/Enter_resume");
    },
    goHRDetail() {
      this.$router.push("/Enter_home/Enter_card");
    },

    //求职者跳转
    goUserCenter() {
      this.$router.push("/Job_hunter/Hunter_home");
    },
    goEditorresume() {
      this.$router.push("/private/resume");
    },
    goshowObj() {
      this.$router.push("/public/jobretrieve");
    },
    goinvest() {
      this.$router.push("/Job_hunter/Hunter_invest");
    },
    gouserDetail() {
      this.$router.push("/Job_hunter/Hunter_card");
    },
    getmessage() {
      if (this.Jobseekers) {
        this.$router.push("/Job_hunter/Hunter_message");
      }
      // if (this.HR) {
      // 	this.$router.push("/Job_hunter/Hunter_message")
      // }
    },
    getIm() {
      //   this.axios({
      //     method: "post",
      //     url: "/imapi/api/user/online",
      //     params: {
      //       userid: this.hrInfo.hrid
      //     }
      //   })
      //     .then(() => {
      //       console.log(this.hrInfo.hrid);

      
      // let routes = this.$router.resolve({
      //   path:'/chatTest',
      //   query:{
      //     // url:"/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId
      //     url:"https://rtc.com/layim.html?fUserToken=" + this.token + "&roleId=" + this.roleId
      //   }
      // })
      // window.open(routes.href, '_blank');
      // return


      let url =
        "/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId;
      if (this.token) {
        window.open(url);
      } else {
        this.$message({
          type: "success",
          message: "请先登录再聊天",
          offset: 400
        });
      }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },
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
    handleChange(value) {
      this.city = this.CityMap[value[0]][value[1]];
    },

    //回调上传接口
    uploadmsg() {
      this.axios
        .post(
          "/api/qz/qzFile/save",
          {
            wjmc: this.filename, //简历名称
            wjbm: "", //简历别名
            wjgs: "", //文件格式
            wjdx: this.size, //简历大小
            upid: this.upid,
            host: this.host,
            keyName: this.key,
            wjlx: 10
          },
          {
            headers: { token: this.token }
          }
        )
        .then(res => {
          if(res && res.data.code == 0){
            this.$message({
              message: "上传成功",
              type: "success"
            });
             this.$emit("upload", 'true'); 
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    // 文件选择成功后
    afterRead(file) {
      if (file.status != "ready") {
        this.$message({
          message: file.status,
          type: "warning"
        });
        return false;
      }
      this.size = file.size;
      this.axios
        .get("/api/qz/qzFile/getOssKey", {
          params: {
            fileType: 10 //文件类型：30是电子简历、20是头像、10简历附件
          },
          headers: {
            token: this.token
          }
        })
        .then(res => {
          if (res && res.data && res.data.code === 0) {
            this.ossupload(res.data.info, file);
            this.upid = res.data.info.upid;
            this.host = res.data.info.host;
            this.policy = res.data.info.policy;
            this.dir = res.data.info.dir;
            this.signature = res.data.info.signature;
          } else {
            this.fileList = [];
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err.msg,
            type: "warning"
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
      fd.append("file", file.raw);
      this.key = data.dir + file.name;
      this.filename = file.name;
      return new Promise((resolve, reject) => {
        this.axios
          .post(data.host, fd, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: function(xxx) {
              console.log("xxx = ", xxx);
              return xxx;
            }
          })
          .then(res => {
            this.uploadmsg();
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  created() {
    var that = this;
    if (that.token) {
      that.ifloginuser = true;
      if (that.Jobseekers) {
        that.getuserDetail(that.token);
        that.notoken = true;
        that.showjl = true;
        that.popover = false;
      }
      if (that.HR) {
        that.getHrDetail(that.token);

        that.notoken = true;
        that.showjob = false;
        that.showHR = true;
        that.popover = true;
        that.select = "2";
      }
    } else {
      that.notoken = false;
      that.showjl = false;
    }
    var path = that.$route;
    if (path.path == "/" || path.path == "/public/jobretrieve") {
      that.ifPath = true;
    } else {
      that.ifPath = false;
    }
    if (
      path.path == "/public/registered" ||
      path.path == "/public/login" ||
      path.path == "/public/forgotPassword"
    ) {
      that.ifloginPath = false;
      that.ifloginPath_ = true;
    }

    this.input1 = this.sendCompanyName;
    this.getsearch();
  }
};
</script>

<style lang='less' scoped>
a {
  font-weight: bold;
}

.Head {
  width: 100%;
  height: 7.5rem;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 0.875rem;
  line-height: 150%;
  text-align: center;
  box-shadow: 0 0.3125rem 0.625rem #d8d8d8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1008;
}

.Head .head {
  width: 75rem;
  overflow: hidden;
  line-height: 2.625rem;
  margin: 0 auto;
  display: flex;
}

.head .head-title {
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.head-title a {
  color: rgba(36, 36, 36, 1);
  font-size: 0.875rem;
}

.head .head-left {
  width: 15rem;
  height: 7.5rem;
  background: url(../assets/images/common/logo.png) center / contain no-repeat;
}

.Head .ifloginpath {
  justify-content: space-between;
}

.head .khfwrx {
  font-size: 1rem;
  font-weight: 600;
  line-height: 7.3125rem;
  margin-right: 1.25rem;
}

.head-right .head-right--top {
  margin-top: 2.5rem;
}

.head-right-top .righttop {
  float: right;
}

.head-right .head-right-top span,
.head-right .head-right-top span a {
  cursor: pointer;
  display: inline-block;
  color: rgba(36, 36, 36, 1);
}

.userBtn,
.userBtn:focus,
.userBtn:hover {
  width: 12.5rem;
  color: rgba(36, 36, 36, 1);
  border: none;
  background-color: #ffffff;
}
.userBtn{
  display: flex;
  align-items: center;
}

.head-right .head-right-top .head-user {
  /* width: 11.25rem; */
  height: 42px;
  text-align: center;
  margin: 0 auto;
  position: relative;
  margin-top:5px;
  
}
.head-user>span{
  display: flex;
  align-items: center;
}

.head-user .user {
  width: 6.25rem;
  height: 1rem;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.head-user .el-avatar--small {
  line-height: 1.75rem !important;
  position: absolute;
  top: 0.2rem;
  right: 0;
}

.head-user .small-title {
  color: #909399;
  font-size: 0.875rem;
}

.head-right-down {
  width: 56.25rem;
  margin-left: 1.5625rem;
  margin-top: 0.3125rem;
}

/deep/ .el-input-group__prepend,
/deep/ .el-input-group__append {
  background-color: #ffffff;
  border-radius: 0;
}

/deep/ .el-input-group__append {
  width: 100px;
  background-color: rgb(255, 83, 83);
  color: rgba(255, 255, 255, 1);
}

/deep/ .el-cascader .el-input__inner {
  border: none;
}
</style>
