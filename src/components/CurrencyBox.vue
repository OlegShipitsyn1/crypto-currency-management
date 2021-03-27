<template>
  <div class="graph">
    <article class="graph__wrapper">
      <h3 class="graph__name">{{ cryptoFullname }}</h3>
      <p class="graph__value">{{ currency }}: {{ currentGraphValue }}</p>
    </article>
  </div>
  <div class="graph__window">
    <transition-group class="graph__transition" tag="div" name="fade">
      <div
        v-for="(bar, idx) in normalizedGraph"
        :key="idx"
        :style="{ height: `${bar.graphValue}%` }"
        class="graph__vertex"
      >
        <div class="graph__label">{{ currency }} {{ bar.price }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { graphFactory } from '../use/cryptoGraph'

export default defineComponent({
  props: ['type', 'crypto', 'currency', 'cryptoFullname'],
  name: "CurrencyBox",
  setup(props) {
    const { type, crypto, currency } = props
    const { normalizedGraph, currentGraphValue } = graphFactory.create(type, crypto, currency)
    return { normalizedGraph, currentGraphValue }
  }
})
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

.graph__label {
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

.staff:hover .graph__label {
  display: block;
}

.graph {
  @apply flex;
  @apply flex-row;
  @apply flex-wrap;
  @apply gap-4;
  @apply my-12;
}

.graph__wrapper {
  @apply w-48;
  @apply h-48;
  @apply shadow-sm;
  @apply bg-gray-50;
  @apply rounded-md;
  @apply cursor-pointer;
  @apply hover:shadow-lg;
}

.graph__name {
  @apply text-xl;
  @apply text-center;
  @apply py-4;
  @apply px-4;
  @apply font-bold;
}

.graph__value {
  @apply text-center;
}

.graph__window {
  @apply graph;
  @apply bg-gray-50;
  @apply rounded-2xl;
  @apply shadow-xl;
  @apply py-8;
  @apply px-8;
}

.graph__transition {
  @apply flex;
  @apply items-end;
  @apply border-gray-600;
  @apply border-b;
  @apply border-l;
  @apply h-64;
  max-width: 100%;
}

.graph__vertex {
  @apply bg-green-600;
  @apply border;
  @apply w-10;
  @apply staff;
}
</style>