<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  text: string;
  styles?: string;
  path?: string;
}>();

const router = useRouter();

const handleClick = () => {
  console.log("path", props.path)
  if (props.path) {
    router.push(props.path);
  }

};
</script>

<template>
  <button
    @click="handleClick"
    class="cursor-pointer px-4 py-2 rounded transition-colors duration-200 hover:opacity-80 font-semibold dark:text-dark text-light dark:bg-osur bg-osur-dark"
    :class="props.styles"
  >
    {{ props.text }}
  </button>
</template>
