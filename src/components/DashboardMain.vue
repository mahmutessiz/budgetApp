<script setup>
import DashboardMainBalance from './DashboardMainBalance.vue'
import DashboardTransactions from './DashboardTransactions.vue'
import DashboardTransactionsLineChart from './DashboardTransactionsLineChart.vue'
</script>

<template>
  <main class="flex flex-wrap w-full">
    <DashboardMainBalance />
    <DashboardTransactions />
    <DashboardTransactionsLineChart />
  </main>
</template>
