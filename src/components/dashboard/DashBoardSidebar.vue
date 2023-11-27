<script setup>
// Script import
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

// Component import
import AddIncomeForm from './AddIncomeForm.vue'
import AddTransactionForm from './AddTransactionForm.vue'

/**
 * Logs out the user and navigates to the home page.
 *
 * @return {Promise<void>} - Resolves when the user is successfully logged out.
 */
const router = useRouter()
const handleLogOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    await router.push('/')
    console.log('successful logout', error)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Switches the theme of the application based on the user's preference.
 */
const switchTheme = () => {
  const selectHtml = document.querySelector('html')
  const prefersDarkScheme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme =
    !selectHtml.dataset.theme || selectHtml.dataset.theme === 'light'
      ? prefersDarkScheme
        ? 'dark'
        : 'light'
      : 'light'
  selectHtml.dataset.theme = theme
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
    <ul
      class="menu bg-base-100/50 backdrop-blur-md md:gap-4 flex-row md:flex-row-reverse w-full justify-center items-center"
    >
      <li class="gap-2 hidden">
        <div class="avatar placeholder">
          <div class="dark:bg-neutral-focus bg-green-400 dark:text-neutral-content rounded-md w-8">
            <span class="text-xs">M</span>
          </div>
          Mahmut
        </div>
      </li>
      <li>
        <div class="dropdown dropdown-bottom">
          <label tabindex="0" class="w-full"
            ><div class="flex">
              <img src="../../assets/icons/add.svg" alt="add icon" /> &nbsp;
              {{ $t('add_new') }}
            </div>
          </label>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow-md shadow-black bg-base-100 rounded-box w-52"
          >
            <li>
              <button onclick="my_modal_2.showModal()" title="add income">
                {{ $t('income') }}
              </button>
            </li>
            <li>
              <button onclick="my_modal_3.showModal()" title="add transaction">
                {{ $t('transaction') }}
              </button>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <button @click="switchTheme" title="change theme">
          <img src="../../assets/icons/theme.svg" alt="theme icon" />
          {{ $t('theme') }}
        </button>
      </li>
      <li>
        <a>
          <img src="../../assets/icons/logout.svg" alt="logout icon" />
          <button @click="handleLogOut" title="logout">{{ $t('logout') }}</button>
        </a>
      </li>
    </ul>
    <!-- add income form -->
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <p class="py-4">{{ $t('click_outside_to_close') }}</p>
        <AddIncomeForm />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button title="close">{{ $t('close') }}</button>
      </form>
    </dialog>
    <!-- add transaction form -->
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <p class="py-4">{{ $t('click_outside_to_close') }}</p>
        <AddTransactionForm />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button title="close">{{ $t('close') }}</button>
      </form>
    </dialog>
  </div>
</template>
