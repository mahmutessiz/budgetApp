<script setup>
import DashboardMainBalance from './DashboardMainBalance.vue'
import DashboardTransactions from './DashboardTransactions.vue'
import DashboardTransactionsLineChart from './DashboardTransactionsLineChart.vue'
import DashboardDoughnutChart from './DashboardDoughnutChart.vue'
</script>

<template>
  <main class="flex flex-wrap w-full">
    <DashboardMainBalance />
    <DashboardTransactions class="mt-12" />
    <div class="w-full grid grid-cols-12 grid-flow-row bg-base-100 mt-12 gap-4">
      <DashboardDoughnutChart class="col-span-6" />
      <div class="divider divider-horizontal"></div>
      <DashboardTransactionsLineChart class="col-span-6" />
    </div>
  </main>
</template>
