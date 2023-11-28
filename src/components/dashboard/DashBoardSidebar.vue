<script setup>
// Script import
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'
import { onMounted, watchEffect, ref } from 'vue'

// Component import
import AddIncomeForm from './AddIncomeForm.vue'
import AddTransactionForm from './AddTransactionForm.vue'
import MobileMenu from '../menu/MobileMenu.vue'

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

const userName = ref('')
onMounted(async () => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.querySelector('html').dataset.theme = storedTheme
  }

  // Get the userName from supabase
  const user = await supabase.auth.getUser()
  userName.value = user.data.user.user_metadata.name + ' ' + user.data.user.user_metadata.lastName
})

// Define a reactive variable to toggle the sidebar
const showSidebar2 = ref(false)

// Function to toggle the sidebar
const toggleSidebar2 = () => {
  showSidebar2.value = !showSidebar2.value
}

// Watch for changes in the showSidebar2 variable
watchEffect(() => {
  // Set the document body's overflow style based on the value of showSidebar2
  if (showSidebar2.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

<template>
  <div class="z-50 w-full">
    <ul
      class="menu bg-base-100/50 backdrop-blur-md md:gap-4 flex-row-reverse w-full justify-start items-center"
    >
      <li class="gap-2">
        <div class="flex items-center justify-center bg-base-200">
          <div class="hidden md:flex rounded-md justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-dasharray="28"
                stroke-dashoffset="28"
                stroke-linecap="round"
                stroke-width="2"
              >
                <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
                <path
                  d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
              </g>
            </svg>
          </div>
          <span v-if="userName !== 'undefined undefined'">{{ userName }}</span>
          <span v-else>John Doe</span>

          <div
            class="md:hidden dark:text-neutral-content rounded-md flex justify-center items-center"
          >
            <button @click="toggleSidebar2" type="button" title="Menu">
              <!-- hamburger icon -->
              <svg
                class="swap-off fill-green-800 dark:fill-green-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </button>
          </div>
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
      <li class="hidden md:block">
        <button @click="switchTheme" title="change theme">
          <img src="../../assets/icons/theme.svg" alt="theme icon" />
          {{ $t('theme') }}
        </button>
      </li>
      <li class="hidden md:block">
        <a>
          <img src="../../assets/icons/logout.svg" alt="logout icon" />
          <button @click="handleLogOut" title="logout">{{ $t('logout') }}</button>
        </a>
      </li>
    </ul>

    <aside
      class="md:hidden fixed inset-0 w-full py-4 bg-base-200/70 backdrop-blur-lg z-40"
      :class="{ 'show-sidebar': showSidebar2, 'hide-sidebar': !showSidebar2 }"
    >
      <MobileMenu>
        <li>
          <button class="btn btn-sm btn-error mb-8" @click="toggleSidebar2" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              />
            </svg>
          </button>
        </li>

        <li
          class="bg-base-100 hover:bg-base-200 px-4 py-2 border-b w-[70%] border-gray-400/30 rounded-md text-right"
        >
          <button
            @click="switchTheme"
            class="flex items-center justify-center w-full"
            title="change theme"
          >
            <img src="../../assets/icons/theme.svg" alt="theme icon" />
            {{ $t('theme') }}
          </button>
        </li>
        <li
          @click="toggleSidebar2"
          class="bg-base-100 hover:bg-base-200 px-4 py-2 border-b w-[70%] border-gray-400/30 rounded-md text-right"
        >
          <a class="flex items-center justify-center" @click="handleLogOut">
            <img src="../../assets/icons/logout.svg" alt="logout icon" />
            <button type="button" title="logout">
              {{ $t('logout') }}
            </button>
          </a>
        </li>
      </MobileMenu>
    </aside>

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
