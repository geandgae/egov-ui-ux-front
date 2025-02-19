import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';
import ListControl from '/resources/js/controls/list-control.js';

export default ListControl.extend({
	init: function() {
		let me = this;
		ListControl.prototype.init.call(me);
	},

	hashChanged: function() {
		let me = this;

		let params = JSON.parse(decodeURI(location.hash.substring(1)));
		me.loadList(params);

		document.querySelector('#ntt-type').value = params.nttType;
		document.querySelector('#search-wrd').value = params.searchWrd;
	},

	addHistory: function(page) {
		let params = {};
		params.pageIndex = page;
		params.nttType = document.querySelector('#ntt-type').value;
		params.searchWrd = document.querySelector('#search-wrd').value;

		_app.history(params);
	},

	loadList: function(params) {
		let me = this;
		axios.get(`${_app.apiUrl}/faq/list.do`, {params: params}).then(res => {
			for(let faq of res.data.resultList) {
				faq.nttCn = _app.unescape(faq.nttCn);
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
				for(let code of res.data.faqCodes) {
					options += `<option value="${code.code}">${code.codeNm}</option>`;
				}
				document.querySelector('#ntt-type').innerHTML = options;
			}

			// 페이지네이션 처리
			me.setPagination(res);
			document.querySelector('#list').style.display = (res.data.paginationInfo.totalRecordCount > 0) ? '' : 'none';

			krds_accordion.init();
		});
	},

	'ul.attached-file-list button click': function(el) {
		let data = el.dataset;
		location.href = `${_app.fileUrl}?atchFileId=${data.atchFileId}&fileSn=${data.fileSn}`;
	}
});