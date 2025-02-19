import _app from '/resources/js/app.js';
import axios from '/resources/js/libs/axios.min.js';
import {can} from '/resources/js/libs/can@5/core.js';

export default can.Control.extend({
	defaults: {
		// 시멘틱 토큰 기본 정보
		semantic: [
			{
				name: 'color',
				icon: 'ico-color'
			},
			{
				name: 'font-size',
				icon: 'ico-typo',
				noSubtitle: true,
				compact: true
			},
			{
				name: 'gap',
				icon: 'ico-gap',
				noSubtitle: true
			},
			{
				name: 'gap-layout',
				icon: 'ico-gap',
				noSubtitle: true
			},
			{
				name: 'padding',
				icon: 'ico-padding',
				noSubtitle: true
			},
			{
				name: 'padding-card',
				icon: 'ico-padding',
				noSubtitle: true
			},
			{
				name: 'size-height',
				icon: 'ico-size',
				noSubtitle: true
			},
			{
				name: 'border-width',
				icon: 'ico-border',
				noSubtitle: true
			},
			{
				name: 'radius',
				icon: 'ico-radius',
				noSubtitle: true
			}
		],

		// 프리미티브 토큰 기본 정보
		primitive: [
			{
				name: 'color',
				icon: 'ico-color',
				compact: true
			},
			{
				name: 'typo',
				icon: 'ico-typo'
			},
			{
				name: 'number',
				icon: 'ico-number',
				noSubtitle: true
			}
		],
		debug: true
	}
},{
	init: function() {
		let me = this;
		console.warn = () => {};
		me.loadToken();
	},

	debug: function(...args) {
		let me = this;
		if(me.options.debug) {
			if(args.length === 1) {
				console.info(args[0]);
			} else {
				console.info(args);
			}
		}
	},

	/**
	 * 서버에서 토큰 조회
	 */
	loadToken: function() {
		let me = this;
		axios.get('/tokens/transformed_tokens.json').then(res => {
			me.originTokens = res.data;
			me.makeDocument(res.data);

			me.bindDocument('semantic');
			me.bindDocument('primitive');

			quickNavTab();
		}).catch(err => {});
	},

	/**
	 * 문서 작성
	 * @param data
	 */
	makeDocument: function(data) {
		let me = this;
		me.document = {};
		for(let section of ['semantic', 'primitive']) {
			let titles = [];
			let titleInfos = me.options[section];

			for(let titleInfo of titleInfos) {
				let subtitles = [];
				if(section === 'primitive') {
					if(titleInfo.name === 'color') {
						let color = {
							'light': {
								color: data['primitive']['color']['light']
							},
							'high-contrast': {
								color: data['primitive']['color']['high-contrast']
							}
						};

						subtitles = me.queryItems(color, titleInfo, 'light', 'high-contrast');
					} else {
						subtitles = me.queryItems(data, titleInfo, 'primitive');
					}
				} else {
					switch (titleInfo.name) {
						case 'color':
						case 'border-width':
							subtitles = me.queryItems(data, titleInfo, 'mode-light', 'mode-high-contrast');
							break;
						case 'gap':
						case 'padding':
						case 'size-height':
						case 'radius':
							subtitles = me.queryItems(data, titleInfo, 'semantic');
							break;
						default:
							subtitles = me.queryItems(data, titleInfo, 'responsive-pc', 'responsive-mobile');
							break;
					}
				}

				if(titleInfo.name === 'padding-card') titleInfo.name = 'padding-layout';

				if(titleInfo.noSubtitle !== true) subtitles[0].first = true;

				titles.push({
					name: titleInfo.name.charAt(0).toUpperCase() + titleInfo.name.slice(1),
					icon: titleInfo.icon,
					subtitles: subtitles
				});
			}
			me.document[section] = titles;
		}
	},

	queryNode: function(data, names) {
		let me = this;
		if(typeof names === 'string') names = names.match(/[^{.}]+/g);

		let node = data;
		for(let name of names) {
			node = node[name];
		}
		return node === undefined ? key : node;
	},

	/**
	 * 토큰 탐색
	 * @param data
	 * @param titleName
	 * @param modes
	 * @returns {*[]}
	 */
	queryItems: function(data, titleInfo, ...modes) {
		let me = this;

		let titleName = titleInfo.name;
		let subtitles = [];
		let subtitleInfos = data[modes[0]][titleName];

		if(titleInfo.noSubtitle === true) {
			let subtitle = {
				name: false,
				items: []
			}

			for(let subtitleName in subtitleInfos) {
				if(titleInfo.compact === true) {
					for (let itemName in subtitleInfos[subtitleName]) {
						let item = {
							name: [titleName, subtitleName, itemName].join('-'),
							values: []
						};

						me.setItem(data, item, modes, titleName, subtitleName, itemName);
						subtitle.items.push(item);
					}
				} else {
					let item = {
						name: [titleName, subtitleName].join('-'),
						values: []
					}

					me.setItem(data, item, modes, titleName, subtitleName);
					subtitle.items.push(item);
				}
			}
			subtitles.push(subtitle);
		} else {
			for(let subtitleName in subtitleInfos) {
				let subtitle = {
					name: subtitleName,
					items: []
				}

				// Typo 서브타이틀 조정
				if(subtitle.name === 'font') subtitle.name = 'font-type';

				for (let itemName in subtitleInfos[subtitleName]) {
					let item = {
						name: [titleName, subtitleName, itemName].join('-'),
						values: []
					};
					me.setItem(data, item, modes, titleName, subtitleName, itemName);
					subtitle.items.push(item);
				}
				subtitles.push(subtitle);

			}
		}
		return subtitles;
	},

	setItem: function(data, item, modes, ...names) {
		let me = this;

		for (let mode of modes) {
			let value = me.getValue(me.queryNode(data, [mode, ...names]));

			let prefix = mode.replace('mode-', '').replace('responsive-', '').replace('semantic', '').replace('primitive', '');
			value.name = prefix.length > 0 ? [prefix, ...names].join('-') : names.join('-');

			// alpha의 opacity값 처리
			if(value.name.match('-color-alpha-')) {
				value.opacity = value.name.replace('light-', '')
					.replace('high-contrast-', '')
					.replace('color-alpha-', '')
					.replace('black', '')
					.replace('white', '');
			}
			item.values.push(value);
		}
		item.values[0].first = true;
	},

	/**
	 * 디자인 토큰 최종 노드(value) 조회
	 * @param leaf
	 * @param item
	 * @param valueNames
	 */
	getValue: function(value) {
		let me = this;
		try {
			// primitive 참조값인 경우
			if (value.value !== undefined && value.value.indexOf('{') === 0) {
				value.label = value.value.replace('{primitive.', '').replace('}', '').replace(/\./g, '-');
				value.value = me.queryNode(me.originTokens, value.value).value;
			} else {
				value.item = {
					value: value.value,
					type
				};

				if(value.value !== undefined && value.value.indexOf('#') === 0) {
					value.type = 'color';
				}
			}

			// 색상 대문자 처리
			if(value.type === 'color') {
				value.value = value.value.toUpperCase();
			}

		} catch (e) {}
		return value;
	},

	/**
	 * 화면에 토큰 출력
	 * @param section
	 */
	bindDocument: function(section) {
		let me = this;
		let view = can.stache(document.querySelector(`#tmpl-${section}`).innerHTML);
		let html = view({document: me.document[section]});

		document.getElementById(section).appendChild(html);

	},

	'button.token-copy click': function(el, ev) {
		let me = this;
		let token = el.querySelector('span').textContent;

		// 텍스트를 임시로 저장할 input 요소를 생성
		let tempInput = document.createElement('input');
		tempInput.value = '--krds-' + token;
		document.body.appendChild(tempInput);

		// 임시 input 요소의 텍스트를 선택
		tempInput.select();
		tempInput.setSelectionRange(0, 99999); // 모바일 공통

		// 텍스트를 클립보드에 복사
		document.execCommand('copy');

		// 임시 input 요소를 문서에서 제거
		document.body.removeChild(tempInput);

		// 복사 완료 알림 표시
		alert('복사되었습니다.');
	},

	'button.btn-tab click': function() {
		let me = this;
		me.search();
	},

	'#keyword keypress': function(el, ev) {
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
		let keyword = document.getElementById('keyword').value.toLowerCase();
		let section = document.querySelector('ul[role="tablist"] li.active').id === 'tabInfo01' ? 'semantic' : 'primitive';
		me.debug('keyword=', keyword);

		let results = document.querySelectorAll(`#${section} [data-keyword*="${keyword}"]`);
		me.debug('results=', results);

		document.querySelectorAll(`#${section} [data-type]`).forEach(node => {
			node.style.display = keyword.length > 0 ? 'none' : '';
		});

		results.forEach(node => {
			me.display(node);
			node.querySelectorAll('[data-type]').forEach(child => {
				child.style.display = '';
			});
		});

		// quick nav 조정
		document.querySelectorAll(`#${section} [data-type="title"]`).forEach(title => {
			title.id = '';
			if(title.style.display === 'none') {
				title.classList.replace('section-link', 'section-link-mute');
			} else {
				title.classList.replace('section-link-mute', 'section-link');
			}
		});
		quickNavTab();
	},

	display: function(node) {
		let me = this;
		me.debug('display...', arguments);
		node.style.display = '';

		let dataType = node.getAttribute('data-type');
		let parentDataType = '';

		if(dataType === 'label') {
			parentDataType = 'value';
		} else if(dataType === 'value') {
			parentDataType = 'item';
		} else if(dataType === 'item') {
			parentDataType = 'subtitle';
		} else if(dataType === 'subtitle') {
			parentDataType = 'title';
		}
		me.debug('parentDataType=', parentDataType);

		let parent = node.closest(`[data-type="${parentDataType}"]`);
		me.debug('parent=', parent);
		if(parent) {
			me.display(parent);
		}
	}
});