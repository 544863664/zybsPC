<!-- 企业中心 -->
<template>
  <div class="center">
    <div class="company">
      <div class="com1">
        <img class="com1_0" :src="imageUrl||enterimg" alt />
        <p class="com1_1">
          <span target="_blank" @click="godetail(enterInfo.dwid)">{{enterInfo.dwqc}}</span>
        </p>
        <p class="com1_2">{{enterInfo.wx?enterInfo.wx:'未绑定微信'}}</p>
        <div class="com1_3">
          <img src="../../../assets/images/enter/gzh.png" alt style="width:50%" />
          <p>小程序官网</p>
        </div>
      </div>
      <div class="com2">
        <div class="com2_1">
          <p class="com2_1_1">{{JoinStatistical.ydcgs||'--'}}</p>
          <p class="com2_1_2">预定成功双选会</p>
        </div>
        <div class="com2_1">
          <p class="com2_1_1">{{JoinStatistical.ycjhxs||'--'}}</p>
          <p class="com2_1_2">已参加双选会</p>
        </div>
        <div class="com2_1">
          <p class="com2_1_1">{{JoinStatistical.hrzzzws||'--'}}</p>
          <p class="com2_1_2">在招职位数量</p>
        </div>
        <div class="com2_1">
          <p class="com2_1_1">{{JoinStatistical.hrsdjls||'--'}}</p>
          <p class="com2_1_2">收到简历</p>
        </div>
        <div class="com2_1 none">
          <p class="com2_1_1">{{JoinStatistical.hrxzjls||'--'}}</p>
          <p class="com2_1_2">已下载简历</p>
        </div>
      </div>
    </div>

    <ul class="ul_tab">
      <li :class="{'active':tab == 1}" @click="setTab(1)">
        <span class="tip">已预订成功的双选会</span>
      </li>
      <li :class="{'active':tab == 2}" @click="setTab(2)">
        <span class="tip">正在参加的双选会</span>
      </li>
      <li :class="{'active':tab == 3}" @click="setTab(3)">
        <span class="tip">曾经参加的双选会</span>
      </li>
    </ul>

    <!-- 已预订成功的双选会 -->
    <div class="list" v-if="tab == 1">
      <ul>
        <li v-if="beforeJoinSxh.totalCount==0" class="arrNull">
          <h3>无已预订双选会</h3>
        </li>
        <li v-for="(item, index) in beforeJoinSxh.beforeJoin" :key="index">
          <div class="list_li_1">
            {{item.hymc}}
            <span>申请时间：</span>
          </div>
          <div class="list_li_2">
            <span class="list_li_2_1 status1">即将开始</span>
            <span class="list_li_2_2">{{item.hykssj}} 至 {{item.hyjssj}}</span>
          </div>
          <div class="list_li_3">
            <span class="list_li_3_1">
              企业
              <i>{{item.cjqys}}</i>家
            </span>
            <span class="list_li_3_1">
              岗位
              <i>{{item.hyfbgws}}</i>个
            </span>
            <div class="list_li_3_2">
              <el-button type="danger" @click="addJobs(item.hxid)">发布岗位</el-button>
              <el-button type="danger" plain @click="enter(item.hxid)">进入会场</el-button>
            </div>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="beforeJoinSxh.totalCount>10"
        @current-change="handleCurrentChange"
        :current-page="beforeJoinSxh.currentPage"
        :page-size="beforeJoinSxh.pageSize"
        layout="prev, pager, next"
        :total="beforeJoinSxh.totalCount"
      ></el-pagination>
    </div>
    <!-- 正在参加的双选会 -->
    <div class="list" v-if="tab == 2">
      <ul>
        <li v-if="goingJoinSxh.totalCount==0" class="arrNull">
          <h3>无正在参加的双选会</h3>
        </li>
        <li v-for="(item, index) in goingJoinSxh.goingJoin" :key="index">
          <div class="list_li_1">
            {{item.hymc}}
            <span>申请时间：</span>
          </div>
          <div class="list_li_2">
            <span class="list_li_2_1 status2">进行中</span>
            <span class="list_li_2_2">{{item.hykssj}} 至 {{item.hyjssj}}</span>
          </div>
          <div class="list_li_3">
            <span class="list_li_3_1">
              企业
              <i>{{item.cjqys}}</i>家
            </span>
            <span class="list_li_3_1">
              岗位
              <i>{{item.hyfbgws}}</i>个
            </span>
            <div class="list_li_3_2">
              <el-button type="danger" @click="addJobs">发布岗位</el-button>
              <el-button type="danger" plain @click="enter(item.hxid)">进入会场</el-button>
            </div>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="goingJoinSxh.totalCount>10"
        @current-change="handleCurrentChange"
        :current-page="goingJoinSxh.currentPage"
        :page-size="goingJoinSxh.pageSize"
        layout="prev, pager, next"
        :total="goingJoinSxh.totalCount"
      ></el-pagination>
    </div>
    <!-- 曾经参加的双选会 -->
    <div class="list" v-if="tab == 3">
      <ul>
        <li v-if="everJoinSxh.totalCount==0" class="arrNull">
          <h3>无曾经参加的双选会</h3>
        </li>
        <li v-for="(item, index) in everJoinSxh.everJoin" :key="index">
          <div class="list_li_1">
            {{item.hymc}}
            <span>申请时间：</span>
          </div>
          <div class="list_li_2">
            <span class="list_li_2_1 status3">已结束</span>
            <span class="list_li_2_2">{{item.hykssj}} 至 {{item.hyjssj}}</span>
          </div>
          <div class="list_li_3">
            <span class="list_li_3_1">
              企业
              <i>{{item.cjqys}}</i>家
            </span>
            <span class="list_li_3_1">
              岗位
              <i>{{item.hyfbgws}}</i>个
            </span>
            <div class="list_li_3_2">
              <el-button type="danger" @click="addJobs">发布岗位</el-button>
              <el-button type="danger" plain @click="enter(item.hxid)">进入会场</el-button>
            </div>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="everJoinSxh.totalCount>10"
        @current-change="handleCurrentChange"
        :current-page="everJoinSxh.currentPage"
        :page-size="everJoinSxh.pageSize"
        layout="prev, pager, next"
        :total="everJoinSxh.totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import enter from "../../../assets/images/common/enterDetail.png";
export default {
  name: "Enter_center",
  components: {},
  data() {
    return {
      enterimg: enter,
      tab: 1,
      enterInfo: {},
      JoinStatistical: {},
      beforeJoinSxh: {
        beforeJoin: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      },
      goingJoinSxh: {
        goingJoin: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      },
      everJoinSxh: {
        everJoin: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      imageUrl: "getHREnterLogo"
    }),
    ...mapState({
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList
    })
  },
  methods: {
    // 点击tab
    setTab(val) {
      this.tab = val;
      if (this.tab == 1) {
        this.getJoinSxh(
          1,
          this.beforeJoinSxh.currentPage,
          this.beforeJoinSxh.pageSize
        );
      }
      if (this.tab == 2) {
        this.getJoinSxh(
          2,
          this.goingJoinSxh.currentPage,
          this.goingJoinSxh.pageSize
        );
      }
      if (this.tab == 3) {
        this.getJoinSxh(
          3,
          this.everJoinSxh.currentPage,
          this.everJoinSxh.pageSize
        );
      }
    },
    getJoinSxh(type, page, limit) {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/hr/bshxxx/findYdHxPageAllListByDw",
          data: "",
          params: {
            page: page,
            limit: limit,
            type: type
          },
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          // console.log("getJoinSxh:", response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.page.list;
            if (type == 1) {
              that.beforeJoinSxh.totalCount = response.data.page.totalCount;
              that.beforeJoinSxh.beforeJoin = data;
            }
            if (type == 2) {
              that.goingJoinSxh.totalCount = response.data.page.totalCount;
              
              that.goingJoinSxh.goingJoin = data;
              
            }
            if (type == 3) {
              that.everJoinSxh.totalCount = response.data.page.totalCount;
              that.everJoinSxh.everJoin = data;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getJoinStatistical() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/hr/bshxxx/hrInfoTj",
          data: "",
          params: "",
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          // console.log('getJoinStatistical:', response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.qygrxxtjVO;
            that.JoinStatistical = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange(currentPage) {
      if (this.tab == 1) {
        this.beforeJoinSxh.currentPage = currentPage;
        this.getJoinSxh(
          1,
          this.beforeJoinSxh.currentPage,
          this.beforeJoinSxh.pageSize
        );
      }
      if (this.tab == 2) {
        this.goingJoinSxh.currentPage = currentPage;
        this.getJoinSxh(
          2,
          this.goingJoinSxh.currentPage,
          this.goingJoinSxh.pageSize
        );
      }
      if (this.tab == 3) {
        this.everJoinSxh.currentPage = currentPage;
        this.getJoinSxh(
          3,
          this.everJoinSxh.currentPage,
          this.everJoinSxh.pageSize
        );
      }
    },
    getEnterInfo() {
      var that = this;
      that.axios
        .get("/api/hr/qydwhrxx/getHrInfo", {
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          // console.log('mineMessgae:', response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.qyDwhrxxEntity;
            that.enterInfo = data;
            if (!that.imageUrl) {
              that.userinfoLogo();
            }
          } else {
            that.$message({
              message: "无单位信息，待加入公司审核通过",
              offset: 400
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    userinfoLogo() {
      var dwid = this.enterInfo.dwid;
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
        console.log(res);
        if (res && res.data && res.data.code == 0) {
          var data = res.data.page;
          var logoArr = [];
          var newLogo = "";
          data.map(item => {
            if (item.wjlx == 20 && item.wjlx) {
              logoArr.push(item);
            }
          });
          if (logoArr.length > 0) {
            newLogo = logoArr[logoArr.length - 1].wjid;
            this.userinfoImg(newLogo);
          }
        }
      });
    },
    userinfoImg(fileId) {
      var dwid = this.userInfo.dwid;
      this.axios({
        method: "get",
        url: "/api/hr/qydwhrxx/getFile/" + fileId,
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
    enter(hxid) {
      //进入会议
      this.$router.push({
        path: "/public/meetinghall",
        query: {
          hxid: hxid
        }
      });
    },
    addJobs(id) {
      this.$router.push({
        path: "/private/Enter_postcreate",
        query: {
          posthxid: id
        }
      });
    },
    //进入企业详情
    godetail(dwid) {
      this.$router.push({ path: "/public/enterDetail", query: { dwid: dwid } });
    }
  },
  created() {
    this.getEnterInfo();
    this.getJoinStatistical();
    this.getJoinSxh(
      1,
      this.beforeJoinSxh.currentPage,
      this.beforeJoinSxh.pageSize
    );
  }
};
</script>

<style scoped>
.list li {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  font-size: 14px;
}
.list .arrNull {
  background: #f6f6f8;
  text-align: center;
  line-height: 20;
  color: #b2b2b3;
}
.list .list_li_1 {
  font-size: 16px;
  color: #303133;
  font-weight: bold;
  position: relative;
}
.list .list_li_1 span {
  font-size: 12px;
  color: #909399;
  font-weight: normal;
  position: absolute;
  right: 0;
  top: 0;
}
.list .list_li_2 {
  font-size: 12px;
  color: #606266;
  padding: 10px 0 10px 0;
}
.list .list_li_2_1 {
  height: 20px;
  line-height: 20px;
  width: 65px;
  display: inline-block;
  margin-right: 10px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  background: rgba(40, 202, 66, 0.6);
}
.list .list_li_2_1.status2 {
  background: #28ca42;
}
.list .list_li_2_1.status3 {
  background: #fc5e5b;
}
.list .list_li_3 {
  position: relative;
  height: 30px;
}
.list .list_li_3_1 {
  margin-right: 30px;
  line-height: 47px;
}
.list .list_li_3_1 i {
  font-size: 14px;
  color: #fc5e5b;
}
.list .list_li_3_2 {
  position: absolute;
  right: 0;
  top: 0;
}
.list .list_li_3_2 .el-button {
  width: 120px;
}

.center {
}
.company {
}
.company .com1 {
  background: #fff;
  padding: 20px;
  overflow: auto;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}
.company .com1 .com1_0 {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
.company .com1 .com1_1 {
  font-size: 18px;
  color: #303133;
  padding: 10px 0;
  font-weight: bold;
}
.company .com1 .com1_1 a {
  color: #303133;
}
.company .com1 .com1_1 a:hover {
  color: #fc5e5b;
}
.company .com1 .com1_2 i {
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  background: url("../../../assets/images/enter/Icon-arrow-double-right.png")
    no-repeat;
}
.company .com1 .com1_3 {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 12px;
  color: #606266;
  text-align: center;
}
.company .com2 {
  background: #fff;
  display: flex;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: #606266;
}
.company .com2 .com2_1 {
  flex: 1;
  border-right: 1px solid #e6e6e6;
}
.company .com2 .com2_1.none {
  border: 0;
}
.company .com2 .com2_1_1 {
  font-size: 22px;
  color: #fc5e5b;
  font-weight: bold;
}
.company .com2 .com2_1_2 {
  line-height: 30px;
}
.ul_tab {
  height: 30px;
  cursor: default;
  padding: 20px 0;
}
.ul_tab li {
  float: left;
  margin-right: 42px;
  color: #909399;
}
.ul_tab li .tip {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}
.ul_tab li.active .tip {
  color: #fc5e5b;
  border-bottom: 2px solid #fc5e5b;
  display: inline-block;
  padding-bottom: 5px;
}
</style>
