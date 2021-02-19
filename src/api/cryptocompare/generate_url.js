import { API_KEY, BASE } from "./api_constants";

const appendApiKey = (path) => `${path}&api_key=${API_KEY}`;

export default (apiFolder, cryptoCurrency, currency, limit = null) => {
  const path = `${BASE + apiFolder}?fsyms=${cryptoCurrency}&tsyms=${currency}`;
  if (limit) {
    const path = `${BASE + apiFolder}?fsym=${cryptoCurrency}&tsym=${currency}`;
    const pathWithLimit = path + `&limit=${limit}`;
    return appendApiKey(pathWithLimit);
  }
  return appendApiKey(path);
};
