<template>
    <!-- 城市选择 -->
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
                    <el-cascader-panel :options="options"                    
                    :size="'medium'"  
                    :show-all-levels="true" @change="handleChange"></el-cascader-panel>
                    <div class="d_btn">
                        <el-button type="danger" @click="onSubmit">确定</el-button>
                        <el-button @click="onCancel">取消</el-button>
                    </div>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>请选择城市</div>
			</span>
		</el-dialog>
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'
	export default{
        name:"City",
        props:{
            level: Number,            
            venueDialogVisible: null
        },
		components: {
			
		},
		data() {
			return {
                // venueDialogVisible: true,
                value:[]
			}
		},
		created() {
			// var that = this;
			// console.log('vuex',that.$store);
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
			...mapState({
				ProvinceList: state => state.ProvinceList,
				ProvinceMap: state => state.ProvinceMap,
				CityList: state => state.CityList,
                CityMap: state => state.CityMap,
                AreaList: state => state.AreaList,
                AreaMap: state => state.AreaMap,
			}),
			options() {
				return this.getProvinceList();
			}
		},
		methods:{
            handleChange(value){ 
                let name = ''
                if(this.level == 2){
                    name = this.ProvinceMap[value[0]]+ this.CityMap[value[0]][value[1]]
                } else if(this.level == 3){
                    name = this.ProvinceMap[value[0]]+ this.CityMap[value[0]][value[1]]+ this.AreaMap[value[1]][value[2]]
                }
                this.value = {
                    names: name,
                    values: value
                } 
            },
            // 获取省市区列表
			getProvinceList() { 
				var options = [];
				if (this.ProvinceList && this.ProvinceList.length > 0) {
					this.ProvinceList.forEach(p => {
						let item = {
							value: p.dm,
							label: p.name,
							children: []
                        };
                        if (this.CityList && this.CityList[p.dm] && this.CityList[p.dm].length > 0) {
                            if(this.level >= 2){ 
                                this.CityList[p.dm].forEach((c, index) => {
                                    if(this.level == 2){
                                        item.children.push({
                                            value: c.dm,
                                            label: c.name
                                        });
                                    } else {
                                        item.children.push({
                                            value: c.dm,
                                            label: c.name,
                                            children: []
                                        });
                                    }
                                    if(this.level >= 3){ 
                                        if (this.AreaList && this.AreaList[c.dm] && this.AreaList[c.dm].length > 0) {
                                            this.AreaList[c.dm].forEach(d => {
                                                item.children[index].children.push({
                                                    value: d.dm,
                                                    label: d.name
                                                });
                                            });
                                        }
                                    }
                                });
                            }
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
            }
		}
	}
</script>
<style lang='less' scoped>
/deep/.el-cascader-menu__wrap {
    height: 350px;
}
/deep/.el-dialog__body {
    padding: 5px 20px;
}
.dialog_info{
    display: block;
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
/* .d_right .d_btn{
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 100%;
    text-align: right;
} */
.d_btn{
    display: block;
    padding: 10px 0;
    text-align: center;
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