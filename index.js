//BTCBUSD
//36291
//35764

async function process() {
    const axios = require("axios");
    const response = await axios.get("https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1m");
    const candle = response.data[499];
    const price = parseFloat(candle[4]);

    if (price >= 36291)
        console.log("Vender!");
    else if (price <= 35764)
        console.log("Comprar!");
    else
        console.log("Aguardar!");
}

setInterval(process, 1000);

process();
