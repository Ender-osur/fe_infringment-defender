<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import api from '@/services/api/apiClient';
import ForumList from './ForumList.vue';
import NewForumForm from './NewForumForm.vue';

const forums = ref([]);
const showForm = ref(false);

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const router = useRouter();

const loadForums = async () => {
  try {
    const { data } = await api.get('/forum/pagination?page=1&limit=50');
    forums.value = data;
  } catch (error) {
    console.error('Error al cargar los foros', error);
  }
};

onMounted(() => {
  loadForums();
});

const handleCreateQuestion = () => {
  if (isAuthenticated) {
    showForm.value = true;
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto space-y-6">
    <!-- Mostrar formulario solo si está autenticado y se eligió crear -->
    <NewForumForm v-if="showForm && isAuthenticated" @forumCreated="loadForums" />

    <!-- Si ya hay publicaciones o no se ha hecho clic todavía -->
    <ForumList :forums="forums" @createQuestion="handleCreateQuestion" />
  </div>
</template>
