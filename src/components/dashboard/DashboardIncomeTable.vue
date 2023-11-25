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
      <table class="table table-xs table-zebra table-pin-rows text-center">
        <!-- head -->
        <caption class="text-lg py-1 md:text-lg md:py-3 bg-base-200">
          {{
            $t('income_history')
          }}
        </caption>
        <thead>
          <tr class="hover dark:bg-green-900 dark:text-white/60">
            <th></th>
            <th>{{ $t('date') }}</th>
            <th>{{ $t('income') }}</th>
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
                <img src="../../assets/icons/delete.svg" alt="delete icon" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
