<!-- 面试结果 -->
<template>
  <div class="center">
    <div class="company">
      <div class="com1">
        <div class="com1_1">
          <span class="name">求职者姓名</span>
          <el-input v-model="xm" placeholder="请输入求职者姓名"></el-input>
          <span class="name" @click="search">搜索</span>
        </div>
        <div class="com1_1">
          <span class="name">学历</span>
          <el-select v-model="xl" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="tab in findDmList['m_xldm']" :key="tab.dm" :value="tab.dm" :label="tab.name"></el-option>
          </el-select>
        </div>
        <div class="com1_1">
          <span class="name">面试结果</span>
          <el-select v-model="interviewResult" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="面试通过" value="7"></el-option>
            <el-option label="面试未通过" value="8"></el-option>
          </el-select>
        </div>
      </div>
      <div class="com2">
        <img src="../../../assets/images/enter/gzh.png" alt style="width:100%" />
        <p>小程序官网</p>
      </div>
    </div>

    <div class="list">
      <!-- 列表渲染 -->
      <ul>
        <li v-for="(item,i) in dataList" :key="i">
          <em class="list_sel"></em>
          <img src="../../../assets/images/common/mine.png" class="user_img" />
          <div class="list_li_1">
            {{item.xm}}
            <i class="list_li_2_1 status2" v-if="item.yyzt == 0">待接受 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 1">已接受 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 2">已面试 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 3">接受未面试 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 4">已拒绝 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 5">HR取消 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 6">HR重新预约 </i>
            <i class="list_li_2_1 status1" v-else-if="item.yyzt == 7">面试通过 </i>
            <i class="list_li_2_1 status2" v-else-if="item.yyzt == 8">面试未通过 </i>
            
            <div v-if="item.yyzt == 7 || item.yyzt == 8"></div>
            <el-radio-group v-model="item.nowradioms" class="interviewBox" @change="handleStatus(item, i)" v-else>
              <el-radio label="7">面试通过 </el-radio>
              <el-radio label="8">面试未通过</el-radio>
            </el-radio-group>

            <span>
              <i class="tel" style="margin-right:20px;">{{item.sjhm}}</i>
              <!-- <i>面试方式：{{item.myfs}}</i> -->
              <!-- <el-select v-model="item.myfs" class="interviewWay" placeholder="请选择面试方式">
                <el-option label="视频" value="1"></el-option>
                <el-option label="线下" value="2"></el-option>
                <el-option label="电话" value="3"></el-option>
              </el-select> -->
            </span>
          </div>
          <div class="list_li_2">
            <span class="list_li_2_2">{{findDmMap['m_xldm'][item.xl]}}/{{item.gwmc}}/{{item.xxmc}}</span>
          </div>

          

          <div class="list_li_3">
            <span class="list_li_3_1">面试情况：</span>
            <div class="list_li_3_2">
              
              <el-input type="textarea" v-model="item.mysm" placeholder="最多200字" maxlength="200" :disabled="item.isEdit"></el-input>
              <div v-if="item.yyzt == 7 || item.yyzt == 8"></div>
              <div class="list_li_3" v-else>
                <span class="interviewWay">面试方式:</span>
                <el-radio-group v-model="item.nowradiofs" @change="handleStatus(item, i)">
                  <el-radio label="1">视频 </el-radio>
                  <el-radio label="2">线下</el-radio>
                  <el-radio label="3">电话</el-radio>
                </el-radio-group>
              </div>
              <div v-if="item.yyzt == 7 || item.yyzt == 8"></div>
              <div class="text-right" v-else>
                <el-button type="danger" @click="handleSubmit(item)">提交</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- 分页 -->
      <el-pagination 
        :page-size="pageSize" 
        layout="prev, pager, next" 
        :total="totalCount"
        :current-page.sync="currentPage"
        @current-change="handleChangePage()"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Enter_interview",
  components: {},
  data() {
    return {
      xm: "",
      xl:'',
      dataList: [], //数据列表
      pageSize: 10, // 每页显示个数
      totalCount: 0, // 总条目数
      currentPage: 1, // 当前页
      interviewSituation:'',  // 面试情况
      interviewResult:'',
      interviewWay:''
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
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
  created() {
    this.getDataList();
  },
  methods: {
    // 修改面试情况
    handleStatus(item, i) {
      console.log(item)
      this.$forceUpdate()
    },
    handleChangePage() {
      this.getDataList()
    },
    getDataList() {
      let params = {
          xm: this.xm.trim(),
          xl: this.xl,
          page: this.currentPage,
          limit: this.pageSize,
          yyzt: this.interviewResult
        }
      
      this.axios({
        method: "get",
        url: `/api/hr/qyhxrxx/findMsjgList`,
        headers: {
          token: this.token
        },
        params: params
      })
        .then(res => {
          if (res && res.data && res.data.code === 0) {
            // test
            // res.data.page.list = [{
            //   "yyzt": "7",
            //   "xm": "admin",
            //   "sjhm": "6.365156887148388e15",
            //   "mysm": "请问",
            //   "txid": "123",
            //   "gwid": "-1693046494342648.5",
            //   "myfs": "视频",
            //   "qzzid": "-3.04515749517826e15",
            //   "yyztmc": "面试通过",
            //   "xxmc": "西安大学",
            //   "xl": "21",
            //   "bsid": "8.247262806916665e15",
            //   "hrid": "123",
            //   "gwmc":"软件测试"
            // }]

            // res.data.page.totalCount = 20


            // 数据赋值

            this.dataList = res.data.page.list;
            for(let i = 0; i < this.dataList.length; i ++ ) {
                if(this.dataList[i].yyzt == 7 || this.dataList[i].yyzt == 8) {
                    this.dataList[i].isEdit = true
                }

                if(this.dataList[i].myfs == "视频") {
                  this.dataList[i].myfs = '1'
                }else if(this.dataList[i].myfs == "线下") {
                  this.dataList[i].myfs = '2'
                }else if(this.dataList[i].myfs == "电话") {
                  this.dataList[i].myfs = '3'
                }

                if(this.dataList[i].yyzt != '7' && this.dataList[i].yyzt != '8') {
                  this.dataList[i].nowradioms = '7'
                }else{
                  this.dataList[i].nowradioms = this.dataList[i].yyzt
                }

                if(!this.dataList[i].myfs) {
                  this.dataList[i].nowradiofs = '1'
                }else{
                  this.dataList[i].nowradiofs = this.dataList[i].myfs
                }
                

            }

            this.totalCount = res.data.page.totalCount;
          } else {
            this.dataList = [];
            this.$message({
              type: "error",
              message: res.data.msg,
              offset: 300
            });
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
    search() {
      this.currentPage = 1;
      this.getDataList();
    },

    // 提交
    handleSubmit(item) {
      // console.log(item)
      // return
      let params = {
        bsid:item.bsid,
        yyzt:item.nowradioms,
        mysm:item.mysm,
        myfs:this.nowradiofs
      }
      // console.log(params)
      // return
      this.axios({
        method: "post",
        url: `/api/hr/qyhxrxx/updateMsjgsm`,
        headers: {
          token: this.token
        },
        // params: params
        data:params
      })
      .then(res => {
        // console.log(res)
        if(res && res.data && res.data.code === 0) {
            this.$message({
              type: "success",
              message: "提交成功",
              offset: 300
            });

            this.getDataList()
        }
      })
      .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
      });
    }
  }
};
</script>

<style scoped>
.interviewBox{
  margin-left: 20px;
}
.interviewWay{
  margin-right: 15px;
}
.el-textarea {
  width: 92%;
  margin: 15px 0;
  height: 118px;
}
.el-textarea /deep/.el-textarea__inner {
  height: 118px;
}
.export {
  width: 168px;
  height: 35px;
  font-size: 16px;
  color: #fc5e5b;
  margin-left: 106px;
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
  font-size: 14px;
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
  line-height: 20px !important;
  width: 65px;
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
}
.list .list_li_3_1 {
  margin-right: 30px;
  line-height: 47px;
  position: absolute;
  left: 0;
  top: 10px;
}
.list .list_li_3_1 i {
  font-size: 14px;
  color: #fc5e5b;
}
.list .list_li_3_2 .detail {
  padding-top: 15px;
  padding-left: 77px;
  line-height: 25px;
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
}
.company .com2 {
  font-size: 12px;
  color: #606266;
  text-align: center;
  width: 65px;
  height: 90px;
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
