<script setup>
import { ref, onMounted } from 'vue'
import { getMonthlyTotals } from '../composables/getTransactions.js'
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

const data = ref({})

onMounted(async () => {
  const monthlyTotals = await getMonthlyTotals()

  data.value = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Spending History',
        backgroundColor: '#00ff00',
        borderColor: '#0000ff',
        data: Object.values(monthlyTotals)
      }
    ]
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Spending History'
    }
  }
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
</script>

<template>
  <div class="w-full" v-if="data.labels"><Line :data="data" :options="options" /></div>
</template>
