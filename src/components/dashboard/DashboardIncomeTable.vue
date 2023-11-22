<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIncomeTransactions } from '../../composables/getIncomeTransactions.js'
import { useDeleteIncome } from '../../composables/deleteIncome.js'

import { vAutoAnimate } from '@formkit/auto-animate'

const route = useRoute()
const userId = route.query.user

const incomeData = ref([])

onMounted(async () => {
  const { incomeTransactions } = await useIncomeTransactions(userId)
  incomeData.value = incomeTransactions
})

const onDeleteIncomeClick = async (id, user_id) => {
  await useDeleteIncome(id, user_id)
}
</script>
<template>
  <div class="w-full p-2 sm:p-4">
    <div class="scrollbar overflow-x-auto shadow dark:shadow-base-300 h-96 md:h-[30rem]">
      <table class="table table-xs table-zebra table-pin-rows text-center sm:z-0 -z-10">
        <!-- head -->
        <caption class="text-lg py-1 md:text-lg md:py-3 bg-base-200">
          Income history
        </caption>
        <thead>
          <tr class="hover dark:bg-green-900 dark:text-white/60">
            <th></th>
            <th>Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <!-- tbody -->
        <tbody v-auto-animate>
          <tr class="hover" v-for="(transaction, index) in incomeData.value" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ transaction.date }}</td>
            <td>${{ transaction.income }}</td>
            <td>
              <button
                class="cursor-pointer"
                @click="
                  onDeleteIncomeClick(transaction.id, userId).then(() => {
                    incomeData.value.splice(index, 1)
                  })
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                  <path
                    fill="#ff0000"
                    d="m20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2m2 0h8v-6.8L10.46 9H8v10Z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
