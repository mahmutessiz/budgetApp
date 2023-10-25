<script setup>
import DashboardMenu from '../components/DashboardMenu.vue'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import DashboardMain from '../components/DashboardMain.vue'
</script>
<template>
  <div>
    <DashboardMenu />
    <div class="w-full flex border border-red-400">
      <DashboardSidebar />
      <DashboardMain />
    </div>
  </div>
</template>
