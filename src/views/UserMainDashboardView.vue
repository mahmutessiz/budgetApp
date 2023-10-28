<script setup>
import DashboardMenu from '../components/DashboardMenu.vue'
import DashboardMain from '../components/DashboardMain.vue'
import DashBoardSidebar from '../components/DashBoardSidebar.vue'
import DashboardMobileMenu from '../components/DashboardMobileMenu.vue'
</script>
<template>
  <div>
    <DashboardMenu />
    <div class="w-full flex">
      <DashBoardSidebar />
      <DashboardMain />
    </div>
    <DashboardMobileMenu />
  </div>
</template>
