<template>
  <form class="flex items-center">
    <img src="../assets/icons/language.svg" alt="globe icon" />
    <select @change="updateLanguage()" v-model="$i18n.locale" class="bg-base-100">
      <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
        {{ locale.toUpperCase() }}
      </option>
    </select>
  </form>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const locales = ['tr', 'fr', 'en']

const updateLanguage = () => {
  localStorage.setItem('locale', locale.value)
}

onMounted(() => {
  if (localStorage.getItem('locale')) {
    locale.value = localStorage.getItem('locale')
  } else {
    localStorage.setItem('locale', locale.value)
  }
})
</script>
