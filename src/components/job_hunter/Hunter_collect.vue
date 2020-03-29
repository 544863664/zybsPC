<template>
	<!-- 已收藏职位 -->
	<div class="who">
		<ul class="ul_tab">
			<li :class="{'active':tab == 1}" @click="setTab(1)">
				<span class="tip">全部收藏职位</span>
			</li>
			<li :class="{'active':tab == 2}" @click="setTab(2)">
				<span class="tip">双选会收藏职位</span>
			</li>
		</ul>
		<div class="list">
			<!-- 全部收藏职位 -->
			<div v-if="tab == 1">
				<ul>
					<li v-if="allCllectJobsList.length==0" class="followNull">
						<h3>无收藏职位</h3>
					</li>
					<li v-for="(item, index) in allCllectJobsList" :key="index">
						<div class="allCollect">
							<div class="heat" @click="cancelCollect(item.dwid, item.gwid, item.qdid)"></div>
							<div class="coll-left coll_left">
								<div class="left-title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="xinzi">{{findDmMap['m_xzdydm'][item.gwyx]}}</span>
										<span>{{item.date}}发布</span>
									</h4>
								</div>
								<div class="left-small-title">
									<p class="small-title">{{findDmMap['m_jyyqdm'][item.jyyq]}}｜{{findDmMap['m_xldm'][item.xlyq]}}</p>
									<p>{{item.date}}收藏</p>
								</div>
							</div>
							<div class="coll-right">
								<div class="right-title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>{{findDmMap['m_dwxzdm'][item.dwxz]}}｜{{findDmMap['m_dwgmdm'][item.dwgm]}}</p>
								</div>
								<div class="right-logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="allCllectJobsList.length>0"
					@current-change="handleCurrentChange"
					:page-size="pageSize" 
					:current-page="currentPage"
					layout="prev, pager, next" 
					:total="totalCount">
				</el-pagination>
			</div>
			<!-- 双选会收藏职位 -->
			<div v-if="tab == 2">
				<ul class="ul2">
					<li v-if="sxCllectJobsList.length==0" class="followNull">
						<h3>无双选会收藏职位</h3>
					</li>
					<li  v-for="(item, index) in sxCllectJobsList" :key="index">
						<div class="sxCollect">
							<div class="heat" @click="cancelCollect(item.dwid, item.gwid, item.qdid)"></div>
							<div class="coll-left">
								<div class="left-title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="xinzi">{{findDmMap['m_xzdydm'][item.gwyx]}}</span>
										<span>{{findDmMap['m_xldm'][item.xlyq]}}专场</span>
									</h4>
								</div>
								<div class="left-small-title">
									<p class="small-title">2019浙江大学春季博士专场招聘会<span class="zt">（进行中）</span></p>
									<div class="btn">
										<img class="shipin" src="../../assets/images/common/shipin-grey.png" alt="">
										视频面试
									</div>
								</div>
							</div>
							<div class="coll-right">
								<div class="right-title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>{{findDmMap['m_jyyqdm'][item.gwyx]}}｜{{findDmMap['m_xzdydm'][item.gwyx]}}</p>
								</div>
								<div class="right-logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination 
					v-if="sxCllectJobsList.length>0"
					@current-change="handleCurrentChange"
					:page-size="pageSize" 
					:current-page="currentPage"
					layout="prev, pager, next" 
					:total="totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapState } from 'vuex';
	import Moment from '../common/moment.js';
	import enterLogo from '../../assets/images/common/enterDetail.png'
	export default {
		name: 'Hunter_collect',
		components: {},
		data() {
			return {
				enterlogo: enterLogo,
				tab: 1,
				pageSize: 10,
				currentPage: 1,
				totalCount: 0,
				allCllectJobsList: [],
				sxCllectJobsList: [],
				company:{
					// 单位id列表
					dwids:[],
					info:{}
				},
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
			// 点击tab
			setTab(val) {
				this.tab = val;
				this.pageSize = 10;
				this.currentPage = 1;
				if (val == 1) {
					this.currentPage = 1;
					this.allCllectJobs(1);
				} else {
					this.currentPage = 1;
					this.allCllectJobs(2);
				}
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
				if (this.tab == 1) {
					this.allCllectJobs(1);
				} else {
					this.allCllectJobs(2);
				}
			},
			allCllectJobs(qdid) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzgwsc/list/'+ that.currentPage +'/'+ that.pageSize,
					data: '',
					params: {
						qdid: qdid
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.totalCount = response.data.page.totalCount;
						var data = response.data.page.list;
						data.map(item => {
							return item.date = Moment.formatDate3(item.sxsj).replace('-', '年').replace('-', '月')+'日';
						})
						if (qdid == 1) {
							data.map(item => {
								if (item.dwid) {
									that.company.dwids.push(item.dwid)
								}
							})
							that.allCllectJobsList = data;
							if (that.company.dwids.length) that.getDwLogos();
						} else {
							data.map(item => {
								if (item.dwid) {
									that.company.dwids.push(item.dwid)
								}
							})
							that.sxCllectJobsList = data
							if (that.company.dwids.length) that.getDwLogos();
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
			cancelCollect(dwid, gwid, qdid) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzgwsc/qxsc/'+dwid+'/'+gwid,
					data: '',
					params: {
						qdid: qdid
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '已取消收藏',
							offset: 400
						});
						that.allCllectJobs(that.tab);
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
			this.allCllectJobs(1);
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
	.allCollect, .sxCollect {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0.9375rem;
		background-color: #FFFFFF;
		margin-bottom: 0.9375rem;
	}
	.list .followNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}
	.heat {
		width: 0.9375rem;
		height: 0.875rem;
		position: absolute;
		top: 5px;
		left: 5px;
		cursor: pointer;
		background: url(../../assets/images/common/Icon--chat-.png) center/cover no-repeat;
	}
	.allCollect span, .allCollect p, .sxCollect span, .sxCollect p, .btn {
		color: #909399;
		font-size: 14px;
	}
	.left-title {
		margin-bottom: 0.3125rem;
	}
	.xinzi, .small-title .zt, .btn {
		color: #FF5656!important;
	}
	.left-title .xinzi {
		margin: 0 0.9375rem;
	}
	.left-title span {
		font-size: 0.9375rem;
		font-weight: 500;
	}
	.left-title span a, .right-title h4 a {
		color: #161616;
	}
	.left-small-title .small-title {
		margin-bottom: 0.3125rem;
	}
	.right-title {
		margin-right: 0.625rem;
		text-align: right;
	}
	.right-title h4 {
		margin: 0.625rem 0;
	}
	.coll-right {
		display: flex;
	}
	.coll-right .right-logo {
		width: 4.375rem;
		height: 4.375rem;

	}
	.sxCollect .btn {
		height: 1.1875rem;
		width: 5.375rem;
		padding: 0 0.3125rem;
		line-height: 20px;
		font-size: 0.75rem;
		text-align: center;
		background: #FFFFFF;
		border: 0.0625rem solid #C0C4CC;
		border-radius: 12.5px;
		background-color: #FFFFFF;
		cursor: pointer;
	}
	
</style>
