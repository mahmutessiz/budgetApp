<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { getCategoryTotals } from '../composables/getTransactions.js'
import { onMounted, ref } from 'vue'

let categoryTotals = ref({})

let labels = ref([])
let amount = ref([1, 2, 3, 4, 5, 6])
let data = ref({
  labels: labels.value,
  datasets: [
    {
      backgroundColor: [
        '#FF6633',
        '#FFB399',
        '#FF33FF',
        '#FFFF99',
        '#00B3E6',
        '#E6B333',
        '#3366E6',
        '#999966',
        '#99FF99'
      ],
      data: amount.value
    }
  ]
})

onMounted(async () => {
  categoryTotals.value = await getCategoryTotals()
  labels.value.splice(0, labels.value.length, ...categoryTotals.value.categories)
  amount.value = categoryTotals.value.totalAmounts

  // Create a new data object
  data.value = {
    labels: labels.value,
    datasets: [
      {
        backgroundColor: [
          '#FF6633',
          '#FFB399',
          '#FF33FF',
          '#FFFF99',
          '#00B3E6',
          '#E6B333',
          '#3366E6',
          '#999966',
          '#99FF99'
        ],
        data: amount.value
      }
    ]
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'left'
    },
    title: {
      display: true,
      text: 'Spendings'
    }
  }
}

ChartJS.register(ArcElement, Tooltip, Legend)
</script>

<template>
  <div class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50">
    <Doughnut v-if="data && options" class="" :data="data" :options="options" />
  </div>
</template>
