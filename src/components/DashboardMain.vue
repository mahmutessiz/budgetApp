<script setup>
import DashboardMainBalance from './DashboardMainBalance.vue'
import DashboardTransactions from './DashboardTransactions.vue'
import DashboardTransactionsLineChart from './DashboardTransactionsLineChart.vue'
import DashboardDoughnutChart from './DashboardDoughnutChart.vue'
</script>

<template>
  <main class="flex flex-wrap w-full">
    <DashboardMainBalance class="mb-12" />
    <DashboardTransactions class="mb-12" />
    <div
      class="w-full flex flex-wrap md:grid md:grid-cols-12 md:grid-flow-row bg-base-100 mb-12 p-2 gap-4"
    >
      <DashboardDoughnutChart class="col-span-5" />
      <div class="divider divider-horizontal col-span-1 hidden md:block"></div>
      <DashboardTransactionsLineChart class="col-span-6 mb-12" />
    </div>
  </main>
</template>
