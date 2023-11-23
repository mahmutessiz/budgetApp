<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
import { useUserIncome } from '../../composables/getIncome.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const data = ref({})
const route = useRoute()
const userId = route.query.user

onMounted(async () => {
  // The code is calling two functions and assigning their results to variables.
  const monthlySpendingTotals = await getMonthlyTotals()
  const { getUserBalance } = useUserIncome()
  const userIncome = await getUserBalance(userId)

  // The code is creating an array called `incomeData` with a length of 12 and filling it with 0s.
  // Then, it loops through the `userIncome` object and assigns the values of each month to the
  // corresponding index in the `incomeData` array. This is done to ensure that the income data is
  // aligned with the months in the chart.
  let incomeData = Array(12).fill(0)
  for (let month in userIncome) {
    incomeData[month] = userIncome[month]
  }

  // The code is assigning an object to the `data.value` property. This object contains the necessary
  // data for the chart component to render the chart.
  data.value = {
    labels: Object.keys(monthlySpendingTotals),
    datasets: [
      {
        label: t('spending_history'),
        backgroundColor: '#f87979',
        data: Object.values(monthlySpendingTotals)
      },
      {
        label: t('income_history'),
        backgroundColor: '#0000ff',
        data: incomeData
      }
    ]
  }
})

// The `const options` object is defining the options for the chart.
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
