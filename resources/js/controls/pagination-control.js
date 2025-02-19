import {can} from '/resources/js/libs/can@5/core.js';

export default can.Control.extend({
	defaults: {
		margin: 3,
		callback: false
	}
},{
	init: function() {
		let me = this;
		me.template = document.querySelector('#pagination .-tmpl').innerHTML;
	},

	update: function(info) {
		let me = this;
		let data = {};
		data.pages = [];
		me.page = info.currentPageNo;

		let startPage, endPage;

		if(info.totalPageCount < 12) {
			startPage = 1;
			endPage = info.totalPageCount

			data.next = data.prev = false;
		} else {
			startPage = me.page - me.options.margin;
			endPage = me.page + me.options.margin;

			if(startPage < 1) {
				startPage = 1;
			}

			if(endPage > info.totalPageCount) {
				endPage = info.totalPageCount;
			}

			if(startPage < 4) {
				startPage = 1;
				endPage = startPage + me.options.margin * 2 + 2;
				data.first = false;
				data.last = info.totalPageCount;
			} else if(endPage === info.totalPageCount || endPage === (info.totalPageCount - 1)) {
				endPage = info.totalPageCount;
				startPage = endPage - me.options.margin * 2 - 2;
				data.first = 1;
				data.last = false;
			} else {
				data.first = 1;
				data.last = info.totalPageCount;
			}

			data.prev = me.page - 1;
			if(data.prev < 1) data.prev = 1;

			data.next = me.page + 1;
			if(data.next > info.totalPageCount) data.next = info.totalPageCount;

			if(startPage !== 1) data.first = 1;
			if(endPage !== info.totalPageCount) data.last = info.totalPageCount;
		}

		if(endPage > info.totalPageCount) endPage = info.totalPageCount;
		for(let no = startPage; no <= endPage; no++) {
			data.pages.push({
				page: no,
				active: (no === me.page) ? 'active' : ''
			});
		}

		let view = can.stache(me.template);
		let html = view(data);

		me.element.style.display = '';
		me.element.innerHTML = '';
		me.element.appendChild(html);

		me.element.style.display = (info.totalRecordCount === 0) ? 'none' : '';
	},

	'a[data-page] click': function(el) {
		let me = this;
		let page = el.dataset.page;
		
		if(me.options.callback !== false) {
			me.options.callback.func.call(me.options.callback.caller, page);
		}
	}
});