<template>
  <div class="w-full p-2 sm:px-12 shadow dark:shadow-white/20">
    <div
      class="w-full flex flex-col sm:flex-row sm:px-12 items-center sm:items-baseline justify-center gap-8 sm:gap-0 sm:justify-between sm:py-12"
    >
      <div class="text-3xl text-green-500 font-bold font-mono self-start ml-4" v-if="userBalance">
        <span class="font-normal text-green-600 text-xl">Balance:</span><br />
        <span class="font-normal text-green-600 text-xl">$ </span>{{ userBalance }}
      </div>
      <div class="text-3xl text-green-500 font-bold font-mono self-start ml-4" v-else>
        <span class="font-normal text-green-600 text-xl">Balance:</span><br />
        <span class="font-normal text-green-600 text-xl">$ </span>*****
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserBalance } from '../composables/getBalance.js'
import { onMounted, ref } from 'vue'

const userBalance = ref()

const { balance, getUserBalance } = useUserBalance()

onMounted(async () => {
  await getUserBalance()
  userBalance.value = balance.value
})
</script>
