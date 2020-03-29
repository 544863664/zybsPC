<template>
	<div class="Hunter_invite">
		<div class="bodys">
			<div class="bodys-wrap">
				<div class="big">期望邀约企业单位<span class="small">最多添加十家公司</span></div>
				<div class="add" @click="compList">
					<i class="el-icon-plus" style="vertical-align: text-bottom;" />
					操作
				</div>
			</div>
			<div v-if="OfferList.length==0" class="ArrNull">
				<h3>无期望邀约企业单位</h3>
			</div>
			<div class="body_list" v-for="(item, index) in OfferList" :key="index">
				<div class="list_img">
					<img src="../../assets/images/common/enter_logo.jpg" alt="">
				</div>
				<div class="detail">
					<div class="detail-title">{{item.dwmc}} <span style="color: #FF5656;font-size: 14px;">{{item.ifks==1?'即将开始':item.ifks==2?'已开始':item.ifks==3?'已结束':''}}</span> </div>
					<div>您填写的心仪单位，我们全力邀约中，敬请期待入住。</div>
				</div>
				<div class="sild" @click="handleDel(item)">移除</div>
			</div>
			<el-dialog :visible.sync="OfferDialogVisible" width="700px" :lock-scroll="true" :show-close="true"  :modal="false">
				<el-table :data="gridData" border height="400" style="display: none;">
					<el-table-column type="index" fixed align="center" label="序号" width="50"></el-table-column>
					<el-table-column property="cbdw" align="center" label="意向单位名称" width="240"></el-table-column>
					<el-table-column property="" align="center" label="城市" width="100"></el-table-column>
					<el-table-column property="" align="center" label="期望日期" width="180"></el-table-column>
					<el-table-column fixed="right" align="center" label="操作" width="100">
						<template slot-scope="scope">
							<el-button type="text" size="mini" @click="handleClick(scope.row)">新增</el-button>
							<!-- <el-button type="text" size="mini">删除</el-button> -->
						</template>
					</el-table-column>
				</el-table>
				<span slot="title" class="dialog-header">
					<div>添加期望邀约企业单位</div>
					<div style="margin-top: 15px;width: 19.5rem;">
						<el-input placeholder="请输入公司名称" prefix-icon="el-icon-search" v-model.trim="input" @keyup.enter.native="handleClick">
							<el-button slot="append" @click="handleClick">添 加</el-button>
						</el-input>
					</div>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Moment from '../common/moment.js';
	export default {
		name: 'Hunter_invite',
		components: {},
		data() {
			return {
				OfferDialogVisible: false,
				input: "",
				OfferList: [],
				gridData: [],
			};
		},
		created() {
			this.ExpectOfferList();
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
		},
		methods: {
			ExpectOfferList() {
				var that = this;
				that.axios({
					method: 'get',
					url: '/api/qz/qzyxdw/list',
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						var data = response.data.yxdwList;
						var tdate = Moment.moment1();
						that.OfferList = data.map(item =>{
							if (tdate < Moment.moment2(item.hykssj)) {
								item.ifks = 1;
								return item
							} else if ( Moment.moment2(item.hykssj) < tdate && tdate < Moment.moment2(item.hyjssj)) {
								item.ifks = 2;
								return item
							} else if ( Moment.moment2(item.hyjssj) < tdate) {
								item.ifks = 3;
								return item
							}
							return item;
						})
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
			compList() { //公司列表
				var that = this;
				that.OfferDialogVisible = true;
				// that.axios.get("/api/qz/bsrcbmxx/list", {
				// 	headers: {
				// 		"content-type": "application/json",
				// 		'token': that.token
				// 	}
				// }).then(function(response) {
				// 	console.log('yxdwList:', response);
				// 	if (response && response.data && response.data.code == 0) {
				// 		that.OfferDialogVisible = true;
				// 		that.gridData=response.data.hxList;
				// 	}
				// }).catch(function(error) {
				// 	console.log(error);
				// });
			},
			handleDel(row) { //移除
				var that = this;
				this.$confirm('确认移除'+row.dwmc+', 是否继续?', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.axios.get("/api/qz/qzyxdw/delete/" + row.bsid, {
						headers: {
							"content-type": "application/json",
							'token': that.token
						}
					}).then(function(response) {
						// console.log('yxdwList:', response);
						if (response && response.data && response.data.code == 0) {
							that.$message({
								type: 'success',
								message: '移除成功',
								offset: 400
							});
							that.ExpectOfferList();
						} else {
							that.$message({
								message: response.data.msg,
								offset: 400
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
				})
				
			},
			close() {
				var that = this;
				that.input = '';
			},
			handleClick() {
				var that = this;
				var arr = [];
				arr.push(that.input);
				that.axios({
					url: '/api/qz/qzyxdw/save/',
					method: 'post',
					data: arr,
					headers: {
						token: that.token,
					}
				}).then(function(response) {
					// console.log('add:', response);
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '添加成功',
							offset: 400
						});
						that.OfferDialogVisible = false;
						that.ExpectOfferList();
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	};
</script>

<style scoped>
	img {
		width: 100%;
		height: 100%;
	}
	.bodys .ArrNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}
	.bodys-wrap {
		display: flex;
		justify-content: space-between;
	}

	.bodys-wrap .big {
		color: #ff5656;
		font-size: 1.2rem;
		font-weight: 500;
	}
	.bodys-wrap .big .small {
		color: #8e8e8e;
		font-size: 0.8rem;
		margin-left: 0.5rem;
		margin-top: 0.4rem;
	}

	.bodys-wrap .add {
		color: #ff5656;
		font-size: 1rem;
		text-align: center;
		cursor: pointer;
	}

	.body_list {
		display: flex;
		margin-top: 1rem;
		background-color: #FFFFFF;
		padding: 10px;
	}

	.body_list .list_img {
		width: 60px;
		height: 60px;
		border-radius: 0.625rem;
		overflow: hidden;
	}

	.detail {
		margin-left: 0.9375rem;
		line-height: 1.4;
		font-size: 0.875rem;
		width: 53.75rem;
		color: #909399;
	}

	.detail .detail-title {
		font-size: 1rem;
		color: #161616;
		font-weight: bold;
		margin: 0.1875rem 0 0.625rem;
	}

	.detail span {
		padding: 0 0.3125rem;
	}

	.sild {
		color: #ff5656;
		cursor: pointer;
		text-align: center;
		width: 4.0625rem;
		height: 1.5625rem;
		margin-top: 1.25rem;
	}

	.el-button--mini, .el-button--mini.is-round {
		padding: 0;
	}
	.dialog-header /deep/ .el-input__inner {
		border: 1px solid #DCDFE6;
		width: 100%;
		padding-left: 30px;
	}
	/deep/ .el-dialog__body {
		padding-top: 0.625rem;
	}

	
</style>
