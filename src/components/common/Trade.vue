<template>
    <!-- 行业选择 -->
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
                    <div class="d_left" style="display:none">
                        <ul>
                            <li>
                                <span class="name">金融/财务</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">金融/财务</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">金融/财务</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">金融/财务</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">金融/财务</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                            <li>
                                <span class="name">计算机</span>
                                <i class="el-icon-arrow-right"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="d_right">
                        <ul>
                            <li 
                                v-for="(item,index) in getList" :key="index" 
                                @click="setVal(item,index)"
                                :class="trade.index == index ? 'active':''"
                                >
                                {{item.active}}
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="d_btn">
                        <el-button type="danger" @click="onSubmit">确定</el-button>
                        <el-button @click="onCancel">取消</el-button>
                    </div>
				</div>
			</div>
			<span slot="title" class="dialog-header">
				<div>请选择行业</div>
			</span>
		</el-dialog>
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'
	export default{
		name:"Trade",
        props:{           
            venueDialogVisible: null
        },
		components: {
			
		},
		data() {
			return {
                // 选择行业值
                trade:{
                    dm:'',
                    name:'',
                    index:-1
                },
                // 行业列表
                list:[]
			}
		},
		computed: {
			...mapGetters({
				'token': 'getToken'
			}),
			...mapState({
				findDmList: state => state.findDmList,
				findDmMap: state => state.findDmMap
            }),
            getList(){
                return this.findDmList.m_dwsshydm || [];
            }
		},
		mounted() { 
            // this.getList();
		},
		methods:{
            // 取消
            onCancel() {
                this.trade.index = -1
                this.$emit('close', false)
            },
            // 完成
            onSubmit() {
                if(this.trade.index == -1){
                    this.$message({
                        message: '请选择行业',
                        type: 'warning'
                    });
                    return
                }
                this.$emit('change', this.trade)
            },
            // 获取行业列表
            // getList(){
            //     this.list = this.findDmList.m_dwsshydm || [];
            //     console.log('行业：',this.list)
            // },
            // 点击列
            setVal(item,index){ 
                this.trade.dm = item.dm;
                this.trade.name = item.name;
                this.trade.index = index;
            }
		}
	}
</script>
<style scoped>
/deep/.el-dialog__body {
    padding: 5px 20px;
}
.dialog_info{
    /* display: flex; */
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
    width: 100%; 
    position: relative;
}
.d_right li{
    display: inline-block;
    margin-right: 20px;
    line-height: 30px;
    cursor: default;
    font-size: 14px;
    width: 153px;
}
.d_right li:hover{
    color: #FC5E5B;
}
.d_right li.active{
    color: #FC5E5B;
}
 .d_btn{
    /* position: absolute;
    bottom: 10px;
    right: 20px;
    width: 100%; */
    text-align: center;
    padding: 20px 0;
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