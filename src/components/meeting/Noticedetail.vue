<template>
	<div class="Noticedetail">
		<Head />
		<div class="Noticedetail-body">
			<div class="detail-box">
				<div class="detail-box-banner">
					<el-carousel height="260px" arrow="never" indicator-position="none">
						<el-carousel-item v-for="(item, index) in bannerArr" :key="index">
							<router-link to="/">
								<div class="banner">
									<img :src="item" alt="">
								</div>
							</router-link>
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="detail-box-wrap">
					<div class="box-wrap-left">
						<div class="wrap-left-title">
							<div style="font-size: 0.875rem;line-height: 2.5;height: 1rem;">{{content.zxtype}}</div>
							<div class="title" :title="content.title">{{content.title}}</div>
							<div style="font-size: 0.875rem;line-height: 2.5;height: 1rem;width: 2.5rem;"></div>
						</div>
						<div class="wrap-left-wrap">
							<div class="left-wrap-top">
								<span>发布时间：{{content.date}}</span>
								<span style="text-align: right;">来源：{{content.zxlaiyuan}}</span>
							</div>
							<quill-editor
								v-model="content.content"
								ref="myQuillEditor"
								:options="editorOption"
								:disabled="disabled"
								@focus="onEditorFocus($event)"
								@blur="onEditorBlur($event)"
								@change="onEditorChange($event)"
								style="height: auto;">
							</quill-editor>
							<!-- <div class="left-wrap-down">公告</div> -->
							<!-- <el-button v-if="content!=``" @click="onEditorRelease">发 布</el-button> -->
						</div>
					</div>
					<div class="box-wrap-right">
						<div class="wrap-right-title">
							<div>
								<router-link to="/">返回首页</router-link>
							</div>
							<div></div>
						</div>
						<div class="wrap-right-wrap">
							<div class="right-wrap-list">
								<div class="wrap-list"  v-for="(item, index) in noticeList" :key="index" @click="itemnotice(item)">
									<div class="title">【{{item.zxtype}}】</div>
									<div class="data" v-text="item.title"></div>
								</div>
								<el-pagination
									v-if="totalCount>30"
									small
									background
									@current-change="handleCurrentChange"
									:pager-count="7"
									layout="prev, pager, next"
									:total="totalCount">
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Foot />
	</div>
</template>

<script>
	import Head from "../Head.vue";
	import Foot from "../Foot.vue";
	import { mapState, mapGetters } from "vuex";
	import Moment from "../common/moment.js"
	import banner0 from '../../assets/images/common/banner0.jpg'
	import banner1 from '../../assets/images/common/banner1.jpg'
	import banner2 from '../../assets/images/common/banner2.jpg'
	import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
	import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.bubble.css'
	export default {
		name: 'Noticedetail',
		components: {
			Head, Foot, quillEditor
		},
		data() {
			return {
				bannerArr: [banner0, banner1, banner2],
				noticeid: 0,
				editor: null,   // 富文本编辑器对象
				content: ``, // 富文本编辑器默认内容
				disabled: true, //富文本编辑器禁用
				editorOption: { //  富文本编辑器配置
					modules: {
						toolbar:[
							// [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 标题 - header
							// [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
							// [{ 'font': [] }],         //字体
							// [{'color':[]},{'background':[]}], // 字体颜色、背景颜色
							// ['bold','italic','underline','strike','blockquote','code-block'], // 加粗、倾斜、下划线、删除线、引用、代码
							// [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
							// [{ 'indent': '-1'}, { 'indent': '+1' }],	// 缩进
							// [{ 'direction': 'rtl' }],	// 文本方向
							// ['clean'],        //清除字体样式
							// [{'list':'ordered'},{'list':'bullet'}], // 列表
							// [{ 'align': [] }],        //对齐方式
							// ['link','image','video']        //上传图片、上传视频
						]
					},
					theme: 'snow',
					placeholder: '请输入正文'
				},
				noticeList: [],
				currentPage: 1,
				pagesize: 30,
				totalCount: 0,
			}
		},
		computed: {
			...mapGetters({
				token: 'getToken',
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
			})
		},
		methods: {
			onEditorReady () {
				// console.log('准备富文本编辑器',editor)
			},
			onEditorBlur () {
				// console.log('富文本编辑器 失去焦点事件',editor)
			},
			onEditorFocus () {
				// console.log('富文本编辑器 获得焦点事件',editor)
			},
			onEditorChange () {
				// console.log('富文本编辑器 内容改变事件',editor)
			},
			onEditorRelease () {
				var that = this;
				that.disabled = true;
				console.log(that.content)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.getNoticeMsgaxios();
			},
			getnoticedetail() {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/xs/notice/getNoticeDetails',
					data: {
						bsid: that.noticeid
					},
					params: '',
					headers: {
						"content-type": "application/json",
						// 'token': that.token
					}
				}).then(function(response) {
					// console.log('getnoticedetail:', response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.data;
						data.zxtype = that.findDmMap['m_zxlbdm'][data.types];
						data.zxlaiyuan = that.findDmMap['m_zxlydm'][data.zxly];
						data.date = Moment.formatDate3(data.releaseTime);
						that.content = data;
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
			getNoticeMsgaxios() {
				var that = this;
				that.axios({
					method: "post",
					url: "/api/xs/notice/getNoticeMsgWeb",
					data: {
						page: that.currentPage,
						limit: that.pagesize
					},
					headers: {
						"content-type": "application/json"
					}
				}).then(response => {
					// console.log('getNoticeMsgaxios:',response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.page.list;
						that.totalCount = response.data.page.totalCount;
						that.noticeList = data.map(item => {
							if (item.types) {
								item.zxtype = this.findDmMap['m_zxlbdm'][item.types];
								return item;
							} else {
								item.zxtype = '';
								return item
							}
						});
					}
				}).catch(error => {
					console.log(error);
				});
			},
			itemnotice(item) {
				this.noticeid = item.bsid;
				this.getnoticedetail();
			},
		},
		mounted() {
			this.editor = this.$refs.myQuillEditor.quill;
		},
		beforeDestroy() {
			this.editor = null;
			delete this.editor;
		},
		created() {
			var that = this;
			var path = that.$route;
			if (path.query.noticeid) {
				that.noticeid = path.query.noticeid;
				that.getnoticedetail();
			}
			that.getNoticeMsgaxios();
		},
	}
</script>

<style scoped>
	.Noticedetail .Noticedetail-body {
		margin-top: 7.5rem;
		padding-top: 1.25rem;
		border-top: 0.0625rem solid transparent;
	}
	.Noticedetail-body .detail-box {
		width: 75rem;
		margin: 0.625rem auto;
	}
	.detail-box .detail-box-banner .banner {
		width: 75rem;
		height: 16.25rem;
	}
	.banner img {
		width: 100%;
		height: 100%;
	}
	.detail-box .detail-box-wrap {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-top: 0.625rem;
	}
	.detail-box-wrap .wrap-left-title, .detail-box-wrap .wrap-right-title {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		font-size: 1.25rem;
		color: rgba(80, 80, 80, 1);
		font-weight: bold;
		border-bottom: 0.0625rem solid rgba(153, 153, 153, 1);
		padding: 0.625rem 0.625rem 0.625rem 1.25rem;
	}
	.detail-box-wrap .wrap-left-title .title {
		width: 37.5rem;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.detail-box-wrap .wrap-right-title a {
		font-size: 1.25rem;
		color: rgba(80, 80, 80, 1);
		font-weight: bold;
	}
	.detail-box-wrap .box-wrap-left {
		width: 50.75rem;
		border: 1px solid rgba(229, 229, 229, 1);
		position: relative;
	}
	/deep/ .ql-toolbar.ql-snow {
		border-left: none;
		border-right: none;
		display: none!important;
	}
	/deep/ .ql-container.ql-snow {
		border: none;
	}
	/* .box-wrap-left .wrap-left-wrap .el-button {
		position: absolute;
		right: 1.25rem;
		bottom: 1.25rem;
		width: 6.25rem;
	} */
	.wrap-left-wrap .left-wrap-top, .wrap-left-wrap .left-wrap-down {
		padding: 0 0.9375rem;
		font-size: 0.8125rem;
	}
	.wrap-left-wrap .left-wrap-top {
		padding-top: 0.625rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-around;
	}
	.wrap-left-wrap .left-wrap-top span {
		width: 8.75rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.detail-box-wrap .box-wrap-right {
		width: 23.75rem;
		height: 54.0625rem;
		border: 1px solid rgba(229, 229, 229, 1);
	}
	.box-wrap-right .wrap-right-wrap .right-wrap-list {
		padding: 0.5rem;
		height: 50rem;
		position: relative;
	}
	.right-wrap-list .wrap-list {
		
	}
	.wrap-list .title, .wrap-list .data {
		display: inline-block;
		font-size: 0.875rem;
		margin-bottom: 0.1875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	.wrap-list .title {
		width: 3.75rem;
	}
	.wrap-list .data {
		width: 18.75rem;
	}
	.wrap-list:hover .data, .wrap-list:hover .title {
		text-decoration: underline;
		color: #FF5656;
	}
	.box-wrap-right .el-pagination {
		padding: 0.3125rem 0 0;
		position: absolute;
		bottom: 0.3125rem;
		margin: 0;
		left: 0;
		right: 0;
		background-color: #F6F6F8;
	}
	/deep/ .el-pager li.active {
		color: #fff!important;
		cursor: default;
		background-color: #FC5E5B!important;
	}
	/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
		color: #FC5E5B!important;
	}
</style>
