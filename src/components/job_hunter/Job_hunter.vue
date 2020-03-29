<template>
	<!-- -->
	<div class="Job_hunter">
		<Head  @upload="uploadChange()"></Head>
		<div class="body">
			<div class="body-wrap">
				<!-- 个人中心主页面头部 -->
				<div class="user_info" v-if="linkName == 'Hunter_home'">
					<img v-if="mineMsg.xbm=='xb_001'" :src="imageUrl||xb_001" class="user_img" />
					<img v-if="mineMsg.xbm=='xb_002'" :src="imageUrl||xb_002" class="user_img" />
					<div class="user_wrap user_wrap_1">
						<p class="n1">姓名：{{mineMsg.xm}}</p>
						<div class="n3">
							<span>状态：</span>
							<el-select v-model="usStatus" @change="changes">
								<el-option v-for="tab in findDmList['m_qzzt']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
							</el-select>
						</div>
					</div>
					<div class="user_wrap">
						<p class="n1 font-red">{{mineMsg.wsd}}%</p>
						<p class="n2">简历完整度</p>
					</div>
					<div class="user_wrap">
						<p class="n1 font-red">
							<img v-if="mineMsg.qzzt == 'zt_004'" src="../../assets/images/common/kaisuo.png" class="public_img" />
							<img v-else src="../../assets/images/common/guansuo.png" class="public_img">
						</p>
						<p class="n2">{{mineMsg.qzzt == 'zt_004' ? '简历已公开':'简历未公开'}}</p>
					</div>
					<div class="user_wrap">
						<p class="n1 font-red">{{mineMsg.tdjlCount}}</p>
						<p class="n2">申请职位</p>
					</div>
					<div class="user_wrap">
						<p class="n1 font-red">{{mineMsg.sxhscs || 0}}</p>
						<p class="n2">双选会收藏</p>
					</div>
					<div class="user_wrap">
						<p class="n1 font-red">{{mineMsg.gwscCount}}</p>
						<p class="n2">职位收藏</p>
					</div>
				</div>
				<div class="el-tabs el-tabs--left">
					<!-- 左侧菜单栏 -->
					<div class="el-tabs__header is-left">
						<div class="el-tabs__nav-wrap is-left">
							<div class="el-tabs__nav-scroll">
								<div class="el-tabs__nav is-left" style="transform: translateY(0px);">
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_home" @click.native="refresh('Hunter_home')">个人中心</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_who" @click.native="refresh('Hunter_who')">谁看了我</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_invest" @click.native="refresh('')">已投职位</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_delivery" @click.native="refresh('')">双选会投递职位</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_collect" @click.native="refresh('')">已收藏职位</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_follow" @click.native="refresh('')">已关注企业</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_myresume" @click.native="refresh('')">我的简历</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_resume" @click.native="refresh('')">刷新简历</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Shield_company" @click.native="refresh('')">屏蔽企业</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_invite" @click.native="refresh('')">期望邀约企业</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_message" @click.native="refresh('')">消息通知</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_card" @click.native="refresh('')">账号信息</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Job_hunter/Hunter_login" @click.native="refresh('')">登录日志</router-link></div>
								</div>
							</div>
						</div>
					</div>
					<!-- 右侧内容 -->
					<div class="el-tabs__content"><router-view /></div>
				</div>
			</div>
		</div>
		<Foot></Foot>
	</div>
</template>

<script>
import Head from '../Head.vue';
import Foot from '../Foot.vue';
import { mapState, mapGetters } from 'vuex';
import xb_001 from '../../assets/images/common/mine.png'
import xb_002 from '../../assets/images/common/nv.png'
export default {
	name: 'Job_hunter',
	components: {
		Head,
		Foot
	},
	data() {
		return {
			xb_001: xb_001,
			xb_002: xb_002,
			tabPosition: 'left',
			userStatus: '',
			usStatus:'',
			// 当前页面路径
			linkName: 'Hunter_home',
			mineMsg:{},
		};
	},
	computed: {
		...mapGetters({
			'token': 'getToken',
			imageUrl: 'getJobseekersimg',
		}),
		...mapState({
			findDmMap: state => state.findDmMap,
			findDmList: state => state.findDmList,
		}),
	}, 
	mounted(){ 
	},
	methods: {
		// 头部上传附件成功后
		uploadChange(){
			if(this.$route.path.indexOf('Hunter_myresume')){
				this.$router.go(0)
			}
		},
		// 判断路由
		refresh(val) {
			this.linkName = val;
		},
		jump(name) {
			this.$router.push({
				path: `${name.name}`
			});
			this.linkName = name.name;
		},
		//个人基本信息
		mineMessgae() {
			var that = this;
			that.axios.get('/api/qz/qzgrjbxx/myBaseInfo', {
				headers: {
					'content-type': 'application/json',
					'token': that.token
				}
			}).then(function(response) {
				if (response && response.data && response.data.code == 0) {
					var data = response.data.qzGrjbxxBase;
					var qzzt = data.qzzt;
					that.usStatus = that.findDmMap['m_qzzt'][qzzt];
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
		//求职状态
		changes(status) {
			var that = this;
			that.axios.get('/api/qz/qzgrjbxx/updateQzzt/'+status, {
				headers: {
					'content-type': 'application/json',
					token: that.token
				}
			}).then(function(response) {
				if (response && response.data && response.data.code == 0) {
					var data =response.data.qzzt;
					that.usStatus = that.findDmMap['m_qzzt'][data];
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
.body {
	width: 100%;
	margin-top: 7.5rem;
	padding-top: 1.25rem;
	overflow: hidden;
}
.body .body-wrap {
	width: 75rem;
	margin: 0 auto;
}
/deep/.el-tabs__item {
	color: #303133;
	padding: 0;
}
/deep/.el-tabs__item a{
	color: #303133;
	padding: 0;
}
/deep/.el-tabs__item a:visited {
	color: #303133;
}
/deep/.el-tabs__item.is-active {
	color: #ff5656;
}
/deep/.el-tabs__active-bar {
	background-color: #ff5656;
}
/deep/.el-tabs__item:hover {
	color: #ff5656;
}
/deep/.el-tabs--left .el-tabs__header.is-left {
	margin-right: 19px !important;
}
/deep/.el-tabs--left .el-tabs__item.is-left {
	text-align: left;
}
/deep/#tab-5 {
	border-bottom: 1px solid #ff5656;
}
/deep/#tab-9 {
	border-bottom: 1px solid #ff5656;
}
.user_info {
	padding: 10px 20px;
	margin-bottom: 20px;
	background: #fff;
	display: flex;
	font-size: 14px;
	-ms-flex-wrap: nowrap;
	flex-wrap: nowrap;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}
.user_info .user_img {
	width: 64px;
	height: 64px;
	margin-right: 34px;
	border-radius: 100%;
	overflow: hidden;
}
.user_info .user_wrap {
	width: 10rem;
}
.user_info .user_wrap_1 {
	width: 13.125rem;
}
.user_info .user_wrap .n1 {
	font-size: 14px;
	color: #606266;
	font-weight: bold;
	height: 30px;
	line-height: 45px;
}
.user_info .user_wrap .n2 {
	font-size: 14px;
	color: #606266;
	line-height: 39px;
	text-align: center;
}
.user_info .user_wrap .n3 {
	font-size: 14px;
	color: #fc5e5b;
}
.user_info .user_wrap .font-red {
	text-align: center;
	color: #fc5e5b;
}
/deep/.el-input__inner {
	border: 0;
	width: 132px;
	padding-left: 0px;
}
/deep/.el-icon-arrow-up:before {
	content: '';
	background: url('../../assets/images/common/arraytop.png') no-repeat;
	width: 12px;
	height: 8px;
	display: inline-block;
}
/deep/.el-tabs__item a {
	display: block;
	padding: 0 19px;
}
/deep/.el-tabs__item .router-link-active {
	color: #ff5656 !important;
	border-right: 2px solid #ff5656;
}
/deep/.el-tabs__nav-wrap {
	background: #fff;
}
</style>
