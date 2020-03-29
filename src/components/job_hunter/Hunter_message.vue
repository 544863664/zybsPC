<template>
	<!-- 消息通知 -->
	<div class="Hunter_message">
		<div class="bodys">
			<img src="../../assets/images/common/voice.png" alt="">
			<div class="title">消息通知</div>
		</div>

		<div class="Hunter_title_box">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane name="xx_001">
					<el-badge slot="label" :hidden="xx_001==0?true:false" :value="xx_001" :max="10" class="item">
						系统通知
					</el-badge>
					<div class="Hunter_box">
						<div v-if="systemInformsList.length==0" class="ArrNull">
							<h3>无系统通知</h3>
						</div>
						<el-collapse accordion @change="Informschange" v-if="systemInformsList.length>0">
							<el-collapse-item v-for="(item, index) in systemInformsList" :key="index" :name="index">
								<template slot="title">
									<el-button type="text" size="mini" style="color: #FF5656;" v-if="item.sfyd==0">未读</el-button>
									<el-button type="text" size="mini" style="color: #bfbfbf;" v-if="item.sfyd==1">已读</el-button>
									<span class="Hunter_box_title">2020-02-18 12:30:22</span>
									<span class="Hunter_box_title" v-text="item.xxmc"></span>
									<span class="Hunter_box_title"></span>
								</template>
								<div class="Hunter_box_wrap">
									<div class="box_wrap_left">2020-02-18 12:30:22</div>
									<div class="box_wrap_right">{{item.xxnr}}</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-tab-pane>
				<el-tab-pane name="xx_002">
					<el-badge slot="label" :hidden="xx_002==0?true:false" :value="xx_002" :max="10" class="item">
						招聘会通知
					</el-badge>
					<div class="Hunter_box">
						<div v-if="recruitmentInformsList.length==0" class="ArrNull">
							<h3>无招聘会通知</h3>
						</div>
						<el-collapse accordion @change="Informschange" v-if="recruitmentInformsList.length>0">
							<el-collapse-item v-for="(item, index) in recruitmentInformsList" :key="index" :name="index">
								<template slot="title">
									<el-button type="text" size="mini" style="color: #FF5656;" v-if="item.sfyd==0">未读</el-button>
									<el-button type="text" size="mini" style="color: #bfbfbf;" v-if="item.sfyd==1">已读</el-button>
									<span class="Hunter_box_title">2020-02-18 12:30:22</span>
									<span class="Hunter_box_title">收到招聘会通知</span>
									<span class="Hunter_box_title"></span>
								</template>
								<div class="Hunter_box_wrap">
									<div class="box_wrap_left">2020-02-18 12:30:22</div>
									<div class="box_wrap_right">{{item.xxnr}}</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-tab-pane>
				<el-tab-pane name="xx_003">
					<el-badge slot="label" :hidden="xx_003==0?true:false" :value="xx_003" :max="10" class="item">
						面试通知等
					</el-badge>
					<div class="Hunter_box">
						<div v-if="interviewInformsList.length==0" class="ArrNull">
							<h3>无面试通知等</h3>
						</div>
						<el-collapse accordion @change="Informschange" v-if="interviewInformsList.length>0">
							<el-collapse-item v-for="(item, index) in interviewInformsList" :key="index" :name="index">
								<template slot="title">
									<el-button type="text" size="mini" style="color: #FF5656;" v-if="item.sfyd==0">未读</el-button>
									<el-button type="text" size="mini" style="color: #bfbfbf;" v-if="item.sfyd==1">已读</el-button>
									<span class="Hunter_box_title">2020-02-18 12:30:22</span>
									<span class="Hunter_box_title">收到面试通知等</span>
									<span class="Hunter_box_title"></span>
								</template>
								<div class="Hunter_box_wrap">
									<div class="box_wrap_left">2020-02-18 12:30:22</div>
									<div class="box_wrap_right">{{item.xxnr}}</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-tab-pane>
				<el-tab-pane name="xx_004">
					<el-badge slot="label" :hidden="xx_004==0?true:false" :value="xx_004" :max="10" class="item">
						简历被查看通知
					</el-badge>
					<div class="Hunter_box">
						<div v-if="beviewedInformsList.length==0" class="ArrNull">
							<h3>无简历被查看通知</h3>
						</div>
						<el-collapse accordion @change="Informschange" v-if="beviewedInformsList.length>0">
							<el-collapse-item v-for="(item, index) in beviewedInformsList" :key="index" :name="index">
								<template slot="title">
									<el-button type="text" size="mini" style="color: #FF5656;" v-if="item.sfyd==0">未读</el-button>
									<el-button type="text" size="mini" style="color: #bfbfbf;" v-if="item.sfyd==1">已读</el-button>
									<span class="Hunter_box_title">2020-02-18 12:30:22</span>
									<span class="Hunter_box_title">收到简历被查看通知</span>
									<span class="Hunter_box_title"></span>
								</template>
								<div class="Hunter_box_wrap">
									<div class="box_wrap_left">2020-02-18 12:30:22</div>
									<div class="box_wrap_right">{{item.xxnr}}</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-tab-pane>
				<el-tab-pane name="xx_005">
					<el-badge slot="label" :hidden="xx_005==0?true:false" :value="xx_005" :max="10" class="item">
						调查问卷通知
					</el-badge>
					<div class="Hunter_box">
						<div v-if="questionnaireInformsList.length==0" class="ArrNull">
							<h3>无调查问卷通知</h3>
						</div>
						<el-collapse accordion @change="Informschange" v-if="questionnaireInformsList.length>0">
							<el-collapse-item v-for="(item, index) in questionnaireInformsList" :key="index" :name="index">
								<template slot="title">
									<el-button type="text" size="mini" style="color: #FF5656;" v-if="item.sfyd==0">未读</el-button>
									<el-button type="text" size="mini" style="color: #bfbfbf;" v-if="item.sfyd==1">已读</el-button>
									<span class="Hunter_box_title">2020-02-18 12:30:22</span>
									<span class="Hunter_box_title">收到调查问卷通知</span>
									<span class="Hunter_box_title"></span>
								</template>
								<div class="Hunter_box_wrap">
									<div class="box_wrap_left">2020-02-18 12:30:22</div>
									<div class="box_wrap_right">{{item.xxnr}}</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'Hunter_message',
		components: {},
		data() {
			return {
				activeName: 'xx_001',
				xx_001: 0,
				xx_002: 0,
				xx_003: 0,
				xx_004: 0,
				xx_005: 0,
				systemInformsList: [],
				recruitmentInformsList: [],
				interviewInformsList: [],
				beviewedInformsList: [],
				questionnaireInformsList: [],
			};
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
		},
		methods: {
			handleClick() {
				// this.getMessageList(this.activeName);
			},
			getMessageList (activeName) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzxxtx/list/'+activeName+'/1/'+'10',
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('getMessageList:', response);
					if (response && response.data && response.data.code == 0) {
						if (activeName=='xx_001') {
							var xx_001data = response.data.page.list;
							that.systemInformsList = xx_001data;
							that.xx_001 = 0;
							xx_001data.map(item => {
								if (item.sfyd == '0') {
									that.xx_001++
								}
							})
						}
						if (activeName=='xx_002') {
							var xx_002data = response.data.page.list;
							that.recruitmentInformsList = xx_002data;
							that.xx_002 = 0;
							xx_002data.map(item => {
								if (item.sfyd == '0') {
									that.xx_002++
								}
							})
						}
						if (activeName=='xx_003') {
							var xx_003data = response.data.page.list;
							that.interviewInformsList = xx_003data;
							that.xx_003 = 0;
							xx_003data.map(item => {
								if (item.sfyd == '0') {
									that.xx_003++
								}
							})
						}
						if (activeName=='xx_004') {
							var xx_004data = response.data.page.list;
							that.beviewedInformsList = xx_004data;
							that.xx_004 = 0;
							xx_004data.map(item => {
								if (item.sfyd == '0') {
									that.xx_004++
								}
							})
						}
						if (activeName=='xx_005') {
							var xx_005data = response.data.page.list;
							that.questionnaireInformsList = xx_005data;
							that.xx_005 = 0;
							xx_005data.map(item => {
								if (item.sfyd == '0') {
									that.xx_005++
								}
							})
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
			Informschange (activeNames) {
				var that = this;
				var xxidArr = [];
				if (that.activeName=='xx_001' && that.systemInformsList[activeNames] && that.systemInformsList[activeNames].sfyd=='0') {
					xxidArr.push(that.systemInformsList[activeNames].xxid);
					that.markReadBatch(xxidArr, activeNames, 'xx_001');
				}
				if (that.activeName=='xx_002' && that.recruitmentInformsList[activeNames] && that.recruitmentInformsList[activeNames].sfyd=='0') {
					xxidArr.push(that.recruitmentInformsList[activeNames].xxid);
					that.markReadBatch(xxidArr, activeNames, 'xx_002');
				}
				if (that.activeName=='xx_003' && that.interviewInformsList[activeNames] && that.interviewInformsList[activeNames].sfyd=='0') {
					xxidArr.push(that.interviewInformsList[activeNames].xxid);
					that.markReadBatch(xxidArr, activeNames, 'xx_003');
				}
				if (that.activeName=='xx_004' && that.beviewedInformsList[activeNames] && that.beviewedInformsList[activeNames].sfyd=='0') {
					xxidArr.push(that.beviewedInformsList[activeNames].xxid);
					that.markReadBatch(xxidArr, activeNames, 'xx_004');
				}
				if (that.activeName=='xx_005' && that.questionnaireInformsList[activeNames] && that.questionnaireInformsList[activeNames].sfyd=='0') {
					xxidArr.push(that.questionnaireInformsList[activeNames].xxid);
					that.markReadBatch(xxidArr, activeNames, 'xx_005');
				}
			},
			markReadBatch(xxidArr, index, itemlx) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzxxtx/markReadBatch',
					data: xxidArr,
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('Informschange:', response);
					if (response && response.data && response.data.code == 0) {
						if (itemlx=='xx_001') {
							that.xx_001--;
							that.systemInformsList[index].sfyd = '1';
						}
						if (itemlx=='xx_002') {
							that.xx_002--;
							that.recruitmentInformsList[index].sfyd = '1';
						}
						if (itemlx=='xx_003') {
							that.xx_003--;
							that.interviewInformsList[index].sfyd = '1';
						}
						if (itemlx=='xx_004') {
							that.xx_004--;
							that.beviewedInformsList[index].sfyd = '1';
						}
						if (itemlx=='xx_005') {
							that.xx_005--;
							that.questionnaireInformsList[index].sfyd = '1';
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
		},
		created() {
			this.getMessageList('xx_001');
			this.getMessageList('xx_002');
			this.getMessageList('xx_003');
			this.getMessageList('xx_004');
			this.getMessageList('xx_005');
		}
	};
</script>

<style scoped>
	.Hunter_message {
		margin-bottom: 1rem;
		min-height: 30rem;
	}
	.Hunter_message .bodys {
		background-color: #FFFFFF;
		padding: 0.375rem 0.625rem;
		margin-bottom: 0.625rem;
	}
	.Hunter_title_box {
		min-height: 600px;
		background-color: #FFFFFF;
	}
	.Hunter_title_box /deep/ .el-tabs__header {
		margin: 0;
	}
	.Hunter_title_box .Hunter_box {
		padding: 0 1.25rem;
	}
	.Hunter_box .ArrNull {
		text-align: center;
		line-height: 20;
		color: #b2b2b3;
	}
	.Hunter_box .Hunter_box_title {
		padding-left: 0.625rem;
		padding-right: 1.25rem;
	}
	.Hunter_box .Hunter_box_wrap {
		padding: 0 1.25rem;
		display: flex;
	}
	.Hunter_box_wrap .box_wrap_left {
		width: 8.75rem;
	}
	.Hunter_box_wrap .box_wrap_right {
		padding-right: 2.5rem;
		text-indent: 1.625rem;
	}
	.title {
		font-size: 1.25rem;
		font-weight: 600;
		display: inline-block;
		vertical-align: text-bottom;
		padding: 0 1rem;
	}
	/deep/ .el-button {
		padding: 0px 5px;
	}

	/deep/ .el-tabs__item {
		padding: 0 20px!important;
	}
	/deep/ .el-badge__content.is-fixed {
		top: 0.625rem!important;
	}
</style>
