<template>
	<!-- 注册 -->
	<div class="Registered">
		<Head />
		<div class="RegBody">
			<div class="bodyWrap">
				<el-tabs v-model="activeName" stretch>
					<el-tab-pane label="求职者注册" name="first">
						<Qzreg></Qzreg>
					</el-tab-pane>
					<el-tab-pane label="企业单位注册" name="second">
						<Qyreg></Qyreg>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from '../Head.vue'
	import Qzreg from "./Qzreg.vue";
	import Qyreg from "./Qyreg.vue";
	export default {
		name: "Registered",
		components: {
			Head,
			Qzreg,
			Qyreg
		},
		data() {
			return {
				activeName: "first"
			};
		},
		methods: {}
	};
</script>

<style scoped>
	.RegBody {
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
	.RegBody .bodyWrap {
		width: 75rem;
		/* height: 36.875rem; */
		margin: 0 auto;
		padding-top: 1.25rem;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	
</style>
