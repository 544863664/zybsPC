<template>
  <div class="Meetinghall">
    <Head />
    <div class="Meetinghall-body">
      <div
        class="Meetinghall-bannerBox"
        :class="
          venue.hylx == 'yh_001' ||
          venue.hylx == 'yh_003' ||
          venue.hylx == 'yh_005' ||
          venue.hylx == 'yh_007'
            ? 'bannerBoxBg1'
            : venue.hylx == 'yh_002' || venue.hylx == 'yh_006'
            ? 'bannerBoxBg2'
            : 'bannerBoxBg3'
        ">
        <div class="venuename">
          {{ venue.hymc }}
          <div class="venuetime" v-if="venue.ifks != 3">
            双选会活动时间：{{ venue.date1 }} —— {{ venue.date2 }}
          </div>
          <div class="venuetime" v-if="venue.ifks == 3">
            双选会活动时间：已结束
          </div>
        </div>
      </div>
      <div class="Meetinghall-hallBox">
        <div class="hallBox-body">
          <!-- banner -->
          <div class="body-wrap-1">
            <div class="wrap-1-title">
              <img
                src="../../assets/images/common/huo.png"
                style="width: 2rem;height: 2rem;top: 0.4375rem;"
                alt
              />
              <span></span>
            </div>
            <div class="wrap-1-wrap">
              <div class="addHallList">
                <div class="addList">
                  参会企业:
                  <span>{{ topCount.chqys }}</span>
                  家
                </div>
                <div class="addList">
                  参会高校:
                  <span>{{ topCount.chgxs }}</span>
                  家
                </div>
                <div class="addList">
                  招聘岗位:
                  <span>{{ topCount.gwfbs }}</span>
                  个
                </div>
                <div class="addList">
                  已投简历:
                  <span>{{ topCount.jltds }}</span>
                  份
                </div>
                <div class="addList">
                  发放Offer:
                  <span>{{ topCount.mys }}</span>
                  份
                </div>
                <!-- <div class="addList">
                  在线人数:
                  <span>{{ topCount.jxzhxs }}</span>
                  人
                </div> -->
              </div>
            </div>
          </div> 
          <!-- 企业搜索 -->
          <div class="body-wrap-2" v-if="conTab == 1">
            <div class="wrap-2-title"></div>
            <div class="wrap-2-wrap"> 
                <el-input
                  placeholder="热门职位"  @keyup.enter.native="setSearch" 
                  v-model.trim="search.gwmc"
                  class="input-with-select">
                  <el-select
                    v-model="search.hy"
                    @change="setSearch()"
                    slot="prepend"
                    placeholder="行业"
                    style="width: 210px;">
                    <el-option key="" label="" value="">全部</el-option>
                    <el-option
                      v-for="tab in hylxList"
                      :key="tab.hydm"
                      :label="tab.hymc"
                      :value="tab.hydm"
                    ></el-option>
                  </el-select>
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  <el-button slot="append" @click="setSearch">搜 索</el-button>
                </el-input> 
            </div>
          </div>
          <!-- 人才搜索 -->
          <div class="body-wrap-2" v-if="conTab == 2">
            <div class="wrap-2-title"></div>
            <div class="wrap-2-wrap">
              <el-input
                placeholder="学校、专业名称、姓名"
                v-model="search.rcsc"
                class="input-with-select"   @keyup.enter.native="setRcSearch" 
              >
                <el-select
                  slot="prepend"
                  placeholder="人才检索"
                  disabled
                  v-model="search.rcdrop"
                  style="width: 210px;"
                >
                  <!-- <el-option
                    v-for="tab in hylxList"
                    :key="tab.hydm"
                    :label="tab.hymc"
                    :value="tab.hydm"
                  ></el-option> -->
                </el-select>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                <el-button slot="append" @click="setRcSearch">搜 索</el-button>
              </el-input>
            </div>
          </div>

          <!-- 统计 -->
          <div class="body-wrap-3">
            <div class="wrap-3-title"></div>
            <div class="wrap-3-wrap">
              <div class="wrap-3-wrap-list">
                <div class="list">
                  <div class="list-top">
                    {{
                      venue.ifks == 1
                        ? "会议开始倒计时"
                        : venue.ifks == 2
                        ? "会议结束倒计时"
                        : "会议已结束"
                    }}
                  </div>
                  <div class="list-down">{{ Thetimer }}</div>
                </div>
                <div class="list">
                  <div class="list-top" @click="setTab(1)">在线单位</div>
                  <div class="list-down">{{ count.qy }}家</div>
                </div>
                <div class="list">
                  <div class="list-top">在线总人数</div>
                  <div class="list-down">{{ topCount.hyzrs }}人</div>
                </div> 
                <div class="list">
                  <div class="list-top" @click="setTab(2)" v-if="HR">
                    人才大厅
                  </div>
                  <div class="list-top" v-if="!HR">人才大厅</div>
                  <div class="list-down">{{ topCount.hxrcs }}人</div>
                </div>
                <div class="list">
                  <div class="list-top" @click="SwitchMeeting">切换会场</div>
                  <div class="list-down">
                    进行中的会场:{{ switchmeeting.length }}场
                  </div>
                </div>
              </div>
            </div>
            <el-dialog
              :visible.sync="venueDialogVisible"
              width="740px"
              :lock-scroll="true"
              :show-close="false"
              :modal="true" >
              <div class="dialog__body-wrap">
                <div
                  class="dialog__body-wrap-list"
                  v-for="(item, index) in switchmeeting"
                  :key="index"
                >
                  <div class="dialog-list-left">
                    <div class="list-left-title">{{ item.hymc }}</div>
                    <div>举办时间：{{ item.hykssj }}至{{ item.hyjssj }}</div>
                    <!-- <div>办会规模：100家企业</div> -->
                    <div>会场动态：{{item.chqys}}家企业参会 {{item.gwfbs}}个工作岗位 {{item.mys}}个求职者</div>
               
                  </div>
                  <div class="dialog-list-right">
                    <div class="btn" @click="inmeeting(item)">
                      {{ item.ifks == 1 ? "即将开始" : "进入会场" }}
                    </div>
                  </div>
                </div>
                <el-pagination
                  style="width: auto;"
                  background
                  @current-change="handleCurrentChange"
                  :pager-count="5"
                  layout="prev, pager, next"
                  :total="switchmeetleng"
                ></el-pagination>
              </div>
              <span slot="title" class="dialog-header">
                <div>2020届毕业生综合大型网络视频招聘会</div>
              </span>
            </el-dialog>
          </div>

          <!-- 企业列表 -->
          <div class="Talenthall" v-if="conTab == 1">
            <div class="body-wrap-4">
              <div class="wrap-4-title ">
                 <marquee
                  id="affiche1"
                  align="left"
                  behavior="scroll"
                  bgcolor="#fff"
                  direction="left"
                  height="30"
                  loop="-1"
                  scrollamount="10"
                  scrolldelay="100"
                  onmouseout="this.start()"
                  onmouseover="this.stop()">
                  提醒：请您打开IM便于和心仪单位HR进行有效的沟通，也便于HR及时联系到您！【使用视频面试推荐浏览器Google Chrome，70以上版本】
                </marquee>
                </div>
              <div class="wrap-4-wrap">
                <!-- tab -->
                <ul class="qy_tab">
                  <li
                    :class="qyInfo.tab == 0 ? 'active' : ''"
                    @click="tabQYClick(0, '')"
                  >
                    <span>热门企业</span>
                  </li>
                  <li
                    v-for="(item, index) in qyInfo.ztList"
                    :key="index"
                    :class="qyInfo.tab == index + 1 ? 'active' : ''"
                    @click="tabQYClick(1, item.tbsid)"
                  >
                    <span>{{ item.tmc }}</span>
                  </li>
                </ul>
                <!-- 列表内容 -->
                <div class="el-tab-pane">
                  <div
                    class="wrap-list wrap_list_new"
                    v-for="(item, index) in qyInfo.qyList"
                    :key="index"
                  >
                    <div class="enter-title">
                      <div class="enter-logo" @click="enterDetailfn(index)">
                        <img
                          v-if="item.dwid && companyInfo.info[item.dwid]"
                          :src="companyInfo.info[item.dwid]"
                        />
                        <img
                          v-else
                          src="../../assets/images/common/enterDetail.png"
                          alt
                        />
                      </div>
                      <div class="enter-name enter_online_w">
                        <div class="enter_online">{{companyInfo.online.indexOf(item.dwid) > -1 ? '在线':''}}</div>
                        <!-- hr这里不展示收藏 -->
                        <div class="enter-name-star" v-if="Jobseekers">
                          <img
                            src="../../assets/images/common/star-off.png"
                            v-if="item.sfsc == 0"
                            @click="setCompanyCollect(item, index)"
                          />
                          <img
                            src="../../assets/images/common/star-on.png"
                            v-if="item.sfsc == 1"
                            @click="setCompanyCollect(item, index)"
                          />
                        </div>
                        <div
                          class="enter-name-list enter-name-list-title"
                          :title="item.dwmc"
                        >
                          {{
                            item.dwmc.length >= 23
                              ? item.dwmc.substring(0, 23) + "..."
                              : item.dwmc
                          }}
                        </div>
                        <div class="enter-name-list">
                          {{ findDmMap.m_dwxzdm[item.dwxz] }}
                        </div>
                        <div class="enter-name-list five-list">
                          招聘岗位:
                          <span style="color: rgba(255, 8, 0, 0.5);">{{
                            item.hxfbgws
                          }}</span
                          >个
                        </div>
                        <div class="enter-name-list five-list">
                          剩余岗位:
                          <span style="color: rgba(255, 8, 0, 0.5);">{{
                            item.hxzzgws
                          }}</span
                          >个
                        </div>
                      </div>
                    </div>
                    <div class="enter-detail">
                      <div class="enter-data">
                        <div class="enter-data-list">
                          <div class="font-red">在招岗位：</div>
                        </div>
                        <div
                          class="enter-data-list"
                          v-for="(sub, subIndex) in item.gwfblist"
                          :key="subIndex"
                          @click="setPost(sub, subIndex)"
                        >
                          <div :title="sub.gwmc" class="name">
                            {{
                              sub.gwmc.length > 17
                                ? sub.gwmc.substring(0, 17) + "..."
                                : sub.gwmc
                            }}
                          </div>
                          <div>{{ findDmMap.m_xzdydm[sub.gwyx] }}</div>
                        </div>
                        <p
                          v-if="item.gwfblist.length >= 5"
                          class="enter-data-more"
                        >
                          ......
                        </p>
                      </div>
                      <div class="enter-jobs" @click="getCompanyIm(item)">
                        <img
                          src="../../assets/images/common/shipin-white.png"
                          alt
                        />
                        立即沟通
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 更多 -->
                <div
                  style="width: 75rem;"
                  v-if="
                    qyInfo.page.currPage <= qyInfo.page.totalPage &&
                    qyInfo.page.currPage * qyInfo.page.pageSize <
                    qyInfo.page.totalCount
                  ">
                  <div class="wrap-seeall" v-if="qyInfo.qyList.length > 0">
                    <span @click="setMore">
                      查看更多
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                  </div> 
                </div>
                <div v-if="qyInfo.qyList.length == 0">暂无数据</div>

                <!-- 招聘职位信息 弹出框-->
                <el-dialog
                  :visible.sync="post.dialogVisible"
                  width="740px"
                  :lock-scroll="true"
                  :show-close="true"
                  :modal="true" >
                  <div class="dialog__body-wrap">
                    <div class="dialog__body-wrap">招聘职位信息</div>
                    <div v-if="post.list.length > 0">
                      <div
                        class="dialog__body-wrap-list"
                        v-for="(item, index) in post.list"
                        :key="index"
                      >
                        <div
                          class="dialog-list-left"
                          @click="getCompanyInfo(item, index)"
                        >
                          <div class="list-left-title">
                            {{ item.gwmc }}
                          </div>
                          <div>
                            <span v-if="ProvinceMap[item.sbsf]">{{
                                ProvinceMap[item.sbsf] +
                                  CityMap[item.sbsf][item.sbcs]
                              }}、</span>
                            <span v-if="findDmMap.m_xldm[item.xlyq]">{{ findDmMap.m_xldm[item.xlyq] }}、</span>
                            <span v-if="findDmMap.m_jyyqdm[item.jyyq]">{{ findDmMap.m_jyyqdm[item.jyyq] }} </span>
                            <span v-if="findDmMap.m_xzdydm[item.gwyx]">{{ findDmMap.m_xzdydm[item.gwyx] }}</span>
                          </div>
                          <div>{{ item.gwms }}</div>
                        </div>
                        <div class="dialog-list-right">
                          <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="getCompanyIm(item)">
                            <img
                              src="../../assets/images/common/shipin-grey.png"
                            />
                            <!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
                            <!-- <img src="../../assets/images/common/shipin-red.png" alt=""> -->
                            视频面试申请</el-button
                          >
                          <el-button
                            size="mini"
                            type="danger"
                            plain
                            :disabled="!Jobseekers"
                            @click="setSend(item)"
                            >投递简历</el-button
                          >
                        </div>
                      </div>
                      <el-pagination
                        v-if="post.total > 5"
                        style="width: auto;"
                        background
                        @current-change="postCurrentChange"
                        :pager-count="5"
                        layout="prev, pager, next"
                        :total="post.total"
                      ></el-pagination>
                    </div>
                  </div>

                  <div slot="title" class="dialog-header">
                    <div class="dialog-header-wrap" v-if="post.dwinfo.dwmc">
                      <div class="dialog-header-top">
                        <div class="header-top-left">
                          <img
                            v-if="
                              post.dwinfo.dwid &&
                                companyInfo.info[post.dwinfo.dwid]
                            "
                            :src="companyInfo.info[post.dwinfo.dwid]"
                          />
                          <img
                            v-else
                            src="../../assets/images/common/enterDetail.png"
                            alt
                          />
                        </div>
                        <div class="header-top-right">
                          <div class="header-top-right-title">
                            <div>{{ post.dwinfo.dwmc }}</div>
                          </div> 
                          <div>
                            <em v-if="findDmMap.m_dwsshydm[post.dwinfo.sshy]">{{ findDmMap.m_dwsshydm[post.dwinfo.sshy] }}</em>
                            <span>|</span>
                            <em v-if="findDmMap.m_dwgmdm[post.dwinfo.dwgm]">{{ findDmMap.m_dwgmdm[post.dwinfo.dwgm] }}</em>
                            <span>|</span>
                            <em v-if="findDmMap.m_dwxzdm[post.dwinfo.dwxz]">{{ findDmMap.m_dwxzdm[post.dwinfo.dwxz] }}</em>
                          </div>
                          <div>
                            <span v-if="!post.dwinfo.isMore">{{
                              post.dwinfo.dwjs.length > 93
                                ? post.dwinfo.dwjs.substring(0, 93) + "..."
                                : post.dwinfo.dwjs
                            }}</span>
                            <span v-if="post.dwinfo.isMore">{{
                              post.dwinfo.dwjs
                            }}</span>
                            <span
                              v-if="post.dwinfo.dwjs.length > 93"
                              @click="post.dwinfo.isMore = !post.dwinfo.isMore"
                              style="padding-left:10px"
                            >
                              <i
                                :class="
                                  !post.dwinfo.isMore ? 'more down' : 'more up'
                                "
                                >{{ !post.dwinfo.isMore ? "更多" : "收起" }}</i
                              >
                            </span>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="dialog-header-down">
                        <div class="header-down-title">企业单位简介：</div>
                        <div class="header-down-text">
                          <span v-if="!post.dwinfo.isMore">{{post.dwinfo.dwjs.length > 100 ? post.dwinfo.dwszxxdz.substring(0,100) + '...':post.dwinfo.dwjs}}</span>
                          <span v-if="post.dwinfo.isMore">{{post.dwinfo.dwjs}}</span> 
                          <span v-if="post.dwinfo.dwjs.length > 100" @click="post.dwinfo.isMore = !post.dwinfo.isMore" style="padding-left:10px">{{!post.dwinfo.isMore ?'更多>>':'收起>>'}}</span> 
                        </div>
                      </div> -->
                    </div>
                  </div>
                </el-dialog>
              </div>
            </div>
          </div>
          <!-- 人才列表 只能HR者看-->
          <div class="Talenthall" v-if="conTab == 2 && !Jobseekers">
            <div class="body-wrap-5">
              <div class="wrap-5-title"></div>
              <div class="wrap-5-wrap">
                <el-tabs v-model="rcInfo.rcActiveName">
                  <el-tab-pane label="热招人才" name="1">
                    <div
                      class="wrap-list"
                      v-for="(item, index) in rcInfo.list"
                      :key="index">
                      <div class="enter-title" @click="setUserResume(item)" >
                        <img
                          class="enter-star"
                          src="../../assets/images/common/star-off.png"
                          @click="setUserCollect(item, index)"
                          v-if="item.sfsc == 0" />
                        <img
                          class="enter-star"
                          src="../../assets/images/common/star-on.png"
                          @click="setUserCollect(item, index)"
                          v-if="item.sfsc == 1" />
                        <img class="enter-headimg" v-if="userInfo.info[item.qzbsid]" :src="userInfo.info[item.qzbsid]" />
                        <img class="enter-headimg" v-if="!userInfo.info[item.qzbsid] && item.xb == '男'" src="../../assets/images/common/mine.png" />
                        <img class="enter-headimg" v-else-if="!userInfo.info[item.qzbsid] && item.xb == '女'" src="../../assets/images/common/nv.png" />
                        <div class="enter-name">
                          <div class="enter-name-list" :title="'应聘岗位：'+item.ypgw">
                            应聘岗位：{{ item.ypgw.length > 15 ?item.ypgw.substring(0,15)+'...':item.ypgw  || '暂无'}}
                          </div>
                          <div class="enter-name-list">
                            {{ item.xm }}
                            <span>|</span>{{ item.xb }} <span>|</span
                            >{{ item.nl }}岁
                          </div>
                          <div class="enter-name-list">
                            <label v-if="item.zgxl">{{ findDmMap.m_xldm[item.zgxl] }}<span>|</span></label>{{ item.gznx > 0 ? item.gznx+'年': '暂无工作经验'}}
                          </div>
                          <div class="enter-name-list">
                            {{item.zgzy}}
                          </div>
                        </div>
                      </div>
                      <div class="enter-detail">
                        <div class="enter-jobs user_online" 
                            :class="userInfo.online.indexOf(item.qzbsid) != -1 ? 'active':'gray'">
                          <a href="javascript:;" @click="getUserIm(item)">
                            <img src="../../assets/images/common/shipin-red.png" v-if="userInfo.online.indexOf(item.qzbsid) != -1" alt="">
                            <img src="../../assets/images/common/shipin-grey.png" v-else alt="">
                            立即沟通
                          </a>
                        </div>
                      </div>
                    </div>
                    <!-- 更多 -->
                    <div
                      style="width: 75rem;"
                      v-if="
                        rcInfo.page.currPage <= rcInfo.page.totalPage &&
                        (rcInfo.page.currPage * rcInfo.page.pageSize <
                        rcInfo.page.totalCount)
                      " >
                      <div class="wrap-seeall" v-if="rcInfo.list.length > 0">
                        <span @click="setMoreRc">
                          查看更多
                          <i class="el-icon-caret-bottom"></i>
                        </span>
                      </div>
                    </div>
                    <div  v-if="rcInfo.list.length == 0">暂无数据</div>

                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 滚动 -->
      <div class="marqueewrap">
        <div class="marqueewrap_box">
          <div class="marqueeIcon"></div>
          <marquee
            id="affiche"
            align="left"
            behavior="scroll"
            bgcolor="#FF5656"
            direction="left"
            height="50"
            loop="-1"
            scrollamount="10"
            scrolldelay="100"
            onmouseout="this.start()"
            onmouseover="this.stop()">
            <span v-for="(item, index) in LogList" :key="index">
              {{item.times + item.lgnr}}
            </span>
          </marquee>
          <div class="marqueeBtn" v-if="HR">企业参会报名</div>
          <div class="marqueeBtn" @click="goSxh" v-if="Jobseekers">求职者报名</div>
          <div class="marqueeBtn" v-if="!token" @click="goLogin">去登录</div>
        </div>
      </div>
    </div>

    <!-- 求职者根据岗位id查详细信息 弹出框 -->
    <el-dialog
      :visible.sync="company.dialogVisible"
      width="740px"
      :lock-scroll="true"
      :show-close="true"
      :modal="true"
      class="company" >
      <div class="dialog__body-wrap">
        <div
          class="dialog_info"
          v-if="company.info.gwmc"
          style="max-height: 500px;overflow: auto;"
        >
          <p class="p1">
            <span class="p1_1">{{ company.info.gwmc }}</span>
            <span class="p1_2">{{ company.info.sxsj }}</span>
            <span
              class="p1_3"
              :class="company.info.sfsc ? 'active' : ''"
              @click="setCollect()"
            ></span>
          </p>
          
  
   
          <div class="p2">
            <span class="p2_1"> 
                <span v-if="ProvinceMap[company.info.sbsf]">{{
                    ProvinceMap[company.info.sbsf] +
                      CityMap[company.info.sbsf][company.info.sbcs]
                  }} | </span>
                <span v-if="findDmMap.m_xldm[company.info.xlyq]">{{ findDmMap.m_xldm[company.info.xlyq] }} | </span>
                <span v-if="findDmMap.m_jyyqdm[company.info.jyyq]">{{ findDmMap.m_jyyqdm[company.info.jyyq] }} </span> 
            </span>
            <span class="p2_2">{{
              findDmMap.m_xzdydm[company.info.gwyx]
            }}</span>

            <div class="dialog-list-right p2_3">
              <el-button size="mini" type="danger" plain @click="getCompanyIm(company.info)">
                <img src="../../assets/images/common/shipin-grey.png" />
                <!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
                <!-- <img src="../../assets/images/common/shipin-red.png" alt=""> -->
                视频面试申请</el-button
              >
              <el-button
                size="mini"
                type="danger"
                plain
                :disabled="!Jobseekers"
                @click="setSend(company.info)"
                >投递简历</el-button
              >
            </div>
          </div>
          <p class="p3" v-if="ProvinceMap[company.info.sbsf]">
            {{
              ProvinceMap[company.info.sbsf] +
                CityMap[company.info.sbsf][company.info.sbcs] +
                company.info.sbxxdz
            }}
          </p>
          <p class="title" v-if="company.info.fllist.length > 0">
            <span>职位亮点</span>
          </p>
          <div
            class="p_con"
            style="margin-bottom:10px"
            v-if="company.info.fllist.length > 0"
          >
            <span v-for="(item, index) in company.info.fllist" :key="index"
              >{{ findDmMap.m_gwfldm[item.dm] }}、</span
            >
          </div>
          <p class="title"><span>职位描述</span></p>
          <div class="p_con">
            <p class="sub_title">岗位职责：</p>
            <div class="sub_con">
              <pre>
               {{ company.info.gwms }}
              </pre>
            </div>
            <p class="sub_title">任职资格：</p>
            <div class="sub_con">
              <pre>
               {{ company.info.gwms }}
              </pre>
            </div>
          </div>
        </div>
      </div>
      <span slot="title" class="dialog-header">
        <div class="headers">- {{ company.info.gwmc }}-职位详情 -</div>
      </span>
    </el-dialog>

    <!-- 简历弹出框 -->
    <el-dialog
      :visible.sync="resume.dialog"
      width="40%"
      top="30vh"
      :lock-scroll="true"
      :show-close="true"
      :modal="false">
      <div class="dialog__body-wrap">
        <div class="dialog_info">
          <div style="height:200px;">
            <el-table
              :data="resume.list"
              empty-text="您暂无简历可以投递，请到简历页面上传附件简历后再投递"
              style="width: 100%"
              class="resume_dialog"
            >
              <el-table-column label="" width="45">
                <template scope="scope">
                  <el-radio
                    :label="scope.row.wjid"
                    v-model="resume.fjjlid"
                    @change.native="getTemplateRow(scope.row)"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column label="简历名称">
                <template slot-scope="scope">
                  <p>{{ scope.$index + 1 }}、{{ scope.row.wjmc }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div
            class="text-align"
            style="padding-top:10px; text-align:center"
            v-if="resume.list.length > 0"
          >
            <el-button type="danger" @click="resumeConfim">确定</el-button>
            <el-button type="danger" plain @click="resume.dialog = false"
              >取消</el-button
            >
          </div>
        </div>
      </div>
      <span slot="title" class="dialog-header">
        <div>选择投递简历</div>
      </span>
    </el-dialog>

    <!-- 和hr聊天 -->
    <el-dialog
      :visible.sync="online.dialog"
      width="40%"
      top="30vh"
      :lock-scroll="true"
      :show-close="true"
      :modal="false">
      <div class="dialog__body-wrap">
        <div class="dialog_info">
          <div style="height:200px;">
            <el-table
              :data="online.list"
              empty-text="暂无在线HR信息"
              style="width: 100%"
              class="resume_dialog"
            >
              <!-- <el-table-column label="" width="45">
                <template scope="scope">
                  <el-radio
                    :label="scope.row.wjid"
                    v-model="resume.fjjlid"
                    @change.native="getTemplateRow(scope.row)"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column> -->
              <el-table-column label="HR名称" width="100px" >
                <template slot-scope="scope">
                  <p>{{ scope.$index + 1 }}、{{ scope.row.zw }}</p>
                </template>
              </el-table-column>
              <el-table-column label="公司名称" align='center'>
                <template slot-scope="scope">
                  <p :title="scope.row.dwmc">{{ scope.row.dwmc.length > 24 ? scope.row.dwmc.substring(0,24)+'...':scope.row.dwmc }}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100px" align='center'>
                <template slot-scope="scope">
                  <div>
                    <el-button
                      size="mini"
                      type="danger"
                      @click.stop="getIm(scope.row.hrid)" >立即沟通</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div
            class="text-align"
            style="padding-top:10px; text-align:center"
            v-if="resume.list.length > 0"
          >
            <el-button type="danger" @click="resumeConfim">确定</el-button>
            <el-button type="danger" plain @click="resume.dialog = false"
              >取消</el-button
            >
          </div> -->
        </div>
      </div>
      <span slot="title" class="dialog-header">
        <div>选择要对话的HR</div>
      </span>
    </el-dialog>


    <Foot />
  </div>
</template>

<script>
import Head from "../Head.vue";
import Foot from "../Foot.vue";
import { mapState, mapGetters } from "vuex";
import moment from "moment";
import Moment from "../common/moment.js";
import { Loading } from 'element-ui'
// import banner0 from '../../assets/images/common/hall_banner1.png'
export default {
  name: "Meetinghall",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      // hr是否有权限聊天
      hrLt:false,
      // loglist
      LogList:[],
      // 会议是否开始
      ifks:-1,
      // 在线HR
      online:{
        dialog: false,
        list: [],
      },
      // 简历
      resume: {
        row: {},
        dialog: false,
        list: [],
        fjjlid: "",
        newfjjlid: ""
      },
      // 单位信息
      companyInfo: {
        // 单位id列表
        dwids: [],
        info: {},
        online:[]
      },
      userInfo:{
        uids: [],
        info: {},
        online:[]
      },
      count: {
        qy: 0,
        qz: 0,
        hr: 0
      },
      select: "",
      venueDialogVisible: false,
      hxid: "",
      venue: {},
      Thetimer: "",
      switchmeetleng: 0,
      switchmeeting: [],
      marqueeArr: [
        "中研博硕英才网进入会场",
        "中研网全国招聘会组织中心进入会场",
        "求职者进入会场",
        "求职者投递了互联网专业",
        "求职者投递了区域市场经理"
      ],

      // 头部数据汇总
      topCount: {
        chqys: 0,
        chgxs: 0,
        gwfbs: 0,
        jltds: 0,
        mys: 0,
        hyjssj: "",
        jxzhxs: 0,
        hyzrs: 0,
        hxrcs: 0
      },
      // 会讯大厅统计
      hydtCount: {
        chqys: 0,
        chgxs: 0,
        gwfbs: 0,
        jltds: 0,
        mys: 0,
        hyjssj: "",
        jxzhxs: 0
      },
      // 行业列表
      hylxList: [],
      // 搜索按钮
      search: {
        hy: "",
        // 岗位
        gwmc: "",
        // 人才
        rcsc: "",
        rcdrop: ""
      },
      currPage: 1,
      // 企业1、人才2
      conTab: 1,
      // 企业
      qyInfo: {
        tab: 0,
        // 组团tab
        ztList: [],
        // 内容列表
        qyList: [],
        url: "/api/qz/bskhgl/list",
        tbsid: "",
        page: {
          currPage: 1,
          pageSize: 30,
          totalCount: 0,
          totalPage: 0
        }
      },
      // 人才
      rcInfo: {
        rcActiveName: "1",
        list: [],
        page: {
          currPage: 1,
          pageSize: 30,
          totalCount: 0,
          totalPage: 0
        }
      },
      // 公司信息-职位详情 求职者根据岗位id查详细信息
      company: {
        info: {},
        list: [],
        dialogVisible: false
      },
      // 招聘职位信息
      post: {
        dwinfo: {},
        list: [],
        dialogVisible: false,
        currPage: 1,
        total: 0,
        dwid: ""
      }
    };
  },
  computed: {
    ...mapState({
      findDmMap: state => state.findDmMap,
      findDmList: state => state.findDmList,
      ProvinceMap: state => state.ProvinceMap,
      CityMap: state => state.CityMap
    }),
    ...mapGetters({
      token: "getToken",
      userId: "getuserId",
      roleId: "getroleId",
      Jobseekers: "getJobseekers",
      HR: "getHR"
    })
  },
  mounted() {
    this.getCount();
    this.getHylxList();
    this.getZtList();
    this.getHrOnline();
    this.getResumeList();
    this.ztSearch();
    this.rcSearch();
    this.getLog();
    
    if(this.ifks==2){
      setInterval(this.setMd, 1000 * 60 * 3)
    }
    if(this.HR){
      this.conTab = 2
      this.getHrOpenIm()
      this.getHrZt();
    }
  },
  methods: {
    // 跳转双选会页面
    goSxh(){
      this.$router.push({
        path: "/public/jobretrieve",
        query: {
          val: 2
        }
      });
    },
    // tab切换
    setTab(tab){
      this.search.gwmc = ''
      this.search.hy = ''
      this.search.rcsc = ''
      this.conTab = tab
      if(tab == 1){
        this.setSearch();
      } else{
        this.setRcSearch();
      }
    },
    // 人才搜索
    setRcSearch(){
      this.rcInfo.list = [];
      this.rcInfo.page.currPage = 1;
      this.rcInfo.page.totalCount = 0;
      this.rcInfo.page.totalPage = 0;  
      this.userInfo.uids=[];
      this.rcSearch();
    },
    // 企业下拉框搜索
    setSearch() {
      this.qyInfo.qyList = [];
      this.qyInfo.page.currPage = 1;
      this.qyInfo.page.totalCount = 0;
      this.qyInfo.page.totalPage = 0;
      this.companyInfo.dwids=[];
      this.ztSearch();
    },
    // 数据统计
    getHrOnline() {
      // 1:求职者 2:HR 3：公司

      // 求职者 1
      this.axios({
        method: "post",
        url: "/imapi/api/meet/onlineCount",
        params: {
          hxid: this.hxid,
          type: 1
        }
      }).then(res => {
        if (res) {
          this.count.qz = res.data.data;
        }
      });

      // HR 2
      this.axios({
        method: "post",
        url: "/imapi/api/meet/onlineCount",
        params: {
          hxid: this.hxid,
          type: 2
        }
      }).then(res => {
        if (res) {
          this.count.hr = res.data.data;
        }
      });

      // 企业|公司 3
      this.axios({
        method: "post",
        url: "/imapi/api/meet/onlineCount",
        params: {
          hxid: this.hxid,
          type: 3
        }
      }).then(res => {
        if (res) {
          this.count.qy = res.data.data;
        }
      });

      this.axios({
        method: "post",
        url: "/imapi/api/meet/online",
        params: {
          hxid: this.hxid,
          type: this.HR == "HR" ? 1 : 2
        }
      })
        .then(response => {
          console.log("qzAllonline:", response);
        })
        .catch(error => {
          console.log(error);
        });

      this.axios({
        method: "post",
        url: "/imapi/api/user/online",
        params: {
          userid: this.userId
        }
      })
        .then(response => {
          console.log("useronline:", response);
          // if (response && response.data && response.data.code == 0) {
          // 	var data = response.data.page.list;
          // }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 会讯大厅查询组团信息
    getZtList() {
      this.axios
        .get("/api/qz/bsdwbmxx/ztListByHx", {
          params: {
            hxid: this.hxid
          },
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
        .then(res => {
          if (res && res.data && res.data.code == 0) {
            // 数组去重
            let obj = {};
            let peon = res.data.list.reduce((cur, next) => {
              obj[next.tbsid] ? "" : (obj[next.tbsid] = true && cur.push(next));
              return cur;
            }, []);
            peon.forEach((element, index) => {
              element.index = index + 1;
            });
            this.qyInfo.ztList = peon;
          }
        });
    },
    // 企业列表==会讯大厅组团\热门企业信息搜索
    ztSearch(more) {
      //开启loading 
      const load = this.$loading({ 
        lock: true, 
        text: 'Loading', 
        spinner: 'el-icon-loading', 
        background: 'rgba(0, 0, 0, 0)' 
      });
      let params = {
        hxid: this.hxid,
        ztid: this.qyInfo.tbsid,
        sshy: this.search.hy,
        dwmc: "",
        gwmc: this.search.gwmc,
        page: this.qyInfo.page.currPage,
        limit: this.qyInfo.page.pageSize
      };
      this.axios
        .get(this.qyInfo.url, {
          params: params,
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
        .then(res => {
          load.close();
          if (res && res.data && res.data.code == 0) {
            this.qyInfo.page.totalCount = res.data.page.totalCount;
            this.qyInfo.page.totalPage = res.data.page.totalPage;
            this.qyInfo.page.currPage = res.data.page.currPage;
            let list = res.data.page.list;
            if (more) {
              if (list.length > 0) {
                this.qyInfo.qyList = this.qyInfo.qyList.concat(list);
              }
            } else {
              this.qyInfo.qyList = list;
            }
            this.qyInfo.qyList.forEach(element => {
              if (this.companyInfo.dwids.indexOf(element.dwid) < 0) {
                this.companyInfo.dwids.push(element.dwid);
              }
            });
            this.getDwLogos();
            this.getCompanyOnline();
          }
        });
    },
    // 企业tab点击
    tabQYClick(index, tbsid) {
      this.qyInfo.qyList = [];
      this.qyInfo.tab = index;
      if (index == 0) {
        this.qyInfo.tbsid = "";
        this.qyInfo.url = "/api/qz/bskhgl/list";
        this.ztSearch();
      } else {
        this.qyInfo.url = "/api/qz/bskhgl/listByZt";
      }
      if (tbsid) {
        this.qyInfo.tbsid = tbsid;
        this.ztSearch();
      }
    },
    // 会讯大厅行业列表
    getHylxList() {
      this.axios
        .get("/api/qz/bskhgl/queryHylxList", {
          params: {
            hxid: this.hxid
          },
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
        .then(res => {
          if (res && res.data && res.data.code == 0) {
            // 数组去重
            let obj = {};
            let peon = res.data.list.reduce((cur, next) => {
              obj[next.hydm] ? "" : (obj[next.hydm] = true && cur.push(next));
              return cur;
            }, []);
            this.hylxList = peon;
          }
        });
    },
    // 头部数据汇总
    getCount() {
      this.axios
        .post(
          "/api/qz/bshxxx/hxdttj?hxid=" + this.hxid,
          {},
          {
            headers: {
              "content-type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          if (res && res.data && res.data.code == 0) {
            let hxdttj = res.data.hxdttj;
            this.topCount.chqys = hxdttj.chqys;
            this.topCount.chgxs = hxdttj.chgxs;
            this.topCount.gwfbs = hxdttj.gwfbs;
            this.topCount.jltds = hxdttj.jltds;
            this.topCount.mys = hxdttj.mys;
            this.topCount.hyjssj = hxdttj.hyjssj;
            this.topCount.jxzhxs = hxdttj.jxzhxs;
            this.topCount.hyzrs = hxdttj.hyzrs;
            this.topCount.hxrcs = hxdttj.hxrcs;
          }
        });
    },
    // 企业信息查看更多
    setMore() {
      this.qyInfo.page.currPage++;
      this.ztSearch(true);
    },
    // 弹出框- 收藏、取消收藏公司
    setCollect() {
      let gsid = this.company.info.bsid;
      let gwid = this.company.info.gwid;
      let typeSfsc = this.company.info.sfsc;
      let url = `/api/qz/qzgwsc/sc/${gsid}/${gwid}`;
      if (typeSfsc) {
        url = `/api/qz/qzgwsc/qxsc/${gsid}/${gwid}`;
      }
      if (this.token) {
        this.axios({
          method: "post",
          url: url,
          data: {
            qdid: 1
          },
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
          .then(res => {
            if (res && res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message: typeSfsc ? "取消收藏成功" : "收藏成功",
                offset: 400
              });
              this.company.info.sfsc = !typeSfsc;
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
                offset: 400
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$confirm("未登录，请您登录后，进行报名。", "登录状态", {
          confirmButtonText: "去登录",
          cancelButtonText: "取 消",
          type: "warning"
        }).then(() => {
          this.$router.push({
            path: "/public/login"
          });
        });
      }
    },
    // 列表-收藏公司
    setCompanyCollect(item, index) {
      console.log(item);
      let url = `/api/qz/qzgssc/sc/${item.dwid}`;
      if (item.sfsc) {
        url = `/api/qz/qzgssc/qxsc/${item.dwid}`;
      }
      if (this.token) {
        this.axios({
          method: "post",
          url: url,
          data: {},
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
          .then(res => {
            if (res && res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message: item.sfsc == 1 ? "取消收藏成功" : "收藏成功",
                offset: 400
              });
              this.qyInfo.qyList[index].sfsc = item.sfsc == 0 ? 1 : 0;
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
                offset: 400
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$confirm("未登录，请您登录后，进行报名。", "登录状态", {
          confirmButtonText: "去登录",
          cancelButtonText: "取 消",
          type: "warning"
        }).then(() => {
          this.$router.push({
            path: "/public/login"
          });
        });
      }
    },
    // 人才列表==会讯大厅人才信息搜索
    rcSearch(more) {
      if (!this.HR) return;
      //开启loading 
      const load = this.$loading({ 
        lock: true, 
        text: 'Loading', 
        spinner: 'el-icon-loading', 
        background: 'rgba(0, 0, 0, 0)' 
      });
      let params = {
        hxid: this.hxid,
        xxmc: this.search.rcsc,
        zymc: "",
        userId: this.userId,
        page: this.rcInfo.page.currPage,
        limit: this.rcInfo.page.pageSize
      };
      this.axios
        .get("/api/hr/qzgrjbxx/selectHxrcPageList", {
          params: params,
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
        .then(res => {
          load.close();
          if (res && res.data && res.data.code == 0) {
            this.rcInfo.page.totalCount = res.data.page.totalCount;
            this.rcInfo.page.totalPage = res.data.page.totalPage;
            this.rcInfo.page.currPage = res.data.page.currPage;
            let list = res.data.page.list;
            if (more) {
              if (list.length > 0) {
                this.rcInfo.list = this.rcInfo.list.concat(list);
              }
            } else {
              this.rcInfo.list = list;
            }
            this.rcInfo.list.forEach(element => {
              if (this.userInfo.uids.indexOf(element.qzbsid) < 0) {
                this.userInfo.uids.push(element.qzbsid);
              }
            });
            this.getUserLogos();
            this.getUserOnline();
          }
        });
    },
    // 查看更多
    setMoreRc() {
      this.rcInfo.page.currPage++;
      this.rcSearch(true);
    },
    // 点击岗位
    setPost(item) {
      this.post.dialogVisible = true;
      this.post.dwid = item.dwid;
      this.getPostDetail(item);
    },
    // 在招岗位-分页
    postCurrentChange(val) {
      this.post.currPage = val;
      this.getPostDetail(this.post);
    },
    // 在招岗位-详情
    getPostDetail(item) {
      this.axios
        .get("/api/qz/bskhgl/queryHyDwGwList", {
          params: {
            page: this.post.currPage,
            limit: 10,
            type: 1,
            dwid: item.dwid,
            hxid: this.hxid
          },
          headers: {
            "content-type": "application/json"
          }
        })
        .then(res => {
          if (res && res.data && res.data.code == 0) {
            this.post.total = res.data.page.totalCount;
            this.post.list = res.data.page.records;

            this.post.dwinfo = res.data.dwinfo;
            this.post.dwinfo.isMore = false;
          }
        });
    },
    // 获取公司信息--职位弹出框
    getCompanyInfo(item) {
      this.axios({
        method: "post",
        url: "/api/qz/qydwgwfbxx/findGwInfoQzById",
        params: {
          gwid: item.gwid
        },
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => {
          this.company.info = { ...this.company.info, ...res.data.gwxxxqQzVO };
          this.company.info.sxsj = Moment.formatDate3(this.company.info.sxsj);
        })
        .catch(function(error) {
          console.log(error);
        });

      // this.axios
      //   .post(
      //     "/api/qy/dwgwfbxx/findGwInfoQzById/" + gwid,
      //     {},
      //     {
      //       headers: {
      //         "content-type": "application/json",
      //         token: this.token
      //       }
      //     }
      //   )
      //   .then((res) => {
      //     if (res && res.data && res.data.code == 0) {
      //       this.company.info = res.data.gwxxxqQzVO;
      //     }
      //   })
      this.company.dialogVisible = true;
    },
    // 批量获取单位logo
    getDwLogos() {
      this.axios({
        method: "post",
        url: "/api/hr/qydwhrxx/getDwLogos",
        data: this.companyInfo.dwids,
        params: {},
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        if (res && res.data && res.data.code == 0) {
          this.companyInfo.info = res.data.urls;
        }
      });
    },
    // 批量获取个人logo
    getUserLogos() {
      this.axios({
        method: "post",
        url: "/api/qz/qzFile/getUserLogos",
        data: this.userInfo.uids,
        params: {},
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        if (res && res.data && res.data.code == 0) {
          this.userInfo.info = res.data.urls;
        }
      });
    },
    // 公司职位-单个投递简历
    setSend(row) {
      var that = this;
      if (that.token) {
        if (that.Jobseekers) {
          this.getResumeList();
          if (this.resume.list.length == 0) {
            this.resume.fjjlid = "";
          } else {
            if (!this.resume.fjjlid) {
              this.resume.row = row;
              this.resume.dialog = true;
              return;
            }
          }
          that
            .axios({
              method: "post",
              url: "/api/qz/qyhxrxx/td",
              data: {
                dwid: row.dwid,
                gwid: row.gwid,
                fjjlid: this.resume.fjjlid,
                channel: 2,
                hxid: this.hxid
              },
              params: "",
              headers: {
                "content-type": "application/json",
                token: that.token
              }
            })
            .then(function(response) {
              if (response && response.data && response.data.code == 0) {
                that.$message({
                  type: "success",
                  message: "投递成功",
                  offset: 400
                });
              } else {
                that.$message({
                  message: response.data.msg,
                  offset: 400
                });
              }
              that.resume.newfjjlid = "";
              that.resume.fjjlid = "";
              that.resume.dialog = false;
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        that
          .$confirm("未登录，请您登录后，进行报名。", "登录状态", {
            confirmButtonText: "去登录",
            cancelButtonText: "取 消",
            type: "warning"
          })
          .then(() => {
            this.$router.push({
              path: "/public/login"
            });
          });
      }
    },
    // 获取简历列表
    getResumeList() {
      if (!this.token) {
        return;
      }
      this.axios
        .get("/api/qz/qzFile/list", {
          params: {
            fileType: 10 //文件类型：30是电子简历、20是头像、10简历附件
          },
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
        .then(res => {
          if (res && res.data && res.data.code == 0) {
            this.resume.list = res.data.fileList;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 简历列表选择
    getTemplateRow(row) {
      this.resume.newfjjlid = row.wjid;
    },
    // 简历取消
    resumeClose() {
      this.resume.newfjjlid = "";
      this.resume.dialog = false;
    },
    // 简历确定
    resumeConfim() {
      if (!this.resume.newfjjlid) {
        this.$message({
          message: "请选择一个简历",
          type: "warning",
          offset: 400
        });
        return;
      }
      this.resume.fjjlid = this.resume.newfjjlid;
      this.setSend(this.resume.row);
    },
    // 列表-收藏人才
    setUserCollect(item, index) {  
      let url = `/api/hr/qyjlsc/addJlsc`;
      if (item.sfsc) {
        url = `/api/hr/qyjlsc/cancelJlsc/`+item.qzbsid;
      }
      if (this.token) {
        this.axios({
          method: "post",
          url: url,
          data: {
            qzzid: item.qzbsid,
            jlid:'',
            sfms:'',
            sfyy:'',
            sxrq:'',
          },
          params: {
          },
          headers: {
            "content-type": "application/json",
            token: this.token
          }
        })
          .then(res => {
            if (res && res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message: item.sfsc == 1 ? "取消收藏成功" : "收藏成功",
                offset: 400
              });
              this.rcInfo.list[index].sfsc = item.sfsc == 0 ? 1 : 0;
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
                offset: 400
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$confirm("未登录，请您登录后，进行报名。", "登录状态", {
          confirmButtonText: "去登录",
          cancelButtonText: "取 消",
          type: "warning"
        }).then(() => {
          this.$router.push({
            path: "/public/login"
          });
        });
      }
    }, 
    // 企业列表-和hr聊天
    getCompanyIm(item){
      if (this.token) {
        this.online.dialog = true;
        this.axios
          .get("/api/qz/im/getOnlineHr", {
            params: {
              dwid: item.dwid
            },
            headers: {
              "content-type": "application/json",
              token: this.token
            }
          })
          .then(res => {
            if (res && res.data && res.data.code == 0) {
              this.online.list = res.data.onlineHrs;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请先登录再聊天",
          offset: 400
        });
      }
    },
    // 埋点
    setMd(){
      // 只给已开始的加埋点
      if(this.ifks!=2){
        return
      }
      // 求职、游客
      if(this.Jobseekers || (!this.Jobseekers && !this.HR)){
        this.axios({
            method: "post",
            url: "/api/qz/qzjrhxdtjl/joinHxDt",
            data: {

            },
            params: {
              hxid: this.hxid
            },
            headers: {
              "content-type": "application/json",
              token: this.token
            }
          })
          .then((res)=> {
            if (res && res.data && res.data.code == 0) {
              console.log(res)
            }
          })
      }
      // hr 
      if(this.HR){
        this.axios({
            method: "post",
            url: "/api/hr/qyjrhxdtjl/joinHxDt",
            data: {
              
            },
            params: {
              hxid: this.hxid
            },
            headers: {
              "content-type": "application/json",
              token: this.token
            }
          })
          .then((res)=> {
            if (res && res.data && res.data.code == 0) {
              console.log(res)
            }
          })
      }
    },
    // 底部滚动数据列表
    getLog(){
      this.axios
        .get("/api/qz/systemhxlogs/list", {
          params: {
            page: 1,
            limit: 30
          },
          headers: {
            "content-type": "application/json"
          }
        })
        .then(res => {
          if (res && res.data && res.data.code == 0) {
            res.data.page.list.forEach(element => {
              element.times = this.timeago( new Date(element.createTime).getTime())
            });
            this.LogList = res.data.page.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 时间转换为几天前
    timeago(dateTimeStamp){   
      //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();   //获取当前时间毫秒 
        var diffValue = now - dateTimeStamp;//时间差

        if(diffValue < 0){
            return;
        }
        var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
        var hourC = diffValue/hour;
        var dayC = diffValue/day;
        var weekC = diffValue/week;
        var monthC = diffValue/month;
        var result = ''
        if(monthC >= 1 && monthC <= 3){
            result = " " + parseInt(monthC) + "月前"
        }else if(weekC >= 1 && weekC <= 3){
            result = " " + parseInt(weekC) + "周前"
        }else if(dayC >= 1 && dayC <= 6){
            result = " " + parseInt(dayC) + "天前"
        }else if(hourC >= 1 && hourC <= 23){
            result = " " + parseInt(hourC) + "小时前"
        }else if(minC >= 1 && minC <= 59){
            result =" " + parseInt(minC) + "分钟前"
        }else if(diffValue >= 0 && diffValue <= minute){
            result = "刚刚"
        }else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    },
    // 批量获取个人是否在线
    getUserOnline() {
      this.axios({
        method: "post",
        url: "/imapi/api/users/online",
        data: this.userInfo.uids,
        params: {},
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        if (res && res.data) {
          this.userInfo.online = res.data.data; 
        }
      });
    },
    // 批量获取企业是否在线
    getCompanyOnline() {
      this.axios({
        method: "post",
        url: "/imapi/api/meet/onlineDw",
        data: this.companyInfo.dwids,
        params: {},
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      }).then(res => {
        if (res && res.data) {
          this.companyInfo.online = res.data.data; 
        }
      });
    },
    // 跳转到用户简历页面
    setUserResume(item){
      this.$router.push({
        path: "/private/personalResume",
        query: {
          qzbsid: item.qzbsid
        }
      });
    },
    // 打开弹出框
    enterDetailfn() {
      this.venueDialogVisible = true;
    },
    // 切换会场弹出框
    SwitchMeeting() {
      var that = this;
      that.axios
        .get("/api/hr/bshxxx/findHxListByType", {
          params: {
            page: that.currPage,
            limit: 10,
            type: 1,
            px: 1
          },
          headers: {
            "content-type": "application/json"
            // 'token':token
          }
        })
        .then(function(response) {
          // console.log('switchmeeting:',response);
          if (response && response.data && response.data.code == 0) {
            that.switchmeetleng = response.data.page.totalCount;
            var data = response.data.page.list;
            var tdate = Moment.moment1();
            that.switchmeeting = data.map(item => {
              that.axios
              .post("/api/qz/bshxxx/hxdttj?hxid=" + item.hxid,
                {},
                {
                  headers: {
                    "content-type": "application/json",
                    token: that.token
                  }
                }
              )
              .then(res => {
                if (res && res.data && res.data.code == 0) {
                  let hxdttj = res.data.hxdttj;
                  item.chqys = hxdttj.chqys;
                  item.chgxs = hxdttj.chgxs;
                  item.gwfbs = hxdttj.gwfbs;
                  item.jltds = hxdttj.jltds;
                  item.mys = hxdttj.mys; 
                  item.jxzhxs = hxdttj.jxzhxs;
                }
              }); 

              if (tdate < Moment.moment2(item.hykssj)) {
                item.ifks = 1;
                return item;
              } else if (
                Moment.moment2(item.hykssj) < tdate &&
                tdate < Moment.moment2(item.hyjssj)
              ) {
                item.ifks = 2;
                return item;
              } else if (Moment.moment2(item.hyjssj) < tdate) {
                item.ifks = 3;
                return item;
              }
              return item;
            });
            that.venueDialogVisible = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 切换会场弹出框-分页
    handleCurrentChange(val) {
      this.currPage = val;
      this.SwitchMeeting();
    },
    // 切换会场弹出框-进入会场
    inmeeting(item) {
      this.$router.push({
        path: "/public/meetinghall",
        query: {
          hxid: item.hxid,
          ifks: item.ifks
        }
      });
      this.$router.go(0)
      // this.hxid = hxid;
      // this.getvenueDetail();
    },
    // 不用
    getvenueDetail() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/hr/bshxxx/findHxInfo",
          data: "",
          params: { hxid: that.hxid },
          headers: {
            "content-type": "application/json"
            // token: that.token
          }
        })
        .then(function(response) {
          // console.log('getvenueDetail:', response);
          if (response && response.data && response.data.code == 0) {
            var data = response.data.bsHxxx;
            var tdate = Moment.moment1();
            if (tdate < Moment.moment2(data.hykssj)) {
              data.ifks = 1;
            } else if (
              Moment.moment2(data.hykssj) < tdate &&
              tdate < Moment.moment2(data.hyjssj)
            ) {
              data.ifks = 2;
            } else if (Moment.moment2(data.hyjssj) < tdate) {
              data.ifks = 3;
            }
            that.ifks = data.ifks
            that.getvenue(data);
          } else {
            that.$message({
              message: response.data.msg,
              offset: 400
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 不用
    getvenue(item) {
      if (item) {
        item.date1 = item.hykssj.replace("-", "年").replace("-", "月");
        item.date2 = item.hyjssj.replace("-", "年").replace("-", "月");
        this.venue = item;
        this.countdown();
      }
    },
    // 不用
    countdown() {
      var that = this;
      var venue = that.venue;
      var thisdate = Moment.moment1();
      var ksdate = Moment.moment2(venue.hykssj);
      var jsdate = Moment.moment2(venue.hyjssj);
      if (thisdate < ksdate) {
        //开始倒计时
        var auth_timetimer1 = setInterval(() => {
          var kssydate1 = moment().format("YYYY-MM-DD HH:mm:ss");
          let t1 = moment(kssydate1);
          let t2 = moment(venue.hykssj);
          let dura = t2.format("x") - t1.format("x");
          let tempTime = moment.duration(dura);
          if (tempTime.months() <= 0) {
            that.Thetimer =
              "剩余" +
              tempTime.days() +
              "天" +
              tempTime.hours() +
              "时" +
              tempTime.minutes() +
              "分" +
              tempTime.seconds() +
              "秒";
          } else if (tempTime.days() <= 0) {
            that.Thetimer =
              "剩余" +
              tempTime.hours() +
              "时" +
              tempTime.minutes() +
              "分" +
              tempTime.seconds() +
              "秒";
          } else {
            that.Thetimer =
              "剩余" +
              tempTime.months() +
              "月" +
              tempTime.days() +
              "天" +
              tempTime.hours() +
              "时" +
              tempTime.minutes() +
              "分" +
              tempTime.seconds() +
              "秒";
          }

          if (
            tempTime.days() <= 0 &&
            tempTime.hours() <= 0 &&
            tempTime.minutes() <= 0 &&
            tempTime.seconds() <= 0
          ) {
            clearInterval(auth_timetimer1);
          }
        }, 1000);
      }
      if (ksdate < thisdate && thisdate < jsdate) {
        var auth_timetimer2 = setInterval(() => {
          var kssydate1 = moment().format("YYYY-MM-DD HH:mm:ss");
          let t1 = moment(kssydate1);
          let t2 = moment(venue.hyjssj);
          let dura = t2.format("x") - t1.format("x");
          let tempTime = moment.duration(dura);
          if (tempTime.months() <= 0) {
            that.Thetimer =
              "剩余" +
              tempTime.days() +
              "天" +
              tempTime.hours() +
              "时" +
              tempTime.minutes() +
              "分" +
              tempTime.seconds() +
              "秒";
          } else if (tempTime.days() <= 0) {
            that.Thetimer =
              "剩余" +
              tempTime.hours() +
              "时" +
              tempTime.minutes() +
              "分" +
              tempTime.seconds() +
              "秒";
          } else {
            that.Thetimer =
              "剩余" +
              tempTime.months() +
              "月" +
              tempTime.days() +
              "天" +
              tempTime.hours() +
              "时" +
              tempTime.minutes() +
              "分" +
              tempTime.seconds() +
              "秒";
          }
          if (
            tempTime.days() <= 0 &&
            tempTime.hours() <= 0 &&
            tempTime.minutes() <= 0 &&
            tempTime.seconds() <= 0
          ) {
            clearInterval(auth_timetimer2);
          }
        }, 1000);
      }
      if (jsdate < thisdate) {
        that.Thetimer = "已结束";
      }
    },
    goLogin() {
      this.$router.push({
        path: "/public/login"
      });
    },

    getHotcenter(id) {
      var that = this;
      that.axios
        .get("/api/qz/bskhgl/list", {
          params: {
            hxid: id
          }
        })
        .then(function(response) {
          console.log("getHotcenter:", response);
          // if (response && response.data && response.data.code == 0) {
          // 	var data = response.data.page.list;
          // 	that.OnlineVenue = data;
          // }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getZtlist(id) {
      var that = this;
      that.axios
        .get("/api/qz/bsdwbmxx/ztListByHx", {
          params: {
            hxid: id
          },
          headers: {
            "content-type": "application/json"
            // 'token':token
          }
        })
        .then(function(response) {
          console.log("getZtlist:", response);
          // if (response && response.data && response.data.code == 0) {
          // 	var data = response.data.page.list;
          // 	that.OnlineVenue = data;
          // }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 和hr聊天
    getIm(tUserId) {
      if(this.ifks !=2){
        this.$message({
          type: "warning",
          message: this.ifks == 1?'会议未开始':'会议已结束',
          offset: 400
        });
        return
      }
      let url =
        "/im/layim.html?&fUserToken=" +
        this.token +
        "&roleId=" +
        this.roleId +
        "&tUserId=" +
        tUserId;
      if (this.token) {
        window.open(url,'im');
      } else {
        this.$message({
          type: "warning",
          message: "请先登录再聊天",
          offset: 400
        });
      }
    },
    // 和求职者聊天
    getUserIm(item) {
      // 判断用户是否在线
      if(this.userInfo.online.indexOf(item.qzbsid) < 0){
        this.$message({
          type: "warning",
          message: "["+ item.xm + "]目前不在线",
          offset: 400
        });
        return;
      }

      if(!this.hrLt){
        this.$message({
          type: "warning",
          message: "您好，请您报名后方可与人才建立沟通",
          offset: 400
        });
        return
      }
      let url =
        "/im/layim.html?&fUserToken=" +
        this.token +
        "&roleId=" +
        this.roleId +
        "&tUserId=" +
        item.qzbsid;
      if (this.token) {
        window.open(url,'im');
      } else {
        this.$message({
          type: "warning",
          message: "请先登录再聊天",
          offset: 400
        });
      }
    },
    // HR进入页面，默认打开视频页
    getHrOpenIm() {
      let url =
        "/im/layim.html?&fUserToken=" +
        this.token +
        "&roleId=" +
        this.roleId +
        "&tUserId=''";
      if (this.token) {
        window.open(url,'im');
      } else {
        this.$message({
          type: "warning",
          message: "请先登录再聊天",
          offset: 400
        });
      }
    },
    // hr单位是否参会查询
    getHrZt(){
      this.axios({
        method: "post",
        url: "/api/hr/bsdwbmxx//findDwBmzt",
        data: {

        },
        params: {
          hxid: this.hxid
        },
        headers: {
          "content-type": "application/json",
          token: this.token
        }
      })
      .then((res)=> {
        if (res && res.data) {
          if(res.data.code == 0){
            this.hrLt = true
          } else {
            this.hrLt = false
          }
        }
      })
    }
  },
  created() {
    var that = this;
    if (that.$route.query.hxid) {
      that.hxid = that.$route.query.hxid;
    }
    if (that.$route.query.ifks) {
      that.ifks = that.$route.query.ifks;
    }
    that.getvenueDetail();
    that.getvenue();
  }
};
</script>

<style scoped lang="less">
.enter_online_w{
  position: relative;
  .enter_online{
    position: absolute;
    width: 20px;
    right: -13px;
    top: 31px;
    color: #ff6b66;
  }
}
#affiche1{
  background:none;
  color: red;
  line-height: 30px;
}
/deep/.el-radio__label {
  display: none;
}
.enter-data-more {
  color: red;
  font-size: 30px;
  line-height: 0;
  text-align: center;
}
.more {
  display: inline-block;
  position: relative;
  padding-right: 20px;
  cursor: default;
  color: rgb(255, 107, 102);
  &:hover {
    color: rgb(255, 107, 102);
  }
  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 4px;
    height: 18px;
    right: 0;
    padding-right: 14px;
    background: url("../../assets/images/enter/arr0.png") right center no-repeat;
    background-size: 15px;
  }
  &.down {
    &::after {
    }
  }
  &.up {
    &::after {
      transform: rotate(-180deg);
    }
  }
}
.company {
  .headers {
    text-align: center;
    font-weight: bold;
    width: 95%;
  }
  .dialog_info {
    line-height: 30px;
  }
  .p1 {
    position: relative;
    .p1_1 {
      font-weight: bold;
      margin-right: 100px;
      font-size: 16px;
      color: #ff5353;
      border-bottom: 0.1875rem solid #ff5353;
      line-height: 30px;
      padding-bottom: 4px;
    }
    .p1_2 {
    }
    .p1_3 {
      position: absolute;
      right: 20px;
      top: 0;
      display: inline-block;
      width: 22px;
      height: 22px;
      vertical-align: middle;
      background: url("../../assets/images/common/star-off.png") no-repeat;
      &.active {
        background: url("../../assets/images/common/star-on.png") no-repeat;
      }
    }
  }
  .p2 {
    position: relative;
    .p2_1 {
      margin-right: 100px;
    }
    .p2_2 {
      font-weight: bold;
      color: rgb(255, 107, 102);
    }
    .p2_3 {
      position: absolute;
      right: 0;
      top: 10px;
      width: 8.125rem;
      text-align: center;
      // border: 1px solid rgb(255, 83, 83);
      // color: rgb(255, 83, 83);
      line-height: 1.6;
      font-size: 0.875rem;
      cursor: pointer;
    }
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #ff5353;
    span {
      font-size: 16px;
      color: #ff5353;
      border-bottom: 0.1875rem solid #ff5353;
      line-height: 30px;
      padding-bottom: 4px;
    }
  }
  .p_con {
    margin-top: 10px;
    padding-left: 20px;
    .sub_title {
      font-weight: bold;
    }
    .sub_con {
      padding-left: 20px;
    }
  }
}
ul.qy_tab {
  font-size: 18px;
  color: #606266;
  // margin-top: 20px;
  margin-bottom: 20px;
}
ul.qy_tab li {
  display: inline-block;
  margin-right: 40px;
  line-height: 30px;
  cursor: default;
  border-bottom: 2px solid transparent;
}
ul.qy_tab li.active {
  color: #fc5e5b;
  border-bottom: 2px solid #fc5e5b;
}

.Meetinghall .Meetinghall-body {
  margin-top: 7.5rem;
  /* padding-top: 1.25rem; */
  border-top: 0.0625rem solid transparent;
  overflow: hidden;
}

/deep/ .el-tabs__item.is-active {
  color: #ff5656;
}

/deep/ .el-tabs__item:hover {
  color: #ff5656;
}

/deep/ .el-tabs__active-bar {
  background-color: #ff5656;
}

.Meetinghall-bannerBox {
  width: 100%;
  height: 300px;
  border-top: 1px solid transparent;
}

.Meetinghall-bannerBox .venuename {
  /* width: 75rem; */
  margin: 70px auto 0;
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  color: rgba(255, 255, 255, 204);
}

.Meetinghall-bannerBox .venuetime {
  font-size: 1.5625rem;
  margin-top: 0.625rem;
}

.bannerBoxBg1 {
  background: url(../../assets/images/common/hall_banner1.jpg);
}

.bannerBoxBg2 {
  background: url(../../assets/images/common/hall_banner2.jpg);
}

.bannerBoxBg3 {
  background: url(../../assets/images/common/hall_banner3.jpg);
}

/* .Meetinghall-bannerBox .banner, .Meetinghall-bannerBox .banner img {
		height: 100%;
		width: 100%;
	} */
.Meetinghall-hallBox,
.marqueewrap .marqueewrap_box {
  width: 75rem;
  margin: 0 auto;
}

.body-wrap-1,
.body-wrap-2 {
  background-color: #ffffff;
}

.body-wrap-1 {
  padding-bottom: 0.625rem;
  margin-top: 0.9375rem;
}

.body-wrap-1 .wrap-1-title,
.body-wrap-1 .wrap-1-wrap,
.body-wrap-1 .addHallList .addList {
  display: inline-block;
  font-size: 0.9375rem;
  color: rgba(80, 80, 80, 1);
}

.body-wrap-1 .wrap-1-title {
  margin: 0 0.9375rem;
}

.body-wrap-1 .addHallList .addList {
  padding: 0 1.25rem;
  text-align: center;
}

.body-wrap-1 .addHallList .addList:first-child {
  padding-left: 0;
}

.addHallList .addList span {
  color: rgb(255, 76, 79);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/deep/.el-input__inner::-webkit-input-placeholder {
  text-align: center;
}

/deep/.el-input__inner::-moz-input-placeholder {
  text-align: center;
}

/deep/.el-input__inner::-ms-input-placeholder {
  text-align: center;
}

/deep/.el-input-group__append {
  width: 100px;
  background-color: rgb(255, 83, 83);
  color: rgba(255, 255, 255, 1);
  text-align: center;
  border: none;
}

.body-wrap-2 {
  padding: 0.625rem;
  margin: 0.625rem 0;
}

.body-wrap-3 {
  margin: 0.625rem 0 0 0;
  padding: 0.3125rem 0 0 0;
}

.body-wrap-3 .wrap-3-wrap .wrap-3-wrap-list {
  font-size: 0.9375rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.body-wrap-3 .wrap-3-wrap .list {
  width: 13.375rem;
  text-align: center;
  cursor: pointer;
}

.wrap-3-wrap .list .list-top,
.wrap-3-wrap .list .list-down {
  height: 1.875rem;
  line-height: 1.875rem;
}

.wrap-3-wrap .list .list-top,
.list-top a {
  background-color: rgb(255, 83, 83);
  color: rgba(255, 255, 255, 1);
}

.wrap-3-wrap .list .list-down {
  color: rgba(255, 83, 83, 1);
  background-color: rgba(255, 255, 255, 1);
}

.body-wrap-3 /deep/ .el-dialog {
  background-color: rgb(255, 83, 83);
}

/deep/ .el-dialog .el-dialog__body {
  padding: 0.3125rem 0.9375rem 0.9375rem;
}

.body-wrap-3 /deep/ .el-dialog__header {
  color: #f8f8f8;
  font-size: 1.875rem;
  text-align: center;
}

.body-wrap-3 /deep/ .el-dialog__body .dialog__body-wrap {
  height: 670px;
  overflow: auto;
}

.body-wrap-3 /deep/.dialog__body-wrap .dialog__body-wrap-list {
  padding: 0.9375rem;
  background-color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #8e8e8e;
  margin-bottom: 0.9375rem;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.body-wrap-3 .dialog__body-wrap .dialog__body-wrap-list:last-child {
  margin-bottom: 0;
}

.body-wrap-3 .dialog__body-wrap-list .dialog-list-left div {
  margin-bottom: 0.125rem;
  width: 33.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.body-wrap-3 .dialog__body-wrap-list .dialog-list-left .list-left-title {
  font-size: 1rem;
  color: #363636;
  font-weight: 600;
  margin-bottom: 0.3125rem;
}

.body-wrap-3 .dialog__body-wrap-list .dialog-list-right .btn {
  width: 8.125rem;
  text-align: center;
  border: 1px solid rgb(255, 83, 83);
  color: rgb(255, 83, 83);
  margin-top: 23%;
  line-height: 1.6;
  font-size: 0.875rem;
  cursor: pointer;
}
marquee{
  background-color: #fb716f; 
}

.marqueewrap {    
  background-color: #fb716f; 
}

.marqueewrap .marqueewrap_box {
  display: flex;
}

.marqueewrap_box .marqueeIcon {
  width: 4.375rem;
  margin-right: 0.625rem;
  background: url("../../assets/images/common/user0.jpg") no-repeat 0 center;
  background-size: 100%;
}

.marqueewrap_box .marqueeBtn {
  width: 8.75rem;
  border: 0.0625rem solid #f8f8f8;
  height: 2.1875rem;
  line-height: 2.1875rem;
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  text-align: center;
  color: #f8f8f8;
  margin-left: 0.625rem;
  cursor: pointer;
}

#affiche span {
  display: inline-block;
  margin-right: 3.125rem;
  line-height: 3.125rem;
  color: #f8f8f8;
  font-size: 1rem;
  cursor: pointer;
}

.body-wrap-4 .wrap-4-wrap .el-tab-pane {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
}
.body-wrap-4 .wrap-4-wrap {
  margin: 0 0 2.5rem;
}
.body-wrap-4 .wrap-4-wrap .wrap-list {
  width: 21.75rem;
  padding: 0.9375rem;
  margin-right: 1.875rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
  font-size: 0.9375rem;
  border: 1px solid #ff5656;
  background-color: #ffffff;
  background: url(../../assets/images/common/bg2.png) 50% 100% no-repeat;
}
.wrap-4-wrap .wrap-list .enter-title {
  color: rgb(58, 58, 58);
  display: flex;
}
.wrap-4-wrap .wrap-list .enter-logo {
  width: 90px;
  height: 90px;
  margin-bottom: 0.3125rem;
  border-radius: 10px;
  overflow: hidden;
}
.wrap-list .enter-logo > img {
  width: 100%;
  height: 100%;
}
.wrap-4-wrap .wrap-list .enter-name {
  width: 230px;
  margin-left: 1.25rem;
  position: relative;
  color: rgb(144, 144, 144);
}
.wrap-4-wrap .wrap-list .enter-name .enter-name-star > img {
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: -14px;
  top: 0;
}
.wrap-4-wrap .wrap-list .enter-name .enter-name-list {
  margin-bottom: 0.3125rem;
  font-size: 0.8125rem;
}
.wrap-4-wrap .wrap-list .enter-name .enter-name-list-title {
  font-size: 1.0625rem;
  color: #848484;
  font-weight: 600;
  height: 50px;
  width: 210px;
}
.wrap-4-wrap .wrap-list .enter-name .five-list {
  width: 50%;
  float: left;
}
.wrap-4-wrap .wrap-list .enter-detail {
  color: rgb(144, 144, 144);
  height: 250px;
  position: relative;
}
.wrap-4-wrap .wrap-list .enter-data {
  padding: 0.3125rem;
  padding-bottom: 0.5rem;
}
.wrap-4-wrap .wrap-list .enter-data .enter-data-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  // padding: 0.3125rem;
  line-height: 28px;
  border-bottom: 1px dashed #ddd;
}
.wrap-4-wrap .wrap-list .enter-data .enter-data-list div:nth-child(1) {
  font-weight: bold;
}
.wrap-4-wrap .wrap-list .enter-jobs {
  border: 0.0625rem solid rgba(255, 8, 0, 0.5);
  width: 18.75rem;
  line-height: 3;
  margin: 0 auto;
  text-align: center;
  font-size: 1.0625rem;
  font-weight: bold;
  color: rgb(144, 147, 153);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
}
.wrap-4-wrap .wrap-list .enter-jobs2 {
  color: rgb(40, 202, 66);
}
.wrap-4-wrap .wrap-list .enter-jobs3 {
  color: rgb(255, 83, 83);
}
.wrap-4-wrap .wrap-list .enter-jobs img {
  width: 1.5625rem;
  height: 1.3125rem;
  margin: 0;
}
.body-wrap-4 .wrap-4-wrap .wrap-list:nth-child(3n) {
  margin-right: 0;
}
.body-wrap-4 .wrap-4-wrap .wrap-seeall {
  width: 22.5rem;
  height: 1.5625rem;
  margin: 0.625rem auto 0;
  text-align: center;
  font-size: 0.9375rem;
  color: rgba(255, 8, 0, 0.5);
  line-height: 1.5625rem;
  border: 0.0625rem solid rgba(255, 8, 0, 0.5);
  cursor: pointer;
}
.body-wrap-4 .dialog-header-wrap {
  margin: 0.9375rem 0.9375rem 0;
  color: #8e8e8e;
}
.body-wrap-4 .dialog-header-wrap .dialog-header-top {
  display: flex;
  margin-bottom: 0.3125rem;
}
.body-wrap-4 .dialog-header-top .header-top-left img {
  width: 6.875rem;
  height: 6.875rem;
  margin-right: 1.25rem;
}
.body-wrap-4 .dialog-header-top .header-top-right div {
  margin-bottom: 0.1875rem;
}
.body-wrap-4 .dialog-header-top .header-top-right div span {
  margin: 0 0.1875rem;
  vertical-align: text-bottom;
  font-size: 13px;
}
.body-wrap-4 .dialog-header-top .header-top-right .header-top-right-title {
  font-size: 1.3125rem;
  color: #363636;
  font-weight: 600;
  margin-bottom: 0.8125rem;
}
.body-wrap-4 .dialog-header-wrap .dialog-header-down .header-down-text {
  margin-top: 0.125rem;
  text-indent: 2rem;
  overflow: hidden;
  display: -webkit-box;
  // -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.body-wrap-4 .dialog__body-wrap .dialog__body-wrap {
  margin: 0 0.9375rem;
  padding-bottom: 0.125rem;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(255, 83, 83);
  border-bottom: 0.1875rem solid rgb(255, 83, 83);
}
.body-wrap-4 .dialog__body-wrap .dialog__body-wrap-list {
  background-color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #8e8e8e;
  margin: 0.9375rem 0.9375rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.0625rem solid rgb(255, 83, 83);
  overflow: hidden;
  padding-bottom: 10px;
}
.body-wrap-4 .dialog__body-wrap .dialog__body-wrap-list:last-child {
  margin-bottom: 0;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-left div {
  margin-bottom: 0.125rem;
  width: 33.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-left .list-left-title {
  font-size: 1rem;
  color: #363636;
  font-weight: 600;
  margin-bottom: 0.3125rem;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-right .btn {
  width: 8.125rem;
  text-align: center;
  border: 1px solid rgb(255, 83, 83);
  color: rgb(255, 83, 83);
  margin-top: 15%;
  line-height: 1.6;
  color: rgb(144, 147, 153);
  cursor: pointer;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-right .btn2 {
  color: rgb(40, 202, 66);
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-right .btn3 {
  color: rgb(255, 83, 83);
}

.dialog-list-right {
  width: 130px;
}
.dialog-list-right /deep/.el-button {
  width: 124px;
  margin-bottom: 10px;
  margin-left: 0;
}

.body-wrap-5 .wrap-5-wrap .el-tab-pane {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
}
.body-wrap-5 .wrap-5-wrap {
  margin: 0 0 2.5rem;
}
.body-wrap-5 .wrap-5-wrap .wrap-list {
  width: 21.875rem;
  padding: 0.9375rem;
  margin-right: 1.875rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
  font-size: 0.9375rem;
  background-color: #ffffff;
  position: relative;
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-title {
  color: rgb(58, 58, 58);
  text-align: center; 
  position: relative;
  cursor: pointer;
} 
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-headimg {
  width: 5.625rem;
  height: 5.625rem;
  margin-bottom: 0.3125rem;
  border-radius: 0.625rem;
  overflow: hidden;
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-name {
  width: 100%;
  position: relative;
  color: rgb(144, 144, 144);
  margin-bottom: 0.9375rem;
  height: 100px;
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-star {
  // width: 1.875rem;
  // height: 1.875rem;
  // position: absolute;
  // right: 0.9375rem;
  // top: 0.9375rem;
  
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-name .enter-name-list {
  margin-bottom: 0.3125rem;
  font-size: 1rem;
  color: #5d5d5d;
  font-weight: 600;
}
.body-wrap-5 .enter-name .enter-name-list:first-child {
  color: rgb(255, 107, 102) !important;
}
.body-wrap-5 .enter-name .enter-name-list:last-child {
  color: rgb(138, 137, 137) !important;
}
.body-wrap-5 .enter-name .enter-name-list span {
  margin: 0 0.3125rem;
  vertical-align: text-bottom;
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-jobs {
  border: 0.0625rem solid rgba(255, 8, 0, 0.5);
  width: 18.75rem;
  line-height: 3;
  margin: 0 auto;
  text-align: center;
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-jobs.active {
  border: 0.0625rem solid #ddd;
  color: #333;
}
.body-wrap-5 .enter-jobs a {
  font-size: 1.0625rem;
  font-weight: bold;
  color: rgba(255, 8, 0, 0.5);
}
.body-wrap-5 .wrap-5-wrap .wrap-list .enter-jobs img {
  width: 1.5625rem;
  height: 1.3125rem;
  margin: 0;
}
.body-wrap-5 .wrap-5-wrap .wrap-list:nth-child(3n) {
  margin-right: 0;
}
.body-wrap-5 .wrap-5-wrap .wrap-seeall {
  width: 22.5rem;
  height: 1.5625rem;
  margin: 0.625rem auto 0;
  text-align: center;
  font-size: 0.9375rem;
  color: rgba(255, 8, 0, 0.5);
  line-height: 1.5625rem;
  border: 0.0625rem solid rgba(255, 8, 0, 0.5);
  cursor: pointer;
}
.wrap_list_new{
  background-color:#fff !important;
}
.wrap_list_new .enter-jobs{ 
  box-shadow: 0px 3px 3px #e5e5e5;
  background-color: #fc5e5b;
  color: #fff !important;
}
.wrap_list_new .name{
  color: #000 !important;
  font-weight: normal !important;
  text-shadow: 0 1px 1px #fff;
}

.user_online.gray{
  border-color: #ddd !important;
  color: #8a8989 !important;
}
.user_online.gray a{
  color: #8a8989 !important;
}
.user_online.active{
  border-color: rgb(255, 83, 83) !important;
  color: rgb(255, 83, 83) !important;
}
.user_online.active a{
  color: rgb(255, 83, 83) !important;
}
</style>
