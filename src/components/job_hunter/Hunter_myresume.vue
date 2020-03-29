<template>
	<div class="resume">
		<h1 class="title">
			简历中心
			<span class="add" @click="createMyresume">创建简历</span>
		</h1>
		<div class="table">
			<el-table :data="myresumeList" style="width: 100%">
				<el-table-column label="简历名称">
					<template slot-scope="scope">
						<p>{{ scope.row.wjmc }}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="setEdit(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" type="danger" @click="downFiles(scope.row)">下载</el-button>
						<el-button size="mini" type="danger" @click="setDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		components: {},
		data() {
			return {
				myresumeList: []
			};
		},
		computed: {
			...mapGetters({
				'token': 'getToken',
				'userId': 'getuserId'
			})
		},
		methods: {
			// 编辑
			setEdit(index, item) {
				console.log(index, item)
				this.$router.push({
					path: "/private/resume"
				});
			},
			// 上传附件-下载
			downFiles(item){   
				this.axios.get("/api/qz/qzFile/getFile/"+item.wjid,  {
					params: { 
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res)=> {
					if (res && res.data && res.data.code == 0) {
						if(res.data.fileUrl){
							let downloadElement = document.createElement("a");
							let href = res.data.fileUrl.replace('http', 'https'); //创建下载的链接
							downloadElement.target = '_blank';
							downloadElement.href = href;
							downloadElement.download = item.wjmc; //下载后文件名
							document.body.appendChild(downloadElement);
							downloadElement.click(); //点击下载
							document.body.removeChild(downloadElement); //下载完成移除元素
							window.URL.revokeObjectURL(href); //释放掉blob对象
						} 
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				}).catch(function(error) {
					this.$message({
						message: error.msg,
						type: 'warning'
					});
				}); 
			},
			// 复制
			setDownload(index, item) {
				let name = item.jlmc
				this.axios.get("/api/qz/qzjldz/save",  {
					params: { 
					},
					responseType: 'blob',
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res) {
						// const _res = res.data;
						// let blob = new Blob([_res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						// let downloadElement = document.createElement("a");
						// let href = window.URL.createObjectURL(blob); //创建下载的链接
						// downloadElement.href = href;
						// downloadElement.download = name; //下载后文件名
						// document.body.appendChild(downloadElement);
						// downloadElement.click(); //点击下载
						// document.body.removeChild(downloadElement); //下载完成移除元素
						// window.URL.revokeObjectURL(href); //释放掉blob对象
					}
				}).catch((error) => {
					console.log(error);
				}); 
			},
			// 删除
			setDelete(index, item) {
				console.log(index, item)
				var that = this;
				this.$confirm('确认删除【'+item.wjmc+'】?', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.axios({
						method: 'post',
						url: '/api/qz/qzFile/delete/'+item.bsid,
						data: '',
						params: '',
						headers: {
							"content-type": "application/json",
							'token': that.token
						}
					}).then(function(response) {
						if (response && response.data && response.data.code == 0) {
							that.$message({
								type: 'success',
								message: '删除成功',
								offset: 400
							});
							that.getMyresumeList();
						} else {
							that.$message({
								message: response.data.msg,
								offset: 400
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
				})
			},
			getMyresumeList() {
				var that = this;
				that.axios({
					method: 'get',
					url: '/api/qz/qzFile/list',
					data: '',
					params: {
						fileType: 10
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						var data = response.data.fileList;
						that.myresumeList = data;
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
			createMyresume() {
				this.$router.push({
					path: '/private/resume',
				})
			},
			
		},
		created() {
			this.getMyresumeList();
		},
	}
</script>
<style scoped>
	.resume {
		overflow: auto;
		background: #fff;
		min-height: 200px;
		padding: 20px;
	}

	.title {
		font-size: 20px;
		color: #303133;
		position: relative;
	}

	.title .add {
		font-size: 18px;
		color: #FC5E5B;
		background: url("../../assets/images/common/Icon-add.png") 0 center no-repeat;
		padding-left: 20px;
		position: absolute;
		right: 0;
		font-weight: normal;
		cursor: pointer;
	}

	.table {
		margin-top: 20px;
	}

	.el-button--danger {
		background: none;
		color: #fc5e5b;
		border: 0;
	}

	/deep/.el-table__header {
		border-bottom: 2px solid #fc5e5b;
	}

	/deep/.el-table__header div {
		color: #303133;
	}

</style>
