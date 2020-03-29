<template>
	<!-- 已投职位 -->
	<div class="who">
		<ul class="ul_tab">
			<li :class="{'active':tab == 1}" @click="setTab(1)">
				<span class="tip">全部投递</span>
			</li>
			<li :class="{'active':tab == 2}" @click="setTab(2)">
				<span class="tip">被查阅</span>
			</li>
			<li :class="{'active':tab == 3}" @click="setTab(3)">
				<span class="tip">面邀等待接受</span>
			</li>
			<li :class="{'active':tab == 4}" @click="setTab(4)">
				<span class="tip">面邀已接受</span>
			</li>
			<li :class="{'active':tab == 5}" @click="setTab(5)">
				<span class="tip">面邀已拒绝</span>
			</li>
			<li :class="{'active':tab == 6}" @click="setTab(6)">
				<span class="tip">拒绝投递</span>
			</li>
		</ul>
		<div class="list">
			<!-- 全部投递 -->
			<div v-if="tab == 1">
				<ul>
					<li v-if="allinvest.listArr.length==0" class="arrNull">
						<h3>无投递职位</h3>
					</li>
					<li v-for="(item, index) in allinvest.listArr" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="font-red margin_lr">{{item.gwyx?findDmMap['m_xzdydm'][item.gwyx]:'面议'}}</span>
									</h4>
								</div>
								<div class="view">
									<span class="font-red margin_r">{{item.city}}</span>
									<span v-if="item.gznx > 0">{{item.gznx}}</span>
									<span v-else>暂无工作经验</span>｜
									<span>{{item.xlyq?findDmMap.m_xldm[item.xlyq]:'--'}}</span>
									<div class="btn">
										<span class="margin_r">{{item.date}}投递</span>被查看<span class="font-red">{{item.ckcs}}</span>次
									</div>
								</div>
							</div>
							<div class="list_r_right">
								<div class="right_title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>
										<span>{{item.dwxz?findDmMap['m_dwxzdm'][item.dwxz]:'--'}}</span>
										<!-- ｜
										<span>{{item.dwgm?findDmMap['m_dwgmdm'][item.dwgm]:''}}</span> -->
									</p>
								</div>
								<div class="right_logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div> 
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="allinvest.listArr.length>0"
					@current-change="handleCurrentChange"
					:page-size="allinvest.pageSize" 
					:current-page="allinvest.currentPage"
					layout="prev, pager, next" 
					:total="allinvest.totalCount">
				</el-pagination>
			</div>
			<!-- 被查阅 -->
			<div v-if="tab == 2">
				<ul>
					<li v-if="Referto.listArr.length==0" class="arrNull">
						<h3>无被查阅</h3>
					</li>
					<li v-for="(item, index) in Referto.listArr" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="font-red margin_lr">{{item.gwyx?findDmMap['m_xzdydm'][item.gwyx]:'面议'}}</span>
									</h4>
								</div>
								<div class="view">
									<span class="font-red margin_r">{{item.city}}</span>
									<span v-if="item.gznx > 0">{{item.gznx}}</span>
									<span v-else>暂无工作经验</span>｜
									<span>{{item.xlyq?findDmMap.m_xldm[item.xlyq]:'--'}}</span>
									<div class="btn">
										<span class="margin_r">{{item.date}}投递</span>被查看<span class="font-red">{{item.ckcs}}</span>次
									</div>
								</div> 
							</div>
							<div class="list_r_right">
								<div class="right_title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>
										<span>{{item.dwxz?findDmMap['m_dwxzdm'][item.dwxz]:'--'}}</span> 
									</p>
								</div>
								<div class="right_logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="Referto.listArr.length>0"
					@current-change="handleCurrentChange"
					:page-size="Referto.pageSize" 
					:current-page="Referto.currentPage"
					layout="prev, pager, next" 
					:total="Referto.totalCount">
				</el-pagination>
			</div>
			<!-- 邀面试 -->
			<div v-if="tab == 3">
				<ul>
					<li v-if="beAccepted.listArr.length==0" class="arrNull">
						<h3>无面邀等待接受</h3>
					</li>
					<li v-for="(item, index) in beAccepted.listArr" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="font-red margin_lr">{{item.gwyx?findDmMap['m_xzdydm'][item.gwyx]:'面议'}}</span>
									</h4>
								</div> 

								<div class="view">
									<p class="view">
										<span class="margin_r">{{item.date}}投递</span>被查看<span class="font-red">{{item.ckcs}}</span>次
									</p>
									<span class="font-red margin_r">{{item.city}}</span>
									<span v-if="item.gznx > 0">{{item.gznx}}</span>
									<span v-else>暂无工作经验</span>｜
									<span>{{item.xlyq?findDmMap.m_xldm[item.xlyq]:'--'}}</span>
									<div class="btn">
										<span class="font-red">邀请面试：</span>
										<span class="font-red">02月10日</span>
										<span class="green margin_lr">接受</span>
										<span class="red">拒绝</span>
									</div>
								</div>
							</div>
							<div class="list_r_right" style="margin-top: 0.5rem;">
								<div class="right_title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>
										<span>{{item.dwxz?findDmMap['m_dwxzdm'][item.dwxz]:'--'}}</span> 
									</p>
								</div>
								<div class="right_logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="beAccepted.listArr.length>0"
					@current-change="handleCurrentChange"
					:page-size="beAccepted.pageSize" 
					:current-page="beAccepted.currentPage"
					layout="prev, pager, next" 
					:total="beAccepted.totalCount">
				</el-pagination>
			</div>
			<div v-if="tab == 4">
				<ul>
					<li v-if="accepted.listArr.length==0" class="arrNull">
						<h3>无面邀已接受</h3>
					</li>
					<li v-for="(item, index) in accepted.listArr" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="font-red margin_lr">{{item.gwyx?findDmMap['m_xzdydm'][item.gwyx]:'面议'}}</span>
									</h4>
								</div>
								<div class="view">
									<p class="view">
										<span class="margin_r">{{item.date}}投递</span>被查看<span class="font-red">{{item.ckcs}}</span>次
									</p>
									<span class="font-red margin_r">{{item.city}}</span>
									<span v-if="item.gznx > 0">{{item.gznx}}</span>
									<span v-else>暂无工作经验</span>｜
									<span>{{item.xlyq?findDmMap.m_xldm[item.xlyq]:'--'}}</span>
									<div class="btn">
										<span class="font-red">邀请面试：</span>
										<span class="font-red">02月10日</span>
										<span class="green margin_lr">接受</span>
										<span class="red">拒绝</span>
									</div>
								</div>
							</div>
							<div class="list_r_right" style="margin-top: 0.5rem;">
								<div class="right_title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>
										<span>{{item.dwxz?findDmMap['m_dwxzdm'][item.dwxz]:'--'}}</span>
									</p>
								</div>
								<div class="right_logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="accepted.listArr.length>0"
					@current-change="handleCurrentChange"
					:page-size="accepted.pageSize" 
					:current-page="accepted.currentPage"
					layout="prev, pager, next" 
					:total="accepted.totalCount">
				</el-pagination>
			</div>
			<div v-if="tab == 5">
				<ul>
					<li v-if="refused.listArr.length==0" class="arrNull">
						<h3>无面邀已拒绝</h3>
					</li>
					<li v-for="(item, index) in refused.listArr" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="font-red margin_lr">{{item.gwyx?findDmMap['m_xzdydm'][item.gwyx]:'面议'}}</span>
									</h4>
								</div>
								<div class="view">
									<p class="view">
										<span class="margin_r">{{item.date}}投递</span>被查看<span class="font-red">{{item.ckcs}}</span>次
									</p>
									<span class="font-red margin_r">{{item.city}}</span>
									<span v-if="item.gznx > 0">{{item.gznx}}</span>
									<span v-else>暂无工作经验</span>｜
									<span>{{item.xlyq?findDmMap.m_xldm[item.xlyq]:'--'}}</span>
									<div class="btn">
										<span class="font-red">邀请面试：</span>
										<span class="font-red">02月10日</span>
										<span class="green margin_lr">接受</span>
										<span class="red">拒绝</span>
									</div>
								</div>
							</div>
							<div class="list_r_right" style="margin-top: 0.5rem;">
								<div class="right_title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>
										<span>{{item.dwxz?findDmMap['m_dwxzdm'][item.dwxz]:'--'}}</span> 
									</p>
								</div>
								<div class="right_logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="refused.listArr.length>0"
					@current-change="handleCurrentChange"
					:page-size="refused.pageSize" 
					:current-page="refused.currentPage"
					layout="prev, pager, next" 
					:total="refused.totalCount">
				</el-pagination>
			</div>
			<!-- 拒绝投递 -->
			<div v-if="tab == 6">
				<ul>
					<li v-if="Refusedto.listArr.length==0" class="arrNull">
						<h3>无拒绝投递</h3>
					</li>
					<li v-for="(item, index) in Refusedto.listArr" :key="index">
						<div class="list_resume">
							<div class="list_r_left">
								<div class="title">
									<h4>
										<span>
											<router-link target="_blank" :to="{path: '/public/postDetail',query: { postId: item.gwid,companyId: item.dwid }}">{{item.gwmc}}</router-link>
										</span>
										<span class="font-red margin_lr">{{item.gwyx?findDmMap['m_xzdydm'][item.gwyx]:'面议'}}</span>
									</h4>
								</div>
								<div class="view">
									<span class="font-red margin_r">{{item.city}}</span>
									<span v-if="item.gznx > 0">{{item.gznx}}</span>
									<span v-else>暂无工作经验</span>｜
									<span>{{item.xlyq?findDmMap.m_xldm[item.xlyq]:'--'}}</span>
									<div class="btn">
										<span class="margin_r">{{item.date}}投递</span>被查看<span class="font-red">{{item.ckcs}}</span>次
									</div>
								</div>
							</div>
							<div class="list_r_right">
								<div class="right_title">
									<h4>
										<router-link target="_blank" :to="{path: '/public/enterDetail',query: { dwid: item.dwid }}">{{item.dwmc}}</router-link>
									</h4>
									<p>
										<span>{{item.dwxz?findDmMap['m_dwxzdm'][item.dwxz]:'--'}}</span> 
									</p>
								</div>
								<div class="right_logo">
									<img v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]||enterlogo" alt="" />
									<img v-else :src="enterlogo" alt="" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination
					v-if="Refusedto.listArr.length>0"
					@current-change="handleCurrentChange"
					:page-size="Refusedto.pageSize" 
					:current-page="Refusedto.currentPage"
					layout="prev, pager, next" 
					:total="Refusedto.totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapState } from 'vuex'
	import Moment from '../common/moment.js'
	import enterLogo from '../../assets/images/common/enterDetail.png'
	export default {
		components: {},
		data() {
			return {
				tab: 1,
				enterlogo: enterLogo,
				allinvest: {
					listArr: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,
				},
				Referto: {
					listArr: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,
				},
				beAccepted: {
					listArr: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,
				},
				accepted: {
					listArr: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,
				},
				refused: {
					listArr: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,
				},
				Refusedto: {
					listArr: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,
				},
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
				ProvinceMap: state => state.ProvinceMap,
				CityMap: state => state.CityMap,
			})
		},
		methods: {
			// 点击tab
			setTab(val) {
				this.tab = val;
				this.company.dwids = [];
				if (val == 1) {
					this.getAllinvest();
				}
				if (val == 2) {
					this.getReferto();
				}
				if (val == 3) {
					this.getbeAccepted();
				}
				if (val == 4) {
					this.getaccepted();
				}
				if (val == 5) {
					this.getrefused();
				}
				if (val == 6) {
					this.getRefusedto();
				}
			},
			handleCurrentChange(currentPage) {
				var val = this.tab;
				if (val == 1) {
					this.allinvest.currentPage = currentPage;
					this.getAllinvest();
				}
				if (val == 2) {
					this.Referto.currentPage = currentPage;
					this.getReferto();
				}
				if (val == 3) {
					this.beAccepted.currentPage = currentPage;
					this.getbeAccepted();
				}
				if (val == 4) {
					this.accepted.currentPage = currentPage;
					this.getaccepted();
				}
				if (val == 5) {
					this.refused.currentPage = currentPage;
					this.getrefused();
				}
				if (val == 6) {
					this.Refusedto.currentPage = currentPage;
					this.getRefusedto();
				}
				
			},
			getAllinvest() {
				var that = this;
				that.axios.get('/api/qz/qyhxrxx/listAll/'+that.allinvest.currentPage+'/'+that.allinvest.pageSize, {
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.allinvest.totalCount = response.data.page.total;
						var data = response.data.page.gwtdlist;
						that.allinvest.listArr = data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.date = Moment.formatDate3(item.tdsj).replace('-', '年').replace('-', '月')+'日';
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						if (that.company.dwids.length) that.getDwLogos();
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
			getReferto() {
				var that = this;
				that.axios.get('/api/qz/qyhxrxx/listLooked/'+that.Referto.currentPage+'/'+that.Referto.pageSize, {
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.Referto.totalCount = response.data.page.total;
						var data = response.data.page.gwtdlist;
						that.Referto.listArr = data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.date = Moment.formatDate3(item.tdsj).replace('-', '年').replace('-', '月')+'日';
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						if (that.company.dwids.length) that.getDwLogos();
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
			getbeAccepted() {
				var that = this;
				that.axios.get('/api/qz/qymyxx/listWait', {
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						// that.beAccepted.totalCount = response.data.page.total;
						var data = response.data.listWait;
						that.beAccepted.listArr = data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.date = Moment.formatDate3(item.tdsj).replace('-', '年').replace('-', '月')+'日';
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						if (that.company.dwids.length) that.getDwLogos();
						
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
			getaccepted() {
				var that = this;
				that.axios.get('/api/qz/qymyxx/listAccepted', {
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						// that.accepted.totalCount = response.data.page.total;
						var data = response.data.listAccepted;
						that.accepted.listArr = data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.date = Moment.formatDate3(item.tdsj).replace('-', '年').replace('-', '月')+'日';
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						if (that.company.dwids.length) that.getDwLogos();
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
			getrefused() {
				var that = this;
				that.axios.get('/api/qz/qymyxx/listDenied', {
					headers: {
						'conterefusednt-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						// that.refused.totalCount = response.data.page.total;
						var data = response.data.listDenied;
						that.refused.listArr = data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.date = Moment.formatDate3(item.tdsj).replace('-', '年').replace('-', '月')+'日';
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						if (that.company.dwids.length) that.getDwLogos();
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
			getRefusedto() {
				var that = this;
				that.axios.get('/api/qz/qyhxrxx/listDenied/'+that.Refusedto.currentPage+'/'+that.Refusedto.pageSize, {
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.Refusedto.totalCount = response.data.page.total;
						var data = response.data.page.gwtdlist;
						that.Refusedto.listArr = data.map(item => {
							if (item.dwszsf&&item.dwszcs) {
								item.date = Moment.formatDate3(item.tdsj).replace('-', '年').replace('-', '月')+'日';
								item.city = that.CityMap[item.dwszsf][item.dwszcs];
								that.company.dwids.push(item.dwid)
								return item;
							}
							that.company.dwids.push(item.dwid)
							return item;
						})
						if (that.company.dwids.length) that.getDwLogos();
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
			this.getAllinvest();
		},
	}
</script>
<style scoped>
	img {
		width: 100%;
		height: 100%;
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

	.list_resume {
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
	.list .arrNull {
		background: #f6f6f8;
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
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

	.list_r_left .title span, .title span a {
		font-size: 0.9375rem;
		font-weight: 500;
	}
	.title span a {
		color: #161616;
	}

	.list_r_left .view .btn {
		margin-top: 0.125rem;
		line-height: 20px;
		font-size: 0.75rem;
	}

	.btn .green,
	.btn .red {
		padding: 0.0625rem 0.375rem;
		border-radius: 0.625rem;
		font-size: 0.8125rem;
		cursor: pointer;
	}

	.btn .green {
		color: #02e202;
		border: 0.0625rem solid #02e202;
	}

	.btn .red {
		color: #FF5656;
		border: 0.0625rem solid #FF5656;
	}

	.list_r_left .font-red {
		color: #FF5656;
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
	.right_title h4 a {
		color: #606266;
	}
</style>
