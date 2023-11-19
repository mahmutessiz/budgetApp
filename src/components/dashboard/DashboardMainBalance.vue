<template>
  <div class="w-full p-2 shadow dark:shadow-base-300 bg-base-200/50">
    <div
      class="w-full flex flex-col sm:flex-row sm:px-12 items-center sm:items-baseline justify-center gap-8 sm:gap-0 sm:justify-between sm:py-12"
    >
      <div class="stats w-[90%] sm:w-auto bg-green-500 text-base-200">
        <div class="stat" v-if="userBalance">
          <div class="stat-title text-base-200">Account balance</div>
          <div class="stat-value text-xl sm:text-4xl">${{ userBalance }}</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200">Add funds</button>
          </div>
        </div>

        <div class="stat" v-else>
          <div class="stat-title text-base-200">Account balance</div>
          <div class="stat-value text-xl sm:text-4xl">$ ******</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200">Add funds</button>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-base-200">Total income</div>
          <div class="stat-value text-xl sm:text-4xl">$89,400</div>
          <div class="stat-actions">
            <button class=""></button>
            <button class=""></button>
          </div>
        </div>
      </div>

      <!-- <div class="text-2xl text-green-500 font-bold font-mono self-start ml-4" v-if="userBalance">
        <span class="font-normal text-green-600 text-xl">Balance:</span><br />
        <span class="font-normal text-green-600 text-2xl">$</span>{{ userBalance }}
      </div>
      <div class="text-2xl text-green-500 font-bold font-mono self-start ml-4" v-else>
        <span class="font-normal text-green-600 text-xl">Balance:</span><br />
        <span class="font-normal text-green-600 text-2xl">$</span>*****
      </div> -->

      <div class="stats w-[90%] sm:w-auto bg-rose-500 text-base-200">
        <div class="stat" v-if="userSpending">
          <div class="stat-title text-base-200">Total spendings</div>
          <div class="stat-value text-xl sm:text-4xl">
            ${{ userSpending }} <span class="text-sm">/month</span>
          </div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200">Add transaction</button>
          </div>
        </div>

        <div class="stat" v-else>
          <div class="stat-title text-base-200">Total spendings</div>
          <div class="stat-value">$ ******</div>
          <div class="stat-actions">
            <button class="btn btn-sm bg-base-200">Add funds</button>
          </div>
        </div>
      </div>

      <!-- <div class="text-2xl text-rose-500 font-bold font-mono self-start ml-4" v-if="userBalance">
        <span class="font-normal text-rose-600 text-xl">Total spendings:</span><br />
        <span class="font-normal text-rose-600 text-2xl">$</span>{{ userSpending
        }}<span class="text-sm text-rose-600">/month</span>
      </div>
      <div class="text-2xl text-green-500 font-bold font-mono self-start ml-4" v-else>
        <span class="font-normal text-rose-600 text-xl">Total spendings:</span><br />
        <span class="font-normal text-rose-600 text-2xl">$</span>*****<span
          class="text-sm text-rose-600"
          >/month</span
        >
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { useUserBalance } from '../../composables/getBalance.js'
import { useGetSpendings } from '../../composables/getMonthlySpendingsTotal.js'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.query.user
const userBalance = ref()
const userSpending = ref()

const { balance, getUserBalance } = useUserBalance()

onMounted(async () => {
  await getUserBalance(userId)
  userBalance.value = balance.value

  const spending = await useGetSpendings(userId)
  userSpending.value = spending
})

watch(balance, (newBalance) => {
  userBalance.value = newBalance
})
</script>
