<template>
	<!-- 谁看了我 -->
	<div class="who">
		<div class="resume">
			<div class="rli">
				<p class="rli_name r1 el-icon-pie-chart">简历被查看</p>
				<p class="rli_num">{{whoshowme.jlckcs}}次</p>
			</div>
			<div class="rli">
				<p class="rli_name r2">简历被收藏</p>
				<p class="rli_num">{{whoshowme.jlsccs}}次</p>
			</div>
			<div class="rli">
				<p class="rli_name r3">简历被下载</p>
				<p class="rli_num">{{whoshowme.jlxzcs}}次</p>
			</div>
		</div>
		<div class="list">
			<ul>
				<li v-if="collectionSxhlist.length==0" class="arrNull">
					<h3>无数据</h3>
				</li>
				<li v-for="(item, index) in collectionSxhlist" :key="index">
					<div class="list_user">
						<img src="../../assets/images/common/users.png" class="user_u_icon">
						<span class="list_u_name">王登旺｜人力资源经理</span>
						<span class="list_u_day">3天前查看</span>
						<span class="list_u_count">共查看3次</span>
						<el-button type="danger" class="btn">立即沟通</el-button>
					</div>
					<div class="list_resume">
						<div class="list_r_left">
							<p class="title">
								高级大数据教师
								<span>8-10K</span>
							</p>
							<p>西安｜1-3年｜本科</p>
						</div>
						<div class="coll-right">
							<div class="right-title">
								<!-- <h4>{{item.dwmc}}</h4>
								<p>{{findDmMap['m_dwxzdm'][item.dwxz]}}｜{{findDmMap['m_dwgmdm'][item.dwgm]}}</p> -->
								<h4>稻壳网</h4>
								<p>互联网｜国企</p>
							</div>
							<div class="right-logo">
								<img src="../../assets/images/common/enter.png" alt="">
							</div>
						</div>
					</div>
				</li>
			</ul>
			<el-pagination
				v-if="collectionSxhlist.length>0"
				@current-change="handleCurrentChange"
				:page-size="pageSize" 
				:current-page="currentPage"
				layout="prev, pager, next" 
				:total="totalCount">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapState } from 'vuex';
	import moment from 'moment';
	export default {
		components: {},
		data() {
			return {
				pageSize: 10,
				currentPage: 1,
				totalCount: 0,
				whoshowme: {},
				collectionSxhlist: [],
				personnellist: [],
			};
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
			})
		},
		methods: {
			handleCurrentChange(currentPage) {
				console.log(currentPage)
			},
			getWhoshowme() {
				var that = this;
				that.axios({
					method: 'get',
					url: '/api/qz/qzgrjbxx/statistics',
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('getWhoshowme:', response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data;
						that.whoshowme = data;
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
			getSxhList() {
				var that = this;
				that.axios({
					method: 'get',
					url: '/api/qz/qyhxrxx/listSxh/'+ that.currentPage +'/'+that.pageSize,
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.totalCount = response.data.page.total;
						var data = response.data.page.gwtdlist;
						that.collectionSxhlist = data;
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
			getpersonnellist() {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qyckjljl/hrDetail',
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						var data = response.data.page.list;
						that.personnellist = data;
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
			this.getWhoshowme();
			this.getSxhList();
			var thisTime = moment();
			var dd = '2020-03-01';
			var daytime = thisTime.diff(moment(dd), 'days');
			var monthtime = thisTime.diff(moment(dd), 'month');
			var yeartime = thisTime.diff(moment(dd), 'year');
			var ddd_ = '';
			if (0 < daytime && daytime < 30) ddd_ = daytime+'天前';
			if (30 < daytime && 0 < monthtime && monthtime < 12) ddd_ = monthtime+'月前';
			if (12 < monthtime && 0 < yeartime) ddd_ = yeartime+'年前';
			ddd_+'';
			
		},
	}
</script>
<style scoped>
	.resume {
		background: #fff;
		padding: 15px;
		text-align: center;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: distribute;
		justify-content: space-around;
		font-size: 14px;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.resume .rli {
		cursor: pointer;
	}

	.rli_name {
		padding-left: 30px;
		display: inline-block;
		line-height: 30px;
	}

	.rli_name.r1 {
		padding-left: 0;
	}

	.rli_name.r2 {
		background: url("../../assets/images/common/Icon--chat.png") no-repeat 0 center;
	}

	.rli_name.r3 {
		background: url("../../assets/images/common/Icon-upload.png") no-repeat 0 center;
	}

	.rli_num {
		color: #FC615E;
	}
	.list .arrNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}
	.list li {
		margin-top: 20px;
		padding: 10px 21px 15px 20px;
		background: #fff;
		overflow: auto;
	}

	.list_user {
		position: relative;
	}

	.user_u_icon {
		height: 36px;
		width: 36px;
		background: #D8D8D8;
		border: 1px solid #979797;
		border-radius: 50%;
		float: left;
		margin-right: 10px;
	}

	.list_u_name {
		color: #303133;
		line-height: 43px;
	}

	.list_u_day {
		font-size: 12px;
		color: #909399;
		margin: 0 17px 0 15px;
	}

	.list_u_count {
		font-size: 12px;
		color: #909399;
	}

	.list_user .btn {
		float: right;
		margin-top: 0.375rem;
	}

	.list_resume {
		clear: both;
		margin-top: 10px;
		padding-left: 50px;
		font-size: 14px;
		color: #909399;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}

	.list_resume .list_r_left {
		padding-top: 10px;
		float: left;
	}

	.list_resume .coll-right {
		display: flex;
	}

	.list_resume .right-logo {
		width: 4.375rem;
		height: 4.375rem;
	}

	.list_resume .right-title {
		text-align: right;
		margin-right: 0.625rem;
	}

	.list_resume .right-title h4 {
		margin: 0.625rem 0;
		color: #606266;
	}

	.list_resume .title {
		color: #303133;
		padding-bottom: 8px;
	}

	.list_resume .title span {
		color: #FC5E5B;
		padding-left: 15px;
	}

	.el-icon-pie-chart:before {
		content: "\e767";
		font-size: 20px;
		padding-right: 10px;
		vertical-align: middle;
		color: #909399;
	}
</style>
