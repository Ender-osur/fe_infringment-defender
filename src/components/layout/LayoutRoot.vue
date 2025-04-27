<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDark } from '@vueuse/core';
import { useRoute } from 'vue-router';

import NavbarComponent from '../NavbarComponent.vue';
import FooterComponent from '../FooterComponent.vue';
import { computed } from 'vue';

const route = useRoute();
const isDark = useDark();

const isChatPage = computed(() => route.path === '/chat');
</script>

<template>
  <div
    :class="{ dark: isDark }"
    class="container-layout bg-gray-200 dark:bg-gray-900 transition-colors duration-300 flex flex-col h-screen"
  >
    <header class="shrink-[0] sticky top-0 z-50">
      <NavbarComponent />
    </header>
    <main class="flex-1 flex flex-col bg-mint-500 overflow-y-auto">
      <router-view />
    </main>
    <footer v-if="!isChatPage" class="shrink-[0]">
      <FooterComponent />
    </footer>
  </div>
</template>

<style scoped>
.container-layout {
  min-height: 100vh;
}
</style>
