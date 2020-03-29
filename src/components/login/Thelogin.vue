<template>
	<!-- 登录 -->
	<div class="Thelogin">
		<Head />
		<div class="loginBody">
			<div class="bodyWrap">
				<!-- <el-tabs v-model="activeName" stretch >
					<el-tab-pane label="企业登录" name="first"  class="logintitle">
						<Qylogin />
					</el-tab-pane>
					<el-tab-pane label="求职者登录" name="second">
						<Qzlogin />
					</el-tab-pane>
				</el-tabs> -->
				<Qzlogin v-if="id == 1" />
				<Qylogin v-if="id == 2" />
			</div>
		</div>
	</div>
</template>

<script>
	import Head from '../Head.vue'
	import Qzlogin from './Qzlogin.vue'
	import Qylogin from './Qylogin.vue'
	//import crypto from "crypto"; //密码加密
	export default {
		name: "Thelogin",
		components: { Head, Qzlogin, Qylogin },
		data() {
			return {
				activeName: "first",
				id:this.$route.query.id
			};
		},
		methods: {},
		created() {
			var path = this.$route;
			if (path.query.activeName) {
				this.activeName = path.query.activeName;
			}
		},
		watch:{
			
		},
		mounted() {
			if(!this.id) {
				this.$router.push({
					path:'/'
				})
			}
		},
	};
</script>

<style scoped>
	body {
		background-color: #FFFFFF;
	}
	.loginBody {
		width: 100%;
		margin-top: 7.5rem;
		background-color: #FFFFFF;
	}
	/deep/ .el-tabs__item {
		font-size: 15px;
		font-weight: bold;
	}
	/deep/ .el-tabs__item.is-active {
		color: #ff5656;
		font-size: 18px;
	}

	/deep/ .el-tabs__item:hover {
		color: #ff5656;
	}

	/deep/ .el-tabs__active-bar {
		background-color: #ff5656;
	}

	.loginBody .bodyWrap {
		width: 75rem;
		height: 50rem;
		margin: 0 auto;
		padding-top: 1.25rem;
	}
</style>
