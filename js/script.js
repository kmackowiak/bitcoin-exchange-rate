


// __________ Initial global variables

// Section containing inputs
setBtc = document.getElementsByClassName("set-btc")[0];
setPln = document.getElementsByClassName("set-pln")[0];

// Inputs to enter values BTC -> PLN
btcInput = document.getElementsByClassName("money__value--btc")[0];
plnInput = document.getElementsByClassName("money__value--pln")[0];

// Inputs to enter values PLN -> BTC
btcInputReverse = document.getElementsByClassName("money__value--btc")[1];
plnInputReverse = document.getElementsByClassName("money__value--pln")[1];

// Display universal exchange rate
usdBtc = document.getElementsByClassName("footer__value")[0];
plnUsd = document.getElementsByClassName("footer__value")[1];

// Buttons to run calculate
moneyButtonBtc = document.getElementsByClassName("money__button--btc")[0];
moneyButtonPln = document.getElementsByClassName("money__button--pln")[0];

// Button to reverse calculate
moneyButtonReverse = document.getElementsByClassName("money__button--reverse")[0];

// Assigning a new object XMLHttpRequest to a variable
var requestBtc = new XMLHttpRequest()
var requestUsd = new XMLHttpRequest()



// __________ Open a new connection, using the GET requestBtc / requestUsd on the URL endpoint
requestBtc.open('GET', 'https://api.coinpaprika.com/v1/ticker', true);
requestUsd.open('GET', 'http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json', true)



// __________ Get actual exchange rate for BTC -> USD and USD -> PLN
function getRate (){
    // For BTC -> USD
    requestBtc.onload = function () {
        var btc = JSON.parse(this.response);
        var btcRate = (parseFloat((btc[0].price_usd))).toFixed(2);
        console.log(btcRate);
        usdBtc.innerHTML = btcRate;
    }
    // For USD -> PLN
    requestUsd.onload = function () {
        var usd = JSON.parse(this.response);
        var usdRate = (parseFloat((usd.rates[0].mid))).toFixed(2);
        console.log(usdRate);
        plnUsd.innerHTML = usdRate;
    }
}



// _______ Toggler for direction of exchange
function reverseMoney() {
    if (setPln.classList.contains("hidden")){
        moneyButtonBtc.classList.add("hidden");
        setBtc.classList.add("hidden");
        moneyButtonPln.classList.remove("hidden");
        setPln.classList.remove("hidden");
        plnInput.value = "";
        btcInput.value = "";
    }
    else {
        setPln.classList.add("hidden");
        setBtc.classList.remove("hidden");
        moneyButtonPln.classList.add("hidden");
        moneyButtonBtc.classList.remove("hidden");
        plnInputReverse.value = "";
        btcInputReverse.value = "";
    }
}



// _______ Calculate rate
// For BTC -> PLN
function calculateBtc() {
    var usdBtcVal = (usdBtc.innerHTML).toString();
    var plnUsdVal = (plnUsd.innerHTML).toString();
    btcInputValue = (btcInput.value);
    btcInputValue.replace(",", ".");
    btcInputValue = btcInputValue.replace(",", ".");
    btcInputValue = parseFloat(btcInputValue);
    plnInput.value = (btcInputValue * usdBtcVal * plnUsdVal).toFixed(2);
}
// For PLN -> BTC
function calculatePln() {
    var usdBtcValReverse = (usdBtc.innerHTML).toString();
    var plnUsdValReverse = (plnUsd.innerHTML).toString();
    plnInputValueReverse = (plnInputReverse.value);
    plnInputValueReverse.replace(",", ".");
    plnInputValueReverse = plnInputValueReverse.replace(",", ".");
    plnInputValueReverse = parseFloat(plnInputValueReverse);
    btcInputReverse.value = (plnInputValueReverse / (usdBtcValReverse * plnUsdValReverse)).toFixed(8);
}


getRate()
moneyButtonReverse.addEventListener("click", reverseMoney);
moneyButtonBtc.addEventListener("click", calculateBtc);
moneyButtonPln.addEventListener("click", calculatePln);
requestBtc.send();
requestUsd.send();

