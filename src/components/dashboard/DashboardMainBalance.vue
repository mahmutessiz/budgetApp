<script setup>
import { useUserBalance } from '../../composables/getBalance.js'
import { useGetSpendings } from '../../composables/getMonthlySpendingsTotal.js'
import { useUserIncome } from '../../composables/getIncome.js'
// Component import
import AddIncomeForm from './AddIncomeForm.vue'
import AddTransactionForm from './AddTransactionForm.vue'

import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.query.user
const userBalance = ref() // User's balance
const userSpending = ref() // User's spending

const { balance, getUserBalance } = useUserBalance() // Get user's balance
const monthlyIncomeTotal = ref() // User's monthly income total

onMounted(async () => {
  // Get the user's monthly income balance
  const { getUserBalance: getUserIncomeMonthlyBalance } = useUserIncome()
  const userIncome = await getUserIncomeMonthlyBalance(userId)
  const userMonthlyIncomeTotal = ref(userIncome)
  const currentMonth = new Date().getMonth()
  monthlyIncomeTotal.value = userMonthlyIncomeTotal.value[currentMonth]

  // Get the user's balance
  await getUserBalance(userId)
  userBalance.value = balance.value

  // Get the user's spending
  const spending = await useGetSpendings(userId)
  userSpending.value = spending
})

watch(balance, (newBalance) => {
  // Update the user's balance when it changes
  userBalance.value = newBalance
})
</script>

<template>
  <div class="w-full p-2 shadow dark:shadow-base-300 bg-base-200/50">
    <div
      class="w-full flex flex-col sm:flex-row sm:px-12 items-center sm:items-baseline justify-center gap-8 sm:gap-0 sm:justify-between sm:py-12"
    >
      <div class="stats w-[90%] sm:w-auto bg-green-500 text-base-200">
        <div class="stat" v-if="userBalance">
          <div class="stat-title text-base-200">{{ $t('account_balance') }}</div>
          <div class="stat-value text-xl sm:text-4xl">${{ userBalance }}</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200" type="button" onclick="my_modal_4.showModal()">
              {{ $t('add_funds') }}
            </button>
          </div>
        </div>

        <div class="stat" v-else>
          <div class="stat-title text-base-200">{{ $t('account_balance') }}</div>
          <div class="stat-value text-xl sm:text-4xl">$ 0</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200" type="button" onclick="my_modal_4.showModal()">
              {{ $t('add_funds') }}
            </button>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-base-200" v-if="monthlyIncomeTotal">
            {{ $t('total_balance') }}
          </div>
          <div class="stat-value text-xl sm:text-4xl">${{ monthlyIncomeTotal }}</div>
          <div class="stat-desc text-base-200">/{{ $t('month') }}</div>
          <div class="stat-actions">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="stat" v-if="!monthlyIncomeTotal">
        <div class="stat-title text-base-200">{{ $t('total_balance') }}</div>
        <div class="stat-value text-xl sm:text-4xl">$ 0</div>
        <div class="stat-actions">
          <span></span>
        </div>
      </div>

      <div class="stats w-[90%] sm:w-auto bg-rose-500 text-base-200">
        <div class="stat" v-if="userSpending">
          <div class="stat-title text-base-200">{{ $t('total_spendings') }}</div>
          <div class="stat-value text-2xl sm:text-4xl">${{ userSpending }}</div>
          <div class="stat-desc text-base-200">/{{ $t('month') }}</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200" onclick="my_modal_5.showModal()">
              {{ $t('add_transaction') }}
            </button>
          </div>
        </div>

        <div class="stat" v-else>
          <div class="stat-title text-base-200">{{ $t('total_spendings') }}</div>
          <div class="stat-value">$ 0</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200" onclick="my_modal_5.showModal()">
              {{ $t('add_transaction') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- add income form -->
    <dialog id="my_modal_4" class="modal">
      <div class="modal-box">
        <p class="py-4">{{ $t('click_outside_to_close') }}</p>
        <AddIncomeForm class="" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- add transaction form -->
    <dialog id="my_modal_5" class="modal">
      <div class="modal-box">
        <p class="py-4">{{ $t('click_outside_to_close') }}</p>
        <AddTransactionForm class="" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>{{ $t('close') }}</button>
      </form>
    </dialog>
  </div>
</template>
