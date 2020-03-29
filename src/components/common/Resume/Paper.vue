<template>
    <!-- 论文信息弹出框 -->
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
						<el-form-item label="论文名称：">
							<el-input v-model="form.lwmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="发表刊物：">
							<el-input v-model="form.kwmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="刊物影响因子：">
							<el-input v-model="form.kwyxyz" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="发布时间："> 
							<el-date-picker type="date" v-model="form.fbrq" placeholder="请选择" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item> 
						<el-form-item label="论文收录情况：">
							<el-input v-model="form.slqk" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="参与排名：">							
							<el-select placeholder="请选择" v-model="form.cypm">
								<el-option v-for="(item,index) in cypmList" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select> 
						</el-form-item> 
						<el-form-item label="描述：" style="width:100%">
							<el-input  class="residue_word"
								type="textarea"
								:rows="5"
								maxlength="2000"
								placeholder="最大输入2000字"
								v-model="form.lwms"  show-word-limit></el-input> 
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>论文信息</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
    import Moment from "../moment.js";
	export default{
		name:"Paper",
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
					lwid: '',
                    lwmc: '',
                    kwmc: '',
                    fbrq: '',
                    slqk: '',
					kwyxyz: '',
					cypm: '',
					lwms: ''
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
					lwid: '',
                    lwmc: '',
                    kwmc: '',
                    fbrq: '',
                    slqk: '',
					kwyxyz: '',
					cypm: '',
					lwms: ''
				}
			},
			// 编辑
			setEdit(item){
				this.form.lwid = item.lwid; 
				this.form.lwmc = item.lwmc;
				this.form.kwmc = item.kwmc;
                this.form.slqk = item.slqk;                
                this.form.kwyxyz = item.kwyxyz;
                this.form.cypm = item.cypm;
                this.form.fbrq = item.fbrq; 
                this.form.lwms = item.lwms; 
			},
            // 完成
            onSubmit() { 
				let params = {  
                    lwmc: this.form.lwmc,
                    kwmc: this.form.kwmc, 
                    fbrq: Moment.formatDate2(this.form.fbrq), 
                    slqk: this.form.slqk,
                    kwyxyz: this.form.kwyxyz,
                    cypm: this.form.cypm,
                    lwms: this.form.lwms,
				}  
				let url = '/api/qz/qzlwxx/save'
				if(this.form.lwid){
					params.lwid = this.form.lwid
					url = '/api/qz/qzlwxx/update'
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