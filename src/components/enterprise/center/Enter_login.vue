<template>
	<!-- 登录日志 -->
	<div class="Hunter_login">
		<div class="lo_fl">
			<div class="login_img"><img :src="imageUrl||enterimg" alt="" /></div>
			<div class="lo_name">
				{{mineMsg.xm}}
				<p>HR：{{mineMsg.sflx == 's_001' ? '人力资源(HR/HRBF)': '用人方(BOSS/主管/员工)'}}</p>
				<!--  -->
				<!--  -->
			</div>
		</div>
		<div class="lo_data">
			<el-form class="demo-form-inline" label-width="100px">
				<el-form-item label="操作时间" style="margin-bottom: 0;">
					<el-date-picker v-model="value1" type="datetimerange" align="left" unlink-panels range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="chanes">
					</el-date-picker>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<el-table :data="loginLogList" @selection-change="handleSelectionChange" style="width: 100%" :height="580" border
				:header-cell-style="{background:'#e5e5e5',color:'#606266','font-size': '16px',}"
				:default-sort="{prop: 'date', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(223, 223, 223, .5)">
				<el-table-column type="selection" width="50" align="center"></el-table-column>
				<el-table-column label="序号" align="center">
					<template slot-scope="scope">
						<p>{{ scope.row.bsid }}</p>
					</template>
				</el-table-column>
				<!-- <el-table-column label="账号" width="110" align="center">
					<template slot-scope="scope">
						<p>{{ scope.row.dljs }}</p>
					</template>
				</el-table-column> -->
				<el-table-column label="登录IP" align="center">
					<template slot-scope="scope">
						<p>{{ scope.row.dlip||'——'}}</p>
					</template>
				</el-table-column>
				<el-table-column label="登录日期" align="center">
					<template slot-scope="scope">
						<p>{{ scope.row.dlsj||'——'}}</p>
					</template>
				</el-table-column>
				<el-table-column label="登录浏览器" width="120" align="center">
					<template slot-scope="scope">
						<p>{{ scope.row.dlllq||'——'}}</p>
					</template>
				</el-table-column>
				<el-table-column label="登录类型" width="110" align="center">
					<template slot-scope="scope">
						<p>{{ scope.row.dlsm=='101'?'微信小程序':scope.row.dlsm=='201'?'手机助手APP':'301'?'电脑':'——' }}</p>
					</template>
				</el-table-column>
				<el-table-column label="登录状态" width="110" align="center">
					<template slot-scope="scope">
						<el-link type="success" :underline="false" v-if="scope.row.dlzt=='101'">成功</el-link>
						<el-link type="danger" :underline="false" v-if="scope.row.dlzt=='102'">失败</el-link>
						<el-link type="warning" :underline="false" v-if="scope.row.dlzt!='101'&&scope.row.dlzt!='102'">异常</el-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button style="margin-top: 10px;"  v-if="totalCount>0" @click="allDel">批量删除</el-button>
			<div class="block" v-if="totalCount>0">
				<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next"
					:total="totalCount"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import Moment from '../../common/moment.js'
	import enter from '../../../assets/images/common/enterDetail.png'
	export default {
		name: 'Enter_login',
		components: {},
		data() {
			return {
				enterimg: enter,
				value1: [],
				loginLogList: [],
				bsids: [],
				mineMsg: {},
				loading: true,
				totalCount: 0,
				pageSize: 10,
				currentPage: 1,
				tableData: [],
				search: '',
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			};
		},
		created() {
			var that = this;
			that.login_log();
			that.mineMessgae();
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				imageUrl: 'getHREnterLogo'
			}),
		},
		methods: {
			chanes() {
				var value = this.value1;
				var data1 = Moment.formatDate2(value[0]);
				var data2 = Moment.formatDate2(value[1]);
				this.login_log(data1, data2);
			},
			handleSelectionChange(val) {
				var bsids = [];
				val.map(item => {
					bsids.push(item.bsid)
				})
				this.bsids = bsids;
			},
			allDel() {
				var that = this;
				if (that.bsids.length > 0) {
					that.axios({
						method: 'post',
						url: '/api/sec/pc/deleteLoginLog',
						data: that.bsids,
						headers: {
							"content-type": "application/json",
							'token': that.token
						}
					}).then(function(response) {
						if (response && response.data && response.data.code == 0) {
							that.$message({
								message: "已删除",
								type: "success",
								offset: 400
							});
							that.login_log();
						}
					}).catch(function(error) {
						console.log(error);
					});
				}
			},
			handleDelete(row) {
				console.log(row);
				var that = this;
				var bsids = [];
				bsids.push(row.bsid);
				that.axios({
					method: 'post',
					url: '/api/sec/pc/deleteLoginLog',
					data: bsids,
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					console.log('handleDelete:', response);
					if (response && response.data && response.data.code == 0) {
						that.$message({
							message: "已删除",
							type: "success",
							offset: 400
						});
						that.login_log();
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
				this.loading = true;
				this.login_log();
			},
			login_log(date1, date2) {
				var that = this;
				that.axios.get("/api/sec/pc/getLoginLog", {
					params: {
						startDate: date1,
						endDate: date2,
						page: that.currentPage,
						limit: that.pageSize,
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.totalCount = response.data.loginLog.totalCount;
						that.loginLogList = response.data.loginLog.list;
						that.loading = false;
					} else {
						var auth_timetimer = setTimeout(() => {
							that.loading = false;
							clearTimeout(auth_timetimer);
						}, 3000);
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			mineMessgae() {
				var that = this;
				that.axios.get('/api/hr/qydwhrxx/getHrInfo', {
					headers: {
						'content-type': 'application/json',
						token: that.token
					}
				}).then(function(response) {
					// console.log('mineMessgae:', response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.qyDwhrxxEntity;
						that.mineMsg = data;
						if (!that.imageUrl) {
							that.userinfoLogo();
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			userinfoLogo() {
				var dwid = this.userInfo.dwid;
				this.axios({
					method: 'post',
					url: '/api/hr/qydwhrxx/getDwFileList',
					params: {
						dwid: dwid
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					console.log(res)
					if (res && res.data && res.data.code == 0) {
						var data = res.data.page;
						var logoArr = [];
						var newLogo = '';
						data.map(item => {
							if (item.wjlx == 20&&item.wjlx) {
								logoArr.push(item)
							}
						})
						if (logoArr.length>0) {
							newLogo = logoArr[logoArr.length-1].wjid;
							this.userinfoImg(newLogo)
						}
						
					}
				});
			},
			userinfoImg(fileId) {
				var dwid = this.userInfo.dwid;
				this.axios({
					method: 'get',
					url: '/api/hr/qydwhrxx/getFile/'+ fileId,
					params: {
						userId: dwid,
						fileType: 20
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					this.$store.commit('updateHREnterLogo', res.data.fileUrl);
				});
			},
			
		},

	};
</script>

<style lang="less" scoped>
	.Hunter_login {
		margin-bottom: 1rem;
		min-height: 30rem;
	}

	.Hunter_login .lo_fl {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		background: #fff;
		padding: 15px;
	}

	.Hunter_login .login_img {
		width: 90px;
		height: 90px;
		border: 1px solid #E2E2E2;
		border-radius: 50%;
		overflow: hidden;
	}

	.login_img img {
		width: 100%;
		height: 100%;
	}

	.lo_data {
		margin: 1rem 0 10px;
		position: relative;
		height: 2.625rem;
	}

	.lo_data /deep/ .el-form-item__label {
		background-color: #e5e5e5;
		padding: 0;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
	}

	.lo_name {
		height: 4rem;
		line-height: 34px;
		margin-left: 1.5rem;
		margin-top: 0.8125rem;
	}

	.el-range-editor.el-input__inner {
		width: auto;
		padding-left: 0.9375rem;
		position: absolute;
		top: 0;
		left: 40px;
	}

	/deep/ .el-date-editor .el-range__icon {
		color: #ff5656;
	}
</style>
