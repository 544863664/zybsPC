<template>
  <!-- 企业端-人才检索页面 -->
  <div class="personal">
    <Head />
    <div class="personalBody">
      <h1 class="ptitle" v-if="select == 1">根据职位、公司、学校、工作内容搜索人才</h1>
      <!-- 搜索框 -->
      <div class="head-right-down">
        <el-input
          placeholder="输入公司、职位、学校、工作内容搜索人才"
          v-model.trim="search.input1"
          class="input-with-select"
          @change="getSearchType"
        >
          <el-select v-model="select" slot="prepend" placeholder="公司" @change="selectChange" style="width: 8.125rem;">
            <el-option label="人才搜索" value="1"></el-option>
            <el-option label="发布职位" value="3"></el-option>
          </el-select>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <el-button slot="append" @click="getSearchType">搜 索</el-button>
        </el-input>
      </div>
      <!-- 搜索条件 -->
      <div class="search" v-if="select == 1">
        <ul>
          <li>
            <div class="name">省份选择:</div>
            <div class="sub_wrap">
              <span class="sub_name" @click="cityClick('')">全国</span>
            </div>
            <div
              class="sub_wrap"
              v-for="(item, index) in ProvinceList.slice(0, 12)"
              :key="index"
              @click="cityClick(item)"
            >
              <span class="sub_name">{{item.name}}</span>
            </div>
            <div class="other" @click="getAllCity">更多</div>
          </li>
          <li>
            <div class="name">行业选择:</div>
            <div class="sub_wrap">
              <span class="sub_name" @click="industryClick('')">不限</span>
            </div>
            <div
              class="sub_wrap"
              v-for="(item, index) in findDmList['m_dwsshydm'].slice(0, 10)"
              :key="index"
              @click="industryClick(item)"
            >
              <span class="sub_name">{{item.name}}</span>
            </div>
            <div class="other" @click="getAllTrade">更多</div>
          </li>
          <li>
            <div class="name">其他:</div>
            <el-dropdown @command="otherScaleCommand">
              <span class="el-dropdown-link">
                {{search.scale.name||'期望月薪'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_xzdydm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="otherDateCommand">
              <span class="el-dropdown-link">
                {{search.date.name||'活跃日期'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_sjfwdm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="otheReducationCommand">
              <span class="el-dropdown-link">
                {{search.reducat.name||'学历要求'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_xldm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="otheWorkCommand">
              <span class="el-dropdown-link">
                {{search.work.name||'工作经验'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_jyyqdm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="othegraduationCommand">
              <span class="el-dropdown-link">
                {{search.graduation||'毕业时间'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in graduationDrop"
                  :key="index"
                >{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="li3">
            学校名称：
            <input type="text" v-model.trim="search.schoolName" @change="getSearchschoolName" />
            专业名称：
            <input
              type="text"
              v-model.trim="search.JobName"
              @change="getSearchJobName"
            />
          </li>
        </ul>
      </div>
      <!-- 已选条件 -->
      <div class="alrady_select" v-if="select == 1">
        <span class="name">已选条件:</span>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.city.name}}</el-tag>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
          v-if="search.trade.name"
        >{{search.trade.name}}</el-tag>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
          v-if="search.scale.name"
        >{{search.scale.name}}</el-tag>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
          v-if="search.date.name"
        >{{search.date.name}}</el-tag>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
          v-if="search.reducat.name"
        >{{search.reducat.name}}</el-tag>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
          v-if="search.work.name"
        >{{search.work.name}}</el-tag>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
          v-if="search.graduation"
        >{{search.graduation+'年'}}</el-tag>

        <div class="hright" style="float:right;margin-left:20px;">
          <span class="r3" v-if="search.pxfs == ''" @click="pxClick('asc')">
            发布时间
            <i class="el-icon-d-caret"></i>
          </span>
          <span class="r3" v-if="search.pxfs == 'asc'" @click="pxClick('desc')">
            发布时间
            <i class="el-icon-sort-up"></i>
          </span>
          <span class="r3" v-if="search.pxfs == 'desc'" @click="pxClick('asc')">
            发布时间
            <i class="el-icon-sort-down"></i>
          </span>
        </div>
        <em style="margin-left: 20px;" @click="handclearTags">重置查询条件</em>
        <em>搜索到{{search.totalCount}}条简历</em>

        

      </div>
      <!-- 已发布岗位0 -->
      <div class="alrady_select" v-if="select == 3">
        <span class="name">已发布岗位：{{JoinStatistical.hrzzzws}}个</span>
        <em>搜索到{{search.totalCount}}条简历</em>
      </div>
      <div class="publishZw" v-if="select == 3">
        <i></i><router-link to="/private/Enter_postcreate">发布岗位，解锁更多人才～</router-link>
      </div>
      <!-- 搜索头部 -->
      <!-- <div class="search_head"> -->
        <el-radio-group v-model="search.listType" @change="changeRadio">
          <!-- 屏蔽已查看/已下载 -->
          <!-- <el-radio label="1">已查看</el-radio>
          <el-radio label="2">已下载</el-radio> -->


          <!-- <el-radio label="3">已沟通</el-radio> -->
        </el-radio-group>

        
      <!-- </div> -->
      <!-- 内容 -->
      <div class="list">
        <div class="list1">
          <ul>
            <li v-if="search.totalCount==0" class="arrNull">
              <h3>未搜索到相应数据</h3>
            </li>
            <li v-for="(item, index) in search.personalArr" :key="index">
              <div class="list_con">
                <div class="list1_1">
                  <!-- <i>1小时前来过</i> -->
                </div>
                <div class="list1_2">
                  <img
                    v-if="item.xbm=='xb_001'"
                    :src="imageUrl||xb_001"
                    class="list1_2_1"
                    @click="JobpersonalDetailJobpersonalDetail(item.qzbsid)"
                  />
                  <img
                    v-if="item.xbm=='xb_002'"
                    :src="imageUrl||xb_002"
                    class="list1_2_1"
                    @click="JobpersonalDetail(item.qzbsid)"
                  />
                  <p class="list1_2_2">
                    <span>
						<router-link target="_blank" :to="{path: '/private/personalResume',query: { qzbsid: item.qzbsid}}">{{item.xm?item.xm:'--'}}</router-link>
					</span>
                  </p>
                  <p
                    class="list1_2_3"
                  >{{item.gznx?item.gznx+'年工作经验':'--'}}｜{{item.xl?findDmMap['m_xldm'][item.xl]:'--'}}｜{{item.nl?item.nl+'岁':'--'}}｜{{item.xbm=='xb_002'?'女':item.xbm=='xb_001'?'男':'--'}}</p>
                  <div class="list1_3">
                    <span class="list1_3_1 active" @click="cellects(item)">收藏</span>

                    <!-- <span class="list1_3_2" @click="setDown(1, item)">下载简历</span> -->
                    <span class="list1_3_3" @click="communication(item)">立即沟通</span>
                    <span class="list1_3_4" @click="videoCommunication()">视频面试</span>
                  </div>
                </div>
                <div class="list1_4">
                  <div class="list1_4_5">
                    <h1 class="list1_4_1">
                      <span>工作经历</span>
                    </h1>
                    <p class="list1_4_2">
						<!-- 湖北泰和石化有限公司 -->
						·--
						<span class="list1_4_3">
							<!-- 董事会秘书 -->
							·--
						</span>
                    </p>
                  </div>
                  <div class="list1_4_5">
                    <h1 class="list1_4_1">
                      <span>教育经历</span>
                    </h1>
                    <p class="list1_4_2">
                      ·{{item.xxmc?item.xxmc:'--'}}
                      <span class="list1_4_3">{{item.zy}}｜{{findDmMap['m_xldm'][item.xl]}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <el-pagination
            v-if="search.totalCount>20"
            @current-change="presonalSeachChange"
            :page-size="search.pageSize"
            :current-page="search.currentPage"
            layout="prev, pager, next, jumper"
            :total="search.totalCount"
          ></el-pagination>
        </div>
      </div>

      <!-- 消息 -->
      <div class="msg_info" @click="communication()">
        <el-badge value="" class="item">
          <el-button type="success" icon="el-icon-chat-dot-round" circle></el-button>
        </el-badge>
      </div>
      <!-- 消息查看 -->
      <div class="message" v-if="message.show">
        <p class="title">
          消息查看
          <i class="el-icon-close" @click="message.show = false"></i>
        </p>
        <ul>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
          <li>
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">吴登旺·UI设计师</p>
            <p class="p2">
              吴登旺发来了简历
              <span @click="message.detail = true">查看</span>
            </p>
          </li>
        </ul>
      </div>
      <!-- 消息查看详情 -->
      <div class="message" v-if="message.detail">
        <p class="title">
          <i class="el-icon-arrow-left" @click="message.detail = false"></i> 吴登旺UI设计师
          <i class="el-icon-close" @click="message.detail = false"></i>
        </p>
        <p class="tip">正在沟通的职位：UI设计师</p>
        <p class="tip2">
          吴登旺发来了简历
          <span>查看</span>
        </p>
        <ul class="ul2">
          <li class="left">
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">2020-02-11 13:04:30</p>
            <div class="p2">
              <span>您好，方便发邮箱给我吗！</span>
            </div>
          </li>
          <li class="right">
            <img src="../../assets/images/common/mine.png" alt />
            <p class="p1">2020-02-11 13:04:30</p>
            <div class="p2">
              <span>好的，1232432535@qq.com</span>
            </div>
          </li>
        </ul>
        <div class="send">
          <el-input placeholder="现在回复～"></el-input>
          <el-button type="danger">发送</el-button>
        </div>
      </div>
    </div>
    <Foot />

    <!-- 城市弹出框 -->
   <!-- <city
      :venue-dialog-visible="search.city.dialog"
      :level="2"
      @change="changeCity"
      @close="closeCity"
    ></city> -->
	<el-dialog
		:visible.sync="search.city.dialog"
		width="700px"
		:lock-scroll="true"
		:show-close="true"
		:modal="false">
		<div class="dialog__body-wrap">
			<div class="dialog_info">
				<div class="d_right">
					<ul>
						<li style="display: inline-block;  margin-right: 20px; line-height: 30px; cursor: default; font-size: 14px; width: 153px;"
							v-for="(item,index) in ProvinceList" :key="index" 
							@click="changeCity(item, index)">
							{{item.name}}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<span slot="title" class="dialog-header">
			<div>请选择省份</div>
		</span>
	</el-dialog>

    <!-- 行业弹出框 -->
    <trade :venue-dialog-visible="search.trade.dialog" @change="changeTrade" @close="closeTrade"></trade>


    <!-- 立即购买 -->
    <el-dialog
      title="下载提醒"
      :visible.sync="isBuying"
      width="30%"
      class="nowBuying"
      :close="handleClose">
      <i class="el-icon-info" style="margin-left:20px;"></i> <span class="nowContent">{{nowTitle}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isBuying = false">进行购买</el-button>
        <el-button type="primary" @click="comfireDown()">确认下载</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Head from "../Head.vue";
import Foot from "../Foot.vue";
// import City from "../common/City.vue";
import Trade from "../common/Trade.vue";
// import Moment from "../common/moment.js";
import moment from "moment";
import xb_001 from "../../assets/images/common/mine.png";
import xb_002 from "../../assets/images/common/nv.png";
export default {
  name: "PersonalSearch",
  components: {
    Head,
    Foot,
    Trade
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      userId: "getuserId",
      roleId: "getroleId",
      Jobseekers: "getJobseekers",
      HR: "getHR"
    }),
    ...mapState({
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList,
      ProvinceList: state => state.ProvinceList
    })
  },
  data() {
    return {
      xb_001: xb_001,
      xb_002: xb_002,
      imageUrl: "",
      // 消息
      message: {
        show: false,
        detail: false
      },

      select: "1",
      // 当前列表展示
      // 默认搜索类型
      searchType: 1,
      graduationDrop: [],
      // 表格搜索
      tableSearch: {
        all: false
      },
      // 城市，行业，月薪，其他搜索
      search: {
        personalArr: [],
        pageSize: 20,
        currentPage: 1,
        totalCount: 0,
        city: { dialog: false, dm: "", name: "全国", index: -1 },
        trade: { dialog: false, dm: "", name: "" },
        scale: { dm: "", name: "" },
        date: { dm: "", name: "" },
        reducat: { dm: "", name: "" },
        work: { dm: "", name: "" },
        graduation: "",
        input1: "",
        schoolName: "",
        JobName: "",
        pxfs: "",
        listType: "",
        ckdwid: "",
        xzdwid: ""
      },
      JoinStatistical: {
        hrzzzws: 0,
      },

      userInfo: {},
      isBuying:false,  // 立即购买弹窗
      nowAcount:123,
      nowTitle:""
    };
  },
  mounted() {},
  methods: {
    comfireDown() {
      // this.isBuying = false
    },

    handleClose() {
      this.isBuying = false
    },
    // 下载简历
    setDown(type, item) {
      // console.log(item)
      // return
      let that = this
      if (type == 1) {
        // that.$confirm(
        //   "您当前账号为12345，预定下载简历数量为100次，已下载50次，还剩50次。",
        //   "下载提醒",
        //   {
        //     confirmButtonText: "确认下载",
        //     cancelButtonText: "进行购买",
        //     type: "warning"
        //   }
        // )
        // .then(() => {
          this.axios({
            method: 'post',
            url:"/api/hr/hr/qyjlxz/downloadJlByRcList",
            params: {
              "qzbsid": item.qzbsid
            },
            headers: {
              "content-type": "application/json",
              'token': this.token
            }
          }).then(response => {
            if(response && response.data && response.data.code == 0){
                that.isBuying = true
                // that.nowTitle = "您当前账号为" + this.nowAcount + "，预定下载简历数量为100次，已下载50次，还剩50次。"
            } else {
              that.$message({
                message: response.data.msg,
                type: "error",
              })
          }
          }).catch(error => {
            console.log(error);
          });


          // this.$message({
          //   type: "success",
          //   message: "下载成功!"
          // });
        // })
        // .catch(() => {
        //   that.isBuying = true

          // that.$message({
          //   type: "info",
          //   message: "这里跳转到购买页面"
          // });
        // });


        
      } else {
        this.$confirm(
          '您当前账号为12345，预定简历数量已用完，请<a target="_blank" class="font-red" href="http://www.baidu.com">进行购买</a>',
          "下载提醒",
          {
            showCancelButton: false,
            showConfirmButton: false,
            type: "warning",
            dangerouslyUseHTMLString: true
          }
        );
      }
    },
    cellects(item) {
      console.log(item)
      this.axios({
        method: 'post',
        url: '/api/hr/qyjlsc/addJlsc',
        data: {
          "jlid": '',
          "qzzid": item.qzzid
        },
        headers: {
          "content-type": "application/json",
          'token': this.token
        }
      }).then(response => {
        if (response && response.data && response.data.code == 0) {
          this.$message({
            type: "success",
            message: "收藏成功"
          });
        } else {
          this.$message({
            message: response.data.msg,
            offset: 400
          })
        }
      }).catch(error => {
        console.log(error);
      });
    },

    // 获取头部搜索类型
    getSearchType() {
      if (this.select == "1") {
        this.search.currentPage = 1;
        var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
        this.getpresonalSeach(
          search_.input1,
          search_.city.dm,
          search_.trade.dm,
          search_.scale.dm,
          search_.date.dm,
          search_.reducat.dm,
          search_.work.dm,
          search_.graduation,
          search_.schoolName,
          search_.JobName,
          search_.ckdwid,
          search_.xzdwid,
          search_.pxfs
        );
      } else if (this.select == "3") {
        console.log("this.select == 3", this.search.input1);
      }
    },

    // 打开城市弹出框
    getAllCity() {
      this.search.city.dialog = true;
    },
    // 关闭城市弹出框
    closeCity() {
      this.search.city.dialog = false;
    },
    // 获取城市选择值
    changeCity(obj, index) {
		this.search.city.index = index;
      this.search.city.dialog = false;
      this.search.city.dm = obj.dm;
      this.search.city.name = obj.name;
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },
    cityClick(city) {
      var search_ = this.search;
      if (city) {
        this.search.city = { dialog: false, dm: city.dm, name: city.name };
        if (this.select == "1") {
          this.search.currentPage = 1;
          // var search_ = this.search;  //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        } else if (this.select == "3") {
          console.log("this.select == 3", this.select);
        }
      } else {
        this.search.city = { dialog: false, dm: "", name: "全国" };
        if (this.select == "1") {
          this.search.currentPage = 1;
          // var search_ = this.search;  //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        } else if (this.select == "3") {
          console.log("this.select == 3", this.select);
        }
      }
    },

    // 打开行业弹出框
    getAllTrade() {
      this.search.trade.dialog = true;
    },
    // 关闭行业弹出框
    closeTrade() {
      this.search.trade.dialog = false;
    },
    // 获取行业选择值
    changeTrade(obj) {
      console.log(obj);
      this.search.trade.dialog = false;
      this.search.trade.dm = obj.dm;
      this.search.trade.name = obj.name;
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },
    industryClick(indu) {
      var search_ = this.search;
      if (indu) {
        this.search.trade = { dialog: false, dm: indu.dm, name: indu.name };
        if (this.select == "1") {
          this.search.currentPage = 1;
          // var search_ = this.search;  //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        } else if (this.select == "3") {
          console.log("this.select == 3", this.select);
        }
      } else {
        this.search.trade = { dialog: false, dm: "", name: "不限行业" };
        if (this.select == "1") {
          this.search.currentPage = 1;
          // var search_ = this.search;  //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        } else if (this.select == "3") {
          console.log("this.select == 3", this.select);
        }
      }
    },

    // 公司月薪
    otherScaleCommand(val) {
      this.search.scale = val;
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },
    // 活跃日期
    otherDateCommand(val) {
		if (val.dm == '0') {
			this.search.date = { dm: "", name: "不限" }
		} else {
			this.search.date = val;
		}
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },
    // 学历要求
    otheReducationCommand(val) {
      this.search.reducat = val;
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },
    // 工作年限
    otheWorkCommand(val) {
      this.search.work = val;
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },
    //毕业年份
    othegraduationCommand(val) {
      this.search.graduation = val;
      this.search.currentPage = 1;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },

    getSearchschoolName() {
      if (this.select == "1") {
        this.search.currentPage = 1;
        var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
        this.getpresonalSeach(
          search_.input1,
          search_.city.dm,
          search_.trade.dm,
          search_.scale.dm,
          search_.date.dm,
          search_.reducat.dm,
          search_.work.dm,
          search_.graduation,
          search_.schoolName,
          search_.JobName,
          search_.ckdwid,
          search_.xzdwid,
          search_.pxfs
        );
      } else if (this.select == "3") {
        console.log("this.select == 3", this.search.schoolName);
      }
    },
    getSearchJobName() {
      if (this.select == "1") {
        this.search.currentPage = 1;
        var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
        this.getpresonalSeach(
          search_.input1,
          search_.city.dm,
          search_.trade.dm,
          search_.scale.dm,
          search_.date.dm,
          search_.reducat.dm,
          search_.work.dm,
          search_.graduation,
          search_.schoolName,
          search_.JobName,
          search_.ckdwid,
          search_.xzdwid,
          search_.pxfs
        );
      } else if (this.select == "3") {
        console.log("this.select == 3", this.search.JobName);
      }
    },
    changeRadio(rad) {
      var search_ = this.search;
      if (this.select == "1") {
        this.search.currentPage = 1;
        if (rad == "1") {
          this.search.xzdwid = "";
          this.search.ckdwid = this.userInfo.dwid;
          // var search_ = this.search;  //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        } else if (rad == "2") {
          this.search.xzdwid = this.userInfo.dwid;
          this.search.ckdwid = "";
          // var search_ = this.search;  //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        }
      } else if (this.select == "3") {
        console.log("this.select == 3", rad);
      }
    },

    pxClick(fs) {
      if (this.select == "1") {
        if (this.searchType == "1") {
          this.search.pxfs = fs;
          this.search.currentPage = 1;
          var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
          this.getpresonalSeach(
            search_.input1,
            search_.city.dm,
            search_.trade.dm,
            search_.scale.dm,
            search_.date.dm,
            search_.reducat.dm,
            search_.work.dm,
            search_.graduation,
            search_.schoolName,
            search_.JobName,
            search_.ckdwid,
            search_.xzdwid,
            search_.pxfs
          );
        } else if (this.searchType == "3") {
          console.log(fs);
        }
      } else if (this.select == "3") {
        console.log("this.select == 3", fs);
      }
    },
    handclearTags() {
      this.search = {
        personalArr: [],
        pageSize: 20,
        currentPage: 1,
        totalCount: 0,
        city: { dialog: false, dm: "", name: "全国", index: -1 },
        trade: { dialog: false, dm: "", name: "" },
        scale: { dm: "", name: "" },
        date: { dm: "", name: "" },
        reducat: { dm: "", name: "" },
        work: { dm: "", name: "" },
        graduation: "",
        input1: "",
        schoolName: "",
        JobName: "",
        pxfs: "",
        listType: ""
      };
      if (this.searchType == "1") {
        var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
        this.getpresonalSeach(
          search_.input1,
          search_.city.dm,
          search_.trade.dm,
          search_.scale.dm,
          search_.date.dm,
          search_.reducat.dm,
          search_.work.dm,
          search_.graduation,
          search_.schoolName,
          search_.JobName,
          search_.ckdwid,
          search_.xzdwid,
          search_.pxfs
        );
      } else if (this.searchType == "3") {
        console.log(this.searchType);
      }
    },
    getpresonalSeach(
      key,
      cs,
      hy,
      qwxz,
      hysj,
      xlyq,
      jyyq,
      bysj,
      xxmc,
      zy,
      ckdwid,
      xzdwid,
      orderField
    ) {
      var that = this;
      var dwid = that.userInfo.dwid;
      that
        .axios({
          url: "/api/xs/app/search/rc",
          method: "get",
          params: {
            dwid: dwid, //屏蔽当前单位id  必填
            key: key, //模糊搜索 公司职位 商家公司名称
            sf: cs, //城市  代码
            hy: hy, //行业  代码
            qwxz: qwxz, //月薪  代码
            hysj: hysj, //活跃  代码 m_sjfwdm
            xlyq: xlyq, //学历 代码
            jyyq: jyyq, //经验要求  代码
            bysj: bysj, //毕业时间  请输入年 例 2019
            xxmc: xxmc, //学校名称
            zy: zy, //专业
            ckdwid: ckdwid, //已查看 当前单位id
            xzdwid: xzdwid, //已下载 当前单位id
            orderField: orderField,
            page: that.search.currentPage,
            limit: that.search.pageSize
          },
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            that.search.totalCount = response.data.page.totalCount;
            var data = response.data.page.list;
            that.search.personalArr = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getObjsSeach() {
      var that = this;
      var dwid = that.userInfo.dwid;
      that.axios({
        url: "/api/xs/app/search/gwrc",
        method: "get",
        params: {
          dwid: dwid, //屏蔽当前单位id  必填
          gwid: '',
          orderField: that.search.orderField,
          page: that.search.currentPage,
          limit: that.search.pageSize
        },
        headers: {
          "content-type": "application/json",
          token: that.token
        }
      }).then(function(response) {
        if (response && response.data && response.data.code == 0) {
          that.search.totalCount = response.data.page.totalCount;
          var data = response.data.page.list;
          that.search.personalArr = data;
        }
      }).catch(function(error) {
        console.log(error);
      });
    },

    presonalSeachChange(currentPage) {
      this.search.currentPage = currentPage;
      var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
      this.getpresonalSeach(
        search_.input1,
        search_.city.dm,
        search_.trade.dm,
        search_.scale.dm,
        search_.date.dm,
        search_.reducat.dm,
        search_.work.dm,
        search_.graduation,
        search_.schoolName,
        search_.JobName,
        search_.ckdwid,
        search_.xzdwid,
        search_.pxfs
      );
    },

    getuserInfo() {
      var that = this;
      that.axios
        .get("/api/hr/qydwhrxx/getHrInfo", {
          headers: {
            "content-type": "application/json",
            token: that.token
          }
        })
        .then(function(response) {
          if (response && response.data && response.data.code == 0) {
            var data = response.data.qyDwhrxxEntity;
            that.userInfo = data;
            that.getpresonalSeach();
          }
        });
    },
	getJoinStatistical() {
		var that = this;
		that.axios({
			method: "post",
			url: "/api/hr/bshxxx/hrInfoTj",
			data: "",
			params: "",
			headers: {
				"content-type": "application/json",
				token: that.token
			}
		}).then(function(response) {
			if (response && response.data && response.data.code == 0) {
				var data = response.data.qygrxxtjVO;
				that.JoinStatistical = data;
			}
		}).catch(function(error) {
			console.log(error);
		});
	},
	selectChange() {
		if (this.select == '3') {
			this.getObjsSeach();
		} else if (this.select == '1') {
			var search_ = this.search; //  搜索					城市					行业				月薪				活跃日期			学历				工作经验			毕业时间				学校名称				专业名称				查看			下载		排序
			this.getpresonalSeach(
				search_.input1,
				search_.city.dm,
				search_.trade.dm,
				search_.scale.dm,
				search_.date.dm,
				search_.reducat.dm,
				search_.work.dm,
				search_.graduation,
				search_.schoolName,
				search_.JobName,
				search_.ckdwid,
				search_.xzdwid,
				search_.pxfs
			);
		}
	},


    // 立即沟通
    communication(item) {
      let url = ""
      if(item) {
        url =
        "/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId + "&tUserId=" + item.qzbsid;
      }else{
        url =
        "/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId;
      }
      if (this.token) {
        window.open(url);
      } else {
        this.$message({
          type: "success",
          message: "请先登录再聊天",
          offset: 400
        });
      }
    },

    // 视频面试
    videoCommunication() {
      this.$message({
        type: "success",
        message: "敬请期待",
        offset: 400
      });
    }


  },
  created() {
    for (var i = 0; i < 4; i++) {
      var year2 = moment().year() - 3;
      this.graduationDrop.push(year2 + i);
    }
    this.getuserInfo();
  }
};
</script>

<style scoped>
.el-icon-info{
  color: #E6A23C;
  font-size: 25px;
}
.nowContent{
  line-height: 23px;
}
.nowBuying /deep/ .el-dialog__body{
  padding: 10px 20px;
}
.el-button--primary{
  background-color: rgb(255, 83, 83);
  border:1px solid rgb(255, 83, 83);
}
.publishZw, .publishZw a {
  font-size: 26px;
  color: #c0c4cc;
  vertical-align: middle;
  text-align: center;
  padding: 20px 0;
  cursor: pointer;
}
.publishZw i {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  background: url("../../assets/images/common/Icon-add.png") 0 0 no-repeat;
  background-size: 20px;
  margin-right: 15px;
}
.li3 input {
  height: 28px;
  width: 155px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  margin-right: 30px;
}
.msg_info {
  position: fixed;
  right: 40px;
  top: 300px;
}
.msg_info /deep/.el-button.is-circle {
  padding: 7px;
}
.msg_info /deep/.el-icon-chat-dot-round {
  font-size: 20px;
}
.message {
  position: absolute;
  right: 0;
  top: 20px;
  background: #fff;
  width: 346px;
  border: 1px solid #e6e6e6;
}
.message .title {
  font-size: 12px;
  color: #303133;
  line-height: 40px;
  height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}
.message .title .el-icon-close {
  position: absolute;
  right: 9px;
  top: 13px;
  font-size: 16px;
}
.message ul {
  padding: 0 20px;
  height: 385px;
  overflow: auto;
}
.message ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.message ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #d8d8d8;
  background: #909399;
}
.message ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #d8d8d8;
  border-radius: 10px;
  background: #ededed;
}
.message ul li {
  padding: 10px 0;
  overflow: auto;
  border-bottom: 1px solid #e6e6e6;
}
.message ul li img {
  float: left;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #d8d8d8;
  border: 1px solid #979797;
  margin-right: 10px;
  margin-top: 5px;
}
.message ul li .p1 {
  font-size: 14px;
  color: #303133;
}
.message ul li .p2 {
  padding-top: 5px;
  font-size: 12px;
  color: #606266;
}
.message ul li .p2 span {
  color: #fc5e5b;
  padding-left: 10px;
  cursor: default;
}
.message .tip {
  font-size: 14px;
  color: #303133;
  text-align: center;
  padding: 10px 0;
}
.message .tip2 {
  font-size: 13px;
  color: #606266;
  text-align: center;
  padding-bottom: 10px;
}
.message .tip2 span {
  color: #fc5e5b;
  padding-left: 10px;
  cursor: default;
}
.message .ul2 {
  height: 330px;
}
.message .ul2 li {
  border: 0;
}
.message .ul2 li img {
  margin-top: 0;
}
.message .ul2 li .p1 {
  font-size: 12px;
  color: #909399;
}
.message .ul2 li .p2 {
  font-size: 12px;
  padding-left: 43px;
}
.message .ul2 li .p2 span {
  background: #f7f7f7;
  font-size: 12px;
  color: #303133;
  padding: 8px 12px;
  display: inline-block;
}
.message .ul2 li.right {
  text-align: right;
}
.message .ul2 li.right img {
  float: right;
  margin-left: 10px;
  margin-right: 0;
}
.message .ul2 li.right .p2 {
  font-size: 12px;
  padding-right: 43px;
}
.message .ul2 li.right .p2 span {
  background: #28ca42;
  text-align: left;
}
.message .send {
  border: 1px solid #e6e6e6;
  height: 58px;
  position: relative;
}
.message .send .el-input {
  border: 0;
  height: 58px;
}
.message .send .el-input /deep/.el-input__inner {
  border: 0;
  height: 58px;
  width: 300px;
}
.message .send .el-button {
  position: absolute;
  right: 8px;
  top: 15px;
}

.ptitle {
  font-size: 24px;
  color: #303133;
  text-align: center;
  padding: 10px 0 20px 0;
}
.hot_search_p {
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
  overflow: auto;
}
.hot_search_p li {
  width: 30%;
  float: left;
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}
.hot_search_p li.percent {
  width: 100% !important;
}
.hot_search_p li .name {
  width: 70px;
  display: inline-block;
}
.hot_search_p li .value {
  display: inline-block;
  width: 200px;
}
.hot_search_p li.li1 .el-input {
  width: 400px;
}
.hot_search_p li.li2 .el-input {
  width: 90px;
}
.hot_search_p li.li2 span.line {
  padding: 0 5.5px;
}
.hot_search_p /deep/.el-input__inner {
  border-radius: 0;
  height: 37px;
  line-height: 37px;
}
.hot_search_p.p1 ul {
  width: 80%;
}
.hot_search_p.p1 li {
  width: 50%;
}

.hot_search {
  padding: 20px;
  font-size: 14px;
  color: #606266;
  background: #fff;
  overflow: auto;
  margin-bottom: 20px;
}
.hot_search p.title {
  font-size: 16px;
  color: #303133;
  padding-bottom: 20px;
  font-weight: bold;
}
.hot_search li {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  padding: 0 10px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin-right: 15px;
  cursor: default;
}
.hot_search li:hover {
  background-color: rgb(255, 83, 83);
  color: #fff;
}

.head-right-down {
  margin-bottom: 20px;
  padding: 10px;
  background: #fff;
}

.head-right-down /deep/ .el-input-group__prepend,
.head-right-down /deep/ .el-input-group__append {
  background: #f7f7f7;
  border-radius: 0;
  border: 0;
}

.head-right-down /deep/ .el-input-group__append {
  width: 100px;
  background-color: rgb(255, 83, 83);
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.head-right-down /deep/ .el-cascader .el-input__inner {
  background: #f7f7f7;
  border: 0;
}
.head-right-down /deep/ .input-with-select > .el-input__inner {
  margin-left: 20px;
}
.head-right-down /deep/ .el-input__prefix {
  left: 25px;
}
.list .arrNull {
  background: #f6f6f8;
  text-align: center;
  line-height: 20;
  color: #b2b2b3;
}
.list1_1 {
  font-size: 12px;
  color: #c0c4cc;
  position: relative;
}
.list1_1 i {
  font-style: normal;
  position: absolute;
  right: 0;
  top: 0;
}
.list1_2 {
  position: relative;
  top: 10px;
  padding: 15px 0;
  overflow: auto;
}
.list1_2_1 {
  height: 48px;
  width: 48px;
  border: 1px solid #979797;
  border-radius: 50%;
  margin-right: 10px;
  float: left;
  cursor: pointer;
}
.list1_2_2 span, .list1_2_2 span a {
  font-size: 16px;
  color: #303133;
  line-height: 30px;
  cursor: pointer;
}
.list1_2_2 span:hover {
  text-decoration: underline;
  color: #ff5656;
}
.list1_2_3 {
  font-size: 12px;
  color: #606266;
}
.list1_3 {
  position: absolute;
  right: 0;
  top: 15px;
  font-size: 12px;
}
.list1_3 span {
  padding: 3px 5px 3px 24px;
  margin-left: 20px;
  border: 1px solid #fc5e5b;
  background: url("../../assets/images/resume/icon1.png") 5px center no-repeat;
  cursor: pointer;
}
.list1_3 span.list1_3_1 {
  background-size: 14px 13px;
  border: 0;
}
.list1_3 span.list1_3_1.active {
  background-image: url("../../assets/images/common/Icon--chat-.png");
}
.list1_3 span.list1_3_2 {
  color: #fc5e5b;
  background-image: url("../../assets/images/resume/rem1.png");
}
.list1_3 span.list1_3_3 {
  color: #fff;
  background-color: #fc5e5b;
  background-image: url("../../assets/images/resume/rem2.png");
}
.list1_3 span.list1_3_4 {
  color: #fc5e5b;
  background-image: url("../../assets/images/resume/rem3.png");
}
.list1_4 {
  display: flex;
  line-height: 28px;
  font-size: 14px;
}
.list1_4_1 {
  font-size: 14px;
  color: #303133;
}
.list1_4_2 {
  color: #606266;
}
.list1_4_3 {
  margin-left: 20px;
  color: #909399;
}
.list1_4_5 {
  width: 50%;
}

.personal {
  width: 100%;
  margin-top: 7.5rem;
  padding-top: 1.2rem;
  overflow: hidden;
}
.personal .personalBody {
  width: 75rem;
  margin: 0 auto;
  position: relative;
}
.search {
  padding: 20px;
  background: #fff;
  font-size: 14px;
  color: #303133;
}
.search ul li {
  padding: 10px 0;
  cursor: default;
}
.search ul li .name {
  display: inline-block;
}
.search ul li .other {
  display: inline-block;
}
.search ul li .sub_wrap {
  display: inline-block;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.search ul li .sub_wrap .sub_con {
  position: absolute;
  width: 200px;
  top: 18px;
  left: 0;
  background: #fff;
  padding: 5px 24px;
  line-height: 30px;
  color: #606266;
  box-shadow: 0 0.3125rem 0.625rem #d8d8d8;
  z-index: 10;
  display: none;
}
.search ul li .sub_wrap .sub_con dd:hover {
  color: #fc5e5b;
}
.search ul li .sub_wrap .sub_name {
  padding: 5px 15px;
}
.search ul li .sub_wrap:hover {
  color: #fc5e5b;
}
.search ul li .sub_wrap.sub_dropdown:hover {
  color: #606266;
  background: #fff;
  box-shadow: 0 0.3125rem 0.625rem #d8d8d8;
}
.search ul li .sub_wrap.sub_dropdown:hover .sub_con {
  display: block;
}

.search ul li .name {
}
.search ul li .other {
  color: #fc5e5b;
  cursor: pointer;
}

.alrady_select {
  font-size: 14px;
  padding: 15px 19px;
  background: #fff;
  color: #fc5e5b;
  margin-top: 20px;
  position: relative;
}
.alrady_select .name {
  color: #303133;
}
.alrady_select span {
  margin-right: 20px;
  cursor: default;
}
.alrady_select i {
  display: inline-block;
  padding: 0 4px;
  font-size: 15px;
}
.alrady_select em {
  font-style: normal;
  color: #909399;
  cursor: pointer;
  float: right;
}

.search_head {
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 12px;
  position: relative;
  background-color: #ffffff;
}
.search_head .all {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  display: inline-block;
  padding: 0 20px;
  line-height: 30px;
  cursor: pointer;
  background: url("../../assets/images/search/Icon-success1.png") 0 center
    no-repeat;
}
.search_head .all.active {
  cursor: pointer;
  background: url("../../assets/images/search/Icon-success.png") 0 center
    no-repeat;
}
.search_head .btn {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  /* width: 63px; */
  padding: 0 0.625rem;
  background: #fc5e5b;
  border-radius: 2px;
  background-color: #fc5e5b;
  margin-right: 15px;
  text-align: center;
  color: #fff;
}
.search_head .count {
  font-size: 12px;
  color: #909399;
  padding-left: 24px;
}
.search_head .hright {
  position: absolute;
  right: 0;
  display: inline-block;
  font-size: 14px;
  color: #606266;
}
.search_head .hright span {
  margin-left: 15px;
}
.search_head .hright .r1 i {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  vertical-align: middle;
}
.search_head .hright .r1 i.i1 {
  background: url("../../assets/images/search/show1.png") right center no-repeat;
}
.search_head .hright .r1 i.i2 {
  background: url("../../assets/images/search/show2.png") right center no-repeat;
}
.search_head .hright .r2 {
  margin-left: 15px;
}
.search_head .hright .r3 {
  background-size: 12px;
  cursor: pointer;
}

.list1 {
  font-size: 14px;
  color: #909399;
}
.list1 li {
  padding: 10px 20px;
  background: #fff;
  margin-bottom: 10px;
  position: relative;
  overflow: auto;
}
.list1 .list_con {
  overflow: auto;
  padding-bottom: 7px;
}
.list1 .select {
  width: 26px;
  height: 26px;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/images/search/selects.png") 0 0 no-repeat;
  display: none;
}
.list1 .active .select {
  display: inline-block;
}

.el-dropdown {
  cursor: default;
  margin-left: 17px;
  margin-right: 17px;
}
.table .alink,
.list_right .alink {
  color: #606266;
}
.table .alink:hover,
.list_right .alink:hover {
  color: #fc5e5b;
}
.d_right li:hover{
    color: #FC5E5B;
}
.d_right li.active{
    color: #FC5E5B;
}
</style>
