<script setup lang="ts">
defineProps<{ forums: Array<{ id: string; title: string; comment: string }> }>();
const emit = defineEmits(['createQuestion']);
</script>

<template>
  <div class="space-y-6">
    <div
      v-if="forums.length === 0"
      class="text-center text-gray-500 dark:text-gray-400 space-y-4"
    >
      <button
        class="px-4 py-2 bg-osur-dark dark:bg-osur text-light dark:text-osur-dark rounded hover:bg-osur-2-dark hover:dark:bg-osur-2 font-bold tracking-[1px] cursor-pointer active:opacity-80"
        @click="emit('createQuestion')"
      >
        <p>{{ $t('forum.create') }}</p>
      </button>
      <p>{{ $t('forum.noPosts') }}</p>
    </div>

    <div
      v-else
      v-for="forum in forums"
      :key="forum.id"
      class="border p-4 rounded-lg bg-[var(--color-light-2)] dark:bg-[var(--color-dark-3)] shadow-sm"
    >
      <h2 class="font-bold text-pt dark:text-pt-light">
        {{ forum.title }}
      </h2>
      <p class="text-subtext dark:text-subtext-dark">
        {{ forum.comment }}
      </p>
    </div>
  </div>
</template>
