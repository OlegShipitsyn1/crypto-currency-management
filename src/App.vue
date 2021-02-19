<template>
  <div class="wrapper bg-gray-800">
    <div class="container mx-auto py-16 shadow-2xl">
      <h1
        class="main-header text-3xl font-bold text-center tracking-normal text-gray-100"
      >
        Crypto-currency management Application
      </h1>
    </div>
    <div class="w-full bg-gray-700 py-2 md:py-10 xl:py-16">
      <div
        class="container bg-gray-100 shadow-2xl mx-auto max-w-5xl py-12 px-12 rounded-2xl"
      >
        <h2 class="text-3xl font-bold tracking-wide text-center text-gray-700">
          Choose currency to track
        </h2>
        <div class="">
          <CurrencyBox name="BTC" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CurrencyBox from "./components/CurrencyBox.vue";
</script>

<style>
.main-header {
  text-shadow: -3px 3px 2px black;
}
</style>
