<template>
	<!-- 求职注册 -->
	<div class="Qzreg">
		<div class="forget-wrap-title" v-if="active >= 1">
			<el-steps :active="active" finish-status="success" align-center>
				<el-step title="注 册"></el-step>
				<el-step title="填写个人信息"></el-step>
				<el-step title="填写求职意向"></el-step>
				<el-step title="填写教育经历"></el-step>
				<el-step title="填写工作经验" v-show="ruleForm.Workinghours"></el-step>
				<el-step title="注册成功"></el-step>
			</el-steps>
		</div>
		<div class="first-left" v-if="active == 0">
			<div class="loginform" >
				<el-tooltip class="item" effect="dark" content="敬请期待..." placement="left-start">
					<div v-if="tabform" class="tab tab1"></div>
				</el-tooltip>
				<!-- <div v-if="tabform" class="tab tab1" @click="tabform = false"></div>
				<div v-if="!tabform" class="tab tab2" @click="tabform = true"></div> -->
				<el-form v-if="tabform" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
					<el-form-item label style="margin-bottom: 0;font-weight: bold;">
						<el-divider><span style="font-weight: bold;font-size: 16px;">求职者注册</span></el-divider>
					</el-form-item>
					<el-form-item label prop="phone" style="margin-bottom: 1.125rem;">
						<el-input type="text" v-model.trim="ruleForm.phone" autocomplete="off" :maxlength="11" placeholder="输入手机号"></el-input>
					</el-form-item>
					<el-form-item>
						<drag-verify 
						:width="260" 
						:height="40" 
						:text="ruleForm.text" 
						:success-text="ruleForm.successText" 
						:background="ruleForm.background" 
						:progress-bar-bg="ruleForm.progressBarBg" 
						:completed-bg="ruleForm.completedBg" 
						:handler-bg="ruleForm.handlerBg" 
						:handler-icon="ruleForm.handlerIcon" 
						:text-size="ruleForm.textSize" 
						:success-icon="ruleForm.successIcon"
						:circle="false"
						ref="Verify"></drag-verify>
					</el-form-item>
					<el-form-item label prop="verificationCode" style="margin-bottom: 1.125rem;">
						<el-input type="text" :maxlength="6" v-model.trim="ruleForm.verificationCode" placeholder="短信验证码" autocomplete="off">
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.drag" @click="resetForm">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="ruleForm.sendAuthCode&&ruleForm.drag" @click="resetForm">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.sendAuthCode">{{ruleForm.auth_time}}s</el-button>
						</el-input>
					</el-form-item>
					<el-form-item label prop="pass" style="margin-bottom: 1.125rem;">
						<el-input type="password" :maxlength="10" v-model.trim="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
					</el-form-item>
					<el-form-item label prop="checkPass" style="margin-bottom: 1.125rem;">
						<el-input type="password" :maxlength="10" v-model.trim="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
					</el-form-item>
					<el-form-item label style="margin-bottom: 0;">
						<el-checkbox v-model="ruleForm.checked" style="font-size: 0.875rem;">同意博士投</el-checkbox>
						<div :class="ruleForm.checked ? 'agreement agreementcolor':'agreement'"><span @click="agreementDialogVisible=true">《用户服务协议》</span>和<span @click="policyDialogVisible=true">《隐私政策》</span></div>
						
					</el-form-item>
					<el-form-item style="text-align: center;">
						<div style="color: rgba(80, 80, 80, 1);font-size: 0.875rem;height: 1.875rem;line-height: 1;">
							已经注册过博士投?请直接
							<router-link to="/public/login" style="color: #ff5656;">去登录</router-link>
						</div>
						<el-button @click="submitForm('ruleForm')">注 册</el-button>
					</el-form-item>
				</el-form>
				<el-dialog :visible.sync="agreementDialogVisible" :show-close="false" :modal="false" width="800px" center>
					<Agreement />
					<span slot="title" class="dialog-footer">
						<h1>博士投《用户服务协议》</h1>
					</span>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="ruleForm.checked=true;agreementDialogVisible=false">同意博士投《用户服务协议》</el-button>
					</span>
				</el-dialog>
				<el-dialog :visible.sync="policyDialogVisible" :show-close="false" :modal="false" width="800px" center>
					<Policy />
					<span slot="title" class="dialog-footer">
						<h1>博士投《隐私政策》</h1>
					</span>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="ruleForm.checked=true;policyDialogVisible=false">同意博士投《隐私政策》</el-button>
					</span>
				</el-dialog>
				<div v-if="!tabform" class="ewmdl">
					<el-divider>APP 扫码注册</el-divider>
					<div class="ewmimg"></div>
					<div class="ewmtitle1">请打开中研APP“扫一扫”</div>
					<div class="ewmtitle2">
						没有中研APP？
						<router-link to="" style="float: right;color: #ff5656;">去下载</router-link>
					</div>
				</div>
			</div>
			
		</div>
		<div class="personalInfor" v-if="active == 1">
			<div class="personalInfor-form">
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" size="small" class="demo-ruleForm">
					<h4>个人信息<h6>必填</h6></h4>
					<el-form-item label="姓名" prop="name">
						<el-input type="text" v-model.trim="ruleForm.name" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="gender">
						<el-radio-group v-model="ruleForm.gender">
							<el-radio v-for="tab in findDmList['m_xbdm']" :key="tab.dm" :label="tab.dm">{{tab.name}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="求职状态" prop="Jobstatus">
						<el-select v-model="ruleForm.Jobstatus" placeholder="请选择求职状态" style="width: 13.75rem;">
							<el-option v-for="tab in findDmList['m_qzzt']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="出生日期" prop="Dateofbirth">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.Dateofbirth" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 12.5rem;"></el-date-picker>
					</el-form-item>
					<el-form-item label="户口所在地" prop="Registeredresidence">
						<el-cascader :options="dence" v-model="ruleForm.Registeredresidence" filterable style="width: 100%;"></el-cascader>
					</el-form-item>
					<el-form-item label="现居住城市" prop="Liveincity">
						<el-cascader :options="options" v-model="ruleForm.Liveincity" filterable style="width: 100%;"></el-cascader>
					</el-form-item>
					<el-form-item label="参加工作时间" prop="Workinghours" >
						<el-date-picker  type="month" placeholder="选择日期" v-model="ruleForm.Workinghours" format="yyyy-MM" value-format="yyyy-MM" style="width: 12.5rem;"></el-date-picker>
						<el-radio-group v-model="ruleForm.Workinghours" style="margin-left: 20px;">
							<el-radio label="">暂无工作经验</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item style="margin: 0;"></el-form-item>
					<el-form-item label="电子邮箱" prop="E_email">
						<el-input v-model.trim="ruleForm.E_email" placeholder="请输入电子邮箱"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="OKbtn"  @click="submitForm('ruleForm')">完 成</el-button>
						<!-- <el-button class="preBtn" @click="active = 0">返回上一步</el-button> -->
						<el-button class="preBtn" @click="active = 2" v-if="currentActive != 1">下一步</el-button>
					</el-form-item>
					
				</el-form>
			</div>
		</div>

		<!-- 填写求职意向 -->
		<div class="objective" v-if="active == 2">
			<div class="objective-form">
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
					<h4>求职意向<h6>必填</h6></h4>
					<el-form-item label="工作性质" prop="Naturework">
						<el-radio-group v-model="ruleForm.Naturework">
							<el-radio v-for="tab in findDmList['m_gwgzxzdm']" :key="tab.dm" :label="tab.dm">{{tab.name}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="期望地点" prop="Expecttoplace">
						<el-cascader :options="options" v-model="ruleForm.Expecttoplace" filterable style="width: 100%;"></el-cascader>
					</el-form-item>
					<el-form-item label="期望行业" prop="Expecttheindustry">
						<el-select v-model="ruleForm.Expecttheindustry" filterable placeholder="请选择期望行业" style="width: 100%;">
							<el-option v-for="tab in findDmList['m_dwsshydm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="期望职类" prop="Expectclass">
						<el-cascader :options="Joboptions" v-model="ruleForm.Expectclass" :show-all-levels="false" filterable style="width: 100%;"></el-cascader>
					</el-form-item>
					<el-form-item label="期望月薪" prop="Expectsalary">
						<el-select v-model="ruleForm.Expectsalary" style="width: 13.75rem;">
							<el-option v-for="tab in findDmList['m_xzdydm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button class="OKbtn"  @click="submitForm('ruleForm')">完 成</el-button>
						<el-button class="preBtn" @click="active = 1">返回上一步</el-button>
						<el-button class="preBtn" @click="active = 3" v-if="active < currentActive">下一步</el-button>
					</el-form-item>
					
				</el-form>
			</div>
		</div>
		<div class="education" v-if="active == 3">
			<div class="education-form">
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
					<h4>教育经历<h6>必填</h6></h4>
					<el-form-item label="学校名称" prop="Schoolname">
						<el-input type="text" v-model.trim="ruleForm.Schoolname" placeholder="请输入最高学历学校名称"></el-input>
					</el-form-item>
					<el-form-item label="学历" prop="Recordofschooling" >
						<el-select v-model="ruleForm.Recordofschooling" placeholder="请选择" style="width: 12.5rem;">
							<el-option v-for="tab in findDmList['m_xldm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否统招" prop="recruitment">
						<el-radio-group v-model="ruleForm.recruitment">
							<el-radio label="1">统招</el-radio>
							<el-radio label="0">非统招</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="所学专业" prop="professional">
						<el-input type="text" v-model.trim="ruleForm.professional" placeholder="请输入所学专业"></el-input>
						<!-- <el-select v-model="ruleForm.professional" filterable placeholder="请选择所学专业" style="width: 100%;">
							<el-option v-for="tab in findDmList['m_gszwdm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select> -->
					</el-form-item>
					<el-form-item label="就读时间" prop="Schoolstart">
						<el-date-picker v-model="ruleForm.Schoolstart" format="yyyy-MM" value-format="yyyy-MM" type="monthrange" start-placeholder="开始月份"  range-separator="至"   end-placeholder="结束月份"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button class="OKbtn"  @click="submitForm('ruleForm')">完 成</el-button>
						<el-button class="preBtn" @click="active = 2">返回上一步</el-button>
						<el-button class="preBtn" @click="active = 4" v-if="active < currentActive">下一步</el-button>
					</el-form-item>
					
				</el-form>
			</div>
		</div>
		<div class="workExp" v-if="active == 4">
			<div class="workExp-form">
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm">
					<h4>工作经验<h6>必填</h6></h4>
					<el-form-item label="公司名称" prop="companyname">
						<el-input type="text" v-model.trim="ruleForm.companyname" placeholder="请输入公司名称"></el-input>
					</el-form-item>
					<!--  -->
					<el-form-item label="所属行业" prop="industry" >
						<el-select v-model="ruleForm.industry" filterable placeholder="请选择所属行业" style="width: 100%;">
							<el-option v-for="tab in findDmList['m_dwsshydm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select>
					</el-form-item>
					<!--  -->
					<el-form-item label="职位名称" prop="Jobtitle">
						<el-input type="text" v-model.trim="ruleForm.Jobtitle" placeholder="请输入职位名称"></el-input>
					</el-form-item>
					<el-form-item label="在职时间" prop="entryjobstart" >
						<el-date-picker v-model="ruleForm.entryjobstart" format="yyyy-MM" value-format="yyyy-MM" type="monthrange" start-placeholder="开始时间"  range-separator="至"   end-placeholder="结束时间"></el-date-picker>
					</el-form-item>
					<el-form-item label="税前薪资" prop="Monthlysalary">
						<el-select v-model="ruleForm.Monthlysalary" placeholder="请选择税前薪资" style="width: 18.75rem;">
							<el-option v-for="tab in findDmList['m_xzdydm']" :key="tab.dm" :label="tab.name" :value="tab.dm"></el-option>
						</el-select> 元
					</el-form-item>
					<el-form-item label="隐藏薪资">
						<el-radio-group v-model="ruleForm.hideSalary">
							<el-radio label="0">不隐藏</el-radio>
							<el-radio label="1">隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="工作内容" prop="desc">
						<el-input type="textarea" v-model.trim="ruleForm.desc" placeholder="输入工作内容" :rows="5"  maxlength="1000" show-word-limit></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="OKbtn"  @click="submitForm('ruleForm')">完 成</el-button>
						<el-button class="preBtn" @click="active = 3">返回上一步</el-button>
						<!-- <el-button class="preBtn" @click="active = 5" v-if="active < currentActive">下一步</el-button> -->
					</el-form-item>
					
				</el-form>
			</div>
		</div>
		<div class="regOK" v-if="active >= 5">
			<div class="regOK-form">
				<div class="regOK-left"></div>
				<div class="regOK-right">
					<div class="ok-title-1">
						<h4>恭喜你，简历创建完成！</h4>
						<h4>您可以申请职位了~</h4>
					</div>
					<div class="ok-progress">
						<div>简历完成度：</div>
						<el-progress :percentage="percentage" :stroke-width="15" color="#ff5656" ></el-progress>
					</div>
					<div class="oksmall-title">
						<router-link to="/private/resume">继续完善简历，提高求职竞争力<i class="el-icon-arrow-right"></i></router-link>
					</div>
					<div class="templateBtn">
						<el-button  @click="getjobretrieve1">职位查看</el-button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import crypto from "crypto"; //密码加密
	import dragVerify from 'vue-drag-verify'
	import Agreement from './Agreemen.vue'
	import Policy from './Policy.vue'
	import Moment from '../common/moment.js';
	export default {
		name: "Qzreg",
		components: {dragVerify, Agreement, Policy},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.ruleForm.checkPass !== "") {
						this.$refs.ruleForm.validateField("checkPass");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				tabform: true,
				active: 0,
				// active: 1,		// test
				activeName: 'first',
				percentage: 0,
				ruleForm: {
					//注册
					checked: false,
					phone: "",
					//
					handlerIcon: "el-icon-d-arrow-right",
					successIcon: "el-icon-check",
					background: "#dadada",
					progressBarBg: "#4b0",
					completedBg: "#66cc66",
					handlerBg: "#fff",
					text: "请将滑块拖动到右侧",
					successText: "验证成功",
					textSize: "14px",
					drag: false,
					//
					verificationCode: "",
					pass: '',
					checkPass: '',
					sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */ ,
					auth_time: 0 /*倒计时 计数器*/ ,
					//求职意向
					Naturework: '',
					Expecttoplace: '',
					Expecttheindustry: '',
					Expectclass: '',
					Expectsalary: '',
					//个人信息
					name: '',
					gender: '',
					Jobstatus: '',
					Dateofbirth: '',
					Registeredresidence: '',
					Liveincity: '',
					Workinghours: '',
					E_email: '',
					//教育经历
					Schoolname: '',
					Recordofschooling: '',
					recruitment: '',
					professional: '',
					Schoolstart: '',
					//工作经验
					companyname: '',
					industry: '',
					Jobtitle: '',
					entryjobstart: '',
					Monthlysalary: '',
					hideSalary: '0',
					desc: '',
				},
				rules: {
					//注册
					phone: [{required: true,message: '请输入手机号',trigger: 'blur'}, {min: 11,message: '请输入有效的手机号',trigger: 'blur'}],
					verificationCode: [{required: true,message: '请输入短信验证码',trigger: 'blur'},],
					pass: [{ required: true, validator: validatePass, trigger: "blur" }],
					checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }],
					//求职意向
					Naturework: [{required: true, message: '请选择工作性质', trigger: 'change' }],
					Expecttoplace: [{ required: true, message: '请选择期望地点', trigger: 'change' },],
					Expecttheindustry: [{ required: true, message: '请选择期望行业', trigger: 'change' }],
					Expectclass: [{ required: true, message: '请选择期望职类', trigger: 'change' },],
					Expectsalary: [{ required: true, message: '请选择期望月薪', trigger: 'change' },],
					//个人信息
					name: [{required: true,message: '请输入姓名',trigger: 'blur'},],
					gender: [{required: true, message: '请选择性别', trigger: 'change' }],
					Jobstatus: [{  required: true,message: '请选择求职状态', trigger: 'change' }],
					Dateofbirth: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
					Registeredresidence: [{required: true, message: '请选择户口所在地', trigger: 'change' }],
					Liveincity: [{required: true, message: '请选择现居住城市', trigger: 'change' }],
					Workinghours: [{  message: '请选择参加工作时间', trigger: 'change' }],			
					E_email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
					//教育经历
					Schoolname: [{required: true,message: '请输入最高学历学校名称',trigger: 'blur'},],
					Recordofschooling: [{required: true, message: '请选择最高学历', trigger: 'change' }],
					recruitment: [{required: true, message: '请选择是否统招', trigger: 'change' }],
					professional: [{required: true, message: '请选择所学专业', trigger: 'change' }],
					Schoolstart: [{ required: true, message: '请选择就读时间', trigger: 'change' }],
					//工作经验
					companyname: [{required: true,message: '请输入公司名称',trigger: 'blur'}, ],
					industry: [{required: true, message: '请选择所属行业', trigger: 'change' }],//
					Jobtitle: [{required: true,message: '请输入职位名称',trigger: 'blur'},],
					entryjobstart: [{required: true, message: '请选择在职时间', trigger: 'change' }],
					Monthlysalary: [{required: true,message: '请选择税前薪资',trigger: 'blur'},],
				},
				agreementDialogVisible: false,
				policyDialogVisible: false,
				currentActive:1,			// 判断是否存在 返回上一页 按钮
				isUpdate1:false,			// 是否需要更新个人信息
				isUpdate2:false,			// 是否需要更新求职意向
				isUpdate3:false,			// 是否需要更新教育经历
				isUpdate4:false				// 是否需要更新工作经历
			};
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				"userId":"getuserId"
			}),
			...mapState({
				findDmList: state => state.findDmList,
				ProvinceList: state => state.ProvinceList,
				CityList: state => state.CityList,
				AreaList: state => state.AreaList,
				JobCategoryFirstList: state => state.JobCategoryFirstList,
				JobCategorySecondList: state => state.JobCategorySecondList,
				JobCategoryThirdList: state => state.JobCategoryThirdList,
			}),
			dence () {
				return this.getdenceList();
			},
			options() {
				return this.getProvinceList();
			},
			Joboptions() {
				return this.getJobList();
			}
		},
		methods: {
			// 获取岗位列表列表
			getJobList() {
				var options = [];
				if (this.JobCategoryFirstList && this.JobCategoryFirstList.length > 0) {
					this.JobCategoryFirstList.forEach(p => {
						let item = {
							value: p.dm,
							label: p.name,
							children: []
						};
						if (this.JobCategorySecondList && this.JobCategorySecondList[p.dm] && this.JobCategorySecondList[p.dm].length > 0) {
							this.JobCategorySecondList[p.dm].forEach((c, index) => {
								item.children.push({
									value: c.dm,
									label: c.name,
									children: []
								});
								if (this.JobCategoryThirdList && this.JobCategoryThirdList[c.dm] && this.JobCategoryThirdList[c.dm].length > 0) {
									this.JobCategoryThirdList[c.dm].forEach(d => {
										item.children[index].children.push({
											value: d.dm,
											label: d.name
										});
									});
								}
							});  
						} 
						options.push(item); 
					});
				}
				return options;
			},
			getdenceList() {
				var options = [];
				if (this.ProvinceList && this.ProvinceList.length > 0) {
					this.ProvinceList.forEach(p => {
						let item = {
							value: p.dm,
							label: p.name,
						};
						options.push(item);
					});
				}
				return options;
			},
			getProvinceList() {
				var options = [];
				if (this.ProvinceList && this.ProvinceList.length > 0) {
					this.ProvinceList.forEach(p => {
						let item = {
							value: p.dm,
							label: p.name,
							children: []
						};
						if (this.CityList && this.CityList[p.dm] && this.CityList[p.dm].length > 0) {
							this.CityList[p.dm].forEach(c => {
								item.children.push({
									value: c.dm,
									label: c.name
								});
							});
						}
						options.push(item);
					});
				}
				return options;
			},
			submitForm(formName) {
				
				var that = this;
				
				that.$refs[formName].validate(valid => {
					if (valid) {
						
						if (that.ruleForm.checked) {
							var phone = that.ruleForm.phone;
							var validateCode = that.ruleForm.verificationCode;
							var pwd = that.ruleForm.checkPass;
							var md5 = crypto.createHash("md5");
							md5.update(pwd); //需要加密的密码
							pwd = md5.digest("hex"); //password 加密完的密码
							
							var name = that.ruleForm.name;
							var gender = that.ruleForm.gender;
							var Jobstatus = that.ruleForm.Jobstatus;
							var Dateofbirth = that.ruleForm.Dateofbirth;
							var Registeredresidence = that.ruleForm.Registeredresidence;
							var Liveincity = that.ruleForm.Liveincity;
							var Workinghours = that.ruleForm.Workinghours;
							var E_email = that.ruleForm.E_email;
							
							var Naturework = that.ruleForm.Naturework;
							var Expecttoplace = that.ruleForm.Expecttoplace;
							var Expecttheindustry = that.ruleForm.Expecttheindustry;
							var Expectclass = that.ruleForm.Expectclass;
							var Expectsalary = that.ruleForm.Expectsalary;
							
							var Schoolname = that.ruleForm.Schoolname;
							var Recordofschooling = that.ruleForm.Recordofschooling;
							var recruitment = that.ruleForm.recruitment;
							var professional = that.ruleForm.professional;
							var Schoolstart = that.ruleForm.Schoolstart;
							
							var companyname = that.ruleForm.companyname;
							var industry = that.ruleForm.industry;
							var Jobtitle = that.ruleForm.Jobtitle;
							var entryjobstart = that.ruleForm.entryjobstart;
							var Monthlysalary = that.ruleForm.Monthlysalary;
							var hideSalary = that.ruleForm.hideSalary;
							var desc = that.ruleForm.desc;
							
							// 注册
							
							if (phone && validateCode && pwd && that.active == 0) {
								// test
								// that.active = 1;
								
								that.axios.post("/api/sec/pc/registerQz", {
									validateCode: validateCode,
									phone: phone,
									pwd: pwd
								}, {
									headers: {
										"content-type": "application/json"
										// 'token':token
									}
								}).then(function(response) {
									if (response && response.data && response.data.code == 0) {
										that.$message({
											message: "注册成功",
											type: "success",
											offset: 400
										});
										that.axios.post("/api/sec/pc/logonQz", {
											phone: phone,
											pwd: pwd,
											logintype: 0
										}, {
											headers: {
												"content-type": "application/json"
												// 'token':token
											}
										}).then(function(response) {
											if (response && response.data && response.data.code == 0) {
												that.$store.commit('updatehttptoken', response);
												that.$store.commit('updateJobseekers', 'Jobseekers');
											} else {
												that.$message({
													message: response.data.msg,
													offset: 400
												});
											}
											that.active = 1;
										}).catch(function(error) {
											console.log(error);
										});
										
									} else {
										that.$message({
											message: response.data.msg,
											type: 'warning',
											offset: 400
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							}

							// 个人信息
							if (name && gender && Jobstatus && Dateofbirth && Registeredresidence && Liveincity && E_email && that.active == 1) {
								
								let url = ""
								if(that.isUpdate1) {
									url = "/api/qz/qzgrjbxx/update"
								}else{
									url = "/api/qz/qzgrjbxx/save"
								}
								that.axios.post(url, {
									xm: name,
									xbm: gender,
									csrq: Moment.formatDate2(Dateofbirth),
									jgdms: Registeredresidence[0],
									dqszs: Liveincity[0],
									dqszcs: Liveincity[1],
									cjgzny: Workinghours ? Moment.formatDate2(Workinghours) : '',
									yx: E_email
									
								}, {
									headers: {
										"content-type": "application/json",
										'token': that.token
									}
								}).then(function(response) {
									if (response && response.data && response.data.code == 0) {
										that.axios.get("/api/qz/qzgrjbxx/updateQzzt/"+Jobstatus, {
											headers: {
												"content-type": "application/json",
												'token': that.token
											}
										}).then(function(response) {
											if (response && response.data && response.data.code == 0) {
												that.active = 2;
												that.currentActive = 2;
											} else {
												that.$message({
													message: response.data.msg,
													type: 'warning',
													offset: 400
												});
											}
										}).catch(function(error) {
											console.log(error);
										});
									} else {
										that.$message({
											message: response.data.msg,
											type: 'warning',
											offset: 400
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							}

							// 求职意向
							if (Naturework  && Expecttoplace && Expecttheindustry && Expectclass && Expectsalary && that.active == 2) {

								if(that.isUpdate2) {
									that.active = 3;
									that.currentActive = 3;
									return
								}

								that.axios.post("/api/qz/qzqzyx/save", { //
									gzxzm: Naturework,
									sjm: Expecttoplace[0],
									cjm: Expecttoplace[1],
									hym: Expecttheindustry,
									zwmo: Expectclass[0],
									zwmt: Expectclass[1],
									zwm: Expectclass[2],
									yx: Expectsalary,
									ys: 1,
								}, {
									headers: {
										"content-type": "application/json",
										'token': that.token
									}
								}).then(function(response) {
									if (response && response.data && response.data.code == 0) {
										that.active = 3;
										that.currentActive = 3;
									} else {
										that.$message({
											message: response.data.msg,
											type: 'warning',
											offset: 400
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							}
							
							// 教育经历
							if (Schoolname && Recordofschooling && recruitment && professional && Schoolstart  && that.active == 3) {
								if(that.isUpdate3) {
									if(that.ruleForm.Workinghours) {
										that.active = 4;
										that.currentActive = 4;
										return
									}else{
										that.active = 5;
										that.currentActive = 5;
										return
									}
									
								}
								
								that.axios.post("/api/qz/qzjyjl/save", {
									xxmc: Schoolname,
									xl: Recordofschooling,
									sftz: recruitment,
									zy: professional,
									rxsj: Moment.formatDate2(Schoolstart[0]),
									bysj: Moment.formatDate2(Schoolstart[1])
								}, {
									headers: {
										"content-type": "application/json",
										'token': that.token
									}
								}).then(function(response) {
									if (response && response.data && response.data.code == 0) {
										if(that.ruleForm.Workinghours) {
											that.active = 4;
											that.currentActive = 4;
										}else{
											that.active = 5;
											that.currentActive = 5;
											setTimeout(() => {
												that.$router.push({
													path: "/Job_hunter/Hunter_home"
												});
											}, 3000);
										}
										
										
									} else {
										that.$message({
											message: response.data.msg,
											type: 'warning',
											offset: 400
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							}

							
							if (companyname && industry && Jobtitle && entryjobstart && Monthlysalary && that.active == 4 && Workinghours=='' ) {
								
								that.axios.get('/api/qz/qzgrjbxx/myBaseInfo', {
									headers: {
										'content-type': 'application/json',
										'token': that.token
									}
								}).then(function(response) {
									if (response && response.data && response.data.code == 0) {
										var data = response.data.qzGrjbxxBase;
										that.percentage = data.wsd;
										that.active = 6;
										that.$message({
											message: "个人基本信息填写完成",
											type: "success",
											offset: 400
										});
										setTimeout(() => {
											that.$router.push({
												path: "/Job_hunter/Hunter_home"
											});
										}, 3000);
									} else {
										that.$message({
											message: response.data.msg,
											offset: 400
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							}

							if (companyname && industry && Jobtitle && entryjobstart && Monthlysalary && that.active == 4 && Workinghours!='') {
								if(that.isUpdate4) {
									that.active = 6;
									that.currentActive = 6;
									setTimeout(() => {
										that.$router.push({
											path: "/Job_hunter/Hunter_home"
										});
									}, 3000);
									return
								}


								that.axios.post("/api/qz/qzgzjl/save", {
									dwmc: companyname,
									hy: industry,
									zwmc: Jobtitle,
									rzsj: Moment.formatDate2(entryjobstart[0]),
									lzsj: Moment.formatDate2(entryjobstart[1]),
									yx: Monthlysalary,
									sfyc: hideSalary,
									ys: 12,
									gzms: desc
								}, {
									headers: {
										"content-type": "application/json",
										'token': that.token
									}
								}).then(function(response) {
									if (response && response.data && response.data.code == 0) {
										that.axios.get('/api/qz/qzgrjbxx/myBaseInfo', {
											headers: {
												'content-type': 'application/json',
												'token': that.token
											}
										}).then(function(response) {
											if (response && response.data && response.data.code == 0) {
												var data = response.data.qzGrjbxxBase;
												that.percentage = data.wsd;
												that.active = 6;
												that.$message({
													message: "个人基本信息填写完成",
													type: "success",
													offset: 400
												});
												setTimeout(() => {
													that.$router.push({
														path: "/Job_hunter/Hunter_home"
													});
												}, 3000);
											} else {
												that.$message({
													message: response.data.msg,
													offset: 400
												});
											}
										}).catch(function(error) {
											console.log(error);
										});
									} else {
										that.$message({
											message: response.data.msg,
											offset: 400
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							}
						} else {
							that.$message({
								message: '请同意博士投用户协议',
								offset: 400
							});
						}
					} else {
						return false;
					}
				});
			},
			resetForm() {
				var that = this;
				var phone = that.ruleForm.phone;
				if (phone != "") {
					var darg = that.$refs.Verify.isPassing;
					that.ruleForm.drag = darg;
					if (darg) {
						that.ruleForm.sendAuthCode = false;
						that.ruleForm.auth_time = 60;
						var auth_timetimer = setInterval(() => {
							that.ruleForm.auth_time--;
							if (that.ruleForm.auth_time <= 0) {
								that.ruleForm.sendAuthCode = true;
								clearInterval(auth_timetimer);
							}
						}, 1000);
						that.axios.get("/api/sec/pc/registerValidateCode", {
							params: {
								phone: phone
							},
							headers: {
								"content-type": "application/x-www-form-urlencoded"
								// 'token':token
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$message({
									message: "验证码已发送",
									type: "success",
									offset: 400
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						that.$message({
							message: '请滑动验证',
							offset: 400
						});
					}
					
				}
			},
			
			
			getjobretrieve1() {
				this.$router.push({
					path: "/public/jobretrieve",
						query: {
						val: 1
					}
				});
			},


			// 个人基本信息查询
			getGrInfo() {
				let that = this
				// console.log(this.userId)
				this.axios({
					url:"/api/qz/qzgrjbxx/info",
					method:'get',
					headers: {
						"content-type": "application/json",
						token: this.token
					}
				})
				.then(res => {
					let data = res.data
					// console.log(data)
					if(data && data.code == 0) {
						if(data.qzGrjbxx) {
							that.isUpdate1 = true
						}
					}else{
						console.log(data)
					}
				})
				.catch(err => {
					console.log(err)
				})
			},

			// 求职意向查询
			getQzInfo() {
				let that = this
				this.axios({
					url:"/api/qz/qzqzyx/list",
					method:'get',
					headers: {
						"content-type": "application/json",
						token: this.token
					}
				})
				.then(res => {
					let data = res.data
					// console.log(data)
					if(data && data.code == 0) {
						if(data.qzyxList.length) {
							that.isUpdate2 = true
						}
					}else{
						console.log(data)
					}
				})
				.catch(err => {
					console.log(err)
				})
			},

			// 教育经历
			getJyInfo() {
				let that = this
				this.axios({
					url:"/api/qz/qzjyjl/list",
					method:'post',
					headers: {
						"content-type": "application/json",
						token: this.token
					}
				})
				.then(res => {
					let data = res.data
					// console.log(data)
					if(data && data.code == 0) {
						if(data.list.length) {
							that.isUpdate3 = true
						}
					}else{
						console.log(data)
					}
				})
				.catch(err => {
					console.log(err)
				})
			},

			// 工作经验
			getWorkInfo() {
				let that = this
				this.axios({
					url:"/api/qz/qzgzjl/list",
					method:'get',
					headers: {
						"content-type": "application/json",
						token: this.token
					}
				})
				.then(res => {
					let data = res.data
					// console.log(data)
					if(data && data.code == 0) {
						if(data.gzjlList.length) {
							that.isUpdate4 = true
						}
					}else{
						console.log(data)
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		created() {
			
		},

		watch: {
			active(val, old) {
				if(val == 1) {
					this.getGrInfo()
				}else if(val == 2) {
					this.getQzInfo()
				}else if(val == 3) {
					this.getJyInfo()
				}else if(val == 4) {
					this.getWorkInfo()
				}
			}
		}
	};
</script>

<style scoped>
	.Qzreg {
		padding-top: 0.625rem;
	}
	.el-button {
		padding: 12px 20px!important;
	}
	h6 {
		display: inline-block;
		margin-left: 0.625rem;
		padding: 1px 5px;
		margin-bottom: 5px;
		background: red;
		color: #FFF;
	}
	.Qzreg .first-left {
		overflow: hidden;
		padding-bottom: 0.625rem;
		background: url(../../assets/images/common/qiuzhibg.png) 3.75rem 5.4375rem no-repeat;
	}
	.first-left .loginform {
		width: 16.25rem;
		/* height: 23.75rem; */
		-webkit-box-shadow: 0 0 1.25rem #EEEEEE;
		box-shadow: 0 0 1.25rem #EEEEEE;
		float: right;
		margin-bottom: 31px;
		margin-top: 33px;
		margin-right: 1.25rem;
		border-radius: 0.625rem;
		padding: 1.4375rem 3.75rem 0.625rem;
		background-color: #FFFFFF;
		position: relative;
		overflow: hidden;
	}

	.loginform .tab {
		width: 4.375rem;
		height: 4.375rem;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}

	.loginform .tab1 {
		background: url(../../assets/images/common/positionRTsm.png) center no-repeat;
	}

	.loginform .tab2 {
		background: url(../../assets/images/common/positionRTzm.png) center no-repeat;
	}

	.loginform .ewmdl {
		text-align: center;
	}

	.loginform .ewmdl .ewmimg {
		width: 11.25rem;
		height: 11.25rem;
		background: url(../../assets/images/common/denglu.png) center no-repeat;
		margin: 2.8125rem auto;
	}

	.loginform .ewmtitle1 {
		font-size: 0.9375rem;
		color: #8E8E8E;
		margin-top: 0.9375rem;
	}

	.loginform .ewmtitle2 {
		width: 10rem;
		margin: 0.625rem auto;
		font-size: 0.875rem;
		color: #8E8E8E;
	}

	.Qzreg .objective, .Qzreg .personalInfor, .Qzreg .education, .Qzreg .workExp, .Qzreg .regOK {
		border: 1px solid #E2E2E2;
		width: 43.75rem;
		height: auto;
		margin: 1.875rem auto 0;
		padding: 3.125rem 6.25rem 3.125rem;
	}
	.Qzreg .workExp {
		border: none;
		height: auto;
	}
	.regOK .regOK-form {
		display: flex;
	}
	.regOK-form .regOK-left {
		width: 25rem;
		height: 25rem;
		background: url(../../assets/images/common/regOK.png) center/cover no-repeat;
	}
	.regOK-form .regOK-right {
		width: 18.75rem;
		height: 25rem;
		text-align: center;
		line-height: 2;
	}
	.regOK-right .ok-title-1 {
		margin-bottom: 1.875rem;
		margin-top: 4.375rem;
	}
	.regOK-right .ok-progress {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.ok-progress .el-progress {
		width: 12.5rem;
		line-height: 1.7;
	}
	.regOK-right .oksmall-title, .oksmall-title a {
		color: #FF5656;
		margin-bottom: 1.25rem;
	}
	.regOK-form .el-button {
		width: 12.5rem;
		background-color: #ff5656;
		color: #FFFFFF;
		border-color: #ff5656;
	}
	.el-form .el-button {
		width: 100%;
		background-color: #ff5656;
		color: #FFFFFF;
		border-color: #ff5656;
	}

	.el-form .yzm {
		width: 100px;
		background-color: #FFFFFF;
		border: #FFFFFF;
		color: #ff5656;
	}
	.el-form .OKbtn, .el-form .preBtn {
		width: 30%;
	}
	.el-form .OKbtn {
		float: left;
	}
	.el-form .preBtn {
		float:  right;
		background-color: #FFFFFF;
		color: #ff5656;
	}
	.agreement {
		display: initial;
		font-size: 0.75rem;
	}
	.agreementcolor {
		color: #409EFF;
	}
	.agreement span {
		color: #409EFF;
		cursor: pointer;
	}
	.agreement span:hover {
		text-decoration: underline;
	}

	/deep/ .el-checkbox__label {
		font-size: 0.75rem;
		padding-left: 0.3125rem;
	}
	/deep/ .el-radio__input.is-checked .el-radio__inner {
		border-color: #ff5656;
		background: #ff5656;
	}
	/deep/ .el-radio__input.is-checked+.el-radio__label {
		color: #FF5656;
	}
</style>
