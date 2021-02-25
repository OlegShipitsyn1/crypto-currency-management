import axios from "axios";

const BASE = "https://min-api.cryptocompare.com/data/";
const API_KEY =
  "7b2fd95bb7bb3ac3974b72e3c3a7e7b9b0b01fd04a325b501ea045526e93b7c9";

const appendApiKey = (path) => `${path}&api_key=${API_KEY}`;

const generateUrl = (apiFolder, cryptoCurrency, currency, limit = null) => {
  const path = `${BASE + apiFolder}?fsyms=${cryptoCurrency}&tsyms=${currency}`;
  if (limit) {
    const pathHistory = path.replace("fsyms", "fsym").replace("tsyms", "tsym");
    const pathWithLimit = pathHistory + `&limit=${limit}`;
    return appendApiKey(pathWithLimit);
  }
  return appendApiKey(path);
};

export default {
  async getCurrency(crypto, currency) {
    const url = generateUrl("pricemulti", crypto, currency);
    console.log(url);
    const response = await axios.get(url).then((res) => {
      return res.data;
    });
    return response;
  },

  async getHistoryBy(timeUnit, crypto, currency, limit = 100) {
    const url = generateUrl(`v2/histo${timeUnit}`, crypto, currency, limit);
    const response = await axios.get(url).then((answer) => {
      return answer.data.Data.Data;
    });
    return response;
  },
};
