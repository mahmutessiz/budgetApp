<script setup>
// The code is importing various components and classes from the 'chart.js' library and the
// 'vue-chartjs' library.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

// The `const data` object is defining the data that will be used to populate the line chart.
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Balance History',
      backgroundColor: '#00ff00',
      borderColor: '#0000ff',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}

// The `const options` object is defining the options or configurations for the line chart.
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Balance History'
    }
  }
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
</script>
<template>
  <div class="w-full"><Line :data="data" :options="options" /></div>
</template>
