<script setup>
// The code is importing the `ref` and `onMounted` functions from the Vue library, as well as importing
// the `supabase` object from the `supabaseClient` module located in the `../lib` directory. These
// imports are used in the script setup to define reactive variables and perform actions when the
// component is mounted.

import { supabase } from '../lib/supabaseClient'

const logout = async () => {
  let { error } = await supabase.auth.signOut()
  console.log('succesfull logout', error)
  console.log(await supabase.auth.getUser())
}
</script>

<template>
  <main>
    <ul>
      <button class="btn btn-error" @click="logout">tikla</button>
    </ul>
  </main>
</template>
