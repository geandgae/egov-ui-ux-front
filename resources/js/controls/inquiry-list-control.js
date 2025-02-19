import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';
import ListControl from '/resources/js/controls/list-control.js';

export default ListControl.extend({
	init: function() {
		let me = this;
		ListControl.prototype.init.call(me);
	},

	//@Override
	hashChanged: function() {
		let me = this;
		console.log('hashChanged', 'NoticeListControl');
		let params = JSON.parse(decodeURI(location.hash.substring(1)));
		me.loadList(params);

		document.querySelector('#ntt-type').value = params.nttType;
		document.querySelector('#search-wrd').value = params.searchWrd;
	},

	//@Override
	addHistory: function(page) {
		console.log('list', 'NoticeListControl');
		let params = {};
		params.pageIndex = page;
		params.nttType = document.querySelector('#ntt-type').value;
		params.searchWrd = document.querySelector('#search-wrd').value;

		_app.history(params);
	},

	//@Override
	loadList: function(params) {
		let me = this;
		axios.get(`${_app.apiUrl}/inquiry/list.do`, {params: params}).then(res => {
			// 데이터 조정
			for(let item of res.data.resultList) {
				item.frstRegisterPnttm = item.frstRegisterPnttm.replace(/-/g, '.');				
			}

			// 리스트 바인딩
			let view = can.stache(document.getElementById('list-template').innerHTML);
			let html = view({items: res.data.resultList});

			let $list = document.getElementById('list');
			$list.innerHTML = '';
			$list.appendChild(html);

			// 카테고리 설정(최초 1회)
			if(document.querySelectorAll('#ntt-type option').length === 1) {
				let options = '<option value="">전체</option>';
				for(let code of res.data.inquiryCodes) {
					options += `<option value="${code.code}">${code.codeNm}</option>`;
				}
				document.querySelector('#ntt-type').innerHTML = options;
			}

			// 페이지네이션 처리
			me.setPagination(res);
		});
	},

	openConfirmModal: function(nttId) {
		document.getElementById('view-confirm-modal').dataset.nttId = nttId;
		document.getElementById('writer').value = '';
		document.getElementById('password').value = '';
		document.getElementById('view-confirm-modal').querySelectorAll('div.form-hint-invalid').forEach(el => el.style.display = 'none');
		document.getElementById('view-confirm-modal').querySelectorAll('div.form-conts').forEach(el => el.classList.remove('is-error'));

		krds_modal.openModal('view-confirm-modal');
	},

	'#list a[data-ntt-id] click': function(el, ev) {
		let me = this;
		let nttId = el.dataset.nttId;
		let showYn = el.dataset.showYn;

		if(showYn === 'N') {
			me.openConfirmModal(nttId);
		} else {
			location.href = 'community_06_03.html?nttId=' + nttId;
		}
	},

	'#btn-inquiry click': function() {
		let me = this;
		location.href = 'community_06_01.html';
	},

	showError: function(id, show, message) {
		let el = document.getElementById(id);
		let error = el.parentElement.closest('div.form-group').querySelector('.form-hint-invalid')
		if(message) error.innerText = message;

		error.style.display = show ? '' : 'none';
		if(show) {
			el.closest('div.form-conts').classList.add('is-error');
		} else {
			el.closest('div.form-conts').classList.remove('is-error');
		}

		return !show;
	},

	'#btn-confirm click': function() {
		let me = this;

		let checked = true;
		let data = {};
		data.nttId = document.getElementById('view-confirm-modal').dataset.nttId;
		data.writer = document.getElementById('writer').value;
		data.password = document.getElementById('password').value;

		checked = me.showError('writer', data.writer.length === 0, '이름을 입력해주세요.') && checked;
		checked = me.showError('password', data.password.length === 0, '비밀번호를 정확히 입력해주세요.') && checked;

		if(checked === true) {
			axios.post(`${_app.apiUrl}/inquiry/verify.do`, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(res => {
				if(res.data.resultCode === 0) {
					krds_modal.closeModal('view-confirm-modal');
					location.href = `community_06_03.html?nttId=${data.nttId}&writer=${data.writer}&password=${data.password}`;
				} else if(res.data.resultCode.startsWith('작성자')) {
					me.showError('writer', true, res.data.resultCode);
				} else if(res.data.resultCode.startsWith('비밀번호')) {
					me.showError('password', true, res.data.resultCode);
				}
			});
		}
	}
});