<template>
  <form @submit.prevent="submitIncome" class="bg-base-200 p-6 rounded shadow-md">
    <label for="income" class="block mb-2 text-sm font-medium text-gray-500"
      >{{ $t('income') }}:</label
    >
    <input
      id="income"
      v-model="income"
      type="number"
      step="0.01"
      class="block w-full p-2 mb-4 border-slate-500 rounded shadow-sm focus:ring-indigo-500 focus:border-slate-500 sm:text-sm"
    />
    <button
      type="submit"
      class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {{ $t('submit') }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAddIncome } from '../../composables/addIncome'
import { useRoute } from 'vue-router'

const route = useRoute()
const income = ref('')

const submitIncome = async () => {
  console.log(`Income: ${income.value}`)
  await useAddIncome(route.query.user, income.value)
  income.value = ''
}
</script>
