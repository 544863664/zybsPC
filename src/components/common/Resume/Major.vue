<template>
    <!-- 研究方向、主修课程弹出框 -->
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
						<el-form-item label="研究方向：">
							<el-input v-model="form.yjfx" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="主修课程：">
							<el-input v-model="form.zxkc" placeholder="请输入"></el-input>
						</el-form-item> 
						<el-form-item label="博士课题：">
							<el-input v-model="form.bskt" placeholder="请输入"></el-input>
						</el-form-item> 
						<el-form-item label="描述：" style="width:100%">
							<el-input  class="residue_word"
								type="textarea"
								:rows="5"
								maxlength="2000"
								placeholder="最大输入2000字"
								v-model="form.kcms"  show-word-limit></el-input> 
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>研究方向、主修课程</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex' 
	export default{
		name:"Major",
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
					fxid: '',
                    yjfx: '',
                    bskt: '',
                    zxkc: '',
                    kcms: '',
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
					fxid: '',
                    yjfx: '',
                    bskt: '',
                    zxkc: '',
                    kcms: '',
				}
			},
			// 编辑
			setEdit(item){
				this.form.fxid = item.fxid; 
				this.form.yjfx = item.yjfx;
				this.form.bskt = item.bskt; 
				this.form.zxkc = item.zxkc; 
				this.form.kcms = item.kcms; 
			},
            // 完成
            onSubmit() { 
				let params = {  
                    yjfx: this.form.yjfx,
                    bskt: this.form.bskt,  
                    slqk: this.form.slqk,  
                    zxkc: this.form.zxkc,  
                    kcms: this.form.kcms
				}  
				let url = '/api/qz/qzyjfxzxkc/save'
				if(this.form.fxid){
					params.fxid = this.form.fxid
					url = '/api/qz/qzyjfxzxkc/update'
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
/deep/.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
.el-col-2 {
    width: 8.33333%;
    text-align: center;
}
</style>