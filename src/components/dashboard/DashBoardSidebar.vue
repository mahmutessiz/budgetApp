<script setup>
// Script import
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

// Component import
import AddIncomeForm from './AddIncomeForm.vue'
import AddTransactionForm from './AddTransactionForm.vue'

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

const switchTheme = () => {
  const selectHtml = document.querySelector('html')
  let theme
  if (!selectHtml.dataset.theme) {
    // If the theme is not set, use system settings
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If the system prefers a dark color scheme
      theme = 'dark'
    } else {
      // If the system prefers a light color scheme
      theme = 'light'
    }
  } else if (selectHtml.dataset.theme === 'light') {
    theme = 'dark'
  } else {
    theme = 'light'
  }
  selectHtml.dataset.theme = theme
  // Store the theme preference in localStorage
  localStorage.setItem('theme', theme)
}
onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.querySelector('html').dataset.theme = storedTheme
  }
})
</script>

<template>
  <div class="z-50 w-full">
    <ul class="menu bg-base-200/50 backdrop-blur-md gap-4 flex-row-reverse w-full items-center">
      <li class="flex gap-2">
        <div class="avatar placeholder">
          <div class="dark:bg-neutral-focus bg-green-400 dark:text-neutral-content rounded-md w-8">
            <span class="text-xs">M</span>
          </div>
          Mahmut
        </div>
      </li>
      <li>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              class="fill-green-700"
              d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7Z"
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
        <button @click="switchTheme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-orange-700"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07L19.07 3.5m-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13l.51 1.67m-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87l.4 1.31M19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35l-2.53-2.2m4.33-2.7l1.15-2.77l2.2 2.54l-3.35.23m1.15-4.96l-1.14-2.78l3.34.24l-2.2 2.54M9.63 18.93l2.77 1.15l-2.53 2.19l-.24-3.34Z"
            />
          </svg>
          Theme
        </button>
      </li>
      <li>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-rose-700" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 3V21">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0" />
              </path>
              <path stroke-dasharray="15" stroke-dashoffset="15" d="M21 12H7.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.2s"
                  values="15;0"
                />
              </path>
              <path stroke-dasharray="12" stroke-dashoffset="12" d="M7 12L14 19M7 12L14 5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.6s"
                  dur="0.2s"
                  values="12;0"
                />
              </path>
            </g>
          </svg>
          <button @click="handleLogOut" class="w-min">Logout</button>
        </a>
      </li>
    </ul>
    <!-- add income form -->
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <p class="py-4">Click outside to close</p>
        <AddIncomeForm class="" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- add transaction form -->
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
