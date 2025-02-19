import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

export default can.Control.extend({
	init: function() {
		let me = this;
		const urlParams = new URLSearchParams(new URL(location.href).search);
		// 'nttId' 값을 추출
		const nttId = urlParams.get('nttId');

		me.loadData(nttId);
	},

	loadData: function(nttId) {
		axios.get(`${_app.apiUrl}/notice/detail.do?nttId=${nttId}`).then(res => {
			let notice = res.data.notice;
			switch(notice.nttType) {
				case 'E': notice.nttTypeName = '행사'; break;
				case 'N': notice.nttTypeName = '공지'; break;
				case 'U': notice.nttTypeName = '업데이트'; break;
			}
			notice.frstRegisterPnttm = notice.frstRegisterPnttm.replace(/-/g, '.');

			// 컨텐츠
			{
				let view = can.stache(document.getElementById('title-template').innerHTML);
				let html = view(notice);

				let $title = document.getElementById('title');
				$title.innerHTML = '';
				$title.appendChild(html);
			}

			document.getElementById('contents').innerHTML = _app.unescape(notice.nttCn);

			// 첨부파일
			{
				let view = can.stache(document.getElementById('file-template').innerHTML);
				let html = view({files: res.data.fileList});
				document.getElementById('file-list').innerHTML = '';
				document.getElementById('file-list').appendChild(html);
				document.getElementById('attach-file').style.display = res.data.fileList.length > 0 ? 'block' : 'none';
			}

		});
	},

	'#file-list button[data-atch-file-id] click': function(el) {
		let data = el.dataset;
		location.href = `${_app.fileUrl}?atchFileId=${data.atchFileId}&fileSn=${data.fileSn}`;
	},

	'#btn-back click': () => {
		if(document.referrer.indexOf('/index.html')) {
			location.href = '/html/site/community/community_01.html';
		} else {
			history.back();
		}
	}
});