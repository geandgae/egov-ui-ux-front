import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

axios.defaults.withCredentials = true;

export default can.Control.extend({
	init: function() {
		let me = this;
		me.loadData();

	},

	loadData: function() {
		let me = this;

		axios.get(`${_app.apiUrl}/inquiry/write.do`).then(res => {
			let options = can.stache('{{#codes}}<option value="{{code}}">{{codeNm}}</option>{{/codes}}')({codes: res.data.inquiryCodes});
			document.getElementById('type').appendChild(options);
		});
	},

	'input[name="public-yn"] click': function(el) {
		let me = this;

		if (el.value === 'Y') {
			document.getElementById('password').disabled = true;
		} else {
			document.getElementById('password').disabled = false;
		}
	},

	'#btn-back click': function() {
		let me = this;
		history.back();
	},

	'#btn-list click': function() {
		let me = this;
		location.href = 'community_06.html';
	},

	getBytes: function (text) {
		let bytes = (function(s,b,i,c){
			for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
			return b
		})(text);

		return bytes;
	},

	getMaxText: function(text, bytes) {
		let me = this;
		while(me.getBytes(text) > bytes) {
			text = text.slice(0, -1);
		}
		return text;
	},

	'#content input': function(el, ev) {
		let me = this;
		
		let content = el.value;
		let maxBytes = Number(el.dataset.maxBytes);
		let bytes = me.getBytes(content);

		if(maxBytes < bytes) {
			el.value = me.getMaxText(content, maxBytes);
			bytes = me.getBytes(el.value);
		}
		document.getElementById('byte-count').innerText = bytes;
	},

	makeData: function() {
		let me = this;
		let data = {};

		data.writer = document.getElementById('writer').value;
		data.type = document.getElementById('type').value;
		data.title = document.getElementById('title').value;
		data.content = document.getElementById('content').value;
		data.showYn = document.querySelector('input[name="public-yn"]:checked').value;
		data.password = document.getElementById('password').value;
		data.captchaInput = grecaptcha.getResponse();

		return data;
	},

	showError: function(id, show, focus, message) {
		let el = document.getElementById(id);
		let error = el.parentElement.querySelector('.form-hint-invalid')
		if(message) error.innerText = message;

		error.style.display = show ? '' : 'none';
		if(show) {
			el.closest('div.form-conts').classList.add('is-error');
			if(focus === true) {
				console.log(id, 'forcus');
				el.focus();
			}
		} else {
			el.closest('div.form-conts').classList.remove('is-error');
		}

		return !show && focus;
	},

	checkForm: function() {
		let me = this;
		let checked = true;
		let data = me.makeData();

		checked = me.showError('writer', data.writer.length === 0, checked);
		checked = me.showError('type', data.type.length === 0, checked);
		checked = me.showError('title', data.title.length === 0, checked);
		checked = me.showError('content', data.content.length === 0, checked, '내용을 입력해 주세요.');
		checked = me.showError('password', data.showYn === 'N' && data.password.length === 0, checked);
		checked = me.showError('recaptcha', data.captchaInput.length === 0, checked);

		return checked;
	},

	'#btn-submit click': function() {
		let me = this;
		let data = me.makeData();

		let checked = me.checkForm(data);

		if(checked === true) {
			data.nttId = '';
			axios.post(`${_app.apiUrl}/inquiry/insert.do`, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(res => {
				if(res.data.resultCode === 0) {
					document.getElementById('inquiry-form').style.display = 'none';
					document.querySelector('#inquiry-result p.value').innerHTML = data.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
					document.getElementById('inquiry-result').style.display = '';
				} else if(res.data.resultCode === 6666) {
					me.showError('content', true, true, '개인정보가 포함되어 문의 및 건의사항이 등록되지 않았습니다. 개인정보 삭제 후 등록 바랍니다.');
				} else if(res.data.resultCode === 7777) {
					me.showError('recaptcha', true, false, res.data.resultMsg);
				}
			}).catch(err => {});

		}
	},

	'#btn-refresh click': function() {
		let me = this;
		me.loadData();
	}
});