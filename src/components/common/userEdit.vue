<template>
  <!-- 个人信息编辑 -->
  <div>
    <el-dialog :visible.sync="venueDialogVisible" width="60%" :lock-scroll="true" :show-close="true"
      :before-close="onCancel" :modal="false">
      <div class="dialog__body-wrap">
        <div class="dialog_info">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名：">
              <el-input v-model.trim="form.xm"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio-group v-model.trim="form.xbm">
                <el-radio v-for="tab in findDmList['m_xbdm']" :key="tab.dm" :label="tab.dm">{{tab.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生年月：">
              <el-col :span="20">
                <el-date-picker type="date" placeholder="选择日期" v-model.trim="form.csrq" format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd" style="width: 200px;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="民族：">
              <el-select placeholder="请选择" filterable v-model.trim="form.mzdm">
                <el-option v-for="(item,index) in findDmList.m_mzdm" :key='index' :label="item.name" :value="item.dm">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况：">
              <el-select placeholder="请选择" filterable v-model.trim="form.hyzk">
                <el-option v-for="(item,index) in findDmList.m_hyzkdm" :key='index' :label="item.name" :value="item.dm">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌：">
              <el-select placeholder="请选择" filterable v-model.trim="form.zzmm">
                <el-option v-for="(item,index) in findDmList.m_zzmm" :key='index' :label="item.name" :value="item.dm">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身高：">
              <el-input v-model.trim="form.sg" class="height"></el-input>
              <span>CM</span>
            </el-form-item>

            <el-form-item label="身份证号：">
              <el-input v-model.trim="form.sfzjh"></el-input>
            </el-form-item>
            <el-form-item label="籍贯：">
              <p class="col_select" :class="nativeplace.value == '请选择'?'gray':''" @click="openCity(2)">
                {{nativeplace.value}}
                <span class="el-input__suffix"><span class="el-input__suffix-inner"><i
                      class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
              </p>
            </el-form-item>
            <el-form-item label="工作时间：">
              <el-date-picker type="date" placeholder="选择日期" v-model.trim="form.cjgzny" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="现居城市：">
              <p class="col_select" :class="city.value == '请选择'?'gray':''" @click="openCity(1)">
                {{city.value}}
                <span class="el-input__suffix"><span class="el-input__suffix-inner"><i
                      class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
              </p>
              <!-- <el-checkbox >国外</el-checkbox> -->
            </el-form-item>
            <!-- <el-form-item label="联系电话：">
                            <el-input v-model.trim="form.sj"></el-input>
                        </el-form-item> -->
            <el-form-item label="电子邮箱：" prop="email" :rules="[
							{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
						]">
              <el-input v-model.trim="form.yx"></el-input>
            </el-form-item>
            <el-form-item label="最高学位：">
              <el-select placeholder="请选择" filterable v-model.trim="form.zgxl">
                <el-option v-for="(item,index) in findDmList.m_xldm" :key='index' :label="item.name" :value="item.dm">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最后毕业院校：">
              <el-input v-model.trim="form.zgxx"></el-input>
            </el-form-item>
            <el-form-item label="最高学历专业：">
              <el-input v-model.trim="form.zgzy"></el-input>
            </el-form-item>
            <el-form-item label="是否学生：">
              <el-radio-group v-model.trim="form.sfxs">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自我评价：" style="width:100%" class="residue_word">
              <el-input type="textarea" :rows="5" v-model.trim="form.zwpj" show-word-limit></el-input>
            </el-form-item>
            <!-- <el-form-item label="上传头像：" style="width:100%">
              <el-upload class="avatar-uploader" 
                :action="uploadInfo.url" 
                :show-file-list="false"
                :auto-upload="false"
                :limit="1"
                :on-change = "afterRead"
                :on-success="handleAvatarSuccess" 
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item> -->
            <el-form-item>
              <el-button type="danger" @click="onCancel">取消</el-button>
              <el-button type="danger" @click="onSubmit('form')">完成</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="title" class="dialog-header">
        <div>个人基本信息</div>
      </span>
    </el-dialog>

    <!-- 城市弹出框 -->
    <city :venue-dialog-visible="city.dialog" :level="2" @change="changeCity" @close="closeCity"></city>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import City from './City'
import Moment from "./moment.js";
export default {
  name: "userEdit",
  props: {
    venueDialogVisible: null,
    isedit: {
      required: false,
      type: Boolean
    },
    datas: {
      required: {},
      type: Object
    }
  },
  components: {
    City
  },
  watch: {
    datas(old, news) {
      console.log('编辑', old, news);
      this.setEdit(old);
    }
  },
  data() {
    return {
      uploadInfo: {
        url: ''
      },
      form: {
        xm: '', //姓名
        xbm: 'xb_001', //性别
        csrq: '', //生日
        mzdm: '', //民族
        hyzk: '', //婚姻
        zzmm: '', //政治面貌
        sg: '', //身高
        // nativeplace: '', //籍贯
        // currentcity: '', //现居住城市
        cjgzny: '', //工作时间
        sj: '', //联系电话
        yx: '', //邮箱
        zgxl: '',//学位
        zgxx: '', //毕业院校 
        sfzjh: '', //身份证号
        sfxs: 0, //是否学生
        zwpj: '', //自我评价
        zgzy: '', //最高学历专业
      },
      curCity: -1, //1：城市，2：籍贯
      imageUrl: '',
      // 城市
      city: {
        dialog: false,
        value: '请选择',
        vid: []
      },
      // 城市
      nativeplace: {
        dialog: false,
        value: '请选择',
        vid: []
      },
    }
  },
  created() {
    this.getProvinceList();
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      'token': 'getToken',
      'userId': 'getuserId'
    }),
    ...mapState({
      findDmList: state => state.findDmList,
      ProvinceList: state => state.ProvinceList,
      CityList: state => state.CityList,
      AreaList: state => state.AreaList,

      findDmMap: state => state.findDmMap,
      ProvinceMap: state => state.ProvinceMap,
      CityMap: state => state.CityMap,
      AreaMap: state => state.AreaMap,
      JobCategoryFirstMap: state => state.JobCategoryFirstMap,
      JobCategorySecondMap: state => state.JobCategorySecondMap,
      JobCategoryThirdMap: state => state.JobCategoryThirdMap,
    }),
    place() {
      return this.getplaceList();
    },
    options() {
      return this.getProvinceList();
    }
  },
  methods: {
    // 获取城市选择值
    changeCity(obj) {
      if (this.curCity == 1) {
        this.city.value = obj.names || '请选择';
        this.city.vid = obj.values;
      } else if (this.curCity == 2) {
        this.nativeplace.value = obj.names || '请选择';
        this.nativeplace.vid = obj.values;
      }
      this.city.dialog = false;
      this.curCity = -1;
    },
    // 关闭城市弹出框
    closeCity() {
      this.city.dialog = false;
      this.curCity = -1;
    },
    getplaceList() {
      var place = [];
      if (this.ProvinceList && this.ProvinceList.length > 0) {
        this.ProvinceList.forEach(p => {
          let item = {
            value: p.dm,
            label: p.name
          };
          place.push(item);
        });
      }
      return place;
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
    // 取消
    onCancel() {
      this.$emit('close', false)
    },
    // 完成
    onSubmit() {
      if (this.form.yx) {
        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.form.yx)) {
          this.$message({
            message: '邮箱格式不正确',
            type: 'warning'
          });
          return false;
        }
      }
      if (this.form.sfzjh) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(this.form.sfzjh)) {
          this.$message({
            message: '身份证格式不正确',
            type: 'warning'
          });
          return false;
        }
      }
      let params = {
        xm: this.form.xm, //姓名
        xbm: this.form.xbm, //性别
        csrq: Moment.formatDate2(this.form.csrq), //生日
        mzdm: this.form.mzdm, //民族
        hyzk: this.form.hyzk, //婚姻
        zzmm: this.form.zzmm, //政治面貌
        sg: this.form.sg, //身高 
        cjgzny: Moment.formatDate2(this.form.cjgzny), //工作时间
        sj: this.form.sj, //联系电话
        yx: this.form.yx, //邮箱
        zgxl: this.form.zgxl,//学位
        zgxx: this.form.zgxx, //毕业院校
        sfzjh: this.form.sfzjh, //身份证号
        sfxs: parseInt(this.form.sfxs), //是否学生
        zwpj: this.form.zwpj, //自我评价
        zgzy: this.form.zgzy, //最高学历专业
        dqszs: this.city.vid[0], //省代码
        dqszcs: this.city.vid[1], //城市代码
        jgdms: this.nativeplace.vid[0], //籍贯省代码
        jgdmcs: this.nativeplace.vid[1], //籍贯城市代码
      }
      let url = '/api/qz/qzgrjbxx/save'
      if (this.isedit) {
        url = '/api/qz/qzgrjbxx/update'
      }
      this.axios.post(url, params, {
        headers: {
          "content-type": "application/json",
          'token': this.token
        }
      })
        .then((res) => {
          if (res && res.data && res.data.code == 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            });
            this.$emit('change', false)
            this.setClear();
          }
        })
        .catch(function (error) {
          this.$message({
            message: error.msg,
            type: 'warning'
          });
        });
    },
    // 清空
    setClear() {

    },
    // 打开城市弹出框
    openCity(type) {
      this.curCity = type;
      this.city.dialog = true
    },
    // 编辑
    setEdit(item) {
      this.form.xm = item.xm;
      this.form.xbm = item.xbm;
      this.form.csrq = item.csrq;
      this.form.mzdm = item.mzdm;
      this.form.hyzk = item.hyzk;
      this.form.zzmm = item.zzmm;
      this.form.sg = item.sg;
      this.form.cjgzny = item.cjgzny;
      this.form.sj = item.sj;
      this.form.yx = item.yx;
      this.form.zgxl = item.zgxl;
      this.form.zgxx = item.zgxx;
      this.form.sfzjh = item.sfzjh;
      this.form.sfxs = parseInt(item.sfxs);
      this.form.zwpj = item.zwpj;
      this.form.zgzy = item.zgzy;

      this.city.vid[0] = item.dqszs;
      this.city.vid[1] = item.dqszcs;
      if (item.dqszs && item.dqszs) {
        this.city.value = this.ProvinceMap[item.dqszs] + this.CityMap[item.dqszs][item.dqszcs];
      }
      this.nativeplace.vid[0] = item.jgdms;
      this.nativeplace.vid[1] = item.jgdmcs;
      if (item.jgdms && item.dqszs) {
        this.nativeplace.value = this.ProvinceMap[item.jgdms];
      }
    },
    // 上传
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
			uploadmsg() { 
				this.axios.post("/api/qz/qzFile/save",{            
						wjmc:this.filename, //简历名称
						wjbm:"", //简历别名   
						wjgs:"", //文件格式       
						wjdx:this.size, //简历大小
						upid:this.upid,
						host:this.host,
						keyName:this.key,
						wjlx:20 //10.简历 20.图像
					},
					{
						headers: { 'token': this.token }
					}
				)
				.then(res => {
					console.log(res)
				});
			},
			// 文件选择成功后
			afterRead(file) {
        console.log(file)
        var isJPG = /^image\/(jpeg|png|jpg)$/.test(file.raw.type)
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是图片格式!');
          return false; 
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false; 
        }     

        if(file.status != "ready") {
          this.$message({
              message: file.status,
              type: 'warning'
          });
          return false
        }
				this.size = file.size
				this.axios.get("/api/qz/qzFile/getOssKey", {
					headers: {
					'token': this.token
					}
				})
				.then(res => {
					if (res && res.data && res.data.code === 0) { 
						this.ossupload(res.data.info, file);
						this.upid = res.data.info.upid
						this.host = res.data.info.host
						this.policy = res.data.info.policy
						this.dir = res.data.info.dir
						this.signature = res.data.info.signature
					} else { 
						this.fileList = [];
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				})
				.catch(err => {
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
				this.key =  data.dir + file.name
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
						this.uploadmsg();
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						resolve(res);
					})
					.catch(err => {
						reject(err);
					});
				});
			},

  }
}
</script>
<style lang='less' scoped>
.col_select {
  width: 223px;
  margin-right: 20px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.col_select .el-input__suffix {
  top: -5px;
}
/deep/.el-input__inner {
  border: 1px solid #808080;
}
/deep/el-dialog {
  margin-top: 25vh;
}
/deep/.el-dialog__body {
  padding: 5px 20px 30px;
}
/deep/.el-button--mini,
.el-button--mini.is-round {
  padding: 3px 2px;
}
/deep/.el-form-item__label {
  width: 113px !important;
  /* text-align: left; */
}
/deep/.el-form-item__content {
  margin-left: 113px !important;
}
/deep/.el-form-item {
  margin-bottom: 10px;
  float: left;
  width: 50%;
}
.dialog_info {
  overflow: auto;
}
.dialog_info /deep/.el-input__inner {
  border: 1px solid #ddd;
  height: 30px;
  line-height: 30px;
  width: 200px;
  padding-left: 10px;
}
/deep/.el-input__prefix {
  left: 171px;
}
.height {
  width: 100px;
  display: inline-block;
  margin-right: 10px;
}
.height /deep/.el-input__inner {
  width: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #ddd;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/deep/.el-textarea__inner {
  width: 631px;
  height: 100px;
}
</style>