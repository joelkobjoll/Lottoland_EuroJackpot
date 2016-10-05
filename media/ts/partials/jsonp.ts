export var getJSONP = function(url: any) {
	let id: number = 0;

	return new Promise(function(resolved: any, rejected: any) {
		let callback = '_jsonp_' + id++;

		(window as any)[callback] = function(data: any) {
			let element: any = document.getElementById(callback);

			element.parentNode.removeChild(element);

			delete (window as any)[callback];

			resolved(data);
		};

		let src: string = url + (url.indexOf('?') > 0 ? '&' : '?') + 'callback=' + callback;
		let script: any = document.createElement('script');

		script.src = src;
		script.id = callback;
		script.addEventListener('error', rejected);

		document.getElementsByTagName('head')[0].appendChild(script);
	});
};