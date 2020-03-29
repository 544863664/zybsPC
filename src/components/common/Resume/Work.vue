<template>
    <!-- 工作经验弹出框 -->
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
						<el-form-item label="公司名称：">
							<el-input v-model="form.dwmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="职位名称：">
							<el-input v-model="form.zwmc" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="税前月薪：">
							<el-select placeholder="请选择" v-model="form.yx">
								<el-option v-for="(item,index) in findDmList.m_xzdydm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工作时间：">
							<el-col :span="11">
							<el-date-picker type="date" v-model="form.rzsj" placeholder="入职时间" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
							<el-date-picker type="date" v-model="form.lzsj"  placeholder="离职时间" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
							</el-col> 
						</el-form-item>
						<el-form-item label="所属行业：">
							<p class="col_select" :class="trade.value == '请选择'?'gray':''" @click="trade.dialog = !trade.dialog">
								{{trade.value}}
								<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
							</p>
						</el-form-item> 
						<el-form-item label="是否隐藏工资：">
							<el-radio-group v-model="form.sfyc">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="工作描述：">
							<el-input 
								type="textarea"
								:rows="5"
								maxlength="2000"
								placeholder="最大输入2000字"  show-word-limit
								v-model="form.gzms"></el-input> 
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>工作经验</div>
			</span>
		</el-dialog>

		<!-- 行业弹出框 -->
		<trade :venue-dialog-visible="trade.dialog" @change="changeTrade" @close="closeTrade"></trade>
 
    </div>
</template>

<script>
	import Trade from '../Trade' 
	// import City from '../City'
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
    import Moment from "../moment.js";
	export default{
		name:"Work",
		props:{
            venueDialogVisible: null, 
			datas:{
                required: {},
                type: Object
			}
		},
		components: {
			Trade
		},
		data() {
			return {
				// 行业
				trade:{
					dialog:false,
					value:'请选择',
					vid:''
				}, 
				form:{
                    gzjlid: '',
                    dwid: '',
                    dwmc: '',
                    zwmc: '',
                    hy: '',
                    rzsj: '',
                    lzsj: '',
                    gzms: '',
                    yx: '',
                    ys: '12', 
                    nx: '',
                    sfyc: 0,
				} 
			}
		},
		created() { 
		},
		mounted(){
		},
		watch:{
			datas(old,news){
				console.log('编辑',old, news);
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
				this.trade={
					dialog:false,
					value:'请选择',
					vid:''
				} 
				this.form={ 
                    gzjlid: '',
                    dwid: '',
                    dwmc: '',
                    zwmc: '',
                    hy: '',
                    rzsj: '',
                    lzsj: '',
                    gzms: '',
                    yx: '',
                    ys: '12', 
                    nx: '',
                    sfyc: ''
				}
			},
			// 编辑
			setEdit(item){    
				this.form.gzjlid = item.gzjlid; 
				this.form.dwid = item.dwid;
				this.form.dwmc = item.dwmc;
                this.form.zwmc = item.zwmc;                
                this.form.rzsj = item.rzsj;
                this.form.lzsj = item.lzsj;
                this.form.gzms = item.gzms;
                this.form.yx = item.yx;
                this.form.ys = item.ys;
                this.form.nx = item.nx;
                this.form.sfyc = parseInt(item.sfyc);
				this.trade.vid = item.hy;
				this.trade.value = this.findDmMap.m_dwsshydm[item.hy];
			},
            // 完成
            onSubmit() { 
				let params = {
                    dwid: '',
                    dwmc: this.form.dwmc,
                    zwmc: this.form.zwmc,
                    hy: this.trade.vid,
                    rzsj: Moment.formatDate2(this.form.rzsj),
                    lzsj: Moment.formatDate2(this.form.lzsj),
                    gzms: this.form.gzms,
                    yx: this.form.yx,
                    ys: '12', 
                    nx: '',
                    sfyc: this.form.sfyc
				}  
				let url = '/api/qz/qzgzjl/save'
				if(this.form.gzjlid){
					params.gzjlid = this.form.gzjlid
					url = '/api/qz/qzgzjl/update'
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
            },
			// 获取行业选择值
			changeTrade(obj){
				this.trade.vid = obj.dm;
				this.trade.value = obj.name;
				this.trade.dialog = false; 
			},
			// 关闭行业弹出框
			closeTrade( ){ 
				this.setClear();
				this.trade.dialog = false;
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