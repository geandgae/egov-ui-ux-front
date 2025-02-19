import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

export default can.Control.extend({
	init: function() {
		let me = this;
		me.loadData();
	},

	loadData: function() {
		let me = this;
		axios.get(`${_app.apiUrl}/popup/list.do`).then(res => {
			if(res.data.resultList.length > 0) {
				me.popup = res.data.resultList[0];
				if(_app.getCookie(me.popup.popupId) === undefined) {
					me.element.querySelector('.modal-title').innerHTML = me.popup.popupTitleNm;
					if(me.popup.popupType === 'T') {
						me.element.querySelector('.conts').innerHTML = me.popup.popupCn;
						me.element.querySelector('.banner-img').style.display = 'none';
					} else {
						me.element.querySelector('.conts').style.display = 'none';
						me.element.querySelector('.banner-img img').src = `${_app.fileUrl}?atchFileId=${me.popup.thumbImgId}&fileSn=0`;
					}
					krds_modal.openModal('main-popup');
				}
			}
		});
	},

	'.-btn-close click': function() {
		let me = this;

		if(me.element.querySelector('#not-today').checked) {
			_app.setCookie(me.popup.popupId, 'Y', {
				expires: new Date(new Date().getTime() + 3600000 * 24 * 1)
			});
		}

		krds_modal.closeModal('main-popup');
	}
});