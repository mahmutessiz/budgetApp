<script setup>
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Pie } from 'vue-chartjs'

const data = {
  labels: ['Home', 'Market', 'Cosmetics'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80]
    }
  ]
}
const options = {
  responsive: true,
  maintainAspectRatio: false
}
ChartJS.register(ArcElement, Tooltip)
</script>

<template>
  <div class="w-full">
    <div
      class="w-full flex flex-col sm:flex-row sm:px-12 items-center sm:items-baseline justify-center gap-8 sm:gap-0 sm:justify-between sm:py-12"
    >
      <div class="text-3xl text-green-500 font-bold font-mono">
        <span class="font-normal text-green-600 text-xl">Balance:</span><br />
        <span class="font-normal text-green-600 text-xl">$ </span>1,500
      </div>
      <!-- second part -->
      <div class="text-3xl text-orange-500 font-bold font-mono">
        <span class="font-normal text-orange-600 text-xl">Spendings:</span><br />
        <div>
          <Pie class="max-w-[100px]" :data="data" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>
