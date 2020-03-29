<template>
    <!-- 专业技能弹出框 -->
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
						<el-form-item label="技能名称：">
							<el-input v-model="form.jnmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="掌握程度：">
							<el-select placeholder="请选择" v-model="form.slcd">
								<el-option v-for="(item,index) in findDmList.m_slnldm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
						</el-form-item> 
						<el-form-item label="使用时长：">
							<el-input v-model="form.sysc" placeholder="请输入" style="width:100px"></el-input>月
						</el-form-item> 
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>专业技能</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex' 
	export default{
		name:"Skill",
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
					jnid: '',
                    jnmc: '',
                    sysc: '',
                    slcd: ''
				},
				cypmList:[
					{
						dm: '1',
						name:'第一名'
					},
					{
						dm:'2',
						name:'第二名'
					},
					{
						dm:'3',
						name:'第三名'
					},
					{
						dm:'4',
						name:'第四名'
					},
					{
						dm:'5',
						name:'第五名'
					},
					{
						dm:'6',
						name:'第六名'
					},
					{
						dm:'7',
						name:'第七名'
					},
					{
						dm:'8',
						name:'第八名'
					},
					{
						dm:'9',
						name:'第九名'
					},
					{
						dm:'10',
						name:'第十名'
					},
				]
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
					jnid: '',
                    jnmc: '',
                    sysc: '',
                    slcd: ''
				}
			},
			// 编辑
			setEdit(item){
				this.form.jnid = item.jnid; 
				this.form.jnmc = item.jnmc;
				this.form.sysc = item.sysc; 
				this.form.slcd = item.slcd;
			},
            // 完成
            onSubmit() { 
				let params = {  
                    jnmc: this.form.jnmc,
                    sysc: this.form.sysc,  
                    slqk: this.form.slqk,  
                    slcd: this.form.slcd
				}  
				let url = '/api/qz/qzzyjn/save'
				if(this.form.jnid){
					params.jnid = this.form.jnid
					url = '/api/qz/qzzyjn/update'
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