<!-- 会员充值 -->
<template>
  <div class="vip">
    <div class="vip_tab">
      <ul class="ul_tab">
        <li :class="{ active: tab == 1 }" @click="setTab(1)">
          <span class="tip">会员充值</span>
        </li>
        <li :class="{ active: tab == 2 }" @click="setTab(2)">
          <span class="tip">企业订单</span>
        </li>
      </ul>
      <div class="vip_tab1" v-if="tab == 1">
        <div class="tab1_sel">
          <span @click="setType(1)" :class="type == 1 ? 'active' : ''">
            金牌充值
            <i></i>
          </span>
          <span @click="setType(2)" :class="type == 2 ? 'active' : ''">
            银牌会员
            <i></i>
          </span>
          <span @click="setType(3)" :class="type == 3 ? 'active' : ''">
            铜牌会员
            <i></i>
          </span>
          <span @click="setType(4)" :class="type == 4 ? 'active' : ''">
            XX会员
            <i></i>
          </span>
          <span @click="setType(5)" :class="type == 5 ? 'active' : ''">
            视频流量
            <i></i>
          </span>
          <span @click="setType(6)" :class="type == 6 ? 'active' : ''">
            语音流量
            <i></i>
          </span>
          <span @click="setType(7)" :class="type == 7 ? 'active' : ''">
            职位置顶
            <i></i>
          </span>
        </div>
        <div class="tab1_pay">
          <p class="p1">共需支付：<span class="p2">3000元</span></p>
          <p class="p3">（金牌会员300元，职位置顶300元）</p>
          <el-button type="danger" class="btn" @click="setPay"
            >立即购买</el-button
          >
        </div>
      </div>
      <div class="vip_tab1" v-if="tab == 2">
			<div class="com1">
				<div class="com1_1">
					<span class="name">简历名称</span>
					<el-input  placeholder="交易单号"></el-input>
				</div>
				<div class="com1_1">
					<span class="name">用户名称</span>
					<el-input  placeholder="人力、企业"></el-input>
				</div>
				<div class="com1_1">
					<span class="name">交易时间</span>
					<el-date-picker
						type="date"
						placeholder="选择时间">
					</el-date-picker>
					<i class="line">至</i>
					<el-date-picker
						type="date"
						placeholder="选择时间">
					</el-date-picker>
				</div>
				<div class="com1_1">
					<span class="name">支付方式</span>				
					<el-select placeholder="请选择">
						<el-option label="支付宝" value="1"></el-option>
						<el-option label="微信" value="2"></el-option>
						<el-option label="银行卡" value="3"></el-option>
						<el-option label="线下支付" value="4"></el-option> 
					</el-select>
				</div>
				<div class="com1_1">
					<span class="name">支付状态</span>				
					<el-select placeholder="请选择">
						<el-option label="支付成功" value="1"></el-option>
						<el-option label="等待支付" value="2"></el-option>
						<el-option label="等待确认" value="3"></el-option>
						<el-option label="支付失败" value="4"></el-option> 
					</el-select>
				</div>
			</div>
          
      </div>
    </div>
    <!-- 企业订单 -->
    <div class="tab2_table" v-if="tab == 2">
        <div class="del_wrap">
            <el-button type="danger" plain>批量删除</el-button>
        </div>
        <el-table
            :data="tableData"
            border class="table_wrap"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
                prop="date"
                label="交易时间"
                width="100">
            </el-table-column>
            <el-table-column
                prop="type"
                label="订单类型"
                width="100">
            </el-table-column>

            <el-table-column
                prop="id"
                label="交易单号" >
            </el-table-column>
            <el-table-column
                prop="pay"
                label="支付方式">
            </el-table-column>
            <el-table-column
                label="订单金额">
                <template slot-scope="scope">
                    ¥{{scope.row.money}}
                </template> 
            </el-table-column>
            <el-table-column
                prop="status"
                label="支付状态">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
            <template>
                <span class="view" @click="setDetail()">查看</span>
            </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 立即购买 -->
    <el-dialog
      title="已开启安全支付"
      :visible.sync="pay.dialog"
      width="40%"
      :lock-scroll="true"
      :show-close="true"
      :modal="false"
      :before-close="handleClose"
      class="pay_dialog">
      <p class="p1">请选择支付方式</p>
      <div class="tab1_sel tab_dia">
        <span
          @click="setPayType(1)"
          :class="pay.type == 1 ? 'active' : ''"
          class="s1"
        >
          <em></em>
          支付宝支付
          <i></i>
        </span>
        <span
          @click="setPayType(2)"
          :class="pay.type == 2 ? 'active' : ''"
          class="s2"
        >
          <em></em>
          微信支付
          <i></i>
        </span>
        <span
          @click="setPayType(3)"
          :class="pay.type == 3 ? 'active' : ''"
          class="s3"
        >
          <em></em>
          银行卡支付
          <i></i>
        </span>
        <span
          @click="setPayType(4)"
          :class="pay.type == 4 ? 'active' : ''"
          class="s4"
        >
          <em></em>
          线下支付
          <i></i>
        </span>
      </div>
      <div class="qrcode1">
        <div v-show="pay.type < 4">
          <div id="qrcode" ref="qrcode"></div>
          <p>支付金额：3000元</p>
          <p>订单编号：1234567890</p>
          <p class="p2" @click="pay.success = true">我已完成支付</p>
          <p class="p3">付费即表示同意《中研博硕网在线会员充值协议》</p>
        </div>
        <div v-if="pay.type == 4">
          请联系对应的管理员
        </div>

        <QRCode style="display:none"></QRCode>
      </div>
    </el-dialog>

    <!-- 支付成功 -->
    <el-dialog
      title=""
      :visible.sync="pay.success"
      width="40%"
      :lock-scroll="true"
      :show-close="true"
      :modal="false"
      :before-close="handleClose"
      class="pay_success">
      <div class="pay1">
        <img src="../../../assets/images/enter/weixinzhifu.png" alt="" />
        <p class="s1">支付成功</p>
        <p class="s2">会员充值：<span>¥3000</span></p>
        <p class="s3" @click="setPaySuccess">完成</p>
      </div>
    </el-dialog>

    <!-- 详情查看 -->
    <el-dialog
      title="订单详情 "
      :visible.sync="detail.dialog"
      width="40%"
      :lock-scroll="true"
      :show-close="true"
      :modal="false" class="detail_wrap"
      :before-close="detailHandleClose">
        <ul>
            <li>
                <span class="name">交易单号： </span>
                <span class="val">20200303123012</span>
            </li>
            <li>
                <span class="name">交易时间：  </span>
                <span class="val">2020-03-03  12:12:12</span>
            </li>
            <li>
                <span class="name">用户名：  </span>
                <span class="val">18712334232</span>
            </li>
            <li>
                <span class="name">待付金额：  </span>
                <span class="val">400元</span>
            </li>
            <li>
                <span class="name">备注：  </span>
                <span class="val">管理员修改会员套餐</span>
            </li>
            <li>
                <span class="name">订单类型：  </span>
                <span class="val">购买会员</span>
            </li>
        </ul>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";

export default {
  name: "Enter_vip",
  components: { QRCode },
  data() {
    return {
      // tab点击
      tab: 1,
      // 充值方式
      type: 0,
      // 支付
      pay: {
        type: 1,
        success: false,
        dialog: false
      },
    //   列表数据
        tableData: [
            {
                id:20200303123012,
                type: '会员充值',
                pay: '微信支付',
                status:'支付成功',
                money:'3000',
                date: '2016-05-02',
            }, {
                id:20200303123012,
                type: '会员充值',
                pay: '微信支付',
                status:'支付成功',
                money:'3000',
                date: '2016-05-02',
            },{
                id:20200303123012,
                type: '会员充值',
                pay: '微信支付',
                status:'支付成功',
                money:'3000',
                date: '2016-05-02',
            }
        ],
        // 详情查看
        detail:{
            dialog:false
        }
    };
  },
  created() {},
  updated() {},
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList
    })
  },
  methods: {
    // 点击tab
    setTab(val) {
      this.tab = val;
    },
    setType(val) {
      this.type = val;
    },
    // 立即购买
    setPay() {
      this.pay.dialog = true; 
      // 使用$nextTick确保数据渲染
      this.$nextTick(() => {
        if(this.$refs.qrcode.innerHTML){
          this.$refs.qrcode.innerHTML = ''
        }
        this.crateQrcode();
      });
    },
    handleClose() {
      this.pay.dialog = false;
    },
    // 付款方式
    setPayType(val) {
      this.pay.type = val;
    },
    //   完成支付
    setPaySuccess() {
      this.pay.dialog = false;
      this.pay.success = false;
    },
    // 生成二维码
    crateQrcode() {
      this.qr = new QRCode("qrcode", {
        width: 142,
        height: 142, // 高度
        text: 'http:www.baidu.com' // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
    },
    // 查看订单详情
    setDetail(){
        this.detail.dialog = true;
    },
    // 关闭订单详情
    detailHandleClose(){
        this.detail.dialog = false;
    }
  }
};
</script>

<style scoped>
.detail_wrap /deep/.el-dialog__header{
   background: #FC5E5B; 
}
.detail_wrap /deep/.el-dialog__title{
   color: #fff;
}
/deep/.detail_wrap .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
.detail_wrap ul{
    padding-left: 20px;
}
.detail_wrap li{
    line-height: 30px;
    display: flex;
}
.detail_wrap li .name{
    width: 80px;
}
.detail_wrap li .val{
    width: 534px;
}
.detail_wrap li span{
    display: inline-block;
}


.tab2_table{
    margin-top: 20px;
}
.tab2_table .del_wrap{
    margin-bottom: 10px;
}
.tab2_table .view{
   color: #FC5E5B; 
   cursor: default;
}
/deep/.tab2_table .el-table th {
   background: #FC5E5B; 
   color: #fff;
}
.com1{
    padding-top: 20px;
}
 .com1 .com1_1{
	font-size: 14px;
	color: #606266;
	display:block;
} 
.com1_1{
	margin-bottom:10px;
}
.com1_1 .name{
	display:inline-block;
	height: 35px;
	line-height: 35px;
	width: 78px;
	background: #FC5E5B;
	text-align:center;
	color:#fff;
	margin-right:20px;
}
.com1_1 /deep/.el-input{
    border: 1px solid #E6E6E6;
    width: 464px;
    height: 33px;
    vertical-align: middle;
}
.com1_1 /deep/.el-input__inner{
    padding-left: 10px;
    height: 33px;
    width: 100%;
}
.com1_1 /deep/.el-date-editor--date{
	width: 204px;
}
.com1_1 /deep/.el-date-editor--date .el-input__inner{
	padding-left: 32px;
}
.com1_1 /deep/.el-select .el-input{
	width: 204px;
}
.com1_1 /deep/.el-input__icon {
    line-height: 32px;
}
.com1_1 .line{
	padding:0 20px;
	color:#E6E6E6;
}



.pay_success /deep/.el-dialog__header {
  display: none;
}
.pay_success .pay1 {
  text-align: center;
  padding-top: 100px;
}
.pay_success .s1 {
  color: #09bb07;
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 60px;
}
.pay_success .s2 {
  font-size: 16px;
  color: #303133;
  padding-bottom: 90px;
}
.pay_success .s2 span {
  font-weight: bold;
}
.pay_success .s3 {
  display: inline-block;
  height: 56px;
  line-height: 56px;
  width: 184px;
  background: #f7f7f7;
  font-size: 20px;
  color: #09bb07;
  cursor: default;
}

.qrcode1 {
  text-align: center;
}
.qrcode1 {
  font-size: 18px;
  color: #303133;
  line-height: 35px;
}
.qrcode1 .p2 {
  color: #28ca42;
}
.qrcode1 .p3 {
  margin-top: 30px;
  font-size: 12px;
  color: #c0c4cc;
}
#qrcode {
  text-align: center;
  height: 142px;
  width: 141px;
  margin: 0 auto 10px auto;
}
.tab1_sel {
  margin-top: 30px;
}
.tab1_sel span {
  display: inline-block;
  margin-right: 3%;
  margin-bottom: 20px;
  width: 28%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #e6e6e6;
  position: relative;
}
.tab1_sel span i {
  display: none;
  width: 22px;
  height: 22px;
  position: absolute;
  bottom: -1px;
  right: -1px;
  background: url("../../../assets/images/enter/select.png") 0 0 no-repeat;
}
.tab1_sel span.active {
  border: 1px solid #fc5e5b;
  color: #fc5e5b;
}
.tab1_sel span.active i {
  display: inline-block;
}
.tab1_pay {
  padding-top: 20px;
  position: relative;
  font-size: 16px;
  color: #303133;
  line-height: 25px;
}
.tab1_pay .p1 {
  font-weight: bold;
}
.tab1_pay .p2 {
  color: #fc5e5b;
}
.tab1_pay .p3 {
  font-size: 12px;
  color: #909399;
}
.tab1_pay .btn {
  position: absolute;
  right: 10px;
  top: 20px;
  height: 43px;
  width: 148px;
  background: #fc5e5b;
  font-size: 16px;
}
.pay_dialog /deep/.el-dialog__header {
  background: #e6e6e6;
}
.pay_dialog /deep/.el-dialog__title {
  display: inline-block;
  padding-left: 30px;
  font-size: 16px;
  color: #606266;
  background: url("../../../assets/images//enter/s10.png") 0 center
    no-repeat;
}
.pay_dialog /deep/.el-dialog__body {
  padding: 20px 20px;
}

.tab_dia {
  margin-top: 15px;
}
.pay_dialog .p1 {
  font-size: 18px;
  color: #303133;
}
.pay_dialog .tab1_sel span {
  width: 45%;
  margin-bottom: 10px;
}
.pay_dialog .tab1_sel span i {
  width: 26px;
  height: 26px;
  background: url("../../../assets/images/enter/s9.png") 0 0 no-repeat;
  background-size: 26px;
}
.pay_dialog .tab1_sel span.active {
  color: #06b4fd;
  border: 1px solid #06b4fd;
}
.pay_dialog .tab1_sel em {
  height: 25px;
  width: 25px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.pay_dialog .tab1_sel .s1 em {
  background: url("../../../assets/images/enter/zhifubao.png") 0 0 no-repeat;
  background-size: 25px 25px;
}
.pay_dialog .tab1_sel .s2 em {
  background: url("../../../assets/images/enter/weixinzhifu.png") 0 0 no-repeat;
  background-size: 25px 25px;
}
.pay_dialog .tab1_sel .s3 em {
  width: 27px;
  height: 21px;
  background: url("../../../assets/images/enter/yinhangqia-2.png") 0 0 no-repeat;
  background-size: 27px 21px;
}
.pay_dialog .tab1_sel .s4 em {
  background: url("../../../assets/images/enter/Icon-switch.png") 0 0 no-repeat;
  background-size: 19px 17px;
}

.vip_tab {
  padding: 15px;
  background: #fff;
}
.ul_tab {
  height: 30px;
  cursor: default;
}
.ul_tab li {
  float: left;
  margin-right: 42px;
  color: #909399;
}
.ul_tab li .tip {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}
.ul_tab li.active .tip {
  color: #fc5e5b;
  border-bottom: 2px solid #fc5e5b;
  display: inline-block;
  padding-bottom: 5px;
}
</style>
