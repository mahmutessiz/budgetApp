<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import useIntersectionObserver from '../composables/intersectionObserver'

// Fade in animation from composable for sections
useIntersectionObserver()
onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.querySelector('html').dataset.theme = storedTheme
  }
})
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
              Track your expenses
              <span
                class="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent"
                >smartly!</span
              >
            </h1>
            <transition appear name="slide-down-p">
              <p class="slide-down-appear-p mt-5 max-w-[700px] lg:mt-9">
                With our budget app, you can easily manage your income and spending, set goals and
                budgets, and monitor your progress. Whether you want to save for a vacation, pay off
                debt, or plan for retirement, our app will help you achieve your financial dreams.
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
        <img
          class="rounded-md"
          src="https://th.bing.com/th/id/OIP.U16dXVXFDPhpbTMd03hbUgHaE8?pid=ImgDet&rs=1"
          alt=""
        />
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">Easy to use.</h2>
          <p class="">
            Our budget app is designed to be user-friendly and intuitive. You can easily enter your
            income and expenses, categorize them, and view your transactions in a simple dashboard.
            You can also create custom budgets and goals, and get personalized tips and insights to
            improve your financial habits.
          </p>
        </div>
      </div>
    </section>
    <section class="fade-in mt-12 py-6">
      <div class="mt-4 flex flex-wrap-reverse items-center justify-center gap-4 p-4 sm:flex-nowrap">
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">Easy to track.</h2>
          <p class="">
            Our budget app helps you to manage your money better and avoid unnecessary spending. You
            can see how much you spend on different categories, compare your spending with your
            income, and identify areas where you can save more.
          </p>
        </div>

        <img
          class="rounded-md"
          src="https://th.bing.com/th/id/OIP.U16dXVXFDPhpbTMd03hbUgHaE8?pid=ImgDet&rs=1"
          alt=""
        />
      </div>
    </section>
    <section class="fade-in mt-12 py-6">
      <div class="mt-4 flex flex-wrap items-center justify-center gap-4 p-4 sm:flex-nowrap">
        <img
          class="rounded-md"
          src="https://th.bing.com/th/id/OIP.U16dXVXFDPhpbTMd03hbUgHaE8?pid=ImgDet&rs=1"
          alt=""
        />
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">Convenient to work with.</h2>
          <p class="">
            Our budget app does what it should do: help you manage your money. It does not have
            unnecessary functionalities that will confuse you or distract you from your goals. It is
            a simple and straightforward tool that lets you track your income and expenses.
          </p>
        </div>
      </div>
    </section>
    <section class="fade-in my-12 container mx-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-2 w-full place-items-center rounded-md border border-base-300 py-4 px-2 sm:py-12 sm:px-4 shadow-sm shadow-black/80"
      >
        <p class="text-center md:text-left text-lg md:text-xl py-4 font-semibold">
          Want to manage your money better and reach your financial goals? Our budget app is for
          you. Start today!
        </p>
        <RouterLink
          to="/signup"
          class="btn btn-warning hover:bg-yellow-400 px-12 text-lg hover:shadow-sm hover:shadow-black/50"
        >
          Join us
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
