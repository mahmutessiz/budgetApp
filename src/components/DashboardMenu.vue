<script setup>
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import MobileMenu from './menu/MobileMenu.vue'

const route = useRoute()

const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

watchEffect(() => {
  if (showSidebar.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

<template>
  <header class="w-full flex justify-between p-4 items-center" v-if="!route.query.user">
    <div class="pl-12">
      <span>Logo</span>
    </div>
    <div>
      <ul class="w-full md:flex justify-between gap-4 pr-12 hidden">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/login">Login</RouterLink></li>
        <li><RouterLink to="/signup">Signup</RouterLink></li>
      </ul>
      <button class="md:hidden" @click="toggleSidebar">
        <!-- hamburger icon -->
        <svg
          class="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </button>
    </div>
  </header>

  <aside
    class="md:hidden fixed inset-0 w-full py-4 bg-base-200/70 backdrop-blur-lg z-40"
    :class="{ 'show-sidebar': showSidebar, 'hide-sidebar': !showSidebar }"
  >
    <MobileMenu>
      <li>
        <button class="btn btn-sm btn-error mb-8" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg>
        </button>
      </li>
      <li
        @click="toggleSidebar"
        class="bg-base-100 hover:bg-base-200 px-4 py-2 border-b w-[50%] border-gray-400/30 rounded-md text-right"
      >
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li
        @click="toggleSidebar"
        class="bg-base-100 hover:bg-base-200 px-4 py-2 border-b w-[50%] border-gray-400/30 rounded-md text-right"
      >
        <RouterLink to="/about">About</RouterLink>
      </li>
      <li
        @click="toggleSidebar"
        class="bg-base-100 hover:bg-base-200 px-4 py-2 border-b w-[50%] border-gray-400/30 rounded-md text-right"
      >
        <RouterLink to="/login">Login</RouterLink>
      </li>
      <li
        @click="toggleSidebar"
        class="bg-base-100 hover:bg-base-200 px-4 py-2 border-b w-[50%] border-gray-400/30 rounded-md text-right"
      >
        <RouterLink to="/signup">Signup</RouterLink>
      </li>
    </MobileMenu>
  </aside>
</template>

<style scoped>
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
.show-sidebar {
  animation: slide-in 0.5s forwards;
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.hide-sidebar {
  animation: slide-out 0.5s forwards;
}
</style>
