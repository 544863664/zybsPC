<template>
    <!-- 荣誉奖励弹出框 -->
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
                    <el-form ref="form"  label-width="115px">
						<el-form-item label="荣誉名称：">
							<el-input v-model="form.jlmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="奖励单位：">
							<el-input v-model="form.jldw" placeholder="请输入"></el-input>
						</el-form-item> 
						<el-form-item label="奖励级别：">
							<el-input v-model="form.jljb" placeholder="请输入"></el-input>
						</el-form-item> 
						<el-form-item label="获奖角色：">
							<el-input v-model="form.jljs" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="荣誉称号：">
							<el-input v-model="form.rych" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="获奖日期："> 
							<el-date-picker type="date" v-model="form.jlrq" placeholder="请选择"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>荣誉奖励</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex' 
    import Moment from "../moment.js";
	export default{
		name:"Honor",
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
					jlmc: '',
                    jldw: '',
                    jljb: '',
                    jljs: '',
                    jlrq: '',
					rych: '',
					ryjlid: '',
				},
				yynlList: [{ dm: '1', name: '一般' }, { dm: '2', name: '良好' }, { dm: '3', name: '熟练' }, { dm: '4', name: '精通' }],
			}
		},
		created() { 
		},
		mounted(){
		},
		watch:{
			datas(old){
				this.setEdit(old);
			}
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
		methods:{
            // 取消
            onCancel() { 
				this.setClear();
                this.$emit('close', false)
			},
			// 清空
			setClear(){ 
				this.form={ 
					jlmc: '',
                    jldw: '',
                    jljb: '',
                    jljs: '',
                    jlrq: '',
					rych: '',
					ryjlid: '',
				}
			},
			// 编辑
			setEdit(item){   
				this.form.jlmc= item.jlmc;
				this.form.jldw= item.jldw;
				this.form.jljb= item.jljb;
				this.form.jljs= item.jljs;
				this.form.jlrq= item.jlrq;
				this.form.rych= item.rych;
				this.form.ryjlid= item.ryjlid;
			},
            // 完成
            onSubmit() { 
				let params = {
					jlmc: this.form.jlmc,
                    jldw: this.form.jldw,
                    jljb: this.form.jljb,
                    jljs: this.form.jljs,
					rych: this.form.rych, 
                    jlrq: Moment.formatDate2(this.form.jlrq)
				}
				let url = '/api/qz/qzryjl/save'
				if(this.form.ryjlid){
					params.ryjlid = this.form.ryjlid
					url = '/api/qz/qzryjl/update'
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
						this.$emit('change', false)
						this.setClear();
					} 
				})
				.catch(function(error) {
                    this.$message({
                        message: error.msg,
                        type: 'warning',
						offset: 400
                    });
				}); 
            }
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
.col_select.gray{
	color: rgb(192,196,204)
}
/deep/.el-select {
    display: inline-block;
    position: relative;
    width: 300px;
} 
/deep/.el-form{
	width: 500px;
}
/deep/.el-input{
	display: inline-block;
	vertical-align: middle;
	margin-right: 10px;
    width: 300px;
} 
.el-col-2 {
    width: 8.33333%;
    text-align: center;
}
</style>