import { ref } from 'vue';
import ForumService, { type ForumWithComments } from '@/services/forum/forumService';

export function useForum() {
  const forums = ref<ForumWithComments[]>([]);
  const isLoading = ref(false);
  const error = ref('');

  const loadForums = async (page = 1, limit = 50) => {
    try {
      isLoading.value = true;
      error.value = '';
      const data = await ForumService.pagination(page, limit);
      console.log('Datos recibidos del backend:', data);
      forums.value = data;
    } catch (err) {
      error.value = 'Error al cargar los foros';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createForum = async (title: string, description: string) => {
    try {
      error.value = '';
      await ForumService.create({ title, description });
    } catch (err) {
      error.value = 'Error al crear el foro';
      console.error(err);
      throw err;
    }
  };

  const addComment = async (forumId: string, content: string) => {
    try {
      error.value = '';
      const comment = await ForumService.addComment(forumId, content);
      return comment;
    } catch (err) {
      error.value = 'Error al agregar el comentario';
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
    addComment,
  };
}
