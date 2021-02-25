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

export class GraphFactoryMethod {
  create(type) {
    if (type === "default") {
      const facade = new GraphFacade(baseGraphOptions)
      return facade.init()
    }
  }
}
