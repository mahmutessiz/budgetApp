<template>
  <form @submit.prevent="submitIncome" class="bg-white p-6 rounded shadow-md">
    <label for="income" class="block mb-2 text-sm font-medium text-gray-700">Income:</label>
    <input
      id="income"
      v-model="income"
      type="number"
      class="block w-full p-2 mb-4 border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <button
      type="submit"
      class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Submit
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
