import api from "../api/cryptocompare/api_interface";
import { GraphFacade, nomalizeMinimalStrategy, timingUpdateStrategy } from './cryptoGraphEntities'

const baseGraphOptions = {
  api: api,
  crypto: 'BTC',
  currency: 'USD' ,
  limit: 100,
  timeUnit: 'minute',
  normalizeStrategy: nomalizeMinimalStrategy,
  updateStrategy: timingUpdateStrategy
}

const deniedStrategy = () => void 0

const liveGraphOptions = { ...baseGraphOptions }

const staticGraphOptions = { ...baseGraphOptions, updateStrategy: deniedStrategy }
const rawLiveGraphOptions = { ...liveGraphOptions, normalizeStrategy: deniedStrategy }
const rawStaticGraphOptions = { ...staticGraphOptions, normalizeStrategy: deniedStrategy }

export const graphFactory = {
  create(type, crypto, currency) {

    const mix = options => {
      const userCrypto = crypto || options.crypto
      const userCurrency = currency || options.currency
      return { ...options, userCrypto, userCurrency }
    }

    switch (type) {
      case "live"      : return GraphFacade ( mix(baseGraphOptions) )
      case "staic"     : return GraphFacade ( mix(staticGraphOptions) )
      case "raw-static": return GraphFacade ( mix(rawStaticGraphOptions) )
      case "raw-live"  : return GraphFacade ( mix(rawLiveGraphOptions) )
      default          : return GraphFacade ( mix(baseGraphOptions) )
    }
  }
}
