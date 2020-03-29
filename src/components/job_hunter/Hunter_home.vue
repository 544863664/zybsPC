<!-- 求职者登录后首页面 -->
<template>
	<div class="user">
		<!-- 个人信息 -->
		<div class="user_info">
			<p class="title">
				<span class="t_name fleft">简历信息</span>
				<span class="t_time fright" v-if="mineMsg.jlUpdateTime">简历更新时间：{{mineMsg.jlUpdateTime}}</span>
			</p>
			<p class="name">
				<span class="a1">姓名：{{mineMsg.xm}}</span>
				<span class="a1">性别：{{mineMsg.xb}} ｜ {{mineMsg.nl}}岁 ｜ {{findDmMap.m_xldm[mineMsg.zgxl] || 'xxx'}}</span>
				<span class="a1">{{mineMsg.gznx}}年工作经验</span>
			</p>
			<p class="work">
				<span>现居住：{{mineMsg.liveCity}}</span>
				<span>求职状态：{{findDmMap['m_qzzt'][mineMsg.qzzt]}}</span>
			</p>
			<p class="tel_email">
				<span class="tel">{{mineMsg.sj}}</span>
				<span class="email" v-if="mineMsg.yx">{{mineMsg.yx}}</span>
			</p>
			<div class="edit_btn">
				<el-button type="danger" plain @click="setEdit">编辑</el-button>
				<el-button type="danger" plain @click="refreshDaily">刷新</el-button>
			</div>
		</div>
		<!-- 列表信息 -->
		<div class="user_list">
			<div class="list_tab">
				<ul class="ul_tab">
					<li :class="tab == 1 ?'active':''">
						<span class="tip" @click="setTab(1)">网络双选会推荐</span>
						<el-dropdown @command="handleCommands">
							<span class="el-dropdown-link">
								{{ onlineSxh.systemMonths }}
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="{value:item.systemDaS,type:1}" :value="item.systemDaS" v-for="(item,index) in dateArr"
									:key="index">{{item.systemDat}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li :class="tab == 2 ?'active':''">
						<span class="tip" @click="setTab(2)">线下双选会推荐</span>
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">
								{{ underlineSxh.systemMonths }}
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="{value:item.systemDat,type:2}" :value="item.systemDat" v-for="(item,index) in dateArr"
									:key="index">{{item.systemDat}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li :class="tab == 3 ?'active':''">
						<span class="tip" @click="setTab(3)">已报名双选会</span>
					</li>
				</ul>
				<!-- 网络双选会推荐 -->
				<div v-if="tab == 1">
					<ul class="list_con">
						<li v-if="onlineSxh.totalCount==0" class="followNull">
							<h3>无网络双选会推荐</h3>
						</li>
						<li v-for="(item,index) in onlineSxh.onlineSxhList" :key="index">
							<h1>
								{{item.hymc}}
								<span class="font-red"></span>
							</h1>
							<div class="con_time">
								<p>时间：{{item.hykssj}}至{{item.hyjssj}}</p>
								<p>会议类型：{{findDmMap['m_hyktdm'][item.hylx]}}</p>
								<p v-if="item.hydd">会议地点：{{item.hydd}}</p>
								<p class="count">
									本次参会单位0家企业
									<span>本次发布岗位0个</span>
								</p>
								<div class="con_edit">
									<el-button type="danger" v-if="item.ifks==1" @click="go(item)">立即报名</el-button>
									<el-button type="danger" v-if="item.ifks==2" style="width: 88px;">已开始</el-button>
									<el-button type="danger" v-if="item.ifks==3" style="width: 88px;">已结束</el-button>
									<el-button type="danger" @click="enter(item.hxid)">{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
								</div>
							</div>
						</li>
					</ul>
					<el-pagination v-if="onlineSxh.totalCount>0" @current-change="handleCurrentChange" :current-page="onlineSxh.currentPage"
						:page-size="onlineSxh.pageSize" layout="prev, pager, next" :total="onlineSxh.totalCount"></el-pagination>
				</div>
				<!-- //线下双选会推荐 -->
				<div v-if="tab == 2">
					<ul class="list_con">
						<li v-if="underlineSxh.totalCount==0" class="followNull">
							<h3>无线下双选会推荐</h3>
						</li>
						<li v-for="(item,index) in underlineSxh.underlineSxhList" :key="index">
							<h1>
								{{item.hymc}}
								<span class="font-red"></span>
							</h1>
							<div class="con_time">
								<p>时间：{{item.hykssj}}至{{item.hyjssj}}</p>
								<p>会议类型：{{findDmMap['m_hyktdm'][item.hylx]}}</p>
								<p>会议地点：{{item.hydd}}</p>
								<div class="con_edit">
									<el-button type="danger" v-if="item.ifks==1" @click="go(item)">立即报名</el-button>
									<el-button type="danger" v-if="item.ifks==2" style="width: 88px;">已开始</el-button>
									<el-button type="danger" v-if="item.ifks==3" style="width: 88px;">已结束</el-button>
									<el-button type="danger" @click="enter(item.hxid)">{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
								</div>
							</div>
						</li>
					</ul>
					<el-pagination v-if="underlineSxh.totalCount>0" @current-change="handleCurrentChange" :current-page="underlineSxh.currentPage"
						:page-size="underlineSxh.pageSize" layout="prev, pager, next" :total="underlineSxh.totalCount"></el-pagination>
				</div>
				<!-- //已报名双选会 -->
				<div v-if="tab == 3">
					<ul class="list_con">
						<li v-if="registered.registeredList.length==0" class="followNull">
							<h3>未报名双选会</h3>
						</li>
						<li v-for="(item,index) in registered.registeredList" :key="index">
							<h1>
								{{item.hymc}}
								<span class="font-red"></span>
							</h1>
							<div class="con_time">
								<p>时间：{{item.hykssj}}至{{item.hyjssj}}</p>
								<p>招办单位：{{item.cbdw}}</p>
								<div class="con_edit">
									<el-button type="danger" @click="enter(item.hxid)">{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
								</div>
							</div>
						</li>
					</ul>
					<el-pagination v-if="registered.registeredList.length>0" @current-change="handleCurrentChange" :current-page="registered.currentPage"
						:page-size="registered.pageSize" layout="prev, pager, next" :total="registered.totalCount"></el-pagination>
				</div>
			</div>
		</div>

		<!-- 用户信息编辑 -->
		<user-edit v-if="edit.show" @change="commitChange()" @close="closeChange()"></user-edit>
	</div>
</template>

<script>
	import userEdit from "../common/userEdit";
	import {
		mapState,
		mapGetters
	} from "vuex";
	import moment from "moment";
	import Moment from "../common/moment.js";
	export default {
		name: "Hunter_home",
		components: {
			userEdit
		},
		data() {
			return {
				dateArr: [],
				// 编辑弹出框
				edit: {
					show: false
				},
				tab: 1,
				mineMsg: {},
				onlineSxh: {
					onlineSxhList: [],
					pageSize: 10,
					currentPage: 1,
					totalCount: 0,
					systemMonths: ""
				},
				underlineSxh: {
					underlineSxhList: [],
					pageSize: 10,
					currentPage: 1,
					totalCount: 0,
					systemMonths: ""
				},
				registered: {
					registeredList: [],
					pageSize: 10,
					currentPage: 1,
					totalCount: 0,
					systemMonths: ""
				}
			};
		},
		created() {
			var that = this;
			that.mineMessgae();
			that.addDate();
			that.setTab(1);
			that.onlineSxh.systemMonths = that.dateArr[0].systemDat;
			that.underlineSxh.systemMonths = that.dateArr[0].systemDaS;
		},
		computed: {
			...mapGetters({
				token: "getToken"
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				ProvinceMap: state => state.ProvinceMap,
				CityMap: state => state.CityMap,
				AreaMap: state => state.AreaMap
			})
		},
		methods: {
			// 设置tab点击
			setTab(type) {
				this.tab = type;
				if (type == 1) {
					var currentPage = this.onlineSxh.currentPage;
					var pageSize = this.onlineSxh.pageSize;
					var systemMonths = this.onlineSxh.systemMonths;
					this.getOnSxh(type, currentPage, pageSize, systemMonths);
				} else if (type == 2) {
					var currentPage_ = this.underlineSxh.currentPage;
					var pageSize_ = this.underlineSxh.pageSize;
					var systemMonths_ = this.underlineSxh.systemMonths;
					this.getOnSxh(type, currentPage_, pageSize_, systemMonths_);
				} else {
					this.getRegistered();
				}
			},
			handleCommands(command) {
				//线上
				this.onlineSxh.systemMonths = command.value;
				var currentPage = this.underlineSxh.currentPage;
				var pageSize = this.underlineSxh.pageSize;
				this.getOnSxh(command.type, currentPage, pageSize, command.value);
			},
			handleCommand(command) {
				//线下
				this.underlineSxh.systemMonths = command.value;
				var currentPage = this.underlineSxh.currentPage;
				var pageSize = this.underlineSxh.pageSize;
				this.getOnSxh(command.type, currentPage, pageSize, command.value);
			},
			handleCurrentChange(currentPage) {
				if (this.tab == 1) {
					var type = this.tab;
					this.onlineSxh.currentPage = currentPage;
					var pageSize = this.onlineSxh.pageSize;
					var systemMonths = this.onlineSxh.systemMonths;
					this.getOnSxh(type, currentPage, pageSize, systemMonths);
				} else if (this.tab == 2) {
					var type_ = this.tab;
					this.underlineSxh.currentPage = currentPage;
					var pageSize_ = this.underlineSxh.pageSize;
					var systemMonths_ = this.underlineSxh.systemMonths;
					this.getOnSxh(type_, currentPage, pageSize_, systemMonths_);
				} else {
					this.registered.currentPage = currentPage;
					this.getRegistered();
				}
			},
			getOnSxh(tab, currentPage, pageSize, systemMonths) {
				var that = this;
				that.axios
					.get("/api/hr/bshxxx/findHxListByType", {
						params: {
							type: tab,
							page: currentPage,
							limit: pageSize,
							ksny: systemMonths
						},
						headers: {
							"content-type": "application/json",
							token: that.token
						}
					})
					.then(function(response) {
						if (response && response.data && response.data.code == 0) {
							var data = response.data.page.list;
							var tdate = Moment.moment1();
							data.map(item => {
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
							if (tab == 1) {
								that.onlineSxh.totalCount = response.data.page.totalCount;
								that.onlineSxh.onlineSxhList = data;
							} else {
								that.underlineSxh.totalCount = response.data.page.totalCount;
								that.underlineSxh.underlineSxhList = data;
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getRegistered() {
				var that = this;
				that
					.axios({
						method: "post",
						url: "/api/qz/bsrcbmxx/list",
						data: "",
						params: "",
						headers: {
							"content-type": "application/json",
							token: that.token
						}
					})
					.then(function(response) {
						console.log("getRegistered:", response);
						if (response && response.data && response.data.code == 0) {
							var data = response.data.hxList;
							var tdate = Moment.moment1();
							data.map(item => {
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
							that.registered.registeredList = data;
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
			//个人基本信息
			mineMessgae() {
				var that = this;
				that.axios
					.get("/api/qz/qzgrjbxx/info", {
						headers: {
							"content-type": "application/json",
							token: that.token
						}
					})
					.then(function(response) {
						if (response && response.data && response.data.code == 0) {
							var data = response.data.qzGrjbxx;
							if (data.dqszs && data.dqszcs) {
								data.liveCity =
									that.ProvinceMap[data.dqszs] +
									that.CityMap[data.dqszs][data.dqszcs];
								if (data.dqszxq) {
									data.liveCity += that.AreaMap[data.dqszcs][data.dqszxq];
								}
							}
							if (data.xbm) {
								data.xb = that.findDmMap["m_xbdm"][data.xbm];
							}
							that.mineMsg = data;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			refreshDaily() {
				var that = this;
				that.axios
					.get("/api/qz/qzgrjbxx/refreshDaily", {
						headers: {
							"content-type": "application/json",
							token: that.token
						}
					})
					.then(function(response) {
						// console.log('refreshDaily:', response);
						if (response && response.data && response.data.code == 0) {
							that.$message({
								type: "success",
								message: "刷新成功",
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
			addDate() {
				//年月
				var that = this;
				for (var i = 0; i < 5; i++) {
					if (i == 0) {
						var date1 = Moment.moment();
						date1 = Moment.formatDate5(date1);
						var date2 = date1.replace("-", "年") + "月";
						// var date2 = Moment.formatDate2(date1);
						that.dateArr.push({
							systemDat: date1,
							systemDa: date2,
							systemDaS: date1,
							systemDa_s: date2
						});
					} else {
						var date3 = moment()
							.add(i, "months")
							.format();
						date3 = Moment.formatDate5(date3);
						var date4 = date3.replace("-", "年") + "月";
						// var date4 = Moment.formatDate2(date3);
						that.dateArr.push({
							systemDat: date3,
							systemDa: date4,
							systemDaS: date3,
							systemDa_s: date4
						});
					}
				}
			},

			go(item) {
				//立即报名
				var that = this;
				var hxid = item.hxid;
				var qzzid = that.mineMsg.qzbsid;
				that.axios
					.post("/api/xs/app/rc/save", {
						hxid: hxid,
						qzzid: qzzid
					})
					.then(function(response) {
						// console.log('enter:', response);
						if (response && response.data && response.data.code == 0) {
							if (response.data.msg == "success") {
								that.$message({
									type: "success",
									message: "报名成功",
									offset: 400
								});
							}
						} else {
							that.$message.error({
								message: response.data.msg,
								offset: 400
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			enter(hxid) {
				//进入会议
				var that = this;
				that.$router.push({
					path: "/public/meetinghall",
					query: {
						hxid: hxid
					}
				});
			},

			// 用户信息编辑
			setEdit() {
				// this.edit.show = true
				this.$router.push({
					path: "/private/resume"
				});
			},
			// 用户信息编辑-确定
			commitChange(val) {
				this.edit.show = val;
			},
			// 用户信息编辑-取消
			closeChange(val) {
				this.edit.show = val;
			}
		}
	};
</script>

<style scoped>
	.user {
		font-size: 14px;
	}

	.user_info {
		background: #fff;
		padding: 12px;
		line-height: 30px;
	}

	.user_info .title {
		height: 40px;
	}

	.user_info .title .t_name {
		color: #606266;
		font-weight: bold;
	}

	.user_info .name .a1 {
		margin-right: 35px;
	}

	.user_info .work span {
		margin-right: 45px;
	}

	.user_info .tel_email span {
		padding: 4px 25px;
		margin-right: 10px;
		line-height: 30px;
	}

	.user_info .tel_email .tel {
		background: url("../../assets/images/common/phone.png") 0 -5px no-repeat;
		background-size: 25px;
	}

	.user_info .tel_email .email {
		background: url("../../assets/images/common/youjian.png") 0 -5px no-repeat;
		background-size: 25px;
	}

	.user_info .edit_btn {
		text-align: right;
	}

	.user_info /deep/.el-button--danger.is-plain {
		width: 90px;
		font-size: 12px;
	}

	.user_list {
		padding-top: 33px;
	}

	.user_list .list_tab .ul_tab {
		height: 30px;
	}

	.user_list .list_tab .ul_tab li {
		float: left;
		margin-right: 42px;
		color: #909399;
	}

	.user_list .list_tab .ul_tab li .tip {
		margin-right: 10px;
		font-size: 16px;
		font-weight: bold;
		cursor: default;
	}

	.user_list .list_tab .ul_tab li.active .tip {
		color: #fc5e5b;
		border-bottom: 2px solid #fc5e5b;
		display: inline-block;
		padding-bottom: 5px;
	}

	.user_list .list_tab .list_con {
		clear: both;
	}

	.user_list .list_tab .list_con li {
		clear: both;
		padding: 12px;
		background: #fff;
		color: #909399;
		line-height: 22px;
		font-size: 12px;
		position: relative;
		font-weight: bold;
		margin-top: 20px;
	}

	.user_list .list_tab .list_con li h1 {
		font-size: 16px;
		color: #333;
		padding-bottom: 10px;
	}

	.user_list .list_tab .list_con li h1 .font-red {
		padding-left: 20px;
	}

	.user_list .list_tab .list_con .count {
		font-weight: normal;
	}

	.user_list .list_tab .list_con .count span {
		padding-left: 20px;
	}

	.user_list .list_tab .list_con .con_edit {
		position: absolute;
		right: 19px;
		bottom: 12px;
	}

	.user_list .list_tab .list_con .followNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}
</style>
