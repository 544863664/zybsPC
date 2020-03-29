<template>
	<!-- 已关注企业 -->
	<div class="who">
		<ul class="ul_tab">
			<li class="active">
				<span class="tip">关注单位</span>
			</li>
		</ul>
		<div class="list">
			<ul>
				<li v-if="totalCount==0" class="followNull">
					<h3>无关注企业</h3>
				</li>
				<li v-for="(item, index) in followListArr" :key="index">
					<div class="list_resume">
						<div class="list_r_left">
							<div class="fol_logo">
								<img :src="company.info[item.dwid]||enterlogo" alt="" />
							</div>
							<div class="fol_title">
								<p class="title">
									<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
								</p>
								<p>
									<span>{{item.city}}</span>｜
									<span>{{findDmMap['m_dwxzdm'][item.dwxz]}}</span>｜
									<span>{{findDmMap['m_dwsshydm'][item.sshy]}}</span>
								</p>
								<p class="con">已发布职位<em>--个</em></p>
							</div>
						</div>
						<div class="list_r_right">
							<!-- <div class="ul2_btn gray">
								<img class="shipin" src="../../assets/images/common/shipin-grey.png" alt="">
								立即沟通
							</div> -->
							<!-- <div class="ul2_btn green">
								<img class="shipin" src="../../assets/images/common/shipin-green.png" alt="">
								立即沟通
							</div> -->
							<div class="ul2_btn red" @click="getOnlineHr(item)">
								<img class="shipin" src="../../assets/images/common/shipin-red.png" alt="">
								立即沟通
							</div>
							<div class="ul1_btn" @click="cancelfollow(item.dwid)">取消关注</div>
						</div>
					</div>
				</li>
			</ul>
			<el-pagination
				v-if="totalCount>10"
				@current-change="handleCurrentChange"
				:page-size="pageSize" 
				:current-page="currentPage"
				layout="prev, pager, next" 
				:total="totalCount">
			</el-pagination>
		</div>
	
		<el-dialog :visible.sync="online.dialog" width="40%" top="30vh" :lock-scroll="true" :show-close="true" :modal="false">
			<div class="dialog__body-wrap">
				<div class="dialog_info">
					<div style="height:200px;">
						<el-table :data="online.list" empty-text="暂无在线HR信息" style="width: 100%" class="resume_dialog">
							<el-table-column label="HR名称" width="100px">
								<template slot-scope="scope">
									<p>{{ scope.$index + 1 }}、{{ scope.row.zw }}</p>
								</template>
							</el-table-column>
							<el-table-column label="公司名称" align='center'>
								<template slot-scope="scope">
									<p :title="scope.row.dwmc">{{ scope.row.dwmc.length > 24 ? scope.row.dwmc.substring(0,24)+'...':scope.row.dwmc }}</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100px" align='center'>
								<template slot-scope="scope">
									<div>
										<el-button size="mini" type="danger" @click.stop="getIm(scope.row.hrid)">立即沟通</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>选择要对话的HR</div>
			</span>
		</el-dialog>
	
	
	</div>
</template>
<script>
	import { mapGetters, mapState } from 'vuex';
	import enterLogo from '../../assets/images/common/enterDetail.png'
	export default {
		name: 'Hunter_follow',
		components: {},
		data() {
			return {
				enterlogo: enterLogo,
				pageSize: 10,
				currentPage: 1,
				totalCount: 0,
				followListArr: [],
				company:{
					// 单位id列表
					dwids:[],
					info:{}
				},
				// 在线HR
				online:{
					dialog: false,
					list: [],
				},
			};
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				userId: "getuserId",
				roleId: "getroleId",
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				ProvinceMap: state => state.ProvinceMap,
				CityMap: state => state.CityMap,
			})
		},
		methods: {
			
			getOnlineHr(item) {
				this.axios({
					method: 'get',
					url: '/api/qz/im/getOnlineHr?dwid='+ item.dwid,
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then((res)=> {
					if (res && res.data && res.data.code == 0) {
						this.online.list = res.data.onlineHrs;
						if (this.online.list.length) {
							this.getIm()
						}
					}
				})
			},
			getIm() {
				let url = "/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId;
				window.open(url,'im');
			},
			
			
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
				this.followList();
			},
			followList() {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzgssc/list/'+ that.currentPage +'/'+ that.pageSize,
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.totalCount = response.data.page.totalCount;
						var data = response.data.page.list;
						data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						that.followListArr = data;
						if (that.company.dwids.length) {
							that.getDwLogos();
						}
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
			cancelfollow(dwid) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzgssc/qxsc/'+dwid,
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '已取消关注',
							offset: 400
						});
						that.followList();
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
		},
		created() {
			this.followList();
		},
	}
</script>
<style scoped>
	img {
		width: 100%;
		height: 100%;
	}
	.shipin {
		width: 23px;
		height: 18px;
		top: 0.0625rem;
	}
	.ul_tab {
		height: 30px;
		cursor: default;
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
		color: #FC5E5B;
		border-bottom: 2px solid #FC5E5B;
		display: inline-block;
		padding-bottom: 5px;
	}

	.list li {
		margin-top: 1.25rem;
		padding: 0.9375rem;
		background: #fff;
		overflow: auto;
	}
	.list .followNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}

	.list_resume {
		clear: both;
		font-size: 14px;
		color: #909399;
		overflow: auto;
		display: flex;
		justify-content: space-between;
	}

	.list_resume .list_r_left {
		display: flex;
	}
	.list_r_left .fol_logo {
		width: 70px;
		height: 70px;
		margin-right: 0.9375rem;
		overflow: hidden;
	}
	


	.list_resume .title, .list_resume .title a {
		color: #303133;
		margin-bottom: 0.3125rem;
		font-size: 0.9375rem;
		font-weight: bold;
	}

	.list_resume .con em {
		font-style: normal;
		color: #FC5E5B;
	}

	.list_resume .view {
		color: #909399;
		font-size: 12px;
	}

	.list_resume .view span {
		margin-right: 20px;
	}

	.list_resume .view em {
		font-style: normal;
		color: #FC5E5B;
	}

	.ul1_btn {
		width: 106px;
		height: 26px;
		text-align: center;
		line-height: 26px;
		font-size: 14px;
		border-radius: 20px;
		cursor: pointer;
		padding: 0 10px;
		color: #FF5656;
		border: 1px solid #FF5656;
	}

	.ul2_btn {
		width: 106px;
		height: 26px;
		text-align: center;
		line-height: 26px;
		font-size: 14px;
		border-radius: 20px;
		cursor: pointer;
		padding: 0 10px;
		margin-bottom: 0.75rem;
	}

	.ul2_btn.green {
		color: #28CA42;
		border: 1px solid #28CA42;
	}

	.ul2_btn.red {
		color: #FC5E5B;
		border: 1px solid #FC5E5B;
	}

	.ul2_btn.gray {
		color: #909399;
		border: 1px solid #909399;
	}
</style>
