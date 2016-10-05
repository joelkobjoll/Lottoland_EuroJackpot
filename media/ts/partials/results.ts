import { getJSONP } from '../partials/jsonp.ts';

declare var require: any

export class Results {
	private url: string;

	constructor(url: any) {
		this.url = url;
	}

	private number_format(n: any) {
	    var parts=n.toString().split(".");

	    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	}

	private number_roman(n: number) {
		let roman: string[] = ['Nulla', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

		return roman[n];
	}

	private get_data() {
		return getJSONP(this.url);
	}

	public draw_data(element: any) {	
		var template = require("../templates/results.handlebars");
		var results = this;

		this.get_data().then(function(data: any) {			
			let latest: any = data['last'];
			let sortedKeys = Object.keys(latest['odds']).sort(function(a, b) {
				return  (a as any).replace(/\D/g,'') - (b as any).replace(/\D/g,'');
			});

			latest['oddsSorted'] = [];

			for(let i: any = 1; i < sortedKeys.length; i++) {
				let key = sortedKeys[i];
				let value = latest['odds'][key];

				latest['oddsSorted'].push({
					title: 'Tier ' + results.number_roman(i),
					prize: '€' + results.number_format((value.prize / 100).toFixed(2)),
					winners: results.number_format(value.winners) + 'x'
				});
			};
			
			let html: any = template(latest);

			if(element) element.insertAdjacentHTML('beforeend', html)
		}, function(error: any) {
			console.log(error); 
		});
	}
}