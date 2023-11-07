<template>
  <form @submit.prevent="submitTransaction" class="bg-white p-6 rounded shadow-md">
    <label for="category_name" class="block mb-2 text-sm font-medium text-gray-700"
      >Category Name:</label
    >
    <input
      id="category_name"
      v-model="category_name"
      type="text"
      class="block w-full p-2 mb-4 border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <label for="amount" class="block mb-2 text-sm font-medium text-gray-700">Amount:</label>
    <input
      id="amount"
      v-model="amount"
      type="number"
      step="0.01"
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
import { useAddTransactions } from '../../composables/addTransaction'
import { useRoute } from 'vue-router'

const route = useRoute()
const category_name = ref('')
const amount = ref('')

const submitTransaction = async () => {
  // Ensure the first letter of the category name is capitalized
  const formattedCategoryName =
    category_name.value.charAt(0).toUpperCase() + category_name.value.slice(1)

  console.log(`Category Name: ${formattedCategoryName}, Amount: ${amount.value}`)
  await useAddTransactions(route.query.user, formattedCategoryName, amount.value)
  category_name.value = ''
  amount.value = ''
}
</script>
