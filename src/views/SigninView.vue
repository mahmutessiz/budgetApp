<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient.js'

const router = useRouter()

const email = ref('')
const password = ref('')

const loginError = ref(false)
// The `handleLogin` function is an asynchronous function that is triggered when the user submits the
// login form.
const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    if (data) router.push({ path: '/dashboard', query: { user: data.user.id } })
  } catch (error) {
    loginError.value = true
    setTimeout(() => {
      loginError.value = false
    }, 5000)
  }
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.querySelector('html').dataset.theme = storedTheme
  }
})
</script>
<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Error -->
      <div class="alert alert-error md:w-[80%] m-auto" v-if="loginError == true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ $t('wrong_email_or_password') }}</span>
      </div>
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold">{{ $t('signin_to_account') }}</h2>
      </div>
      <!-- login form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">{{ $t('email') }}</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              required
              class="relative block w-full px-3 py-2 input input-bordered focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div class="">
            <label for="password" class="sr-only">{{ $t('password') }}</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="relative block w-full mt-2 px-3 py-2 input input-bordered focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md btn btn-primary"
          >
            {{ $t('login') }}
          </button>
        </div>
        <p>
          {{ $t('dont_have_account') }} {{ $t('click') }}
          <router-link to="/signup" class="text-blue-500 font-bold">{{ $t('signup') }}</router-link>
        </p>
      </form>
      <div>
        <span class="font-bold">{{ $t('email') }}:</span>
        mhmtessz123@yopmail.com <br />
        <span class="font-bold">{{ $t('password') }}:</span> aifcaNrPxGijPMhKGDFb
      </div>
    </div>
  </div>
</template>
