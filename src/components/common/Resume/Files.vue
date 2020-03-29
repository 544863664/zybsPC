<template>
    <!-- 上传附件弹出框 -->
    <div>
		<el-dialog
			:visible.sync="venueDialogVisible"
			width="30%"
			:lock-scroll="true"
			:show-close="true"
            :before-close="onCancel"
			:modal="false">
			<div class="dialog__body-wrap">
				<div class="dialog_info">
                   <el-upload
						class="upload-demo"
						ref="upload"
						:action="host" 
						multiple
						:limit="3"
						:accept="fileType"
						:auto-upload="false"
						:on-change = "afterRead"
						:show-file-list="showFileList"
						:file-list="fileList"
					> 
						<el-button slot="trigger" size="small" type="danger">上传文件</el-button>
							<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
					</el-upload>					
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>上传附件</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		name:"Files",
		props:{
            venueDialogVisible: null,
			datas: null
		},
		components: {
		},
		data() {
			return {
				fileType: "*.*",
				fileList: [],
				host:'',
				upid:"",
				filename:'',
				showFileList:false
			}
		},
		created() { 
		},
		mounted(){
		},
		watch:{
			datas(old){
				this.fileList = old;
			}
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			})
		},
		methods:{
            // 取消
            onCancel() {
				this.$emit('change', false)
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
						wjlx:10
					},
					{
						headers: { 'token': this.token }
					}
				)
				.then(res => {					
					// this.$emit('change', false)
					console.log(res)
				});
			},
			// 文件选择成功后
			afterRead(file) {
				if(file.status != "ready"){
                    this.$message({
                        message: file.status,
                        type: 'warning',
						offset: 400
					});
					return false
				}
				this.size = file.size
				this.axios.get("/api/qz/qzFile/getOssKey", {
					params: {
						fileType: 10	//文件类型：30是电子简历、20是头像、10简历附件
					},
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
				fd.append("file", file.raw);
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
							message: '上传成功',
							type: 'success',
							offset: 400
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
<style scoped>
/deep/.el-dialog__body {
    padding: 5px 20px;
}
/deep/.dialog_info{
	padding-bottom: 30px;
}
</style>