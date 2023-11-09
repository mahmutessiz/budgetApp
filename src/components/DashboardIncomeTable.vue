<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIncomeTransactions } from '../composables/getIncomeTransactions.js'

const route = useRoute()
const userId = route.query.user

const incomeData = ref([])

onMounted(async () => {
  const { incomeTransactions } = await useIncomeTransactions(userId)
  incomeData.value = incomeTransactions
})
</script>
<template>
  <div class="w-full p-2 sm:p-4">
    <div class="overflow-x-auto shadow dark:shadow-white/20 h-96 md:h-[30rem]">
      <table class="table table-zebra table-pin-rows">
        <!-- head -->
        <caption class="md:text-xl md:py-3">
          Income history
        </caption>
        <thead>
          <tr class="hover dark:bg-green-900 dark:text-white/60">
            <th></th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <!-- tbody -->
        <tbody>
          <tr class="hover" v-for="(transaction, index) in incomeData.value" :key="index">
            <td></td>
            <td>${{ transaction.income }}</td>
            <td>{{ transaction.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
