<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getTransactions } from '../../composables/getTransactions.js'
import { useDeleteRow } from '../../composables/deleteTransaction.js'

import { vAutoAnimate } from '@formkit/auto-animate'

const route = useRoute()
const userId = route.query.user
const transactions = ref([])

onMounted(async () => {
  await getTransactions(transactions)
})

/**
 * Deletes a row with the given ID and user ID.
 *
 * @param {number} id - The ID of the row to delete.
 * @param {number} user_id - The ID of the user.
 * @return {Promise<void>} A Promise that resolves when the row is deleted.
 */
const onDeleteRowClick = async (id, user_id) => {
  await useDeleteRow(id, user_id)
}
</script>

<template>
  <div class="w-full p-2 sm:p-4">
    <div class="scrollbar overflow-x-auto shadow dark:shadow-base-300 h-96 md:h-[30rem]">
      <table class="table table-xs table-zebra table-pin-rows text-center">
        <!-- head -->
        <caption class="text-lg py-1 md:text-lg md:py-3 bg-base-200">
          {{
            $t('transactions')
          }}
        </caption>
        <thead>
          <tr class="hover dark:bg-green-900 dark:text-white/60">
            <th></th>
            <th>{{ $t('date') }}</th>
            <th>{{ $t('category') }}</th>
            <th>{{ $t('amount') }}</th>
            <th></th>
          </tr>
        </thead>
        <!-- tbody -->
        <tbody v-auto-animate>
          <tr
            class="hover"
            v-for="(transaction, index) in transactions"
            :key="transaction.transaction_id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.category_name }}</td>
            <td>${{ transaction.amount }}</td>
            <td>
              <button
                class="cursor-pointer"
                @click="
                  onDeleteRowClick(transaction.transaction_id, userId).then(() => {
                    transactions.splice(index, 1)
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
