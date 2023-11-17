<script setup>
import { RouterLink } from 'vue-router'
import useIntersectionObserver from '../composables/intersectionObserver'

// Fade in animation from composable for sections
useIntersectionObserver()
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
              Manage your hotel
              <span
                class="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent"
                >easily!</span
              >
            </h1>
            <transition appear name="slide-down-p">
              <p class="slide-down-appear-p mt-5 max-w-[700px] lg:mt-9">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab odio consequatur et
                cumque totam commodi ut dolores doloremque aliquam facere. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Ab odio consequatur et cumque totam commodi ut
                dolores doloremque aliquam facere.
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ut laudantium
            suscipit tempore inventore accusantium qui ullam tenetur ab, adipisci omnis fuga quis
            quae sint repudiandae. Qui iure cum quidem?
          </p>
        </div>
      </div>
    </section>
    <section class="fade-in mt-12 py-6">
      <div class="mt-4 flex flex-wrap-reverse items-center justify-center gap-4 p-4 sm:flex-nowrap">
        <div class="px-2 md:w-[40%]">
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">Easy to manage.</h2>
          <p class="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ut laudantium
            suscipit tempore inventore accusantium qui ullam tenetur ab, adipisci omnis fuga quis
            quae sint repudiandae. Qui iure cum quidem?
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
          <h2 class="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">Easy to track.</h2>
          <p class="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ut laudantium
            suscipit tempore inventore accusantium qui ullam tenetur ab, adipisci omnis fuga quis
            quae sint repudiandae. Qui iure cum quidem?
          </p>
        </div>
      </div>
    </section>
    <section class="fade-in my-12 grid w-full place-items-center">
      <div class="grid w-[90%] place-items-center rounded-md border p-4 md:w-[70%]">
        <p class="w-[70%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor tempora praesentium
          repudiandae ullam, facilis ipsum consequatur non velit veritatis aliquam illum mollitia
          commodi deserunt, necessitatibus sunt modi, tempore autem nihil.
        </p>
        <RouterLink
          to="/signup"
          class="mt-4 rounded-md btn btn-warning px-4 py-2 hover:shadow-md hover:shadow-black/50"
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
