<template>
	<div class="Hunter_resume">
		<div class="body-wrap">
			<div class="title">个人信息</div>
			<div class="userwrap">
				<div class="user_img">
					<img v-if="mineMsg.xbm=='xb_001'" :src="imageUrl||xb_001" class="user_img" />
					<img v-if="mineMsg.xbm=='xb_002'" :src="imageUrl||xb_002" class="user_img" />
				</div>
				<div class="user_name">
					<div class="wrap-name-text">当前登录账号：{{mineMsg.sj}}</div>			
					<div class="wrap-name-text">
						<span>每天提供三次免费刷新</span>
						<!-- <span>中研币30个</span> -->
					</div>
				</div>
				<div class="refreshBtn">
					<el-button type="danger" @click="refreshDaily">刷新简历</el-button>
					<!-- <div class="refresh">剩余免费次数<span style="color: #FF5656;">3</span>次</div> -->
				</div>
			</div>
		</div>
		<div class="body-wrap">
			<div class="title titlebolser">职位刷新</div>
			<div class="PosRefresh">
				<div class="PosRefresh_box">
					<div class="box_title">1.选择刷新方式</div>
					<div class="box_box">
						<div class="box_box_1 box_box__1" @click="refreshDaily">
							<div class="box_box_1_left"><i class="el-icon-refresh-right"></i></div>
							<div class="box_box_1_right">
								<div class="right-top" style="line-height: 2.875rem;">手动刷新</div>
							</div>
							<!-- <div class="success"><i class="el-icon-check"></i></div> -->
						</div>
						<el-tooltip class="item" effect="dark" content="敬请期待..." placement="right">
							<div class="box_box_1 box_box__1">
								<div class="box_box_1_left"><i class="el-icon-refresh-right"></i></div>
								<div class="box_box_1_right">
									<div class="right-top">自定义刷新</div>
									<div class="right-down">针对选定时间段提升排名</div>
								</div>
								<div class="success"><i class="el-icon-check"></i></div>
							</div>
						</el-tooltip>
					</div>
				</div>
				<div class="PosRefresh_box">
					<div class="box_title">2.选择刷新时间</div>
					<div class="box_box">
						<div class="box_box_1" style="line-height: 3.125rem;" @click="refreshDaily">立即刷新</div>
						<el-tooltip class="item" effect="dark" content="敬请期待..." placement="right">
							<div class="box_box_2" style="line-height: 3.125rem;" @click="PosRefreshDialogVisible=true">
								自定义时间
								<div class="success"><i class="el-icon-check"></i></div>
							</div>
						</el-tooltip>
						
					</div>
				</div>
				<div class="PosRefresh_box">
					<div class="box_title">3.刷新次数</div>
					<div class="box_box">
						<div class="box_box_1" style="line-height: 3.125rem;">
							刷新次数
							<!-- <div class="success"><i class="el-icon-check"></i></div> -->
						</div>
						<div class="box_box_2 box_box__2">共计：每日3次免费刷新次数</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="PosRefreshDialogVisible" width="700px" :lock-scroll="true" :show-close="true" :modal="false">
			<el-form  label-width="80px">
				<el-form-item  label="刷新日期">
					<el-date-picker v-model="value1" type="datetimerange" align="right" unlink-panels range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="chanes"></el-date-picker>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Moment from '../common/moment.js';
	import xb_001 from '../../assets/images/common/mine.png'
	import xb_002 from '../../assets/images/common/nv.png'
	export default {
		name: 'Hunter_resume',
		components: {},
		data() {
			return {
				xb_001: xb_001,
				xb_002: xb_002,
				mineMsg: {},
				PosRefreshDialogVisible: false,
				value1: [],
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
		computed: {
			...mapGetters({
				'token': 'getToken',
				imageUrl: 'getJobseekersimg',
			})
		},
		methods: {
			chanes() {
				var value = this.value1;
				value[0] = Moment.formatDate2(value[0]);
				value[1] = Moment.formatDate2(value[1]);
				console.log(value);
			},
			mineMessgae() {
				var that = this;
				that.axios.get('/api/qz/qzgrjbxx/info', {
					headers: {
						'content-type': 'application/json',
						token: that.token
					}
				}).then(function(response) {
					// console.log('mineMessgae:', response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.qzGrjbxx;
						that.mineMsg = data;
						if (data.txid) {
							that.userinfoImg(data.txid)
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			userinfoImg(fileId) {
				this.axios({
					method: 'get',
					url: '/api/qz/qzFile/getFile/'+ fileId,
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					this.$store.commit('updateJobseekersimg', res.data.fileUrl);
				});
			},
			refreshDaily() {
				var that = this;
				that.axios.get("/api/qz/qzgrjbxx/refreshDaily", {
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('refreshDaily:', response);
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '刷新成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
		},
		created() {
			this.mineMessgae();
		},
	};
</script>

<style scoped>
	.Hunter_resume {
	}
	img {
		width: 100%;
		height: 100%;
	}
	.Hunter_resume .body-wrap {
		width: auto!important;
		background-color: #FFFFFF;
		margin-bottom: 1.5rem;
		padding: 1.25rem;
	}
	.body-wrap .title {
		font-size: 1rem;
		font-weight: 600;
	}
	.titlebolser {
		border-bottom: 0.125rem solid #FF5656;
	}
	.body-wrap .userwrap {
		display: flex;
		margin-top: 1rem;
		position: relative;
	}
	.userwrap .user_img {
		width: 5.75rem;
		height: 5.75rem;
		margin-right: 20px;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #979797;
	}
	.userwrap .user_name {
		line-height: 2;
		padding-top: 1.0625rem;
	}
	.userwrap .wrap-name-text {
		font-size: 1rem;
		color: #303133;
	}
	.userwrap .wrap-name-text span {
		color: #626262;
		font-size: 0.9375rem;
		margin-right: 1.25rem;
	}
	.userwrap .refreshBtn {
		position: absolute;
		right: 1.25rem;
		top: 1.25rem;
		text-align: center;
	}
	.refreshBtn .refresh {
		color: #909393;
		font-size: 0.875rem;
		margin-top: 0.125rem;
	}
	.PosRefresh .PosRefresh_box {
		margin: 0.625rem 0;
	}
	.PosRefresh_box .box_title {
		color: #303133;
		font-size: 0.9375rem;
		padding-bottom: 0.625rem;
	}
	.PosRefresh_box .box_box {
		display: flex;
	}
	.box_box .box_box_1, .box_box .box_box_2 {
		width: 11.875rem;
		height: 3.125rem;
		border: 1px solid #FF5656;
		margin-right: 1.5625rem;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.box_box .success {
		color: #FFFFFF;
		background-color: #FF5656;
		width: 3.125rem;
		height: 1.5625rem;
		text-align: center;
		line-height: 1.25rem;
		position: absolute;
		right: -1.0625rem;
		bottom: -0.4375rem;
		-webkit-transform: rotate(-40deg);
		transform: rotate(-40deg);
	}
	.box_box .success i {
		-webkit-transform: rotate(40deg);
		transform: rotate(40deg);
	}
	.box_box .box_box__1 {
		width: 17.5rem;
		height: 5rem;
		display: flex;
		text-align: left;
	}
	.box_box__1 .box_box_1_left {
		width: 5rem;
		line-height: 5rem;
		font-size: 2.8125rem;
		color: #FF5656;
		text-align: center;
	}
	.box_box__1 .box_box_1_right {
		margin: 17px 0;
	}
	.box_box_1_right .right-top {
		color: #303133;
		font-size: 1rem;
	}
	.box_box_1_right .right-down {
		color: #909399;
		font-size: 0.875rem;
	}
	
	.box_box .box_box__2 {
		background-color: #F7F7F7;
		border: none;
		font-size: 0.875rem;
		line-height: 3.125rem;
	}
	
	
	/deep/ .el-date-editor--datetimerange.el-input__inner {
		width: 400px;
		border: 1px solid #DCDFE6;
		padding: 0 15px;
	}
</style>
