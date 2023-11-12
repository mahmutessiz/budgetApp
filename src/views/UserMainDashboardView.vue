<script setup>
import DashboardMain from '../components/DashboardMain.vue'
import DashBoardSidebar from '../components/dashboard/DashBoardSidebar.vue'
import DashboardMobileMenu from '@/components/dashboard/DashboardMobileMenu.vue'
</script>
<template>
  <div>
    <div class="w-full flex">
      <DashBoardSidebar />
      <DashboardMain />
    </div>
    <DashboardMobileMenu />
  </div>
</template>
