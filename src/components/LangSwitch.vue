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

<script>
export default {
  name: 'LocaleSwitcher',
  data() {
    return { locales: ['tr', 'fr', 'en'] }
  },
  methods: {
    updateLanguage() {
      localStorage.setItem('locale', this.$i18n.locale)
    }
  },
  mounted() {
    if (localStorage.getItem('locale')) {
      this.$i18n.locale = localStorage.getItem('locale')
    } else {
      localStorage.setItem('locale', this.$i18n.locale)
    }
  }
}
</script>
