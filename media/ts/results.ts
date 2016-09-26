class Results {
    private url: string;

    constructor(url) {
        this.url = url;
    }

    private getData(url) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp'
            }).done(resolve).fail(reject);
        });
    }

    public display() {
        this.getData(this.url).then(function(data) {
            console.log('Success!', data);
        }, function(error) {
            console.log('Failed!', error);
        });
    }
}

var results = new Results('https://media.lottoland.com/api/drawings/euroJackpot');

results.display();