<template>
  <div class="Jobretrieve">
    <Head @change="getSearchType" @searchVal="searchVal" />
    <div class="JobretrieveBody">
      <!-- 搜索条件 -->
      <div class="search">
        <ul>
          <li v-if="ProvinceList">
			<div class="name">省份选择:</div>
            <div class="sub_wrap" @click="cityClick('')">
              <span class="sub_name">全国</span>
            </div>
            <div
              class="sub_wrap"
              v-for="(item, index) in ProvinceList.slice(0, 12)"
              :key="index"
              @click="cityClick(item)"
            >
              <span class="sub_name">{{item.name}}</span>
            </div>
            <div class="other" @click="getAllCity">全部城市</div>
          </li>
          <li v-if="searchType == 1 && findDmList['m_dwsshydm']">
            <div class="name">行<span style="margin: 0 0.875rem;"></span>业:</div>
            <div class="sub_wrap" @click="industryClick('')">
              <span class="sub_name">不限</span>
            </div>
            <div
              class="sub_wrap"
              v-for="(item, index) in findDmList['m_dwsshydm'].slice(0, 10)"
              :key="index"
              @click="industryClick(item)"
            >
              <span class="sub_name">{{item.name}}</span>
            </div>
            <div class="other" @click="getAllTrade">其他行业</div>
          </li>
          <li v-if="searchType == 1 && findDmList['m_xzdydm']">
            <div class="name">月<span style="margin: 0 0.875rem;"></span>薪:</div>
            <div class="sub_wrap" @click="salaryClick('')">
              <span class="sub_name">不限</span>
            </div>
            <div
              class="sub_wrap"
              v-for="(item, index) in findDmList['m_xzdydm'].slice(0, 10)"
              :key="index"
              @click="salaryClick(item)"
            >
              <span class="sub_name">{{item.name}}</span>
            </div>
            <!-- <div class="other" @click="customAalary.show = !customAalary.show">自定义</div>
						<div class="sub_wrap custom" v-if="customAalary.show">
							<input type="text" v-model.trim="customAalary.start">K ~ <input type="text" v-model.trim="customAalary.end">K
							<el-button type="danger">确定</el-button>
            </div>-->
          </li>
          <li v-if="searchType == 1">
            <span class="name">其<span style="margin: 0 0.875rem;"></span>他:</span>
            <el-dropdown @command="otherCompanyCommand" size="small">
              <span class="el-dropdown-link">
                {{search.company.name||'公司性质'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" v-if="findDmList['m_dwxzdm']">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_dwxzdm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="otherScaleCommand" size="small">
              <span class="el-dropdown-link">
                {{search.scale.name||'公司规模'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" v-if="findDmList['m_dwgmdm']">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_dwgmdm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="otheReducationCommand" size="small">
              <span class="el-dropdown-link">
                {{search.reducat.name||'学历要求'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" v-if="findDmList['m_xldm']">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_xldm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="otheWorkCommand" size="small">
              <span class="el-dropdown-link">
                {{search.work.name||'工作年限'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" v-if="findDmList['m_jyyqdm']">
                <el-dropdown-item
                  :command="item"
                  v-for="(item, index) in findDmList['m_jyyqdm']"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> 
			<el-cascader :options="Joboptions" v-model="search.job.dm" :show-all-levels="false" filterable  placeholder="职位类别" style="width: 110px;" @change="getJobVal"></el-cascader>

          </li>
          <li v-if="searchType == 2">
            <div class="name">召开方式:</div>
            <div class="sub_wrap">
              <span class="sub_name" @click="onlineClick(3)">不限</span>
            </div>
            <div class="sub_wrap">
              <span class="sub_name" @click="onlineClick(1)">线上双选会</span>
            </div>
            <div class="sub_wrap">
              <span class="sub_name" @click="onlineClick(2)">线下双选会</span>
            </div>
          </li>
          <li v-if="searchType == 2 && findDmList['m_hyktdm']">
            <div class="name">会议类型:</div>
            <div class="sub_wrap" @click="meettypeClick('')">
              <span class="sub_name">不限</span>
            </div>
            <div
              class="sub_wrap"
              v-for="(item, index) in findDmList['m_hyktdm'].slice(0, 10)"
              :key="index"
              @click="meettypeClick(item)"
            >
              <span class="sub_name">{{item.name}}</span>
            </div>
          </li>
          <li v-if="searchType == 2">
            <div class="name">会议时间:</div>
            <div class="sub_wrap">
              <span class="sub_name" @click="clearInput">不限</span>
            </div>
            <div class="sub_wrap">
              <span class="sub_name">
                <el-date-picker
                  v-model.trim="search.value1"
                  size="mini"
                  type="datetimerange"
                  align="left"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions"
                  @change="chanes"
                ></el-date-picker>
              </span>
            </div>
          </li>
          <li v-if="searchType == 2">
            <div class="name">会议名称:</div>
            <div class="sub_wrap">
              <span class="sub_name" style="margin-left: 3.5625rem;">
                <el-input style="width: 25.0625rem;"
                  placeholder="请输入会议名称查询"
                  size="mini"
                  v-model="search.input"
                  @change="searchName"
                  clearable
                ></el-input>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 已选条件 -->
      <div class="alrady_select">
        <span class="name">已选条件:</span>
        <el-tag
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.city.name}}</el-tag>
        <el-tag
          v-if="searchType == 2 && search.meeting.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.meeting.name}}</el-tag>
        <el-tag
          v-if="searchType == 2 && search.meetingtype.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.meetingtype.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.trade.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.trade.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.salary.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.salary.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.company.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.company.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.scale.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.scale.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.reducat.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.reducat.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.work.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.work.name}}</el-tag>
        <el-tag
          v-if="searchType == 1 && search.job.name"
          type="danger"
          :hit="false"
          color
          size="mini"
          :disable-transitions="false"
        >{{search.job.name}}</el-tag>
        <em @click="handclearTags">重 置</em>
      </div>
      <!-- 搜索头部 -->
      <div class="search_head">
        <span
          v-if="searchType != 1 || showTab == 2"
          class="all"
          :class="{'active':tableSearch.all}"
          @click="tableSearchStart"
        >全选</span>
		<!-- 职位：求职者 -->
        <span class="btn" v-if="searchType == 1 && Jobseekers" @click="akeySigCollect(1)">一键投递</span>
        <span class="btn" v-if="searchType == 1 && Jobseekers" @click="akeySigCollect(2)">收藏职位</span>

		<!-- 双选会：求职者、hr -->
        <span v-if="searchType == 2" class="btn" @click="akeySigCollect(1)">一键报名</span>
        <span v-if="searchType == 2" class="btn" @click="akeySigCollect(2)">收藏双选会</span>

        <span class="count" >搜索结果显示：共有{{search.totalCount}}条</span>
        <!-- <span class="count" v-if="searchType == 2">搜索结果显示：共有{{search.totalCount}}条</span> -->

        <div class="hright">
          <span class="r1" v-if="searchType == 1">
            显示方式：
            <i class="i1" :class="showTab == 1 ?'active':''" @click="showTab = 1"></i>
            <i class="i2" :class="showTab == 2 ?'active':''" @click="showTab = 2"></i>
          </span>
          <span class="r3" v-if="search.pxfs == ''" @click="pxClick(2)">
            发布时间
            <i class="el-icon-d-caret"></i>
          </span>
          <span class="r3" v-if="search.pxfs == 2" @click="pxClick(1)">
            发布时间
            <i class="el-icon-sort-up"></i>
          </span>
          <span class="r3" v-if="search.pxfs == 1" @click="pxClick(2)">
            发布时间
            <i class="el-icon-sort-down"></i>
          </span>
        </div>
      </div>
      <!-- 搜索内容 -->
      <div class="list">
        <!-- 公司\职位检索 -->
        <div v-if="searchType == 1">
          <div class="list3" v-if="showTab == 1">
            <div class="table">
              <el-table  ref="multipleTable"
                :data="search.companyPostArr"
                @selection-change="handleSelectionChange"
				@row-click="handleRowClick"
                style="width: 100%" >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="职位名" align="center" width="200">
                  <template slot-scope="scope">
                    <p>
                      <router-link class="alink"  target="_blank" :to="{path:'/public/postDetail',query:{postId: scope.row.gwid, companyId: scope.row.dwid}}">{{ scope.row.gwmc }}</router-link>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column label="公司名称" align="center" class-name="compy" width="300">
                  <template slot-scope="scope">
                    <p>
                      <router-link class="alink"  target="_blank" :to="{path:'/public/enterDetail',query:{dwid: scope.row.dwid}}">{{ scope.row.dwmc }}</router-link>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column label="工作地点" align="center">
                  <template slot-scope="scope">
                    <p v-if="scope.row.sbcs">{{CityMap[scope.row.sbsf][scope.row.sbcs]}}</p>
                    <p v-else-if="scope.row.sbxxdz">{{scope.row.sbxxdz}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="薪资" align="center">
                  <template slot-scope="scope">
                    <p >{{ findDmMap.m_xzdydm[scope.row.gwyx] ? findDmMap.m_xzdydm[scope.row.gwyx]:'面议' }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="发布日期" align="center">
                  <template slot-scope="scope">
                    <p>{{ scope.row.gwfbsj }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click.stop="setSend(scope.row)"
                    >投递简历</el-button>
                  </template>
                </el-table-column>
              </el-table>
				<el-pagination
					v-if="search.totalCount>27"
					@current-change="SearchCompanyChange"
					:page-size="search.pageSize"
					:current-page="search.currentPage"
					layout="prev, pager, next, jumper"
					:total="search.totalCount"
				></el-pagination>
            </div>
          </div>
          <div class="list1" v-if="showTab == 2">
            <ul>
				<li v-if="search.totalCount==0" class="nullArr">
					<h3>当前搜索条件未找到相应数据</h3>
				</li>
              <li class="active" v-for="(item, index) in search.companyPostArr" :key="index"  @click="companyClick(item, index)">
				<div class="wrap-float-top-left" v-show="item.starts">
					<span>
						<i class="el-icon-check" ></i>
					</span>
				</div>
                <!-- <em class="select"></em> -->
                <div class="list_con">
                  <div class="list_left">
                    <p class="name">
                      <router-link class="alink"  target="_blank" :to="{path:'/public/postDetail',query:{postId: item.gwid, companyId: item.dwid}}">{{ item.gwmc }}</router-link>
                    </p>
                    <p class="info">
                      <span class="f1" v-if="item.gwyx">{{ findDmMap.m_xzdydm[item.gwyx] }}</span>
                      <span class="f2" v-if="item.sbsf">{{ProvinceMap[item.sbsf]}}｜{{findDmMap.m_jyyqdm[item.jyyq]}}｜{{findDmMap.m_xldm[item.xlyq]}}</span>
                      <span class="btn_sp gray" @click="setOnceTalk(item)">立即沟通</span>
						<el-button
							size="mini"
							type="danger"
							class="xk-deliver"
							@click.stop="setSend(item)"
							>投递简历
						</el-button>
                    </p>
                  </div>
                  <div class="list_right">
                    <div class="enter_title">
                      <h4 class="t1">
						<router-link class="alink" :to="{path:'/public/enterDetail',query:{dwid: item.dwid}}">{{ item.dwmc }}</router-link>
                      </h4>
                      <span class="t2" v-if="item.dwsshy">{{ findDmMap.m_dwsshydm[item.dwsshy] }}｜{{ findDmMap.m_dwgmdm[item.dwgm] }}</span>
                    </div>
                    <div class="enter_logo">
                      <img class="t3" v-if="item.dwid && company.info[item.dwid]" :src="company.info[item.dwid]" /> 
						<img class="t3" v-else src="../../assets/images/common/enterDetail.png" alt />
                    </div>
                  </div>
                </div>
                <div class="list_tip">
                  <div class="list_tip1" v-if="item.gwfl">
                    <span v-for="(itemSub,index) in item.gwfl" :key="index">{{findDmMap.m_gwfldm[itemSub]}}</span>
                  </div>
                  <div class="list_tip2">
                    <i></i>{{ item.gwfbsj }}发布
                  </div>
                </div>
              </li>
            </ul>
			<el-pagination
				v-if="search.totalCount>27"
				@current-change="SearchCompanyChange"
				:page-size="search.pageSize"
				:current-page="search.currentPage"
				layout="prev, pager, next"
				:total="search.totalCount"
			></el-pagination>
          </div>
        </div>
        <!-- 双选会 -->
        <div class="list2" v-if="searchType == 2">
          <ul>
            <li v-if="search.totalCount==0" class="nullArr">
              <h3>当前搜索条件未找到相应数据</h3>
            </li>
            <li v-for="(item, index) in search.SxhselectionArr" :key="index">
              <div class="wrap-float-top-left" v-if="item.starts"  @click="SxhClick(item, index)">
                <span>
                  <i class="el-icon-check"></i>
                </span>
              </div>
              <div class="wrap-float-top" v-if="item.hxid" @click="collectObj(item.hxid)">
                <img src="../../assets/images/common/star-off.png" alt />
              </div>
              <h1 v-text="item.hymc"></h1>
              <p class="con" v-if="!item.hydd">开始时间：{{item.hykssj}}</p>
              <p class="con" v-if="!item.hydd">结束时间：{{item.hyjssj}}</p>
              <p class="con" v-if="item.hydd">会议时间：{{item.hykssj}} 至 {{item.hyjssj}}</p>
              <p class="con" v-if="item.hylx">会议类型：{{findDmMap['m_hyktdm'][item.hylx]}}</p>
              <p class="con" v-if="item.hydd">会议地点：{{item.hydd}}</p>
              <div class="btn" v-if="item.ifks">
                <el-button type="danger" v-if="item.ifks==1" @click="tosignup(item)">立即报名</el-button>
                <el-button type="danger" v-if="item.ifks==2">已开始</el-button>
                <el-button type="danger" v-if="item.ifks==3">已结束</el-button>
                <el-button
                  type="danger"
                  @click="getCurrentPageOnlineVenue(item.hxid, item.ifks)"
                >{{item.ifks==1?'即将开始':'进入会场'}}</el-button>
              </div>
            </li>
          </ul>
          <el-pagination
            v-if="search.totalCount>27"
            @current-change="SearchsxhecurChange"
            :page-size="search.pageSize"
            :current-page="search.currentPage"
            layout="prev, pager, next"
            :total="search.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <Foot />

    <!-- 城市弹出框 -->
    <!-- <city
      :venue-dialog-visible="search.city.dialog"
      :level="2"
      @change="changeCity"
      @close="closeCity"
    ></city> -->
	<el-dialog
		:visible.sync="search.city.dialog"
		width="700px"
		:lock-scroll="true"
		:show-close="true"
		:modal="false">
		<div class="dialog__body-wrap">
			<div class="dialog_info">
				<div class="d_right">
					<ul>
						<li style="display: inline-block;  margin-right: 20px; line-height: 30px; cursor: default; font-size: 14px; width: 153px;"
							v-for="(item,index) in ProvinceList" :key="index" 
							@click="changeCity(item, index)">
							{{item.name}}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<span slot="title" class="dialog-header">
			<div>请选择省份</div>
		</span>
	</el-dialog>

    <!-- 行业弹出框 -->
    <trade :venue-dialog-visible="search.trade.dialog" @change="changeTrade" @close="closeTrade"></trade>

	<!-- 简历弹出框 -->
	<el-dialog
		:visible.sync="resume.dialog"
		width="40%" top="30vh"
		:lock-scroll="true"
		:show-close="true"
		:modal="false">
		<div class="dialog__body-wrap">
			<div class="dialog_info">	
			<div style="height:200px;">	
				<el-table
					:data="resume.list"
					empty-text="您暂无简历可以投递，请到简历页面上传附件简历后再投递" 
					style="width: 100%" class="resume_dialog"> 
					<el-table-column label="" width="45">
						<template scope="scope">
							<el-radio :label="scope.row.wjid" v-model="resume.fjjlid" @change.native="getTemplateRow(scope.row)">&nbsp;</el-radio> 
						</template>
					</el-table-column> 
					<el-table-column label="简历名称" >
					<template slot-scope="scope">
						<p>
							{{scope.$index + 1}}、{{scope.row.wjmc}}
						</p>
					</template>
					</el-table-column>
				</el-table> 
			</div>		
				<div class="text-align" style="padding-top:10px; text-align:center" v-if="resume.list.length > 0">
					<el-button type="danger" @click="resumeConfim">确定</el-button>
					<el-button type="danger" plain @click="resume.dialog = false">取消</el-button>
				</div>
			</div>
		</div>
		<span slot="title" class="dialog-header">
			<div>选择投递简历</div>
		</span>
	</el-dialog> 
  </div>
</template>

<script>
	import Head from "../Head.vue"
	import Foot from "../Foot.vue"
	// import City from "../common/City.vue"
	import Trade from "../common/Trade.vue"
	import { mapState, mapGetters } from "vuex"
	import Moment from "../common/moment.js";
	export default {
		name: "Jobretrieve",
		components: {
			Head, Foot, Trade, 
		},
		computed: {
			...mapGetters({
				token: 'getToken',
				userId: 'getuserId',
				roleId: 'getroleId',
				Jobseekers: 'getJobseekers',
				HR: 'getHR',
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				findDmList: state => state.findDmList,
				ProvinceList: state => state.ProvinceList,
				ProvinceMap: state => state.ProvinceMap,
				CityList: state => state.CityList,
                CityMap: state => state.CityMap,
                AreaList: state => state.AreaList,
                AreaMap: state => state.AreaMap,
				JobCategoryFirstList: state => state.JobCategoryFirstList,
				JobCategorySecondList: state => state.JobCategorySecondList,
				JobCategoryThirdList: state => state.JobCategoryThirdList,
				JobCategoryFirstMap: state => state.JobCategoryFirstMap, 
                JobCategorySecondMap: state => state.JobCategorySecondMap, 
                JobCategoryThirdMap: state => state.JobCategoryThirdMap,
			}),
			Joboptions() {
				return this.getJobList();
			}
		},
		data() {
			return {
				// 简历
				resume:{
					row:{},
					dialog: false,
					list:[],
					fjjlid:'',
					newfjjlid:''
				},
				// 默认搜索类型
				searchType:1,
				showTab:1,
				// 表格搜索
				tableSearch:{
					tableS: false,
					all:false
				},
				// 城市，行业，月薪，其他搜索
				search:{
					SxhselectionArr: [],
					companyPostArr:[],
					pageSize: 27,
					currentPage: 1,
					totalCount: 0,
					city:{ dialog:false, dm:'', name:'全国',index: -1 },
					trade:{ dialog:false, dm:'', name:'' },
					salary: { dm: '', name: '' },
					meeting: { dm: '', name: '' },
					meetingtype: { dm : '', name: '' },
					company:{ dm:'', name:'' },
					scale:{ dm:'', name:'' },
					reducat:{ dm:'', name:'' },
					work:{ dm:'', name:'' },
					job:{ dm:'', name:'' },
					kssj: '',
					jssj: '',
					meetName: '',
					pxfs: '',
					onlineVal: 1,
					value1: [],
					input: '',
					inputs: '',
					searchInput: ''
				}, 
				// 自定义薪资
				customAalary:{
					show:false,
					start:'',
					end:''
				},
				count: 0,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				// 简历附件id
				fjjlid:'',
				// 单位信息
				company:{
					// 单位id列表
					dwids:[],
					info:{}
				}
			};
		},
		mounted(){
			
		},
		methods: {
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
			// 城市
			cityClick(city) {
				console.log(city)
				if (city) {
					this.search.city = { dialog:false, dm: city.dm, name: city.name };
					if (this.searchType == 1) {
						console.log(this.searchType)
						// ****************************
						this.search.currentPage = 1;
						this.companyPostSearch();	
					} else if (this.searchType == 2) {
						this.search.currentPage = 1;
						this.conditionSearch(city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs);
					}
				} else {
					this.search.city = { dialog:false, dm:'', name:'全国' };
					if (this.searchType == 1) {
						console.log(this.searchType)
						// **************************** 
						this.search.currentPage = 1;
						this.companyPostSearch();	
					} else if (this.searchType == 2) {
						this.search.currentPage = 1;
						this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs);
					}
				}				
			},
			// 行业
			industryClick(industry) { 
				if (industry) {
					this.search.trade = { dialog:false, dm: industry.dm, name: industry.name };
				} else {
					this.search.trade = { dialog:false, dm:'', name:'行业不限' };
				}		
				// ****************************
				this.search.currentPage = 1;
				this.companyPostSearch();		
			},
			// 月薪
			salaryClick (salary) {
				if (salary) {
					this.search.salary = { dm: salary.dm, name: salary.name };
				} else {
					this.search.salary = { dm:'', name:'月薪不限' };
				}
				// ****************************
				this.search.currentPage = 1;
				this.companyPostSearch();
			},
			// 召开方式
			onlineClick(val) {
				if (val == 1) {
					this.search.meeting.name = '线上双选会';
				} else if (val == 2) {
					this.search.meeting.name = '线下双选会';
				} else {
					this.search.meeting.name = '召开方式不限';
				}
				this.search.onlineVal = val;
				this.search.currentPage = 1;
				this.conditionSearch(this.search.city.dm, val, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs)
			},
			// 会议类型
			meettypeClick(meettype) {
				console.log(meettype)
				if (meettype) {
					this.search.meetingtype = { dm: meettype.dm, name: meettype.name };
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, meettype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs)
				} else {
					this.search.meetingtype = { dm:'', name:'会议类型不限' };
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs)
				}				
			},
			// 会议时间
			chanes() {
				var value = this.search.value1;
				if (value) {
					var data1 = Moment.formatDate2(value[0]);
					var data2 = Moment.formatDate2(value[1]);
					console.log(data1, data2);
					this.search.kssj = data1;
					this.search.jssj = data2;
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, data1, data2, this.search.meetName, this.search.pxfs)
				}
			},
			// 不限
			clearInput() {
				this.search.value1 = '';
				this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs)
			},
			// 重 置
			handclearTags() { 
				this.search = {
					SxhselectionArr: [],
					companyPostArr:[],
					pageSize: 27,
					currentPage: 1,
					totalCount: 0,
					city:{ dialog:false, dm:'', name:'全国' },
					trade:{ dialog:false, dm:'', name:'' },
					salary: { dm: '', name: '' },
					meeting: { dm: '', name: '' },
					meetingtype: { dm : '', name: '' },
					company:{ dm:'', name:'' },
					scale:{ dm:'', name:'' },
					reducat:{ dm:'', name:'' },
					work:{ dm:'', name:'' },
					job:{ dm:'', name:'' },
					kssj: '',
					jssj: '',
					meetName: '',
					pxfs: '',
					onlineVal: 1,
					value1: [],
					input: '',
				};
				if (this.searchType == 1) {
					this.search.currentPage = 1;
					this.companyPostSearch();
					// ****************************
				} else if (this.searchType == 2) {
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs)
				}
			},
			// 会议名称查询
			searchName(value) {
				if (this.searchType == 1) {
					console.log(this.searchType)
				} else if (this.searchType == 2) {
					this.search.meetName = value;
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, value, this.search.pxfs)
				}
				
			},
			// 发布时间
			pxClick(fs) {
				if (this.searchType == 1) {
					this.search.pxfs = fs;
					this.search.currentPage = 1;
					this.companyPostSearch()
					// ****************************
				} else if (this.searchType == 2) {
					this.search.pxfs = fs;
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, fs)
				}
				
			},
			// 立即报名
			tosignup(item) {
				var that = this;
				var itemIdArr = [];
				if (that.token) {
					if (that.Jobseekers) {
						itemIdArr.push(item.hxid)
						that.JobseekersSignup(itemIdArr)
					}
					if (that.HR) {
						itemIdArr.push(item.hxid)
						that.hrSignup(itemIdArr);
					}
				} else {
					that.$confirm('未登录，请您登录后，进行报名。', '登录状态', {
						confirmButtonText: '去登录',
						cancelButtonText: '取 消',
						type: 'warning'
					}).then(() => {
						this.$router.push({
							path: "/public/login"
						});
					})
				}
			
			},
			// 双选会选择
			SxhClick(item, index) {
				console.log(item, index);
				this.search.SxhselectionArr[index].starts = !item.starts;
			},
			// 全选
			tableSearchStart() {
				if (this.searchType == 1) {
					if (this.tableSearch.tableS==false) {
						this.tableSearch.tableS = true;
						this.tableSearch.all = true;
						this.search.companyPostArr.map(item => {
							item.starts = true;
							return item;
						})
					} else {
						this.tableSearch.tableS = false;
						this.tableSearch.all = false;
						this.search.companyPostArr.map(item => { 
							item.starts = false;
							return item; 
						})
					} 
				} else if (this.searchType == 2) {
					if (this.tableSearch.tableS==false) {
						this.tableSearch.tableS = true;
						this.tableSearch.all = true;
						this.search.SxhselectionArr.map(item => {
							if (item.ifks == 1) {
								item.starts = true;
								return item;
							}
						})
					} else {
						this.tableSearch.tableS = false;
						this.tableSearch.all = false;
						this.search.SxhselectionArr.map(item => {
							if (item.ifks == 1) {
								item.starts = false;
								return item;
							}
						})
					} 
				}
			},
			//一键报名+收藏   ||  一键投递、收藏职位
			akeySigCollect(stat) { 
				var that = this;
				var hxidArr = [];
				if (stat == 1) {
					// 一键投递
					if (that.searchType == 1) {
						that.search.companyPostArr.map(item => {
							var obj = {
								dwid:'',
								gwid:'',
								// fjjlid:'',
								channel:''
							};
							if (item.starts) {
								obj = {
									dwid: item.dwid,
									gwid: item.gwid,
									channel:2
								}
								return hxidArr.push(obj)
							}
						})
						if (that.token) {
							if (that.Jobseekers) {
								that.PostJobseekersSignup(hxidArr)
							}
						} else {
							that.$confirm('未登录，请您登录后，进行报名。', '登录状态', {
								confirmButtonText: '去登录',
								cancelButtonText: '取 消',
								type: 'warning'
							}).then(() => {
								this.$router.push({
									path: "/public/login"
								});
							})
						}
						// ****************************
					} else if (that.searchType == 2) {
						that.search.SxhselectionArr.map(item => {
							var hxid = '';
							if (item.starts) {
								hxid = item.hxid;
								return hxidArr.push(hxid)
							}
						})
						console.log(hxidArr);
						if (that.token) {
							if (that.Jobseekers) {
								that.JobseekersSignup(hxidArr)
							}
							if (that.HR) {
								that.hrSignup(hxidArr)
							}
						} else {
							that.$confirm('未登录，请您登录后，进行报名。', '登录状态', {
								confirmButtonText: '去登录',
								cancelButtonText: '取 消',
								type: 'warning'
							}).then(() => {
								this.$router.push({
									path: "/public/login"
								});
							})
						}
					}
				} else {
					// 收藏
					if (that.searchType == 1) {
						if (that.token) {
							if (that.Jobseekers) {
								that.search.companyPostArr.map(item => {
									var obj = {
										dwid:'',
										gwid:'',
										qdid:2
									};
									if (item.starts) {
										obj = {
											dwid: item.dwid,
											gwid: item.gwid,
											qdid:2
										}
										return hxidArr.push(obj)
									}
								})
								that.PostJobseekersCollect(hxidArr)
							}
						} else {
							that.$confirm('未登录，请您登录后，进行收藏。', '登录状态', {
								confirmButtonText: '去登录',
								cancelButtonText: '取 消',
								type: 'warning'
							}).then(() => {
								this.$router.push({
									path: "/public/login"
								});
							})
						}
						// ****************************
					} else if (that.searchType == 2) {
						that.search.SxhselectionArr.map(item => {
							var hxid = '';
							if (item.starts) {
								hxid = item.hxid;
								return hxidArr.push(hxid)
							}
							
						})
						console.log(hxidArr);
						if (that.token) {
							if (that.Jobseekers) {
								that.JobseekersCollect(hxidArr)
							}
							if (that.HR) {
								that.hrCollect(hxidArr)
							}
						} else {
							that.$confirm('未登录，请您登录后，进行收藏。', '登录状态', {
								confirmButtonText: '去登录',
								cancelButtonText: '取 消',
								type: 'warning'
							}).then(() => {
								this.$router.push({
									path: "/public/login"
								});
							})
						}
					}
				}
			},
			//双选会-求职报名
			JobseekersSignup(hxid) {	
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/bsrcbmxx/hxBmMore',
					data: hxid,
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '报名成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//双选会-HR报名
			hrSignup(hxid) {	
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/hr/bsdwbmxx/addBmhxxMore',
					data: hxid,
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '报名成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//双选会-求职收藏
			JobseekersCollect(hxid) {	
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/jobFairFavorite/favoriteMore',
					data: hxid,
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '收藏成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//双选会-HR收藏
			hrCollect(hxid) {	
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/hr/jobFairFavorite/favoriteMore',
					data: hxid,
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '收藏成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 双选会-收藏
			collectObj(hxid) {
				var that = this;
				var itemIdArr = [];
				if (that.token) {
					if (that.Jobseekers) {
						itemIdArr.push(hxid)
						that.JobseekersCollect(itemIdArr)
					}
					if (that.HR) {
						itemIdArr.push(hxid)
						that.hrCollect(itemIdArr)
					}
				} else {
					that.$confirm('未登录，请您登录后，进行收藏。', '登录状态', {
						confirmButtonText: '去登录',
						cancelButtonText: '取 消',
						type: 'warning'
					}).then(() => {
						this.$router.push({
							path: "/public/login"
						});
					})
				}
				
			},
			// 双选会-
			cancleObj(hxid) {
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/jobFairFavorite/Unfavorite',
					data: '',
					params: {
						hxid: hxid
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '已取消收藏',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 双选会-进入会场|即将开始
			getCurrentPageOnlineVenue(hxid, ifks) {
				this.$router.push({
					path: "/public/meetinghall",
					query: {
						hxid: hxid,
						ifks: ifks
					}
				});
			},
			// 双选会列表
			conditionSearch(hycs, sfxs, hylx, kssj, jssj, hymc, pxfs) {
				var that = this;
				that.tableSearch.all = false;
				that.axios({
					method: 'post',
					url: '/api/xs/business/hxxx/queryHxListJs',
					data: '',
					params: {
						hysf: hycs,
						sfxs: sfxs,
						hylx: hylx,
						kssj: kssj,
						jssj: jssj,
						hymc: hymc,
						pxfs: pxfs,
						userId: that.userId,
						roleId: that.roleId,
						limit: that.search.pageSize,
						page: that.search.currentPage,
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					// console.log('conditionSearch:', response);
					if (response && response.data && response.data.code == 0) {
						that.search.totalCount = response.data.page.totalCount;
						var data = response.data.page.list;
						var tdate = Moment.moment1();
						if (hymc) { that.search.inputs = hymc; } 
						that.search.SxhselectionArr = data.map((item, index) => {
							if (tdate < Moment.moment2(item.hykssj)) {
								item.ifks = 1;
								item.starts = false;
								return item;
							} else if (
								Moment.moment2(item.hykssj) < tdate &&
								tdate < Moment.moment2(item.hyjssj)
							) {
								item.ifks = 2;
								item.starts = false;
								return item;
							} else if (Moment.moment2(item.hyjssj) < tdate) {
								item.ifks = 3;
								item.starts = false;
								return item;
							}
							that.count = index;
							return item;
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 双选会-分页
			SearchsxhecurChange(currentPage) {
				console.log(currentPage)
				this.search.currentPage = currentPage;
				this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs)
			},
			// 打开城市弹出框
			getAllCity(){
				this.search.city.dialog = true;
			},
			// 关闭城市弹出框
			closeCity(){
				this.search.city.dialog = false;
			},
			// 获取城市选择值
			changeCity(obj, index){
				this.search.city.index = index;
				this.search.city.dm = obj.dm;
				this.search.city.name = obj.name;
				if (obj) {
					this.search.city = { dialog:false, dm: obj.dm, name: obj.name };
					if (this.searchType == 1) {
						this.search.currentPage = 1;
						this.search.city.dm = obj.dm;
						this.companyPostSearch();
						// ****************************
					} else if (this.searchType == 2) {
						this.search.currentPage = 1;
						this.conditionSearch(obj.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs);
					}
				} else {
					this.search.city = { dialog:false, dm:'', name:'全国' };
					if (this.searchType == 1) {
						this.search.currentPage = 1;
						this.companyPostSearch();
						// ****************************
					} else if (this.searchType == 2) {
						this.search.currentPage = 1;
						this.conditionSearch(obj.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs);
					}
				}
				this.search.city.dialog = false;
			},
			// 打开行业弹出框
			getAllTrade(){
				this.search.trade.dialog = true;
			},
			// 关闭行业弹出框
			closeTrade(){
				this.search.trade.dialog = false;
			},
			// 获取行业选择值
			changeTrade(obj){
				this.search.trade = obj;
				this.search.trade.dialog = false;
				this.companyPostSearch()
			},
			// 获取头部搜索类型
			getSearchType(val){
				this.searchType = val;
				this.search.searchInput = '';
				this.handclearTags();
			},
			// 头部搜索
			searchVal(val) {
				this.search.searchInput = val;
				if (this.searchType == 1) {
					this.search.currentPage = 1;
					this.companyPostSearch();
					// ****************************
				} else if (this.searchType == 2) {
					this.search.currentPage = 1;
					this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, val, this.search.pxfs)
				} 
			},
			// 公司性质
			otherCompanyCommand(val){
				this.search.company = val;
				this.companyPostSearch()
			},
			// 公司规模
			otherScaleCommand(val){
				this.search.scale = val;
				this.companyPostSearch()
			},
			// 学历要求
			otheReducationCommand(val){
				this.search.reducat = val;
				this.companyPostSearch()
			},
			// 工作年限
			otheWorkCommand(val){
				this.search.work = val;
				this.companyPostSearch()
			},
			// 职位类别
			otheJobCommand(val){
				this.search.job = val;
				this.companyPostSearch()
			},
			// 职位类别new
			getJobVal(val){
				this.search.job.dm = val[2]
				this.search.job.name = this.JobCategoryThirdMap[val[1]][val[2]]
				this.companyPostSearch()
			},
			// 公司职位-列表 key, sbcs, sshy, gwyx, dwxz, dwgm, xlyq, jyyq, gwlb, orderField
			companyPostSearch() { 
				var that = this;
				that.tableSearch.all = false;
				that.axios({
					method: 'post',
					url: '/api/xs/app/search/gwpc',
					data: '', 
					params: {
						key: this.search.searchInput, //模糊搜索 岗位的名称和公司的名称
						sbsf: this.search.city.dm, //城市 
						sshy: this.search.trade.dm, //行业
						gwyx: this.search.salary.dm, //月薪
						dwxz: this.search.company.dm, //单位性质
						dwgm: this.search.scale.dm, //单位规模 
						xlyq: this.search.reducat.dm, //学历要求
						jyyq: this.search.work.dm, //工作年限
						gwlb: this.search.job.dm, //岗位类别
						orderField: this.search.pxfs, //时间排序，desc,asc
						limit: that.search.pageSize,
						page: that.search.currentPage,
					},
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then((response)=> {
					if (response && response.data && response.data.code == 0) {  
						that.search.totalCount = response.data.page.totalCount; 
						let list = response.data.page.list;
						that.search.companyPostArr = list;
						list.forEach(element => {
							if(this.company.dwids.indexOf(element.dwid) < 0){
								this.company.dwids.push(element.dwid)
							}
						});
						// console.log(this.company.dwids)
						this.getDwLogos();
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 批量获取单位logo
			getDwLogos(){
				this.axios({
					method: 'post',
					url: '/api/hr/qydwhrxx/getDwLogos',
					data: this.company.dwids,
					params: {
					},
					headers: {
						"content-type": "application/json",
						'token': this.token
					}
				}).then((res)=> {
					if (res && res.data && res.data.code == 0) {
						this.company.info = res.data.urls;
					}
				})
			},
			// 公司职位-分页
			SearchCompanyChange(currentPage) {
				this.search.currentPage = currentPage;
				this.companyPostSearch()
			},
			// 公司\职位检索:全选
			handleSelectionChange(val) { 
				if(val.length == 0){  
					this.search.companyPostArr.forEach(item => {
						item.starts = false; 						
					});  
				} else { 
					let arr = [];
					val.forEach(element => {
						arr.push(element.bsid)
					}); 
					this.search.companyPostArr.forEach(item => {
						if(arr.indexOf(item.bsid) >= 0){
							item.starts = true;
						}
					});  
				}
			},
			// 公司\职位检索:单行选择
			handleRowClick(row){
				this.$refs.multipleTable.toggleRowSelection(row); 
			},
			// 公司职位-单个投递简历
			setSend(row){ 
				// console.log(row)
				var that = this;
				if (that.token) {
					if (that.Jobseekers) {
						this.getResumeList();
						if(this.resume.list.length == 0){
							this.resume.fjjlid = ''
						} else {
							if(!this.resume.fjjlid){
								this.resume.row = row;
								this.resume.dialog = true;
								return
							}
						}
						that.axios({
							method: 'post',
							url: '/api/qz/qyhxrxx/td',
							data: {
								dwid: row.dwid,
								gwid: row.gwid,
								fjjlid: this.resume.fjjlid,
								channel: 2
							},
							params: '',
							headers: {
								"content-type": "application/json",
								'token': that.token
							}
						}).then(function(response) {
							if (response && response.data && response.data.code == 0) {
								that.$message({
									type: 'success',
									message: '投递成功',
									offset: 400
								});
							} else {
								that.$message({
									message: response.data.msg,
									offset: 400
								});
							}
							that.resume.dialog = false;
						}).catch(function(error) {
							console.log(error);
						});
					}
				} else {
					that.$confirm('未登录，请您登录后，进行报名。', '登录状态', {
						confirmButtonText: '去登录',
						cancelButtonText: '取 消',
						type: 'warning'
					}).then(() => {
						this.$router.push({
							path: "/public/login"
						});
					})
				}
				
			},
			// 公司职位-立即沟通
			setOnceTalk(item){
				let url =
					"/im/layim.html?&fUserToken=" + this.token + "&roleId=" + this.roleId;
				if (this.token) {
					window.open(url);
				} else {
					this.$message({
					type: "success",
					message: "请先登录再聊天",
					offset: 400
					});
				}
			},
			//公司职位-一键投递
			PostJobseekersSignup(comArr) {
				if(comArr.length == 0){
					this.$message({
						type: 'warning',
						message: '请至少选择一条数据',
						offset: 400
					});
					return
				}
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qyhxrxx/pltd',
					data: comArr,
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '投递成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
					that.resume.dialog = false;
				}).catch(function(error) {
					console.log(error);
				});
			},
			//公司职位-收藏职位
			PostJobseekersCollect(comArr) {	
				if(comArr.length == 0){
					this.$message({
						type: 'warning',
						message: '请至少选择一条数据',
						offset: 400
					});
					return
				}
				var that = this;
				that.axios({
					method: 'post',
					url: '/api/qz/qzgwsc/plsc',
					data: comArr,
					params: '',
					headers: {
						"content-type": "application/json",
						'token': that.token
					}
				}).then(function(response) {
					if (response && response.data && response.data.code == 0) {
						that.$message({
							type: 'success',
							message: '收藏成功',
							offset: 400
						});
					} else {
						that.$message({
							message: response.data.msg,
							offset: 400
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 公司职位-选择
			companyClick(item, index) {
				this.search.companyPostArr[index].starts = !item.starts;
				this.$forceUpdate()
			},
			// 获取简历列表
			getResumeList(){
				if(!this.token){
					return
				}
				this.axios.get("/api/qz/qzFile/list", {
					params: {
						fileType:10 //文件类型：30是电子简历、20是头像、10简历附件
					}, 
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.resume.list = res.data.fileList
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			// 简历列表选择
			getTemplateRow(row){ 
				this.resume.newfjjlid = row.wjid;
			},
			// 简历取消
			resumeClose(){
				this.resume.newfjjlid = '';
				this.resume.dialog = false;
			},
			// 简历确定
			resumeConfim(){
				if(!this.resume.newfjjlid){
					this.$message({
						message: '请选择一个简历',
						type: 'warning',
						offset: 400
					});
					return
				}
				this.resume.fjjlid = this.resume.newfjjlid; 
				this.setSend(this.resume.row)
			}
		},
		created() {
			var path = this.$route;
			if (path.query.val) {
				this.searchType = path.query.val;
			}
			if (path.query.pid) {
				this.search.job.dm = path.query.pid;
				this.search.job.name = decodeURIComponent(path.query.pname);
			}
			
			this.search.onlineVal = path.query.venue;
			if (path.query.venue == 1) {
				this.search.meeting.name = '线上双选会';
			} else if (path.query.venue == 2) {
				this.search.meeting.name = '线下双选会';
			}
			if(this.searchType == 2){
				this.conditionSearch(this.search.city.dm, this.search.onlineVal, this.search.meetingtype.dm, this.search.kssj, this.search.jssj, this.search.meetName, this.search.pxfs);
			} else if (this.searchType == 1){
				this.companyPostSearch();
				this.getResumeList();
			} 
		},
	};
</script>

<style scoped>
/deep/.el-table__empty-text { 
    width: 100%;
}
/deep/.el-cascader .el-input .el-input__inner { 
    border: 0;
}
/deep/.el-cascader .el-input .el-input__inner::placeholder { 
    color: #606266;
}
/deep/.resume_dialog .el-radio__label{
	display: none;
}
.Jobretrieve {
  width: 100%;
  margin-top: 7.5rem;
  padding-top: 1.2rem;
  overflow: hidden;
}
.Jobretrieve .JobretrieveBody {
  width: 75rem;
  margin: 0 auto;
}
.search {
  padding: 20px;
  background: #fff;
  font-size: 14px;
  color: #303133;
}
.search ul li {
  padding: 5px 0;
  cursor: default;
}
.search ul li .name {
  display: inline-block;
  width: 60px;
  
}
.search ul li .other {
  display: inline-block;
}
.search ul li .sub_wrap {
  display: inline-block;
  height: 1.25rem;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.search ul li .sub_wrap .sub_con {
  position: absolute;
  width: 200px;
  top: 18px;
  left: 0;
  background: #fff;
  padding: 5px 24px;
  line-height: 30px;
  color: #606266;
  box-shadow: 0 0.3125rem 0.625rem #d8d8d8;
  z-index: 10;
  display: none;
}
.search ul li .sub_wrap .sub_con dd:hover {
  color: #fc5e5b;
}
.search ul li .sub_wrap .sub_name {
  padding: 5px 15px;
}
.search ul li .sub_wrap:hover {
  color: #fc5e5b;
}
.search ul li .sub_wrap.sub_dropdown:hover {
  color: #606266;
  background: #fff;
  box-shadow: 0 0.3125rem 0.625rem #d8d8d8;
}
.search ul li .sub_wrap.sub_dropdown:hover .sub_con {
  display: block;
}

.search ul li .other {
  color: #fc5e5b;
  cursor: pointer;
}

.alrady_select {
  font-size: 14px;
  padding: 15px 19px;
  background: #fff;
  color: #fc5e5b;
  margin-top: 15px;
  position: relative;
}
.alrady_select .name {
  color: #303133;
}
.alrady_select span {
  margin-right: 20px;
  cursor: default;
}
.alrady_select i {
  display: inline-block;
  padding: 0 4px;
  font-size: 15px;
}
.alrady_select em {
  font-style: normal;
  color: #909399;
  cursor: pointer;
  position: absolute;
  right: 20px;
}

.search_head {
  padding: 20px 0;
  font-size: 12px;
  position: relative;
}
.search_head .all {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  display: inline-block;
  padding: 0 20px;
  line-height: 30px;
  cursor: pointer;
  background: url("../../assets/images/search/Icon-success1.png") 0 center
    no-repeat;
}
.search_head .all.active {
  cursor: pointer;
  background: url("../../assets/images/search/Icon-success.png") 0 center
    no-repeat;
}
.search_head .btn {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  /* width: 63px; */
  padding: 0 0.625rem;
  background: #fc5e5b;
  border-radius: 2px;
  background-color: #fc5e5b;
  margin-right: 15px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.search_head .count {
  font-size: 12px;
  color: #909399;
  padding-left: 24px;
}
.search_head .hright {
  position: absolute;
  right: 0;
  display: inline-block;
  font-size: 14px;
  color: #606266;
  line-height: 30px;
}
.search_head .hright span {
  margin-left: 15px;
}
.search_head .hright .r1 i {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  vertical-align: middle;
}
.search_head .hright .r1 i.i1 {
  background: url("../../assets/images/search/show11.png") right center
    no-repeat;
}
.search_head .hright .r1 i.i1.active {
  background: url("../../assets/images/search/show1.png") right center no-repeat;
}
.search_head .hright .r1 i.i2 {
  background: url("../../assets/images/search/show2.png") right center no-repeat;
}
.search_head .hright .r1 i.i2.active {
  background: url("../../assets/images/search/show22.png") right center
    no-repeat;
}
.search_head .hright .r2 {
  margin-left: 15px;
}
.search_head .hright .r3 {
  cursor: pointer;
}

.list1 {
  font-size: 14px;
  color: #909399;
}
.list1 li {
  padding: 20px;
  background: #fff;
  margin-bottom: 10px;
  position: relative;
  overflow: auto;
}
.list1 .list_con {
  border-bottom: 1px solid #e6e6e6;
  overflow: auto;
  padding-bottom: 7px;
}
.list1 .list_con .xk-deliver{
	margin-left: 20px;
}
.list1 .list_left {
  float: left;
}
.list1 .list_left .name {
  color: #303133;
  padding-bottom: 15px;
}
.list1 .list_left .name a {
  color: #303133;
}
.list1 .list_left .name a:hover {
  color: #fc5e5b;
}
.list1 .list_left .info {
}
.list1 .list_left .info .f1 {
  text-align: justify;
  line-height: 22px;
  color: #fc5e5b;
}
.list1 .list_left .info .f2 {
  color: #606266;
  margin: 0 15px;
}
.list1 .list_left .info .btn_sp {
  width: 96px;
  height: 26px;
  line-height: 26px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding-left: 20px;
  border-radius: 20px;
}
.list1 .list_left .info .btn_sp.gray {
  border: 1px solid #e6e6e6;
  color: #909399;
  background: url("../../assets/images/common/shipin-grey.png") 19px center
    no-repeat;
}
.list1 .list_right {
  float: right;
  display: flex;
  min-height: 70px;
}
.list1 .list_right .t1 {
  color: #606266;
  padding-top: 10px;
  padding-bottom: 15px;
}
.list1 .list_right .t2 {
  font-size: 12px;
  color: #909399;
}
.list1 .list_right .enter_title {
  text-align: right;
}
.list1 .list_right .enter_logo {
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 10px;
}
.enter_logo img {
  width: 100%;
  height: 100%;
}
.list1 .list_tip {
  padding-top: 10px;
}
.list1 .list_tip1 {
  float: left;
}
.list1 .list_tip span {
  padding: 2px 10px;
  background: #f7f7f7;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background-color: #f7f7f7;
  color: #909399;
  font-size: 12px;
  margin-right: 10px;
}
.list1 .list_tip2 {
  float: right;
  font-size: 12px;
}
.list1 .list_tip2 i {
  display: inline-block;
  vertical-align: text-bottom;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background: url("../../assets/images/search/Icon-clock.png") 0 0 no-repeat;
}
.list1 .select {
  width: 26px;
  height: 26px;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/images/search/selects.png") 0 0 no-repeat;
  display: none;
}
.list1 .active .select {
  display: inline-block;
}

.list2 {
  overflow: hidden;
}
.list2 ul {
  overflow: auto;
}
.list2 li {
  background: #fff;
  padding: 14px;
  font-size: 14px;
  line-height: 25px;
  width: 30%;
  margin-right: 18px;
  margin-bottom: 15px;
  float: left;
  position: relative;
}
.list2 li:nth-child(3n) {
  margin-right: 0;
}

li .wrap-float-top,
li .wrap-float-top-left {
  position: absolute;
  top: 0.9375rem;
  cursor: pointer;
}
li .wrap-float-top-left {
  width: 1.5625rem;
  height: 1.375rem;
  top: 0;
  left: 0;
  background-color: #ff5656;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
  border-bottom-right-radius: 100%;
}
.list2 li .wrap-float-top {
  width: 1.25rem;
  height: 1.25rem;
  right: 0.9375rem;
}
.list2 li .wrap-float-top img {
  width: 100%;
  height: 100%;
}
.list2 li h1 {
  color: #333;
  font-size: 14px;
  cursor: pointer;
}
.list2 li h2 {
  color: #fc5e5b;
  font-size: 14px;
  margin-bottom: 5px;
}
.list2 li .con {
  color: #909399;
  font-size: 12px;
  line-height: 20px;
}
.list2 li h1,
.list2 li .con {
  width: 20.625rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list2 li .btn {
  margin-top: 10px;
}
.list2 li .btn /deep/.el-button--danger {
  padding: 7px 15px;
  width: 48.6%;
}
.list2 .nullArr {
  background-color: #f6f6f8;
  width: 1200px !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: center;
  color: #adadad;
  line-height: 20;
}

.list3 /deep/.el-table th {
  background: #fc5e5b;
  color: #fff;
}
.list3 .table .compy {
  width: 20%;
}
.list3 .table /deep/.el-table td,
.list3 .table /deep/.el-table th.is-leaf {
  border-bottom: 1px solid #ddd;
}
.el-dropdown {
  cursor: default;
  margin-left: 17px;
  margin-right: 17px;
}

.custom {
  padding-left: 20px;
}
.custom:hover {
  color: #303133 !important;
}
.custom input {
  width: 50px;
  height: 18px;
  padding: 0 5px;
  margin-right: 5px;
  border: 1px solid #e6e6e6;
  outline: none;
}
.custom .el-button {
  margin-left: 20px;
  padding: 3px 15px;
  font-size: 12px;
}
.table .alink,
.list_right .alink {
  color: #606266;
}
.table .alink:hover,
.list_right .alink:hover {
  color: #fc5e5b;
}
.d_right li:hover{
    color: #FC5E5B;
}
.d_right li.active{
    color: #FC5E5B;
}
</style>
