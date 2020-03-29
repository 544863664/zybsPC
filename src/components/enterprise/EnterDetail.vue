<template>
  <!-- 公司详情 -->
  <div class="company">
    <Head />
    <div class="body">
      <div class="header">
        <!-- <img src="../../assets/images/search/post-img.png" alt /> -->
        <img v-if="!imageUrl" src="../../assets/images/common/enterDetail.png" alt />
        <img v-if="imageUrl" :src="imageUrl" alt />
        <!-- <img :src="imageUrl||enterimg" alt=""  /> -->
        <div class="h_center">
          <h1>{{job.dwmc}}</h1>
          <h2>{{job.dwxz}}</h2>
          <h2>{{findDmMap['m_dwgmdm'][job.dwgm]}}</h2>
        </div>
        <a href="#aa">
          <!-- 描点-->
          <div class="h_right">
            <p class="p1">{{job.gwCount}}</p>
            <p class="p2">在招职位</p>
          </div>
        </a>
        <div class="h_right">
          <p class="p1">{{job.msCount}}</p>
          <p class="p2">共邀面试</p>
        </div>
        <div class="collectbox" @click="Collect()">
          <p>
            <img class="Collectimg" :class="collect" src="../../assets/images/common/star-off.png" alt />
          </p>
        </div>
      </div>
      <!-- 公司简介 -->
      <div class="brief">
        <h1 class="com_title">公司简介：</h1>
        <div class="com_con">{{job.dwjs}}</div>
      </div>
      <!-- 公司地址 -->
      <div class="brief">
        <a name="aa">
          <!-- 描点-->
          <h1 class="com_title">公司地址：</h1>
        </a>
        <div class="com_con">
          <p>{{job.dwszsf}}{{job.dwszcs}}{{job.dwszxxdz}}</p>
          <!-- <div>
            <img src="../../assets/images/search/map.png" class="map" />
          </div>-->
        </div>
      </div>
      <!-- 招聘职位 -->

      <div class="brief">
        <h1 class="com_title">招聘职位：</h1>
        <div class="com_con">
          <ul class="post">
            <!-- <li>
              <div class="p_left">
                <p class="p1">
                  FILAF商品主管
                  <span>4k-5k</span>
                </p>
                <p class="p2">
                  <span>西安-曲江文化新区</span>
                  <em>|</em>
                  <span>1年经验</span>
                  <em>|</em>
                  <span>本科</span>
                  <em>|</em>
                  <span>招1人</span>
                  <em>|</em>
                  <span>工商管理</span>
                  <em>|</em>
                  <span>服装设计</span>
                </p>
                <p class="p3">
                  <span>绩效奖金</span>
                  <span>带薪年假</span>
                  <span>专业培训</span>
                  <span>节日福利</span>
                  <span>周末双休</span>
                  <span>通讯补贴</span>
                  <span>餐饮补贴</span>
                  <span>五险一金</span>
                </p>
              </div>
              <div class="p_right">
                <p class="p1">FILA体育有限公司</p>
                <p class="p2">外资 | 50-150人</p>
              </div>
            </li>-->
            <li v-for="(item,i) in dataList" :key="i" @click="goGwDetail(item)">
              <div class="p_left">
                <p class="p1">
                  {{item.gwmc}}
                  <span>{{findDmMap['m_xzdydm'][item.gwyx]}}</span>
                </p>
                <p class="p2">
                  <span v-if="item.sbsf">{{ProvinceMap[item.sbsf]}}{{CityMap[item.sbsf][item.sbcs]}}</span>
                  <span v-if="!item.sbsf">无</span>
                  <em>|</em>
                  <span v-if="item.jyyq">{{findDmMap['m_jyyqdm'][item.jyyq]}}</span>
                  <span v-if="!item.jyyq">无</span>
                  <em>|</em>
                  <span v-if="item.xlyq">{{findDmMap['m_xldm'][item.xlyq]}}</span>
                   <span v-if="!item.xlyq">无</span>
                  <em>|</em>
                  <span>招{{item.zprs}}人</span>
                  <em>|</em>
                  <!-- <span>工商管理</span>
                  <em>|</em>-->
                  <span v-if="item.dwsshy">{{findDmMap['m_dwsshydm'][item.dwsshy]}}</span>
                  <span v-if="!item.dwsshy">无</span>
                </p>
                <p class="p3">
                  <span v-for="(work,i) in item.fllist" :key="i">{{findDmMap['m_gwfldm'][work.dm]}}</span>
                  <!-- <span>带薪年假</span>
                  <span>专业培训</span>
                  <span>节日福利</span>
                  <span>周末双休</span>
                  <span>通讯补贴</span>
                  <span>餐饮补贴</span>
                  <span>五险一金</span>-->
                </p>
              </div>
              <div class="p_right">
                <p class="p1">{{item.dwmc}}</p>
                <p
                  class="p2"
                >{{findDmMap['m_dwxzdm'][item.dwxz]}} | {{findDmMap['m_dwgmdm'][item.dwgm]}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 公司环境 -->
      <!-- <div class="brief">
        <h1 class="com_title">公司环境：</h1>
        <div class="com_con">
          <img src="../../assets/images/enter/c1.png" class="cimg" />
          <img src="../../assets/images/enter/c2.png" class="cimg" />
          <img :src="imageUrl" class="cimg"/>
        </div>
      </div>-->
    </div>
    <Foot />
  </div>
</template>

<script>
import Head from "../Head.vue";
import Foot from "../Foot.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
// import enter from '../../assets/images/common/enter.png'
export default {
  name: "EnterDetail",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      // enterimg: enter,
      dataList: [], //招聘列表
      imageUrl: "",
      dwid: "",
      // 是否收藏
      collect: false,
      default:"无",
      job: {
        dwmc: "", //单位名称
        dwxz: "", //单位性质
        sshy: "", //所属行业
        dwszcs: "", //单位所在城市
        dwgm: "", //单位规模
        dwszxxdz: "", //公司详细地址
        dwjs: "", //单位介绍
        dwszsf: "", //单位所在省份
        msCount: "", //面试邀约数量
        gwCount: "" //在招职位数量
      }
    };
  },
  created() {
    // var that = this;
    // console.log("vuex", that.$store);
    this.dwid = this.$route.query.dwid;
    this.enterpriseDetail(this.dwid);
    this.number(this.dwid);
    this.gwlist(this.dwid);
    // this.userinfoLogo();
    this.userinfoImg(this.dwid);
  },
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
      //   token: state => state.httptoken,
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList,
      ProvinceList: state => state.ProvinceList,
      ProvinceMap: state => state.ProvinceMap,
      CityList: state => state.CityList,
      CityMap: state => state.CityMap,
      AreaList: state => state.AreaList,
      AreaMap: state => state.AreaMap
    })
  },
  methods: {
    enterpriseDetail(dwid) {
      this.axios({
        url: `/api/qz/qzgrjbxx/getDwInfo`,
        method: "post",
        headers: {
          // token: this.token
        },
        params: {
          dwid: dwid
        }
      })
        .then(res => {
          // console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.page.list;
            this.job.dwmc = res.data.dwInfo.dwmc;
            this.job.dwszsf = res.data.dwInfo.dwszsf;
            this.job.dwxz = res.data.dwInfo.dwxz;
            this.job.sshy = res.data.dwInfo.sshy;
            this.job.dwszcs = res.data.dwInfo.dwszcs;
            this.job.dwgm = res.data.dwInfo.dwgm;
            this.job.dwszxxdz = res.data.dwInfo.dwszxxdz;
            this.job.dwjs = res.data.dwInfo.dwjs;
            // this.dwid = res.data.dwInfo.dwid; //单位id
            // console.log(this.dwid)
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //获取在招聘岗位的数量
    number(dwid) {
      this.axios({
        url: `/api/hr/bskhgl/getGwYyCount`,
        method: "get",
        headers: {
          // token: this.token
        },
        params: {
          dwid: dwid
        }
      })
        .then(res => {
          // console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.page.list;
            this.job.msCount = res.data.msCount;
            this.job.gwCount = res.data.gwCount;
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //list列表
    gwlist(dwid) {
      this.axios({
        url: `/api/hr/bskhgl/getGwListByDwId`,
        method: "post",
        headers: {
          // token: this.token
        },
        params: {
          dwid: dwid
        }
      })
        .then(res => {
          // console.log(res);
          if (res && res.data && res.data.code === 0) {
            this.dataList = res.data.gwList;
           
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },

    //公司logo
    // userinfoLogo() {
    //   this.axios({
    //     method: "post",
    //     url: `/api/hr/qydwhrxx/getDwFileList?dwid=${this.$route.query.dwid}`,
    //     data: "",
    //     params: "",
    //     headers: {
    //       "content-type": "application/json",
    //       token: this.token
    //     }
    //   }).then(res => {
    //     if (res && res.data && res.data.code == 0) {
    //       var data = res.data.page;
    //       var logoArr = [];
    //       var newLogo = "";
    //       data.map(item => {
    //         if (item.wjlx == 20 && item.wjlx) {
    //           logoArr.push(item);
    //         }
    //       });
    //       // console.log(logoArr.length)
    //       if (logoArr.length > 0) {
    //         newLogo = logoArr[logoArr.length - 1].wjid;
    //         this.userinfoImg(newLogo);
    //       }
    //     }
    //   });
    // },
    // userinfoImg(fileId) {
    //   // var dwid = this.job.dwid;
    //   this.axios({
    //     method: "get",
    //     url: "/api/hr/qydwhrxx/getFile/" + fileId,
    //     data: "",
    //     params: {
    //       // userId:dwid,
    //       fileType: 20
    //     },
    //     headers: {
    //       "content-type": "application/json",
    //       token: this.token
    //     }
    //   }).then(res => {
    //     this.imageUrl = res.data.fileUrl;
    //     sessionStorage.setItem("hrimgUrl", this.imageUrl);
    //   });
    // },
    userinfoImg(dwid) {
      // var dwid = this.job.dwid;
      this.axios({
        method: "get",
        url: "/api/hr/qydwhrxx/getDwLogo",
        data: "",
        params: {
          dwid: dwid
          // fileType: 20
        },
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        this.imageUrl = res.data.fileUrl;
        // sessionStorage.setItem('hrimgUrl', this.imageUrl)
      });
    },
    //跳转到公司详情
    goGwDetail(item) {
      // console.log(item)
      let gwid = item.gwid;
      let dwmc = item.dwmc;
      this.$router.push({
        path: "/public/postDetail",
        query: { postId: gwid, sendCompanyName: dwmc, companyId: this.dwid }
      });
    },
    //点击收藏
    Collect() {
       let url = `/api/qz/qzgssc/sc/${this.$route.query.dwid}`;
      if (this.collect) {
        url = `/api/qz/qzgssc/qxsc/${this.$route.query.dwid}`;
      } 
      if (this.token) {
        this.axios({
          method: "post",
          url: url,
          data: {},
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
          .then(res => {
            if (res && res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message:  this.collect ? "取消收藏成功" : "收藏成功",
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
    }
  }
};
</script>
<style scoped lang="less">
.cimg {
  width: 50%;
  height: 400px;
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
}
.company .header {
  padding: 37px;
  color: #606266;
  display: flex;
  background: #fff;
}
.company .header .h_center {
  width: 47%;
}
.company .header .h_right {
  padding-top: 43px;
  width: 140px;
  text-align: center;
  color: #606266;
  line-height: 30px;
}
.company .header .h_right .p1 {
  font-size: 24px;
  font-weight: bold;
}
.company .header .h_right .p2 {
  font-size: 18px;
  font-weight: normal;
}
.company .header img {
  width: 150px;
  height: 150px;
  margin-right: 20px;
}
.company .header h1 {
  font-size: 28px;
  line-height: 40px;
  font-weight: normal;
}
.company .header h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
}

.brief {
  padding: 20px;
  margin-top: 20px;
  color: #606266;
  background: #fff;
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
.com_con {
  line-height: 28px;
}
.com_con .map {
  width: 100%;
  height: 300px;
  margin-top: 10px;
}
.post li {
  background: #f7f7f7;
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  color: #606266;
}
.post .p_left {
  width: 70%;
}
.post .p_right {
  width: 30%;
  text-align: center;
}
.post .p_right .p1 {
  font-size: 18px;
  color: #606266;
  font-weight: bold;
}
.post .p_right .p2 {
  font-size: 14px;
  color: #606266;
}
.post .p_left .p1 {
  font-size: 18px;
  color: #606266;
  font-weight: bold;
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
.collectbox{
  // width: 20px;
  // height: 20px;
  padding-top: 43px;
  width: 140px;
  text-align: center;
  color: #606266;
  line-height: 30px;
  .Collectimg {
    width: 20px !important;
    height: 20px !important;
  }
}
</style>