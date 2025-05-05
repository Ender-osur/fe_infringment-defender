<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/user';
import { useForum } from '@/composables/forum/useForum';

import ForumList from './ForumList.vue';
import CreateForumPost from './CreateForumPost.vue';

const showForm = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const { forums, loadForums, addComment } = useForum();

const isAuthenticated = authStore.isAuthenticated;

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

const handleCancel = () => {
  showForm.value = false;
};

const handlePostCreated = () => {
  loadForums();
  showForm.value = false;
};

const handleAddComment = async (forumId: string, content: string) => {
  if (!isAuthenticated) {
    router.push('/login');
    return;
  }

  try {
    await addComment(forumId, content);
    // Recargar los foros para obtener el comentario recién agregado
    loadForums();
  } catch (error) {
    console.error('Error al agregar comentario:', error);
  }
};
</script>


<template>
  <div class="h-screen w-full bg-light-2 dark:bg-dark">
    <!-- Botón para crear nuevo post cuando no se muestra el formulario -->
    <div v-if="!showForm" class="flex justify-center my-6">
      <button
        @click="handleCreateQuestion"
        class="px-5 py-2.5 bg-osur-dark cursor-pointer dark:bg-osur text-white dark:text-dark rounded-lg hover:opacity-90 transition-colors font-medium flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ $t('forum.createPost') }}
      </button>
    </div>

    <!-- Formulario para crear un nuevo post -->
    <CreateForumPost
      v-if="showForm && isAuthenticated"
      @postCreated="handlePostCreated"
      @cancel="handleCancel"
    />

    <!-- Lista de posts del foro -->
    <ForumList
      v-if="!showForm"
      :forums="forums"
      :isAuthenticated="isAuthenticated"
      @createQuestion="handleCreateQuestion"
      @addComment="handleAddComment"
    />
  </div>
</template>
