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
    <div class="overflow-x-auto shadow dark:shadow-white/20 h-96">
      <table class="table table-zebra table-pin-rows">
        <!-- head -->
        <caption class="text-xl py-3 text-green-200/80">
          Transactions
        </caption>
        <thead>
          <tr class="hover dark:bg-green-900 dark:text-white/60">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <!-- tbody -->
        <tbody>
          <tr class="hover" v-for="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.category_name }}</td>
            <td>${{ transaction.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
