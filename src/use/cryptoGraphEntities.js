import { onMounted, computed, reactive } from "vue";

const timeUnitValue = {
  get minute() { return 1000 * 60 },
  get hour() { return this.minute * 60 },
  get day() { return this.hour * 24; },
};

export function nomalizeMinimalStrategy(graph) {
  const { graphPoints, limit } = graph;
  const maxValue = Math.max(...graphPoints);
  const minValue = Math.min(...graphPoints);
  const normalizeGraphPoint = (price) => ({
    graphValue: 5 + ((price - minValue) * 95) / (maxValue - minValue),
    price: price,
  });
  const graphViewPoints = graphPoints.map(normalizeGraphPoint);
  if (graphViewPoints.length > limit) graphPoints.splice(0, 1);
  return graphViewPoints;
}

export async function timingUpdateStrategy(graph) {
  const { crypto, currency, timeUnit, graphPoints, api } = graph;
  setInterval(async () => {
    const updateData = await api.getCurrency(crypto, currency);
    graphPoints.push(updateData);
  }, timeUnitValue[timeUnit]);
}

function useGraphNormalizer (graph) {
    const { normalizeStrategy } = graph
    return computed(normalizeStrategy.bind(null, graph));
}

function useGraphInitialState (graph) {
  const { graphPoints, timeUnit, crypto, currency, api } = graph
  onMounted(async () => {
    const history = await api.getHistoryBy(timeUnit, crypto, currency);
    history.forEach(point => graphPoints.push(point.close));
  });
}

function useGraphUpdater (graph) {
    const { updateStrategy } = graph
    updateStrategy(graph);
}

function createGraphModel (options) {
  const graphPoints = reactive([])
  return {
    ...options,
    graphPoints
  }
}

export function GraphFacade (options) {
  const graph = createGraphModel(options)
  const { graphPoints } = graph
  const getLastGraphPoint = () => graphPoints[graphPoints.length - 1];
  const currentGraphValue = computed(getLastGraphPoint);
  useGraphInitialState(graph)
  useGraphUpdater(graph)
  const normalizedGraph = useGraphNormalizer(graph);

  return { normalizedGraph, currentGraphValue };
}