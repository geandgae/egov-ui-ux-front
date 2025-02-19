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
		axios.get(`${_app.apiUrl}/notice/list.do`, {params: params}).then(res => {
			// 데이터 조정
			for(let item of res.data.resultList) {
				item.frstRegisterPnttm = item.frstRegisterPnttm.replace(/-/g, '.');
				switch (item.nttType) {
					case '공지': item.keyword = 'notice'; break;
					case '행사': item.keyword = 'event'; break;
					case '업데이트': item.keyword = 'update'; break;
				}
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
				for(let code of res.data.noticeCodes) {
					options += `<option value="${code.code}">${code.codeNm}</option>`;
				}
				document.querySelector('#ntt-type').innerHTML = options;
			}

			// 페이지네이션 처리
			me.setPagination(res);
		});
	}
});