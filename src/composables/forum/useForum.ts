import { ref } from 'vue';
import ForumService, { type Forum } from '@/services/forum/forumService';

export function useForum() {
  const forums = ref<Forum[]>([]);
  const isLoading = ref(false);
  const error = ref('');

  const loadForums = async (page = 1, limit = 50) => {
    try {
      isLoading.value = true;
      error.value = '';
      const data = await ForumService.pagination(page, limit);
      forums.value = data;
    } catch (err) {
      error.value = 'Error al cargar los foros';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createForum = async (title: string, comment: string) => {
    try {
      error.value = '';
      await ForumService.create({ title, comment });
    } catch (err) {
      error.value = 'Error al crear el foro';
      console.error(err);
      throw err;
    }
  };

  return {
    forums,
    isLoading,
    error,
    loadForums,
    createForum,
  };
}
