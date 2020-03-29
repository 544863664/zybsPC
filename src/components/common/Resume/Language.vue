<template>
    <!-- 语言能力弹出框 -->
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
						<el-form-item label="语种名称：">
							<el-input v-model="form.yymc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="等级证书：">
							<el-input v-model="form.djzs" placeholder="请输入"></el-input>
						</el-form-item> 
						<el-form-item label="听说能力：">
							<el-select placeholder="请选择" v-model="form.tsnl">
								<el-option v-for="(item,index) in findDmList.m_slnldm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
							<!-- <el-select placeholder="请选择" v-model="form.tsnl">
								<el-option v-for="(item,index) in yynlList" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select> -->
						</el-form-item> 
						<el-form-item label="读写能力：">
							<el-select placeholder="请选择" v-model="form.dxnl">
								<el-option v-for="(item,index) in findDmList.m_slnldm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
							<!-- <el-select placeholder="请选择" v-model="form.dxnl">
								<el-option v-for="(item,index) in yynlList" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>  -->
						</el-form-item> 
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>语言能力</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex' 
	export default{
		name:"Language",
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
					yyid: '',
                    yymc: '',
                    djzs: '',
                    tsnl: '',
                    dxnl: ''
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
					yyid: '',
                    yymc: '',
                    djzs: '',
                    tsnl: '',
                    dxnl: ''
				}
			},
			// 编辑
			setEdit(item){
				this.form.yyid = item.yyid; 
				this.form.yymc = item.yymc;
				this.form.djzs = item.djzs; 
				this.form.tsnl = item.tsnl;
				this.form.dxnl = item.dxnl;
			},
            // 完成
            onSubmit() { 
				let params = {
                    yymc: this.form.yymc,
                    djzs: this.form.djzs,  
                    tsnl: this.form.tsnl,
                    dxnl: this.form.dxnl,
				}  
				let url = '/api/qz/qzyynl/save'
				if(this.form.yyid){
					params.yyid = this.form.yyid
					url = '/api/qz/qzyynl/update'
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