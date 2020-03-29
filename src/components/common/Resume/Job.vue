<template>
    <!-- 求职意向弹出框 -->
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
                    <el-form ref="form"  label-width="100px">
						<el-form-item label="期望地点：">
							<p class="col_select" :class="city.value == '请选择'?'gray':''" @click="city.dialog = true">
								{{city.value}}
								<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
							</p>
						</el-form-item>
						<el-form-item label="工作性质：">
							<el-radio-group v-model="form.m_gwgzxzdm">
								<el-radio v-for="(item,index) in findDmList.m_gwgzxzdm" :key='index' :label="item.dm">{{item.name}}</el-radio>
							</el-radio-group>
						</el-form-item> 
						<el-form-item label="公司性质："> 
							<el-select placeholder="请选择" v-model="form.gsxzm">
								<el-option v-for="(item,index) in findDmList.m_dwxzdm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否面议：">
							<el-radio-group v-model="form.sfmy">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item> 
						<el-form-item label="到岗时间："> 
							<el-select placeholder="请选择" v-model="form.m_dgsjdm">
								<el-option v-for="(item,index) in findDmList.m_dgsjdm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="职业类别：">
							<p class="col_select" :class="post.value == '请选择'?'gray':''" @click="post.dialog = !post.dialog">
								{{post.value}}
								<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
							</p>
						</el-form-item>
						<el-form-item label="行业类别：">
							<p class="col_select" :class="trade.value == '请选择'?'gray':''" @click="trade.dialog = !trade.dialog">
								{{trade.value}}
								<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-down"></i></span></span>
							</p>
						</el-form-item>
						<el-form-item label="期望月薪：">
							<el-select placeholder="请选择" v-model="form.m_xzdydm">
								<el-option v-for="(item,index) in findDmList.m_xzdydm" :key='index' :label="item.name" :value="item.dm"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">确定</el-button>
							<el-button @click="onCancel">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>求职意向</div>
			</span>
		</el-dialog>

		<!-- 行业弹出框 -->
		<trade :venue-dialog-visible="trade.dialog" @change="changeTrade" @close="closeTrade"></trade>

		<!-- 职位弹出框 -->
		<post :venue-dialog-visible="post.dialog" @change="changePost" @close="closePost"></post>

		<!-- 城市弹出框 -->
		<city :venue-dialog-visible="city.dialog" :level="2" @change="changeCity" @close="closeCity"></city>
    </div>
</template>

<script>
	import Trade from '../Trade'
	import Post from '../Post'
	import City from '../City'
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
	export default{
		name:"Job",
		props:{
            venueDialogVisible: null,
			list:{
                required: 0,
                type: Number
			},
			datas:{
                required: {},
                type: Object
			}
		},
		components: {
			Trade,Post,City
		},
		data() {
			return {
				// venueDialogVisible: true,
				// 行业
				trade:{
					dialog:false,
					value:'请选择',
					vid:''
				},
				// 职位
				post:{
					dialog:false,
					value:'请选择',
					vid:[]
				},
				// 城市
				city:{
					dialog:false,
					value:'请选择',
					vid:[]
				},
				form:{
					// 工作性质
					m_gwgzxzdm:'gx_001',
					// 到岗时间
					m_dgsjdm:'',
					// 期望月薪
					m_xzdydm:'',
					// 公司性质
					gsxzm:'',
					// 是否面议
					sfmy:1,
					qzyxid:''
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
				this.post={
					dialog:false,
					value:'请选择',
					vid:[]
				}
				this.city={
					dialog:false,
					value:'请选择',
					vid:[]
				}
				this.form={
					// 工作性质
					m_gwgzxzdm:'gx_001',
					// 到岗时间
					m_dgsjdm:'',
					// 期望月薪
					m_xzdydm:'',
					// 公司性质
					gsxzm:'',
					// 是否面议
					sfmy:1,
					qzyxid:''
				}
			},
			// 编辑
			setEdit(item){ 
				this.form.qzyxid = item.qzyxid;
				this.city.vid[0] = item.sjm;
				this.city.vid[1] = item.cjm;
				this.city.value = this.ProvinceMap[item.sjm] + this.CityMap[item.sjm][item.cjm]
				this.form.m_dgsjdm = item.dgsj;
				this.form.m_gwgzxzdm = item.gzxzm;
				// this.form.yxj = item.yxj;
				this.form.gsxzm = item.gsxzm; 
				this.form.sfmy = parseInt(item.sfmy); 
				this.form.m_xzdydm = item.yxm; 
				this.post.vid[0] = item.zwmo; 
				this.post.vid[1] = item.zwmt; 
				this.post.vid[2] = item.zwm;   
				this.post.value = this.JobCategoryFirstMap[item.zwmo] + '/' + this.JobCategorySecondMap[item.zwmo][item.zwmt] + '/' + this.JobCategoryThirdMap[item.zwmt][item.zwm];
				this.trade.vid = item.hym;
				this.trade.value = this.findDmMap.m_dwsshydm[item.hym];
			},
            // 完成
            onSubmit() { 
				if(this.city.vid.length == 0){
					this.$message({
						message: '请选择期望地点',
						type: 'warning',
						offset: 400
					});
					return;
				} else if(!this.trade.vid){
					this.$message({
						message: '请选择行业',
						type: 'warning',
						offset: 400
					});
					return;
				} else if(this.post.vid.length == 0){
					this.$message({
						message: '请选择岗位',
						type: 'warning',
						offset: 400
					});
					return;
				}
				let params = {
					sjm: this.city.vid[0], //省代码
					cjm: this.city.vid[1], //城市代码
					dgsj: this.form.m_dgsjdm, //到岗时间
					gzxzm: this.form.m_gwgzxzdm, //工作性质
					yxj: this.list+1, //优先级
					gsxzm: this.form.gsxzm, //公司性质
					sfmy: this.form.sfmy, //是否面议
					yxm: this.form.m_xzdydm, //期望月薪
					ys:'12', //月数
					zwmo: this.post.vid[0],//岗位一级
					zwmt: this.post.vid[1],//岗位二级
					zwm: this.post.vid[2],  //岗位三级
					hym: this.trade.vid, //行业类别
					nx:"" 
				} 
				let url = '/api/qz/qzqzyx/save'
				if(this.form.qzyxid){
					params.qzyxid = this.form.qzyxid
					url = '/api/qz/qzqzyx/update'
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
                // this.$emit('change', false)
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
			},
			// 获职位选择值
			changePost(obj){ 
				this.post.value = obj.names || '请选择';
				this.post.vid = obj.values;
				this.post.dialog = false;
			},
			// 关闭职位弹出框
			closePost( ){ 
				this.post.dialog = false;
			},
			// 获取城市选择值
			changeCity(obj){ 
				this.city.value = obj.names || '请选择';
				this.city.vid = obj.values;
				this.city.dialog = false;
			},
			// 关闭城市弹出框
			closeCity( ){ 
				this.city.dialog = false;
			},
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
</style>