<template>
	<div class="Index">
		<Head></Head>
		<div class="body">
			<div class="body-wrap">
				<div class="body-wrap-1">
					<div class="wrap-1-title"></div>
					<div class="wrap-1-wrap">
						<div class="wrap-1-wrap-left">
							<JobsClass />
						</div>
						<div class="wrap-1-wrap-right">
							<Advertising />
						</div>
					</div>
				</div>
				<div class="body-wrap-4">
					<div class="wrap-4-title">
						<img src="../assets/images/common/huo.png" style="width: 2rem;height: 2rem;top: 0.4375rem;" alt />
						<span></span>
					</div>
					<div class="wrap-4-wrap">
						<el-carousel height="36px" direction="vertical" :autoplay="true" indicator-position="none">
							<el-carousel-item v-for="(item, index) in listData" :key="index">
								<div class="wrap-4-wrap-list" @click="getCurrentPageNotice(item.bsid)">
									<div class="wrap4-list-class">【{{item.zxtype}}】</div>
									<div class="wrap4-list-title" v-text="item.title"></div>
									<div class="wrap4-list-date" v-text="item.releaseTime"></div>
									<div class="wrap4-list-reading">阅读次数：{{item.visits}}</div>
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
				<div class="body-wrap-2">
					<div class="wrap-2-title"></div>
					<div class="wrap-2-wrap">
						<el-tabs v-model="venueActiveName" @tab-click="wrap2tabshandleClick">
							<el-tab-pane label="线上会场" name="1">
								<div class="wrap-list" v-for="(item, index) in OnlineVenue" :key="index">
									<div class="wrap-float-top" @click="akeySigCollect(2, item)">
										<img src="../assets/images/common/star-off.png" alt />
									</div>
									<div class="wrap-Title" v-text="item.hymc"></div>
									<div class="wrap-flex">
										<div class="wrap-title">开始时间：</div>
										<div class="title-detail" v-text="item.hykssj"></div>
									</div>
									<div class="wrap-flex">
										<div class="wrap-title">结束时间：</div>
										<div class="title-detail" v-text="item.hyjssj"></div>
									</div>
									<div class="wrap-flex">
										<div class="wrap-title">会议类型：</div>
										<div class="title-detail title-detail-address">{{findDmMap['m_hyktdm'][item.hylx]}}</div>
									</div>
									<div class="wrap-btn">
										<el-button size="mini" type="danger" v-if="item.ifks==1" @click="akeySigCollect(1, item)">立即报名</el-button>
										<el-button size="mini" type="danger" v-if="item.ifks==2">已开始</el-button>
										<el-button size="mini" type="danger" v-if="item.ifks==3">已结束</el-button>
										<el-button size="mini" type="danger" @click="getCurrentPageOnlineVenue(item.hxid, item.ifks)">{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
									</div>
								</div>
								<div style="width: 75rem;">
									<div class="wrap-seeall" @click="getAllvenue(1)">
										查看更多
										<i class="el-icon-caret-bottom"></i>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="线下会场" name="2">
								<div class="wrap-list" v-for="(item, index) in OnlineVenue" :key="index">
									<div class="wrap-float-top" @click="akeySigCollect(2, item)">
										<img src="../assets/images/common/star-off.png" alt />
									</div>
									<div class="wrap-Title" v-text="item.hymc"></div>
									<div class="wrap-flex">
										<div class="wrap-title">开始时间：</div>
										<div class="title-detail">{{item.hykssj}}至{{item.hyjssj}}</div>
									</div>
									<div class="wrap-flex">
										<div class="wrap-title">会议类型：</div>
										<div class="title-detail">{{findDmMap['m_hyktdm'][item.hylx]}}</div>
									</div>
									<div class="wrap-flex">
										<div class="wrap-title">会议地点：</div>
										<div class="title-detail title-detail-address" v-text="item.hydd"></div>
									</div>
									<div class="wrap-btn">
										<el-button size="mini" type="danger" v-if="item.ifks==1" @click="akeySigCollect(1, item)">立即报名</el-button>
										<el-button size="mini" type="danger" v-if="item.ifks==2">已开始</el-button>
										<el-button size="mini" type="danger" v-if="item.ifks==3">已结束</el-button>
										<el-button size="mini" type="danger" @click="getCurrentPageOnlineVenue(item.hxid, item.ifks)">{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
									</div>
								</div>
								<div style="width: 75rem;">
									<div class="wrap-seeall" @click="getAllvenue(2)">
										查看更多
										<i class="el-icon-caret-bottom"></i>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
				<div class="body-wrap-3">
					<div class="wrap-3-title"></div>
					<div class="wrap-3-wrap">
						<el-tabs v-model="enterActiveName" @tab-click="wrap3tabshandleClick">
							<el-tab-pane label="热门高校" name="2">
								<div class="wrap-list" v-for="(item, index) in Enterprise" :key="index">
									<div class="enter-title">
										<div class="enterLogo" v-if="company.info[item.dwid]" :style="{backgroundImage: 'url(' + company.info[item.dwid] + ')'}">
											<!-- <img :src="company.info[item.dwid]||enterlogo" alt="" /> -->
										</div>
										<div class="enterLogo" v-else :style="{backgroundImage: 'url(' + enterlogo + ')'}"></div>
										<div class="enter-name">
											<router-link target="_blank" :to="{path:'/public/enterDetail',query:{dwid: item.dwid}}">{{item.dwmc}}</router-link>
										</div>
									</div>
									<div class="enter-detail">
										<div class="enter-data">
											<p>
												<span>{{findDmMap['m_dwxzdm'][item.dwxz]}}</span> /
												<span>{{findDmMap['m_dwsshydm'][item.dwsshy]}}</span> /
												<span>150-500人</span>
											</p>
											<p v-text="item.gwmc"></p>
										</div>
										<div class="enter-jobs">
											<div class="jobs-left">
												<span v-text="item.rzgws"></span>个热招岗位
											</div>
											<div class="jobs-right">
												<span v-text="item.booszxs"></span>位BOSS在线
											</div>
										</div>
									</div>
								</div>
								<div style="width: 75rem;">
									<div class="wrap-seeall"  @click="gettoJobsDetail">
										查看更多
										<i class="el-icon-caret-bottom"></i>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="热招企业" name="1">
								<div class="wrap-list" v-for="(item, index) in Enterprise" :key="index">
									<div class="enter-title">
										<div class="enterLogo" v-if="company.info[item.dwid]" :style="{backgroundImage: 'url(' + company.info[item.dwid] + ')'}">
											<!-- <img :src="company.info[item.dwid]||enterlogo" alt="" /> -->
										</div>
										<div class="enterLogo" v-else :style="{backgroundImage: 'url(' + enterlogo + ')'}"></div>
										<div class="enter-name">
											<router-link target="_blank" :to="{path:'/public/enterDetail',query:{dwid: item.dwid}}">{{item.dwmc}}</router-link>
										</div>
									</div>
									<div class="enter-detail">
										<div class="enter-data">
											<p>
												<span>{{findDmMap['m_dwxzdm'][item.dwxz]}}</span> /
												<span>{{findDmMap['m_dwsshydm'][item.dwsshy]}}</span> /
												<span>150-500人</span>
											</p>
											<p v-text="item.gwmc"></p>
										</div>
										<div class="enter-jobs">
											<div class="jobs-left">
												<span v-text="item.rzgws"></span>个热招岗位
											</div>
											<div class="jobs-right">
												<span v-text="item.booszxs"></span>位BOSS在线
											</div>
										</div>
									</div>
								</div>
								<div style="width: 75rem;">
									<div class="wrap-seeall"  @click="gettoJobsDetail">
										查看更多
										<i class="el-icon-caret-bottom"></i>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="上市公司" name="3">
								<div class="wrap-list" v-for="(item, index) in Enterprise" :key="index">
									<div class="enter-title">
										<div class="enterLogo" v-if="company.info[item.dwid]" :style="{backgroundImage: 'url(' + company.info[item.dwid] + ')'}">
											<!-- <img :src="company.info[item.dwid]||enterlogo" alt="" /> -->
										</div>
										<div class="enterLogo" v-else :style="{backgroundImage: 'url(' + enterlogo + ')'}"></div>
										<div class="enter-name">
											<router-link target="_blank" :to="{path:'/public/enterDetail',query:{dwid: item.dwid}}">{{item.dwmc}}</router-link>
										</div>
									</div>
									<div class="enter-detail">
										<div class="enter-data">
											<p>
												<span>{{findDmMap['m_dwxzdm'][item.dwxz]}}</span> /
												<span>{{findDmMap['m_dwsshydm'][item.dwsshy]}}</span> /
												<span>150-500人</span>
											</p>
											<p v-text="item.gwmc"></p>
										</div>
										<div class="enter-jobs">
											<div class="jobs-left">
												<span v-text="item.rzgws"></span>个热招岗位
											</div>
											<div class="jobs-right">
												<span v-text="item.booszxs"></span>位BOSS在线
											</div>
										</div>
									</div>
								</div>
								<div style="width: 75rem;">
									<div class="wrap-seeall" @click="gettoJobsDetail">
										查看更多
										<i class="el-icon-caret-bottom"></i>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</div>
		</div>
		<Foot></Foot>
	</div>
</template>

<script>
import Head from "./Head.vue";
import Foot from "./Foot.vue";
import JobsClass from "./common/Jobclassification.vue";
import Advertising from "./common/Advertising.vue";
import Moment from "./common/moment.js";
import { mapState, mapGetters } from "vuex";
import enterLogo from '../assets/images/common/enterDetail.png'

export default {
  name: "Index",
  components: {
    Head,
    Foot,
    JobsClass,
    Advertising
  },
  data() {
    return {
		enterlogo: enterLogo,
      listData: [],
      OnlineVenue: [],
      Enterprise: [],
      venueActiveName: "1",
      enterActiveName: "2",
		company:{
			// 单位id列表
			dwids:[],
			info:{}
		},
    };
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 26
      };
    },
    ...mapGetters({
      token: "getToken",
      userId: "getuserId",
      Jobseekers: "getJobseekers",
      HR: "getHR"
    }),
    ...mapState({
      findDmMap: state => state.findDmMap
    })
  },
  methods: {
    getNoticeMsgaxios() {
      //公告资讯
      this.axios({
        method: "post",
        url: "/api/xs/notice/getNoticeMsgWeb",
        data: {
          page: 1,
          limit: 10
        },
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => {
          // console.log('getNoticeMsgaxios:',response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.page.list;
            this.listData = data.map(item => {
              if (item.types) {
                item.zxtype = this.findDmMap["m_zxlbdm"][item.types];
                return item;
              } else {
                item.zxtype = "";
                return item;
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOnlineVenue(type) {
      //线上线下会场
      var that = this;
      that.axios
        .get("/api/hr/bshxxx/findHxListByType", {
          params: {
            page: 1,
            limit: 12,
            type: type,
			px: 1,
            csdm: ""
          },
          headers: {
            "content-type": "application/json"
            // 'token':token
          }
        })
        .then(function(response) {
          // console.log('getOnlineVenue:',response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.page.list;
            var tdate = Moment.moment1();
            that.OnlineVenue = data.map(item => {
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
    getEnterprise(type) {
      //企业、热招
      var that = this;
      that.axios
        .get("/api/hr/bskhgl/findDwListByType", {
          params: {
            page: 1,
            limit: 12,
            type: type,
            csdm: ""
          },
          headers: {
            "content-type": "application/json"
            // 'token':token
          }
        })
        .then(function(response) {
          // console.log('getEnterprise:',response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.page.list;
			data.map(item => {
				if (item.dwid) {
					that.company.dwids.push(item.dwid);
				}
			})
            that.Enterprise = data;
			if (that.company.dwids.length) that.getDwLogos();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
	// 批量获取单位logo
	getDwLogos(){
		this.axios({
			method: 'post',
			url: '/api/hr/qydwhrxx/getDwLogos',
			data: this.company.dwids,
			headers: {
				"content-type": "application/json",
				'token': this.token
			}
		}).then((res)=> {
			if (res && res.data && res.data.code == 0) {
				this.company.info = res.data.urls;
			}
		})
	},

    akeySigCollect(stat, item) {
      //一键报名+收藏
      var that = this;
      var hxidArr = [];
      if (stat == 1) {
        if (that.token) {
          if (that.Jobseekers) {
            hxidArr.push(item.hxid);
            that.JobseekersSignup(hxidArr);
          }
          if (that.HR) {
            hxidArr.push(item.hxid);
            that.hrSignup(hxidArr);
          }
        } else {
          that
            .$confirm("未登录，请您登录后，进行报名。", "登录状态", {
              confirmButtonText: "去登录",
              cancelButtonText: "取 消",
              type: "warning"
            })
            .then(() => {
              this.$router.push({
                path: "/public/login"
              });
            });
        }
      } else {
        if (that.token) {
          if (that.Jobseekers) {
            hxidArr.push(item.hxid);
            that.JobseekersCollect(hxidArr);
          }
          if (that.HR) {
            hxidArr.push(item.hxid);
            that.hrCollect(hxidArr);
          }
        } else {
          that
            .$confirm("未登录，请您登录后，进行收藏。", "登录状态", {
              confirmButtonText: "去登录",
              cancelButtonText: "取 消",
              type: "warning"
            })
            .then(() => {
              this.$router.push({
                path: "/public/login"
              });
            });
        }
      }
    },
    JobseekersSignup(hxid) {
      //求职报名
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/qz/bsrcbmxx/hxBmMore",
          data: hxid,
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
    },
    hrSignup(hxid) {
      //HR报名
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/hr/bsdwbmxx/addBmhxxMore",
          data: hxid,
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
    },
    JobseekersCollect(hxid) {
      //求职收藏
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/qz/jobFairFavorite/favoriteMore",
          data: hxid,
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
              message: "收藏成功",
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
    },
    hrCollect(hxid) {
      //HR收藏
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/hr/jobFairFavorite/favoriteMore",
          data: hxid,
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
              message: "收藏成功",
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
    },

    wrap2tabshandleClick() {
      var that = this;
      var type = Number(that.venueActiveName);
      that.getOnlineVenue(type);
    },
    wrap3tabshandleClick() {
      var that = this;
      var type = Number(that.enterActiveName);
      that.getEnterprise(type);
    },
    getCurrentPageNotice(Noticeid) {
      this.$router.push({
        path: "/public/noticedetail",
        query: {
          noticeid: Noticeid
        }
      });
    },
    getCurrentPageOnlineVenue(hxid, ifks) {
      this.$router.push({
        path: "/public/meetinghall",
        query: {
			hxid: hxid,
			ifks: ifks
        }
      });
    },
    getAllvenue(val) {
      this.$router.push({
        path: "/public/jobretrieve",
        query: {
          val: 2,
          venue: val
        }
      });
    },
    gettoEnterDetail(item) {
      this.$router.push({
        path: "/public/enterDetail",
        query: {
          dwid: item.dwid
        }
      });
    },
    gettoJobsDetail() {
     this.$router.push({
       path: "/public/jobretrieve",
       query: {
         val: 1,
       }
     });
    }
  },
  created() {
    // console.log("vuex", this.$store);
    this.getNoticeMsgaxios();
    this.getOnlineVenue(1);
    this.getEnterprise(2);
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../assets/styles/reset.css");

	.body {
		width: 1280px;
		margin: 7.5rem auto 0;
		padding-top: 1.25rem;
		overflow: hidden;
	}

	.body .body-wrap {
		width: 75rem;
		margin: 0 auto;
	}

	/deep/ .el-tabs__item.is-active {
		color: #ff5656;
	}

	/deep/ .el-tabs__item:hover {
		color: #ff5656;
	}

	/deep/ .el-tabs__active-bar {
		background-color: #ff5656;
	}

	.body-wrap-1 .wrap-1-title,
	.body-wrap-2 .wrap-2-title,
	.body-wrap-3 .wrap-3-title {
		margin-bottom: 0.25rem;
	}

	.body-wrap-1 .wrap-1-wrap {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	.wrap-1-wrap-left {
		width: 21.8125rem;
		height: 429px;
		background-color: #ffffff;
	}

	.wrap-1-wrap-right {
		width: 51.875rem;
		height: 429px;
		margin-left: 1.25rem;
	}

	.body-wrap .body-wrap-2 .wrap-2-wrap .el-tab-pane,
	.body-wrap .body-wrap-3 .wrap-3-wrap .el-tab-pane {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		-ms-flex-pack: distribute;
	}

	.body-wrap-2 .wrap-2-wrap .wrap-list {
		width: 22.6875rem;
		/* height: 12.5rem; */
		line-height: 1.8;
		padding: 0.5rem;
		font-size: 0.875rem;
		color: rgba(80, 80, 80, 1);
		position: relative;
		border: 1px solid rgba(229, 229, 229, 1);
		background-color: #ffffff;
		margin-bottom: 1.25rem;
		margin-right: 1.75rem;
		overflow: hidden;
	}

	/*  */
	.wrap-list .wrap-float-top {
		width: 1.25rem;
		height: 1.25rem;
		position: absolute;
		right: 0.625rem;
		top: 0.75rem;
		cursor: pointer;
	}

	.wrap-list .wrap-float-top img {
		width: 100%;
		height: 100%;
	}

	.wrap-list .wrap-Title {
		width: 18.75rem;
		text-align: center;
		font-size: 0.9375rem;
		font-weight: bold;
		color: rgba(80, 80, 80, 1);
		margin: 0.0625rem auto;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.wrap-list .wrap-address {
		height: 1.6875rem;
		font-size: 0.9375rem;
		font-weight: bold;
		color: rgba(249, 64, 31, 1);
	}

	.wrap-list .wrap-flex {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
	}

	.wrap-list .wrap-btn {
		margin: 0.3125rem 0;
		text-align: center;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}

	.wrap-btn .el-button {
		display: inline-block;
		width: 10rem;
		color: #ffffff;
	}

	.wrap-list .wrap-title {
		width: 4.4375rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.wrap-list .title-detail {
		width: 17.8125rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.wrap-list .title-detail-address {
		height: 3.125rem;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		white-space: initial;
	}

	.wrap-list .wrap-text {
		width: 22.625rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	/*  */
	.body-wrap .body-wrap-3 .wrap-3-wrap {
		margin: 2.5rem 0;
		padding-top: 0.625rem;
	}

	.body-wrap .body-wrap-3 .wrap-3-wrap .wrap-list {
		width: 21.875rem;
		height: 15rem;
		padding: 1.25rem 0.9375rem 0.3125rem;
		margin-right: 1.875rem;
		margin-bottom: 1.25rem;
		overflow: hidden;
		font-size: 0.9375rem;
		background-color: #ffffff;
	}

	.wrap-3-wrap .wrap-list .enter-title, .enter-title a {
		text-align: center;
		margin-bottom: 0.625rem;
		color: rgb(58, 58, 58);
	}

	.wrap-3-wrap .wrap-list .enter-title .enterLogo {
		/* width: 6.125rem; */
		height: 6.125rem;
		margin: 0 auto;
		text-align: center;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		overflow: hidden;
	}

	.wrap-3-wrap .wrap-list .enter-title .enterLogo img {
		width: 100%;
		height: 100%;
	}

	.wrap-3-wrap .wrap-list .enter-name {
		cursor: pointer;
		margin-top: 5px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}



	.wrap-3-wrap .wrap-list .enter-data {
		height: 2.5rem;
		padding: 0.3125rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ff4c4f;
		color: #666666;
		text-align: center;
	}

	.wrap-3-wrap .wrap-list .enter-data p {
		margin-bottom: 3px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.enter-data p:nth-child(2) {
		cursor: pointer;
	}

	.wrap-3-wrap .wrap-list .enter-jobs {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0.9375rem 1.25rem 0.3125rem;
		color: #b4bccc;
	}

	.wrap-3-wrap .wrap-list .enter-jobs span {
		color: #ff4c4f;
	}

	.body-wrap .body-wrap-4 {
		display: flex;
		flex-wrap: nowrap;
		background-color: #ffffff;
		padding-bottom: 0.75rem;
		padding-left: 0.625rem;
		margin: 10px 0;
	}

	.body-wrap .body-wrap-4 .wrap-4-title {
		width: 2.75rem;
	}

	.body-wrap .body-wrap-4 .wrap-4-wrap {
		width: 71.875rem;
		margin-left: -0.625rem;
	}

	.wrap-4-wrap .el-carousel__item {
		line-height: 3.25rem;
	}

	.wrap-4-wrap .wrap-4-wrap-list {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		cursor: pointer;
	}

	.wrap-4-wrap-list .wrap4-list-class {
		width: 4.375rem;
	}

	.wrap-4-wrap-list .wrap4-list-title {
		width: 40.125rem;
		margin-right: 5rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.wrap-4-wrap-list .wrap4-list-date {
		width: 10.875rem;
	}

	.wrap-4-wrap-list .wrap4-list-reading {
		width: 10.875rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.body-wrap-2 .wrap-2-wrap .wrap-list:nth-child(3n),
	.body-wrap .body-wrap-3 .wrap-3-wrap .wrap-list:nth-child(3n) {
		margin-right: 0;
	}

	.body-wrap-2 .wrap-2-wrap .wrap-seeall,
	.body-wrap-3 .wrap-3-wrap .wrap-seeall {
		width: 22.5rem;
		height: 1.5625rem;
		margin: 0.625rem auto 0;
		text-align: center;
		font-size: 0.9375rem;
		color: rgba(255, 8, 0, 0.5);
		line-height: 1.5625rem;
		border: 0.0625rem solid rgba(255, 8, 0, 0.5);
		cursor: pointer;
	}
</style>
