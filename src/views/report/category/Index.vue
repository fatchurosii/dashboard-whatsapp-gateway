<template>
    Report Category
</template>

<script setup lang="ts">
  import {onMounted} from 'vue';
  import {initMetronicPlugin} from '@plugins/global';
  onMounted(() => {
    initMetronicPlugin();
  });
</script>