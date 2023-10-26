<script setup>
// The code is importing the `ref` and `onMounted` functions from the Vue library, as well as importing
// the `supabase` object from the `supabaseClient` module located in the `../lib` directory. These
// imports are used in the script setup to define reactive variables and perform actions when the
// component is mounted.
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <main>
    <ul>
      <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
    </ul>
  </main>
</template>
