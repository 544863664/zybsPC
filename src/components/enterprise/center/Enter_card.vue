<template>
	<!-- 账号信息 -->
	<div class="Hunter_card">
		<div class="bodys">
			<!-- LOGO设置 -->
			<div class="lo_fl">
				<div class="title">LOGO设置</div>
				<div class="lo_fl_wrap">
					<span v-if="!Editor" @click="Editor = true" class="edit_btn">编辑</span>
					<span v-if="Editor" @click="Editor = false" class="edit_btn">取消编辑</span>
					<div class="user_img">
						<img v-if="!imageUrl" src="../../../assets/images/common/enterDetail.png" alt="" />
						<img v-if="imageUrl" :src="imageUrl" alt="">
						<div class="wrap-name_text">
							<el-upload 
								class="upload-demo" 
								action="" 
								:show-file-list="false" 
								:auto-upload="false" 
								:limit="1" 
								:on-change="afterRead"
								:on-success="handleAvatarSuccess" 
								:before-upload="beforeAvatarUpload">
								<el-button size="small" type="danger" plain>更换LOGO</el-button>
							</el-upload>
						</div>
					</div>
					<div class="user_name">
						<div class="wrap-name-text">{{enterDetail.dwmc}}</div>
						<div class="wrap-name--text" v-if="!Editor">{{enterDetail.dwjs?enterDetail.dwjs:'还没有公司简介...'}}</div>
						<div v-if="Editor">
							<el-input type="textarea" v-model.trim="enterDetail.dwjs" placeholder="请输入公司简介"></el-input>
							<el-button type="danger" @click="EditorenterDetail">保存</el-button>
						</div>
					</div>
				</div>
			</div>
			<!-- 账号绑定 -->
			<div class="lo_fl">
				<div class="title">账号绑定</div>
				<div class="lo_fl_wrap">
					<div class="phone_img"><img src="../../../assets/images/common/icon15.svg" alt=""></div>
					<div class="wrap-text" v-if="userInfo.sjhm">
						已绑定手机号:{{userInfo.sjhm.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</div>
					<div class="theEditor">
						<el-button size="small" type="text" v-if="!userInfo.sjhm" @click="EditorPhoneDialogVisible=true">绑定手机号
						</el-button>
						<el-button size="small" type="text" v-if="userInfo.sjhm" @click="EditorPhoneDialogVisible=true">更换手机号
						</el-button>
					</div>
				</div>
				<!-- 邮箱 -->
				<div class="lo_fl_wrap">
					<div class="email_img"><img src="../../../assets/images/common/icon16.svg" alt=""></div>
					<div class="wrap-text" v-if="userInfo.yx">
						已绑定邮箱:{{userInfo.yx.replace(/(.{2}).+(.{2}@.+)/g,'$1****$2')}}</div>
					<div class="theEditor"> 
						<el-button size="small" type="text" v-if="!userInfo.yx" @click="EditorEmailDialogVisible=false">绑定邮箱</el-button>
						<el-button size="small" type="text" v-if="userInfo.yx" @click="EditorEmailDialogVisible=true">更换邮箱</el-button> 
					</div>
				</div>
				<!-- 密码 -->
				<div class="lo_fl_wrap">	
					<div class="wechat_img"><img src="../../../assets/images/common/pwds.png" alt=""></div>
					<div class="wrap-text">
						密码：****** 
					</div>
					<div class="theEditor">
						<el-button size="small" type="text" @click="PwdDialogVisible=true">修改密码</el-button>
					</div>
				</div>
				<div class="lo_fl_wrap">
					<div class="wechat_img"><img src="../../../assets/images/common/Icon-Chat.png" alt=""></div>
					<div class="wrap-text" v-if="userInfo.wx">已绑定微信:{{userInfo.wx}}</div>
					<div class="theEditor">
						<el-tooltip class="item" effect="dark" content="敬请期待..." placement="right">
							<el-button size="small" type="text" v-if="!userInfo.wx">绑定微信</el-button>
							<el-button size="small" type="text" v-if="userInfo.wx">更换微信</el-button>
						</el-tooltip>
					</div>
				</div>
			</div>
			<!-- 已授权子账号 -->
			<div class="lo_fl">
				<div class="title">
					已授权子账号
					<el-link type="danger" :underline="false" @click="addCard()" class="tabtext">新增</el-link>
					<!-- <el-link type="danger" :underline="false" @click="filterTag(3)" class="tabtext">已拒绝</el-link>
					<el-link type="danger" :underline="false" @click="filterTag(2)" class="tabtext">已通过</el-link>
					<el-link type="danger" :underline="false" @click="filterTag(1)" class="tabtext">未审核</el-link> -->
				</div>
				<div class="lo_fl_wrap1"> 
					<el-table :data="IntheUnit.IntheUnitList" style="width: 100%">
						<el-table-column type="index" align="center" label="序号" width="60" fixed></el-table-column>
						<el-table-column prop="DWMC" label="单位名称" width="300"></el-table-column>
						<el-table-column prop="HRXM" label="申请人姓名" width="120"></el-table-column>
						<el-table-column prop="SJHM" label="申请人号码" width="130"></el-table-column>
						<el-table-column prop="status" label="审核状态" width="100"></el-table-column>
						<el-table-column prop="CREATE_TIME" label="授权日期" width="180" ></el-table-column>
						<el-table-column prop="shzt" align="center" label="操作" width="100" fixed="right">
							<template slot-scope="scope">
								<el-link type="success" :underline="false" v-if="scope.row.SHZT == 1" @click="changeRow(scope.row, 1)" style="margin-right: 0.3125rem;">确认</el-link>
								<el-link type="primary" :underline="false" v-if="scope.row.SHZT == 1" @click="changeRow(scope.row, 2)">拒绝</el-link>
								<!-- <el-link type="danger" :underline="false" v-if="scope.row.SHZT != 1" @click="changeDeleteRow(scope.row)">删除账号</el-link> -->
								<el-link type="danger" :underline="false" v-if="scope.row.SHZT != 1">--</el-link>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination 
						v-if="IntheUnit.totalCount>10"
						@current-change="handleCurrentChange" 
						:current-page="IntheUnit.page" 
						:page-size="IntheUnit.limit" 
						layout="prev, pager, next"
						:total="IntheUnit.totalCount"></el-pagination>
				</div>
			</div> 
		</div>
		
		<!-- 修改密码 -->
		<el-dialog :visible.sync="PwdDialogVisible" width="600px" :lock-scroll="true" :show-close="false" :modal="false">
			<div class="dialog__body-wrap">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="请输入原密码" prop="oldPassWord">
						<el-input type="password" :maxlength="10" v-model.trim="ruleForm.oldPassWord" autocomplete="off">
						</el-input>
					</el-form-item>
					<el-form-item label="请输入新密码" prop="newPassWord">
						<el-input type="password" :maxlength="10" v-model.trim="ruleForm.newPassWord" autocomplete="off">
						</el-input>
					</el-form-item>
					<el-form-item label="请确认新密码" prop="newcheckPassWord">
						<el-input type="password" :maxlength="10" v-model.trim="ruleForm.newcheckPassWord" autocomplete="off">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="EditorpwdsubmitForm('ruleForm')" class="passBtn">保 存</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="title" class="dialog-header">
				<div>修改密码</div>
			</span>
		</el-dialog>

		<!-- 绑定手机号 -->
		<el-dialog :visible.sync="EditorPhoneDialogVisible" width="600px" :lock-scroll="true" :show-close="false" :modal="false">
			<div class="dialog__body-wrap">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
					<el-form-item label="" prop="verificationCode">
						<el-input placeholder="原手机号短信验证码" :maxlength="6" v-model.trim="ruleForm.oldIphoneCode" autocomplete="off">
							<el-button type="text" slot="append" class="yzm" v-if="ruleForm.oldsendAuthCode" @click="oldresetForm" style="color: #FF5656;">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.oldsendAuthCode">
								{{ruleForm.oldauth_time}}s</el-button>
						</el-input>
					</el-form-item>
					<el-form-item label="" prop="newIphone">
						<el-input type="text" :maxlength="11" v-model.trim="ruleForm.newIphone" placeholder="输入新手机号" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="" prop="verificationNewCode">
						<el-input type="text" :maxlength="6" v-model.trim="ruleForm.newIphoneCode" placeholder="新手机号短信验证码" autocomplete="off">
							<el-button type="text" slot="append" class="yzm" v-if="ruleForm.newsendAuthCode" @click="newresetForm" style="color: #FF5656;">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.newsendAuthCode">
								{{ruleForm.newauth_time}}s</el-button>
						</el-input>
					</el-form-item>
					<el-form-item style="margin-bottom: 0.625rem;">
						<el-button type="primary" @click="EditorPhoneForm('ruleForm')" v-if="!userInfo.sjhm" class="phoneBtn">绑定手机号
						</el-button>
						<el-button type="primary" @click="EditorPhoneForm('ruleForm')" v-if="userInfo.sjhm" class="phoneBtn">更换手机号
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="title" class="dialog-header">
				<div v-if="!userInfo.sjhm">绑定手机号</div>
				<div v-if="userInfo.sjhm">更换绑定手机号</div>
			</span>
		</el-dialog>

		<!-- 绑定邮箱 -->
		<el-dialog :visible.sync="EditorEmailDialogVisible" width="600px" :lock-scroll="true" :show-close="false" :modal="false">
			<div class="dialog__body-wrap">
				<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-dynamic">
					<el-form-item prop="newEmail" label="邮箱账号" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
						<el-input v-model.trim="ruleForm.newEmail" placeholder="输入邮箱"></el-input>
					</el-form-item>
					<!-- <el-form-item label="验证码">
						<el-input type="text" :maxlength="6" v-model.trim="ruleForm.newEmailCode" placeholder="邮箱验证码" autocomplete="off">
							<el-button type="primary" slot="append" class="yzm" v-if="ruleForm.newEmailsendAuthCode" @click="EmailresetForm"
								style="color: #FF5656;">获取验证码</el-button>
							<el-button type="text" slot="append" class="yzm" v-if="!ruleForm.newEmailsendAuthCode" @click="EmailresetForm">{{ruleForm.newEmailauth_time}}</el-button>
						</el-input>
					</el-form-item> -->
					<el-form-item style="margin-bottom: 0.625rem;">
						<el-button type="primary" @click="EditorEmailForm('ruleForm')" class="emailBtn" v-if="!userInfo.yx">绑定邮箱
						</el-button>
						<el-button type="primary" @click="EditorEmailForm('ruleForm')" class="emailBtn" v-if="userInfo.yx">更换绑定邮箱
						</el-button>
						<el-button type="text" @click="EditorEmailDialogVisible=false" v-if="!userInfo.yx" style="color: #FF5656;">暂不绑定</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="title" class="dialog-header">
				<div v-if="!userInfo.yx">绑定邮箱账号</div>
				<div v-if="userInfo.yx">更换绑定邮箱账号</div>
			</span>
		</el-dialog>

		<!-- 绑定微信 -->
		<el-dialog :visible.sync="WxEmailDialogVisible" width="600px" :lock-scroll="true" :show-close="true" :modal="false">
			<div class="dialog__body-wrap wrap_Wx">
				<div id="qrcode" ref="qrcode"></div>
				<QRCode style="display:none"></QRCode>
			</div>
			<span slot="title" class="dialog-header">
				<div v-if="!userInfo.email">绑定微信</div>
				<div v-if="userInfo.email">更换微信</div>
			</span>
		</el-dialog>

		<!-- 职位弹出框 -->
		<post :venue-dialog-visible="post.dialog" @change="changePost" @close="closePost"></post>

		<el-dialog
			:visible.sync="carddialog"
			width="50%"
			:lock-scroll="true"
			:show-close="true"
            :before-close="onCancel"
			:modal="false">
			<div class="dialog__body-wrap card_dialog">
				<div class="dialog_info">
                    <el-form ref="card" :model="card" :rules="cardRules"  label-width="115px">
						<el-form-item label="手机号码："   prop="sjhm">
							<el-input v-model.trim="card.sjhm" :maxlength="11"  placeholder="请输入手机号码"></el-input>
						</el-form-item>
						<el-form-item label="密码："  prop="pwd" >
							<el-input v-model.trim="card.pwd" type="password" :maxlength="10" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="姓名："  prop="xm" >
							<el-input v-model.trim="card.xm" placeholder="请输入姓名"></el-input>
						</el-form-item>
						<el-form-item label="电子邮箱："  prop="yx">
							<el-input v-model.trim="card.yx" placeholder="请输入电子邮箱"></el-input>
						</el-form-item>
						<el-form-item label="性别："  >
							<el-radio-group v-model.trim="card.xb">
								<el-radio v-for="tab in findDmList['m_xbdm']" :key="tab.dm" :label="tab.dm">{{tab.name}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="职位名称：" prop="zw">
							<el-input v-model.trim="card.zw" placeholder="请输入职位名称"></el-input>
						</el-form-item>
						<el-form-item label="身份证号：" >
							<el-input v-model.trim="card.sfzhm" :maxlength="18" placeholder="请输入身份证号" ></el-input>
						</el-form-item>
						<el-form-item label="身份类型：" prop="sflx">
							<el-select placeholder="请选择身份类型" filterable v-model.trim="card.sflx">
								<el-option v-for="(item,index) in sflx_list" :key='index' :label="item.name" :value="item.dm">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button type="danger" @click="onSubmit('card')">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>添加子账号</div>
			</span>
		</el-dialog> 
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import { mapState } from 'vuex'
	import crypto from "crypto"; //密码加密
	import Post from '../../common/Post'
	// import QRCode from "qrcodejs2"
	export default {
		name: 'Enter_card',
		components: {
			Post,
			// QRCode
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入原密码'));
				} else {
					callback();
				}
			};
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入新密码'));
				} else {
					if (this.ruleForm.newcheckPassWord !== '') {
						this.$refs.ruleForm.validateField('newcheckPassWord');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入新密码'));
				} else if (value !== this.ruleForm.newPassWord) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				sflx_list:[  
					{dm: "s_001", name: "人力资源"},
					{dm: "s_0012", name: "用人方 "} 
				],
				qr: '',
				qrcode: '',
				// 职位
				post: {
					dialog: false,
					value: '请选择'
				},
				userInfo: {},
				enterDetail: {
					dwjs: ''
				},
				Editor: false,
				EditorPhoneDialogVisible: false,
				EditorEmailDialogVisible: false,
				WxEmailDialogVisible: false,
				PwdDialogVisible:false,
				ruleForm: {
					oldIphone: '',
					oldIphoneCode: '',
					oldPassWord: '',
					oldEmail: '',
					oldEmailCode: '',
					oldsendAuthCode: true,
					oldauth_time: 0,

					newIphone: '',
					newIphoneCode: '',
					newPassWord: '',
					newcheckPassWord: '',
					newsendAuthCode: true,
					newauth_time: 0,

					newEmail: '',
					newEmailCode: '',
					newEmailsendAuthCode: true,
					newEmailauth_time: 0,
				},
				rules: {
					oldIphone: [{
						required: true,
						message: '请输入原手机号',
						trigger: 'blur'
					}, {
						min: 11,
						message: '请输入有效的手机号',
						trigger: 'blur'
					}],
					oldIphoneCode: [{
						required: true,
						message: '原手机号短信验证码',
						trigger: 'blur'
					}, ],
					newIphone: [{
						required: true,
						message: '请输入新手机号',
						trigger: 'blur'
					}, {
						min: 11,
						message: '请输入有效的手机号',
						trigger: 'blur'
					}],
					newIphoneCode: [{
						required: true,
						message: '新手机号短信验证码',
						trigger: 'blur'
					}, ],
					oldPassWord: [{
						validator: validatePass,
						trigger: "blur"
					}],
					newPassWord: [{
						validator: validatePass1,
						trigger: "blur"
					}],
					newcheckPassWord: [{
						validator: validatePass2,
						trigger: "blur"
					}],

				},
				
				IntheUnit: {
					IntheUnitList: [],
					shzt: '',
					page: 1,
					limit: 10,
					totalCount: 0
				},
				cardRules:{
					sjhm: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}, {
						min: 11,
						message: '请输入有效的手机号码',
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					xm: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					yx: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
					zw: [{
						required: true,
						message: '请输入职位',
						trigger: 'blur'
					}],
					sfzhm: [{
						required: true,
						message: '请输入身份证号码',
						trigger: 'blur'
					}],
					sflx: [{
						required: true,
						message: '请输入身份类型',
						trigger: 'blur'
					}],

				},
				carddialog: false,
				card:{
					sjhm:'',
					pwd:'',
					xm:'',
					yx:'',
					xb:'xb_001',
					zw:'',
					sfzhm:'',
					sflx:''
				},
			};
		},
		created() {
			this.mineMessgae();
			this.getIntheUnitList(1);
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				imageUrl: 'getHREnterLogo'
			}), 
			...mapState({
				findDmList: state => state.findDmList,
				findDmMap: state => state.findDmMap
			}),
		},
		mounted() {},
		methods: {
			// 新增子账号
			addCard(){
				this.carddialog = true
			},
            // 取消
            onCancel() { 
				this.setClear(); 
				this.carddialog = false
			},
			// 清空内容
			setClear(){
				this.card={
					sjhm:'',
					pwd:'',
					xm:'',
					yx:'',
					xb:'xb_001',
					zw:'',
					sfzhm:'',
					sflx:''
				}
				this.carddialog = false
			},
            // 完成
            onSubmit(card) {
				var pwd = this.card.pwd;
				var md5 = crypto.createHash("md5");
				md5.update(pwd); //需要加密的密码
				pwd = md5.digest("hex"); //password 加密完的密码
				let params = {  
                    sjhm: this.card.sjhm, 
                    pwd: pwd, 
                    xm: this.card.xm, 
                    yx: this.card.yx, 
                    xb: this.card.xb, 
                    zw: this.card.zw,  
                    sfzhm: this.card.sfzhm, 
                    sflx: this.card.sflx
				}
				var that = this;
				
				that.$refs[card].validate((valid) => {
					if (valid) {
						let url = '/api/hr/qyhrjrqysh/addSubAccount'
						this.axios.post(url, params, {
							headers: {
								"content-type": "application/json",
								'token':this.token
							}
						}).then((res) => {
							if (res && res.data && res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									offset: 400
								}); 
								this.setClear();
								this.getIntheUnitList(1);
							} else {
								this.$message({
									message: res.data.msg,
									type: 'warning',
									offset: 400
								});
							}
						}).catch((error) => {
							console.log(error);
						}); 
					}
				});
				
            },

			getIntheUnitList(shzt) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/hr/qyhrjrqysh/list',
					data: '',
					params: {
						// shzt: '',
						page: that.IntheUnit.page,
						limit: that.IntheUnit.limit,
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('getIntheUnitList:', response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.page.list;
						that.IntheUnit.totalCount = response.data.page.totalCount;
						that.IntheUnit.IntheUnitList = data.map(item => {
							item.status = item.SHZT == '1' ? '未审核' : item.SHZT == '2' ? '已通过' : item.SHZT == '3' ? '已拒绝' : '';
							return item;
						})
					} else {
						that.$message({
							message: '待加入公司审核通过，才可进行操作',
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			filterTag(value) {
				console.log(value)
				this.IntheUnit.shzt = value;
				this.getIntheUnitList(value);
			},
			changeRow(rows, shzt) { //审核
				console.log(rows, shzt);
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/hr/qyhrjrqysh/joinReview',
					data: '',
					params: {
						hrid: rows.HRID,
						dwid: rows.DWID,
						shzt: shzt,
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					console.log('changeRow:', response);
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '已审核',
							offset: 400
						});
						that.getIntheUnitList(that.IntheUnit.shzt);
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
			changeDeleteRow(rows) {	//删除
				console.log('删除',rows)
			},
			handleCurrentChange(currentPage) {
				this.IntheUnit.page = currentPage;
				this.getIntheUnitList(this.IntheUnit.shzt);
			},
			setCode() {
				this.WxEmailDialogVisible = true
				this.qrcode = 'https://www.baidu.com'
				// 使用$nextTick确保数据渲染
				this.$nextTick(() => {
					this.crateQrcode()
				})
			},
			// 生成二维码
			crateQrcode() {
				// this.qr = new QRCode('qrcode', {
				// 	width: 200,
				// 	height: 200, // 高度
				// 	text: this.qrcode // 二维码内容
				// 	// render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
				// 	// background: '#f0f'
				// 	// foreground: '#ff0'
				// })
			},
			// 获职位选择值
			changePost(obj) {
				console.log(obj)
			},
			// 关闭职位弹出框
			closePost(obj) {
				console.log(obj)
				this.post.dialog = false;
			},
			mineMessgae() {
				var that = this;
				that.axios.get('/api/hr/qydwhrxx/getHrInfo', {
					headers: {
						'content-type': 'application/json',
						token: that.token
					}
				}).then(function(response) {
					// console.log('mineMessgae:', response);
					if (response && response.data && response.data.code == 0) {
						var data = response.data.qyDwhrxxEntity;
						that.userInfo = data;
						if (!that.imageUrl) {
							that.userinfoLogo();
						}
						that.axios({
							method: "post",
							url: "/api/hr/bskhgl/findDwInfoHr",
							headers: {
								token: that.token
							}
						}).then(res => {
							if (res && res.data && res.data.code == 0) {
								that.enterDetail = res.data.BsKhglEntity;
							}
						});
					} else {
						that.$message({
							message: '无单位信息，待加入公司审核通过',
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			EditorenterDetail() {
				this.Editor = false;
				// this.axios({
				// 	method: 'post',
				// 	url: '/api/hr/bskhgl/updateDw',
				// 	data: this.enterDetail,
				// 	params: {
				// 		save: true
				// 	},
				// 	headers: {
				// 		// "content-type": "application/json",
				// 		'token': this.token
				// 	}
				// }).then(res => {
				// 	if (res && res.data && res.data.code == 0) {
				// 		console.log(res)
				// 		this.$message({
				// 			message: '操作成功',
				// 			type: 'success'
				// 		});
				// 	}
				// });
			},
			userinfoLogo() {
				var dwid = this.userInfo.dwid;
				this.axios({
					method: 'post',
					url: '/api/hr/qydwhrxx/getDwFileList',
					data: '',
					params: {
						dwid: dwid
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code == 0) {
						var data = res.data.page;
						var logoArr = [];
						var newLogo = '';
						data.map(item => {
							if (item.wjlx == 20&&item.wjlx) {
								logoArr.push(item)
							}
						})
						if (logoArr.length>0) {
							newLogo = logoArr[logoArr.length-1].wjid;
							this.userinfoImg(newLogo)
						}
						
					}
				});
			},
			userinfoImg(fileId) {
				var dwid = this.userInfo.dwid;
				this.axios({
					method: 'get',
					url: '/api/hr/qydwhrxx/getFile/'+ fileId,
					data: '',
					params: {
						userId: dwid,
						fileType: 20
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					this.$store.commit('updateHREnterLogo', res.data.fileUrl);
				});
			},
			
			
			
			Editoruserinfo() {
				var that = this;
				that.Editor = false;
			},
			EditorPhoneForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid) {
						console.log(that.ruleForm);
						var newPhone = that.ruleForm.newIphone;
						var oldValidateCode = that.ruleForm.oldIphoneCode;
						var newValidateCode = that.ruleForm.newIphoneCode;
						that.axios({
							url: '/api/sec/secuser/checkPhoneCode',
							method: 'get',
							params: {
								newPhone: newPhone,
								oldValidateCode: oldValidateCode,
								newValidateCode: newValidateCode,
							},
							headers: {
								token: that.token,
							}
						}).then(function(response) {
							console.log(response);
							if (response && response.data && response.data.code == 0) {
								that.$message({
									message: "修改成功，请重新登录",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({
										path: "/public/login?activeName=first"
									});
								}, 2000);
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
				})
			},
			EditorEmailForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid && that.ruleForm.newEmail) {
						var newEmail = that.ruleForm.newEmail;
						that.axios({
							method: 'post',
							url: '/api/sec/secuser/changeEmail',
							params: {
								email: newEmail
							},
							headers: {
								"content-type": "application/json",
								'token': that.token
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$message({
									type: 'success',
									message: '邮箱修改成功',
									offset: 300
								});
								that.EditorEmailDialogVisible = false;
								that.mineMessgae();
							} else {
								that.$message({
									type: 'error',
									message: response.data.msg,
									offset: 300
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					}
				})
			},
			EditorpwdsubmitForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid) {
						console.log(that.ruleForm);
						var oldmd = crypto.createHash("md5");
						var oldPwd = that.ruleForm.oldPassWord;
						oldmd.update(oldPwd);
						oldPwd = oldmd.digest("hex");

						var newmd = crypto.createHash("md5");
						var newPwd = that.ruleForm.newcheckPassWord;
						newmd.update(newPwd);
						newPwd = newmd.digest("hex");

						that.axios.get("/api/sec/secuser/updatePwd", {
							params: {
								oldPwd: oldPwd,
								newPwd: newPwd,
							},
							headers: {
								'content-type': 'application/json',
								'token': that.token
							}
						}).then(function(response) {
							console.log(response);
							if (response && response.data && response.data.code == 0) {
								that.$message({
									message: "修改成功，请重新登录",
									type: "success",
									offset: 400
								});
								setTimeout(() => {
									that.$router.push({
										path: "/public/login?activeName=first"
									});
								}, 2000);
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
				})
			},
			//

			//
			// get() {
			// 	var that = this;
			// 	that.axios({
			// 		url: '/api/hr/qyhrjrqysh/list',
			// 		method: 'get',
			// 		params: '',
			// 		headers: {
			// 			token: that.token,
			// 		}
			// 	}).then(function(response) {
			// 		if (response && response.data && response.data.code == 0) {
			// 			that.$message({
			// 				message: "修改成功，请重新登录",
			// 				type: "success",
			// 				offset: 400
			// 			});
			// 			setTimeout(() => {
			// 				that.$router.push({ path: "/login" });
			// 			}, 2000);
			// 		} else {
			// 			that.$message({
			// 				message: response.data.msg,
			// 				offset: 400
			// 			});
			// 		}
			// 	}).catch(function(error) {
			// 		console.log(error);
			// 	});
			// },
			handleDelete(index, row) {
				console.log(index, row);
			},
			//

			oldresetForm() {
				var that = this;
				that.ruleForm.oldsendAuthCode = false;
				that.ruleForm.oldauth_time = 60;
				var auth_timetimer = setInterval(() => {
					that.ruleForm.oldauth_time--;
					if (that.ruleForm.oldauth_time <= 0) {
						that.ruleForm.oldsendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
				that.axios.get("/api/sec/secuser/sendOldPhoneCode", {
					// params: {
					// 	phone: phone
					// },
					headers: {
						'content-type': 'application/json',
						'token': that.token
					}
				}).then(function(response) {
					// console.log(response);
					if (response && response.data && response.data.code == 0) {
						that.$message({
							message: "验证码已发送",
							type: "success",
							offset: 400
						});
					} else {
						that.ruleForm.oldsendAuthCode = true;
						clearInterval(auth_timetimer);
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}

				}).catch(function(error) {
					console.log(error);
				});


			},
			newresetForm() {
				var that = this;
				var phone = that.ruleForm.newIphone;
				if (phone) {
					that.ruleForm.newsendAuthCode = false;
					that.ruleForm.newauth_time = 60;
					var auth_timetimer = setInterval(() => {
						that.ruleForm.newauth_time--;
						if (that.ruleForm.newauth_time <= 0) {
							that.ruleForm.newsendAuthCode = true;
							clearInterval(auth_timetimer);
						}
					}, 1000);
					that.axios.get("/api/sec/secuser/sendNewPhoneCode", {
						params: {
							phone: phone
						},
						headers: {
							'content-type': 'application/json',
							'token': that.token
						}
					}).then(function(response) {
						// console.log(response);
						if (response && response.data && response.data.code == 0) {
							that.$message({
								message: "验证码已发送",
								type: "success",
								offset: 400
							});
						} else {
							that.ruleForm.newsendAuthCode = true;
							clearInterval(auth_timetimer);
							that.$message({
								message: response.data.msg,
								offset: 400
							});
						}

					}).catch(function(error) {
						console.log(error);
					});
				}


			},
			EmailresetForm() {},
			
			
			//上传
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			// 上传判断
			beforeAvatarUpload(file) {
				var isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type)
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是图片格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return false;
			},
			
			//回调上传接口
			uploadmsg(key, data, file) {
				console.log('2-2-2-2-2',key, data, file);
				var dwid = this.userInfo.dwid;
				this.axios.post("/api/hr/qydwhrxx/saveFile", {
					wjmc: file.name, //文件名
					upid: data.upid,
					dwid: dwid,
					keyName: key,
					fileType: '20' //文件类型：10.环境图片 20.公司logo 30.营业执照 40.身份证 50.HR头像
				}, {
					headers: {
						'token': this.token
					}
				}).then(res => {
						this.userinfoImg(res.data.msg)
				});
			},
			// 文件选择成功后
			afterRead(file) {
				var files = file.raw;
				console.log(files)
				var isJPG = /^image\/(jpeg|png|jpg)$/.test(files.type)
				const isLt2M = files.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是图片格式!');
					return false;
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					return false;
				}
			
				if (file.status != "ready") {
					this.$message({
						message: file.status,
						type: 'warning'
					});
					return false
				}
				this.axios({
					method: 'post',
					url: '/api/hr/qydwhrxx/getOssKey?fileType=20', //文件类型：10.环境图片 20.公司logo 30.营业执照 40.身份证 50.HR头像
					
					headers: {
						// "content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code === 0) {
						var info = res.data.info;
						this.ossupload(info, files);
					} else {
						this.fileList = [];
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				}).catch(err => {
					this.$message({
						message: err.msg,
						type: 'warning'
					});
				});
			},
			ossupload(data, file) {
				var fd = new FormData();
				fd.append("OSSAccessKeyId", data.accessid);
				fd.append("policy", data.policy);
				fd.append("signature", data.signature);
				//文件名字
				fd.append("key", data.dir + file.name);
				fd.append("dir", data.dir);
				fd.append("success_action_status", "200");
				//文件必须声明在最后，否则异常
				fd.append("file", file);
				var key = data.dir + file.name
				return new Promise((resolve, reject) => {
					this.axios.post(data.host, fd, {
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						transformRequest: function(xxx) {
							console.log("xxx = ", xxx);
							return xxx;
						}
					}).then(res => {
						this.uploadmsg(key, data, file);
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						resolve(res);
					}).catch(err => {
						reject(err);
					});
				});
			},
			//

		}
	};
</script>

<style lang='less' scoped>
.card_dialog{
	.el-form-item {
		// margin-bottom: 8px !important;
	}
	.el-input { 
		width: 300px;
	}
}
.adds{
	margin-left: 20px;
}
	.wrap_Wx {
		padding: 20px;
		text-align: center;
	}

	/* .img_wx{
	width: 270px;
	height: 270px;
} */
	#qrcode {
		text-align: center;
		width: 200px;
		margin: 0 auto;
	}

	/deep/.el-table th.is-leaf {
		background: rgb(229, 229, 229);
		font-size: 16px;
		color: #303133;
		font-weight: normal;
	}

	.lo_fl_wrap1 .el-form {
		width: 80%;
	}

	.lo_fl_wrap1 .el-form .el-form-item {
		display: inline-block;
		width: 50%;
	}

	.lo_fl_wrap1 .el-form-item__content {
		width: 250px;
	}

	.lo_fl_wrap1 .el-form {
		overflow: auto;
	}

	.lo_fl_wrap1 .el-button {
		height: 36px;
		width: 84px;
		margin-right: 30px;
	}

	.edit_btn {
		cursor: default;
		font-size: 14px;
		color: #fc5e5b;
		position: absolute;
		right: 0;
		display: inline-block;
		padding-left: 30px;
		line-height: 30px;
		background: url("../../../assets/images/enter/Icon-edit.png") 0 2px no-repeat;
	}

	.lo_fl .lo_fl_wrap1 {
		margin-top: 1rem;
		position: relative;
	}

	.el-upload__tip {
		margin-left: 20px;
		display: initial;
	}

	.Hunter_card {
		margin-bottom: 1rem;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.lo_fl {
		background-color: #ffffff;
		padding: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.lo_fl .title {
		font-size: 1rem;
		font-weight: 600;
	}
	.lo_fl .title .tabtext {
		float: right;
		margin-right: 0.625rem;
	}

	.lo_fl:last-child {
		margin-bottom: 0;
		padding-bottom: 0.625rem;
	}

	.lo_fl .lo_fl_wrap {
		display: flex;
		margin-top: 1rem;
		justify-content: flex-start;
		position: relative;
	}

	.lo_fl .lo_fl__wrap {
		margin-top: 1rem;
		width: 26.875rem;
	}

	.lo_fl_wrap .user_img {
		width: 5.75rem;
		height: 5.75rem;
		margin-right: 20px;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #979797;
		position: relative;
	}

	.lo_fl_wrap .phone_img,
	.lo_fl_wrap .email_img,
	.lo_fl_wrap .wechat_img {
		width: 1.375rem;
		height: 1.375rem;
		margin-right: 0.625rem;
	}

	.lo_fl_wrap .user_name {
		line-height: 2;
		padding-top: 0;
		width: 600px;
	}

	/deep/.el-textarea__inner {
		min-height: 100px;
		margin: 15px 0;
	}

	.lo_fl_wrap .wrap-name-text {
		font-size: 16px;
		color: #606266;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.lo_fl_wrap .wrap-name--text {
		color: #a7a7a7;
		font-size: 0.875rem;
		overflow: hidden;
		display:-webkit-box;
		-webkit-line-clamp:4;
		-webkit-box-orient:vertical;
		line-height: 1.4;
	}
	.wrap-name_text {
		position: absolute;
		top: 30px;
		left: 1px;
		display: none;
	}
	.user_img:hover .wrap-name_text {
		display: block;
	}

	.lo_fl_wrap .wrap-text {
		font-size: 14px;
		color: #606266;
	}

	.lo_fl .theEditor .el-button {
		padding: 3px 12px;
		color: #fc5e5b;
	}

	.el-form .yzm {
		width: 103px;
	}

	.phoneBtn,
	.emailBtn,
	.passBtn {
		background-color: #ff5656;
		border-color: #ff5656;
		padding: 12px 20px;
	}

	.phoneBtn,
	.passBtn {
		width: 100%;
	}

	/deep/.el-input__inner {
		width: 100%;
		border: 1px solid #dcdfe6;
		padding-left: 0.9375rem;
	}

	/deep/.el-dialog {
		/* margin-top: 42vh !important; */
	}

	/deep/.el-dialog__body {
		padding: 5px 20px;
	}

	.el-form-item {
		margin-bottom: 20px !important;
	}

	.iphone_code {
		display: flex;
	}
	/deep/ .el-table__row .cell {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	} 
</style>
