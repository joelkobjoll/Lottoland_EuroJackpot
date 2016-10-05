import { Results } from './partials/results.ts';

document.addEventListener('DOMContentLoaded', function() {
	var results = new Results('https://media.lottoland.com/api/drawings/euroJackpot');
	
	results.draw_data(document.querySelector('#euroJackpot__results .container'));
}); 