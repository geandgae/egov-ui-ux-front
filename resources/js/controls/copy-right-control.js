import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

export default can.Control.extend({
	init: function() {
		let me = this;
		me.loadData();
	},

	loadData: function() {
		let me = this;
		axios.get(`${_app.apiUrl}/cpyrht/detail.do`).then(res => {
			let html = document.getElementById('html').innerHTML;			
			document.getElementById('html').innerHTML = _app.unescape(res.data.result.cpyrhtPrtcCn) + html;
		});
	}
});