<script setup lang="ts">
import CommonButton from './CommonButton.vue';

defineProps<{
  title: string;
  description: string;
  buttonText: string;
  path?: string;
  buttonClass?: string;
}>();
</script>

<template>
  <div
    class="dark:bg-dark-2 bg-light-2 rounded-lg flex flex-col justify-between gap-4 min-h-44 min-w-60 h-60 max-w-70 p-2"
  >
    <h3 class="text-xl font-bold dark:text-osur text-osur-dark text-center">{{ title }}</h3>
    <p class="text-ptd dark:text-ptd-light text-center">{{ description }}</p>
    <CommonButton :text="buttonText" :path="path" :styles="buttonClass" />
  </div>
</template>
