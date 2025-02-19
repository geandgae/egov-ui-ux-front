import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';
import PopupControl from '/resources/js/controls/popup-control.js';
import PageFaqControl from '/resources/js/controls/page-faq-control.js';

export default can.Control.extend({
	init: function () {
		let me = this;
		new PopupControl('#main-popup');
		new PageFaqControl('.-page-faq');

		me.loadNotice();
		me.loadCase();

	},

	loadNotice: function () {
		let me = this;
		let params = {
			mainYn: 'Y'
		};

		axios.get(`${_app.apiUrl}/notice/list.do`, {params: params}).then(res => {
			if(res.data.resultList.length > 0) {
				let notice = res.data.resultList[0];
				let noticeAlert = document.getElementById('notice-alert');
				noticeAlert.innerHTML = `<p class="desc">${notice.nttSj} <a href="/html/site/community/community_01_01.html?nttId=${notice.nttId}" class="krds-btn medium text underline">확인해보세요.</a></p>`;
				noticeAlert.style.display = '';
			}
		});
	},

	loadCase: function () {
		let me = this;
		let params = {
			pageIndex:1,
			pageSize: 2
		};
		axios.get(`${_app.apiUrl}/case/list.do`, {params: params}).then(res => {
			if(res.data.resultList.length > 0) {
				// 데이터 조정
				for (let item of res.data.resultList) {
					item.frstRegisterPnttm = item.frstRegisterPnttm.replace(/-/g, '.');
					item.thumbImage = item.thumbImgId ? `${_app.fileUrl}?atchFileId=${item.thumbImgId}&fileSn=${item.fileSn}` : '/resources/img/pattern/sample/sample_main_news_thum1.jpg';
				}

				// 리스트 바인딩
				let view = can.stache(document.getElementById('case-template').innerHTML);
				let html = view({items: res.data.resultList.slice(0, 2)});

				let $list = document.getElementById('case-list');
				$list.innerHTML = '';
				$list.appendChild(html);

				document.querySelector('.-design-case').style.display = '';
			}
		});
	}
});

