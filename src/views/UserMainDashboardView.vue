<script setup>
import DashboardMenu from '../components/DashboardMenu.vue'
import DashboardMain from '../components/DashboardMain.vue'
import DashBoardSidebar from '../components/DashBoardSidebar.vue'
</script>
<template>
  <div>
    <DashboardMenu />
    <div class="w-full flex border border-red-400 mb-12">
      <DashBoardSidebar />
      <DashboardMain />
    </div>
  </div>
</template>
