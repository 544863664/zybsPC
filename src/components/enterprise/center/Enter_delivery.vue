<!-- 双选会管理 -->
<template>
  <div class="center">
    <div class="company">
      <div class="com1">
        <div class="com1_1">
          <span class="name">会务名称</span>
          <el-input v-model.trim="value2" placeholder="会务名称" @keyup.enter.native="search"></el-input>
          <span class="name" style="cursor: pointer;" @click="search">搜索</span>
        </div>
        <div class="com1_1">
          <span class="name">时间</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            align="left"
            unlink-panels
            range-separator="至"
            format="yyyy-MM"
            value-format="yyyy-MM"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="chanes"
            style="width: auto;border: 1px solid #DCDFE6;vertical-align: bottom;"
          ></el-date-picker>
        </div>
        <div class="com1_1">
          <span class="name">预定状态</span>
          <el-radio-group v-model="value3" @change="changeselect">
            <el-radio label="1">全部</el-radio>
            <el-radio label="2">未参加</el-radio>
            <el-radio label="3">预定成功</el-radio>
            <el-radio label="4">待审核</el-radio>
            <el-radio label="5">已拒绝</el-radio>
          </el-radio-group>
          <el-button
            type="text"
            icon="el-icon-refresh"
            style="margin-left: 30px;"
            @click="resetList"
          >重置</el-button>
          <!-- <el-select placeholder="请选择" v-model="value3" @change="changeselect">
						<el-option label="全部" value="1"></el-option>
						<el-option label="未参加" value="2"></el-option>
						<el-option label="预定成功" value="3"></el-option>
						<el-option label="待审核" value="4"></el-option>
						<el-option label="已拒绝" value="5"></el-option>
          </el-select>-->
        </div>
      </div>
      <div class="com2">
        <img src="../../../assets/images/enter/gzh.png" alt style="width:100%" />
        <p>小程序官网</p>
      </div>
    </div>

    <div class="list">
      <ul>
        <li v-if="totalCount==0" class="arrNull">
          <h3>无数据</h3>
        </li>
        <li v-for="(item, index) in JoinList" :key="index">
          <div class="list_li_1">
            {{item.hymc}}
            <span>预定截止时间：{{item.hyjssj}}</span>
          </div>
          <div class="list_li_2">
            <span
              class="list_li_2_1"
              :class="item.shzt=='2'?'status2':item.shzt=='0'?'status3':''"
              v-if="item.shzt&&value3!='2'"
            >{{item.shzt=='0'?'审核中':item.shzt=='1'?'已通过':item.shzt=='2'?'已拒绝':''}}</span>
            <span class="list_li_2_2">{{item.hykssj}} 至 {{item.hyjssj}}</span>
          </div>
          <div class="list_li_3">
            <span class="list_li_3_1">会务类型：{{findDmMap['m_hyktdm'][item.hylx]}}</span>
            <div class="list_li_3_2">
              <el-button
                type="danger"
                v-if="item.ifks==1"
                @click="hrSignup(item.hxid, item.shzt)"
              >{{item.shzt=='0'&&value3!='2'?'审核中':item.shzt=='1'&&value3!='2'?'发布岗位':'立即报名'}}</el-button>
              <el-button
                type="danger"
                v-if="item.ifks==2"
                @click="hrSignup(item.hxid, item.shzt)"
              >已开始</el-button>
              <el-button type="danger" v-if="item.ifks==3">已结束</el-button>
              <el-button type="danger" plain @click="enter(item.hxid)">进入会场</el-button>
            </div>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="totalCount>10"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount"
      ></el-pagination>


      <!-- 立即报名支付功能 S -->
      <el-dialog
        :visible.sync="isNeedPay"
        width="50%"
        :before-close="handleClose">
        <div class="payWrapper">
          <div class="np-head">
            
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 立即报名支付功能 E -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Moment from "../../common/moment.js";

export default {
  name: "Enter_delivery",
  components: {},
  data() {
    return {
      value2: "",
      value1: ["", ""],
      data1: "",
      data2: "",
      value3: "1",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      JoinList: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      isNeedPay:false   // 立即报名
    };
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
      this.currentPage = 1;
      this.value1 = ["", ""];
      this.value2 = "";
      this.data1 = "";
      this.data2 = "";
      this.value3 = "1";
      this.getJoinList(
        Number(this.value3),
        this.value2,
        this.data1,
        this.data2,
        this.currentPage,
        this.pageSize
      );
    },
    getJoinList(type, hymc, kssj, jssj, page, limit) {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/hr/bshxxx/findHxPageAllListBySelf",
          data: "",
          params: {
            page: page,
            limit: limit,
            hymc: hymc,
            kssj: kssj,
            jssj: jssj,
            type: type
          },
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          // console.log('getJoinList:', response);
          if (response && response.data && response.data.code == 0) {
            that.totalCount = response.data.page.totalCount;
            var data = response.data.page.list;
            var tdate = Moment.moment1();
            that.JoinList = data.map(item => {
              if (tdate < Moment.moment2(item.hykssj)) {
                item.ifks = 1;
                return item;
              } else if (
                Moment.moment2(item.hykssj) < tdate &&
                tdate < Moment.moment2(item.hyjssj)
              ) {
                item.ifks = 2;
                return item;
              } else if (Moment.moment2(item.hyjssj) < tdate) {
                item.ifks = 3;
                return item;
              }
              return item;
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    hrSignup(hxid, shzt) {
      // 立即报名支付功能
      // let kg = false
      // if(!shzt) {
      //   this.isNeedPay = true
      // }

      // if(!kg) {
      //   return
      // }

      //HR报名
      var that = this;
      var hxidarr = [hxid];
      if (shzt == "0") {
        that.$message({
          message: "已在审核中，请勿重复操作",
          offset: 400
        });
      } else if (shzt == "1") {
        that.$router.push({
          path: "/private/Enter_postcreate",
          query: {}
        });
      } else {
        that
          .axios({
            method: "post",
            url: "/api/hr/bsdwbmxx/addBmhxxMore",
            data: hxidarr,
            params: "",
            headers: {
              "content-type": "application/json",
              token: that.token
            }
          })
          .then(function(response) {
            if (response && response.data && response.data.code == 0) {
              that.$message({
                type: "success",
                message: "报名成功",
                offset: 400
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
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getJoinList(
        Number(this.value3),
        this.value2,
        this.data1,
        this.data2,
        this.currentPage,
        this.pageSize
      );
    },
    search() {
      this.currentPage = 1;
      this.getJoinList(
        Number(this.value3),
        this.value2,
        this.data1,
        this.data2,
        this.currentPage,
        this.pageSize
      );
    },
    chanes() {
      var value = this.value1;
      this.data1 = Moment.formatDate2(value[0]);
      this.data2 = Moment.formatDate2(value[1]);
      this.currentPage = 1;
      this.getJoinList(
        Number(this.value3),
        this.value2,
        this.data1,
        this.data2,
        this.currentPage,
        this.pageSize
      );
    },
    changeselect(val) {
      this.value3 = val;
      if (val == "1") {
        this.value2 = "";
        this.value1 = ["", ""];
        this.data1 = "";
        this.data2 = "";
      }
      this.currentPage = 1;
      this.getJoinList(
        Number(val),
        this.value2,
        this.data1,
        this.data2,
        this.currentPage,
        this.pageSize
      );
    },
    enter(hxid) {
      //进入会议
      this.$router.push({
        path: "/public/meetinghall",
        query: {
          hxid: hxid
        }
      });
    }
  },
  created() {
    this.getJoinList(
      Number(this.value3),
      this.value2,
      this.data1,
      this.data2,
      this.currentPage,
      this.pageSize
    );
  }
};
</script>

<style scoped>
/* 立即支付 S */
.payWrapper .np-head{
  height: 60px;
  width: 100%;
  background: #E6E6E6;
  background-color: #E6E6E6;
}
/* 立即支付 E */

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
  padding: 10px 0 0 0;
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
  top: 0;
}
.list .list_li_3_2 .el-button {
  width: 120px;
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
}
.company .com2 {
  font-size: 12px;
  color: #606266;
  text-align: center;
  width: 65px;
  height: 60px;
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
}
.com1_1 /deep/.el-input {
  border: 1px solid #e6e6e6;
  width: 350px;
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
  line-height: 1;
}
.com1_1 .line {
  padding: 0 20px;
  color: #e6e6e6;
}
/deep/ .el-date-editor .el-range-separator {
  line-height: 25px;
}
</style>
