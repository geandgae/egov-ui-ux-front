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
		axios.get(`${_app.apiUrl}/case/detail.do?nttId=${nttId}`).then(res => {
			let item = res.data.caseVO;
			switch(item.nttType) {
				case 'DS': item.nttTypeName = '디자인스타일'; break;
				case 'CO': item.nttTypeName = '컴포넌트'; break;
				case 'DP': item.nttTypeName = '기본 패턴'; break;
				case 'ID': item.nttTypeName = '아이덴티티'; break;
				case 'SP': item.nttTypeName = '서비스 패턴'; break;
			}
			item.frstRegisterPnttm = item.frstRegisterPnttm.replace(/-/g, '.');

			// 컨텐츠
			{
				let view = can.stache(document.getElementById('title-template').innerHTML);
				let html = view(item);

				let $title = document.getElementById('title');
				$title.innerHTML = '';
				$title.appendChild(html);
				document.getElementById('contents').innerHTML = _app.unescape(item.nttCn);
			}

			// 태그
			{
				
				let view = can.stache('{{#tags}}<a href="{{tagUrl}}" class="krds-btn-tag link">#{{tagNm}}</a>{{/tags}}');
				let html = view({
					tags: res.data.caseTagList
				});

				document.getElementById('tag-list').appendChild(html);
				if(res.data.caseTagList.length > 0) {
					document.getElementById('tag-list').parentElement.style.display = '';
				}
			}

		});
	},

	'#btn-back click': () => {
		history.back();
	}
});