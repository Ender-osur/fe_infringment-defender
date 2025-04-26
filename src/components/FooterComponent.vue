<script setup lang="ts"></script>

<template>
  <footer
    class="w-full bg-gray-100 dark:bg-gray-800 py-8 transition-colors duration-300 items-center flex justify-center"
  >
    <div class="container text-center">
      <p class="text-gray-600 dark:text-gray-400">
        {{ new Date().getFullYear() }} | {{ $t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: 40px;
}
</style>
