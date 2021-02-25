import { reactive, onMounted, computed } from "vue";

export function nomalizeMinimalStrategy() {
  const { graphPoints, limit } = this.graph;
  const maxValue = Math.max(...graphPoints);
  const minValue = Math.min(...graphPoints);
  const normalizeGraphPoint = (price) => ({
    graphValue: 5 + ((price - minValue) * 95) / (maxValue - minValue),
    price: price,
  });
  const graph = graphPoints.map(normalizeGraphPoint);
  if (graph.length > limit) graphPoints.splice(0, 1);
  return graph;
}

export async function timingUpdateStrategy() {
  const { crypto, currency, timeUnit, graphPoints, api } = this.graph;
  const timeUnitValue = {
    get minute() { return 1000 * 60 },
    get hour() { return this.minute * 60 },
    get day() { return this.hour * 24; },
  };
  setInterval(async () => {
    const updateData = await api.getCurrency(crypto, currency);
    graphPoints.push(updateData);
  }, timeUnitValue[timeUnit]);
}

class GraphNormalizer {
  constructor(graph) {
    this.graph = graph;
  }
  startNormalizing() {
    return computed(this.graph.normalizeStrategy.bind(this));
  }
}

class GraphMounter {
  constructor(graph) {
    this.graph = graph
  }
  mount() {
    const { graphPoints, timeUnit, crypto, currency, api } = this.graph
    onMounted(async () => {
      const history = await api.getHistoryBy(timeUnit, crypto, currency);
      history.forEach(point => graphPoints.push(point.close));
    });
  }
}

class GraphUpdater {
  constructor(graph) {
    this.graph = graph;
  }
  startUpdating() {
    const { updateStrategy } = this.graph
      updateStrategy.call(this);
  }
}

export class GraphFacade {
  constructor(graph) {
    this.api = graph.api;
    this.crypto = graph.crypto;
    this.currency = graph.currency;
    this.limit = graph.limit;
    this.timeUnit = graph.timeUnit;
    this.normalizeStrategy = graph.normalizeStrategy;
    this.updateStrategy = graph.updateStrategy;
    this.graphPoints = reactive([]);
  }

  init() {
    const getLastGraphPoint = () => this.graphPoints[this.graphPoints.length - 1];
    const currentGraphValue = computed(getLastGraphPoint);
    const normalizer = new GraphNormalizer(this);
    const mounter = new GraphMounter(this);
    const upater = new GraphUpdater(this);
    mounter.mount();
    upater.startUpdating();
    const normalizedGraph = normalizer.startNormalizing();

    return { normalizedGraph, currentGraphValue };
  }
}