import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';
import PaginationControl from '/resources/js/controls/pagination-control.js';

export default can.Control.extend({
	init: function() {
		console.log('init', 'ListControl');
		let me = this;
		me.pagination = new PaginationControl('#pagination', {
			callback: {
				caller: me,
				func: function(page) {
					me.addHistory(page);
				}
			}
		});

		if(location.hash.length === 0) {
			me.addHistory(1);
		} else {
			me.hashChanged();
		}
	},

	'{window} hashchange': function() {
		let me = this;
		me.hashChanged();
	},

	hashChanged: function() {},

	'#ntt-type change': function() {
		let me = this;
		me.categoryChanged();
	},

	categoryChanged: function() {
		let me = this;
		me.addHistory(1);
	},

	addHistory: function(page) {},

	loadList: function(params) {},

	'#search-wrd keypress': function(el, ev) {
		let me = this;
		if(ev.keyCode === 13) {
			me.search();
		}
	},

	'#btn-search click': function() {
		let me = this;
		me.search();
	},

	search: function() {
		let me = this;
		me.addHistory(1);
	},

	setPagination: function(res) {
		let me = this;

		// 페이지네이션 처리
		document.getElementById('cnt').innerHTML = res.data.resultCnt;
		me.pagination.update(res.data.paginationInfo);
		if(res.data.paginationInfo.totalRecordCount > 0) {
			document.getElementById('no-data').className = 'no-data hide';
		} else {
			let noDataMessage = ' 검색 결과가 없습니다.';
			if(res.data.searchVO.searchWrd) {
				noDataMessage = `검색어 <strong class="keyword">${res.data.searchVO.searchWrd}</strong>에 대한` + noDataMessage;
			}

			document.querySelector('#no-data .no-data-tit').innerHTML = noDataMessage;
			document.getElementById('no-data').className = 'no-data';
		}
	}
});