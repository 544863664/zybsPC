<!-- 职位管理-新增 -->
<template>
	<div class="post">

		<Head />
		<div class="body">
			<h1 class="title">
				岗位管理-新增职位
				<span class="title_tip" v-if="shzt!=1">企业信息审核未完成，岗位无法提交审核，可以保存为草稿；请您及时完善并提交企业信息。</span>
				<router-link to="/Enter_home/Enter_post" class="new_return">返回</router-link>
			</h1>
			<p class="p_title">
				岗位信息
			</p>
			<div class="p_con">
				<el-form ref="form" :model="form" :rules="dataRule" label-width="130px" :inline='true'>
					<el-row :gutter="0">
						<el-col style="width: 1200px;">
							<el-form-item label="会议名称">
								<el-select v-model="form.hxid" filterable clearable placeholder="请选择" style="width: 900px;" multiple>
									<el-option v-for="item in dataList" :key="item.hxid" :label="item.hymc" :value="item.hxid">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col style="width: 520px;">
							<el-form-item label="岗位名称" prop="gwmc">
								<el-input placeholder="请输入职位名称" v-model="form.gwmc" clearable style="width: 380px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="width: 600px;">
							<el-form-item label="岗位类型" :required="true">
								<p class="col_select" :class="post.value == '请选择'?'gray':''" @click="post.dialog = true" style="width: 380px;">
									{{post.value}}
									<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
								</p>
							</el-form-item>
						</el-col>
						<el-col style="width: 520px;">
							<el-form-item label="薪资范围" prop="gwyx">
								<el-select v-model="form.gwyx" filterable clearable placeholder="请选择" style="width: 380px;">
									<el-option v-for="item in findDmList.m_xzdydm" :key="item.dm" :label="item.name" :value="item.dm">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col style="width: 600px;">
							<el-form-item label="工作性质" prop="gwgzxz">
								<el-radio-group v-model="form.gwgzxz" size="small" style="width: 380px;">
									<el-radio :label="item.dm" border v-for="(item,i) in findDmList.m_gwgzxzdm" :key="i">{{item.name}}
									</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col style="width: 520px">
							<el-form-item label="学历要求" prop="xlyq">
								<el-select v-model="form.xlyq" filterable clearable placeholder="请选择" style="width: 380px;">
									<el-option v-for="item in findDmList.m_xldm" :key="item.dm" :label="item.name" :value="item.dm">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col style="width: 600px">
							<el-form-item label="经验要求" prop="jyyq">
								<el-select v-model="form.jyyq" filterable clearable placeholder="请选择" style="width: 380px;">
									<el-option v-for="item in findDmList.m_jyyqdm" :key="item.dm" :label="item.name" :value="item.dm">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col style="width: 1200px">
							<el-form-item label="工作地址" prop="sbxxdz">
								<p class="col_select" :class="city.value == '请选择'?'gray':''" @click="city.dialog = true">
									{{city.value}}
									<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
								</p>
								<el-input v-model="form.sbxxdz" placeholder="请输入详细地址" style="width: 580px;vertical-align: bottom;"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="width: 1200px">
							<el-form-item label="技能要求">
								<el-input placeholder="请输入技能要求" v-model="form.jnyq" clearable style="width: 900px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="width: 1200px">
							<el-form-item label="岗位福利" class="gwfl_form">
								<p class="col_select" :class="postfl.value == '请选择'?'gray':''" @click="postfl.dialog = true">
									{{postfl.value}}
									<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
								</p>
								<p class="tip">选择职位亮点，提升职位吸引力，有效增加职位投递！（最多可选择8个）</p>
							</el-form-item>
						</el-col>
						<el-col style="width: 1200px">
							<el-form-item label="岗位描述" prop="gwms" class="gwms_info">
								<el-input type="textarea" style="width:900px !important" v-model="form.gwms" placeholder="输入内容（0/2000）"
									show-word-limit maxlength="2000">
								</el-input>
								<p class="tip">( 请勿输入公司邮箱、联系电话、薪资面议、性别歧视字样及其他外链，否则将自动删除，不可恢复。)</p>
							</el-form-item>
						</el-col>
					</el-row>
					
					
				</el-form>
			</div>

			<p class="p_title">
				部门信息
			</p>
			<div class="p_con">
				<el-form ref="msgForm" :inline="true" :model="msgForm" :rules="msgRule" label-width="130px">
					<el-row :gutter="0">
						<el-col style="width: 520px;">
							<el-form-item label="招聘人数" prop="zprs">
								<el-input type="number" v-model.number="msgForm.zprs" placeholder="请输入招聘人数" style="width: 355px;"></el-input>
								<span style="margin-left: 0.625rem;">人</span>
							</el-form-item>
						</el-col>
						<el-col style="width: 600px;">
							<el-form-item label="发布时长" prop="fbsc">
								<el-input type="number" v-model.number="msgForm.fbsc" placeholder="请输入发布时长" style="width: 355px;"></el-input>
								<span style="margin-left: 0.625rem;">天</span>
							</el-form-item>
						</el-col>
						<el-col style="width: 520px;">
							<el-form-item label="所属部门" prop="ssbm">
								<el-input v-model="msgForm.ssbm" placeholder="请输入所属部门" clearable style="width: 380px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="width: 600px;">
							<el-form-item label="转发简历至邮箱" prop="yx">
								<el-input v-model="msgForm.yx" placeholder="验证邮箱" clearable style="width: 380px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<p class="p_title">
				简历过滤设置
			</p>
			<div class="p_con">
				<el-form ref="filtForm" label-width="130px" class="set_form">
					<el-row :gutter="0">
						<el-col style="width: 1200px;">
							<el-form-item label="简历过滤器">
								<span class="s1" @click="dialogVisible = true">设置</span>
								<span class="s2">只接收满足设置条件的简历，只有发布者可以看到</span>
							</el-form-item>
						</el-col>
						<el-col style="width: 1200px;">
							<el-form-item label="职位排序">
								<el-input type="number" v-model.number="filtForm.zwpx" placeholder="请输入职位排序" style="width: 900px;"></el-input>
								<p class="tip">如果不设置，按照发布日期排序；同一个单位内排序</p>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<p class="p_title">岗位置顶设置</p>
			<div class="p_con text-center">
				<el-radio-group v-model="sfzd" size="small">
					<el-radio label="1" border>置顶</el-radio>
					<el-radio label="0" border>取消置顶</el-radio>
				</el-radio-group>
			</div>
			<div class="p_con text-center">
				<el-button type="danger" @click="publishData(1)">发布</el-button>
				<!-- <el-button type="danger" v-else @click="updateData()">更新</el-button> -->
				<el-button type="danger" @click="publishData(0)">保存草稿</el-button>
				<!-- <el-button type="danger">发布预览</el-button> -->
				<el-button type="danger" plain @click="returnPage()">返回</el-button>
			</div>
			<div class="p_con text-center">
				<span class="new_add" @click="newPost">新增一个岗位</span>
			</div>

			<!-- 设置弹出框 -->
			<el-dialog title="请设置简历过滤器" :visible.sync="dialogVisible" :lock-scroll="true" :show-close="true" :modal="false"
				width="700px">
				<div class="dialog_con">
					<p class="tip">该设置不公开展示， 只接收满足设置条件的简历</p>
					<el-form ref="setForm" label-width="130px">
						<el-form-item label="年龄要求：">
							<el-input type="number" v-model.number="setForm.nlmin" placeholder="最小年龄"></el-input>
							<span class="area">至</span>
							<el-input type="number" v-model.number="setForm.nlmax" placeholder="最大年龄"></el-input>
							<span style="margin-left: 10px">岁</span>
						</el-form-item>
						<el-form-item label="学历要求：">
							<el-select v-model="setForm.xlmin" placeholder="最低学历" class="small">
								<el-option v-for="item in findDmList.m_xldm" :key="item.dm" :label="item.name" :value="item.dm">
								</el-option>
							</el-select>
							<span class="area">至</span>
							<el-select v-model="setForm.xlmax" placeholder="最高学历" class="small">
								<el-option v-for="item in findDmList.m_xldm" :key="item.dm" :label="item.name" :value="item.dm">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工作经验：">
							<el-input type="number" v-model.number="setForm.gznxmin" placeholder="最小年限"></el-input>
							<span class="area">至</span>
							<el-input type="number" v-model.number="setForm.gznxmax" placeholder="最大年限"></el-input>
							<span style="margin-left: 10px">年</span>
						</el-form-item>
						<el-form-item label="现所在地区：">
							<p class="col_select" :class="city.value == '请选择'?'gray':''" @click="city.dialog = true">
								{{city.value}}
								<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
							</p>
						</el-form-item>
						<el-form-item label="户口所在地：">
							<p class="col_select" :class="city.value == '请选择'?'gray':''" @click="city.dialog = true">
								{{city.value}}
								<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
							</p>
						</el-form-item>
						<el-form-item label="婚姻状况：">
							<el-radio-group v-model="setForm.hyzk" size="small">
								<el-radio :label="item.dm" v-for="(item,i) in findDmList.m_hyzkdm" :key='i' border>{{item.name}}
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="性别要求：">
							<el-radio-group v-model="setForm.xb" size="small">
								<el-radio :label="item.dm" v-for="(item,i) in findDmList.m_xbdm" :key='i' border>{{item.name}}
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="简历语言：">
              <el-radio-group v-model="hyzk" size="small">
                <el-radio label="1" border>不限</el-radio>
                <el-radio label="2" border>中文</el-radio>
                <el-radio label="3" border>英文</el-radio>
                <el-radio label="3" border>中/英文</el-radio>
              </el-radio-group>
            </el-form-item> -->
						<el-form-item label="">
							<el-checkbox v-model="setForm.sfmb">同时保存偏好设置为模板</el-checkbox>
						</el-form-item>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="danger" plain @click="dialogVisible = false">取 消</el-button>
					<el-button type="danger" @click="filterData()">确 定</el-button>
				</span>
			</el-dialog>

		</div>

		<!-- 行业弹出框 -->
		<trade :venue-dialog-visible="trade.dialog" @change="changeTrade" @close="closeTrade"></trade>

		<!-- 职位弹出框 -->
		<post :venue-dialog-visible="post.dialog" @change="changePost" @close="closePost"></post>

		<!-- 城市弹出框 -->
		<city :venue-dialog-visible="city.dialog" :level="2" @change="changeCity" @close="closeCity"></city>

		<!-- 岗位福利弹出框 -->
		<postfl :venue-dialog-visible="postfl.dialog" @change="changePostfl" @close="closePostfl"></postfl>

		<Foot />
	</div>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import {
		mapGetters
	} from "vuex";
	import Head from "../../Head.vue";
	import Foot from "../../Foot.vue";
	import Trade from '../../common/Trade'
	import Post from '../../common/Post'
	import City from '../../common/City'
	import Postfl from '../../common/PostFL'

	export default {
		name: "Enter_postcreate",
		components: {
			Head,
			Foot,
			Trade,
			Post,
			City,
			Postfl
		},
		data() {
			var checkEmail = (rule, value, callback) => {
				const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				/* if (!value) {
				  return callback(new Error('邮箱不能为空!'));
				} */
				setTimeout(() => {
					if (mailReg.test(value)) {
						callback();
					} else {
						callback(new Error('请输入正确的邮箱格式!'));
					}
				}, 100)
			};
			return {
				dataList: [], // 双选会列表
				form: {
					value: '',
					hxid: '',
					gwmc: '',
					gwlbo: '',
					gwlbt: '',
					gwlb: '',
					gwgzxz: 'gx_001',
					sbsf: '',
					sbcs: '',
					sbxq: '',
					sbxxdz: '',
					gwyx: '',
					xlyq: '',
					jyyq: '',
					gwms: '',
					jnyq: '',
					flids: []
				},
				dataRule: {
					gwmc: [{
						required: true,
						message: "标题不能为空",
						trigger: "blur"
					}],
					gwgzxz: [{
						required: true,
						message: "工作性质不能为空",
						trigger: "blur"
					}],
					sbxxdz: [{
						required: true,
						message: "详细地址不能为空",
						trigger: "blur"
					}],
					gwyx: [{
						required: true,
						message: "薪资范围不能为空",
						trigger: "blur"
					}],
					xlyq: [{
						required: true,
						message: "学历要求不能为空",
						trigger: "blur"
					}],
					jyyq: [{
						required: true,
						message: "经验要求不能为空",
						trigger: "blur"
					}],
					gwms: [{
						required: true,
						message: "岗位描述不能为空",
						trigger: "blur"
					}]
				},
				msgForm: {
					zprs: '',
					ssbm: '',
					fbsc: '',
					yx: ''
				},
				msgRule: {
					zprs: [{
						required: true,
						message: "招聘人数不能为空",
						trigger: "blur"
					}],
					ssbm: [{
						required: true,
						message: "所属部门不能为空",
						trigger: "blur"
					}],
					fbsc: [{
						required: true,
						message: "发布时长不能为空",
						trigger: "blur"
					}],
					yx: [{
						required: true,
						validator: checkEmail,
						trigger: 'blur'
					}]
				},
				filtForm: {
					zwpx: ''
				},
				sfzd: '1', // 是否置顶
				// typeBtn: 0, // 按钮切换
				itemObj: {},
				setForm: {
					nlmin: '',
					nlmax: '',
					xlmin: '',
					xlmax: '',
					gznxmin: '',
					gznxmax: '',
					hyzk: 'hy_001',
					xb: 'xb_001',
				},
				// 行业
				trade: {
					dialog: false,
					value: '请选择'
				},
				// 岗位福利
				postfl: {
					dialog: false,
					value: '请选择',
					id: [],
					list: []
				},
				// 职位
				post: {
					dialog: false,
					value: '请选择'
				},
				// 城市
				city: {
					dialog: false,
					value: '请选择'
				},
				hyzk: '1',
				szmb: false,
				value: [],
				// 设置弹出框
				dialogVisible: false,
				// 是否点击了新增一个岗位
				isSave: false,
				shzt: 1,
				spzt: null
			};
		},
		created() {
			this.getqyshzt();
			this.meetingList();
			
			if (this.$route.query.gwid) {
				this.renderData();
			}
		},
		computed: {
			...mapGetters({
				token: "getToken"
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				findDmList: state => state.findDmList,
				JobCategoryFirstMap: state => state.JobCategoryFirstMap,
				JobCategorySecondMap: state => state.JobCategorySecondMap,
				JobCategoryThirdMap: state => state.JobCategoryThirdMap,
				ProvinceMap: state => state.ProvinceMap,
				CityMap: state => state.CityMap,
			})
		},
		methods: {
			getqyshzt() {
				this.axios({
					method: "post",
					url: "/api/hr/bskhgl/findDwInfoHr",
					headers: {
						token: this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code == 0) {
						this.shzt = res.data.shzt;
						this.sqzt = res.data.sqzt;
					}
				});
			},
			handleChange(value) {
				console.log(value);
			},
			// 获取行业选择值
			changeTrade(obj) {
				console.log(obj)
			},
			// 关闭行业弹出框
			closeTrade() {
				this.trade.dialog = false;
			},
			// 获取岗位福利选择值
			changePostfl(obj) {
				this.postfl.list = obj.list;
				this.postfl.value = obj.value.substring(0, obj.value.length - 1);
				this.postfl.id = obj.id;
				this.postfl.dialog = false;
			},
			// 关闭岗位福利弹出框
			closePostfl() {
				this.postfl.dialog = false;
			},
			// 获职位选择值
			changePost(obj) {
				this.form.gwlbo = obj.values[0];
				this.form.gwlbt = obj.values[1];
				this.form.gwlb = obj.values[2];

				this.post.value = obj.names || '请选择';
				this.post.dialog = false;
			},
			// 关闭职位弹出框
			closePost() {
				this.post.dialog = false;
			},
			// 获取城市选择值
			changeCity(obj) {
				this.form.sbsf = obj.values[0];
				this.form.sbcs = obj.values[1];

				this.city.value = obj.names || '请选择';
				this.city.dialog = false;
			},
			// 关闭城市弹出框
			closeCity() {
				this.city.dialog = false;
			},
			returnPage() {
				this.$router.push('/Enter_home/Enter_post')
			},
			/* 获取双选会列表 */
			meetingList() {
				this.axios({
					method: "post",
					url: `/api/hr/bshxxx/findYdHxPageAllListByDw`,
					headers: {
						token: this.token
					},
					params: {
						type: 1,
						limit:50
					}
				}).then(res => {
					if (res.data && res.data.code === 0) {
						this.dataList = res.data.page.list;
						if (this.$route.query.posthxid) {
							this.form.hxid = this.$route.query.posthxid;
						}
					}
				}).catch(error => {
					this.$message({
						type: 'error',
						message: error.data.msg,
						offset: 300
					});
				});
			},
			publishData(type) {
				this.isSave = true
				// let ids = ''
				// let listid= this.postfl.id
				// listid.forEach(element => {
				//   ids +=element+','
				// });  
				// ids= JSON.stringify(ids.substring(0, ids.length -1))

				this.form.filds = this.postfl.id
				this.$refs["form"].validate(valid => {
					if (valid) {
						let data = {
							hxids: this.form.hxid,  // 会议名称
							gwfls: this.form.filds,
							gwmc: this.form.gwmc,
							gwlbo: this.form.gwlbo,
							gwlbt: this.form.gwlbt,
							gwlb: this.form.gwlb,
							gwgzxz: this.form.gwgzxz,
							sbsf: this.form.sbsf,
							sbcs: this.form.sbcs,
							sbxxdz: this.form.sbxxdz,
							gwyx: this.form.gwyx,
							xlyq: this.form.xlyq,
							jyyq: this.form.jyyq,
							gwms: this.form.gwms,
							jnyq: this.form.jnyq,
							zprs: this.msgForm.zprs,
							ssbm: this.msgForm.ssbm,
							fbsc: this.msgForm.fbsc,
							jljsyx: this.msgForm.yx,
							sfzd: this.sfzd,
						};
						this.axios({
							method: "post",
							url: `/api/hr/qydwgwfbxx/addGw?type=${type}`,
							headers: {
								token: this.token
							},
							data: data
						}).then(res => {
							if (res.data && res.data.code === 0) {
								this.$router.push('/Enter_home/Enter_post');
							} else {
								this.$message({
									type: 'warning',
									message: '您的企业信息审核中（或者审核没通过）发布的岗位信息为您保存为草稿',
									offset: 300
								});
								setTimeout(function() {
									this.publishData(0);
								},3000)
								
							}
						}).catch(error => {
							this.$message({
								type: 'error',
								message: error.data.msg,
								offset: 300
							});
						});
					}
				})
			},
			/* 过滤器 */
			filterData() {
				let data = {
					nlmin: this.setForm.nlmin,
					nlmax: this.setForm.nlmax,
					xlmin: this.setForm.xlmin,
					xlmax: this.setForm.xlmax,
					gznxmin: this.setForm.gznxmin,
					gznxmax: this.setForm.gznxmax,
					hyzk: this.setForm.hyzk,
					xb: this.setForm.xb,
				};
				this.axios({
					method: "post",
					url: `/api/hr/qyjlglq/save`,
					headers: {
						token: this.token
					},
					data: data
				}).then(res => {
					if (res.data && res.data.code === 0) {
						this.dialogVisible = false;
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg,
							offset: 300
						});
					}
				}).catch(error => {
					this.$message({
						type: 'error',
						message: error.data.msg,
						offset: 300
					});
				});
			},
			// 新增一个岗位
			newPost() {
				this.publishData(0);
				if (this.isSave) {
					this.form = {
						value: '',
						hymc: '',
						gwmc: '',
						gwlbo: '',
						gwlbt: '',
						gwlb: '',
						gwgzxz: 'gx_001',
						sbsf: '',
						sbcs: '',
						sbxq: '',
						sbxxdz: '',
						gwyx: '',
						xlyq: '',
						jyyq: '',
						gwms: '',
						jnyq: '',
						flids: []
					}
					this.msgForm = {
						zprs: '',
						ssbm: '',
						fbsc: '',
						yx: ''
					}
					this.filtForm.zwpx = ''
					document.body.scrollTop = document.documentElement.scrollTop = 0;
				} else {
					this.$message({
						type: 'warning',
						message: '您当前填写的岗位信息没有进行保存，请您及时发布或者保存草稿',
						offset: 300
					});
					
				}
			},
			renderData() {
				
				this.axios({
					method: "post",
					url: `/api/hr/qydwgwfbxx/findGwInfoHrById/${this.$route.query.gwid}`,
					headers: {
						token: this.token
					},
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						this.infoData = res.data.gwxxxqHrVO;
						this.form.hymc = this.infoData.hxid;
						this.form.gwmc = this.infoData.gwmc;
						this.form.gwgzxz = this.infoData.gwgzxz;
						this.form.sbxxdz = this.infoData.sbxxdz;
						this.form.gwyx = this.infoData.gwyx;
						this.form.xlyq = this.infoData.xlyq;
						this.form.jyyq = this.infoData.jyyq;
						this.form.gwms = this.infoData.gwms;
						this.form.jnyq = this.infoData.jnyq;
						this.msgForm.zprs = this.infoData.zprs;
						this.msgForm.ssbm = this.infoData.ssbm;
						this.msgForm.fbsc = this.infoData.fbsc;
						this.msgForm.yx = this.infoData.jljsyx;
						this.filtForm.zwpx = this.infoData.zwpx;
						this.sfzd = this.infoData.sfzd;
						
						if (this.infoData.sbsf&&this.infoData.sbcs) {
							this.form.sbsf = this.infoData.sbsf;
							this.form.sbcs = this.infoData.sbcs;
							this.city.value = this.ProvinceMap[this.infoData.sbsf]+this.CityMap[this.infoData.sbsf][this.infoData.sbcs]
						}
						if (this.infoData.gwlbo&&this.infoData.gwlbt&&this.infoData.gwlb) {
							this.form.gwlbo = this.infoData.gwlbo;
							this.form.gwlbt = this.infoData.gwlbt;
							this.form.gwlb = this.infoData.gwlb;
							var onegw = this.JobCategoryFirstMap[this.infoData.gwlbo]+'/';
							var twogw = this.JobCategorySecondMap[this.infoData.gwlbo][this.infoData.gwlbt]+'/';
							var threegw = this.JobCategoryThirdMap[this.infoData.gwlbt][this.infoData.gwlb];
							this.post.value = onegw + twogw + threegw;
						}
						this.postfl.value = '';
						this.infoData.fllist.forEach((item) => {
							this.form.flids.push(item.dm);
							this.postfl.value += this.findDmMap['m_gwfldm'][item.dm]+'、';
						})
						
					} else {
						this.$message({
							type: 'error',
							message: '该单位信息审核中,岗位编辑会出现问题。',
							offset: 300
						});
					}
				}).catch(error => {
					console.log(error)
				});
			},
		}
	};
</script>

<style lang='less' scoped>
	/deep/.el-form-item.gwms_info {
		width: 100%;

		.el-form-item__content {
			width: 89%;
		}
	}

	/deep/.el-form.set_form {
		width: 100%;

		.el-form-item {
			width: 80%;
		}
	}

	/deep/.el-form-item.gwfl_form {
		width: 100%;

		/deep/.el-form-item__content {
			width: 89%;

			.col_select {
				width: 900px;
			}
		}
	}

	

	.dialog_con {
		/deep/.el-input {
			width: 150px;
			margin-right: 0;
		}
	}

	.col_select {
		width: 300px;
		border-radius: 0;
		margin-right: 20px;
	}

	.col_select.gray {
		color: rgb(192, 196, 204);
	}

	.dialog_con .tip {
		color: #fc5e5b;
		font-size: 12px;
		padding: 0 0 10px 0;
	}

	/deep/.el-dialog__body {
		padding: 10px 20px;
	}

	.dialog_con .area {
		padding: 20px;
	}

	.small /deep/.el-input {
		width: 150px;
		margin-right: 0;
	}

	.post {
		width: 100%;
		overflow: hidden;
		margin-top: 7.5rem;
		padding-top: 1.2rem;
	}

	.post .body {
		width: 75rem;
		margin: 0 auto;
		padding: 0;
		background: #fff;
		padding: 20px 40px;
	}

	.title {
		font-size: 18px;
		color: #303133;
		position: relative;
		font-weight: normal;
	}
	.title_tip {
		font-weight: bold;
		font-size: 16px;
		color: #fc5e5b;
		padding-left: 50px;
	}
	.title .new_return {
		color: #fc5e5b;
		position: absolute;
		right: 0;
		top: 0;
		display: inline-block;
		padding-left: 21px;
		background: url("../../../assets/images/enter/Icon-arrow-double-left.png") 0 center no-repeat;
	}

	.p_title {
		font-size: 16px;
		color: #303133;
		position: relative;
		padding-left: 8px;
		margin-top: 30px;
		font-weight: bold;
	}

	.p_title::before {
		content: "";
		position: absolute;
		left: 0;
		top: 3px;
		width: 3px;
		height: 17px;
		background: #fc5e5b;
	}

	.p_con {
		// width: 832px;
		padding: 20px 0;
	}

	/deep/.el-form-item {
		margin-bottom: 18px;
	}

	.lang /deep/.el-form-item__label {
		line-height: 20px;
	}

	/deep/.el-form-item__label::before {
		font-size: 21px;
		vertical-align: middle;
	}

	

	/deep/.el-input__inner {
		border-radius: 0;
	}

	/deep/.el-radio--small.is-bordered {
		padding: 8px 15px 0 10px;
		border-radius: 0;
		position: relative;
	}

	/deep/.el-radio.is-bordered.is-checked {
		border-color: #fc5e5b;
	}

	/deep/.el-radio__input {
		position: absolute;
		bottom: -1px;
		right: -1px;
	}

	/deep/.el-radio__input {
		display: none;
		width: 22px;
		height: 22px;
		background: url("../../../assets/images/enter/select.png") no-repeat;
	}

	/deep/.el-radio.is-bordered.is-checked /deep/.el-radio__input {
		display: block;
	}

	/deep/.el-radio__label {
		padding-left: 0;
	}

	/deep/.el-radio {
		margin-right: 9px;
	}

	.min_width {
		width: 133px;
		margin-right: 0;
	}

	.min_width1 {
		margin: 0 10px;
	}

	.el-textarea,
	/deep/.el-textarea__inner {
		height: 200px;
	}

	.tip {
		font-size: 12px;
		color: #fc5e5b;
	}

	.p_con .s1 {
		color: #fc5e5b;
		padding: 0 10px;
		cursor: default;
	}

	.p_con .s2 {
		color: #909399;
	}

	/deep/.el-radio__inner {
		display: none;
	}

	.p_con /deep/.el-button {
		width: 88px;
		margin-right: 20px;
	}

	.new_add {
		font-size: 16px;
		color: #fc5e5b;
		padding-left: 20px;
		background: url("../../../assets/images/enter/Icon-add.png") 0 center no-repeat;
		background-size: 15px;
		cursor: pointer;
	}
</style>
