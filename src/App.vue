<template>  
  <main>
    <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
    </router-view>
  </main>
</template>

<script setup lang="ts">
  
</script>
