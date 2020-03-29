<template>
	<div class="foot">
		<div class="footer">
			<div class="footer-wrap">
				<div class="footer-left">
					<div class="foot-title">
						<span>关于我们</span>
						<span>客户中心</span>
						<span>帮助中心</span>
						<span>发票制度</span>
					</div>
					<div class="foot-question">
						<p class="question">什么是网络双选会？</p>
						<div class="answer" title="空中视频双选会是全方位地线上模拟现场的招聘活动，单位和人才通过视频系统进行文字、音频、视频沟通面试，到达单位招聘人才和人才找到工作的效果">空中视频双选会是全方位地线上模拟现场的招聘活动，单位和人才通过视频系统进行文字、音频、视频沟通面试，到达单位招聘人才和人才找到工作的效果</div>
					</div>
					<div class="foot-contact">
						<span style="margin-right: 1.5625rem;">
							<img src="../assets/images/common/icon15.svg" alt=""> 联系电话：027-87711410
						</span>
						<span>
							<img src="../assets/images/common/icon16.svg" alt=""> 联系邮箱：fuzheng@91boshuo.com
						</span>
					</div>
				</div>
				<div class="footer-right">
					<div class="footer-right-top">
						<div class="foot-weibo">
							<div class="foot-weibo-title">官方微博</div>
							<div class="foot-weibo-ico"></div>
						</div>
						<div class="foot-wechat">
							<div class="foot-wechat-title">微信公众号</div>
							<div class="foot-wechat-ico"></div>
						</div>
						<div class="foot-wechatapplet-ent">
							<div class="foot-wechatapplet-ent-title">微信小程序企业端</div>
							<div class="foot-wechatapplet-ent-ico"></div>
						</div>
						<div class="foot-wechatapplet-qz">
							<div class="foot-wechatapplet-qz-title">微信小程序-求职端</div>
							<div class="foot-wechatapplet-qz-ico"></div>
						</div>
					</div>
					<div class="footer-right-down">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
			<div class="footer-down">
				<span>Copyringht © </span>
				<span>2008 - 2020 </span>
				<span>中研博硕英才网版权所有 </span>
				<span><a href="http://www.beian.miit.gov.cn" target="_blank">鄂ICP备15017215号</a> </span>
				<span>免责声明</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Foot',
		data() {
			return {
				
			}
		},
		methods: {}
	}
</script>

<style scoped>
	.foot {
		width: 100%; 
		min-width: 1280px;
		padding: 0.875rem 0;
		margin-top: 1rem;
		background-color: #ffffff;
		box-shadow: 0.625rem 0 0.3125rem #d8d8d8;
		color: #a5a5a5;
	}
	.foot .footer {
		width: 75rem;
		margin: 0 auto;
	}
	.footer .footer-wrap {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
	}
	.footer .footer-wrap::after {
		clear: both;
	}
	.footer-wrap .footer-left, .footer-wrap .footer-right {
		width: 50%;
		color: #a5a5a5;
		font-size: 0.875rem;
		position: relative;
	}
	.footer-left .foot-title span {
		width: 6.375rem;
		display: inline-block;
		margin-bottom: 0.625rem;
	}
	.footer-left .foot-question {
		margin-bottom: 0.625rem;
	}
	.foot-question .question {}
	.foot-question .answer {
		width: 36.875rem;
		text-indent: 2rem;
		overflow: hidden;
		display:-webkit-box;
		-webkit-line-clamp:4;
		-webkit-box-orient:vertical;
	}
	.footer-left .foot-contact {
		position: absolute;
		bottom: 0;
	}
	.footer-left .foot-contact img {
		width: 1.5rem;
		height: 1.5rem;
		position: relative;
		top: -0.0625rem;
		vertical-align: middle;
	}
	
	.footer-wrap .footer-right .footer-right-top {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	.footer-wrap .footer-right .footer-right-down {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.footer-right-down div {
		width: 5rem;
		height: 2.1875rem;
		margin-right: 0.75rem;
		margin-top: 0.3125rem;
		border:1px solid rgb(224, 224, 224);
		background-color: rgb(239, 239, 239);
	}
	.footer-right .foot-weibo-ico, .footer-right .foot-wechat-ico, .footer-right .foot-wechatapplet-ent-ico, .footer-right .foot-wechatapplet-qz-ico {
		width: 6.375rem;
		height: 6.375rem;
		margin-top: 0.625rem;
		background-color: rgb(239, 239, 239);
	}
	.foot-weibo-ico{
		background: url(../assets/images/common/img5111700034aca8.png) center/cover no-repeat;
	}
	.foot-wechat-ico{
		background: url(../assets/images/common/img5111700034aca8.png) center/cover no-repeat;
	}
	.foot-wechatapplet-ent-ico{
		background: url(../assets/images/common/img5111700034aca8.png) center/cover no-repeat;
	}
	.foot-wechatapplet-qz-ico{
		background: url(../assets/images/common/img5111700034aca8.png) center/cover no-repeat;
	}
	.footer-right-down div:nth-child(1) {
		background: url(../assets/images/common/copyringht1.png) center/cover no-repeat;
	}
	.footer-right-down div:nth-child(2) {
		background: url(../assets/images/common/copyringht2.png) center/cover no-repeat;
	}
	.footer-right-down div:nth-child(3) {
		background: url(../assets/images/common/copyringht3.png) center/cover no-repeat;
	}
	
	
	.footer .footer-down {
		text-align: center;
		padding: 2.5rem  0  1rem  0;
	}
	.footer .footer-down span, .footer-down span a {
		margin-right: 0.3125rem;
		color: #a5a5a5;
		font-size: 0.875rem;
	}
</style>
