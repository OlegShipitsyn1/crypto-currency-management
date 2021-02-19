import { reactive, onMounted, computed } from "vue";
import api from '../api/cryptocompare/api_interface'

const GRAPH_LIMIT = 100;

export const useCryptoGraph = (
  crypto,
  currency,
  timeUnit,
  limit = GRAPH_LIMIT
) => {
  const graphPoints = reactive([]);
  const currentGraphValue = computed(() => graphPoints[graphPoints.length - 1]);

  const translatedTimeUnit =
    timeUnit === "minute"   ? 60 * 1000        : 
    timeUnit === "hour"     ? 3600 * 1000      : 
    timeUnit === "day"      ? 3600 * 24 * 1000 : 1000;
  
  const updateGraph = async () => {
    const updateData = await api.getCurrency(crypto, currency)
    console.log(updateData);
    graphPoints.push(updateData[crypto][currency])
  }

  onMounted(async () => {
    const history = await api.getHistoryBy(timeUnit, crypto, currency);
    history.forEach((point) => {
      graphPoints.push(point.close);
    });

    setInterval(updateGraph, translatedTimeUnit)
  });

  const normalizedGraph = computed(() => {
    const maxValue = Math.max(...graphPoints);
    const minValue = Math.min(...graphPoints);
    const graph = graphPoints.map((price) => ({
      graphValue: 5 + ((price - minValue) * 95) / (maxValue - minValue),
      price: price,
    }));
    if (graph.length > limit) graphPoints.splice(0, 1);
    return graph;
  });

  return { normalizedGraph, currentGraphValue };
};
