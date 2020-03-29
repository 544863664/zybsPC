<template>
    <!-- 岗位、职位选择 -->
    <div>
		<el-dialog
			:visible.sync="venueDialogVisible"
			width="50%"
			:lock-scroll="true"
			:show-close="true"
            :before-close="onCancel"
			:modal="false">
			<div class="dialog__body-wrap">
                <el-cascader-panel :options="options"                    
                :size="'medium'"  
                :show-all-levels="true" @change="handleChange"></el-cascader-panel>
                <div class="d_btn">
                    <el-button type="danger" @click="onSubmit">确定</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </div>
			</div>
			<span slot="title" class="dialog-header">
				<div>请选择职位</div>
			</span>
		</el-dialog>
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'
	export default{
		props:{
            venueDialogVisible: null
		},
		name:"Post",
		components: {
			
		},
		data() {
			return {
                value: [],
			}
		},
		created() { 
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
			...mapState({
				JobCategoryFirstList: state => state.JobCategoryFirstList,
				JobCategoryFirstMap: state => state.JobCategoryFirstMap,
				JobCategorySecondList: state => state.JobCategorySecondList,
                JobCategorySecondMap: state => state.JobCategorySecondMap,
                JobCategoryThirdList: state => state.JobCategoryThirdList,
                JobCategoryThirdMap: state => state.JobCategoryThirdMap,
			}),
			options() {
				return this.getJobList();
			}
		},
		methods:{
            // 获取岗位列表列表
			getJobList() {
				var options = [];
				if (this.JobCategoryFirstList && this.JobCategoryFirstList.length > 0) {
					this.JobCategoryFirstList.forEach(p => {
						let item = {
							value: p.dm,
							label: p.name,
							children: []
                        };
                        if (this.JobCategorySecondList && this.JobCategorySecondList[p.dm] && this.JobCategorySecondList[p.dm].length > 0) {
                            this.JobCategorySecondList[p.dm].forEach((c, index) => {
                                item.children.push({
                                    value: c.dm,
                                    label: c.name,
                                    children: []
                                });
                                if (this.JobCategoryThirdList && this.JobCategoryThirdList[c.dm] && this.JobCategoryThirdList[c.dm].length > 0) {
                                    this.JobCategoryThirdList[c.dm].forEach(d => {
                                        item.children[index].children.push({
                                            value: d.dm,
                                            label: d.name
                                        });
                                    });
                                }
                            });  
                        } 
                        options.push(item); 
					});
                }
				return options;
			},
            // 取消
            onCancel() {
                this.$emit('close', false)
            },
            // 完成
            onSubmit() {
                this.$emit('change', this.value)
            },
            handleChange(value){ 
                let name = '';
                    name = this.JobCategoryFirstMap[value[0]] + '/' + this.JobCategorySecondMap[value[0]][value[1]] + '/' + this.JobCategoryThirdMap[value[1]][value[2]]
                this.value = {
                    names: name,
                    values: value
                }
            },
		}
	}
</script>
<style scoped>
/deep/.el-cascader-menu__wrap {
    height: 350px;
}
/deep/.el-dialog__body {
    padding: 5px 20px;
} 
.d_btn{
    display: block;
    padding: 10px 0;
    text-align: center;
}
.dialog_info{
    display: flex;
}
.d_left{
    font-size: 12px;
    color: #606266;
    width: 18%;
    max-height: 400px;
    overflow: auto;
}
.d_left li{
    line-height: 30px;
    cursor: default;
    position: relative;
}
.d_left li .el-icon-arrow-right{
    position: absolute;
    right: 9px;
    top: 10px;
}
.d_left li:hover{
    color: #FC5E5B;
}
.d_left li.active{
    color: #FC5E5B;
}

.d_right{
    font-size: 12px;
    color: #606266;
    width: 80%;
    padding-left: 3%;
    position: relative;
}
.d_right li{
    display: inline-block;
    margin-right: 20px;
    line-height: 30px;
    cursor: default;
}
.d_right li:hover{
    color: #FC5E5B;
}
.d_right .d_btn{
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 100%;
    text-align: right;
}

.d_left::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.d_left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    background: #909399;
}
.d_left::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    background: #EDEDED;
}
</style>