export default {
	apiUrl: location.host.startsWith('local.') ? 'http://devwww.krds.go.kr/api' : '/api',
	fileUrl: location.host.startsWith('local.') ? 'http://devwww.krds.go.kr/cmm/fms/FileDown.do' : '/cmm/fms/FileDown.do',
	unescape: (html) => {
		let map = {
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"'
		};
		for(let key in map) {
			html = html.replace(new RegExp(key, 'g'), map[key]);
		}

		return html;
	},
	history: (params) => {
		location.hash = JSON.stringify(params);
	},

	getCookie: (name) => {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},

	setCookie: (name, value, options = {}) => {
		options = {
			path: '/',
			...options
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}
		document.cookie = updatedCookie;
	}
};