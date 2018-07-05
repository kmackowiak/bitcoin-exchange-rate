// Create a requestBtc variable and assign a new XMLHttprequest object to it.
var requestBtc = new XMLHttpRequest()
var requestPln = new XMLHttpRequest()


// Open a new connection, using the GET requestBtc on the URL endpoint
requestBtc.open('GET', 'https://api.coinpaprika.com/v1/ticker', true);
requestPln.open('GET', 'http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json', true)


requestPln.onload = function () {
    var usd = JSON.parse(this.response);
    var usdRate = (usd.rates[0].mid);
    //console.log(usdRate)
}


requestBtc.onload = function () {
    var btc = JSON.parse(this.response);
    var btcRate = (btc[0].price_usd);
    //console.log(btcRate);
}


var pln = document.getElementsByClassName("money__value--pln")[0];

pln.value = (btcRate);


console.log("dsds");



requestBtc.send();
requestPln.send();

