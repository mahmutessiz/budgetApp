<script setup>
// The `RouterView` component is a built-in component provided by Vue Router that
// is used to render the component associated with the current route.
import { RouterView } from 'vue-router'
import DashboardMenu from './components/DashboardMenu.vue'
import FooterMain from './components/FooterMain.vue'
</script>
<template>
  <div>
    <DashboardMenu />
    <RouterView />
    <FooterMain />
  </div>
</template>
