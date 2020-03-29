<template>
	<div class="Talenthall">
		<!-- 人才 -->
		<div class="body-wrap-4">
			<div class="wrap-4-title"></div>
			<div class="wrap-4-wrap">
				<el-tabs v-model="enterActiveName">
					<el-tab-pane label="热招人才" name="first">
						<div class="wrap-list"  v-for="item in 5" :key="item">
							<div class="enter-title">
								<img class="enter-star" src="../../assets/images/common/star-off.png" alt="">
								<!-- <img class="enter-star" src="../../assets/images/common/star-on.png" alt=""> -->
								<img class="enter-headimg" src="../../assets/images/common/enter.png" alt="">
								<div class="enter-name">
									<div class="enter-name-list">应聘岗位：咨询经理</div>
									<div class="enter-name-list">韩美娟<span>|</span>女<span>|</span>25岁</div>
									<div class="enter-name-list">本科<span>|</span>2年以上</div>
								</div>
							</div>
							<div class="enter-detail">
								<div class="enter-jobs">
									<router-link to="">
										<img src="../../assets/images/common/shipin-red.png" alt="">
										<!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
										<!-- <img src="../../assets/images/common/shipin-grey.png" alt=""> -->
										立即沟通
									</router-link>
								</div>
							</div>
						</div>
						<div style="width: 75rem;">
							<div class="wrap-seeall">查看更多 <i class="el-icon-caret-bottom"></i></div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Talenthall',
		components:{},
		data() {
			return{
				enterActiveName: "first",
			}
		},
		methods: {},
	}
</script>

<style scoped>
	.body-wrap-4 .wrap-4-wrap .el-tab-pane {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		-ms-flex-pack: distribute;
	}
	.body-wrap-4 .wrap-4-wrap {
		margin: 0 0 2.5rem ;
	}
	.body-wrap-4 .wrap-4-wrap .wrap-list {
		width: 21.875rem;
		padding: 0.9375rem;
		margin-right: 1.875rem;
		margin-bottom: 1.25rem;
		overflow: hidden;
		font-size: 0.9375rem;
		background-color: #FFFFFF;
		position: relative;
	}
	.wrap-4-wrap .wrap-list .enter-title  {
		color: rgb(58, 58, 58);
		text-align: center;
	}
	.wrap-4-wrap .wrap-list .enter-headimg {
		width: 5.625rem;
		height: 5.625rem;
		margin-bottom: 0.3125rem;
		border-radius: 0.625rem;
		overflow: hidden;
	}
	.wrap-4-wrap .wrap-list .enter-name {
		width: 100%;
		position: relative;
		color: rgb(144, 144, 144);
		margin-bottom: 0.9375rem;
	}
	.wrap-4-wrap .wrap-list .enter-star {
		width: 1.875rem;
		height: 1.875rem;
		position: absolute;
		right: 0.9375rem;
		top: 0.9375rem;
	}
	.wrap-4-wrap .wrap-list .enter-name .enter-name-list {
		margin-bottom: 0.3125rem;
		font-size: 1rem;
		color: #5d5d5d;
		font-weight: 600;
	}
	.enter-name .enter-name-list:first-child {
		color: rgb(255, 107, 102)!important;
	} 
	.enter-name .enter-name-list:last-child {
		color: rgb(138, 137, 137)!important;
	} 
	.enter-name .enter-name-list span {
		margin: 0 0.3125rem;
		vertical-align: text-bottom;
	}
	.wrap-4-wrap .wrap-list .enter-jobs {
		border: 0.0625rem solid rgba(255, 8, 0, 0.5);
		width: 18.75rem;
		line-height: 3;
		margin: 0 auto;
		text-align: center;
		
	}
	.enter-jobs a {
		font-size: 1.0625rem;
		font-weight: bold;
		color: rgba(255, 8, 0, 0.5);
	}
	.wrap-4-wrap .wrap-list .enter-jobs img {
		width: 1.5625rem;
		height: 1.3125rem;
		margin: 0;
	}
	.body-wrap-4 .wrap-4-wrap .wrap-list:nth-child(3n) {
		margin-right: 0;
	}
	.body-wrap-4 .wrap-4-wrap .wrap-seeall {
		width: 22.5rem;
		height: 1.5625rem;
		margin: 0.625rem auto 0;
		text-align: center;
		font-size: 0.9375rem;
		color: rgba(255, 8, 0, 0.5);
		line-height: 1.5625rem;
		border: 0.0625rem solid rgba(255, 8, 0, 0.5);
		cursor: pointer;
	}
</style>
