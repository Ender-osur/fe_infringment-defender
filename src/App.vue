<script setup lang="ts">

import { RouterView } from 'vue-router';
import LayoutRoot from './components/layout/LayoutRoot.vue';
</script>

<template>
  <LayoutRoot>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </LayoutRoot>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
