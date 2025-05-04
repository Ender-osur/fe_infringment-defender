<script setup lang="ts">
defineProps<{ forums: Array<{ id: string; title: string; comment: string }> }>();
</script>

<template>
  <div class="space-y-6">
    <div v-if="forums.length === 0" class="text-center text-gray-500 dark:text-gray-400">
      {{ $t('forum.noPosts') }}
    </div>
    <div
      v-for="forum in forums"
      :key="forum.id"
      class="border p-4 rounded-lg bg-[var(--color-light-2)] dark:bg-[var(--color-dark-3)] shadow-sm"
    >
      <h2 class="font-bold text-[var(--color-pt)] dark:text-[var(--color-pt-light)]">
        {{ forum.title }}
      </h2>
      <p class="text-[var(--color-subtext)] dark:text-[var(--color-subtext-dark)]">
        {{ forum.comment }}
      </p>
    </div>
  </div>
</template>
