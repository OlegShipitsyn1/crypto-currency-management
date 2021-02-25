import generateUrl from "./generate_url";
import axios from "axios";

export default {
  async getCurrency(crypto, currency) {
    const url = generateUrl("pricemulti", crypto, currency);
    const data = await axios.get(url).then((res) => {
      return res.data[crypto][currency];
    });
    return data;
  },

  async getHistoryBy(timeUnit, crypto, currency, limit = 100) {
    const url = generateUrl(
      `v2/histo${timeUnit}`,
      crypto,
      currency,
      limit
    );

    const data = await axios.get(url).then((answer) => {
      const data = answer.data.Data.Data;
      return data;
    });

    return data;
  },
};
