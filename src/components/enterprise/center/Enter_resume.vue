<!-- 简历管理 -->
<template>
	<div class="center">
		<div class="company">
			<div class="com1">
				<div class="com2">
					<img src="../../../assets/images/enter/gzh.png" alt style="width:100%" />
					<p>小程序官网</p>
				</div>
				<div class="com1_1">
					<span class="name">求职者姓名</span>
					<el-input placeholder="输入求职者姓名" v-model.trim="search.resumeName" @keyup.enter.native="handleClick"></el-input>
					<span class="name" @click="handleClick">搜索</span>
				</div>
				<div class="com1_1">
					<span class="name">学历</span>
					<el-radio-group v-model="search.Recordofschooling" @change="handleChange1">
						<el-radio label="">全部</el-radio>
						<el-radio v-for="tab in findDmList['m_xldm']" :key="tab.dm" :label="tab.dm">{{tab.name}}</el-radio>
					</el-radio-group>
					<!-- <el-select v-model="search.Recordofschooling" placeholder="请选择" @change="handleChange1" style="width: 12.5rem;">
						<el-option label="全部" value="0"></el-option>
						<el-option v-for="tab in findDmList['m_xldm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
					</el-select> -->
				</div>
				<div class="com1_1">
					<span class="name">投递时间</span>
					<el-radio-group v-model="search.deliveryTime" @change="handleChange2">
						<el-radio label="">全部</el-radio>
						<el-radio label="1">最近一周</el-radio>
						<el-radio label="2">最近两周</el-radio>
						<el-radio label="3">最近一月</el-radio>
						<el-radio label="4">最近三月</el-radio>
					</el-radio-group>
					<!-- <el-select placeholder="请选择" v-model="search.deliveryTime"  @change="handleChange2">
						<el-option label="全部" value="0"></el-option>
						<el-option label="最近一周" value="1"></el-option>
						<el-option label="最近两周" value="2"></el-option>
						<el-option label="最近一月" value="3"></el-option>
						<el-option label="最近三月" value="4"></el-option>
					</el-select> -->
				</div>
				<div class="com1_1">
					<span class="name">应聘阶段</span>
					<el-radio-group v-model="search.offer" @change="handleChange3">
						<el-radio label="">全部</el-radio>
						<el-radio label="1">待处理</el-radio>
						<el-radio label="2">有意向</el-radio>
						<el-radio label="3">发面邀</el-radio>
						<el-radio label="4">不合适</el-radio>
					</el-radio-group>
					<!-- <el-select v-model="search.offer" placeholder="请选择"  @change="handleChange3">
						<el-option label="全部" value="0"></el-option>
						<el-option label="待处理" value="1"></el-option>
						<el-option label="有意向" value="2"></el-option>
						<el-option label="发面邀" value="3"></el-option>
						<el-option label="不合适" value="4"></el-option>
					</el-select> -->
					<!-- <el-button type="text" icon="el-icon-download" class="export" style="margin-left: 0;" @click="getDownall">批量导出</el-button>
					<el-button type="text" icon="el-icon-refresh" class="export" @click="resetList">重置</el-button> -->
				</div>
				<div class="com1_1">
					<span class="name">岗位搜索</span>
					<!-- <el-radio-group v-model="search.offer" @change="handleChange3">
						<el-radio label="">全部</el-radio>
						<el-radio label="1">待处理</el-radio>
						<el-radio label="2">有意向</el-radio>
						<el-radio label="3">发面邀</el-radio>
						<el-radio label="4">不合适</el-radio>
					</el-radio-group> -->
					<el-select v-model="search.Objective" placeholder="请选择" filterable multiple @change="handleChange4">
						<el-option v-for="tab in Objective" :key="tab.value" :label="tab.label" :value="tab.value"></el-option>
					</el-select>
					<el-button type="text" icon="el-icon-download" class="export" style="margin-left: 0;" @click="getDownall">批量导出</el-button>
					<el-button type="text" icon="el-icon-refresh" class="export" @click="resetList">重置</el-button>
				</div>
			</div>

		</div>

		<div class="list">
			<ul>
				<li v-if="search.totalCount==0" class="arrNull">
					<h3>无求职者投递简历</h3>
				</li>
				<li v-for="(item, index) in search.resumeList" :key="index">
					<em class="list_sel" v-if="item.ok" @click="changeCheckbox(index)"></em>
					<img src="../../../assets/images/common/mine.png" class="user_img">
					<div class="list_li_1">
						<i @click="getQzzDetail(item)" class="manName">
							{{item.xm?item.xm:'--'}}
						</i>
						<i class="list_li_2_1 status3" v-if="item.jlzt==1">待处理</i>
						<i class="list_li_2_1 status1" v-if="item.jlzt==2">已接受</i>
						<i class="list_li_2_1 status3" v-if="item.jlzt==3">已发面邀</i>
						<i class="list_li_2_1 status2" v-if="item.jlzt==4">已拒绝</i>
						<span>
							<!-- <span @click="Downresume">下载</span> -->
							<span>投递日期：{{item.tdsj}}</span>
							<!-- <span v-if="item.jlzt==2||item.jlzt==3">面试日期：2-29 8:30</span> -->
							<span>已投递单位数：{{item.tdcs?item.tdcs:'--'}}</span>
						</span>

					</div>
					<div class="list_li_2">
						<span class="list_li_2_2">{{item.xl?findDmMap['m_xldm'][item.xl]:'--'}} / 投递岗位名称：{{item.gwmc}}</span>
					</div>
					<div class="list_li_3">
						<span class="list_li_3_1">{{item.xxmc?item.xxmc:'--'}}</span>
						<div class="list_li_3_2">
							<el-button type="danger" v-if="item.jlzt==1" @click="getIm(item)">立即沟通</el-button>
							<el-button type="danger" v-if="item.jlzt==2" @click="gettoIM(item)">发面邀</el-button>
							<!-- <el-button type="danger" plain v-if="item.jlzt!=4">不合适</el-button> -->
							<el-select v-model="item.value" placeholder="请选择" v-if="item.jlzt!=4&&item.jlzt==1" @change="changejlzt(item)"
								style="width: 100px;margin-left: 30px;">
								<el-option v-for="ite in options" :key="ite.value" :label="ite.label" :value="ite.value">
								</el-option>
							</el-select>
							<el-button type="danger" plain v-if="item.jlzt==4" @click="recoverycandidate(item)">恢复为候选人</el-button>
						</div>
					</div>
					<p class="list_li_4">简历ID：{{item.dzjlid?item.dzjlid:'--'}}</p>
				</li>
			</ul>
			<el-pagination v-if="search.totalCount>10" @current-change="handleCurrentChange" :current-page="search.currentPage"
				:page-size="search.pageSize" layout="prev, pager, next" :total="search.totalCount">
			</el-pagination>
		</div>
		
		
		<el-dialog :visible.sync="invitation.dialog" width="700" :lock-scroll="true" :show-close="true" :modal="false" @close="closeTrade">
			<div class="dialog__body-wrap">
				<div class="dialog_info">
					<el-form :model="invitation" ref="invitation" label-width="100px" class="demo-ruleForm">
						<el-form-item label="联系人">
							<el-input v-model.trim="invitation.contact" placeholder="请输入联系人" style="width: 440px;border: 1px solid #DCDFE6;padding-left: 0.625rem;"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model.trim="invitation.phone" :maxlength="11" placeholder="请输入手机号" style="width: 440px;border: 1px solid #DCDFE6;padding-left: 0.625rem;"></el-input>
						</el-form-item>
						
						<el-form-item label="面试地点">
							<el-cascader :options="optionsPro"  v-model.trim="invitation.invitationPro" filterable placeholder="请选择注册地(省份/城市)" style="width: 440px;border: 1px solid #DCDFE6;padding-left: 0.625rem;" ></el-cascader>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model.trim="invitation.detaregion" placeholder="请输入详细地址" style="width: 440px;border: 1px solid #DCDFE6;padding-left: 0.625rem;"></el-input>
						</el-form-item>
						<el-form-item label="面试名称">
							<el-input v-model.trim="invitation.intName" placeholder="请输入面试名称" style="width: 440px;border: 1px solid #DCDFE6;padding-left: 0.625rem;"></el-input>
						</el-form-item>
						<el-form-item label="面试说明">
							<el-input v-model.trim="invitation.intDetail" placeholder="请输入面试说明" style="width: 440px;border: 1px solid #DCDFE6;padding-left: 0.625rem;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="submitForm('invitation')" style="width: 200px;background-color: #FF5656;color: #FFFFFF;margin-left: 100px;">发送面邀</el-button>
						</el-form-item>
					</el-form>
					
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>发送面邀内容填写</div>
			</span>
		</el-dialog>



	</div>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	// import Moment from "../../common/moment.js"
	export default {
		name: 'Enter_resume',
		components: {},
		data() {
			return {
				search: {
					resumeName: '',
					Recordofschooling: '',
					deliveryTime: '',
					offer: '',
					Objective: '',
					gwids: '',
					resumeList: [],
					totalCount: 0,
					pageSize: 10,
					currentPage: 1,

				},
				invitation: {
					dialog: false,
					contact: '',
					phone: '',
					invitationPro: '',
					detaregion: '',
					intName: '',
					intDetail: '',
				},
				Objective: [],
				options: [{
					value: '2',
					label: '有意向'
				}, {
					value: '4',
					label: '不合适'
				}],
				aaaaa: {},
			};
		},
		created() {
			this.getResume();
			this.getGwByHr();
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				'userId': 'getuserId',
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				findDmList: state => state.findDmList,
				ProvinceList: state => state.ProvinceList,
				CityList: state => state.CityList,
				AreaList: state => state.AreaList,
				ProvinceMap: state => state.ProvinceMap,
				CityMap: state => state.CityMap,
				AreaMap: state => state.AreaMap
			}),
			optionsPro() {
				return this.getProvinceList();
			}
		},
		methods: {
			getIm(item) {
				// console.log(item.bsid)
				let url = "/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId + "&tUserId=" + item.bsid;
				if (this.token) {
					window.open(url);
				} else {
					this.$message({
					type: "success",
					message: "请先登录再聊天",
					offset: 400
					});
				}
			},
			resetList() {
				this.search.resumeName = '';
				this.search.Recordofschooling = '';
				this.search.deliveryTime = '';
				this.search.offer = '';
				this.search.Objective = '';
				this.search.gwids = '';
				this.search.currentPage = 1;
				this.getResume();
			},
			getGwByHr() {
				this.axios({
					method: 'get',
					url: '/api/hr/qyhxrxx/getGwByHr',
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(response => {
					if (response && response.data && response.data.code == 0) {
						var data = response.data.list;
						data.map(item => {
							var lab = {
								value: item.gwid,
								label: item.gwmc
							}
							this.Objective.push(lab);
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			getResume() {
				this.axios({
					method: 'get',
					url: '/api/hr/qyhxrxx/findAllHxrList',
					data: '',
					params: {
						page: this.search.currentPage,
						limit: this.search.pageSize,
						xm: this.search.resumeName,
						xl: this.search.Recordofschooling,
						tdsj: this.search.deliveryTime,
						jlzt: this.search.offer,
						gwids: this.search.gwids
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(response => {
					if (response && response.data && response.data.code == 0) {
						this.search.totalCount = response.data.page.totalCount;
						var data = response.data.page.list;
						data.map(item => {
							item.ok = false;
							item.value = '';
							return item;
						})
						this.search.resumeList = data;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(currentPage) {
				this.search.currentPage = currentPage;
				this.getResume();
			},
			handleClick() {
				this.search.currentPage = 1;
				this.getResume();
			},
			handleChange1() {
				this.search.currentPage = 1;
				this.getResume();

			},
			handleChange2() {
				this.search.currentPage = 1;
				this.getResume();

			},
			handleChange3() {
				this.search.currentPage = 1;
				this.getResume();

			},
			handleChange4() {
				this.search.currentPage = 1;
				var gwids = '';
				if (this.search.Objective) {
					this.search.Objective.map(item => {
						gwids += item + ',';
					})
				}
				this.search.gwids = gwids;
				this.getResume();
			},

			gettoIM(item) {
				console.log(item)
				this.aaaaa = item;
				this.invitation.dialog = true;
			},

			getQzzDetail(item) {
				console.log(item);

				this.axios({
					method: 'get',
					url: '/api/hr/qyhxrxx/findQzxxInfoZjcs',
					params: {
						"qzbsid": item.qzzid,
						"dwid": item.dwid,
						"gwid": item.gwid
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(response => {
					if (response && response.data && response.data.code == 0) {
						let routeUrl = this.$router.resolve({
							path: "/private/personalResume",//新页面地址
							query: { qzbsid: item.qzzid }//携带的参数
						});
						window.open(routeUrl.href, "_blank");
					} else {
						this.$message({
							message: response.data.msg,
							offset: 400
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},

			changejlzt(item) {
				this.axios({
					method: 'post',
					url: '/api/hr/qyhxrxx/updateHxrYyzt',
					data: {
						"bsid": item.bsid,
						"type": item.value
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(response => {
					if (response && response.data && response.data.code == 0) {
						this.$message({
							type: 'success',
							message: '操作成功',
							offset: 400
						})
						this.getResume();
					} else {
						this.$message({
							message: response.data.msg,
							offset: 400
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			recoverycandidate(item) {
				this.axios({
					method: 'post',
					url: '/api/hr/qyhxrxx/updateHxrYyzt',
					data: {
						"bsid": item.bsid,
						"type": '1'
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(response => {
					if (response && response.data && response.data.code == 0) {
						this.$message({
							type: 'success',
							message: '操作成功',
							offset: 400
						})
						this.getResume();
					} else {
						this.$message({
							type: 'success',
							message: response.data.msg,
							offset: 400
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			changeCheckbox(index) { //取消单选
				this.search.resumeList[index].ok = false;
			},
			getDownall() { //批量下载简历
				this.$message({
					type: 'success',
					message: "敬请期待",
					offset: 400
				})

				// 暂时注释 2020/3/27 
				// this.search.resumeList.map(item => {
				// 	if (item.ok) {
				// 		item.ok = false;
				// 	} else {
				// 		item.ok = true;
				// 	}
				// })
			},


			Downresume(item) {
				this.axios({
					method: 'post',
					url: '/api/hr/qydwjlgl/tdDownloadJl',
					data: {
						qzid: item.qzzid,
						jlid: item.dzjlid,
					},
					params: '',
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(response => {
					if (response && response.data && response.data.code == 0) {
						var data = response.data.qzJldz;
						console.log(data);
						// const _res = res.data;
						// let blob = new Blob([_res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						// let downloadElement = document.createElement("a");
						// let href = window.URL.createObjectURL(blob); //创建下载的链接
						// downloadElement.href = href;
						// downloadElement.download = name; //下载后文件名
						// document.body.appendChild(downloadElement);
						// downloadElement.click(); //点击下载
						// document.body.removeChild(downloadElement); //下载完成移除元素
						// window.URL.revokeObjectURL(href); //释放掉blob对象
					}
				}).catch(error => {
					console.log(error);
				});
			},
			
			
			submitForm(invitation) {
				var that = this;
				that.$refs[invitation].validate(valid => {
						if (valid) {
							console.log(that.invitation)
							// contact: '',
							// phone: '',
							// invitationPro: '',
							// detaregion: '',
							// intName: '',
							// intDetail: '',
							that.axios({
								method: 'post',
								url: '/api/hr/qyhxrxx/addHrMy',
								data: {
									"gwid": that.aaaaa.gwid, //岗位
									// "gh": that.invitation., //固话
									"qzzid": that.aaaaa.qzzid,//求职
									"mymc": that.invitation.intName, //面试名称
									"mssf": that.invitation.invitationPro[0], //省份
									"smxx": that.invitation.intDetail,//说明信息
									"mscs": that.invitation.invitationPro[1],//城市
									// "msxq": that.invitation.,//县区
									"msxxdz": that.invitation.detaregion,//面试地址
									"lxr": that.invitation.contact ,//联系人
									"dwid": that.aaaaa.dwid,//单位id
									"sjhm": that.invitation.phone, //手机号码
									"hxrbsid": that.aaaaa.bsid
								},
								headers: {
									"content-type": "application/json",
									'token': that.token
								}
							}).then(response => {
								if (response && response.data && response.data.code == 0) {
									that.$message({
										type: 'success',
										message: '发送成功',
										offset: 400
									})
									that.invitation.dialog = false;
									that.getResume();
								} else {
									that.$message({
										message: response.data.msg,
										offset: 400
									})
								}
							}).catch(error => {
								console.log(error);
							});
						}
				})
			},
			closeTrade() {
				this.invitation = {
					dialog: false,
					contact: '',
					phone: '',
					invitationPro: '',
					detaregion: '',
					intName: '',
					intDetail: '',
				}
			},
			
			getProvinceList() {
				var options = [];
				if (this.ProvinceList && this.ProvinceList.length > 0) {
					this.ProvinceList.forEach(p => {
						let item = {
							value: p.dm,
							label: p.name,
							children: []
						};
						if ( this.CityList && this.CityList[p.dm] && this.CityList[p.dm].length > 0 ) {
							this.CityList[p.dm].forEach(c => {
								item.children.push({
									value: c.dm,
									label: c.name
								});
							});
						}
						options.push(item);
					});
				}
				return options;
			},
			





		}
	};
</script>

<style scoped>
	.export {
		height: 35px;
		font-size: 14px;
		color: #FC5E5B;
		margin-left: 106px;
		float: right;
		padding-right: 0 !important;
	}

	.user_img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: rgb(13, 130, 194);
		float: left;
		margin-right: 15px;
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
		padding: 20px;
		background: #fff;
		font-size: 14px;
		overflow: hidden;
		position: relative;
	}

	.list li .list_sel {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 5;
		display: inline-block;
		width: 26px;
		height: 26px;
		background: url("../../../assets/images/enter/select.png") 0 0 no-repeat;
		background-size: 26px;
		cursor: pointer;
	}

	.list .list_li_1,
	.list_li_1 a {
		font-size: 16px;
		color: #303133;
		font-weight: bold;
		position: relative;
	}

	.list .list_li_1 span {
		font-size: 12px;
		color: #909399;
		font-weight: normal;
		margin-left: 20px;
		cursor: pointer;
		float: right;
	}
	.list .list_li_1 .manName:hover{
		cursor: pointer;
		text-decoration: underline;
	}
	.list .list_li_2 {
		font-size: 14px;
		color: #606266;
		padding: 10px 0 0 0;
	}

	.list .list_li_2_1 {
		height: 20px;
		line-height: 20px;
		width: 65px;
		display: inline-block;
		margin-left: 10px;
		color: #fff;
		font-size: 13px;
		text-align: center;
		background: rgba(40, 202, 66, 0.60);
	}

	.list .list_li_2_1.status2 {
		background: #FC5E5B;
	}

	.list .list_li_2_1.status3 {
		background: #fff;
		color: #FC5E5B;
		border: 1px solid #FC5E5B;
	}

	.list .list_li_3 {
		position: relative;
		height: 30px;
	}

	.list .list_li_3_1 {
		margin-right: 30px;
		line-height: 47px;
	}

	.list .list_li_3_1 i {
		font-size: 14px;
		color: #FC5E5B;
	}

	.list .list_li_3_2 {
		position: absolute;
		right: 0;
		top: 24px;
	}

	.list .list_li_3_2 .el-button {
		width: 120px;
	}

	.list .list_li_3_2 .el-button a {
		color: #FFFFFF;
	}

	.list .list_li_4 {
		font-size: 12px;
		/* position: absolute;
	bottom: 0; */
		padding-top: 10px;

	}

	.company {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		background: #fff;
		overflow: auto;
		padding: 20px;
	}

	.company .com1 {
		flex: 1;
		position: relative;
	}

	.company .com2 {
		font-size: 12px;
		color: #606266;
		text-align: center;
		width: 65px;
		height: 90px;
		position: absolute;
		right: 0;
		top: 0;
		overflow: hidden;
	}

	.company .com1 .com1_1 {
		font-size: 14px;
		color: #606266;
		display: block;
	}

	.com1_1 {
		margin-bottom: 10px;
	}

	.com1_1 .name {
		display: inline-block;
		height: 35px;
		line-height: 35px;
		width: 78px;
		background: #FC5E5B;
		text-align: center;
		color: #fff;
		margin-right: 20px;
		cursor: pointer;
	}

	.com1_1 /deep/.el-input {
		border: 1px solid #E6E6E6;
		width: 400px;
		height: 33px;
		vertical-align: middle;
	}

	.com1_1 /deep/.el-input__inner {
		padding-left: 10px;
		height: 33px;
		width: 100%;
	}

	.com1_1 /deep/.el-date-editor--date {
		width: 204px;
	}

	.com1_1 /deep/.el-date-editor--date .el-input__inner {
		padding-left: 32px;
	}

	/deep/ .el-select>.el-input {
		display: inline-block;

	}

	/deep/ .el-select .el-input__inner {
		padding-right: 0 !important;
		width: 100px;
	}

	.com1_1 /deep/.el-input__icon {
		line-height: 32px;
	}

	.com1_1 .line {
		padding: 0 20px;
		color: #E6E6E6;
	}
	.dialog_info /deep/ .el-input__inner {
		width: 100%;
	}
</style>
