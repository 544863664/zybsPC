<template>
    <!-- 科研经历弹出框 -->
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
						<el-form-item label="项目名称：">
							<el-input v-model="form.kyxmmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="项目类别：">
							<el-input v-model="form.xmlb" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="项目时间：">
							<el-col :span="11">
							<el-date-picker type="date" v-model="form.ksrq" placeholder="开始时间" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
							<el-date-picker type="date" v-model="form.jsrq"  placeholder="结束时间" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
							</el-col> 
						</el-form-item> 
						<el-form-item label="个人排名：">							
							<el-select placeholder="请选择" v-model="form.cypm">
								<el-option v-for="(item,index) in cypmList" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>

						</el-form-item>
						<el-form-item label="是否结项：">
							<el-radio-group v-model="form.sfjx">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="描述：" style="width:100%">
							<el-input 
								type="textarea"
								:rows="5"
								maxlength="2000"
								placeholder="最大输入2000字"  show-word-limit
								v-model="form.xmms"></el-input> 
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>科研经历</div>
			</span>
		</el-dialog> 
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
    import Moment from "../moment.js";
	export default{
		name:"Research",
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
					kyjlid: '',
                    kyxmmc: '',
                    xmlb: '',
                    ksrq: '',
                    jsrq: '',
					cypm: '',
					sfjx: 1,
					xmms: ''
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
					kyjlid: '',
                    kyxmmc: '',
                    xmlb: '',
                    ksrq: '',
                    jsrq: '',
					cypm: '',
					sfjx: '',
					xmms: ''
				}
			},
			// 编辑
			setEdit(item){
				this.form.kyjlid = item.kyjlid; 
				this.form.kyxmmc = item.kyxmmc;
				this.form.xmlb = item.xmlb;
                this.form.ksrq = item.ksrq;                
                this.form.jsrq = item.jsrq;
                this.form.cypm = item.cypm;
                this.form.sfjx = parseInt(item.sfjx);
                this.form.xmms = item.xmms;
			},
            // 完成
            onSubmit() { 
				let params = {
                    kyxmmc: this.form.kyxmmc,
                    xmlb: this.form.xmlb,
                    pxnr: this.form.pxnr,
                    ksrq: Moment.formatDate2(this.form.ksrq),
					jsrq: Moment.formatDate2(this.form.jsrq),
                    cypm: this.form.cypm,
                    sfjx: this.form.sfjx,
                    xmms: this.form.xmms,
				}  
				let url = '/api/qz/qzkyjl/save'
				if(this.form.kyjlid){
					params.kyjlid = this.form.kyjlid
					url = '/api/qz/qzkyjl/update'
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
    width: 300px;
}
.el-col-2 {
    width: 8.33333%;
    text-align: center;
}
</style>