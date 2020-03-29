<template>
	<div class="Jobclassification">
		<div class="jobclasslist">
			<ul v-if="JobCategoryFirstList&&JobCategorySecondList&&JobCategoryThirdList">
				<li  v-for="(item, index) in JobCategoryFirstList.slice(0, 12)" :key="index"  @mouseover="mouseover(item.dm)"  @mouseout="mouseLeave">
					<span class="vertical-list-class" v-text="item.name"></span>
					<span v-if="JobCategorySecondList[item.dm]"><span class="vertical-list-class vertical-smalllist-class" v-for="(titletab, index__) in JobCategorySecondList[item.dm].slice(0, 2)" :key="index__" v-text="titletab.name"></span></span>
					<!--  -->
					<i class="el-icon-arrow-right"></i>
					<div class="showjobcut" v-show="showright == item.dm">
						<el-form status-icon label-position="left" label-width="140px" class="demo-ruleForm">
							<el-form-item :label="tab.name" v-for="(tab, index_) in JobCategorySecondList[item.dm]" :key="index_">
								<div class="popover-wrap-wrap">
									<a v-for="(tabs, index__) in JobCategoryThirdList[tab.dm]" :key="index__">
										<div v-text="tabs.name" @click="JobCategoryThirdShow(item, tab, tabs)"></div>
									</a>
								</div>
							</el-form-item>
						</el-form>
					</div>
				</li>
			</ul>
			<div v-if="JobCategoryFirstList&&JobCategorySecondList&&JobCategoryThirdList" class="alllist">
				<router-link to="/public/jobretrieve?val=1">查看更多</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'Jobclassification',
		data() {
			return {
				showright: '',
			}
		},
		computed: {
			...mapState({
				JobCategoryFirstList: state => state.JobCategoryFirstList,
				JobCategorySecondList: state => state.JobCategorySecondList,
				JobCategoryThirdList: state => state.JobCategoryThirdList,
			})
		},
		methods: {
			mouseover(item){//移进显示
				var that = this;
				that.showright = item;
			},
			mouseLeave(){//移出不显示
				var that = this;
				that.showright = '';
			},
			JobCategoryThirdShow (item, tab, tabs) {
				this.$router.push({
					path: "/public/jobretrieve",
					query: {
						val: 1,
						pid: tabs.dm,
						pname: encodeURIComponent(tabs.name)
					}
				});
				console.log(item, tab, tabs);
			},
		},
		created() {},
	}
</script>

<style scoped>
	.Jobclassification {
		
	}
	.Jobclassification .jobclasslist {
		height: 435px;
		line-height: 34px;
		vertical-align: top;
		overflow: hidden;
	}
	.jobclasslist li {
		overflow: hidden;
		padding: 0 15px;
		cursor: pointer;
		height: 33px;
	}
	.jobclasslist li:hover {
		background-color:rgb(249, 249, 249);
		padding-left: 18px;
		border-left: 5px solid #FF5656;
	}
	.jobclasslist .vertical-list-class {
		font-weight: bold;
		margin-right: 1.25rem;
	}
	.jobclasslist .vertical-smalllist-class {
		font-weight: 500;
		font-size: 14px;
		margin-right: 1.25rem;
	}
	.vertical-smalllist-class:hover {
		color: #FF5656;
	}
	.jobclasslist li i {
		float: right;
		line-height: 2;
	}
	.jobclasslist .showjobcut {
		overflow: hidden;
		width: 835px;
		min-height: 415px;
		padding: 10px;
		background: rgb(249, 249, 249);
		left: 345px;
		top: 0;
		z-index: 1000;
		position: absolute;
		line-height: 20px;
	}
	.jobclasslist .popover-wrap-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	.popover-wrap-wrap div {
		margin-right: 15px;
		height: 30px;
		color: #606266;
	}
	.popover-wrap-wrap div:hover {
		color: #FF5656;
	}
	.jobclasslist .alllist {
		position: absolute;
		top: 395px;
		left: 0;
		width: 350px;
		text-align: center;
		background-color: #FFFFFF;
	}
	.alllist a {
		color: #606266;
	}
	.jobclasslist .alllist:hover {
		background-color: #CCCCCC;
	}
	.el-form-item {
		margin-bottom: 0;
	}
	.el-form-item:hover {
		background-color: #FFFFFF;
	}
	/deep/ .el-form-item__label {
		font-weight: bold;
	}
	.el-form-item__content {
		
	}
	
	
	
	
</style>
