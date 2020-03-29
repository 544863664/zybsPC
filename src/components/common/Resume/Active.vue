<template>
    <!-- 参与社会活动弹出框 -->
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
						<el-form-item label="活动名称：">
							<el-input v-model="form.hdmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="活动时间：">
							<el-date-picker type="date" v-model="form.hdsj" placeholder="请选择" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item> 
						<el-form-item label="活动内容：">
							<el-input  class="residue_word"
								type="textarea"
								:rows="5"
								maxlength="2000"
								placeholder="最大输入2000字"
								v-model="form.hdnr"  show-word-limit></el-input>
						</el-form-item> 
						<el-form-item label="活动成果：" style="width:100%">
							<el-input  class="residue_word"
								type="textarea"
								:rows="5"
								maxlength="2000"
								placeholder="最大输入2000字"
								v-model="form.hdcg"  show-word-limit></el-input> 
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>参与社会活动</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex' 
    import Moment from "../moment.js";
	export default{
		name:"Active",
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
					hdid: '',
                    hdmc: '',
                    hdsj: '',
                    hdnr: '',
                    hdcg: '',
				}, 
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
					hdid: '',
                    hdmc: '',
                    hdsj: '',
                    hdnr: '',
                    hdcg: '',
				}
			},
			// 编辑
			setEdit(item){
				this.form.hdid = item.hdid; 
				this.form.hdmc = item.hdmc;
				this.form.hdsj = item.hdsj; 
				this.form.hdnr = item.hdnr; 
				this.form.hdcg = item.hdcg; 
			},
            // 完成
            onSubmit() { 
				let params = {  
                    hdmc: this.form.hdmc,
                    hdsj: Moment.formatDate2(this.form.hdsj),  
                    slqk: this.form.slqk,  
                    hdnr: this.form.hdnr,  
                    hdcg: this.form.hdcg
				}  
				let url = '/api/qz/qzshhd/save'
				if(this.form.hdid){
					params.hdid = this.form.hdid
					url = '/api/qz/qzshhd/update'
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