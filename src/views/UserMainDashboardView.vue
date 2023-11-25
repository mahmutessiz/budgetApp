<script setup>
import DashboardMain from '../components/DashboardMain.vue'
import DashBoardSidebar from '../components/dashboard/DashBoardSidebar.vue'
</script>

<template>
  <div>
    <div class="w-full sticky top-0 z-50">
      <DashBoardSidebar class="w-full" />
    </div>
    <DashboardMain />
  </div>
</template>
