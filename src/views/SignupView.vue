<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const signUpError = ref(false)
const errorMessage = ref('')

/**
 * Handles the sign up process.
 *
 * @return {Promise<void>} - A promise that resolves when the sign up process is complete.
 */
const handleSignUp = async () => {
  // Add validation here
  if (!name.value) {
    signUpError.value = true
    errorMessage.value = t('name_required')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  if (!lastName.value) {
    signUpError.value = true
    errorMessage.value = t('last_name_required')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  if (!email.value) {
    signUpError.value = true
    errorMessage.value = t('email_required')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  if (!password.value) {
    signUpError.value = true
    errorMessage.value = t('password_required')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  // Password validation
  if (password.value.length < 6) {
    signUpError.value = true
    errorMessage.value = t('password_min')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
    return
  }

  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,}$/

  if (!regex.test(password.value)) {
    signUpError.value = true
    errorMessage.value = t('password_numeric')
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

    if (data) alert(t('confirm_email'))
  } catch (error) {
    signUpError.value = true
    errorMessage.value = error.error_description || error.message
    await new Promise((resolve) => setTimeout(resolve, 3000))
    signUpError.value = false
  }
}

onMounted(() => {
  // Retrieve the stored theme from local storage
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
          {{ $t('signup_form_title') }}
        </h2>
      </div>
      <!-- Error -->
      <div class="alert alert-error md:w-[80%] m-auto" v-if="signUpError == true">
        <img src="../assets/icons/error.svg" alt="error icon" />
        <span>{{ errorMessage }}</span>
      </div>
      <!-- Signup form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">{{ $t('name') }}</label>
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
            <label for="lastName" class="sr-only">{{ $t('last_name') }}</label>
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
            <label for="email-address" class="sr-only">{{ $t('email') }}</label>
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
            {{ $t('signup') }}
          </button>
          <p class="p-4">
            {{ $t('already_have_account') }} {{ $t('click') }}
            <router-link to="/login" class="text-blue-500 font-bold">{{ $t('login') }}</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
