<template>
	<!-- 企业端：企业中心 -->
	<div class="Enter_home">
		<Head></Head>
		<div class="body">
			<div class="body-wrap">
				<div class="el-tabs el-tabs--left">
					<!-- 左侧菜单栏 -->
					<div class="el-tabs__header is-left">
						<div class="el-tabs__nav-wrap is-left">
							<div class="el-tabs__nav-scroll">
								<div class="el-tabs__nav is-left" style="transform: translateY(0px);">
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_center" @click.native="refresh('')">企业中心</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_info" @click.native="refresh('')">企业信息</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_post" @click.native="refresh('')">职位管理</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_delivery" @click.native="refresh('')">双选会管理</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_resume" @click.native="refresh('')">简历管理</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_downresume" @click.native="refresh('')">已下载简历</router-link></div>
									<!-- <div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_vip" @click.native="refresh('')">会员充值</router-link></div> -->
									<!-- <div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_assets" @click.native="refresh('')">资产信息</router-link></div> -->
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_interview" @click.native="refresh('')">面试结果</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_card" @click.native="refresh('')">账号信息</router-link></div>
									<div class="el-tabs__item is-left"><router-link to="/Enter_home/Enter_login" @click.native="refresh('')">登录日志</router-link></div>
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
import Head from '../../Head.vue';
import Foot from '../../Foot.vue';
import { mapState } from 'vuex';
export default {
	name: 'Enter_home',
	components: {
		Head,
		Foot
	},
	data() {
		return {
			tabPosition: 'left',
			// 当前页面路径
			linkName: 'Enter_center',
		};
	},
	created() {
	},
	updated(){
	},
	computed: {
		...mapState({
			token: state => state.httptoken,
			findDmMap: state => state.findDmMap,
			findDmList: state => state.findDmList,
		})
	},
	methods: {
		// 判断路由
		refresh(val) {
			this.linkName = val;
		},
	}
};
</script>

<style lang='less' scoped>
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
/deep/.el-tabs--left .el-tabs__nav-wrap.is-left {
    width: 200px;
    padding: 10px 0;
}
/deep/.el-tabs__item {
	color: #303133;
	padding: 0;
}
/deep/.el-tabs__item a{
	color: #303133;
	padding: 0;
    font-size: 16px;
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
}
.user_info .user_img {
	width: 64px;
	height: 64px;
	margin-right: 34px;
}
.user_info .user_wrap {
	width: 20%;
}
.user_info .user_wrap_1 {
	width: 25%;
}
.user_info .user_wrap .n1 {
	font-size: 14px;
	color: #606266;
	font-weight: bold;
	height: 30px;
	line-height: 49px;
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
	background: url('../../../assets/images/common/arraytop.png') no-repeat;
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
