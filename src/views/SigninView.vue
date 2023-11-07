<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
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
            Sign in
          </button>
        </div>
      </form>
      <div>
        <span class="font-bold">e-mail:</span>
        mhmtessz123@yopmail.com <br />
        <span class="font-bold">password:</span> aifcaNrPxGijPMhKGDFb
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient.js'

const router = useRouter()

const email = ref('')
const password = ref('')

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
    alert(error.error_description || error.message)
  }
}
</script>
