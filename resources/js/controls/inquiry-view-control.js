import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

axios.defaults.withCredentials = true;

export default can.Control.extend({
	init: function() {
		let me = this;

		const urlParams = new URLSearchParams(new URL(location.href).search);
		const nttId = urlParams.get('nttId');
		const writer = urlParams.get('writer');
		const password = urlParams.get('password');
		
		me.nttId = nttId;
		me.loadData(nttId, writer, password);

	},

	loadData: function(nttId, writer, password) {
		let me = this;
		let params = {};
		params.nttId = nttId;
		params.writer = writer || '';
		params.password = password || '';

		axios.post(`${_app.apiUrl}/inquiry/detail.do`, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			if(res.data.resultCode !== undefined) {
				alert(res.data.resultCode);
				history.back();
			} else {
				let inquiry = res.data.inquiry;

				inquiry.frstRegisterNm = inquiry.frstRegisterNm[0] + '*'.repeat(inquiry.frstRegisterNm.length - 1);
				inquiry.frstRegisterPnttm = inquiry.frstRegisterPnttm.replace(/-/g, '.');
				inquiry.nttCn = inquiry.nttCn.replace(/(?:\r\n|\r|\n)/g, '<br>');
				if(inquiry.answer) inquiry.answer = inquiry.answer.replace(/(?:\r\n|\r|\n)/g, '<br>');

				let view = can.stache(document.getElementById('view-template').innerHTML);
				let html = view(inquiry);

				document.getElementById('contents').appendChild(html);
			}
		});
	},

	'#btn-back click': function() {
		let me = this;
		history.back();
	},

	'#btn-delete click': function() {
		let me = this;
		if(confirm('문의 및 건의를 삭제하시겠습니까?')) {
			axios.post(`${_app.apiUrl}/inquiry/delete.do?nttId=${me.nttId}`).then(res => {
				if(res.data.resultCode === 0) {
					alert('문의 및 건의가 삭제되었습니다.');
					location.href = '/html/site/community/community_06.html';
				} else {
					alert(res.data.resultMsg);
				}

			}).catch(err => {

			});
		}
	}
});