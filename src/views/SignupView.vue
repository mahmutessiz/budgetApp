<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="sm:mt-6 text-center text-xl sm:text-3xl font-extrabold">
          Sign up for a new account
        </h2>
      </div>
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
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient.js'

const router = useRouter()

const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { name: name.value, lastName: lastName.value }
      }
    })

    if (error) throw error

    if (data) router.push('/login')
  } catch (error) {
    alert(error.error_description || error.message)
  }
}
</script>
