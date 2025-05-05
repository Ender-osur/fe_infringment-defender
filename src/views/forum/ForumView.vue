<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/user';
import { useForum } from '@/composables/forum/useForum';

import ForumList from './ForumList.vue';
import NewForumForm from './NewForumForm.vue';

const showForm = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const { forums, loadForums } = useForum();

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
</script>


<template>
  <div class="p-4 max-w-3xl mx-auto space-y-6">
    <NewForumForm
      v-if="showForm && isAuthenticated"
      @forumCreated="() => { loadForums(); showForm = false; }"
      @cancel="handleCancel"
    />

    <ForumList
    v-else
      :forums="forums"
      @createQuestion="handleCreateQuestion"
    />
  </div>
</template>
