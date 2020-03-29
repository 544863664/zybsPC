<template>
    <!-- 项目经验弹出框 -->
    <div>
		<el-dialog
			:visible.sync="venueDialogVisible"
			width="50%"
			:lock-scroll="true"
			:show-close="true"
            :before-close="onCancel"
			:modal="false">
			<div class="dialog__body-wrap">
				<div class="dialog_info">
                    <el-form label-width="100px">
						<el-form-item label="项目名称：">
							<el-input v-model="form.xmmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="公司名称：">
							<el-input v-model="form.gsmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="担任角色：">
							<el-input v-model="form.zw" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="项目时间：">
							<el-col :span="11">
							<el-date-picker type="date" v-model="form.kssj" placeholder="开始时间" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
							<el-date-picker type="date" v-model="form.jssj"  placeholder="结束时间" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
							</el-col> 
						</el-form-item>
						<el-form-item label="项目描述：" style="width:100%">
							<el-input 
								type="textarea"
								:rows="2"
								maxlength="2000"
								placeholder="最大输入2000字"  show-word-limit
								v-model="form.xmms"></el-input> 
						</el-form-item>
						<el-form-item label="责任描述：" style="width:100%">
							<el-input  
								type="textarea"
								:rows="2"
								maxlength="2000"
								placeholder="最大输入2000字"  show-word-limit
								v-model="form.zrms"></el-input> 
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>项目经验</div>
			</span>
		</el-dialog>

		<!-- 职位弹出框 -->
		<post :venue-dialog-visible="post.dialog" @change="changePost" @close="closePost"></post>
    </div>
</template>

<script>
	import Post from '../Post' 
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
    import Moment from "../moment.js";
	export default{
		name:"Project",
		props:{
            venueDialogVisible: null,
            datas:{
                required: {},
                type: Object
            }
		},
		components: {
			Post
		},
		data() {
			return {
				form:{
					xmmc:'',
					kssj:'',
					jssj:'',
					gsmc:'',
					zw:'',
					xmms:'',
					zrms:'',
					qzbsid:'',
					xmjyid:''
				},
				// 职位
				post:{
					dialog:false,
					value:'请选择',
					vid:[]
				},
				textarea:''
			}
		},
		created() { 
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				findDmList: state => state.findDmList,
				ProvinceMap: state => state.ProvinceMap,
                CityMap: state => state.CityMap,
                AreaMap: state => state.AreaMap,
				JobCategoryFirstMap: state => state.JobCategoryFirstMap, 
                JobCategorySecondMap: state => state.JobCategorySecondMap, 
                JobCategoryThirdMap: state => state.JobCategoryThirdMap,
			})
		},
		watch:{
			datas(old,news){
				console.log('编辑',old, news);
				this.setEdit(old);
			}
		},
		methods:{
            // 取消
            onCancel() { 
				this.setClear();
                this.$emit('close', false)
            },
            // 完成
            onSubmit() { 
				let params = {
					xmmc: this.form.xmmc,
					kssj: Moment.formatDate2(this.form.kssj),
					jssj: Moment.formatDate2(this.form.jssj),
					gsmc: this.form.gsmc,
					zw: this.form.zw,
					xmms: this.form.xmms,
					zrms: this.form.zrms
				} 
				let url = '/api/qz/qzxmjy/save'
				if(this.form.xmjyid){
					params.xmjyid = this.form.xmjyid
					url = '/api/qz/qzxmjy/update'
				}
				this.axios.post(url, params, {
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				})
				.then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.$message({
							message: '操作成功',
							type: 'success',
							offset: 400
						});
						this.setClear();
						this.$emit('change', false)
					} 
				})
				.catch(function(error) {
                    this.$message({
                        message: error.msg,
                        type: 'warning',
						offset: 400
                    });
				});
            },
			// 清空
			setClear(){
				this.form.xmmc = '';
				this.form.xmms = '';
				this.form.kssj = '';
				this.form.jssj = '';
				this.form.gsmc = '';
				this.form.zw = '';
				this.form.zrms = '';  
				this.form.xmjyid = '';
			},
			// 编辑
			setEdit(item){
				this.form.xmmc = item.xmmc;
				this.form.kssj = item.kssj;
				this.form.jssj = item.jssj;
				this.form.gsmc = item.gsmc;
				this.form.xmms = item.xmms;
				this.form.zw = item.zw;
				this.form.zrms = item.zrms;  
				this.form.xmjyid = item.xmjyid;
			},
			// 获职位选择值
			changePost(obj){ 
				this.post.value = obj.names;
				this.post.vid = obj.values;
				this.post.dialog = false;
			},
			// 关闭职位弹出框
			closePost(){
				this.setClear();
				this.post.dialog = false;
			},
		}
	}
</script>
<style scoped> 
/deep/.el-dialog__body {
    padding: 5px 20px;
}
.dialog_info{
    display: flex;
}
.el-form-item {
    margin-bottom: 8px;
}
.col_select{
	-webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 30px 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	width: 100%;
	position: relative;
}
.col_select.gray{
	color: rgb(192,196,204)
}
.el-form{
	width: 100%;
}
.el-form-item{
	width: 60%;
}
.el-textarea{
    width: 500px;
}
.el-col-2 {
    width: 8.33333%;
    text-align: center;
}
/deep/.el-textarea__inner{
	height: 141px!important;
}
</style>