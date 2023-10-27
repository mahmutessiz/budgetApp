<script setup>
// The code is importing specific components and modules from the 'chart.js' and 'vue-chartjs'
// libraries.
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

// The `const data` object is defining the data that will be used to render the pie chart. It contains
// two properties:
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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Spendings'
    }
  }
}

ChartJS.register(ArcElement, Tooltip)
</script>

<template>
  <div class="w-full flex justify-center items-center border-r rounded-lg p-4">
    <Doughnut class="" :data="data" :options="options" />
  </div>
</template>
