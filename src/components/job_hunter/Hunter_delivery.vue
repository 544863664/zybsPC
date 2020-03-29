<template>
	<!-- 双选会投递职位 -->
	<div class="who">
		<ul class="ul_tab">
			<li :class="{'active':tab == 1}" @click="setTab(1)">
				<span class="tip">双选会收藏</span>
			</li>
			<li :class="{'active':tab == 2}" @click="setTab(2)">
				<span class="tip">会外收藏</span>
			</li>
		</ul>
		<div class="list">
			<!-- 全部投递 -->
			<div v-if="tab == 1">
				<ul class="ul1">
					<li v-if="selectionObj.totalCount==0" class="arrNull">
						<h3>无数据</h3>
					</li>
					<li v-for="(item, index) in selectionObj.selectionObjList" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										高级大数据教师
										<span class="font-red margin_lr">博士专场</span>
										<span>02月18日</span>
									</h4>
								</div>
								<div class="view">
									<span class="font-red margin_r">8-10K</span>
									1-3年｜本科
									<div class="btn">
										<img class="shipin" src="../../assets/images/common/shipin-grey.png" alt />
										立即沟通
									</div>
								</div>
							</div>
							<div class="list_r_right">
								<div class="right_title">
									<h4>稻壳网</h4>
									<p>移动互联网｜B轮</p>
								</div>
								<div class="right_logo">
									<img src="../../assets/images/common/enter.png" alt />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination v-if="selectionObj.totalCount>10" @current-change="selectionObjCurChange" :page-size="selectionObj.pageSize"
					:current-page="selectionObj.currentPage" layout="prev, pager, next" :total="selectionObj.totalCount"></el-pagination>
			</div>
			<!-- 收藏双选会 -->
			<div v-if="tab == 2">
				<ul class="ul2">
					<li v-if="selection.totalCount==0" class="arrNull">
						<h3>无数据</h3>
					</li>
					<li v-for="(item, index) in selection.selectionList" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<h3>
									{{item.HYMC}}
									<span class="font-red margin_lr">{{item.date}}收藏</span>
								</h3>
								<p>开始时间：{{item.HYKSSJ}} 至 {{item.HYJSSJ}}</p>
								<p>会议类型：{{findDmMap['m_hyktdm'][item.HYLX]}}</p>
								<p class="count">
									本次参会单位{{item.QYCHRS}}家企业
									<span>本次发布岗位{{item.QYGWS}}个</span>
								</p>
							</div>
							<div class="list_r_right">
								<div class="con_edit">
									<div>
										<el-button type="danger" v-if="item.ifks==1" @click="go(item)">立即报名</el-button>
									</div>
									<div>
										<el-button type="danger" v-if="item.ifks==2">已开始</el-button>
									</div>
									<div>
										<el-button type="danger" v-if="item.ifks==3">已结束</el-button>
									</div>
									<div>
										<el-button type="danger" @click="enter(item.HXID)">{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination v-if="selection.totalCount>10" @current-change="selectionCurChange" :page-size="selection.pageSize"
					:current-page="selection.currentPage" layout="prev, pager, next" :total="selection.totalCount"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		mapGetters,
		mapState
	} from "vuex";
	import Moment from "../common/moment.js";
	export default {
		components: {},
		data() {
			return {
				tab: 2,
				selectionObj: {
					selectionObjList: [],
					pageSize: 10,
					currentPage: 1,
					totalCount: 0
				},
				selection: {
					selectionList: [],
					pageSize: 10,
					currentPage: 1,
					totalCount: 0
				}
			};
		},
		computed: {
			...mapGetters({
				token: "getToken"
			}),
			...mapState({
				findDmMap: state => state.findDmMap
			})
		},
		methods: {
			// 点击tab
			setTab(val) {
				this.tab = val;
			},
			selectionObjCurChange(currentPage) {
				this.selectionObj.currentPage = currentPage;
			},
			selectionCurChange(currentPage) {
				this.selection.currentPage = currentPage;
				this.getcollectedList();
			},
			getcollectedList() {
				var that = this;
				that
					.axios({
						method: "get",
						url: "/api/qz/jobFairFavorite/collectedList",
						data: "",
						params: {
							page: that.selection.currentPage,
							limit: that.selection.pageSize,
							hymc: ""
						},
						headers: {
							"content-type": "application/json",
							token: that.token
						}
					})
					.then(function(response) {
						if (response && response.data && response.data.code == 0) {
							that.selection.totalCount = response.data.page.totalCount;
							var data = response.data.page.list;
							var tdate = Moment.moment1();
							data.map(item => {
								item.date =
									Moment.formatDate3(item.SCSJ)
									.replace("-", "年")
									.replace("-", "月") + "日";
								if (tdate < Moment.moment2(item.HYKSSJ)) {
									item.ifks = 1;
									return item;
								} else if (
									Moment.moment2(item.HYKSSJ) < tdate &&
									tdate < Moment.moment2(item.HYJSSJ)
								) {
									item.ifks = 2;
									return item;
								} else if (Moment.moment2(item.HYJSSJ) < tdate) {
									item.ifks = 3;
									return item;
								}
								return item;
							});
							that.selection.selectionList = data;
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

			go(item) {
				//立即报名
				var that = this;
				console.log(item);
				var hxid = item.HXID;
				var qzzid = item.USERID;
				that
					.axios({
						method: "post",
						url: "/api/xs/app/rc/save",
						data: {
							hxid: hxid,
							qzzid: qzzid
						},
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
			enter(hxid) {
				//进入会议
				var that = this;
				that.$router.push({
					path: "/public/meetinghall",
					query: {
						hxid: hxid
					}
				});
			}
		},
		created() {
			this.getcollectedList();
		}
	};
</script>
<style scoped>
	.ul_tab {
		height: 30px;
		cursor: default;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.shipin {
		width: 23px;
		height: 18px;
		top: 0.0625rem;
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

	.list .arrNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}

	.list_resume {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0.9375rem;
		background-color: #ffffff;
		margin-bottom: 0.9375rem;
	}

	.list_resume p,
	.list_resume span,
	.list_resume .view {
		color: #909399;
		font-size: 14px;
	}

	.list_resume .margin_lr {
		margin: 0 0.9375rem;
	}

	.list_resume .margin_r {
		margin-right: 0.9375rem;
	}

	.list_r_left .title {
		margin-bottom: 0.3125rem;
	}

	.list_r_left .title span {
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.list_r_left .view .btn {
		height: 1.1875rem;
		width: 5.375rem;
		margin-top: 0.125rem;
		padding: 0 0.3125rem;
		line-height: 20px;
		font-size: 0.75rem;
		text-align: center;
		border: 0.0625rem solid #c0c4cc;
		border-radius: 12.5px;
		background-color: #ffffff;
		cursor: pointer;
	}

	.list_r_left .font-red {
		color: #ff5656;
	}

	.list_r_right {
		display: flex;
	}

	.list_r_right .right_logo {
		width: 4.375rem;
		height: 4.375rem;
	}

	.list_r_right .right_title {
		margin-right: 0.625rem;
		text-align: right;
	}

	.right_title h4 {
		margin: 0.625rem 0;
	}

	.list_r_right .con_edit {
		line-height: 2.5;
	}
	.list_r_right .con_edit .el-button {
		width: 100%;
	}
</style>
