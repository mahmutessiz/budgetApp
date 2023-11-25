<script setup>
import DashboardMainBalance from './dashboard/DashboardMainBalance.vue'
import DashboardTransactions from './dashboard/DashboardTransactions.vue'
import DashboardTransactionsLineChart from './dashboard/DashboardTransactionsLineChart.vue'
import DashboardDoughnutChart from './dashboard/DashboardDoughnutChart.vue'
import DashboardIncomeTable from './dashboard/DashboardIncomeTable.vue'
import DashboardBarChart from './dashboard/DashboardBarChart.vue'
</script>

<template>
  <main class="flex flex-wrap w-full">
    <DashboardMainBalance class="mb-12" />
    <div class="w-full"><DashboardBarChart /></div>
    <div class="w-full flex flex-wrap md:flex-nowrap items-center justify-center mb-12 p-2 gap-4">
      <DashboardDoughnutChart class="sm:w-[35%]" />
      <DashboardTransactionsLineChart class="sm:w-[65%] h-80 md:h-full" />
    </div>
    <div class="mb-12 w-full flex flex-wrap md:flex-nowrap">
      <DashboardIncomeTable class="md:w-[35%] mb-8 sm:mb-auto" />
      <DashboardTransactions class="md:w-[65%]" />
    </div>
  </main>
</template>
