import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Index from '@/components/Index'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'Index',
	component: Index
},
{
	path: '/public/meetinghall',
	name: 'Meetinghall',
	component: () => import('@/components/meeting/Meetinghall'),
	redirect: '/meetinghall/qyhall',
	children: [{
		path: '/meetinghall/qyhall',
		name: 'Qyhall',
		component: () => import('@/components/meeting/Qyhall'),
	}, {
		path: '/meetinghall/talenthall',
		name: 'Talenthall',
		component: () => import('@/components/meeting/Talenthall'),
	}]
},
{
	path: '/public/jobretrieve',
	name: 'Jobretrieve',
	component: () => import('@/components/retrieve/Jobretrieve')
},
{
	path: '/public/noticedetail',
	name: 'Noticedetail',
	component: () => import('@/components/meeting/Noticedetail')
},
{
	path: '/private/message',
	name: 'Message',
	component: () => import('@/components/meeting/Message')
},
{
	path: '/public/login',
	name: 'Thelogin',
	component: () => import('@/components/login/Thelogin')
},
{
	path: '/public/registered',
	name: 'Registered',
	component: () => import('@/components/login/Registered')
},
{
	path: '/public/forgotPassword',
	name: 'ForgotPassword',
	component: () => import('@/components/login/Forgotpassword')
},
{
	path: '/job_hunter',
	name: 'Job_hunter',
	component: () => import('@/components/job_hunter/Job_hunter'),
	children: [{
		path: '',
		name: 'Job_hunter',
		component: () => import('@/components/job_hunter/Job_hunter'),
	},
	{
		path: 'hunter_card',
		name: 'Hunter_card',
		component: () => import('@/components/job_hunter/Hunter_card'),
	},
	{
		path: 'hunter_invite',
		name: 'Hunter_invite',
		component: () => import('@/components/job_hunter/Hunter_invite'),
	},
	{
		path: 'hunter_login',
		name: 'Hunter_login',
		component: () => import('@/components/job_hunter/Hunter_login'),
	},
	{
		path: 'hunter_resume',
		name: 'Hunter_resume',
		component: () => import('@/components/job_hunter/Hunter_resume'),
	},
	{
		path: 'shield_company',
		name: 'Shield_company',
		component: () => import('@/components/job_hunter/Shield_company'),
	},
	{
		path: 'hunter_message',
		name: 'Hunter_message',
		component: () => import('@/components/job_hunter/Hunter_message'),
	},
	{
		// 个人中心主页面
		path: 'hunter_home',
		name: 'Hunter_home',
		component: () => import('@/components/job_hunter/Hunter_home'),
	},
	{
		// 个人中心-谁看了我
		path: 'hunter_who',
		name: 'Hunter_who',
		component: () => import('@/components/job_hunter/Hunter_who'),
	},
	{
		// 个人中心-已投职位
		path: 'hunter_invest',
		name: 'Hunter_invest',
		component: () => import('@/components/job_hunter/Hunter_invest'),
	},
	{
		// 个人中心-双选会投递职位
		path: 'hunter_delivery',
		name: 'Hunter_delivery',
		component: () => import('@/components/job_hunter/Hunter_delivery'),
	},
	{
		// 个人中心-已收藏职位
		path: 'hunter_collect',
		name: 'Hunter_collect',
		component: () => import('@/components/job_hunter/Hunter_collect'),
	},
	{
		// 个人中心-已关注企业
		path: 'hunter_follow',
		name: 'Hunter_follow',
		component: () => import('@/components/job_hunter/Hunter_follow'),
	},
	{
		// 个人中心-我的简历
		path: 'hunter_myresume',
		name: 'Hunter_myresume',
		component: () => import('@/components/job_hunter/Hunter_myresume'),
	},
	]
},
{
	// 简历主页面
	path: '/private/resume',
	name: 'Resume',
	component: () => import('@/components/resume/resume')
},
{
	// 简历预览页面
	path: '/private/resumepreview',
	name: 'Resumepreview',
	component: () => import('@/components/resume/resumepreview')
},
{
	// 公司详情
	path: '/public/companyDetail',
	name: 'CompanyDetail',
	component: () => import('@/components/retrieve/CompanyDetail')
},
{
	// 职位详情
	path: '/public/postDetail',
	name: 'PostDetail',
	component: () => import('@/components/retrieve/PostDetail')
},
{
	// 企业端-简历详情页面
	path: '/private/personalResume',
	name: 'PersonalResume',
	component: () => import('@/components/enterprise/PersonalResume')
},
{
	// 企业端-人才检索页面
	path: '/public/personalSearch',
	name: 'PersonalSearch',
	component: () => import('@/components/enterprise/PersonalSearch')
},
{
	// 企业端-人才检索页面详情
	path: '/public/personalDetail',
	name: 'PersonalDetail',
	component: () => import('@/components/enterprise/PersonalDetail')
},
{
	// 企业端-企业中心模块
	path: '/enter_home',
	name: 'Enter_home',
	component: () => import('@/components/enterprise/center/Enter_home'),
	children: [
		{
			path: '',
			name: 'Enter_home',
			component: () => import('@/components/enterprise/center/Enter_home'),
		},
		{
			// 企业中心页面
			path: 'enter_center',
			name: 'Enter_center',
			component: () => import('@/components/enterprise/center/Enter_center'),
		},
		{
			// 企业信息页面
			path: 'enter_info',
			name: 'Enter_info',
			component: () => import('@/components/enterprise/center/Enter_info'),
		},
		{
			// 职位管理页面
			path: 'enter_post',
			name: 'Enter_post',
			component: () => import('@/components/enterprise/center/Enter_post'),
		},
		{
			// 双选会管理页面
			path: 'enter_delivery',
			name: 'Enter_delivery',
			component: () => import('@/components/enterprise/center/Enter_delivery'),
		},
		{
			// 简历管理
			path: 'enter_resume',
			name: 'Enter_resume',
			component: () => import('@/components/enterprise/center/Enter_resume'),
		},
		{
			// 已下载简历
			path: 'enter_downresume',
			name: 'Enter_downresume',
			component: () => import('@/components/enterprise/center/Enter_downresume'),
		},
		{
			// 资产信息
			path: 'enter_assets',
			name: 'Enter_assets',
			component: () => import('@/components/enterprise/center/Enter_assets'),
		},
		{
			// 面试结果
			path: 'enter_interview',
			name: 'Enter_interview',
			component: () => import('@/components/enterprise/center/Enter_interview'),
		},
		{
			// 账号信息
			path: 'enter_card',
			name: 'Enter_card',
			component: () => import('@/components/enterprise/center/Enter_card'),
		},
		{
			// 登录日志
			path: 'enter_login',
			name: 'Enter_login',
			component: () => import('@/components/enterprise/center/Enter_login'),
		},
		{
			// 会员充值
			path: 'enter_vip',
			name: 'Enter_vip',
			component: () => import('@/components/enterprise/center/Enter_vip'),
		},
	]
},
{
	// 新增岗位
	path: '/private/enter_postcreate',
	name: 'Enter_postcreate',
	component: () => import('@/components/enterprise/center/Enter_postcreate'),
},
{
	// 修改岗位
	path: '/enter_updatePost',
	name: 'Enter_updatePost',
	component: () => import('@/components/enterprise/center/Enter_updatePost'),
},
{
	// 企业详情
	path: '/public/enterDetail',
	name: 'EnterDetail',
	component: () => import('@/components/enterprise/EnterDetail'),
},

{
	// 测试聊天
	path: '/chatTest',
	name: 'chatTest',
	component: () => import('@/components/chat/loadIm')
}

]

const router = new VueRouter({
	mode: 'history', //hash
	scrollBehavior(to) {
		if (to.hash) {
			return {
				selector: to.hash
			}
		}
	},
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let needLogon = to.fullPath.startsWith("/Job_hunter") || to.fullPath.startsWith("/Enter_home") || to.fullPath.startsWith("/private");
	
	if (needLogon) {
		let token = sessionStorage.getItem('token');
		if (token) {
			axios({
				method: "post",
				url: `/api/sec/token/refreshToken/${token}`,
				headers: {
					token
				}
			}).then(res => {
				if (res && res.data && res.data.code == 0) {
					sessionStorage.setItem('token', res.data.token);
					next();
				} else {
					sessionStorage.setItem('token', "");
					next("/public/login");
				}
			}).catch(e => {
				console.log("beforeEach = ", e);
				sessionStorage.setItem('token', "");
				next("/public/login");
			});
		} else {
			next("/public/login");
		}
	} else {
		next();
	}
})

export default router
