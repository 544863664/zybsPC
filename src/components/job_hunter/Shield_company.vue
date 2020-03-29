<template>
	<!--屏蔽企业  -->
	<div class="Shield_company">
		<div class="bodys">
			<div class="body-wraps">
				<div class="big">屏蔽企业单位<span class="small">最多屏蔽十家公司</span></div>
				<div class="add" @click="venueDialogVisible=true">
					<i class="el-icon-plus" style="vertical-align: text-bottom;" />
					添加屏蔽企业
				</div>
			</div>
			<div v-if="tableList.length==0" class="ArrNull">
				<h3>无屏蔽企业单位</h3>
			</div>
			<div class="body_list" v-for="(item, index) in tableList" :key="index">
				<div class="list_img">
					<img :src="company.info[item.dwid]||enterlogo" alt="" />
				</div>
				<div class="detail">
					<div class="detail-title">{{item.dwmc}}</div>
					<div>
						<!-- 城市 -->
						<span>城市</span>｜
						<!-- 公司行业 -->
						<span>公司行业</span>
					</div>
					<!-- 公司性质 -->
					<div>公司性质</div>
				</div>
				<div class="sild" @click="del(item)">取消屏蔽</div>
			</div>
		</div>
		<div class="block">
			<!-- <el-pagination 
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next"
				:total="tableList.length" 
				v-if="tableList.length==0 ? false:true"
			></el-pagination> -->
		</div>
		<el-dialog :modal="false" :visible.sync="venueDialogVisible" width="700px" :lock-scroll="true" :show-close="true"  @close="close">
			<div class="dialog__body-wrap">
				<div>
					<div style="margin-top: 15px;width: 19.5rem;">
						<el-input placeholder="请输入公司名称" prefix-icon="el-icon-search" v-model.trim="input" @keyup.enter.native="search">
							<el-button slot="append" @click="search">搜索</el-button>
						</el-input>
					</div>
					<div class="ssfs" v-if="company_List.length==0">
						<div class="ssfs-title">可通过以下方式搜索公司</div>
						<div class="ssfs-small-title">1.公司全称</div>
						<!-- <div class="ssfs-small-title">2.公司简称</div>
						<div class="ssfs-small-title">3.企业邮箱</div> -->
					</div>
					<div v-if="company_List.length>0" style="margin-top: 0.625rem;" class="ssfs-small-title">与 "{{input}}" 相关的公司，共{{company_List.length}}个</div>
					<div class="table" v-if="company_List.length>0">
						<el-table :data="company_List" style="width: 100%" border @selection-change="handleSelectionChange">
							<!-- <el-table-column type="selection" width="45" align="center"></el-table-column> -->
							<el-table-column label="公司名称">
								<template slot-scope="scope">
									<p>{{ scope.row.dwmc }}</p>
								</template>
							</el-table-column>
							<el-table-column label="城市">
								<template slot-scope="scope">
									<p>{{ scope.row.jc }}</p>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button type="text" size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- <el-button style="margin-top: 10px;">批量操作</el-button> -->
					</div>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>添加屏蔽企公司</div>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import enterLogo from '../../assets/images/common/enterDetail.png'
	export default {
		name: "Shield_company",
		components: {

		},
		data() {
			return {
				enterlogo: enterLogo,
				input: '',
				venueDialogVisible: false,
				total: 0,
				pageSize: 10,
				currentPage: 1,
				tableList: [],
				company_List: [],
				gsid: '',
				company:{
					// 单位id列表
					dwids:[],
					info:{}
				},
			}
		},
		created() {
			var that = this;
			that.getshildsList();
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
		},
		methods: {
			getshildsList() { //列表
				var that = this;
				that.axios.get("/api/qz/qzpbdw/list", {
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('getshildsList:',response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.pbdwList;
						data.map(item => {
							if (item.dwid) {
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						that.tableList = data;
						if (that.company.dwids.length) that.getDwLogos();
					}
				}).catch(function(error) {
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
			search() {
				var that = this;
				that.axios.get("/api/hr/bskhgl/findDwListByName", {
					params: {
						dwmc: that.input
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('search:',response);
					if (response && response.data && response.data.code == 0) {
						that.company_List = response.data.list;
						if (response.data.list == "") {
							that.$message.error({
								message: '该公司不存在',
								offset: 400
							});
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			handleAdd(index, row) {
				var that = this;
				that.gsid = row.dwid;
				that.axios.get("/api/qz/qzpbdw/save/" + that.gsid, {
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('handleAdd:',response);
					if (response && response.data && response.data.code == 0) {
						that.$message.success({
							message: "屏蔽成功",
							offset: 400
						});
						that.venueDialogVisible = false;
						that.getshildsList();
					} else {
						that.$message.error({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			close() {
				var that = this;
				that.input = '';
				that.company_List = [];
			},
			del(item) {
				var that = this;
				that.dwid = item.dwid;
				that.axios.get("/api/qz/qzpbdw/delete/" + that.dwid, {
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('del:',response);
					if (response && response.data && response.data.code == 0) {
						that.getshildsList();
						that.$message.success({
							message: "取消屏蔽成功",
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			handleSizeChange(size) {
				this.pagesize = size;
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
			},
			handleSelectionChange(val) {
				console.log(val);
			},
		}
	}
</script>

<style scoped>
	.Shield_company {}

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
	.body-wraps {
		display: flex;
		justify-content: space-between;
	}

	.body-wraps .big {
		color: #ff5656;
		font-size: 1.2rem;
		font-weight: 500;
	}

	.body-wraps .big .small {
		color: #8e8e8e;
		font-size: 0.8rem;
		margin-left: 0.5rem;
		margin-top: 0.4rem;
	}

	.body-wraps .add {
		color: #ff5656;
		font-size: 1rem;
		margin-top: 0.5rem;
		cursor: pointer;
	}

	.body_list {
		display: flex;
		margin-top: 1rem;
		background-color: #FFFFFF;
		padding: 10px;
	}

	.body_list .list_img {
		width: 4.375rem;
		height: 4.375rem;
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

	.table,
	.ssfs {
		min-height: 350px;
	}

	.ssfs .ssfs-title {
		font-size: 0.9375rem;
		color: #434343;
		font-weight: bold;
		margin-bottom: 0.625rem;
		margin-top: 1.25rem;
	}

	.ssfs-small-title {
		font-size: 0.875rem;
		color: #a2a2a2;
		margin-bottom: 0.3125rem;
	}

	/deep/.el-input__inner {
		border: 1px solid #DCDFE6;
		padding: 0 25px;
		width: 16rem;
	}

	/deep/el-dialog {
		margin-top: 25vh;
	}

	/deep/.el-dialog__body {
		padding: 5px 20px 30px;
	}

	/deep/.el-button--mini,
	.el-button--mini.is-round {
		padding: 3px 2px;
	}

	.el-pagination {
		width: 80%;
	}
</style>
