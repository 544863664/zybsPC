<template>
	<div class="resume">
		<Head @upload="uploadChange()"/>
		<div class="body">
			<!-- 个人信息 -->
			<div class="user_info" id="box1">				
				<el-avatar class="user_img"  v-if="userInfo.xbm=='xb_001'&&Jobseekers" :src="userInfo.txid || xb_001" size="small"></el-avatar>
				<el-avatar class="user_img"  v-if="userInfo.xbm=='xb_002'&&Jobseekers" :src="userInfo.txid || xb_002" size="small"></el-avatar> 
				<p class="name">
					<span class="a1">{{userInfo.xm || 'xxx'}}</span>
					<span class="a2">
						<i v-if='userInfo.xbm' v-html="findDmMap.m_xbdm[userInfo.xbm] || 'xxx'"></i> ｜ 
						<i v-if='userInfo.nl>=0' v-html="userInfo.nl == 0 ? 0:userInfo.nl"></i>岁 ｜
						<i v-if='userInfo.zgxl'>{{findDmMap.m_xldm[userInfo.zgxl] || 'xxx'}} ｜ </i>
						<i v-if='userInfo.gznx' v-html="userInfo.gznx || 'xxx'"></i>年工作经验
					</span>
				</p>
				<p class="tel_email">
					<span class="tel">{{userInfo.sj || 'xxx'}}</span>
					<span class="email" v-if="userInfo.yx">{{userInfo.yx || 'xxx'}}</span>
				</p>
				<div class="edit_btn">
					<el-button type="danger" plain @click="setEdit">编辑</el-button>
				</div>

				<div class="resume_l user_top">
					<div class="l_block block_1">
						<p class="block_1_1" @click="resumeView">预览简历</p>
						<p class="block_1_2" @click="resumeRefresh">刷新简历</p>
						<p class="block_1_3" @click="resumeExtend">推广简历</p>
						<p class="block_1_4" @click="resumeDown">下载简历</p>
						<div class="block_2_1" v-if="resume.list.wjmc">
							<span v-if="!resume.xg">{{resume.list.wjmc}}</span>
							<span v-if="resume.xg">
								<input type="text" v-model="resume.name">
								<i @click="resumeModify">保存</i>
								<i @click="resume.xg = false">取消</i>
							</span>
							<i v-if="!resume.xg" @click="resume.xg = true">修改</i>
						</div>
						<div class="block_3">
							<p>当前简历完善度：{{userInfo.wsd || 'xxxxxx'}}%</p>
						</div>
					</div>

				</div>
			</div>
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

					<!-- 求职意向 -->
					<div class="r_block r_block_1" id="box2">
						<div class="title">
							<span>求职意向</span>
							<em class="add" @click="openJob">新增求职意向</em>
						</div>
						<div class="content" v-if="job.show">
							<dl class="r_block_list" v-if="job.list.length > 0">
								<dd v-for="(item,index) in job.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="editJob(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteJob(item)">删除</el-button>
									</div>
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
							<em class="add" @click="openWrok">添加工作经验</em>
						</div>
						<div class="content" v-if="work.show">
							<dl class="r_block_list" v-if="work.list.length > 0">
								<dd v-for="(item,index) in work.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="editWork(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteWork(item)">删除</el-button>
									</div>
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
							<em class="add" @click="project.dialog = true">添加项目经验</em>
						</div>
						<div class="content" v-if="project.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in project.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setProject(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteProject(item)">删除</el-button>
									</div>
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
										<li class="percent">责任描述：{{item.zrms}}</li>
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
							<em class="add" @click="education.dialog = true">添加教育经历</em>
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
								<el-table-column label="操作" align="center" width="140px">
									<template slot-scope="scope">
										<el-button size="mini" type="danger" plain @click="setEducation(scope.$index, scope.row)">编辑</el-button>
										<el-button size="mini" type="danger" plain @click="deleteEducation(scope.row)">删除</el-button>
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
							<em class="add" @click="train.dialog = true">添加培训经历</em>
						</div>
						<div class="content" v-if="train.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in train.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setTrain(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteTrain(item)">删除</el-button>
									</div>
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
							<em class="add" @click="research.dialog = true">添加科研经历</em>
						</div>
						<div class="content" v-if="research.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in research.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setResearch(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteResearch(item)">删除</el-button>
									</div>
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
							<em class="add" @click="paper.dialog = true">添加论文</em>
						</div>
						<div class="content" v-if="paper.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in paper.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setPaper(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deletePaper(item)">删除</el-button>
									</div>
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
							<em class="add" @click="patent.dialog = true">添加专利</em>
						</div>
						<div class="content" v-if="patent.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in patent.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setPatent(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deletePatent(item)">删除</el-button>
									</div>
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
							<em class="add" @click="major.dialog = true">添加研究方向</em>
						</div>
						<div class="content" v-if="major.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in major.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setMajor(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteMajor(item)">删除</el-button>
									</div>
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
							<em class="add" @click="skill.dialog = true">添加专业技能</em>
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
								<el-table-column label="操作" align="center" width="140px">
									<template slot-scope="scope">
										<el-button size="mini" type="danger" plain @click="setSkill(scope.row)">编辑</el-button>
										<el-button size="mini" type="danger" plain @click="deleteSkill(scope.row)">删除</el-button>
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
							<em class="add" @click="language.dialog = true">添加语言能力</em>
						</div>
						<div class="content" v-if="language.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in language.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setLanguage(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteLanguage(item)">删除</el-button>
									</div>
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
							<em class="add" @click="certificate.dialog = true">添加获得证书</em>
						</div>
						<div class="content" v-if="certificate.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in certificate.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setCertificate(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteCertificate(item)">删除</el-button>
									</div>
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
							<em class="add" @click="honor.dialog = true">添加荣誉奖励</em>
						</div>
						<div class="content" v-if="honor.show">
							<dl class="r_block_list">
								<dd v-for="(item,index) in honor.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setHonor(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteHonor(item)">删除</el-button>
									</div>
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
							<em class="add" @click="active.dialog = true">参与社会活动</em>
						</div>
						<div class="content" >
							<dl class="r_block_list">
								<dd v-for="(item,index) in active.list" :key="index">
									<div class="r_btn">
										<div class="r_btn_1">
											<el-button type="danger" plain @click="setActive(item)">编辑</el-button>
										</div>
										<el-button type="danger" plain @click="deleteActive(item)">删除</el-button>
									</div>
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
							<el-button type="danger" plain class="btn_5" @click="setSelf()">编辑</el-button>
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
					
					<!-- 上传附件 -->
					<div class="r_block  r_block_3" id="box11">
						<div class="title">
							<span>上传附件</span>
							<em class="add" @click="files.dialog = true">添加附件</em>
						</div>
						<div class="content" v-if="files.show"> 
							<p style="color: #C0C4CC;">您最多可以上传三份附件</p>
							<el-table :data="files.list" v-if="files.list.length > 0" style="width: 100%">
								<el-table-column prop="wjmc" label="附件名称" >
								</el-table-column> 
								<el-table-column label="操作" align="center" >
									<template slot-scope="scope">
										<!-- <a class="down_file" :href="scope.row.url" target="_blank" download>下载</a> -->
										<el-button size="mini" type="danger" plain @click="downFiles(scope.row)">下载</el-button>
										<el-button size="mini" type="danger" plain @click="deleteFiles(scope.row)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="bottom" @click="files.show = !files.show">
							<span><i :class="!files.show ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{!files.show ? '展开':'收起'}}全部信息</span>
						</div>
					</div>

				</div>
			</div>
		</div> 

		<!-- 用户信息编辑 -->
		<user-edit :venue-dialog-visible="edit.show" :datas="userInfo" :isedit="isEdit" @change="commitUser()" @close="closeUser()"></user-edit>

		<!-- 求职意向 -->
		<job :venue-dialog-visible="job.dialog" :datas="job.datas" :list="job.list.length" @change="commitJob()" @close="closeJob()"></job>
		
		<!-- 工作经验 -->
		<work :venue-dialog-visible="work.dialog" :datas="work.datas"  @change="commitWork()" @close="closeWork()"></work>

		<!-- 项目经验 -->
		<project :venue-dialog-visible="project.dialog" :datas="project.datas" @change="commitProject()" @close="closeProject()"></project>

		<!-- 教育经历 -->
		<educate :venue-dialog-visible="education.dialog" :datas="education.datas" @change="commitEducate()" @close="closeEducate()"></educate>

		<!-- 培训经历 -->
		<train :venue-dialog-visible="train.dialog" :datas="train.datas" @change="commitTrain()" @close="closeTrain()"></train>
		
		<!-- 科研经历 -->
		<research :venue-dialog-visible="research.dialog" :datas="research.datas" @change="commitResearch()" @close="closeResearch()"></research>

		<!-- 论文信息 -->
		<paper :venue-dialog-visible="paper.dialog" :datas="paper.datas" @change="commitPaper()" @close="closePaper()"></paper>

		<!-- 专利信息 -->
		<patent :venue-dialog-visible="patent.dialog" :datas="patent.datas" @change="commitPatent()" @close="closePatent()"></patent>

		<!-- 研究方向、主修课程 -->
		<major :venue-dialog-visible="major.dialog" :datas="major.datas" @change="commitMajor()" @close="closeMajor()"></major>

		<!-- 专业技能 -->
		<skill :venue-dialog-visible="skill.dialog" :datas="skill.datas" @change="commitSkill()" @close="closeSkill()"></skill>

		<!-- 语言能力 -->
		<language :venue-dialog-visible="language.dialog" :datas="language.datas" @change="commitLanguage()" @close="closeLanguage()"></language>

		<!-- 获得证书 -->
		<certificate :venue-dialog-visible="certificate.dialog" :datas="certificate.datas" @change="commitCertificate()" @close="closeCertificate()"></certificate>

		<!-- 荣誉奖励 -->
		<honor :venue-dialog-visible="honor.dialog" :datas="honor.datas" @change="commitHonor()" @close="closeHonor()"></honor>

		<!-- 参与社会活动 -->
		<active :venue-dialog-visible="active.dialog" :datas="active.datas" @change="commitActive()" @close="closeActive()"></active>

		<!-- 自我评价 -->
		<self :venue-dialog-visible="self.dialog" :datas="self.datas" @change="commitSelf()" @close="closeSelf()"></self>
		
		<!-- 上传附件 -->
		<files :venue-dialog-visible="files.dialog" :datas="files.list" @change="commitFiles()" @close="closeFiles()"></files>

		<Foot />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { mapState } from 'vuex';
	import Head from "../Head.vue";
	import Foot from "../Foot.vue";
	import Job from '../common/Resume/Job';
	import UserEdit from '../common/userEdit';
	import Project from '../common/Resume/Project';
	import Educate from '../common/Resume/Educate';
	import Work from '../common/Resume/Work';
	import Train from '../common/Resume/Train';
	import Research from '../common/Resume/Research';
	import Paper from '../common/Resume/Paper';
	import Patent from '../common/Resume/Patent';
	import Major from '../common/Resume/Major';
	import Skill from '../common/Resume/Skill';
	import Language from '../common/Resume/Language';
	import Certificate from '../common/Resume/Certificate';
	import Honor from '../common/Resume/Honor';
	import Active from '../common/Resume/Active';
	import Self from '../common/Resume/Self';
	import Files from '../common/Resume/Files';
    import Moment from "../common/moment.js";
	import xb_001 from '../../assets/images/common/mine.png'
	import xb_002 from '../../assets/images/common/nv.png'
	export default {
		name: "Resume",
		components: {
			Head,
			Foot,
			Job,
			UserEdit,
			Project,
			Educate,
			Work,
			Train,
			Research,
			Paper,
			Patent,
			Major,
			Skill,
			Language,
			Certificate,
			Honor,
			Active,
			Self,
			Files
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
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				
				if(scrollTop<=280){
					offsetTop = 300 - Number(scrollTop);
					document.querySelector('#searchBar').style.top = offsetTop+'px';
					document.querySelector('#searchBar').style.position = 'fixed';
				}else if(280 < scrollTop && scrollTop < scrollHeight - 1052) {
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
			// 用户信息编辑
			setEdit() {
				this.edit.show = true
			},
			// 用户信息-确定
			commitUser(val) {
				this.getUserInfo();
				this.edit.show = val;
			},
			// 用户信息-取消
			closeUser(val) {
				this.edit.show = val;
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
			// 打开求职意向
			openJob(){
				this.job.dialog = true;
			},
			// 求职意向-确定
			commitJob(val) {
				this.job.dialog = val;
				this.getJobList();
			},
			// 求职意向-取消
			closeJob(val) {
				this.job.dialog = val;
			},
			// 求职意向-删除
			deleteJob(item){
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzqzyx/delete/"+item.qzyxid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getJobList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					});
				})
			},
			// 编辑求职意向
			editJob(item){
				this.job.datas = item; 
				this.job.dialog = true;
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
			// 项目经验-编辑
			setProject(item){
				this.project.datas = {
					xmjyid: item.xmjyid,
					xmmc: item.xmmc,
					kssj: Moment.formatDate1(item.kssj),
					jssj: Moment.formatDate1(item.jssj),
					gsmc: item.gsmc,
					zw: item.zw,
					xmms: item.xmms,
					zrms: item.zrms
				}
				this.project.dialog = true;
			},
			// 项目经验-删除
			deleteProject(item){ 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzxmjy/delete/"+item.xmjyid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getProjectList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					});
				})
			},
			// 项目经验-确定
			commitProject(val) {
				this.getProjectList();
				this.project.dialog = val;
			},
			// 项目经验-取消
			closeProject(val) {
				this.project.dialog = val;
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
			// 教育经历-编辑
			setEducation(index, item) {
				this.education.datas = { 
					xxmc: item.xxmc,
					sftz: item.sftz,
					zy: item.zy,
					xl: item.xl,
					ds: item.ds,
					rxsj: item.rxsj,  
					bysj: item.bysj, 
					jyjlid: item.jyjlid
				} 
				this.education.dialog = true;
			},
			// 教育经历-删除
			deleteEducation(item) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzjyjl/delete/"+item.jyjlid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getEducationList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 教育经历-确定
			commitEducate() {
				this.getEducationList();
				this.education.dialog = false;
			},
			// 教育经历-取消
			closeEducate() {
				this.education.dialog = false;
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
			// 工作经验-打开
			openWrok(){
				this.work.dialog = true;
			},
			// 工作经验-编辑
			editWork(item) {
				this.work.datas = { 
					gzjlid: item.gzjlid,
                    dwid: item.dwid,
                    dwmc: item.dwmc,
                    zwmc: item.zwmc,
                    hy: item.hy,
                    rzsj: item.rzsj,
                    lzsj: item.lzsj,
                    gzms: item.gzms,
                    yx: item.yx,
                    ys: '12', 
                    nx: item.nx,
                    sfyc: item.sfyc
				} 
				this.work.dialog = true;
			},
			// 工作经验-删除
			deleteWork(item) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzgzjl/delete/"+item.gzjlid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getWorkList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 工作经验-确定
			commitWork() {
				this.getWorkList();
				this.work.dialog = false;
			},
			// 工作经验-取消
			closeWork() {
				this.work.dialog = false;
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
			// 培训经历-编辑
			setTrain(item) {
				this.train.datas = { 
					pxjlid: item.pxjlid,
                    pxmc: item.pxmc,
                    pxdw: item.pxdw,
                    pxnr: item.pxnr,
                    kssj: item.kssj,
					jssj: item.jssj
				} 
				this.train.dialog = true;
			},
			// 培训经历-删除
			deleteTrain(item) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzpxjl/delete/"+item.pxjlid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getTrainList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 培训经历-确定
			commitTrain() {
				this.getTrainList();
				this.train.dialog = false;
			},
			// 培训经历-取消
			closeTrain() {
				this.train.dialog = false;
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
			// 科研经历-编辑
			setResearch(item) {
				this.research.datas = { 
					kyjlid: item.kyjlid,
                    kyxmmc: item.kyxmmc,
                    xmlb: item.xmlb,
                    ksrq: item.ksrq,
                    jsrq: item.jsrq,
					cypm: item.cypm,
					sfjx: item.sfjx,
					xmms: item.xmms
				} 
				this.research.dialog = true;
			},
			// 科研经历-删除
			deleteResearch(item) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzkyjl/delete/"+item.kyjlid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getResearchList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 科研经历-确定
			commitResearch() {
				this.getResearchList();
				this.research.dialog = false;
			},
			// 科研经历-取消
			closeResearch() {
				this.research.dialog = false;
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
			// 论文信息-编辑
			setPaper(item) {
				this.paper.datas = { 
					lwid: item.lwid,
                    lwmc: item.lwmc,
                    kwmc: item.kwmc,
                    fbrq: item.fbrq,
                    slqk: item.slqk,
					kwyxyz: item.kwyxyz,
					cypm: item.cypm,
					lwms: item.lwms
				} 
				this.paper.dialog = true;
			},
			// 论文信息-删除
			deletePaper(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzlwxx/delete/"+item.lwid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getPaperList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 论文信息-确定
			commitPaper() {
				this.getPaperList();
				this.paper.dialog = false;
			},
			// 论文信息-取消
			closePaper() {
				this.paper.dialog = false;
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
			// 专利信息-编辑
			setPatent(item) {
				this.patent.datas = { 
					zlid: item.zlid,
                    zlmc: item.zlmc,
                    zlbh: item.zlbh,
                    pzrq: item.pzrq,
                    zllx: item.zllx,
					zlwczt: item.zlwczt,
					brpm: item.brpm,
					zlms: item.zlms
				} 
				this.patent.dialog = true;
			},
			// 专利信息-删除
			deletePatent(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzzlxx/delete/"+item.zlid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getPatentList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 专利信息-确定
			commitPatent() {
				this.getPatentList();
				this.patent.dialog = false;
			},
			// 专利信息-取消
			closePatent() {
				this.patent.dialog = false;
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
			// 研究方向-编辑
			setMajor(item) {
				this.major.datas = { 
					fxid: item.fxid,
                    yjfx: item.yjfx,
                    bskt: item.bskt,
                    zxkc: item.zxkc,
					kcms: item.kcms
				} 
				this.major.dialog = true;
			},
			// 研究方向-删除
			deleteMajor(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzyjfxzxkc/delete/"+item.fxid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getMajorList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 研究方向-确定
			commitMajor() {
				this.getMajorList();
				this.major.dialog = false;
			},
			// 研究方向-取消
			closeMajor() {
				this.major.dialog = false;
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
			// 专业技能-编辑
			setSkill(item) {
				this.skill.datas = { 
					jnid: item.jnid,
                    jnmc: item.jnmc,
                    sysc: item.sysc,
                    slcd: item.slcd
				} 
				this.skill.dialog = true;
			},
			// 专业技能-删除
			deleteSkill(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzzyjn/delete/"+item.jnid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getSkillList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 专业技能-确定
			commitSkill() {
				this.getSkillList();
				this.skill.dialog = false;
			},
			// 专业技能-取消
			closeSkill() {
				this.skill.dialog = false;
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
			// 语言能力-编辑
			setLanguage(item) {
				this.language.datas = {  
					yyid: item.yyid,
                    yymc: item.yymc,
                    djzs: item.djzs,
                    tsnl: item.tsnl,
                    dxnl: item.dxnl
				} 
				this.language.dialog = true;
			},
			// 语言能力-删除
			deleteLanguage(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzyynl/delete/"+item.yyid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getLanguageList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 语言能力-确定
			commitLanguage() {
				this.getLanguageList();
				this.language.dialog = false;
			},
			// 语言能力-取消
			closeLanguage() {
				this.language.dialog = false;
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
			// 获得证书-编辑
			setCertificate(item) {
				this.certificate.datas = { 
					zsid: item.zsid,
                    zsmc: item.zsmc,
                    zslb: item.zslb,
                    hdrq: item.hdrq
				} 
				this.certificate.dialog = true;
			},
			// 获得证书-删除
			deleteCertificate(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzzsxx/delete/"+item.zsid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getCertificateList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 获得证书-确定
			commitCertificate() {
				this.getCertificateList();
				this.certificate.dialog = false;
			},
			// 获得证书-取消
			closeCertificate() {
				this.certificate.dialog = false;
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
			// 荣誉奖励-编辑
			setHonor(item) {
				this.honor.datas = { 
					ryjlid: item.ryjlid,
					jlmc: item.jlmc,
                    jldw: item.jldw,
                    jljb: item.jljb,
                    jljs: item.jljs,
                    jlrq: item.jlrq,
					rych: item.rych
				} 
				this.honor.dialog = true;
			},
			// 荣誉奖励-删除
			deleteHonor(item) { 
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzryjl/delete/"+item.ryjlid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getHonorList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 荣誉奖励-确定
			commitHonor() {
				this.getHonorList();
				this.honor.dialog = false;
			},
			// 荣誉奖励-取消
			closeHonor() {
				this.honor.dialog = false;
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
			// 参与社会活动-编辑
			setActive(item) {
				this.active.datas = { 
					hdid: item.hdid,
					hdmc: item.hdmc,
                    hdsj: item.hdsj,
                    hdnr: item.hdnr,
                    hdcg: item.hdcg
				} 
				this.active.dialog = true;
			},
			// 参与社会活动-删除
			deleteActive(item) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzshhd/delete/"+item.hdid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getActiveList();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 参与社会活动-确定
			commitActive() {
				this.getActiveList();
				this.active.dialog = false;
			},
			// 参与社会活动-取消
			closeActive() {
				this.active.dialog = false;
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
			// 自我评价-编辑
			setSelf(){
				this.self.datas = {
					con: this.userInfo.zwpj
				}
				this.self.dialog = true;
			},
			// 自我评价-确定
			commitSelf() {
				this.getUserInfo();
				this.self.dialog = false;
			},
			// 自我评价-取消
			closeSelf() {
				this.self.dialog = false;
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
							downloadElement.download = item.wjmc; //下载后文件名
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
			// 上传附件-删除
			deleteFiles(item) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.get("/api/qz/qzFile/delete/"+item.bsid,  {
						params: {
							
						},
						headers: {
							"content-type": "application/json",
							'token':this.token
						}
					}).then((res)=> {
						if (res && res.data && res.data.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getFiles();
						}
					}).catch(function(error) {
						this.$message({
							message: error.msg,
							type: 'warning'
						});
					}); 
				});
			},
			// 上传附件-确定
			commitFiles() {
				this.getFiles();
				this.files.dialog = false;
			},
			// 上传附件-取消
			closeFiles() {
				this.files.dialog = false;
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
				this.$router.push({ path: "/private/resumepreview"});
				// let name = this.resume.list.wjmc
				// this.axios.get("/api/qz/qzjldz/preViewDocx",  {
				// 	params: { 
				// 	},
				// 	responseType: 'blob',
				// 	headers: {
				// 		"content-type": "application/json",
				// 		'token':this.token
				// 	}
				// }).then((res) => {
				// 	if (res) {
				// 		const _res = res.data;
				// 		let blob = new Blob([_res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
				// 		let downloadElement = document.createElement("a");
				// 		let href = window.URL.createObjectURL(blob); //创建下载的链接
				// 		downloadElement.href = href;
				// 		downloadElement.download = name; //下载后文件名
				// 		document.body.appendChild(downloadElement);
				// 		downloadElement.click(); //点击下载
				// 		document.body.removeChild(downloadElement); //下载完成移除元素
				// 		window.URL.revokeObjectURL(href); //释放掉blob对象
				// 		// window.open(href, "_blank")
				// 	}
				// }).catch((error) => {
				// 	console.log(error);
				// }); 
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
				
			},
			// 头部上传附件成功后
			uploadChange(){ 
				this.getFiles();
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
		top: 300px;/*开始处于距离顶部300px的位置，之后随着滚动条滚动top值改变，然后在top==100时停止*/ 
		box-sizing: border-box;
		z-index: 2; 
	}
</style>
