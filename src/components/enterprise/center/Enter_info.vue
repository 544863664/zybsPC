<!-- 企业信息 -->
<template>
	<div class="info">
		<!-- 企业单位基本信息 -->
		<div class="con">
			<h1>企业单位基本信息
									<!-- // 0：未审核  1：已通过   2:未通过 单位信息审核通过后 不能再修改信息-->
				<span class="title_tip" v-if="shzt == 0 && shzt != null">您的信息已提交审核，一个工作日内系统会进行审核，还请耐心等待。</span>
				<span class="title_tip" v-if="shzt == 1 && shzt != null">{{tipInfo}}</span>
			</h1>
			<el-form ref="dwBase" :model="BsKhglEntity" :rules="dwBaseRules" label-width="140px" class="form">
				<el-form-item prop="dwmc" label="企业单位名称：">
					<el-input v-model="BsKhglEntity.dwmc" :disabled="disabled" show-word-limit maxlength="50"></el-input>
					<el-tooltip class="item" effect="dark" content="认证通过后，名称不允许修改" placement="bottom">
						<i class="tip1"></i>
					</el-tooltip>
				</el-form-item>
				<el-form-item label="企业单位logo：">
					<el-upload class="avatar-uploader" ref="upload" :disabled="disabled" :action="host" :limit="100" :accept="fileType"
						:auto-upload="false" :on-change="afterRead1" :show-file-list="false" :before-upload="beforeAvatarUpload">
						<img v-if="upload.qydwimageUrl" :src="upload.qydwimageUrl" class="avatar" style="width: 82px;border: none;" />
						<i v-else class="el-icon-plus avatar-uploader-icon">上传企业单位LOGO</i>
					</el-upload>
					<span class="upload-tip">上传公司logo，支持jpg、png、bmp格式的图片，大小不要超过800k</span>
				</el-form-item>
				<!-- <el-form-item label="企业单位环境：">
					<el-upload class="avatar-uploader" ref="upload" :disabled="disabled" :action="host" :limit="1" :accept="fileType"
						:auto-upload="false" :on-change="afterRead9" :show-file-list="false" :before-upload="beforeAvatarUpload">
						<img v-if="upload.enterHjimg" :src="upload.enterHjimg" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon">上传企业单位环境</i>
					</el-upload>
				</el-form-item> -->
				<el-form-item prop="dwszcs" label="单位地址：">
					<p :class="disabled?'col_select gray':'col_select'" @click="openCity(2)">
						{{gsdzss}}
						<span class="el-input__suffix">
							<span class="el-input__suffix-inner">
								<i class="el-select__caret el-input__icon el-icon-arrow-down"></i>
							</span>
						</span>
					</p>
				</el-form-item>
				<el-form-item prop="dwszxxdz" label="单位详细地址：">
					<el-input v-model="BsKhglEntity.dwszxxdz" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item prop="dwgm" label="单位人数：">
					<el-select v-model="BsKhglEntity.dwgm" :disabled="disabled" placeholder="请选择">
						<el-option v-for="item in gmOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="lxdh" label="招聘电话：">
					<el-input v-model="BsKhglEntity.lxdh" :disabled="disabled" maxlength="12"></el-input>
				</el-form-item>
				<el-form-item prop="lxyx" label="单位邮箱：">
					<el-input v-model="BsKhglEntity.lxyx" :disabled="disabled" maxlength="30"></el-input>
				</el-form-item>
				<el-form-item prop="dwjs" label="单位简介：" class="text_area">
					<el-input v-model="BsKhglEntity.dwjs" type="textarea" :disabled="disabled" show-word-limit maxlength="1000"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<!-- 企业营业执照信息 -->
		<div class="con">
			<h1>企业营业执照信息</h1>
			<el-form ref="dwExt" :model="BsKhglEntity" :rules="dwExtRules" label-width="140px" class="form">
				<el-form-item prop="dwxz" label="企业单位性质：">
					<el-select v-model="BsKhglEntity.dwxz" :disabled="disabled" placeholder="请选择">
						<el-option v-for="item in xzOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="sshy" label="所属行业领域：">
					<p :class="disabled?'col_select gray':'col_select'" @click="openTrade">
						{{hyName}}
						<span class="el-input__suffix">
							<span class="el-input__suffix-inner">
								<i class="el-select__caret el-input__icon el-icon-arrow-down"></i>
							</span>
						</span>
					</p>
				</el-form-item>
				<el-form-item prop="zczj" label="注册资金(W)：">
					<el-input v-model="BsKhglEntity.zczj" :disabled="disabled" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item prop="dwclsj" label="单位注册日期：">
					<el-date-picker :disabled="disabled" v-model="BsKhglEntity.dwclsj" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
						type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="营业执照：">
					<el-upload class="avatar-uploader" ref="upload" :disabled="disabled" :action="host" :limit="100" :accept="fileType"
						:auto-upload="false" :on-change="afterRead2" :show-file-list="false" :before-upload="beforeAvatarUpload">
						<img v-if="upload.yyzzimageUrl" :src="upload.yyzzimageUrl" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon">上传营业执照</i>
					</el-upload>
					<span class="upload-tip">上传加盖企业公章的营业照。照片/扫描件支持jpg、png、bmp格式的图片。大小不要超过4M</span>
				</el-form-item>
			</el-form>
		</div>
		<!-- 企业单位HR信息 -->
		<div class="con">
			<h1>企业单位HR信息</h1>
			<el-form ref="hr" :model="qyDwhrxxEntity" :rules="hrRules" label-width="140px" class="form">
				<el-form-item prop="xm" label="姓名：">
					<el-input v-model="qyDwhrxxEntity.xm" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item prop="zw" label="职位：">
					<el-input :value="qyDwhrxxEntity.zw=='s_001'?'人力资源(HR/HRBF)':'用人方(BOSS/主管/员工)'" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item prop="sjhm" label="手机：">
					<el-input v-model="qyDwhrxxEntity.sjhm" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item prop="yx" label="电子邮箱：">
					<el-input v-model="qyDwhrxxEntity.yx" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item prop="xb" label="性别：">
					<el-select v-model="qyDwhrxxEntity.xb" :disabled="disabled">
						<el-option v-for="item in xbOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="sfzhm" label="身份证号码：">
					<el-input v-model="qyDwhrxxEntity.sfzhm" :disabled="disabled" minlength="15" maxlength="18"></el-input>
				</el-form-item>
				<el-form-item prop="idCardPhoto" label="身份证上传：" style="padding-bottom: 20px;">
					<el-upload class="avatar-uploader uploader1" ref="upload" :action="host" :disabled="disabled" :limit="100" :accept="fileType"
						:auto-upload="false" :on-change="afterRead3" :show-file-list="false" :before-upload="beforeAvatarUpload">
						<i class="el-icon-plus avatar-uploader-icon">上传</i>
					</el-upload>
					<ul class="uplaods_sfz">
						<li v-for="(item,index) in sfzImgList" :key="index">
							<img :src="item.fileUrl">
							<el-button :disabled="disabled" type="danger" size="mini" @click="deleteSfz(item.id,index)" plain>删除</el-button>
						</li>
					</ul>
				</el-form-item>
			</el-form>
		</div>
		<div class="btn">
			<el-button type="danger" :disabled="disabled" @click="save" v-if="HR == 'HR'">{{BsKhglEntity.hrid ? '更新':'保存'}}</el-button>
			<el-button type="danger" :disabled="disabled" @click="save" v-else>{{BsKhglEntity.dwid ? '更新':'保存'}}</el-button>
			<el-button type="danger" :disabled="disabled" @click="submit">提交</el-button>
		</div>
		<!-- 行业弹出框 -->
		<trade :venue-dialog-visible="tradedialog" @change="changeTrade" @close="closeTrade"></trade>
		<!-- 城市弹出框 -->
		<city :venue-dialog-visible="citydialog" :level="2" @change="changeCity" @close="closeCity"></city>
	</div>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import {
		mapGetters
	} from "vuex";
	import Trade from "../../common/Trade";
	import City from "../../common/City";
	export default {
		name: "Enter_center",
		components: {
			Trade,
			City
		},
		data() {
			return {
				enterinfo: false,
				fileType: "*.*",
				fileList: [],
				host: '',
				upid: "",
				filename: '',
				showFileList: false,
				upload: {
					qydwimageUrl: '',
					enterHjimg: '',
					yyzzimageUrl: ''
				},
				
				sfzImgList: [],

				qyDwhrxxEntity: {
					dwid: "",
					gh: "",
					hrid: "",
					sfzhm: "",
					sjhm: "",
					xb: "",
					xm: "",
					yx: "",
					zw: ""
				},
				BsKhglEntity: {
					dwid: "",
					dwmc: "",
					dwgm: "",
					sshy: "",
					dwxz: "",
					lxdh: "",
					lxyx: "",
					dwjs: "",
					dwszsf: "",
					dwszcs: "",
					dwszxxdz: "",
					dwclsj: "",
					zczj: ""
				},
				hrRules: {
					phone: [{
							required: true,
							message: "请输入手机号",
							trigger: "blur"
						},
						{
							min: 11,
							message: "请输入有效的手机号",
							trigger: "blur"
						}
					],
					xm: [{
						required: true,
						message: "请输入HR姓名",
						trigger: "blur"
					}],
					// zw: [{
					// 	required: true,
					// 	message: "请输入HR职位",
					// 	trigger: "blur"
					// }],
					sjhm: [{
						required: true,
						message: "请输入HR手机号码",
						trigger: "blur"
					}],
					yx: [{
						required: true,
						message: "请输入HR邮箱",
						trigger: "blur"
					}],
					xb: [{
						required: true,
						message: "请输入HR性别",
						trigger: "blur"
					}],
					// sfzhm: [{
					// 	required: true,
					// 	message: "请输入HR身份证号码",
					// 	trigger: "blur"
					// }],
					// idCardPhoto: [{
					// 	required: true,
					// 	message: "请上传HR身份证正反面",
					// 	trigger: "blur"
					// }],
				},
				dwBaseRules: {
					dwmc: [{
						required: true,
						message: "请输入单位名称",
						trigger: "blur"
					}],
					dwszcs: [{
						required: true,
						message: "请输入单位所在省市",
						trigger: "change"
					}],
					dwszxxdz: [{
						required: true,
						message: "请输入单位详细地址",
						trigger: "blur"
					}],
					dwgm: [{
						required: true,
						message: "请输入单位人数",
						trigger: "change"
					}],
					lxdh: [{
						required: true,
						message: "请输入单位联系电话",
						trigger: "blur"
					}],
					lxyx: [{
							required: true,
							message: "请输入单位联系邮箱",
							trigger: "blur"
						},
						{
							type: "email",
							message: "请输入正确的邮箱地址",
							trigger: ["blur", "change"]
						}
					],
					dwjs: [{
						required: true,
						message: "请输入单位介绍",
						trigger: "blur"
					}]
				},
				dwExtRules: {
					dwxz: [{
						required: true,
						message: "请输入单位性质",
						trigger: "change"
					}],
					sshy: [{
						required: true,
						message: "请输入单位行业",
						trigger: "change"
					}]
				},
				list: [],

				shzt: null,
				sqzt: null,
				submitSqzt: null,

				imageUrl: "",
				citydialog: false,
				tradedialog: false,
				tipInfo: ''
			};
		},
		created() {
			this.init();
		},

		computed: {
			...mapGetters({
				token: "getToken",
				Jobseekers: 'getJobseekers',
				HR: 'getHR',
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				findDmList: state => state.findDmList,
				ProvinceList: state => state.ProvinceList,
				ProvinceMap: state => state.ProvinceMap,
				CityList: state => state.CityList,
				CityMap: state => state.CityMap,
				AreaList: state => state.AreaList,
				AreaMap: state => state.AreaMap
			}),

			disabled() {
				let status = false;
				// 0：未审核  1：已通过   2:未通过 单位信息审核通过后 不能再修改信息
				// if (0 <= this.shzt && this.shzt <= 1 && this.shzt != null) {
				// 	status = true
				// }
				if (this.shzt < 2 && this.shzt != null) {
					status = true
				}
				
				return status; //2未通过  和 3草稿 可以修改
			},

			hyName() {
				if (
					this.findDmMap.m_dwsshydm &&
					this.BsKhglEntity.sshy &&
					this.findDmMap.m_dwsshydm[this.BsKhglEntity.sshy]
				) {
					return this.findDmMap.m_dwsshydm[this.BsKhglEntity.sshy];
				} else {
					return "请选择";
				}
			},

			xbOptions() {
				let options = [];

				if (this.findDmList && this.findDmList.m_xbdm) {
					this.findDmList.m_xbdm.forEach(item => {
						options.push({
							value: item.dm,
							label: item.name
						});
					});
				}

				return options;
			},

			gsdzss() {
				let item = "";

				if (this.ProvinceMap && this.BsKhglEntity.dwszsf) {
					item = this.ProvinceMap[this.BsKhglEntity.dwszsf] || "";

					if (
						this.CityMap &&
						this.BsKhglEntity.dwszcs &&
						this.CityMap[this.BsKhglEntity.dwszsf]
					) {
						item +=
							this.CityMap[this.BsKhglEntity.dwszsf][this.BsKhglEntity.dwszcs] ||
							"";
					}
				}

				return item;
			},

			xzOptions() {
				let options = [];

				if (this.findDmList && this.findDmList.m_dwxzdm) {
					this.findDmList.m_dwxzdm.forEach(item => {
						options.push({
							label: item.name,
							value: item.dm
						});
					});
				}

				return options;
			},

			gmOptions() {
				let options = [];

				if (this.findDmList && this.findDmList.m_dwgmdm) {
					this.findDmList.m_dwgmdm.forEach(item => {
						options.push({
							label: item.name,
							value: item.dm
						});
					});
				}

				return options;
			}
		},
		mounted() {
			this.userinfoImgList();
			var path = this.$route;
			this.enterinfo = path.query.enterinfo||false;
			
			if(this.enterinfo) {
				this.open()
			}
		},
		methods: {
			// 身份证删除
			deleteSfz(bsid, index) {
				this.axios({
					method: 'post',
					url: '/api/hr/qydwhrxx/delHrFile',
					data: {
						bsid: bsid
					},
					params: '',
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code == 0) {
						this.$message.success('删除成功!');
						this.sfzImgList.splice(index, 1)
					}
				})
			},
			// 获取图片列表
			userinfoImgList() {
				this.axios({
					method: 'post',
					url: '/api/hr/qydwhrxx/getHrFileList',
					data: '',
					params: '',
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code == 0) {
						var data = res.data.page;
						data.map(item => {
							if (item.wjlx == 40&&item.wjlx) {
								this.getuserinfoImg(item.wjid, 40)
							}
						})
					}
				});
			},
			// 上传判断
			beforeAvatarUpload(file) {
				if (this.disabled) {
					return;
				}
				var isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type)
				const isLt2M = file.size / 1024 / 1024 < 4;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是图片格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 4MB!');
				}
				return false;
			},
			// 文件选择成功后
			afterRead1(file) {
				this.userinfoImgList(20)
				this.selectFile(file, 20);
			},
			afterRead9(file) {
				this.userinfoImgList(10)
				this.selectFile(file, 10);
			},
			
			afterRead2(file) { 
				this.selectFile(file, 30);
				// console.log("1111")
				// this.imgList.map(item => {
				// 	if (item.wjlx == 30) {
				// 	console.log("222")
				// 		this.axios({
				// 			method: 'post',
				// 			url: '/api/hr/qydwhrxx/delHrFile',
				// 			data: {
				// 				bsid: item.bsid
				// 			},
				// 			params: '',
				// 			headers: {
				// 				"content-type": "application/json",
				// 				'token': this.token
				// 			}
				// 		}).then(res1 => {
				// 			if(res1){
				// 				console.log(res1);
				// 				this.selectFile(file, 30);
				// 			}
				// 			console.log(res1)
				// 		}) 
				// 	}
				// })		  
			},
			afterRead3(file) {
				if (this.sfzImgList.length >= 2) {
					this.$message({
						message: '身份证最多上传两张，请删除后再上传!',
						type: 'warning',
						offset: 400
					});
					return;
				}
				this.userinfoImgList(40)
				this.selectFile(file, 40);
			},
			selectFile(file, type) {
				if (file.status != "ready") {
					this.$message({
						message: file.status,
						type: 'warning',
						offset: 400
					});
					return false
				}
				this.size = file.size
				this.axios.post("/api/hr/qydwhrxx/getOssKey?fileType=" + type, {
						// fileType:type
					}, {
						headers: {
							'token': this.token
						}
					})
					.then(res => {
						if (res && res.data && res.data.code === 0) {
							this.ossupload(res.data.info, file, type);
							this.upid = res.data.info.upid
							this.host = res.data.info.host
							this.policy = res.data.info.policy
							this.dir = res.data.info.dir
							this.signature = res.data.info.signature
						} else {
							this.fileList = [];
							this.$message({
								message: res.data.msg,
								type: 'warning',
								offset: 400
							});
						}
					})
					.catch(err => {
						this.$message({
							message: err.msg,
							type: 'warning',
							offset: 400
						});
					});
			},
			ossupload(data, file, type) {
				var fd = new FormData();
				fd.append("OSSAccessKeyId", data.accessid);
				fd.append("policy", data.policy);
				fd.append("signature", data.signature);
				//文件名字
				fd.append("key", data.dir + file.name);
				fd.append("dir", data.dir);
				fd.append("success_action_status", "200");
				//文件必须声明在最后，否则异常
				fd.append("file", file.raw);
				this.key = data.dir + file.name
				this.filename = file.name
				return new Promise((resolve, reject) => {
					this.axios.post(data.host, fd, {
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							transformRequest: function(xxx) {
								console.log("xxx = ", xxx);
								return xxx;
							}
						})
						.then(res => {
							this.uploadmsg(type);
							this.$message({
								message: '上传成功',
								type: 'success',
								offset: 400
							});
							this.userinfoImgList();
							resolve(res);
						})
						.catch(err => {
							reject(err);
						});
				});
			},
			//回调上传接口
			uploadmsg(type) {
				this.axios.post("/api/hr/qydwhrxx/saveFile", {
						wjmc: this.filename, //简历名称
						dwid: this.BsKhglEntity.dwid || '',
						wjbm: "", //简历别名   
						wjgs: "", //文件格式       
						wjdx: this.size, //简历大小
						upid: this.upid,
						host: this.host,
						keyName: this.key,
						fileType: type
					}, {
						headers: {
							'token': this.token
						}
					})
					.then(res => {
						if (res.data && res.data.code == 0) {
							this.userinfoImg(res.data.msg, type)
						}
					});
			},
			userinfoImg() {
				var dwid = this.qyDwhrxxEntity.dwid
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
						this.imgList = res.data.page;
						var logoArr = [];
						var newLogo = '';
						var enterHjArr = [];
						var entetyyzzArr = [];
						var newentetyyzz = '';
						data.map(ite => {
							if (ite.wjlx == 20&&ite.wjlx) {
								logoArr.push(ite)
							}
							if (ite.wjlx == 10&&ite.wjlx) {
								enterHjArr.push(ite)
							}
							if (ite.wjlx == 30&&ite.wjlx) {
								entetyyzzArr.push(ite)
							}
							if (ite.wjlx == 40&&ite.wjlx) {
								this.getuserinfoImg(ite.wjid, 40)
							}
						})
						//文件类型：10.环境图片 20.公司logo 30.营业执照 40.身份证 50.HR头像
						if (logoArr.length>0) {
							newLogo = logoArr[logoArr.length-1].wjid;
							this.getuserinfoImg(newLogo, 20)
						}
						if (entetyyzzArr.length>0) {
							newentetyyzz = entetyyzzArr[entetyyzzArr.length-1].wjid;
							this.getuserinfoImg(newentetyyzz, 30)
						}
						
					}
				});
			},
			getuserinfoImg(fileId, fileType) {
				var userId = '';
				if (fileType != 40) {
					userId = this.qyDwhrxxEntity.dwid
				} else {
					userId = this.qyDwhrxxEntity.hrid
				}
				this.axios({
					method: 'get',
					url: '/api/hr/qydwhrxx/getFile/'+ fileId,
					data: '',
					params: {
						userId: userId,
						fileType: fileType
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then(res => {
					// if (fileType = 10) this.upload.enterHjimg = res.data.fileUrl;
					if (fileType == 20) {
						this.upload.qydwimageUrl = res.data.fileUrl;
					}
					if (fileType == 30) {
						this.upload.yyzzimageUrl = res.data.fileUrl;
					}
					if (fileType == 40) {
						var arrs = {
							id: fileId,
							fileUrl: res.data.fileUrl
						}
						this.sfzImgList.push(arrs);
					}
					
				});
			},
			// 关闭城市弹出框
			openCity() {
				if (!this.disabled) {
					this.citydialog = true;
				}
			},
			// 获取城市选择值
			changeCity(obj) {
				if (obj && obj.values) {
					this.BsKhglEntity.dwszsf = obj.values[0] || "";
					this.BsKhglEntity.dwszcs = obj.values[1] || "";
				}
				this.citydialog = false;
			},
			// 关闭城市弹出框
			closeCity() {
				this.citydialog = false;
			},
			openTrade() {
				if (!this.disabled) {
					this.tradedialog = true;
				}
			},
			// 获取行业选择值
			changeTrade(obj) {
				this.BsKhglEntity.sshy = obj.dm;
				this.tradedialog = false;
			},
			// 关闭行业弹出框
			closeTrade() {
				this.tradedialog = false;
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},

			save() {
				let dwUrl = "/api/hr/bskhgl/registerDw";
				if (this.BsKhglEntity.dwid) {
					dwUrl = "/api/hr/bskhgl/updateDw";
				}

				let hrUrl = "/api/hr/qydwhrxx/registerHr";
				if (this.BsKhglEntity.hrid) {
					hrUrl = "/api/hr/qydwhrxx/updateHrById";
				}

				this.axios({
					method: "post",
					url: dwUrl,
					headers: {
						token: this.token
					},
					data: this.BsKhglEntity,
					params: {
						save: true
					}
				}).then(dwres => {
					if (dwres && dwres.data && dwres.data.code == 0) {
						this.qyDwhrxxEntity.dwid = dwres.data.dwid;

						this.axios({
							method: "post",
							url: hrUrl,
							headers: {
								token: this.token
							},
							data: this.qyDwhrxxEntity,
							params: {
								save: true
							}
						}).then(hrres => {
							if (hrres && hrres.data && hrres.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									offset: 400
								});
								console.log("save hrres = ", hrres);
							}
						});
					}
				}).catch((err) => {
					this.$message({
						message: err.msg,
						type: 'warning',
						offset: 400
					});
				});
			},

			submit() {
				let dwUrl = "/api/hr/bskhgl/registerDw";
				if (this.BsKhglEntity.dwid) {
					dwUrl = "/api/hr/bskhgl/updateDw";
				}

				let hrUrl = "/api/hr/qydwhrxx/registerHr";
				if (this.BsKhglEntity.dwid) {
					hrUrl = "/api/hr/qydwhrxx/updateHrById";
				}

				let dwBase = this.$refs["dwBase"].validate();
				let dwExt = this.$refs["dwExt"].validate();
				let hr = this.$refs["hr"].validate();

				Promise.all([dwBase, dwExt, hr])
					.then(res => {
						if (res) {
							this.axios({
								method: "post",
								url: dwUrl,
								headers: {
									token: this.token
								},
								data: this.BsKhglEntity,
								params: {
									save: false
								}
							}).then(dwres => {
								if (dwres && dwres.data && dwres.data.code == 0) {
									this.qyDwhrxxEntity.dwid = dwres.data.dwid;
							
									this.axios({
										method: "post",
										url: hrUrl,
										headers: {
											token: this.token
										},
										data: this.qyDwhrxxEntity,
										params: {
											save: false
										}
									}).then(hrres => {
										if (hrres && hrres.data && hrres.data.code == 0) {
											this.submitSqzt = 0
											this.$message({
												message: '操作成功',
												type: 'success',
												offset: 400
											});
											this.init();
											this.userinfoImgList();
											console.log("save hrres = ", hrres);
										}
									});
								}
							});
						}
						
					})
					.catch(err => {
						console.log(err);
					});
			},

			init() {
				this.axios({
					method: "post",
					url: "/api/hr/qydwhrxx/getHrInfo",
					headers: {
						token: this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code == 0) {
						this.qyDwhrxxEntity = {
							...this.qyDwhrxxEntity,
							...res.data.qyDwhrxxEntity
						};
						this.userinfoImg();
					}
				});

				this.axios({
					method: "post",
					url: "/api/hr/bskhgl/findDwInfoHr",
					headers: {
						token: this.token
					}
				}).then(res => {
					if (res && res.data && res.data.code == 0) {
						this.BsKhglEntity = {
							...this.BsKhglEntity,
							...res.data.BsKhglEntity
						};

						this.shzt = res.data.shzt;
						this.sqzt = res.data.sqzt;
						if (this.shzt == 1 || this.shzt == 2) {
							this.tipInfo = res.data.shsm;
						}
						if(this.sqzt=='1' || this.shzt==null) {
							this.open()
						}

						this.upload.qydwimageUrl = res.data.qydwimageUrl;
						this.upload.yyzzimageUrl = res.data.yyzzimageUrl;

						//console.log("xxxxx this.BsKhglEntity = ", this.BsKhglEntity);
						// 0：未审核  1：已通过   2:未通过 单位信息审核通过后 不能再修改信息
						//console.log("xxxxx this.shzt = ", this.shzt);
						//审核状态 1:未审核 2：已通过 3：已拒绝 处于申请状态的HR只能看信息 不能改
						//console.log("xxxxx this.sqzt = ", this.sqzt);
					}
				});
			},
			
			open() {
				this.$alert('登陆后需要您第一时间完善您的企业信息；信息完善后及时提交审核，审核通过后便于您及时发布岗位信息。', '尊敬的单位用户您好', {
					confirmButtonText: '确定',
					showClose: false,
				});
			}
		}
	};
</script>

<style scoped>
	.uplaods_sfz {
		display: inline-block;
	}

	.uplaods_sfz li {
		width: 140px;
		height: 84px;
		float: left;
		text-align: center;
		margin-right: 13px;
	}

	.uplaods_sfz li img {
		width: 130px;
		height: 84px;
		border: 1px solid #ddd;
	}

	/deep/.el-upload-list--picture-card {
		display: inline-block;
		width: 314px;
	}

	/deep/.el-upload-list--picture-card .el-upload-list__item-actions {
		display: none;
	}

	/deep/.uploader1 .avatar-uploader-icon {
		height: 82px;
		vertical-align: middle;
	}

	.title_tip {
		font-weight: bold;
		font-size: 16px;
		color: #fc5e5b;
		padding-left: 50px;
	}

	.btn {
		text-align: center;
	}

	.btn .el-button {
		height: 29px;
		width: 121px;
	}

	.info {
		padding: 10px;
		font-size: 14px;
		overflow: auto;
	}

	.info .title {
		padding: 10px;
		background: #fff;
		font-size: 16px;
		color: #606266;
		font-weight: bold;
		position: relative;
	}

	.info .title .t1 {
		font-size: 16px;
		color: #fc5e5b;
	}

	.info .title .t2 {
		position: absolute;
		right: 10px;
		top: 10px;
	}

	.info .con {
		padding: 10px;
		background: #fff;
		margin-bottom: 20px;
	}

	.info h1 {
		font-size: 16px;
		color: #606266;
	}

	.info .form {
		width: 80%;
		padding: 20px 20px 0 20px;
	}

	.tip1 {
		margin-left: 10px;
		width: 16px;
		height: 16px;
		display: inline-block;
		background: url("../../../assets/images/enter/Icon-prompt.png") no-repeat;
	}

	/deep/.avatar-uploader {
		width: 128px;
		display: inline-block;
		vertical-align: middle;
		margin-right: 20px;
		float: left;
	}

	/deep/.avatar-uploader .el-upload {
		border: 1px solid #c0c4cc;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	/deep/.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}

	/deep/.avatar-uploader-icon {
		font-size: 12px;
		color: #8c939d;
		height: 82px;
		width: 128px;
		line-height: 82px;
		text-align: center;
	}

	/deep/.avatar-uploader-icon::before {
		display: none;
	}

	/deep/.avatar {
		height: 82px;
		width: 128px;
		border: 1px solid #c0c4cc;
	}

	/deep/.el-upload {
		height: 82px;
		width: 128px;
		border: 1px solid #c0c4cc;
	}

	.upload-tip {
		font-size: 12px;
		color: #c0c4cc;
		line-height: 22px;
		width: 501px;
		display: block;
		padding-top: 20px;
	}

	/deep/.el-input {
		border: 1px solid #c0c4cc;
		width: 500px;
	}

	/deep/.el-textarea {
		width: 500px;
	}

	/deep/.el-textarea__inner {
		border: 1px solid #c0c4cc;
		border-radius: 0;
		height: 300px;
	}

	/deep/.el-input__inner {
		border: 0;
		width: 100%;
		padding-left: 10px;
	}

	.text_area {
		position: relative;
	}

	.text_area .sy {
		width: 500px;
		text-align: right;
		font-size: 12px;
		color: #c0c4cc;
	}

	/deep/.el-date-editor--date .el-input__inner {
		padding-left: 30px;
	}

	.col_select {
		width: 502px;
		border-radius: 0;
		border: 1px solid #c0c4cc;
	}

	.col_select.gray {
		background-color: #f5f7fa;
		border-color: #e4e7ed;
		color: #c0c4cc;
		cursor: not-allowed;
		border: 1px solid #c0c4cc;
	}
</style>
