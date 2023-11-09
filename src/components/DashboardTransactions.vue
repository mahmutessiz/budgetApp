<script setup>
import { onMounted, ref } from 'vue'
import { getTransactions } from '../composables/getTransactions.js'

const transactions = ref([])

onMounted(async () => {
  await getTransactions(transactions)
  transactions.value.sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>
<template>
  <div class="w-full p-2 sm:p-4">
    <div class="overflow-x-auto shadow dark:shadow-white/20 h-96 md:h-[30rem]">
      <table class="table table-xs table-zebra table-pin-rows text-center">
        <!-- head -->
        <caption class="text-lg py-1 md:text-lg md:py-3">
          Transactions
        </caption>
        <thead>
          <tr class="hover dark:bg-green-900 dark:text-white/60">
            <th></th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <!-- tbody -->
        <tbody>
          <tr class="hover" v-for="(transaction, index) in transactions" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.category_name }}</td>
            <td>${{ transaction.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
