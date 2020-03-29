<template>
    <!-- 自我评价弹出框 -->
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
                        <el-form-item label="评价内容：">
							<el-input  class="residue_word"
								type="textarea"
								:rows="5"
								maxlength="1000"
								placeholder="最大输入1000字"
								v-model="con"  show-word-limit></el-input> 
						</el-form-item> 
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>自我评价</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'  
	export default{
		name:"Self",
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
				con: '' 
			}
		},
		created() { 
		},
		mounted(){
		},
		watch:{
			datas(old){
				console.log(old)
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
				this.con = ''
			},
			// 编辑
			setEdit(item){
				this.con = item.con;
			},
            // 完成
            onSubmit() { 
				let params = {  
					zwpj: this.con, //自我评价
				}  
				let	url = '/api/qz/qzgrjbxx/update'
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
/deep/.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
.el-col-2 {
    width: 8.33333%;
    text-align: center;
}
.residue_word {
    position: relative;
    width: 500px;
    height: 200px;
}
.residue_word /deep/.el-textarea__inner {
    width: 500px;
    height: 200px;
	margin: 0 0 20px 0;
}
/deep/.el-form-item__content{
	margin-top: 15px;
}
</style>