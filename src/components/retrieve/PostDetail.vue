<template>
  <!-- 职位详情 -->
  <div class="company">
    <Head />
    <div class="body">
      <div class="header_tip">警示：以招聘为名收取培训费用、提供培训贷款，或在录用过程中支付体检、服装、押金等费用的，都属于违法行为，一旦发现，请立即举报。</div>
      <!-- 招聘职位 -->
      <div class="brief">
        <div class="com_con">
          <ul class="post">
            <li>
              <div class="p_left">
                <div class="p0">
                  更新时间：{{detailInfo.updateTime}}
                  <p class="p0_right">
                    <span class="s1" :class="collect ? 'active':''" @click="collectionPost()">收藏</span>
                    <span class="s2" @click="jbCompony">举报</span>
                  </p>
                </div>
                <p class="p1">
                  {{detailInfo.gwmc}}
                  <!-- <p v-if="scope.row.gwyx">{{ findDmMap.m_xzdydm[scope.row.gwyx] }}</p> -->
                  <span>{{gwyxName}}</span>
                </p>
                <p>
                  <router-link
                    :to="{path:'/public/jobretrieve',query: {companyName: this.detailInfo.gwmc, sendCompanyName:this.sendCompanyName}}"
                    style="color: #FFFFFF"
                  >
                    <a>查看该公司所有职位</a>
                  </router-link>


                  <!-- <a href="/public/jobretrieve?companyName=this.detailInfo.gwmc">
                    <i @click="seeComponyOtherJob"></i>
                  </a>-->
                </p>
                <p class="p2">
                  <span>{{cityName}}</span>
                  <em>|</em>
                  <span>{{jyyqName}}</span>
                  <em>|</em>
                  <span>{{xlyqName}}</span>
                  <span>
                    <em>|</em>
                    招{{detailInfo.zprs}}人
                  </span>
                  <span>
                    <em>|</em>
                    {{ dwxzName}}
                  </span>
                  <!-- 单位性质 -->
                  <span>
                    <em>|</em>
                    {{sshyName}}
                  </span>
                </p>

                <p class="p3">
                  <!-- <span v-for="(item, index) in findDmMap['m_gwfldm']" :key="index">{{item}}</span> -->
                  <span
                    v-for="(item, index) in detailInfo['fllist']"
                    :key="index"
                  >{{findDmMap.m_gwfldm[item.dm]}}</span>
                </p>
              </div>
              <el-button type="danger" @click="setSend">申请职位</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="post_con">
        <div class="post_c_l">
          <!-- 职位描述 -->
          <div class="brief">
            <!-- <h1 class="com_title">职位描述：</h1>
            <div class="com_con">
              <p>{{detailInfo.gwms}}</p>
            </div>-->
            <h1 class="com_title">任职要求：</h1>
            <div class="com_con">
				<!-- <el-input type="textarea" readonly v-model="detailInfo.gwms" :autosize="{maxRows: 'auto'}" resize="none" style="border: none;"></el-input> -->
              
              <pre class="handleGwms">
                {{detailInfo.gwms}}
              </pre>
              <div class="type_a">
                <p>
                  <span class="type">职能类别：</span>
                  {{detailInfo.gwmc}}
                </p>
                <p>
                  <span class="type">关键字：</span>
                  {{detailInfo.gwmc}}
                </p>
              </div>
            </div>
          </div>
          <!-- 工作地址 -->
          <div class="brief">
            <h1 class="com_title">
              工作地址：
              <span class="font_map" @click="openMap = true">地图</span>
            </h1>
            <div class="com_con">
              <p>{{detailInfo.sbxxdz}}</p>
            </div>
          </div>
          <!-- 部门信息 -->
          <div class="brief">
            <h1 class="com_title">部门信息：</h1>
            <div class="com_con">
              <p>{{detailInfo.ssbm}}</p>
            </div>
          </div>
          <!-- 公司简介 -->
          <div class="brief">
            <h1 class="com_title">公司信息：</h1>
            <div class="com_con">
              <p>{{companyInfo.dwjs}}</p>
            </div>
          </div>
        </div>
        <div class="post_c_r">
          <div class="post_r_w">
            <div class="post_r_block online">
              <p class="name">HR在线沟通</p>
              <div class="r_user">
                <img src="../../assets/images/common/mine.png" alt />
                <p>{{hrInfo.xm}}</p>
                <p>职位:{{hrInfo.zw}}</p>
              </div>
              <div class="r_btn">
                <el-button
                  type="danger"
                  class="fleft"
                  @click="talkFast(1)"
                  :disabled="hasToken"
                >在线沟通</el-button>
                <el-button type="danger" class="fright" @click="videoCommunication()">视频面试</el-button>
              </div>
            </div>
            <div class="post_r_block online">
              <p class="name">{{companyInfo.dwmc}}</p>
              <div>
                <p>公司性质：{{companyInfo.dwxz}}</p>
                <p>公司规模：{{companyName}}</p>
                <p>公司所在行业：{{dopName}}</p>
              </div>
              <div class="r_btn">
                <el-button type="danger" class="view" @click="seeOtherJob(companyId)">查看该公司所有职位</el-button>
              </div>
            </div>
            <div class="post_r_block online_post">
              <div class="r_all_wrap">
                <p class="name">相似职位</p>
                <div class="r_all">
                  <span class="all" :class="postAll ? 'active':''" @click="postAll=!postAll">全选</span>
                  <el-button type="danger" class="view" @click="selectAll">全部申请</el-button>
                </div>
              </div>
              <div class="r_list">
                <ul>
                  <li class="active" v-for="(item,index) in jobInfoList" :key="index">
                    <p class="l1">{{item.GWMC}}</p>
                    <p class="l2">{{item.GWMC}}</p>
                    <p class="l3">
                      {{item.GWYX}}
                      <span class="address">{{item.SBSF}}-{{item.SBCS}}</span>
                    </p>
                    <em class="l4"></em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foot />
    <!-- 地图弹出框 -->
    <el-dialog
      :visible.sync="openMap"
      width="50%"
      :lock-scroll="false"
      :show-close="true"
      :modal="false"
    >
      <div class="dialog__body-wrap">
        <div class="dialog_info">
          <div>
            <img src="../../assets/images/search/map.png" class="map" />
          </div>
        </div>
      </div>
      <span slot="title" class="dialog-header">
        <div>地址：陕西省西安市未央区太元路1号</div>
      </span>
    </el-dialog>
    <!-- 简历弹出框 -->
    <el-dialog
      :visible.sync="resume.dialog"
      width="40%"
      :lock-scroll="true"
      :show-close="true"
      :modal="false"
    >
      <div class="dialog__body-wrap">
        <div class="dialog_info">
          <el-table
            :data="resume.list"
            empty-text="您暂无简历可以投递，请到简历页面上传附件简历后再投递"
            style="width: 100%"
            class="resume_dialog"
          >
            <el-table-column label width="45">
              <template scope="scope">
                <el-radio
                  :label="scope.row.wjid"
                  v-model="resume.fjjlid"
                  @change.native="getTemplateRow(scope.row)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="简历名称">
              <template slot-scope="scope">
                <p>{{scope.$index + 1}}、{{scope.row.wjmc}}</p>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="text-align"
            style="padding-top:10px; text-align:center"
            v-if="resume.list.length > 0"
          >
            <el-button type="danger" @click="resumeConfim">确定</el-button>
            <el-button type="danger" plain @click="resume.dialog = false">取消</el-button>
          </div>
        </div>
      </div>
      <span slot="title" class="dialog-header">
        <div>选择投递简历</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Head from "../Head.vue";
import Foot from "../Foot.vue";
import { mapState, mapGetters } from "vuex";
import Moment from "../common/moment.js";
export default {
  name: "CompanyDetail",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      sendCompanyName:this.$route.query.sendCompanyName,
      // 简历
      resume: {
        row: {},
        dialog: false,
        list: [],
        fjjlid: "",
        newfjjlid: ""
      },
      jobInfoList: [],
      companyPostArr: [],
      hrInfo: {
        xm: "",
        zw: ""
      },
      companyInfo: {
        dwmc: "",
        dwxz: "",
        dwgm: "",
        sshy: "",
        dwjs: ""
      },
      detailInfo: {
        dwclsj: "",
        gwmc: "",
        sbxxdz: "",
        gwms: "",
        fllist: [],
        gwyx: "",
        sbsf: "",
        sbcs: "",
        sbxq: "",
        jyyq: "",
        xlyq: "",
        gwcount: "",
        dwxz: "",
        sshy: "",
        gwlbo: "",
        gwlbt: "",
        gwlb: "",
        updateTime: ""
      },
      postId: this.$route.query.postId,
      companyId: this.$route.query.companyId,
      // 是否收藏
      collect: false,
      // 打开地图弹窗
      openMap: false,
      // 右侧全选按钮
      postAll: false
    };
  },
  created() {
    // let that = this;
    // console.log("vuex", this.$store);
    // console.log(this.$route)
    this.toPostDetail(this.postId);
    this.searchCityJob();
    this.toCompanyDetail(this.companyId);
    this.getHrInfos(this.postId);
    this.getResumeList();
  },
  computed: {
    ...mapState({
      // token: state => state.httptoken,
      findDmMap: state => state.findDmMap,
      ProvinceMap: state => state.ProvinceMap,
      CityMap: state => state.CityMap
    }),
    ...mapGetters({
      token: "getToken",
      userId: "getuserId",
      roleId: "getroleId",
      Jobseekers: "getJobseekers",
      HR: "getHR"
    }),
    hasToken() {
      if (!this.token) {
        return true;
      } else {
        return false;
      }
    },
    dopName() {
      // findDmMap.m_dwsshydm[companyInfo.sshy]
      if (
        this.companyInfo.sshy &&
        this.findDmMap.m_dwsshydm &&
        this.findDmMap.m_dwsshydm[this.companyInfo.sshy]
      ) {
        return this.findDmMap.m_dwsshydm[this.companyInfo.sshy];
      } else {
        return "无";
      }
    },
    companyName() {
      // findDmMap.m_dwgmdm[companyInfo.dwgm];
      if (
        this.companyInfo.dwgm &&
        this.findDmMap.m_dwgmdm &&
        this.findDmMap.m_dwgmdm[this.companyInfo.dwgm]
      ) {
        return this.findDmMap.m_dwgmdm[this.companyInfo.dwgm];
      } else {
        return "无";
      }
    },
    gwyxName() {
      //{{findDmMap.m_xzdydm[detailInfo.gwyx]}}
      if (
        this.detailInfo.gwyx &&
        this.findDmMap.m_xzdydm &&
        this.findDmMap.m_xzdydm[this.detailInfo.gwyx]
      ) {
        return this.findDmMap.m_xzdydm[this.detailInfo.gwyx];
      } else {
        return "面议";
      }
    },
    // {{ProvinceMap[detailInfo.sbsf]}}-{{CityMap[detailInfo.sbsf][detailInfo.sbcs]}}-{{detailInfo.sbxq}}
    cityName() {
      if (this.detailInfo.sbsf && this.ProvinceMap) {
        return this.ProvinceMap[this.detailInfo.sbsf];
      } else if (this.detailInfo.sbsf && this.detailInfo.sbcs && this.CityMap) {
        return (
          this.ProvinceMap[this.detailInfo.sbsf] -
          this.CityMap[this.detailInfo.sbsf][this.detailInfo.sbcs]
        );
      } else if (
        this.detailInfo.sbsf &&
        this.detailInfo.sbcs &&
        this.CityMap &&
        this.detailInfo.sbxq
      ) {
        return (
          this.ProvinceMap[this.detailInfo.sbsf] -
          this.CityMap[this.detailInfo.sbsf][this.detailInfo.sbcs] -
          this.detailInfo.sbxq
        );
      } else {
        return this.detailInfo.sbxxdz || "无";
      }
    },
    jyyqName() {
      //  findDmMap.m_jyyqdm[detailInfo.jyyq]
      if (
        this.detailInfo.jyyq &&
        this.findDmMap.m_jyyqdm &&
        this.findDmMap.m_jyyqdm[this.detailInfo.jyyq]
      ) {
        return this.findDmMap.m_jyyqdm[this.detailInfo.jyyq];
      } else {
        return "无";
      }
    },
    xlyqName() {
      // findDmMap.m_xldm[detailInfo.xlyq]
      if (
        this.detailInfo.xlyq &&
        this.findDmMap.m_xldm &&
        this.findDmMap.m_xldm[this.detailInfo.xlyq]
      ) {
        return this.findDmMap.m_xldm[this.detailInfo.xlyq];
      } else {
        return "无";
      }
    },
    dwxzName() {
      // findDmMap.m_dwxzdm[detailInfo.dwxz]
      if (
        this.companyInfo.dwxz &&
        this.findDmMap.m_dwxzdm[this.companyInfo.dwxz]
      ) {
        return this.findDmMap.m_dwxzdm[this.companyInfo.dwxz];
      } else {
        return "无";
      }
    },
    sshyName() {
      // findDmMap.m_dwsshydm[detailInfo.sshy]
      if (
        this.companyInfo.sshy &&
        this.findDmMap.m_dwsshydm[this.companyInfo.sshy]
      ) {
        return this.findDmMap.m_dwsshydm[this.companyInfo.sshy];
      } else {
        return "无";
      }
    }
  },
  methods: {
    // 视频面试
    videoCommunication() {
      this.$message({
        type: "success",
        message: "敬请期待",
        offset: 400
      });
    },

    // 投诉
    jbCompony() {
      this.axios({
        method: "post",
        url: "/qz/bsTsxx/addTsxx",
        data: {
          tslx: 10,
          btsfid: this.postId,
          tsly: this.resume.fjjlid,
          channel: 2
        },
        params: "",
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            this.$message({
              type: "success",
              message: "投递成功",
              offset: 400
            });
          } else {
            this.$message({
              message: response.data.msg,
              offset: 400
            });
          }
          this.resume.dialog = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查看该公司所有职位
    seeComponyOtherJob() {
      this.$router.push({
        path: "/public/jobretrieve"
      });
    },
    //  收藏
    collectionPost() {
      let gsid = this.companyId;
      let gwid = this.postId;
      let url = `/api/qz/qzgwsc/sc/${gsid}/${gwid}`;
      if (this.collect) {
        url = `/api/qz/qzgwsc/qxsc/${gsid}/${gwid}`;
      } 
      if (this.token) {
        this.axios({
          method: "post",
          url: url,
          // data: {
          //   qdid: 2
          // },
          params:{
            qdid: 2
          },
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
          .then(res => {
            if (res && res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message: this.collect ? "取消收藏成功" : "收藏成功",
                offset: 400
              });
              this.collect = !this.collect;
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
                offset: 400
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$confirm("未登录，请您登录后，进行报名。", "登录状态", {
          confirmButtonText: "去登录",
          cancelButtonText: "取 消",
          type: "warning"
        }).then(() => {
          this.$router.push({
            path: "/public/login"
          });
        });
      }
    }, 
    // 获取简历列表
    getResumeList(){
      if(!this.token){
        return
      }
      this.axios.get("/api/qz/qzFile/list", {
        params: {
          fileType:10 //文件类型：30是电子简历、20是头像、10简历附件
        }, 
        headers: {
          "content-type": "application/json",
          'token':this.token
        }
      }).then((res) => {
        if (res && res.data && res.data.code == 0) {
          this.resume.list = res.data.fileList
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 公司职位-单个投递简历
    setSend(row){ 
      console.log(this.detailInfo)
      var that = this;
      if (that.token) {
        if (that.Jobseekers) {
          this.getResumeList();
          if(this.resume.list.length == 0){
            this.resume.fjjlid = ''
          } else {
            if(!this.resume.fjjlid){
              this.resume.row = row;
              this.resume.dialog = true;
              return
            }
          }
          that.axios({
            method: 'post',
            url: '/api/qz/qyhxrxx/td',
            data: {
              dwid: this.companyId,
              gwid: this.postId,
              fjjlid: this.resume.fjjlid,
              channel: 2
            },
            params: '',
            headers: {
              "content-type": "application/json",
              'token': that.token
            }
          }).then(function(response) {
            if (response && response.data && response.data.code == 0) {
              that.$message({
                type: 'success',
                message: '投递成功',
                offset: 400
              });
            } else {
              that.$message({
                message: response.data.msg,
                offset: 400
              });
            }
            that.resume.dialog = false;
          }).catch(function(error) {
            console.log(error);
          });
        }
      } else {
        that.$confirm('未登录，请您登录后，进行报名。', '登录状态', {
          confirmButtonText: '去登录',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: "/public/login"
          });
        })
      }
      
    },
    // 简历列表选择
    getTemplateRow(row) {
      this.resume.newfjjlid = row.wjid;
    },
    // 简历取消
    resumeClose() {
      this.resume.newfjjlid = "";
      this.resume.dialog = false;
    },
    // 简历确定
    resumeConfim() {
      if (!this.resume.newfjjlid) {
        this.$message({
          message: "请选择一个简历",
          type: "warning",
          offset: 400
        });
        return;
      }
      this.resume.fjjlid = this.resume.newfjjlid;
      this.setSend(this.resume.row);
    },
    // 获取公司简介
    toCompanyDetail(bsid) {
      this.axios({
        method: "post",
        url: "/api/qz/qzgrjbxx/getDwInfo",
        params: {
          sfxstd: 2,
          dwid: bsid
        },
        headers: {
          "content-type": "application/json"
          // token: this.token
        }
      })
        .then(res => {
          this.companyInfo = { ...this.companyInfo, ...res.data.dwInfo };
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 岗位详情
    toPostDetail(bsid) {
      this.axios({
        method: "post",
        url: "/api/qz/qzgrjbxx/getGwInfo",
        params: {
          gwid: bsid
        },
        headers: {
          "content-type": "application/json",
          userId: this.userId ? this.userId:'123'
          // token: this.token
        }
      })
        .then(res => {
          //   this.detailInfo = res.data.gwxxxqQzVO;
          this.detailInfo = { ...this.detailInfo, ...res.data.qyDwgwfbxx };
          this.detailInfo.updateTime = Moment.formatDate3(
            this.detailInfo.updateTime
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 根据岗位获取hr接口
    getHrInfos(gwid) {
      this.axios({
        method: "get",
        url: "/api/qz/qzgrjbxx/getHrInfoByGw",
        params: {
          gwid: gwid
        },
        headers: {
          "content-type": "application/json"
          // token: this.token
        }
      })
        .then(res => {
          this.hrInfo = { ...this.hrInfo, ...res.data.hrInfo };
          // console.log(this.hrInfo);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取职位列表相似职位接口
    searchCityJob() {
      this.axios({
        method: "get",
        url: "/api/qz/qyhxrxx/tjList",
        data: {
          sbcs: this.detailInfo.sbcs, //上班城市代码
          gwlbo: this.detailInfo.gwlbo, //岗位类别一级代码
          gwlbt: this.detailInfo.gwlbt, //岗位类别二级代码
          gwlb: this.detailInfo.gwlb //岗位类别三级代码
        },
        headers: {
          "content-type": "application/json"
          // token: this.token
        }
      })
        .then(res => {
          this.jobInfoList = { ...this.jobInfoList, ...res.gwList };
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 全部申请
    selectAll() {
      var hxidArr = [];
      var obj = {
        dwid: this.companyId,
        gwid: this.postId,
        channel: 2
      };
      hxidArr.push(obj);
      if (this.token) {
        this.PostJobseekersSignup(hxidArr);
      } else {
        this.$confirm("未登录，请您登录后，进行报名。", "登录状态", {
          confirmButtonText: "去登录",
          cancelButtonText: "取 消",
          type: "warning"
        }).then(() => {
          this.$router.push({
            path: "/public/login"
          });
        });
      }
    },

    PostJobseekersSignup(comArr) {
      if (comArr.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条数据",
          offset: 400
        });
        return;
      }
      this.axios({
        method: "post",
        url: "/api/qz/qyhxrxx/pltd",
        data: comArr,
        params: "",
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            this.$message({
              type: "success",
              message: "投递成功",
              offset: 400
            });
          } else {
            this.$message({
              message: response.data.msg,
              offset: 400
            });
          }
          // that.resume.dialog = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seeOtherJob(dwid) {
      this.$router.push({
        path: "/public/enterDetail",
        query: {
          dwid: dwid
        }
      });
    },
    // 立即沟通
    talkFast() {
      this.axios({
        method: "post",
        url: "/imapi/api/user/online",
        params: {
          userid: this.hrInfo.hrid
        }
      })
        .then(() => {
          console.log(this.hrInfo.hrid);
          let url =
            "/im/layim.html?tUserId=" +
            this.hrInfo.hrid +
            "&fUserToken=" +
            this.token +
            "&roleId=" +
            this.roleId;
          if (this.token) {
            window.open(url);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.handleGwms{
  white-space: pre-wrap;
  word-wrap: break-word;
}
/deep/.el-radio__label {
  display: none;
}
.header_tip {
  padding: 10px;
  font-size: 14px;
  color: #606266;
  background: #fff;
}
.company {
  width: 100%;
  margin-top: 7.5rem;
  padding-top: 1.2rem;
  overflow: hidden;
}
.company .body {
  width: 75rem;
  margin: 0 auto;
  padding: 0;
}
.brief {
  padding: 20px;
  margin-top: 20px;
  color: #606266;
  background: #fff;
  position: relative;
}
.margin_none {
  margin-top: 0;
}
.com_title {
  font-size: 18px;
  color: #606266;
  position: relative;
  line-height: 40px;
  margin-bottom: 5px;
}
.com_title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 36px;
  height: 2px;
  background: #fc5e5b;
}
.font_map {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  color: #fc5e5b;
  font-weight: normal;
  cursor: default;
}
.com_con {
  line-height: 24px;
  font-size: 14px;
}
.com_con .type {
  display: inline-block;
  width: 70px;
}
.com_con /deep/ .el-textarea__inner {
  border: none !important;
  overflow: hidden !important;
}
.map {
  width: 100%;
  height: 300px;
}
.post li {
  margin-bottom: 10px;
  color: #606266;
}
.post .el-button--danger {
  font-size: 18px;
  height: 38px;
  width: 193px;
  position: absolute;
  bottom: 28px;
  right: 20px;
}
.post .p_left a {
  font-size: 16px;
  color: #606266;
}
.post .p_left a:hover {
  color: #fc5e5b;
}
.post .p_left .p0 {
  font-size: 16px;
  color: #606266;
  position: relative;
}
.post .p_left .p0 .p0_right {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  color: #606266;
}
.post .p_left .p0 .p0_right span {
  padding-left: 20px;
}
.post .p_left .p0 .p0_right .s1 {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  background: url("../../assets/images/common/Icon--chat.png") 0 center
    no-repeat;
  background-size: 14px;
}
.post .p_left .p0 .p0_right .s1.active {
  background: url("../../assets/images/common/Icon--chat-.png") 0 center
    no-repeat;
  background-size: 14px;
}
.post .p_left .p1 {
  font-size: 24px;
  color: #606266;
  font-weight: bold;
  padding: 15px 0;
}
.post .p_left .p1 span {
  padding-left: 20px;
}
.post .p_left .p2 {
  font-size: 14px;
}
.post .p_left .p2 span {
  padding-right: 10px;
  vertical-align: middle;
}
.post .p_left .p2 em {
  padding-right: 10px;
  font-style: normal;
  vertical-align: middle;
}
.post .p_left .p3 span {
  background: rgba(252, 94, 91, 0.75);
  font-size: 12px;
  margin-right: 5px;
  color: #fff;
  padding: 3px 5px;
}

.post_con {
  display: flex;
}
.post_c_l {
  width: 70%;
}
.post_c_r {
  width: 30%;
}

.post_r_block {
  background: #fff;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  overflow: auto;
  margin-bottom: 20px;
  line-height: 25px;
}
.post_r_w {
  padding-top: 20px;
  padding-left: 20px;
}
.post_r_block .name {
  font-size: 18px;
  padding-bottom: 5px;
}
.post_r_block .r_user {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: auto;
  line-height: 30px;
}
.post_r_block .r_user img {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  float: left;
  margin-right: 15px;
}
.post_r_block .r_btn {
  text-align: center;
}
.post_r_block .r_btn /deep/.el-button--danger {
  height: 19px;
  line-height: 17px;
  font-size: 12px;
  padding: 0;
  width: 45%;
}
.post_r_block .r_btn /deep/.el-button--danger.view {
  height: 25px;
  width: 159px;
  margin: 5px auto;
}
.post_r_block .r_all_wrap {
  padding: 10px 10px 0 10px;
}
.post_r_block .r_all {
  border-bottom: 1px solid #ddd;
  padding: 10px 0 20px 0;
  position: relative;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
.post_r_block .r_all .all {
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: url("../../assets/images/search/Icon-success1.png") right center
    no-repeat;
  background-size: 20px;
}
.post_r_block .r_all .all.active {
  background: url("../../assets/images/search/Icon-success.png") right center
    no-repeat;
  background-size: 20px;
}
.post_r_block .r_all .view {
  position: absolute;
  right: 0;
}
.post_r_block .r_list li {
  border-bottom: 1px solid #ddd;
  color: #606266;
  position: relative;
  padding: 10px;
}
.post_r_block .r_list .l1 {
  font-size: 16px;
}
.post_r_block .r_list .l2 {
  font-size: 14px;
}
.post_r_block .r_list .l3 {
  font-size: 14px;
  padding-top: 10px;
}
.post_r_block .r_list .l3 .address {
  position: absolute;
  left: 200px;
}
.post_r_block .r_list .l4 {
  display: none;
  height: 26px;
  width: 26px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: url("../../assets/images/common/dui.png") right center no-repeat;
  background-size: 26px;
}
.post_r_block .r_list li.active .l4 {
  display: inline-block;
}
.online_post {
  padding: 0;
}
</style>