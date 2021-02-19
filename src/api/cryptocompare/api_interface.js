import generateUrl from "./generate_url";
import axios from "axios";

export default {
  async getCurrency(crypto, currency) {
    const url = generateUrl("pricemulti", crypto, currency);
    console.log(url);
    const data = await axios.get(url).then((res) => {
      return res.data;
    });
    return data;
  },

  async getHistoryBy(timeUnit, crypto, currency, limit) {
    const url = generateUrl(
      `v2/histo${timeUnit}`,
      crypto,
      currency,
      (limit = 100)
    );

    const data = await axios.get(url).then((answer) => {
      const data = answer.data.Data.Data;
      return data;
    });

    return data;
  },
};
