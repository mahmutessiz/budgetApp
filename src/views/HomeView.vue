<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import useIntersectionObserver from '../composables/intersectionObserver'

// Fade in animation from composable for sections
useIntersectionObserver()
onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.querySelector('html').dataset.theme = storedTheme
  }
})

const currentTheme = ref(localStorage.getItem('theme'))
</script>

<template>
  <div class="m-auto w-full">
    <section
      class="flex max-h-[1080px] w-full items-center justify-center overflow-hidden bg-base-100 lg:h-[80vh]"
    >
      <div
        class="flex h-full w-full flex-wrap-reverse items-center justify-center gap-4 p-4 md:flex-nowrap"
      >
        <transition appear name="slide-down-text">
          <div
            class="z-10 -mt-14 flex h-full flex-col items-center justify-center bg-base-100 sm:mt-auto sm:w-[40%] sm:bg-transparent"
          >
            <h1
              class="slide-down-appear-text max-w-[700px] text-4xl font-bold md:text-5xl lg:text-7xl"
            >
              {{ $t('track_your_expenses') }}
              <span
                class="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent"
                >{{ $t('smartly') }}!</span
              >
            </h1>
            <transition appear name="slide-down-p">
              <p class="slide-down-appear-p mt-5 max-w-[700px] lg:mt-9">
                {{ $t('hero_article') }}
              </p>
            </transition>
          </div>
        </transition>
        <div class="sm:w-[50%]">
          <transition appear name="slide-down-hero-img">
            <img
              class="animation rounded-lg md:rounded-md"
              src="../assets/0031-min.webp"
              loading="eager"
              alt="reception image"
            />
          </transition>
        </div>
      </div>
    </section>
    <section class="fade-in mt-12 py-6">
      <div class="mt-4 flex flex-wrap items-center justify-center gap-4 p-4 sm:flex-nowrap">
        <!-- If theme is dark, show dark image -->
        <img
          class="rounded-md sm:w-[60%] sm:max-w-[600px]"
          src="../assets/budgetApp.png"
          alt=""
          v-if="currentTheme === 'dark'"
        />
        <!-- If theme is light, show light image -->
        <img
          class="rounded-md sm:w-[60%] sm:max-w-[600px]"
          src="../assets/budgetApp_light.png"
          alt=""
          v-if="currentTheme === 'light'"
        />
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">{{ $t('easy_to_use') }}</h2>
          <p class="">
            {{ $t('easy_to_use_article') }}
          </p>
        </div>
      </div>
    </section>
    <section class="fade-in mt-12 py-6">
      <div class="mt-4 flex flex-wrap-reverse items-center justify-center gap-4 p-4 sm:flex-nowrap">
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">{{ $t('easy_to_track') }}</h2>
          <p class="">
            {{ $t('easy_to_track_article') }}
          </p>
        </div>

        <!-- If theme is dark, show dark image -->
        <img
          class="rounded-md sm:w-[60%] sm:max-w-[600px]"
          src="../assets/budgetApp_2.png"
          alt=""
          v-if="currentTheme === 'dark'"
        />
        <!-- If theme is light, show light image -->
        <img
          class="rounded-md sm:w-[60%] sm:max-w-[600px]"
          src="../assets/BudgetApp_2_light.png"
          alt=""
          v-if="currentTheme === 'light'"
        />
      </div>
    </section>
    <section class="fade-in mt-12 py-6">
      <div class="mt-4 flex flex-wrap items-center justify-center gap-4 p-4 sm:flex-nowrap">
        <!-- If theme is dark, show dark image -->
        <img
          class="rounded-md sm:w-[60%] sm:max-w-[600px]"
          src="../assets/budgetApp_3.png"
          alt=""
          v-if="currentTheme === 'dark'"
        />
        <!-- If theme is light, show light image -->
        <img
          class="rounded-md sm:w-[60%] sm:max-w-[600px]"
          src="../assets/budgetApp_3_light.png"
          alt=""
          v-if="currentTheme === 'light'"
        />
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">
            {{ $t('convenient') }}
          </h2>
          <p class="">
            {{ $t('convenient_article') }}
          </p>
        </div>
      </div>
    </section>
    <section class="fade-in my-12 container mx-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-2 w-full place-items-center rounded-md border border-base-300 py-4 px-2 sm:py-12 sm:px-4 shadow-sm shadow-black/80"
      >
        <p class="text-center md:text-left text-lg md:text-xl py-4 font-semibold">
          {{ $t('invite_card_title') }}
        </p>
        <RouterLink
          to="/signup"
          class="btn btn-warning hover:bg-yellow-400 px-12 text-lg hover:shadow-sm hover:shadow-black/50"
        >
          {{ $t('invite_card_button') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-in {
  opacity: 0;
  transition: opacity 1s ease-out;
}

.fade-in.show {
  opacity: 1;
}

.animation {
  animation: slide-down-hero-img 1s cubic-bezier(0.25, 0.1, 0.25, 1) both;
}

@keyframes slide-down-hero-img {
  from {
    transform: translate(-100%, -100%);
  }
  to {
    transform: translate(0, 0);
  }
}

.slide-down-appear-text {
  animation: slide-down-text 1s cubic-bezier(0.25, 0.1, 0.25, 1) both;
}

@keyframes slide-down-text {
  from {
    transform: translate(-100%, 100%);
  }
  to {
    transform: translate(0, 0);
  }
}

.slide-down-appear-p {
  animation: slide-down-p 1s cubic-bezier(0.25, 0.1, 0.25, 1) both;
}

@keyframes slide-down-p {
  from {
    transform: translate(100%, 100%);
  }
  to {
    transform: translate(0, 0);
  }
}
</style>
