import axios from 'axios'

export default {
	getProvinceList (callBack) {
		axios.get("/api/hr/dm/findSfList",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getProvinceList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getProvinceMap (callBack) {
		axios.get("/api/hr/dm/findSfMap",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getProvinceMap:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getCityList (callBack) {
		axios.get("/api/hr/dm/findSsList",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getCityList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getCityMap (callBack) {
		axios.get("/api/hr/dm/findSsMap",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getCityMap:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getAreaList (callBack) {
		axios.get("/api/hr/dm/findSqListAll",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getAreaList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getAreaMapAll (callBack) {
		axios.get("/api/hr/dm/findSqMapAll",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getAreaMapAll:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getJobCategoryFirstList (callBack) {
		axios.get("/api/hr/dm/findGwlbOneList",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getJobCategoryFirstList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getJobCategoryFirstMap (callBack) {
		axios.get("/api/hr/dm/findGwlbOneMap",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getJobCategoryFirstMap:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getJobCategorySecondList (callBack) {
		axios.get("/api/hr/dm/findGwlbOtList",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getJobCategorySecondList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getJobCategorySecondMap (callBack) {
		axios.get("/api/hr/dm/findGwlbOtMap",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getJobCategorySecondMap:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getJobCategoryThirdList (callBack) {
		axios.get("/api/hr/dm/findGwlbThListAll",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getJobCategoryThirdList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getJobCategoryThirdMap (callBack) {
		axios.get("/api/hr/dm/findGwlbThMapAll",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getJobCategoryThirdMap:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getfindDmList (callBack) {
		axios.get("/api/hr/dm/findDmList",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getfindDmList:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
	getfindDmMap (callBack) {
		axios.get("/api/hr/dm/findDmMap",  {
			params: {},
			headers: { "content-type": "application/json" }
		}).then(function(response) {
			// console.log('getfindDmMap:',response);
			callBack.success(response);
		}).catch(function(error) {
			console.log(error);
			callBack.fail(error);
		});
	},
}