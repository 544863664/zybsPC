<!-- 资产信息 -->
<template>
    <div class="asset">
		<!-- 账户信息 -->
        <div class="block">
			<p class="title">账户信息</p>
			<div class="con">
				<p>
					账户余额：<span class="font-red">20000</span>
					会员等级：<span class="val">金牌会员</span>
				</p>
				<p class="pad_top">
					账户有效期：
					<el-date-picker
						type="date"
						placeholder="开始时间">
					</el-date-picker>
					<span class="line">至</span>
					<el-date-picker
						type="date"
						placeholder="结束时间">
					</el-date-picker>
				</p>
			</div>
		</div>
		<!-- 资产信息 -->
        <div class="block">
			<p class="title">资产信息</p>
			<div class="con">
				<ul class="col2">
					<li>
						赠送职位置顶数：<span class="red">1000</span>个
					</li>
					<li>
						赠送职位置顶数剩余：<span class="red">1000</span>个
					</li>
					<li>
						赠送下载简历数：<span class="red">1000</span>个
					</li>
					<li>
						赠送下载简历数剩余：<span class="red">1000</span>个
					</li>
					<li>
						发布职位数：<span class="red">1000</span>个
					</li>
					<li>
						发布职位数剩余：<span class="red">1000</span>个
					</li>
					<li>
						下载简历数：<span class="red">1000</span>个
					</li>
					<li>
						下载简历数剩余：<span class="red">1000</span>个
					</li>
					<li>
						刷新岗位：<span class="red">1000</span>个
					</li>
					<li>
						刷新岗位剩余：<span class="red">1000</span>个
					</li>
					<li>
						置顶岗位：<span class="red">1000</span>个
					</li>
					<li>
						置顶岗位剩余：<span class="red">1000</span>个
					</li>
					<li>
						线下参会：<span class="red">1000</span>次
					</li>
					<li>
						线下参会剩余：<span class="red">1000</span>次
					</li>
					<li>
						线上参会：<span class="red">1000</span>次
					</li>
					<li>
						线上参会剩余：<span class="red">1000</span>次
					</li>
				</ul>
			</div>
        </div>
		<!-- 音视频流量 -->
        <div class="block">
			<p class="title">音视频流量</p>
			<div class="con">
				<ul class="col2 col3">
					<li>
						720P视频时长：<span class="red">1000</span>分钟
					</li>
					<li>
						720P视频时长：<span class="red">1000</span>分钟
					</li>
					<li>
						720P视频时长：<span class="red">1000</span>分钟
					</li>
					<li>
						720P视频时长：<span class="red">1000</span>分钟
					</li>
					<li>
						720P视频时长：<span class="red">1000</span>分钟
					</li>
					<li>
						720P视频时长：<span class="red">1000</span>分钟
					</li>
				</ul>
			</div>
			<div class="con_tip">
				<p class="p1"> 温馨提示：</p>
				<p>套餐包分钟数按视频720P及以下规格计算，其他规格抵扣规则为：</p>
				<p>4分钟语音通话抵扣1分钟套餐包时长</p>
				<p>2分钟视频360P及以下抵扣1分钟套餐包时长。</p>
				<p>求职者和和HR主动发面试视频，HR也可以和已沟通的求职发面试视频：</p>
				<p>超出部分费用由HR支付，时长到了会提醒，超过了20分钟，提醒支付。</p>
				
			</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex'

export default {
	name: 'Enter_assets',
	components: {
	},
	data() {
		return {
		};
	},
	created() {
	},
	updated(){
	},
	computed: {
        ...mapGetters({
            'token': 'getToken'
        }),
		...mapState({
			findDmMap: state => state.findDmMap,
			findDmList: state => state.findDmList,
		})
	},
	methods: {
	}
};
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner { 
    border: 1px solid #E6E6E6;
}
/deep/.el-input__inner {
    border: 0;
    width: 200px;
    padding-left: 10px;
	height: 30px;
	line-height: 30px;
}
/deep/.el-input__icon{
	line-height: 30px;
}
/deep/.el-input__prefix{
    left: 192px;
}
.line{
	padding: 0 20px;
}
.asset{

}
.block{
	background: #fff;
	padding: 20px;
	font-size: 14px;
	margin-bottom: 20px;
}
.title{
	font-size: 16px;
	color: #303133;
	font-weight: bold;
	position: relative;
	padding-left: 10px;
}
.title::before{
	content: '';
	position: absolute;
	left: 0;
	top: 4px;
	width: 2px;
	height: 15px;
	background: #FC5E5B;
}
.con{
	color: #606266;
	line-height: 30px;
	padding:10px;
}
.con .font-red{
	margin-right: 80px;
}
.con .val{
	color: #303133;
}
.pad_top{
	padding-top: 10px;
}
.con .col2{
	overflow: auto;
}
.con .col2 li{
	width: 33%;
	float: left;
    line-height: 35px;
}
.con .col2 li .red{
	color: #FC5E5B;
}
.con .col3 li{
	width: 50%;
}
.con_tip {  
	font-size: 12px;
	color: #FC5E5B;
	line-height: 20px;
	margin-top: 20px;
}
.con_tip .p1{  
	padding-left: 20px;
	background: url("../../../assets/images/enter/Icon-warning.png") 0 center no-repeat;
}
</style>
