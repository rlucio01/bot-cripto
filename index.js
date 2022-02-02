//BTCBUSD
//36291
//35764

const CHAT_ID = 1733364144;
let lastmessage = "";

function calcRSI(closes) {
    let altas = 0;
    let baixas = 0;

    for (let i = closes.length - 15; i < closes.length - 1; i++) {
        const diferenca = closes[i] - closes[i - 1];
        if (diferenca >= 0)
            altas += diferenca;
        else
            baixas -= diferenca;
    }

    const forcaRelativa = altas / baixas;
    return 100 - (100 / (1 + forcaRelativa));
}

async function process() {
    const { Telegraf } = require("telegraf");
    const bot = new Telegraf("seu-token-aqui");

    const axios = require("axios");

    const response = await axios.get("https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1m");
    const candle = response.data[499];
    const price = parseFloat(candle[4]);

    const closes = response.data.map(candle => parseFloat(candle[4]));
    const rsi = calcRSI(closes);
    console.log("RSI: " + rsi);
    console.log("Preço: " + price);

    if (rsi >= 70 && lastmessage !== "Sobrecomprado") {
        lastmessage = "Sobrecomprado";
        console.log(lastmessage);
        bot.telegram.sendMessage(CHAT_ID, lastmessage);
    }
    else if (rsi <= 30 && lastmessage !== "Sobrevendido") {
        lastmessage = "Sobrevendido";
        console.log(lastmessage);
        bot.telegram.sendMessage(CHAT_ID, lastmessage);
    }
}

setInterval(process, 1000);

process();
