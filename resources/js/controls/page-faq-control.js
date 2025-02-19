import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

export default can.Control.extend({
	init: function() {
		console.log('FAQ Control init');
		let me = this;
		me.loadList({
			pageUrl: location.pathname
		});
	},

	loadList: function(params) {
		let me = this;
		axios.get(`${_app.apiUrl}/faq/page/list.do`, {params: params}).then(res => {
			if(res.data.faqList.length > 0) {
				me.element.style.display = '';
				me.element.classList.replace('section-link-mute', 'section-link');

				for(let f of res.data.faqList) {
					f.nttCn = _app.unescape(f.nttCn);
				}

				// 리스트 바인딩
				let view = can.stache(document.getElementById('faq-template').innerHTML);
				let html = view({items: res.data.faqList});

				let $list = document.getElementById('faq-list');
				$list.innerHTML = '';
				$list.appendChild(html);

				// faq 내부에만 적용되는 어코디언 로직 추가
				me.initAccordian();
			}
			if(typeof quickNavTab !== 'undefined') quickNavTab();
		});
	},

	accordionButtons: null,

	initAccordian: function() {
		let me = this;
		me.accordionButtons = me.element.querySelectorAll(".btn-accordion");
		if (!me.accordionButtons.length) return;
		me.setupAccordions();
	},

	setupAccordions: function () {
		let me = this;
		me.accordionButtons.forEach((button, idx) => {
			const accordionContainer = button.closest(".krds-accordion");
			const accordionItems = accordionContainer.querySelectorAll(".accordion-item");
			const currentItem = button.closest(".accordion-item");
			const accordionContent = currentItem.querySelector(".accordion-collapse");
			const accordionType = accordionContainer.dataset.type || "singleOpen";
			const isOpen = accordionContainer.classList.contains("is-open");

			// 접근성 속성 초기값 설정
			me.setupAriaAttributes(button, accordionContent, idx);

			// 초기 오픈 상태 설정
			if (isOpen || currentItem.classList.contains("active")) {
				button.setAttribute("aria-expanded", "true");
				button.classList.add("active");
				currentItem.classList.add("active");
			}

			// accordionButton 이벤트
			button.addEventListener("click", () => {
				const isExpanded = button.getAttribute("aria-expanded") === "true";
				if (accordionType !== "multiOpen" && !currentItem.classList.contains("active")) {
					accordionItems.forEach((otherItem) => {
						const otherButton = otherItem.querySelector(".btn-accordion");
						otherButton.setAttribute("aria-expanded", "false");
						otherButton.classList.remove("active");
						otherItem.classList.remove("active");
					});
				}
				button.setAttribute("aria-expanded", !isExpanded);
				button.classList.toggle("active", !isExpanded);
				currentItem.classList.toggle("active", !isExpanded);
			});
		});
	},

	setupAriaAttributes: function(button, accordionContent, idx) {
		const uniqueIdx = `${idx}${Math.random().toString(36).substring(2, 9)}`;
		button.setAttribute("aria-expanded", "false");
		button.setAttribute("id", `accordionHeader-id-${uniqueIdx}`);
		button.setAttribute("aria-controls", `accordionCollapse-id-${uniqueIdx}`);
		accordionContent.setAttribute("role", "region");
		accordionContent.setAttribute("id", `accordionCollapse-id-${uniqueIdx}`);
		accordionContent.setAttribute("aria-labelledby", `accordionHeader-id-${uniqueIdx}`);
	}
});