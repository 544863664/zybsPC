import moment from 'moment';

export default {
	moment() {
		return moment().format();
	},
	moment1() {
		return moment().format('X');
	},
	moment2(time) {
		return moment(time).format('X');
	},

	formatDate1(date) {
		if (date) {
			return moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
		} else {
			return "";
		}
	},

	formatDate2(date) {
		if (date) {
			return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss');
		} else {
			return "";
		}
	},

	formatDate3(date) {
		if (date) {
			return moment(date).format('YYYY-MM-DD');
		} else {
			return "";
		}
	},

	formatDate4(date) {
		if (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		} else {
			return "";
		}
	},
	formatDate5(date) {
		if (date) {
			return moment(date).format('YYYY-MM');
		} else {
			return "";
		}
	},

}
