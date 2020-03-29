<template>
	<div class="resume">
		<Head />
		<div class="body"> 
			<div class="resume_con">
				<!-- 左侧 -->
				<div class="resume_l">
					<div class="l_block_wrap" id="searchBar">
						<div class="l_block block_4">
							<ul>
								<li>
									<a href="#box1" :class="leftTab == 1 ? 'active':''" @click="setTab(1)">个人基本信息</a>
								</li>
								<li>
									<a href="#box2" :class="leftTab == 2 ? 'active':''" @click="setTab(2)">求职意向</a>
								</li>
								<li>
									<a href="#box3" :class="leftTab == 3 ? 'active':''" @click="setTab(3)">工作经验</a>
								</li>
								<li>
									<a href="#box4" :class="leftTab == 4 ? 'active':''" @click="setTab(4)">项目经验</a>
								</li>
								<li>
									<a href="#box5" :class="leftTab == 5 ? 'active':''" @click="setTab(5)">教育经历</a>
								</li>
								<li>
									<a href="#box6" :class="leftTab == 6 ? 'active':''" @click="setTab(6)">培训经历</a>
								</li>
								<li>
									<a href="#box7" :class="leftTab == 7 ? 'active':''" @click="setTab(7)">科研经历</a>
								</li>
								<li>
									<a href="#box8" :class="leftTab == 8 ? 'active':''" @click="setTab(8)">论文信息</a>
								</li>
								<li>
									<a href="#box9" :class="leftTab == 9 ? 'active':''" @click="setTab(9)">专利信息</a>
								</li>
								<li>
									<a href="#box10" :class="leftTab == 10 ? 'active':''" @click="setTab(10)">研究方向</a>
								</li>
								<li>
									<a href="#box11" :class="leftTab == 11 ? 'active':''" @click="setTab(11)">专业技能</a>
								</li>
								<li>
									<a href="#box12" :class="leftTab == 12 ? 'active':''" @click="setTab(12)">语言能力</a>
								</li>
								<li>
									<a href="#box13" :class="leftTab == 13 ? 'active':''" @click="setTab(13)">获得证书</a>
								</li>
								<li>
									<a href="#box14" :class="leftTab == 14 ? 'active':''" @click="setTab(14)">荣誉奖励</a>
								</li>
								<li>
									<a href="#box15" :class="leftTab == 15 ? 'active':''" @click="setTab(15)">参与社会活动</a>
								</li>
								<li>
									<a href="#box16" :class="leftTab == 16 ? 'active':''" @click="setTab(16)">自我评价</a>
								</li>
								<li>
									<a href="#box17" :class="leftTab == 17 ? 'active':''" @click="setTab(17)">附件</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 右侧 -->
				<div class="resume_r">
                    <!-- 个人信息 -->
					<div class="r_block r_block_1" id="box2">
						<div class="title">
							<span>个人信息</span> 
						</div>
						<div class="content" v-if="user.show"> 
                            <ul class="r_block_1">
                                <li>
                                    <span class="name">姓名：</span>
                                    <span class="val">
                                        {{userInfo.xm}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">性别：</span>
                                    <span class="val">
                                        {{findDmMap.m_xbdm[userInfo.xbm]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">出生年月：</span>
                                    <span class="val">
                                        {{userInfo.csrq}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">民族：</span>
                                    <span class="val">
                                        {{findDmMap.m_mzdm[userInfo.mzdm]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">婚姻状况：</span>
                                    <span class="val">
                                        {{findDmMap.m_hyzkdm[userInfo.hyzk]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">身高：</span>
                                    <span class="val">
                                        {{userInfo.sg}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">政治面貌：</span>
                                    <span class="val">
                                        {{findDmMap.m_zzmm[userInfo.zzmm]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">籍贯：</span>
                                    <span class="val">
                                        {{ProvinceMap[userInfo.jgdms]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">身份证号：</span>
                                    <span class="val">
                                        {{userInfo.sfzjh}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">工作时间：</span>
                                    <span class="val">
                                        {{userInfo.cjgzny}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">现居城市：</span>
                                    <span class="val">
                                        {{ProvinceMap[userInfo.dqszs] + CityMap[userInfo.dqszs][userInfo.dqszcs]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">联系电话：</span>
                                    <span class="val">
                                        {{userInfo.sj}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">电子邮箱：</span>
                                    <span class="val">
                                        {{userInfo.yx}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">最高学位：</span>
                                    <span class="val">
                                        {{findDmMap.m_xldm[userInfo.zgxl]}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">最后毕业院校：</span>
                                    <span class="val">
                                        {{userInfo.zgxx}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">是否学生：</span>
                                    <span class="val">
                                        {{userInfo.sfxs == 1 ? '是':'否'}}
                                    </span>
                                </li>
                                <li>
                                    <span class="name">最高学历专业：</span>
                                    <span class="val">
                                        {{userInfo.zgzy}}
                                    </span>
                                </li>
                                <li class="percent">
                                    <span class="name">自我评价：</span>
                                    <span class="val">
                                        {{userInfo.zwpj}}
                                    </span>
                                </li>
                            </ul> 
						</div>
						<div class="bottom" @click="user.show = !user.show">
							<span><i :class="!user.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!user.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 求职意向 -->
					<div class="r_block r_block_1" id="box2">
						<div class="title">
							<span>求职意向</span> 
						</div>
						<div class="content" v-if="job.show">
							<dl class="r_block_list" v-if="job.list.length > 0">
								<dd v-for="(item,index) in job.list" :key="index"> 
									<ul class="r_block_1">
										<li>
											<span class="name">期望地点：</span>
											<span class="val">
												{{CityMap[item.sjm][item.cjm]  }}
											</span>
										</li>
										<li>
											<span class="name">工作性质：</span>
											<span class="val">{{findDmMap.m_gwgzxzdm[item.gzxzm]}}</span>
										</li>
										<li>
											<span class="name">职位类别：</span> 
											<span class="val" v-if="JobCategoryFirstMap[item.zwmo]">
												{{JobCategoryFirstMap[item.zwmo] + '/' +JobCategorySecondMap[item.zwmo][item.zwmt] + '/' +JobCategoryThirdMap[item.zwmt][item.zwm]}}</span>
										</li>
										<li>
											<span class="name">行业类别：</span>
											<span class="val" v-if="item.hym">  {{findDmMap.m_dwsshydm[item.hym] || ''}}</span>
										</li>
										<li>
											<span class="name">到岗时间：</span>
											<span class="val">{{findDmMap.m_dgsjdm[item.dgsj]}}</span>
										</li>
										<li>
											<span class="name">期望月薪：</span>
											<span class="val" v-if="item.yxm">{{findDmMap.m_xzdydm[item.yxm]}}月</span>
										</li>
									</ul>
								</dd>
							</dl>	
						</div>
						<div class="bottom" @click="job.show = !job.show">
							<span><i :class="!job.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!job.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 工作经验 -->
					<div class="r_block r_block_2" id="box3">
						<div class="title">
							<span>工作经验</span> 
						</div>
						<div class="content" v-if="work.show">
							<dl class="r_block_list" v-if="work.list.length > 0">
								<dd v-for="(item,index) in work.list" :key="index"> 
									<ul class="r_block_1">
										<li class="percent">单位名称：{{item.dwmc}}</li>
										<li>
											<span class="name">职位名称：</span>
											<span class="val">{{item.zwmc}}</span>
										</li>
										<li>
											<span class="name">税前月薪：</span>
											<span class="val">{{findDmMap.m_xzdydm[item.yx]}}</span>
										</li>
										<li>
											<span class="name">工作时间：</span>
											<span class="val">{{item.rzsj}} - {{item.lzsj}}</span>
										</li>
										<li>
											<span class="name">所属行业：</span>
											<span class="val">{{findDmMap.m_dwsshydm[item.hy]}}</span>
										</li>
										<li class="percent">工作描述：{{item.gzms}}</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="work.show = !work.show">
							<span><i :class="!work.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!work.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 项目经验 -->
					<div class="r_block  r_block_3" id="box4">
						<div class="title">
							<span>项目经验</span> 
						</div>
						<div class="content" v-if="project.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in project.list" :key="index"> 
									<ul class="r_block_1">
										<li>项目名称：{{item.xmmc}}</li>
										<li>公司名称：{{item.gsmc}}</li>
										<li>
											<span class="name">担任角色：</span>
											<span class="val">{{item.zw}}</span>
										</li>
										<li>
											<span class="name">项目时间：</span>
											<span class="val">{{item.kssj}} 至 {{item.jssj}}</span>
										</li>
										<li class="percent">项目描述：{{item.xmms}}</li>
										<li class="percent">责任描述：{{item.xmms}}</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="project.show = !project.show">
							<span><i :class="!project.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!project.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 教育经历 -->
					<div class="r_block  r_block_4" id="box5">
						<div class="title">
							<span>教育经历</span> 
						</div> 
						<div class="content" v-if="education.show">
							<el-table :data="education.list" style="width: 100%">
								<el-table-column prop="xxmc" label="毕业院校" width="180">
								</el-table-column>
								<el-table-column prop="sftz" label="是否统招" align="center">
									<template slot-scope="scope">
										{{scope.row.sftz == 1 ? '是':'否'}}
									</template>
								</el-table-column>
								<el-table-column prop="zy" label="所学专业" align="center">
								</el-table-column>
								<el-table-column prop="xl" label="学历" align="center">
									<template slot-scope="scope">
										{{findDmMap.m_xldm[scope.row.xl]}}
									</template>
								</el-table-column>
								<el-table-column prop="ds" label="导师"  align="center">
								</el-table-column>
								<el-table-column prop="date" label="起止时间" width="180" align="center">
									<template slot-scope="scope">
										{{scope.row.rxsj}}至{{scope.row.bysj}}
									</template>
								</el-table-column> 
							</el-table>
						</div>
						<div class="bottom" @click="education.show = !education.show">
							<span><i :class="!education.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!education.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>
					
					<!-- 培训经历 -->
					<div class="r_block  r_block_3" id="box6">
						<div class="title">
							<span>培训经历</span> 
						</div>
						<div class="content" v-if="train.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in train.list" :key="index"> 
									<ul class="r_block_1">
										<li>
											<span class="name">培训机构：</span>
											<span class="val">{{item.pxmc}}</span>
										</li>
										<li>
											<span class="name">培训课程：</span>
											<span class="val">{{item.pxdw}}</span>
										</li>
										<li>
											<span class="name">培训时间：</span>
											<span class="val">{{item.kssj}} 至 {{item.jssj}}</span>
										</li>
										<li class="percent">
											<span class="name">培训内容：</span>
											<span class="val">{{item.pxnr}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="train.show = !train.show">
							<span><i :class="!train.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!train.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>
					
					<!-- 科研经历 -->
					<div class="r_block  r_block_3" id="box7">
						<div class="title">
							<span>科研经历</span> 
						</div>
						<div class="content" v-if="research.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in research.list" :key="index"> 
									<ul class="r_block_1">
										<li>
											<span class="name">项目名称：</span>
											<span class="val">{{item.kyxmmc}}</span>
										</li>
										<li>
											<span class="name">项目类别：</span>
											<span class="val">{{item.xmlb}}</span>
										</li>
										<li>
											<span class="name">项目状态：</span>
											<span class="val">{{item.sfjx == 1 ? '已结项':''}}</span>
										</li>
										<li>
											<span class="name">项目时间：</span>
											<span class="val">{{item.ksrq}} 至 {{item.jsrq}}</span>
										</li>
										<li>
											<span class="name">个人排名：</span>
											<span class="val">第{{item.cypm}}名</span>
										</li>
										<li class="percent">
											<span class="name">描述：</span>
											<span class="val">{{item.xmms}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="research.show = !research.show">
							<span><i :class="!research.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!research.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 论文信息 -->
					<div class="r_block  r_block_3" id="box8">
						<div class="title">
							<span>论文信息</span> 
						</div>
						<div class="content" v-if="paper.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in paper.list" :key="index"> 
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
											<span class="val">第{{item.cypm}}名</span>
										</li> 
										<li class="percent">
											<span class="name">描述：</span>
											<span class="val">{{item.lwms}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="paper.show = !paper.show">
							<span><i :class="!paper.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!paper.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 专利信息 -->
					<div class="r_block  r_block_3" id="box9">
						<div class="title">
							<span>专利信息</span> 
						</div>
						<div class="content" v-if="patent.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in patent.list" :key="index"> 
									<ul class="r_block_1">
										<li>
											<span class="name">专利名称：</span>
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
											<span class="val">{{item.zlwczt == 1 ?'完成':'未完成'}}</span>
										</li>
										<li>
											<span class="name">本人排名：</span>
											<span class="val">第{{item.brpm}}名</span>
										</li> 
										<li class="percent">
											<span class="name">描述：</span>
											<span class="val">{{item.zlms}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="patent.show = !patent.show">
							<span><i :class="!patent.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!patent.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 研究方向、主修课程 -->
					<div class="r_block  r_block_3" id="box10">
						<div class="title">
							<span>研究方向、主修课程</span> 
						</div>
						<div class="content" v-if="major.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in major.list" :key="index"> 
									<ul class="r_block_1">
										<li>
											<span class="name">研究方向：</span>
											<span class="val">{{item.yjfx}}</span>
										</li>
										<li>
											<span class="name">主修课程：</span>
											<span class="val">{{item.zxkc}}</span>
										</li>
										<li>
											<span class="name">博士课题：</span>
											<span class="val">{{item.bskt}}</span>
										</li>
										<li class="percent">
											<span class="name">描述：</span>
											<span class="val">{{item.kcms}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="major.show = !major.show">
							<span><i :class="!major.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!major.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 专业技能 -->
					<div class="r_block  r_block_3" id="box11">
						<div class="title">
							<span>专业技能</span> 
						</div>
						<div class="content" v-if="skill.show"> 
							<el-table :data="skill.list" style="width: 100%">
								<el-table-column prop="jnmc" label="技能名称" width="180">
								</el-table-column> 
								<el-table-column prop="sysc" label="使用时长" align="center">
								</el-table-column> 
								<el-table-column label="掌握程度" align="center">
									<template slot-scope="scope">
										{{findDmMap.m_slnldm[scope.row.slcd]}}
									</template>
								</el-table-column>  
							</el-table>
						</div>
						<div class="bottom" @click="skill.show = !skill.show">
							<span><i :class="!skill.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!skill.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 语言能力 -->
					<div class="r_block  r_block_3" id="box12">
						<div class="title">
							<span>语言能力</span> 
						</div>
						<div class="content" v-if="language.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in language.list" :key="index"> 
									<ul class="r_block_1">
										<li>
											<span class="name">语种名称：</span>
											<span class="val">{{item.yymc}}</span>
										</li>
										<li>
											<span class="name">等级证书：</span>
											<span class="val">{{item.djzs}}</span>
										</li>
										<li>
											<span class="name">听说能力：</span> 
											<span class="val">{{findDmMap.m_slnldm[item.tsnl]}}</span>
										</li>
										<li>
											<span class="name">读写能力：</span>
											<span class="val">{{findDmMap.m_slnldm[item.dxnl]}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="language.show = !language.show">
							<span><i :class="!language.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!language.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>
					
					<!-- 获得证书 -->
					<div class="r_block  r_block_3" id="box13">
						<div class="title">
							<span>获得证书</span> 
						</div>
						<div class="content" v-if="certificate.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in certificate.list" :key="index"> 
									<ul class="r_block_1"> 
										<li>
											<span class="name">证书名称：</span>
											<span class="val">{{item.zsmc}}</span>
										</li>
										<li>
											<span class="name">等级类别：</span>
											<span class="val">{{item.zslb}}</span>
										</li>
										<li>
											<span class="name">获得时间：</span>
											<span class="val">{{item.hdrq}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="certificate.show = !certificate.show">
							<span><i :class="!certificate.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!certificate.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 荣誉奖励 -->
					<div class="r_block  r_block_3" id="box14">
						<div class="title">
							<span>荣誉奖励</span> 
						</div>
						<div class="content" v-if="honor.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in honor.list" :key="index"> 
									<ul class="r_block_1"> 
										<li>
											<span class="name">荣誉名称：</span>
											<span class="val">{{item.jlmc}}</span>
										</li>
										<li>
											<span class="name">奖励单位：</span>
											<span class="val">{{item.jldw}}</span>
										</li>
										<li>
											<span class="name">奖励级别：</span>
											<span class="val">{{item.jljb}}</span>
										</li>
										<li>
											<span class="name">获奖角色：</span>
											<span class="val">{{item.jljs}}</span>
										</li>
										<li>
											<span class="name">荣誉称号：</span>
											<span class="val">{{item.rych}}</span>
										</li>
										<li>
											<span class="name">获奖日期：</span>
											<span class="val">{{item.jlrq}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="certificate.show = !certificate.show">
							<span><i :class="!certificate.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!certificate.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>
					
					<!-- 参与社会活动 -->
					<div class="r_block  r_block_3" id="box15">
						<div class="title">
							<span>参与社会活动</span> 
						</div>
						<div class="content" >
							<dl class="r_block_list">
								<dd v-for="(item,index) in active.list" :key="index"> 
									<ul class="r_block_1"> 
										<li>
											<span class="name">活动名称：</span>
											<span class="val">{{item.hdmc}}</span>
										</li>
										<li>
											<span class="name">活动时间：</span>
											<span class="val">{{item.hdsj}}</span>
										</li>
										<li class="percent">
											<span class="name">活动内容：</span>
											<span class="val">{{item.hdnr}}</span>
										</li>
										<li class="percent">
											<span class="name">活动成果：</span>
											<span class="val">{{item.hdcg}}</span>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="bottom" @click="certificate.show = !certificate.show">
							<span><i :class="!certificate.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!certificate.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

					<!-- 自我评价 -->
					<div class="r_block  r_block_5" id="box16">
						<div class="title">
							<span>自我评价</span> 
						</div>
						<div class="content" >
							<div class="con_5">
								{{userInfo.zwpj}}
							</div>
						</div>
						<div class="bottom" @click="self.show = !self.show">
							<span><i :class="!self.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!self.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div> 
				</div>
			</div>
		</div> 
 

		<Foot />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { mapState } from 'vuex';
	import Head from "../Head.vue";
	import Foot from "../Foot.vue"; 
    import Moment from "../common/moment.js";
	import xb_001 from '../../assets/images/common/mine.png'
	import xb_002 from '../../assets/images/common/nv.png'
	export default {
		name: "Resume",
		components: {
			Head,
			Foot, 
		},
		data() {
			return {
				xb_001: xb_001,
				xb_002: xb_002,
				// 语言能力
				yynlMap: {
					1:'一般',
					2:'良好',
					3:'熟练',
					4:'精通',
				},
				userInfo:{
					qzbsid: '',
					yx:  '',
					yxzt:  '',
					sj:  '',
					sjzt:  '',
					x: '',
					xm:  '',
					sfzjh:  '',
					csrq:  '',
					nl:  0,
					sfxs:  '',
					qzzt:  '',
					sg:  '',
					xbm: "",
					jgdms: "",
					jgdmcs: "",
					mzdm: "",
					zzmm: "",
					hyzk: "",
					cjgzny: "",
					gznx: 0,
					zgxx: "",
					zgzy: "",
					zgxl: "",
					zgxw: "",
					zwpj: "",
					wsd: 0,
					txid: "",
					dqszs: "",
					dqszcs: "",
					dqszxq: "",
					zjgsmc: "",
					zjgwmc: "",
					tdcs: "",
					hydm: "",
					hyname: ""
				},
				isEdit:false,
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
				hidCompany: false,
				// 求职意向
				job: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 工作经验
				work: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 项目经验
				project: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 教育经历
				education: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 培训经历
				train: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 科研经历
				research: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 论文信息
				paper: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 专利信息
				patent: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 研究方向、主修课程
				major: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 专业技能
				skill: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 语言能力
				language: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 获得证书
				certificate: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 荣誉奖励
				honor: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 参与社会活动
				active: {
					show: true,
					dialog: false,
					list:[],
					datas:{}
				},
				// 自我评价
				self: {
					show: true,
					dialog: false,
					con:'',
					datas:{}
				},
				// 上传附件
				files: {
					show: true,
					dialog: false,
					list:[],
					datas:[]
				},
				// 简历
				resume:{
					list:[],
					name:'',
					xg:false
                },
				// 用户信息
                user:{
					show: true,
                    
                }
			};
		},
		computed: {
			...mapGetters({
				token: 'getToken',
				userId: 'getuserId',
				Jobseekers: 'getJobseekers',
				HR: 'getHR',
			}),
			...mapState({
				findDmMap: state => state.findDmMap,
				ProvinceMap: state => state.ProvinceMap,
                CityMap: state => state.CityMap,
                AreaMap: state => state.AreaMap,
				JobCategoryFirstMap: state => state.JobCategoryFirstMap,
                JobCategorySecondMap: state => state.JobCategorySecondMap,
                JobCategoryThirdMap: state => state.JobCategoryThirdMap,
			})
		},
		mounted(){ 
			// let _url = window.location.href.indexOf('box')
			// this.$router.push({
			// 	path: "/private/resume"
			// });
			// this.downFiles();
			this.getUserInfo();
			this.getProjectList();
			this.getEducationList();
			this.getJobList();
			this.getWorkList();
			this.getTrainList();
			this.getResearchList();
			this.getPaperList();
			this.getPatentList();
			this.getMajorList();
			this.getSkillList();
			this.getLanguageList();
			this.getCertificateList();
			this.getHonorList();
			this.getActiveList();
			this.getSelf();
			this.resumeList();
			this.getFiles();
			let _this = this;
			window.addEventListener('scroll', _this.handleScroll)
		},
		destroyed () {
			//离开该页面需要移除这个监听的事件
			let _this = this;
			window.removeEventListener('scroll', _this.handleScroll)
		},
		methods: {
			// 设置左侧菜单栏滚动
			handleScroll () { 
				//改变元素#searchBar的top值
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				let offsetTop = document.querySelector('#searchBar').offsetTop;

				if(scrollTop<=20){
					offsetTop = 177 - Number(scrollTop);
					document.querySelector('#searchBar').style.top = offsetTop+'px';
					document.querySelector('#searchBar').style.position = 'fixed';
				}else if(20 < scrollTop && scrollTop < 2210) {
					document.querySelector('#searchBar').style.position = 'fixed';
					document.querySelector('#searchBar').style.top = '20px';
				} else {
					document.querySelector('#searchBar').style.position = 'absolute';
					document.querySelector('#searchBar').style.bottom = '0';
					document.querySelector('#searchBar').style.top = 'auto';
				}
				
			},
			// 左侧tab点击
			setTab(type) {
				this.leftTab = type;
			},
			/* ---------------------------------个人信息--------------------------------- */
			// 个人信息
			getUserInfo(){
				this.axios.get("/api/qz/qzgrjbxx/info",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res)=> {
					if (res && res.data && res.data.code == 0) {
						if(res.data.qzGrjbxx){
							this.userInfo = res.data.qzGrjbxx;
						}
						this.isEdit = res.data.qzGrjbxx ? true : false; 
					}
				}).catch(function(error) {
					console.log(error);
				});
			}, 

			/* ---------------------------------求职意向--------------------------------- */
			// 求职意向-列表
			getJobList(){ 
				this.axios.get("/api/qz/qzqzyx/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.job.list = res.data.qzyxList;
					}
				}).catch(function(error) {
					console.log(error);
				});
			},  
			/* ---------------------------------项目经验--------------------------------- */
			// 项目经验-列表
			getProjectList(){
				this.axios.get("/api/qz/qzxmjy/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res)=> {
					if (res && res.data && res.data.code == 0) { 
						res.data.xmjyList.forEach(element => {
							element.kssj = Moment.formatDate3(element.kssj)
							element.jssj = Moment.formatDate3(element.jssj)
						}); 
						this.project.list = res.data.xmjyList || [];
					}
				}).catch((error)=> {
					console.log(error);
				});
			}, 

			/* ---------------------------------教育经历--------------------------------- */
			// 教育经历-列表
			getEducationList(){ 
				this.axios.get("/api/qz/qzjyjl/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.list.forEach((element)=>{
							element.rxsj = Moment.formatDate3(element.rxsj)
							element.bysj = Moment.formatDate3(element.bysj) 
						})
						this.education.list = res.data.list || [];
					}
				}).catch((error)=> {
					console.log(error);
				});
			}, 

			
			/* ---------------------------------工作经验--------------------------------- */
			// 工作经验列表
			getWorkList(){ 
				this.axios.get("/api/qz/qzgzjl/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.gzjlList.forEach(element => {
							element.rzsj = Moment.formatDate3(element.rzsj)
							element.lzsj = Moment.formatDate3(element.lzsj)
						}); 
						this.work.list = res.data.gzjlList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			
			/* ---------------------------------培训经历--------------------------------- */
			// 培训经历-列表
			getTrainList(){ 
				this.axios.get("/api/qz/qzpxjl/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.pxjlList.forEach(element => {
							element.kssj = Moment.formatDate3(element.kssj)
							element.jssj = Moment.formatDate3(element.jssj)
						}); 
						this.train.list = res.data.pxjlList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			
			/* ---------------------------------科研经历--------------------------------- */
			// 科研经历-列表
			getResearchList(){
				this.axios.get("/api/qz/qzkyjl/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.kyjlList.forEach(element => {
							element.ksrq = Moment.formatDate3(element.ksrq)
							element.jsrq = Moment.formatDate3(element.jsrq)
						}); 
						this.research.list = res.data.kyjlList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 

			/* ---------------------------------论文信息--------------------------------- */
			// 论文信息-列表
			getPaperList(){
				this.axios.get("/api/qz/qzlwxx/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.qzLwxxlist.forEach(element => {
							element.fbrq = Moment.formatDate3(element.fbrq)
						}); 
						this.paper.list = res.data.qzLwxxlist || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			/* ---------------------------------专利信息--------------------------------- */
			// 专利信息-列表
			getPatentList(){
				this.axios.get("/api/qz/qzzlxx/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.list.forEach(element => {
							element.pzrq = Moment.formatDate3(element.pzrq)
						}); 
						this.patent.list = res.data.list || [];
					}
				}).catch((error) => {
					console.log(error);
				});
            }, 
            
			/* ---------------------------------研究方向、主修课程--------------------------------- */
			// 研究方向-列表
			getMajorList(){
				this.axios.get("/api/qz/qzyjfxzxkc/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) { 
						this.major.list = res.data.list || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 

			/* ---------------------------------专业技能--------------------------------- */
			// 专业技能-列表
			getSkillList(){
				this.axios.get("/api/qz/qzzyjn/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) { 
						this.skill.list = res.data.list || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			/* ---------------------------------语言能力--------------------------------- */
			// 语言能力-列表 
			getLanguageList(){
				this.axios.get("/api/qz/qzyynl/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) { 
						this.language.list = res.data.yynlList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 

			/* ---------------------------------获得证书--------------------------------- */
			// 获得证书-列表 
			getCertificateList(){ 
				this.axios.get("/api/qz/qzzsxx/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) { 
						res.data.list.forEach(element => {
							element.hdrq = Moment.formatDate3(element.hdrq)
						});
						this.certificate.list = res.data.list || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			/* ---------------------------------荣誉奖励--------------------------------- */
			// 荣誉奖励-列表 
			getHonorList(){ 
				this.axios.get("/api/qz/qzryjl/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) { 
						res.data.ryjlList.forEach(element => {
							element.jlrq = Moment.formatDate3(element.jlrq)
						});
						this.honor.list = res.data.ryjlList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			/* ---------------------------------参与社会活动--------------------------------- */
			// 参与社会活动-列表 
			getActiveList(){
				this.axios.get("/api/qz/qzshhd/list",  {
					params: {
						
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						res.data.shhdList.forEach(element => {
							element.hdsj = Moment.formatDate3(element.hdsj)
						}); 
						this.active.list = res.data.shhdList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			}, 
			/* ---------------------------------自我评价--------------------------------- */
			// 自我评价-内容
			getSelf (){
				// this.axios.get("/api/qz/qzshhd/list",  {
				// 	params: {
						
				// 	},
				// 	headers: {
				// 		"content-type": "application/json",
				// 		'token':this.token
				// 	}
				// }).then((res) => {
				// 	if (res && res.data && res.data.code == 0) {
				// 		this.self.con = res.data.con;
				// 	}
				// }).catch((error) => {
				// 	console.log(error);
				// });
			}, 
			/* ---------------------------------上传附件--------------------------------- */
			// 上传附件-内容
			getFiles (){
				this.axios.get("/api/qz/qzFile/list", {
					params: {
						fileType:10
					}, 
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.files.list = res.data.fileList || [];
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			// 上传附件-下载
			downFiles(item){   
				this.axios.get("/api/qz/qzFile/getFile/"+item.wjid,  {
					params: { 
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res)=> {
					if (res && res.data && res.data.code == 0) {
						if(res.data.fileUrl){
							let downloadElement = document.createElement("a");
							let href = res.data.fileUrl.replace('http', 'https'); //创建下载的链接
							downloadElement.target = '_blank';
							downloadElement.href = href;
							downloadElement.download = href; //下载后文件名
							document.body.appendChild(downloadElement);
							downloadElement.click(); //点击下载
							document.body.removeChild(downloadElement); //下载完成移除元素
							window.URL.revokeObjectURL(href); //释放掉blob对象
						}
						// const _res = res.data;
						// let blob = '';
						// if(res.data.fileUrl){
						// 	// 图片
						// 	blob = res.data.fileUrl;
						// }  else {
						// 	blob = new Blob([_res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); 
						// }
						// let downloadElement = document.createElement("a");
						// let href = window.URL.createObjectURL(blob); //创建下载的链接
						// downloadElement.href = href;
						// downloadElement.download = name; //下载后文件名
						// document.body.appendChild(downloadElement);
						// downloadElement.click(); //点击下载
						// document.body.removeChild(downloadElement); //下载完成移除元素
						// window.URL.revokeObjectURL(href); //释放掉blob对象
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				}).catch(function(error) {
					this.$message({
						message: error.msg,
						type: 'warning'
					});
				}); 
			}, 
			/* ---------------------------------电子简历操作--------------------------------- */
			// 简历列表
			resumeList(){
				this.axios.get("/api/qz/qzFile/list", {
					params: {
						fileType:30
					}, 
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						let list = res.data.fileList
						if(list){
							list.forEach(element => { 
								// showphone 0无 1有
								if(element.showPhone == 1){
									this.resume.list = element;
								}
							});
						}
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			// 预览简历
			resumeView(){
				let name = this.resume.list.wjmc
				this.axios.get("/api/qz/qzjldz/preViewDocx",  {
					params: { 
					},
					responseType: 'blob',
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res) {
						const _res = res.data;
						let blob = new Blob([_res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						let downloadElement = document.createElement("a");
						let href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.href = href;
						downloadElement.download = name; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href); //释放掉blob对象
						// window.open(href, "_blank")
					}
				}).catch((error) => {
					console.log(error);
				}); 
			},
			// 刷新简历
			resumeRefresh(){
				this.axios.post("/api/qz/qzgrjbxx/refreshDaily", {}, {
					headers: {
						"content-type": "application/json",
						'token':this.token
					} 
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.$message({
							message: '简历刷新成功',
							type: 'success'
						}); 
					} else if(res.data.code == 500){
						this.$message({
							message: res.data.msg,
							type: 'warning'
						}); 
					}
				}).catch((error) => {
					this.$message({
						message: error.msg,
						type: 'warning'
					}); 
				}); 
			},
			// 推广简历
			resumeExtend(){
				this.axios.post("/api/qz/qzgrjbxx/recEveryWeek", {}, {
					headers: {
						"content-type": "application/json",
						'token':this.token
					} 
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.$message({
							message: '推广简历成功',
							type: 'success'
						}); 
					} else if(res.data.code == 500){
						this.$message({
							message: res.data.msg,
							type: 'warning'
						}); 
					}
				}).catch((error) => {
					this.$message({
						message: error.msg,
						type: 'warning'
					}); 
				}); 
			},
			// 下载简历-调用保存简历接口
			resumeDown(){
				let name = this.resume.list.wjmc
				this.axios.get("/api/qz/qzjldz/save",  {
					params: { 
					},
					responseType: 'blob',
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res) {
						const _res = res.data;
						let blob = new Blob([_res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						let downloadElement = document.createElement("a");
						let href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.href = href;
						downloadElement.download = name; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href); //释放掉blob对象
					}
				}).catch((error) => {
					console.log(error);
				}); 
			},
			// 修改电子简历名称
			resumeModify(){
				if(!this.resume.name){
					this.$message({
						message: '请先输入内容',
						type: 'warning'
					});
					return false
				}
				let bsid = this.resume.list.bsid
				this.axios.get("/api/qz/qzFile/updateWjmc",  {
					params: {
						bsid: bsid,
						wjmc: this.resume.name
					},
					headers: {
						"content-type": "application/json",
						'token':this.token
					}
				}).then((res) => {
					if (res && res.data && res.data.code == 0) {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						this.resumeList();
						this.resume.xg = false;
						this.resume.name =  '';
					}
				}).catch((error) => {
					this.$message({
						message: error.msg,
						type: 'success'
					}); 
				}); 
				
			}
		}
	};
</script>

<style scoped>
	.down_file{
		display: inline-block;
		width: 54px;
		height: 26px;
		text-align: center;
		line-height: 26px;
		color: #fc5e5b;
		border: 1px solid #fc5e5b;
		background: none;
		border-radius: 0;
		vertical-align: middle;
		margin-right: 10px;
		font-size: 12px;
	}
	.r_block_5{

	}
	.r_block_5 .btn_5{
		position: absolute;
		right: 0;
		top: 0;
	}
	.body{
		margin-bottom:100px;
	}
	/deep/.el-table th>.cell{
		font-weight: normal;
		color: #606266;
	}
	.r_btn_1{
		padding-bottom: 5px;
	}
	.resume_r {}

	.resume_r .r_block {
		padding: 10px 10px 30px 10px;
		background: #fff;
		margin-bottom: 25px;
		position: relative;
	}

	.resume_r .r_block .title {
		font-size: 16px;
		color: #606266;
		position: relative;
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
		color: #FC5E5B;
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
		width: 40%;
		float: left;
	}

	.resume_r .r_block .content li.percent {
		width: 100%;
	}

	.resume_r .r_block .r_btn {
		position: absolute;
		right: 10px;
		top: 41px;
	}

	.r_block_list {}

	.r_block_list dd {
		position: relative;
		margin-bottom: 20px;
		overflow: auto;
		clear: both;
		min-height: 64px;
	}

	.r_block_list dd .r_btn {
		top: 0 !important;
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
		background: url('../../assets/images/common/phone.png') 0 -5px no-repeat;
		background-size: 25px;
	}

	.user_info .tel_email .email {
		background: url('../../assets/images/common/youjian.png') 0 -5px no-repeat;
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
		background: #fff;
		padding: 20px;
		position: relative;
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
		background: url("../../assets/images/common/Icon-upload.png") 5px center no-repeat;
		background-size: 16px;
	}

	.resume_l .block_1 p.block_1_1 {
		background-image: url("../../assets/images/resume/Icon-eye.png");
	}

	.resume_l .block_1 p.block_1_2 {
		background-image: url("../../assets/images/resume/Icon-refresh.png");
	}

	.resume_l .block_1 p.block_1_3 {
		background-image: url("../../assets/images/resume/Icon-exit.png");
	}

	.resume_l .block_1 p.block_1_4 {
		background-image: url("../../assets/images/resume/Icon-download.png");
	}

	.resume_l .block_2 .block_2_1 {
		position: relative;
	}

	.resume_l .block_2 .block_2_1 i {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 14px;
		color: #FC5E5B;
		font-style: normal;
	}

	.resume_l .block_2 .block_2_2 {
		font-size: 14px;
	}

	.resume_l .block_2 p {
		font-size: 14px;
		padding-left: 30px;
		background: url("../../assets/images/resume/Icon-success-filling.png") 5px center no-repeat;
		background-size: 16px;
	}

	.resume_l .block_2 p.block_2_3 {
		background-image: url("../../assets/images/resume/cicle.png");
	}

	.resume_l .block_2 p.block_2_3.active {
		background-image: url("../../assets/images/resume/Icon-success-filling.png");
	}

	.resume_l .block_2 p.block_2_4 {
		background-image: url("../../assets/images/resume/Icon-ashbin.png");
	}

	.resume_l .block_2 p.block_2_5 {
		background-image: url("../../assets/images/resume/Icon-eye.png");
	}

	.resume_l .block_2 p.block_2_5.active {
		background-image: url("../../assets/images/resume/Icon-eye-close.png");
	}

	.resume_l .block_3 {
		font-size: 14px;
		padding: 10px 30px 20px 30px;
	}

	.resume_l .block_3 /deep/.el-progress {
		margin-top: 5px;
	}

	.resume_l .block_4 {
		padding-right: 0;
	}

	.resume_l .block_4 li {
		padding: 6px 0;
	}

	.resume_l .block_4 a {
		display: block;
		font-size: 16px;
		color: #606266;
		line-height: 30px;
		border-right: 2px solid rgb(247, 247, 247);
	}

	.resume_l .block_4 a.active {
		border-right: 2px solid #FC5E5B;
		color: #FC5E5B;
	}

	.resume_l.user_top {}

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
		cursor: default;
	}

	.resume_l.user_top .block_1 .block_2_1,
	.resume_l.user_top .block_1 .block_2_2,
	.resume_l.user_top .block_1 .block_3 {
		display: inline-block;
		margin-right: 30px;
	}

	.resume_l.user_top .block_1 .block_2_1 i {
		color: #FC5E5B;
		font-style: normal;
		padding-left: 15px;
		cursor: default;
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
	/deep/.el-table__row .el-button--danger.is-plain {
		width: 54px;
	}
	.l_block_wrap{
		/* position: fixed;
		width: 228px;
		background: #fff; 
		top:0 */
		width: 228px;
		position: fixed; 
		bottom: 300px;
		top: 177px;/*开始处于距离顶部300px的位置，之后随着滚动条滚动top值改变，然后在top==100时停止*/ 
		box-sizing: border-box;
		z-index: 2; 
	}
</style>
