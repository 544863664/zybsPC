import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '../api/baseDmApi.js';

export default new Vuex.Store({
	state: {
		Jobseekers: '',//求职者
		Jobseekersimg: '',
		HR: '', //HR
		EnterLogo: '',
		httptoken: '',
		roleId: '',
		userId: '',
		ProvinceList: [],
		ProvinceMap: {},
		CityList: {},
		CityMap: {},
		AreaList: {},
		AreaMap: {},
		JobCategoryFirstList: [],
		JobCategoryFirstMap: {},
		JobCategorySecondList: {},
		JobCategorySecondMap: {},
		JobCategoryThirdList: {},
		JobCategoryThirdMap: {},
		findDmList: {},
		findDmMap: {},
	},
	getters: {
		getToken(state) {
			let token = state.httptoken || sessionStorage.getItem('token')
			return token
		},
		getroleId(state) {
			let roleId = state.roleId ? state.roleId : sessionStorage.getItem('roleId')
			return roleId
		},
		getuserId(state) {
			let userId = state.userId ? state.userId : sessionStorage.getItem('userId')
			return userId
		},
		getJobseekers(state) {
			let Jobseekers = state.Jobseekers ? state.Jobseekers : sessionStorage.getItem('Jobseekers')
			return Jobseekers
		},
		getJobseekersimg(state) {
			let Jobseekersimg = state.Jobseekersimg ? state.Jobseekersimg : sessionStorage.getItem('qzimgUrl')
			return Jobseekersimg
		},
		getHR(state) {
			let HR = state.HR ? state.HR : sessionStorage.getItem('HR')
			return HR
		},
		getHREnterLogo(state) {
			let EnterLogo = state.EnterLogo ? state.EnterLogo : sessionStorage.getItem('hrimgUrl')
			return EnterLogo
		},
	},
	mutations: {
		updateJobseekersimg(state, data) {
			if (data) {
				state.Jobseekersimg = data;
				sessionStorage.setItem('qzimgUrl', data);
			}
		},
		updateJobseekers(state, data) {
			if (data) {
				state.Jobseekers = data;
				sessionStorage.setItem('Jobseekers', data);
			}
		},
		updateHR(state, data) {
			if (data) {
				state.HR = data;
				sessionStorage.setItem('HR', data);
			}
		},
		updateHREnterLogo(state, data) {
			if (data) {
				state.EnterLogo = data;
				sessionStorage.setItem('hrimgUrl', data);
			}
		},
		updatehttptoken(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.httptoken = data.data.token;
				state.roleId = data.data.roleId;
				state.userId = data.data.userId;

				sessionStorage.setItem('token', data.data.token);
				sessionStorage.setItem('roleId', data.data.roleId);
				sessionStorage.setItem('userId', data.data.userId);
			}
		},
		updateProvinceList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.ProvinceList = data.data.sfList;
			}
		},
		updateProvinceMap(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.ProvinceMap = data.data.sfMap;
			}
		},
		updateCityList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.CityList = data.data.ssList;
			}
		},
		updateCityMap(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.CityMap = data.data.ssMap;
			}
		},
		updateAreaList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.AreaList = data.data.sqList;
			}
		},
		updateAreaMapAll(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.AreaMap = data.data.sqMap;
			}
		},
		updateJobCategoryFirstList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.JobCategoryFirstList = data.data.gwlbList;
			}
		},
		updateJobCategoryFirstMap(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.JobCategoryFirstMap = data.data.gwlbMap;
			}
		},
		updateJobCategorySecondList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.JobCategorySecondList = data.data.gwlbotList;
			}
		},
		updateJobCategorySecondMap(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.JobCategorySecondMap = data.data.gwlbotMap;
			}
		},
		updateJobCategoryThirdList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.JobCategoryThirdList = data.data.gwlbthList;
			}
		},
		updateJobCategoryThirdMap(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.JobCategoryThirdMap = data.data.gwlbthMap;
			}
		},
		updatefindDmList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.findDmList = data.data.dmMapList;
			}
		},
		updatefindDmMap(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.findDmMap = data.data.dmMap;
			}
		},
	},
	actions: {
		getBaseDm({ commit }) {
			api.getProvinceList({
				success: data => {
					commit("updateProvinceList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getProvinceMap({
				success: data => {
					commit("updateProvinceMap", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getCityList({
				success: data => {
					commit("updateCityList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getCityMap({
				success: data => {
					commit("updateCityMap", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getAreaList({
				success: data => {
					commit("updateAreaList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getAreaMapAll({
				success: data => {
					commit("updateAreaMapAll", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getJobCategoryFirstList({
				success: data => {
					commit("updateJobCategoryFirstList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getJobCategoryFirstMap({
				success: data => {
					commit("updateJobCategoryFirstMap", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getJobCategorySecondList({
				success: data => {
					commit("updateJobCategorySecondList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getJobCategorySecondMap({
				success: data => {
					commit("updateJobCategorySecondMap", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getJobCategoryThirdList({
				success: data => {
					commit("updateJobCategoryThirdList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getJobCategoryThirdMap({
				success: data => {
					commit("updateJobCategoryThirdMap", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getfindDmList({
				success: data => {
					commit("updatefindDmList", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
			api.getfindDmMap({
				success: data => {
					commit("updatefindDmMap", data);
				},
				fail: data => {
					console.log(" = ", data);
				}
			});
		}
	},
	modules: {}
})
