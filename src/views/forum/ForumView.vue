<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/user';
import api from '@/services/api/apiClient';
import ForumList from './ForumList.vue';
import NewForumForm from './NewForumForm.vue';

const forums = ref([]);
const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;

const loadForums = async () => {
  try {
    const { data } = await api.get('/forum/pagination?page=1&limit=50');
    forums.value = data;
  } catch (error) {
    console.error('Error al cargar los foros', error);
  }
};

onMounted(() => {
  console.log('SE MONTÓ FORO');
});
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto space-y-6">
    <NewForumForm v-if="isAuthenticated" @forumCreated="loadForums" />
    <ForumList :forums="forums" />
  </div>
</template>
<style scoped>
/* Puedes añadir estilos propios aquí si lo necesitas */
</style>
