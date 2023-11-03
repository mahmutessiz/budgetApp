<template>
  <div class="hidden md:block">
    <ul class="menu bg-base-200 w-56">
      <li class="flex gap-2 mb-4">
        <div class="avatar placeholder">
          <div class="dark:bg-neutral-focus bg-green-400 dark:text-neutral-content rounded-md w-8">
            <span class="text-xs">M</span>
          </div>
          Mahmut
        </div>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <div class="dropdown">
            <label tabindex="0" class="w-full">Add new</label>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow-md shadow-black bg-base-100 rounded-box w-52"
            >
              <li><button onclick="my_modal_2.showModal()">Income</button></li>
              <li><button onclick="my_modal_3.showModal()">Transaction</button></li>
            </ul>
          </div>
        </a>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Theme
        </a>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <button @click="handleLogOut" class="w-min">Logout</button>
        </a>
      </li>
    </ul>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <p class="py-4">Click outside to close</p>
        <AddIncomeForm class="" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <p class="py-4">Click outside to close</p>
        <AddTransactionForm class="" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
<script setup>
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router'

import AddIncomeForm from './dashboard/AddIncomeForm.vue'
import AddTransactionForm from './dashboard/AddTransactionForm.vue'

const router = useRouter()
const handleLogOut = async () => {
  try {
    let { error } = await supabase.auth.signOut()
    await router.push('/')
    console.log('succesfull logout', error)
  } catch (error) {
    console.log(error)
  }
}
</script>
