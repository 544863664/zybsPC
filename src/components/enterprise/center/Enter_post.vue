<!-- 职位管理 -->
<template>
	<div class="post">
		<div class="p_search">
			<div class="p_title">
				职位管理
				<p class="p_right">
					<span class="s1">一键刷新</span>
					<span class="s2">推荐</span>
					<span class="s3" @click="addPost">新增职位</span>
				</p>
			</div>
			<div class="formWrap">
				<el-form ref="form" :model="form" label-width="90px">
					<el-form-item class="select" label="职位搜索:" prop="job">
						<el-input class="job" v-model="form.job" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="getDataList"></el-input>
					</el-form-item>
					<el-form-item class="data" label="发布时间:" prop="startTime">
						<el-date-picker v-model="value1" type="datetimerange" align="left" unlink-panels range-separator="至" format="yyyy-MM-dd"
						value-format="yyyy-MM-dd" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions" @change="chanes" style="width: auto;border: 1px solid #DCDFE6;vertical-align: bottom;padding-left: 10px!important;">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="state" label="审核状态:" prop="radio">
						<el-radio-group v-model="form.radio" @change="getDataList">
							<el-radio label="">全部</el-radio>
							<el-radio :label="0">未提交</el-radio>
							<el-radio :label="1">已提交待审核</el-radio>
							<el-radio :label="2">审核通过</el-radio>
							<el-radio :label="3">审核拒绝</el-radio>
						</el-radio-group>
						
						<el-button type="text" icon="el-icon-refresh" style="margin-left: 30px;" @click="resetList">重置</el-button>
						<!-- <el-button type="danger" @click="getData()">查询</el-button> -->
					</el-form-item>
					<el-row class="query">
					</el-row>
				</el-form>
			</div>
		</div>
		<!-- 列表 -->
		<div class="list">
			<ul>
				<li v-if="totalCount==0" class="arrNull">
					<h3 v-if="form.radio==''">无发布岗位数据</h3>
					<h3 v-if="form.radio=='0'">无未提交岗位数据</h3>
					<h3 v-if="form.radio=='1'">无待审核岗位数据</h3>
					<h3 v-if="form.radio=='2'">无审核通过岗位数据</h3>
					<h3 v-if="form.radio=='3'">无审核拒绝岗位数据</h3>
				</li>
				<li v-for="(item,i) in dataList" :key="i">
					<div class="l_left">
						<!-- townObj[item.sbsf][item.sbcs] -->
						<p class="l_left_1">
							<span @click="gettogwDetail(item)" class="limitWidth" :title="item.gwmc">{{item.gwmc}}</span>
							({{item.gwzt === '0' ? '未提交' : (item.gwzt === '1'?'已提交待审核':(item.gwzt === '2'?'已通过':(item.gwzt === '3'?'已拒绝':'已关闭')))}})
							<el-button type="text" icon="el-icon-s-check" style="margin-left: 10px;" @click="getCopyJob(item)">复制岗位</el-button>
							<el-button type="text" icon="" style="margin-left: 10px;" @click="chooseRelated(item)">选择关联会议</el-button>
						</p>
						<p class="l_left_2">
							<span v-if="item.gwyx">{{findDmMap['m_xzdydm'][item.gwyx]}}｜</span>
							<span v-if="item.sbcs">{{CityMap[item.sbsf][item.sbcs]}}｜</span>
							<span v-if="item.gwlb_">{{item.gwlb_}}｜</span>
							<span v-if="item.xlyq">{{findDmMap['m_xldm'][item.xlyq]}}</span>
						</p>
						<p class="l_left_3">发布时间：{{item.gwfbDate}}</p>
					</div>
					<div class="l_right">
						<div class="l_right_1" @click="getCurrentresume">
							<p class="p1">{{item.sdjlcount}}</p>
							<p class="p2">收到简历</p>
						</div>
						<div class="l_right_1 none">
							<p class="p1">{{item.chcscount}}</p>
							<p class="p2">参会次数</p>
						</div>
					</div>
					<div class="btn">
						<span v-if="item.gwzt === '0' || item.gwzt === '3' &&  item.gwzt !== '1'" @click="editData(item.gwid)">编辑</span>
						<span v-if="item.gwzt === '2'" @click="refresh(item.gwid)">刷新</span>
						<span v-if="item.gwzt === '0' || item.gwzt === '3'" @click="publishItem(item.gwid)">发布</span>
						<span v-if="item.gwzt === '4'" @click="openItem(item.gwid,2)">打开</span>
						<span v-if="item.gwzt === '2'" @click="openItem(item.gwid,4)">下线</span>
						<span v-if="item.gwzt !== '1'" class="del" @click="deleteItem(item)">删除</span>
					</div>
				</li>
			</ul>
			<el-pagination v-if="totalCount>0" :page-size="pageSize" :current-page="currentPage" :total="totalCount" layout="prev, pager, next,total"
				@current-change="handleCurrentChange">
			</el-pagination>
		</div>

		<el-dialog
		title="您已关联的会议名称"
		class="gldia"
		:visible.sync="gldia"
		width="60%">
		<div v-for="(item, index) in allGlList" :key="index" style="padding-left:5%;">
			<span>{{index + 1}}</span>
			<el-checkbox v-model="item.checked" @change="handleSelect()">{{item.hymc}}</el-checkbox>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="gldia = false">取 消</el-button>
			<el-button type="primary" @click="sendRelate()">提交</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex';
	import Moment from '../../common/moment.js'

	export default {
		name: 'Enter_post',
		components: {},
		data() {
			return {
				checked:false,
				gldia:false,
				relatedList:[],	// 关联会议列表
				userInfo: {},
				form: {
					job: '',
					startTime: '',
					endTime: '',
					radio: ''
				},
				value1: '',
				dataList: [],
				pageIndex: 1,
				pageSize: 10, // 每页显示个数
				totalPage: 0, // 总页数
				totalCount: 0, // 总条目数
				currentPage: 1, // 当前页
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
				glList:[],
				allGlList:[],
				sendGwid:''
			};
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				findDmList: state => state.findDmList,
				ProvinceMap: state => state.ProvinceMap,
				CityMap: state => state.CityMap,
				JobCategoryThirdMap: state => state.JobCategoryThirdMap,
			})
		},
		created() {
			this.mineMessgae();
			this.getDataList();
		},
		methods: {
			// 提交关联会议
			sendRelate() {
				
				let arr = []
				let that = this
				for(let i = 0; i < this.allGlList.length; i++ ) {
					if(this.allGlList[i].checked == true) {
						arr.push(this.allGlList[i].hxid)
					}
				}
				// console.log(arr)

				let data = {
					gwid:this.sendGwid,
					hxids:arr
				}
				that.axios('/api/hr/qydwgwfbxx/updateHxsByGwid', {
					method: "post",
					headers: {
						'content-type': 'application/json',
						token: that.token
					},
					data: data,
				}).then(function(response) {
					// console.log(response)
					if (response && response.data && response.data.code == 0) {
						that.gldia = false
						that.$message({
							type: 'success',
							message: "提交成功",
							offset: 300
						});
					}
				}).catch(function(error) {
					console.log(error);
				});

			},
			handleSelect() {
				this.$forceUpdate()
			},
			// 点击选择关联会议
			chooseRelated(item) {
				// console.log(item)
				this.allGlList = []
				this.sendGwid = item.gwid
				let that = this;
				let params = {
					gwid: item.gwid
				}
				this.gldia = true
				that.axios('/api/hr/qydwgwfbxx/getHxsByGwid', {
					headers: {
						'content-type': 'application/json',
						token: that.token
					},
					params: params,
					method: "get",
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.glList = response.data.hxlist
						that.meetingList()
					}
					// console.log(that.glList)
				}).catch(function(error) {
					console.log(error);
				});

				
			},
			/* 获取双选会列表 */
			meetingList() {
				this.axios({
					method: "post",
					url: `/api/hr/bshxxx/findYdHxPageAllListByDw`,
					headers: {
						token: this.token
					},
					params: {
						type: 1,
						limit:20
					}
				}).then(res => {
					if (res.data && res.data.code === 0) {
						this.allGlList = res.data.page.list
						for(let i = 0; i < this.allGlList.length; i ++) {
							this.allGlList[i].checked = false
							
						}

						this.getArrEqual(this.glList, this.allGlList)
						
						// console.log(this.allGlList)
						// console.log(this.glList)
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg,
							offset: 300
						});
					}
				}).catch(error => {
					this.$message({
						type: 'error',
						message: error.data.msg,
						offset: 300
					});
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
					if (response && response.data && response.data.code == 0) {
						var data = response.data.qyDwhrxxEntity;
						that.userInfo = data;
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 当前页
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.getDataList();
			},
			chanes() {
				var value = this.value1;
				this.form.startTime = Moment.formatDate2(value[0]);
				this.form.endTime = Moment.formatDate2(value[1]);
				this.pageIndex = 1;
				this.getDataList();
			},
			// 新增岗位
			addPost() {
				this.$router.push('/private/Enter_postcreate')
			},
			/* 表单重置 */
			resetList() {
				this.form.job = '';
				this.form.radio = '';
				this.form.startTime = '';
				this.form.endTime = '';
				this.pageIndex = 1;
				this.pageSiz = 10;
				this.value1 = '';
				this.getDataList();
			},
			/* 查询 */
			getData() {
				this.getDataList();
			},
			getDataList() {
				let params = {
					gwmc: this.form.job,
					gwzt: this.form.radio,
					startTime: this.form.startTime,
					endTime: this.form.endTime,
					page: this.pageIndex,
					limit: this.pageSize
				};
				this.axios({
					url: "/api/hr/qydwgwfbxx/findGwListHr",
					method: "post",
					headers: {
						token: this.token
					},
					params: params
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						this.totalCount = res.data.page.totalCount;
						var data = res.data.page.list;
						data.map(item => {
							if (item.gwlb) {
								// var towObjdm = item.gwlb.slice(0, -2);
								// item.gwlb_ = this.JobCategoryThirdMap[towObjdm][item.gwlb];
								item.gwlb_ = this.JobCategoryThirdMap[item.gwlbt][item.gwlb];
								item.gwfbDate = Moment.formatDate1(item.gwfbsj)
								return item;
							}
							item.gwfbDate = Moment.formatDate1(item.gwfbsj)
							return item;
						})
						this.dataList = data;
					} else {
						this.dataList = [];
						this.totalPage = 0;
						// this.$message.error(res.data.msg);
					}
				}).catch(error => {
					console.log(error)
					// this.$message({
					// 	type: 'error',
					// 	message: error.data.msg,
					// 	offset: 300
					// });
				});
			},
			/* 编辑 */
			editData(gwid) {
				this.$router.push({
					path: '/Enter_updatePost',
					query: {
						gwid: gwid
					}
				});
			},
			getCopyJob(item) {
				this.$router.push({
					path: '/private/Enter_postcreate',
					query: {
						gwid: item.gwid
					}
				});
			},
			publishItem(gwid) {
				this.axios({
					url: `/api/hr/qydwgwfbxx/gwcgfb/${gwid}`,
					method: "post",
					headers: {
						token: this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						this.$message({
							type: 'success',
							message: '已发布',
							offset: 300
						});
						this.getDataList();
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg,
							offset: 300
						});
					}
				}).catch(error => {
					console.log(error)
				});
			},
			/* 刷新 */
			refresh(gwid) {
				this.axios({
					url: `/api/hr/qydwgwfbxx/refreshGW/${gwid}`,
					method: "post",
					headers: {
						token: this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						this.$message({
							type: 'success',
							message: '操作成功',
							offset: 300
						});
						this.getDataList();
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg,
							offset: 300
						});
					}
				}).catch(error => {
					this.$message({
						type: 'error',
						message: error.data.msg,
						offset: 300
					});
				});
			},
			/* 打开/关闭(下线) */
			openItem(gwid, type) {
				this.axios({
					url: `/api/hr/qydwgwfbxx/auditGW`,
					method: "post",
					headers: {
						token: this.token
					},
					params: {
						gwid: gwid,
						type: type
					}
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						this.$message({
							type: 'success',
							message: '操作成功',
							offset: 300
						});
						this.getDataList();
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg,
							offset: 300
						});
					}
				}).catch(error => {
					console.log(error)
				});
			},
			/* 删除 */
			deleteItem(item) {
				var that = this;
				var gwid = item.gwid;
				that.$confirm('确认移除'+item.gwmc+', 是否继续?', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.axios({
						url: `/api/hr/qydwgwfbxx/deleteGW/${gwid}`,
						method: "post",
						headers: {
							token: that.token
						}
					}).then(res => {
						if (res && res.data && res.data.code === 0) {
							that.$message({
								type: 'success',
								message: '已删除',
								offset: 300
							});
							that.getDataList();
						} else {
							that.$message({
								type: 'error',
								message: res.data.msg,
								offset: 300
							});
						}
					}).catch(error => {
						console.log(error)
					});
				})
				
			},
			getCurrentresume() {
				this.$router.push({
					path: '/Enter_home/Enter_resume',
					query: {}
				});
			},
			gettogwDetail(item) {
				this.$router.push({
					path: '/public/postDetail',
					query: {
						postId: item.gwid,
						companyId: this.userInfo.dwid
					}
				});
			},

			getArrEqual (arr1, arr2) {
				for (let i = 0; i < arr2.length; i++) {
					for (let j = 0; j < arr1.length; j++) {
						if(arr1[j].hxid == arr2[i].hxid){
							arr2[i].checked = true
						}
					}
				}
			}
		}
	};
</script>

<style lang='less' scoped>
	.el-checkbox{
		padding-left: 10px;
		margin: 5px 0;
	}
	/deep/ .el-dialog__footer{
		text-align: center;
	}
	/deep/ .el-dialog__header{
		display: flex;
		span{
			display: block;
			text-align: center;
			width: 100%;
		}
	}
	.p_title {
		line-height: 30px;
	}

	.tab {
		/deep/ .el-tabs__item {
			padding-right: 40px !important;
		}
	}

	.formWrap {
		background: #f7f7f7;
		padding: 24px 10px 10px;
		margin-top: 10px;

		/deep/.el-input__inner {
			height: 34px;
			line-height: 34px;
			padding-left: 10px;
			border: 1px solid #e6e6e6 !important;
		}

		.el-form-item {
			margin-bottom: 12px;
		}

		/deep/.el-form-item__label {
			font-size: 16px;
			line-height: 34px;
		}

		/deep/.el-form-item,
		/deep/.el-form-item__content,
		/deep/.el-select,
		/deep/.el-date-editor .el-range__icon,
		/deep/.el-date-editor .el-range-separator,
		/deep/.el-select__caret.el-input__icon.el-icon-arrow-up {
			height: 34px;
			line-height: 34px;
		}

		/deep/.el-input__inner {
			padding-left: 30px;
		}

		/deep/.el-input__icon {
			line-height: 34px;
		}

		.select {
			/deep/.el-input__inner {
				width: 431px;
			}
		}

		.data {
			display: inline-block;

			/deep/.el-input__inner {
				width: 100%;
			}
		}

		#data {
			/deep/.el-form-item__content {
				margin-left: 0 !important;
			}
		}

		.to {
			display: inline-block;
			padding: 0 10px;
		}

		.state {
			/deep/.el-input__inner {
				width: 200px;
			}
		}

		.query {
			margin-left: 90px;
		}
	}

	.del {
		color: #f56c6c;
	}

	.p_search {
		background: #fff;
		padding: 20px;
		position: relative;
	}

	.p_search .p_title {
		font-size: 16px;
		color: #303133;
	}

	.p_search .p_title .p_right {
		position: absolute;
		top: 20px;
		right: 20px;
		font-size: 12px;
		color: #606266;
	}

	.p_search .p_title .p_right span {
		padding-left: 15px;
		cursor: default;
		margin-left: 20px;
	}

	.p_search .p_title .p_right .s1 {
		background: url("../../../assets/images/enter/Icon-refresh.png") 0 center no-repeat;
	}

	.p_search .p_title .p_right .s2 {
		background: url("../../../assets/images/enter/Icon-exit.png") 0 center no-repeat;
	}

	.p_search .p_title .p_right .s3 {
		color: #fc5e5b;
		background: url("../../../assets/images/enter/Icon-add.png") 0 center no-repeat;
	}

	.p_search .p_tab {
		border-bottom: 1px solid #e6e6e6;
		font-size: 14px;
		color: #303133;
		padding-top: 20px;
	}

	.p_search .p_tab span {
		margin-right: 30px;
		line-height: 30px;
		position: relative;
		cursor: default;
	}

	.p_search .p_tab span.active {
		color: #fc5e5b;
	}

	.p_search .p_tab span.active::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -8px;
		width: 100%;
		border-bottom: 2px solid #fc5e5b;
	}

	.p_search .p_con {
		background: #f7f7f7;
		background-color: #f7f7f7;
		padding: 10px;
		margin-top: 10px;
	}

	.p_search .p_con /deep/.el-input {
		height: 28px;
		width: 227px;
		background: #ffffff;
		border: 1px solid #e6e6e6;
	}

	.p_search .p_con /deep/.el-input__inner {
		border: 0;
		width: 100%;
		height: 28px;
		line-height: 28px;
		background: none;
		padding-left: 10px;
	}

	.p_search .p_con /deep/.el-input__prefix {
		left: 200px;
		top: 0;
	}

	.p_search .p_con .name {
		margin-right: 10px;
	}

	.p_search .p_con .col {
		padding-bottom: 10px;
	}

	.p_search .p_con .col1 /deep/.el-input {
		width: 400px;
	}

	.p_search .p_con .col1 /deep/.el-input__prefix {
		left: 370px;
	}

	.p_search .p_con .line {
		padding: 0 10px;
	}

	.p_search .p_con /deep/.el-input__icon {
		line-height: 28px;
	}

	.list {
		margin-top: 20px;
	}
	.list .arrNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}

	.list li {
		margin-bottom: 20px;
		background: #fff;
		padding: 20px;
		font-size: 14px;
		color: #606266;
		line-height: 30px;
		position: relative;
	}

	.list li .btn {
		text-align: right;
	}

	.list li .btn span {
		display: inline-block;
		padding-top: 10px;
		padding-left: 20px;
		cursor: pointer;
	}

	.list li .btn span:hover {
		color: #fc5e5b;
	}

	.list li .btn span.gray {
		color: #c0c4cc;
	}

	.list .l_left {
		border-bottom: 1px solid #e6e6e6;
	}

	.list .l_left .l_left_1 {
		font-size: 16px;
		color: #303133;
		width: 700px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		cursor: pointer;
		.limitWidth{
			display: inline-block;
			float: left;
			max-width: 300px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.list .l_left .l_left_3 {
		color: #909399;
	}

	.list .l_right {
		position: absolute;
		right: 0;
		top: 36px;
		display: flex;
		text-align: center;
	}

	.list .l_right .l_right_1 {
		border-right: 1px solid #e6e6e6;
		padding: 0 20px;
		cursor: pointer;
	}

	.list .l_right .l_right_1.none {
		border: 0;
	}

	.list .l_right .l_right_1 .p1 {
		font-size: 22px;
		color: #fc5e5b;
		font-weight: bold;
	}

	.list .l_right .l_right_1 .p2 {
		font-size: 14px;
		color: #606266;
	}
</style>
