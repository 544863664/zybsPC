<!-- 已下载简历 -->
<template>
  <div class="center">
    <div class="company">
      <div class="com1">
        <div class="com2">
          <img src="../../../assets/images/enter/gzh.png" alt style="width:100%" />
          <p>小程序官网</p>
        </div>
        <div class="com1_1">
          <span class="name">简历名称</span>
          <el-input
            v-model.trim="search.resumeName"
            placeholder="输入简历名称"
            @keyup.enter.native="handleClick"
          ></el-input>
          <span class="name" @click="handleClick">搜索</span>
        </div>
        <div class="com1_1">
          <span class="name">学历</span>
          <el-radio-group v-model="search.Recordofschooling" @change="handleChange1">
            <el-radio label>全部</el-radio>
            <el-radio v-for="tab in findDmList['m_xldm']" :key="tab.dm" :label="tab.dm">{{tab.name}}</el-radio>
          </el-radio-group>
          <!-- <el-select v-model="search.Recordofschooling" placeholder="请选择" @change="handleChange1" style="width: 12.5rem;">
						<el-option label="全部" value="0"></el-option>
						<el-option v-for="tab in findDmList['m_xldm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
          </el-select>-->
        </div>
        <div class="com1_1">
          <span class="name">面试状态</span>
          <el-radio-group v-model="search.offer" @change="handleChange3">
            <el-radio label>全部</el-radio>
            <el-radio label="1">待处理</el-radio>
            <el-radio label="2">已面邀</el-radio>
            <el-radio label="3">面试未通过</el-radio>
            <el-radio label="4">面试通过</el-radio>
          </el-radio-group>
          <!-- <el-select v-model="search.offer" placeholder="请选择" @change="handleChange3">
						<el-option label="全部" value="0"></el-option>
						<el-option label="未处理" value="1"></el-option>
						<el-option label="已面邀" value="2"></el-option>
						<el-option label="面试未通过" value="3"></el-option>
						<el-option label="面试通过" value="4"></el-option>
          </el-select>-->
          <el-button type="text" icon="el-icon-refresh" class="export" @click="resetList">重置</el-button>
        </div>
      </div>
    </div>

    <div class="list">
      <!-- 全部 -->
      <ul>
        <li v-if="search.totalCount==0" class="arrNull">
          <h3>无求职者投递简历</h3>
        </li>
        <li v-for="(item, index) in search.Downresume" :key="index">
          <em class="list_sel"></em>
          <img src="../../../assets/images/common/mine.png" class="user_img" />
          <div class="list_li_1">
            {{item.xm}}
            <i class="list_li_2_1 status3" v-if="item.jlzt==1">未处理</i>
            <i class="list_li_2_1 status4" v-if="item.jlzt==2">已面邀</i>
            <i class="list_li_2_1 status2" v-if="item.jlzt==3">面试未通过</i>
            <i class="list_li_2_1 status1" v-if="item.jlzt==4">面试通过</i>
            <span>
              <i class="tel">{{item.sjhm?item.sjhm:'--'}}</i>
              <i>下载日期：{{item.xzsj?item.xzsj:'--'}}</i>
            </span>
          </div>
          <div class="list_li_2">
            <span
              class="list_li_2_2"
            >{{item.xl?findDmMap['m_xldm'][item.xl]:'--'}}/{{item.zjgwmc?item.zjgwmc:'--'}}</span>
          </div>
          <div class="list_li_3">
            <span class="list_li_3_1">{{item.xxmc?item.xxmc:'--'}}</span>
            <div class="list_li_3_2">
              <el-button type="danger">发面邀</el-button>
              <el-button type="danger" plain>不合适</el-button>
            </div>
          </div>
          <p class="list_li_4">简历ID：01</p>
        </li>
      </ul>
      <el-pagination
        v-if="search.totalCount>10"
        @current-change="handleCurrentChange"
        :current-page="search.currentPage"
        :page-size="search.pageSize"
        layout="prev, pager, next"
        :total="search.totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import Moment from "../common/moment.js"

export default {
  name: "Enter_downresume",
  components: {},
  data() {
    return {
      search: {
        resumeName: "",
        Recordofschooling: "",
        offer: "",
        Downresume: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  created() {
    this.getDownresume(
      this.search.currentPage,
      this.search.pageSize,
      this.search.resumeName,
      this.search.Recordofschooling,
      this.search.offer
    );
  },
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList
    })
  },
  methods: {
    resetList() {
      this.search.resumeName = "";
      this.search.Recordofschooling = "";
      this.search.offer = "";
      this.search.currentPage = 1;
      this.getDownresume(
        this.search.currentPage,
        this.search.pageSize,
        this.search.resumeName,
        this.search.Recordofschooling,
        this.search.offer
      );
    },
    getDownresume(page, limit, name, xl, yyzt) {
      this.axios({
        method: "get",
        url: "/api/hr/qyhxrxx/findYxzHxrList",
        data: {
          page: page,
          limit: limit,
          xm: name,
          xl: xl,
          yyzt: yyzt
        },
        params: "",
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      })
        .then(response => {
          if (response && response.data && response.data.code == 0) {
            this.search.totalCount = response.data.page.totalCount;
            var data = response.data.page.list;
            console.log(data);
            // this.search.Downresume = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange(currentPage) {
      this.search.currentPage = currentPage;
      this.getDownresume(
        this.search.currentPage,
        this.search.pageSize,
        this.search.resumeName,
        this.search.Recordofschooling,
        this.search.offer
      );
    },
    handleClick() {
      console.log(this.search.resumeName);
      this.search.currentPage = 1;
      this.getDownresume(
        this.search.currentPage,
        this.search.pageSize,
        this.search.resumeName,
        this.search.Recordofschooling,
        this.search.offer
      );
    },
    handleChange1() {
      this.search.currentPage = 1;
      this.getDownresume(
        this.search.currentPage,
        this.search.pageSize,
        this.search.resumeName,
        this.search.Recordofschooling,
        this.search.offer
      );
    },
    handleChange3() {
      this.search.currentPage = 1;
      this.getDownresume(
        this.search.currentPage,
        this.search.pageSize,
        this.search.resumeName,
        this.search.Recordofschooling,
        this.search.offer
      );
    }
  }
};
</script>

<style scoped>
.export {
  height: 35px;
  font-size: 14px;
  color: #fc5e5b;
  margin-left: 106px;
  float: right;
  padding-right: 0 !important;
}
.user_img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgb(13, 130, 194);
  float: left;
  margin-right: 15px;
}

.list {
  margin-top: 20px;
}
.list .arrNull {
  background: #f6f6f8;
  text-align: center;
  line-height: 20;
  color: #b2b2b3;
}
.list li {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  font-size: 14px;
  position: relative;
}
.list li .list_sel {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 26px;
  height: 26px;
  background: url("../../../assets/images/enter/select.png") 0 0 no-repeat;
  background-size: 26px;
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
.list .list_li_1 i {
  margin-left: 20px;
  cursor: default;
  display: inline-block;
  line-height: 30px;
}
.list .list_li_1 i.tel {
  padding-left: 20px;
  background: url("../../../assets/images/enter/s8.png") 0 center no-repeat;
  background-size: 17px;
}
.list .list_li_2 {
  font-size: 14px;
  color: #606266;
  padding: 10px 0 0 0;
}
.list .list_li_2_1 {
  height: 20px;
  padding: 0 10px;
  line-height: 20px !important;
  display: inline-block;
  margin-left: 10px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  background: rgba(40, 202, 66, 0.6);
}

.list .list_li_2_1.status4 {
  color: rgba(40, 202, 66, 0.6);
  border: 1px solid rgba(40, 202, 66, 0.6);
  background: #fff;
}
.list .list_li_2_1.status2 {
  background: #fc5e5b;
}
.list .list_li_2_1.status3 {
  background: #fff;
  color: #fc5e5b;
  border: 1px solid #fc5e5b;
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
  top: 24px;
}
.list .list_li_3_2 .el-button {
  width: 120px;
}
.list .list_li_4 {
  font-size: 12px;
  /* position: absolute;
	bottom: 0; */
  padding-top: 10px;
}

.company {
  display: flex;
  background: #fff;
  overflow: auto;
  position: relative;
  padding: 20px;
}
.company .com1 {
  flex: 1;
  position: relative;
}
.company .com2 {
  font-size: 12px;
  color: #606266;
  text-align: center;
  width: 65px;
  height: 90px;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
}
.company .com1 .com1_1 {
  font-size: 14px;
  color: #606266;
  display: block;
}
.com1_1 {
  margin-bottom: 10px;
}
.com1_1 .name {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  width: 78px;
  background: #fc5e5b;
  text-align: center;
  color: #fff;
  margin-right: 20px;
  cursor: pointer;
}
.com1_1 /deep/.el-input {
  border: 1px solid #e6e6e6;
  width: 400px;
  height: 33px;
  vertical-align: middle;
}
.com1_1 /deep/.el-input__inner {
  padding-left: 10px;
  height: 33px;
  width: 100%;
}
.com1_1 /deep/.el-date-editor--date {
  width: 204px;
}
.com1_1 /deep/.el-date-editor--date .el-input__inner {
  padding-left: 32px;
}
.com1_1 /deep/.el-select .el-input {
  width: 204px;
}
.com1_1 /deep/.el-input__icon {
  line-height: 32px;
}
.com1_1 .line {
  padding: 0 20px;
  color: #e6e6e6;
}
</style>
