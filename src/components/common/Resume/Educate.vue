<template>
    <!-- 教育经历弹出框 -->
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
						<el-form-item label="学校名称：">
							<el-input placeholder="请输入" v-model.trim="form.xxmc"></el-input>
						</el-form-item> 
						<el-form-item label="是否统招："> 
							<el-radio-group v-model.trim="form.sftz">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group> 
						</el-form-item> 
						<el-form-item label="专业：">
							<el-input placeholder="请输入" v-model.trim="form.zy"></el-input>
						</el-form-item> 
						<el-form-item label="学历："> 
							<el-select placeholder="请选择" filterable  v-model.trim="form.xl">
								<el-option v-for="(item,index) in findDmList.m_xldm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>  
						</el-form-item> 
						<el-form-item label="导师：">
							<el-input placeholder="请输入" v-model.trim="form.ds"></el-input>
						</el-form-item>  
						<el-form-item label="就读时间：">
							<el-col :span="11">
								<el-date-picker type="date" v-model.trim="form.rxsj" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
								<el-date-picker type="date" v-model.trim="form.bysj" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
							</el-col> 
						</el-form-item> 
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button> 
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>教育经历</div>
			</span>
		</el-dialog>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
    import Moment from "../moment.js";
	export default{
		name:"Educate",
		props:{
            venueDialogVisible: null,
            datas:{
                required: {},
                type: Object
            }
		},
		components: {
		},
		data() {
			return {
				form:{
					xxmc:'',
					sftz:1,
					zy:'',
					xl:'',
					ds:'',
					rxsj:'',
					bysj:'',
					jyjlid:''
				},
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
				console.log('教育编辑',old, news);
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
					xxmc: this.form.xxmc,
					sftz: this.form.sftz,
					zy: this.form.zy,
					xl: this.form.xl,
					ds: this.form.ds,
					rxsj: Moment.formatDate2(this.form.rxsj),
					bysj: Moment.formatDate2(this.form.bysj)
				} 
				let url = '/api/qz/qzjyjl/save'
				if(this.form.jyjlid){
					params.jyjlid = this.form.jyjlid
					url = '/api/qz/qzjyjl/update'
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
				this.form.xxmc = '';
				this.form.sftz = '';
				this.form.zy = '';
				this.form.xl = '';
				this.form.ds = '';
				this.form.rxsj = '';  
				this.form.bysj = '';
				this.form.jyjlid = '';
			},
			// 编辑
			setEdit(item){
				
				this.form.xxmc = item.xxmc;
				this.form.sftz = parseInt(item.sftz);
				this.form.zy = item.zy;
				this.form.xl = item.xl;
				this.form.ds = item.ds;
				this.form.rxsj = item.rxsj;  
				this.form.bysj = item.bysj; 
				this.form.jyjlid = item.jyjlid; 
			},
		}
	}
</script>
<style lang='less' scoped>
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
.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
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