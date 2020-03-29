<template>
  <!-- 求职端-简历预览页面 -->
  <div class="resume">
    <Head />
    <div class="body">
      <!-- 个人信息 -->
      <div class="user_info">
        <img src="../../assets/images/common/mine.png" class="user_img" />
        <p class="name">
          <span class="a1">{{Character.xm || Character.x ||x}}</span>
          <span
            class="a2"
          >{{findDmMap['m_xbdm'][Character.xbm]}}｜{{Character.nl}}岁 ｜ {{findDmMap['m_xldm'][Character.zgxl]}}｜ {{Character.gznx}}年工作经验</span>
        </p>
        <p class="tel_email">
          <span class="tel">{{Character.phone||encryption}}</span>
          <span class="email">{{Character.email||encryption}}</span>
        </p>
        <!-- <div class="edit_btn">
          <el-button type="danger" plain>不合适</el-button>
          <el-button type="danger">发面邀</el-button>
        </div>-->
      </div>
      <div class="resume_con">
        <!-- 左侧 -->
        <div class="resume_l">
          <div class="l_block block_2">
            <img src="../../assets/images/resume/qrcode.png" alt />
            <p>扫码关注博士投</p>
            <img src="../../assets/images/resume/qrcode.png" alt />
            <p>扫码关注博士投</p>
          </div>
          <!-- <div class="l_block block_1">
            <p class="block_1_1">收藏简历</p>
            <p class="block_1_2">下载简历</p>
            <p class="block_1_3">保存到电脑</p>
            <p class="block_1_4" @click="venueDialogVisible =  true">转发简历</p>
            <p class="block_1_5">打印简历</p>
            <p class="block_1_6">立即沟通</p>
            <p class="block_1_7">视频面试</p>
          </div>-->
        </div>
        <!-- 右侧 -->
        <div class="resume_r">
          <!-- 求职意向 -->
          <div class="r_block r_block_1" v-if="qzyxdetail">
            <div class="title">
              <span>求职意向</span>
            </div>
            <div class="content" v-for="(item,i) in qzlist" :key="i">
              <ul class="r_block_1">
                <li>
                  <span class="name">期望地点：</span>
                  <span class="val">{{item.province}}{{item.city}}</span>
                </li>
                <li>
                  <span class="name">工作性质：</span>
                  <span class="val">{{item.gzxz}}</span>
                </li>
                <li>
                  <span class="name">职位类别：</span>
                  <span class="val">{{item.gwname}}</span>
                </li>
                <li>
                  <span class="name">行业类别：</span>
                  <span class="val">{{item.hyname}}</span>
                </li>
                <li>
                  <span class="name">到岗时间：</span>
                  <span class="val">{{item.dgsj}}</span>
                </li>
                <li>
                  <span class="name">期望月薪：</span>
                  <span class="val">{{item.yx}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 工作经验 -->
          <div class="r_block r_block_2" v-if="gzjydetail">
            <div class="title">
              <span>工作经验</span>
            </div>
            <div class="content" v-for="(item,i) in gzjylist" :key="i">
              <ul class="r_block_1">
                <li class="percent">{{item.dwmc}}</li>
                <li>
                  <span class="name">{{item.zwmc}}:</span>
                  <span class="val">{{item.yx}}</span>
                </li>
                <li>
                  <span class="name">工作时间：</span>
                  <span class="val">{{item.rzsj}}-{{item.lzsj}}</span>
                </li>
                <li>
                  <span class="name">所属行业：</span>
                  <span class="val">{{item.hyname}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">工作描述：</span>
                  <span class="val">{{item.gzms}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 项目经验 -->
          <div class="r_block r_block_3" v-if="xmjydetail">
            <div class="title">
              <span>项目经验</span>
            </div>
            <div class="content" v-for="(item,i) in xmjylist" :key="i">
              <dl class="r_block_list">
                <dd>
                  <ul class="r_block_1">
                    <li class="percent">{{item.xmmc}}</li>
                    <li>
                      <span class="name">担任角色：</span>
                      <span class="val">{{item.zw}}</span>
                    </li>
                    <li>
                      <span class="name">项目时间：</span>
                      <span class="val">{{item.kssj}}-{{item.jssj}}</span>
                    </li>
                    <li class="percentdetail">
                      <span class="name">项目描述：</span>
                      <span class="val">{{item.xmms}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>

          <!-- 教育经历 -->
          <div class="education" v-if="jyjldetail">
            <div class="title">
              <span>教育经历</span>
            </div>
            <div class="content" v-for="(item,i) in jylist" :key="i">
              <div class="educationList">
                <div class="detail">
                  <span class="name">毕业院校：</span>
                  <span class="val">{{item.xxmc}}</span>
                </div>
                <div class="detail">
                  <span class="name">所学专业：</span>
                  <span class="val">{{item.zy}}</span>
                </div>
                <div class="detail">
                  <span class="name">学历：</span>
                  <span class="val">{{item.xl}}</span>
                </div>
                <div class="detail">
                  <span class="name">起止时间：</span>
                  <span class="val">{{(item.rxsj)}}-{{item.bysj||now}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 培训经历 -->
          <div class="r_block r_block_1" v-if="pxjldetail">
            <div class="title">
              <span>培训经历</span>
            </div>
            <div class="content" v-for="(item,i) in pxjllist" :key="i">
              <ul class="r_block_1">
                <li class="col-three">
                  <span class="name">培训机构：</span>
                  <span class="val">{{item.pxdw}}</span>
                </li>
                <li class="col-three">
                  <span class="name">培训课程：</span>
                  <span class="val">{{item.pxmc}}</span>
                </li>
                <li class="col-three">
                  <span class="name">培训时间：</span>
                  <span class="val">{{item.kssj}}-{{item.jssj}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 科研经历 -->
          <div class="r_block r_block_1" v-if="kyjldetail">
            <div class="title">
              <span>科研经历</span>
            </div>
            <div class="content" v-for="(item,i) in kyjllist" :key="i">
              <ul class="r_block_1">
                <li class="percent">{{item.kyxmmc}}</li>
                <li>
                  <span class="name">项目类别：</span>
                  <span class="val">{{item.xmlb}}</span>
                </li>
                <li>
                  <span class="name">项目时间：</span>
                  <span class="val">{{item.ksrq}}-{{item.jsrq}}</span>
                </li>
                <li>
                  <span class="name">项目状态：</span>
                  <span class="val">{{item.sfjx}}</span>
                </li>
                <li>
                  <span class="name">个人排名：</span>
                  <span class="val">{{item.cypm}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">项目描述：</span>
                  <span class="val">{{item.xmms}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 论文信息 -->
          <div class="r_block r_block_1" v-if="lwxxdetail">
            <div class="title">
              <span>论文信息</span>
            </div>
            <div class="content" v-for="(item,i) in lwxxlist" :key="i">
              <ul class="r_block_1">
                <li>
                  <span class="name">论文名称：</span>
                  <span class="val">{{item.lwmc}}</span>
                </li>
                <li>
                  <span class="name">发表刊物：</span>
                  <span class="val">{{item.kwmc}}</span>
                </li>
                <li>
                  <span class="name">刊物影响因子：</span>
                  <span class="val">{{item.kwyxyz}}</span>
                </li>
                <li>
                  <span class="name">发布时间：</span>
                  <span class="val">{{item.fbrq}}</span>
                </li>
                <li>
                  <span class="name">论文收录情况：</span>
                  <span class="val">{{item.slqk}}</span>
                </li>
                <li>
                  <span class="name">参与排名：</span>
                  <span class="val">{{item.cypm}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">论文描述：</span>
                  <span class="val">{{item.lwms}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 专利信息 -->
          <div class="r_block r_block_1" v-if="zlxxdetail">
            <div class="title">
              <span>专利信息</span>
            </div>
            <div class="content" v-for="(item,i) in zlxxlist" :key="i">
              <ul class="r_block_1">
                <li>
                  <span class="name">专利成果名称：</span>
                  <span class="val">{{item.zlmc}}</span>
                </li>
                <li>
                  <span class="name">专利成果编号：</span>
                  <span class="val">{{item.zlbh}}</span>
                </li>
                <li>
                  <span class="name">专利类型：</span>
                  <span class="val">{{item.zllx}}</span>
                </li>
                <li>
                  <span class="name">批准日期：</span>
                  <span class="val">{{item.pzrq}}</span>
                </li>
                <li>
                  <span class="name">专利完成状态：</span>
                  <span class="val">{{item.zlwczt}}</span>
                </li>
                <li>
                  <span class="name">本人排名：</span>
                  <span class="val">{{item.brpm}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">专利描述：</span>
                  <span class="val">{{item.zlms}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 研究方向、主修课程 -->
          <div class="r_block r_block_1" v-if="yjfxdetail">
            <div class="title">
              <span>研究方向、主修课程</span>
            </div>
            <div class="content" v-for="(item,i) in yjfxlist" :key="i">
              <ul class="r_block_1">
                <li class="percentdetail">
                  <span class="name">研究方向：</span>
                  <span class="val">{{item.yjfx}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">博士课程：</span>
                  <span class="val">{{item.bskt}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">课程描述：</span>
                  <span class="val">{{item.kcms}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 专业技能 -->
          <div class="r_block r_block_1" v-if="zyjndetail">
            <div class="title">
              <span>专业技能</span>
            </div>
            <div class="content" v-for="(item,i) in zyjnlist" :key="i">
              <dl>
                <dd>
                  <ul class="r_block_1">
                    <li class="col-three">
                      <span class="name">技能名称：</span>
                      <span class="val">{{item.jnmc}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">使用时长：</span>
                      <span class="val">{{item.sysc}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">掌握程度：</span>
                      <span class="val">{{item.slcd}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>

          <!-- 语言能力 -->
          <div class="education" v-if="yynldetail">
            <div class="title">
              <span>语言能力</span>
            </div>
            <div class="content" v-for="(item,i) in yynllist" :key="i">
              <div class="educationList">
                <div class="detail">
                  <span class="name">语种名称：</span>
                  <span class="val">{{item.yymc}}</span>
                </div>
                <div class="detail">
                  <span class="name">等级、证书：</span>
                  <span class="val">{{item.djzs}}</span>
                </div>
                <div class="detail">
                  <span class="name">听说能力：</span>
                  <span class="val">{{item.tsnl}}</span>
                </div>
                <div class="detail">
                  <span class="name">读写能力：</span>
                  <span class="val">{{item.dxnl}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 获得证书 -->
          <div class="r_block r_block_1" v-if="hdzsdetail">
            <div class="title">
              <span>获得证书</span>
            </div>
            <div class="content" v-for="(item,i) in hdzslist" :key="i">
              <dl>
                <dd>
                  <ul class="r_block_1">
                    <li class="col-three">
                      <span class="name">证书名称：</span>
                      <span class="val">{{item.zsmc}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">等级类别：</span>
                      <span class="val">{{item.zslb}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">获得时间：</span>
                      <span class="val">{{item.hdrq}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <!-- 荣誉奖励 -->
          <div class="r_block r_block_1" v-if="ryjldetail">
            <div class="title">
              <span>荣誉奖励</span>
            </div>
            <div class="content" v-for="(item,i) in ryjllist" :key="i">
              <dl>
                <dd>
                  <ul class="r_block_1">
                    <li class="col-three">
                      <span class="name">荣誉名称：</span>
                      <span class="val">{{item.jlmc}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">奖励单位：</span>
                      <span class="val">{{item.jldw}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">奖励级别：</span>
                      <span class="val">{{item.jljb}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">获奖角色：</span>
                      <span class="val">{{item.jljs}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">荣誉称号：</span>
                      <span class="val">{{item.rych}}</span>
                    </li>
                    <li class="col-three">
                      <span class="name">获奖日期：</span>
                      <span class="val">{{item.jlrq}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>

          <!-- 参与社会活动 -->
           <div class="r_block r_block_1" v-if="shhddetail">
            <div class="title">
              <span>参与社会活动</span>
            </div>
            <div class="content"  v-for="(item,i) in shhdlist" :key="i">
              <ul class="r_block_1">
                <li class="percent">
                  <span class="name">活动名称：</span>
                  <span class="val">{{item.hdmc}}</span>
                </li>
                <li class="percentdetail">
                  <span class="name">活动内容：</span>
                  <span class="val">{{item.hdnr}}</span>
                </li>
                <li class="percentdetail">
                    <span class="name">活动成果：</span>
                  <span class="val">{{item.hdcg}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 自我评价 -->
            <div class="r_block r_block_1" v-if="zwpjtail">
            <div class="title">
              <span>自我评价</span>
            </div>
            <div class="content">{{Character.zwpj}}</div>
          </div>


          <!-- 附件 -->
          <!-- <div class="r_block r_block_1">
            <div class="title">
              <span>附件</span>
            </div>
            <div class="content">
              <p>您最多可以上传三份附件</p>

              <el-table :data="fileList" style="width: 100%">
                <el-table-column label="附件名">
                  <template slot-scope="scope">附件{{scope.$index+1}}：{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" plain>预览</el-button>
                    <el-button size="mini" type="danger" plain v-if="scope.row.down">下载</el-button>
                    <el-button size="mini" type="danger" plain v-if="!scope.row.down">已下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <!-- 转发弹出框 -->
    <el-dialog
      width="35%"
      :visible.sync="venueDialogVisible"
      :lock-scroll="true"
      :show-close="true"
      :modal="false"
    >
      <div class="dialog__body-wrap wrap_zf">
        <p>转发至</p>
        <img src="../../assets/images/resume/t1.png" class="img1" />
        <img src="../../assets/images/resume/t2.png" alt />
      </div>
    </el-dialog>
    <Foot />
  </div>
</template>

<script>
import Head from "../Head.vue";
import Foot from "../Foot.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
// // import Moment from 'moment'
// import Moment from "../common/moment.js";
export default {
  name: "PersonalResume",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      qzbsid: "",
      encryption: "***********",
      now: "至今",
      x: "*****",
      Character: {
        //求职详细信息
        xm: "", //姓名
        x: "", //姓
        nl: "", //年龄
        xbm: "", //性别
        phone: "", //手机号码
        email: "", //邮箱
        gznx: "", //工作年限
        zgxl: "", //学历
        zwpj: "" //自我评价
      },
      qzlist: [], //求职列表
      xmjylist: [], //项目经验列表
      jylist: [], //教育经历列表
      gzjylist: [], //工作经验列表
      yjfxlist: [], //研究方向列表
      lwxxlist: [], //论文信息列表
      kyjllist: [], //科研经历列表
      pxjllist: [], //培训经历列表
      zlxxlist: [], //专利信息列表
      zyjnlist: [], //专业技能列表
      yynllist: [], //语言能力列表
      hdzslist: [], //获得证书列表
      ryjllist: [], //荣誉奖励列表
      shhdlist: [], //社会活动列表
      zwpjtail: true, //自我评价详情
      shhddetail: true, //社会活动详情
      ryjldetail: true, //荣誉奖励信息
      hdzsdetail: true, //获得证书详情
      yynldetail: true, //语言能力信息
      zyjndetail: true, //专业技能信息
      zlxxdetail: true, //专利详情信息
      pxjldetail: true, //培训经历信息
      kyjldetail: true, //科研经历信息
      lwxxdetail: true, //论文信息详情
      gzjydetail: true, //工作经验详情
      qzyxdetail: true, //求职信息
      xmjydetail: true, //项目经验信息
      jyjldetail: true, //教育经历信息
      yjfxdetail: true, //研究方向信息
      venueDialogVisible: false,
      // 编辑弹出框
      edit: {
        show: false
      },
      // 左侧进度条
      percentage: 20,
      // 当前左侧tab
      leftTab: 1,
      // 默认投递
      defaultPub: false,
      // 屏蔽公司
      hidCompany: false
      // 附件列表
      //   fileList: [
      //     {
      //       name: "*****简历.doc",
      //       down: false
      //     },
      //     {
      //       name: "*****简历.doc",
      //       down: true
      //     },
      //     {
      //       name: "*****简历.doc",
      //       down: false
      //     }
      //   ]
    };
  },
  created() {
    this.Characterdetails(); //详情
    this.qzdetail(); //求职意向
    this.gzdetail(); //工作经验
    this.xmdetail(); //项目经验
    this.jydetail(); //教育经历
    this.lwdetail(); //论文信息
    this.kydetail(); //科研经历
    this.pxdetail(); //培训经历
    this.zldetail(); //专利信息
    this.yjdetail(); //研究方向
    this.zydetail(); //专业技能
    this.yydetail(); //语言能力
    this.zsdetail(); //获得证书
    this.rydetail(); //荣誉奖励
    this.shdetail(); //社会活动
  },
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList,
      ProvinceList: state => state.ProvinceList,
      ProvinceMap: state => state.ProvinceMap,
      CityList: state => state.CityList,
      CityMap: state => state.CityMap,
      JobCategoryFirstMap: state => state.JobCategoryFirstMap,
      JobCategorySecondMap: state => state.JobCategorySecondMap,
      JobCategoryThirdMap: state => state.JobCategoryThirdMap
    })
  },
  methods: {
    //人物详情信息
    Characterdetails() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxInfo`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.Character.xm = res.data.qzinfo.xm; //姓名
            this.Character.x = res.data.qzinfo.x; //姓
            this.Character.nl = res.data.qzinfo.nl; //年龄
            this.Character.xbm = res.data.qzinfo.xbm; //性别
            this.Character.phone = res.data.qzinfo.phone; //手机号码
            this.Character.email = res.data.qzinfo.email; //邮箱
            this.Character.gznx = res.data.qzinfo.gznx; //工作年限
            this.Character.zgxl = res.data.qzinfo.zgxl; //工作学历
            this.Character.zwpj = res.data.qzinfo.zwpj; //自我评价
            if (this.Character.zwpj == null) {
              //判断是否有填写自我评价 没有就不展示
              this.zwpjtail = false;
            } else {
              this.zwpjtail = true;
            }
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    // 求职意向列表
    qzdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxQzyx`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.qzlist = res.data.qzyx; //求职列表
            if (this.qzlist.length == 0) {
              //判断是否有填写求职意向 没有就不展示
              this.qzyxdetail = false;
            } else {
              this.qzyxdetail = true;
            }
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //工作经验列表
    gzdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxGzjl`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.gzjylist = res.data.gzjl;
            if (this.gzjylist.length == 0) {
              //判断是否有填写教育经历 没有就不展示
              this.gzjydetail = false;
            } else {
              this.gzjydetail = true;
            }
            // this.gzjylist.forEach(element => {
            //   element.rzsj = Moment.formatDate5(element.rzsj);
            //   element.lzsj = Moment.formatDate5(element.lzsj);
            // })
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //项目经验
    xmdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxXmjy`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.xmjylist = res.data.xmjy; //项目经验列表
            if (this.xmjylist.length == 0) {
              //判断是否有填写项目经验 没有就不展示
              this.xmjydetail = false;
            } else {
              this.xmjydetail = true;
            }
            //校验项目经验时间
            // this.xmjylist.forEach(element => {
            //   element.kssj = Moment.formatDate5(element.kssj);
            //   element.jssj = Moment.formatDate5(element.jssj);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //教育经历
    jydetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxJyjl`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.jylist = res.data.jyjl; //教育经历列表
            if (this.jylist.length == 0) {
              //判断是否有填写教育经历 没有就不展示
              this.jyjldetail = false;
            } else {
              this.jyjldetail = true;
            }
            // 教育经历时间校验
            // this.jylist.forEach(element => {
            //   element.rxsj = Moment.formatDate5(element.rxsj);
            //   element.bysj = Moment.formatDate5(element.bysj);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //研究方向
    yjdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxYjfx`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.yjfxlist = res.data.yjfx;
            if (this.yjfxlist.length == 0) {
              //判断是否有填写研究方向 没有就不展示
              this.yjfxdetail = false;
            } else {
              this.yjfxdetail = true;
            }
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //论文信息
    lwdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxLwxx`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.lwxxlist = res.data.lwxx;
            if (this.lwxxlist.length == 0) {
              //判断是否有填写论文信息 没有就不展示
              this.lwxxdetail = false;
            } else {
              this.lwxxdetail = true;
            }
            this.lwxxlist.forEach(element => {
              element.fbrq = Moment.formatDate5(element.fbrq);
            });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //科研经历
    kydetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxKyjl`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.kyjllist = res.data.kyjl;
            if (this.kyjllist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.kyjldetail = false;
            } else {
              this.kyjldetail = true;
            }
            //科研经历时间
            // this.kyjllist.forEach(element => {
            //   element.ksrq = Moment.formatDate5(element.ksrq);
            //   element.jsrq = Moment.formatDate5(element.jsrq);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //培训经历
    pxdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxPxjl`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.pxjllist = res.data.pxjl;
            if (this.pxjllist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.pxjldetail = false;
            } else {
              this.pxjldetail = true;
            }
            //培训时间校验
            // this.pxjllist.forEach(element => {
            //   element.kssj = Moment.formatDate5(element.kssj);
            //   element.jssj = Moment.formatDate5(element.jssj);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //专利信息
    zldetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxZlxx`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.zlxxlist = res.data.zlxx;
            if (this.zlxxlist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.zlxxdetail = false;
            } else {
              this.zlxxdetail = true;
            }
            // this.zlxxlist.forEach(element => {
            //   element.pzrq = Moment.formatDate5(element.pzrq);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //语言能力
    yydetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxYynl`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.yynllist = res.data.yynl;
            if (this.yynllist.length == 0) {
              //判断是否有填写语言能力 没有就不展示
              this.yynldetail = false;
            } else {
              this.yynldetail = true;
            }
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //专业技能
    zydetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxZyjn`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.zyjnlist = res.data.zyjn;
            if (this.zyjnlist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.zyjndetail = false;
            } else {
              this.zyjndetail = true;
            }
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //获得证书
    zsdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxZsxx`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.hdzslist = res.data.zsxx;
            if (this.hdzslist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.hdzsdetail = false;
            } else {
              this.hdzsdetail = true;
            }
            // this.hdzslist.forEach(element => {
            //   element.hdrq = Moment.formatDate5(element.hdrq);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //荣誉奖励
    rydetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxRyjl`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.ryjllist = res.data.ryjl;
            if (this.ryjllist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.ryjldetail = false;
            } else {
              this.ryjldetail = true;
            }
            // this.ryjllist.forEach(element => {
            //   element.jlrq = Moment.formatDate5(element.jlrq);
            // });
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    },
    //社会活动
    shdetail() {
      this.axios({
        url: `/api/qz/jlyl/findQzxxShhd`,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            // this.dataList = res.data.gwList;
            this.shhdlist = res.data.shhd;
            if (this.shhdlist.length == 0) {
              //判断是否有填写科研经历 没有就不展示
              this.shhddetail = false;
            } else {
              this.shhddetail = true;
            }
          } else {
            // this.dataList = [];
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            //   offset: 300
            // });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.data.msg,
            offset: 300
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.wrap_zf {
  padding: 0 20px 20px 20px;
  text-align: center;
  font-size: 24px;
  color: #606266;
}
.wrap_zf p {
  padding: 0 0 20px 0;
}
.wrap_zf .img1 {
  margin-right: 32px;
}
.resume_r {
}
.resume_r .r_block {
  //   padding: 10px 10px 30px 10px;     下面间距调试小了一点
  padding: 10px;
  background: #fff;
  /* margin-bottom: 25px; */
  position: relative;
}
.resume_r .r_block .title {
  font-size: 16px;
  color: #606266;
  position: relative;
  background: #f6f8fa;
  line-height: 30px;
  span {
    color: #696e7d;
    font-weight: bold;
  }
}
.resume_r .r_block .title .add {
  position: absolute;
  right: 0;
  top: 0;
  font-style: normal;
  font-size: 16px;
  padding-left: 30px;
  color: #606266;
  cursor: default;
  background: url("../../assets/images/resume/Icon-add.png") 0 center no-repeat;
}
.resume_r .r_block .title .add:hover {
  color: #fc5e5b;
}
.resume_r .r_block .bottom {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  cursor: default;
}
.resume_r .r_block .bottom span {
  background: #eee;
  padding: 5px 50px;
  background: linear-gradient(right, #fff, #eee, #fff);
  background: -webkit-linear-gradient(right, #fff, #eee, #fff);
  background: -o-linear-gradient(right, #fff, #eee, #fff);
  background: -moz-linear-gradient(right, #fff, #eee, #fff);
  background: -webkit-linear-gradient(right, #fff, #eee, #fff);
}
.resume_r .r_block .content {
  overflow: auto;
  color: #606266;
  font-size: 14px;
  line-height: 30px;
  margin-top: 10px;
}
.resume_r .r_block .content li {
  width: 45%;
  float: left;
  .name {
    font-weight: bold;
  }
}
.resume_r .r_block .content li.percent {
  width: 100%;
  font-weight: bold;
}
.resume_r .r_block .content li.percentdetail {
  width: 95%;
  //   font-weight: bold;
}
.resume_r .r_block .content li.col-three {
  width: 33%;
}

.resume_r .r_block .r_btn {
  position: absolute;
  right: 10px;
  top: 41px;
}

.r_block_list {
}
.r_block_list dd {
  position: relative;
  //   margin-bottom: 20px;
  overflow: auto;
}
.r_block_list dd .r_btn {
  top: 0 !important;
}

.block_2 {
  padding: 20px 0;
  font-size: 16px;
  color: #606266;
  text-align: center;
}
.block_2 p {
  margin-bottom: 10px;
}
.block_2 img {
  height: 144px;
  width: 151px;
  border: 1px solid #ddd;
}

.resume {
  width: 100%;
  /* margin-top: 7.5rem; */
  /* padding-top: 1.2rem; */
  overflow: hidden;
}
.resume .body {
  width: 75rem;
  margin: 0 auto;
  padding: 0;
}

.user_info {
  margin-top: 20px;
  padding: 10px 20px;
  margin-bottom: 20px;
  background: #fff;
  font-size: 14px;
  line-height: 30px;
  position: relative;
  overflow: auto;
}
.user_info .user_img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 30px;
  float: left;
}
.user_info .name .a1 {
  margin-right: 35px;
  font-weight: bold;
}
.user_info .tel_email span {
  padding: 4px 25px;
  margin-right: 10px;
  line-height: 30px;
}
.user_info .tel_email .tel {
  background: url("../../assets/images/common/phone.png") 0 -5px no-repeat;
  background-size: 25px;
}
.user_info .tel_email .email {
  background: url("../../assets/images/common/youjian.png") 0 -5px no-repeat;
  background-size: 25px;
}
.user_info .edit_btn {
  position: absolute;
  right: 10px;
  top: 25px;
}
/deep/.el-button--danger.is-plain {
  width: 90px;
  font-size: 12px;
}
.resume_con {
  display: flex;
  margin-top: 34px;
}
.resume_con .resume_l {
  width: 20%;
  height: 100%;
  background: #fff;
  padding: 20px;
}
.resume_con .resume_r {
  width: 80%;
  padding-left: 20px;
}

.resume_l .l_block {
  background: rgb(247, 247, 247);
  padding: 10px;
  font-size: 16px;
  color: #606266;
  line-height: 30px;
  margin-bottom: 12px;
}
.resume_l .block_1 {
  line-height: 35px;
}
.resume_l .block_1 p {
  padding-left: 30px;
  background: url("../../assets/images/common/Icon-upload.png") 5px center
    no-repeat;
  background-size: 16px;
}
.resume_l .block_1 p.block_1_1 {
  background-image: url("../../assets/images/resume/icon1.png");
}
.resume_l .block_1 p.block_1_2 {
  background-image: url("../../assets/images/resume/Icon-download.png");
}
.resume_l .block_1 p.block_1_3 {
  background-image: url("../../assets/images/resume/icon3.png");
}
.resume_l .block_1 p.block_1_4 {
  background-image: url("../../assets/images/resume/Icon-exit.png");
}
.resume_l .block_1 p.block_1_5 {
  background-image: url("../../assets/images/resume/icon5.png");
}
.resume_l .block_1 p.block_1_6 {
  background-image: url("../../assets/images/resume/icon6.png");
}
.resume_l .block_1 p.block_1_7 {
  background-image: url("../../assets/images/resume/icon7.png");
}

.resume_l.user_top {
}
.resume_l.user_top .block_1 {
  background: #fff;
  padding: 0;
  font-size: 14px;
  color: #606266;
  line-height: 30px;
  margin-bottom: 0;
}
.resume_l.user_top .block_1 p {
  display: inline-block;
  margin-right: 30px;
}
.resume_l.user_top .block_1 .block_2_1,
.resume_l.user_top .block_1 .block_2_2,
.resume_l.user_top .block_1 .block_3 {
  display: inline-block;
  margin-right: 30px;
}
.resume_l.user_top .block_1 .block_2_1 i {
  color: #fc5e5b;
  font-style: normal;
  padding-left: 20px;
}
.resume_l.user_top .block_1 .block_3 p {
  background: none;
  padding-left: 0;
}
.resume_l.user_top .block_1 .block_3 {
  padding: 0;
  vertical-align: top;
}
.Head {
  position: relative;
}
.education {
  padding: 10px;
  background: #fff;
  /* margin-bottom: 25px; */
  position: relative;
  .content {
    overflow: auto;
    color: #606266;
    font-size: 14px;
    line-height: 30px;
    margin-top: 10px;
    .educationList {
      display: flex;
      justify-content: flex-start;
      .detail {
        width: 25%;
        .name {
          font-weight: bold;
        }
      }
    }
  }
  .title {
    font-size: 16px;
    color: #606266;
    position: relative;
    background: #f6f8fa;
    line-height: 30px;
    span {
      color: #696e7d;
      font-weight: bold;
    }
  }
}
</style>
