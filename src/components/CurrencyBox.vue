<template>
  <div class="flex flex-row flex-wrap gap-4 my-12">
    <article
      class="w-48 h-48 shadow-sm bg-gray-50 rounded-md hover:shadow-lg cursor-pointer"
    >
      <h3 class="text-xl text-center py-4 px-4 font-bold">{{ name }}</h3>
      <p class="text-center">USD: ${{ currentGraphValue }}</p>
    </article>
  </div>
  <div class="graph bg-gray-50 rounded-2xl shadow-xl py-8 px-8">
    <transition-group
      tag="div"
      name="fade"
      class="flex items-end border-gray-600 border-b border-l h-64"
    >
      <div
        v-for="(bar, idx) in normalizedGraph"
        :key="idx"
        :style="{ height: `${bar.graphValue}%` }"
        class="bg-green-600 border w-10 staff"
      >
        <div class="graph-label">$ {{ bar.price }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { GraphFactoryMethod } from '../use/cryptoGraph';

export default defineComponent({
  props: ['name'],
  name: "CurrencyBox",
  setup() {
    const factory = new GraphFactoryMethod()
    const { normalizedGraph, currentGraphValue } = factory.create('default')
    return { normalizedGraph, currentGraphValue }
  }
});
</script>

<style>
.staff {
  transition: width 0.5s, color 0s, height 0.5s;
  min-height: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.staff {
  position: relative;
  @apply cursor-pointer;
  @apply hover:bg-red-300;
}

.graph-label {
  position: absolute;
  bottom: 100%;
  left: 100%;
  display: none;
  z-index: 100;
  border-radius: 8px;
  padding: 8px;
  color: white;
  background: rgba(0, 0, 0, 0.623);
  white-space: nowrap;
  @apply shadow-md;
}

.staff:hover .graph-label {
  display: block;
}
</style>