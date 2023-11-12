<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { getMonthlyTotals } from '../../composables/getTransactions.js'

const data = ref({})

onMounted(async () => {
  const monthlyTotals = await getMonthlyTotals()

  data.value = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Spending History',
        backgroundColor: '#f87979',
        data: Object.values(monthlyTotals)
      }
    ]
  }
})
/* const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    },
    {
      label: 'Data One',
      backgroundColor: '#000',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
} */

const options = {
  responsive: true,
  maintainAspectRatio: false
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>

<template>
  <div class="w-full p-4 mb-12 bg-base-200 rounded-md shadow shadow-base-300" v-if="data.labels">
    <Bar class="w-full h-60 md:h-96" :data="data" :options="options" />
  </div>
</template>
