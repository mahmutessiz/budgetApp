<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const transactions = ref([])

async function getTransactions() {
  const { data } = await supabase.from('budget_app').select()
  transactions.value = data
}

onMounted(() => {
  getTransactions()
})
</script>
<template>
  <div class="w-full p-2 sm:p-4">
    <div class="overflow-x-auto shadow dark:shadow-white/20 h-96">
      <table class="table table-zebra table-pin-rows">
        <!-- head -->
        <caption class="text-xl">
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
