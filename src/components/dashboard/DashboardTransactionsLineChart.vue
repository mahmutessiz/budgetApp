<script setup>
import { ref, onMounted } from 'vue'
import { getMonthlyTotals } from '../../composables/getTransactions.js'
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onMounted(async () => {
  const monthlyTotals = await getMonthlyTotals()

  data.value = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Spending History',
        backgroundColor: '#00ff00',
        borderColor: '#0000ff',
        data: Object.values(monthlyTotals),
        tension: 0.3
      }
    ]
  }
})
const data = ref({})
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: t('spending_history')
    },
    padding: {
      autoPadding: true
    }
  }
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
</script>

<template>
  <div class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50" v-if="data.labels">
    <Line :data="data" :options="options" />
  </div>
</template>
