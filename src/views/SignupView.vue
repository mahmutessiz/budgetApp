<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient.js'

const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const signUpError = ref(false)
const errorMessage = ref('')

const handleSignUp = async () => {
  // Add validation here
  if (!name.value) {
    signUpError.value = true
    errorMessage.value = 'Name is required'
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  if (!lastName.value) {
    signUpError.value = true
    errorMessage.value = 'Last Name is required'
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  if (!email.value) {
    signUpError.value = true
    errorMessage.value = 'Email is required'
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  if (!password.value) {
    signUpError.value = true
    errorMessage.value = 'Password is required'
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  // Password validation
  if (password.value.length < 6) {
    signUpError.value = true
    errorMessage.value = 'Password must be at least 6 characters long'
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  const regex = /^[a-zA-Z0-9]{6,}$/
  if (!regex.test(password.value)) {
    signUpError.value = true
    errorMessage.value = 'Password must contain at least one numeric digit and one letter'
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { name: name.value, lastName: lastName.value }
      }
    })

    if (error) throw error

    if (data) alert('A comfirmation e-mail sent to you!')
  } catch (error) {
    signUpError.value = true
    errorMessage.value = error.error_description || error.message
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
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
      <div>
        <h2 class="sm:mt-6 text-center text-xl sm:text-3xl font-extrabold">
          Sign up for a new account
        </h2>
      </div>
      <!-- Error -->
      <div class="alert alert-error md:w-[80%] m-auto" v-if="signUpError == true">
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
        <span>{{ errorMessage }}</span>
      </div>
      <!-- Signup form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="name"
              required
              class="relative block w-full mt-2 px-3 py-2 input input-bordered focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <label for="lastName" class="sr-only">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              v-model="lastName"
              required
              class="relative block w-full mt-2 px-3 py-2 input input-bordered focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              required
              class="relative block w-full mt-2 px-3 py-2 input input-bordered focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
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
            Sign up
          </button>
          <p class="p-4">
            If you already have an account click
            <router-link to="/login" class="text-blue-500 font-bold">sign in</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
