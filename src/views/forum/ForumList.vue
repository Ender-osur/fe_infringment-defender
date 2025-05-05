<script setup lang="ts">
import { ref } from 'vue';
import { type ForumWithComments } from '@/services/forum/forumService';

defineProps<{ forums: ForumWithComments[]; isAuthenticated: boolean }>();
const emit = defineEmits(['createQuestion', 'addComment']);

// Estado para manejar los comentarios
const newComments = ref<Record<string, string>>({});
const showComments = ref<Record<string, boolean>>({});
const isSubmittingComment = ref<Record<string, boolean>>({});
const commentError = ref<Record<string, string>>({});

// Función para alternar la visualización de comentarios
const toggleComments = (forumId: string) => {
  showComments.value[forumId] = !showComments.value[forumId];
};

// Función para agregar un comentario
const addComment = async (forumId: string) => {
  if (!newComments.value[forumId] || newComments.value[forumId].trim() === '') {
    commentError.value[forumId] = 'El comentario no puede estar vacío';
    return;
  }

  isSubmittingComment.value[forumId] = true;
  commentError.value[forumId] = '';

  try {
    await emit('addComment', forumId, newComments.value[forumId]);
    newComments.value[forumId] = '';
  } catch (error) {
    commentError.value[forumId] = 'Error al agregar el comentario. Inténtalo de nuevo.';
    console.error('Error al agregar comentario:', error);
  } finally {
    isSubmittingComment.value[forumId] = false;
  }
};

// Función para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Función para obtener las iniciales del usuario
const getUserInitials = () => {
  try {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      if (userData.fullName) {
        // Obtener las iniciales del nombre completo
        const nameParts = userData.fullName.split(' ');
        if (nameParts.length >= 2) {
          return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        } else if (nameParts.length === 1) {
          return nameParts[0].substring(0, 2).toUpperCase();
        }
      } else if (userData.email) {
        // Si no hay nombre completo, usar las primeras letras del email
        return userData.email.substring(0, 2).toUpperCase();
      }
    }
  } catch (error) {
    console.error('Error al obtener iniciales del usuario:', error);
  }
  return 'U'; // Valor por defecto
};
</script>

<template>
  <div class="space-y-6">
    <div v-if="forums.length === 0" class="text-center text-gray-500 dark:text-gray-400 space-y-4">
      <p>{{ $t('forum.noPosts') }}</p>
    </div>

    <!-- Contenedor principal para cada post con ancho fijo -->
    <div v-else class="flex flex-col justify-center items-center gap-6">
      <div
        v-for="forumData in forums"
        :key="forumData.forum.id"
        class="border border-dark dark:border-light rounded-lg bg-light dark:bg-dark-2 shadow-md w-full max-w-3xl overflow-hidden"
      >
        <!-- Contenido del post -->
        <div class="p-6">
          <div>
            <div class="flex items-center justify-between">
              <h2 class="font-bold text-pt dark:text-pt-light text-xl">
                {{ forumData.forum.title }}
              </h2>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {{ formatDate(forumData.forum.createdAt || '') }}
              </span>
            </div>
            <p class="text-subtext dark:text-subtext-dark mt-2">
              {{ forumData.forum.description }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {{ $t('forum.postedBy') }}:
              <span class="font-semibold">{{ forumData.forum.userName }}</span>
            </p>
          </div>

          <!-- Botón para mostrar/ocultar comentarios -->
          <div class="mt-4">
            <button
              @click="toggleComments(forumData.forum.id)"
              class="text-sm text-osur-dark dark:text-osur underline cursor-pointer"
            >
              {{
                showComments[forumData.forum.id]
                  ? $t('forum.hideComments')
                  : $t('forum.showComments')
              }}
              ({{ forumData.comments.length }})
            </button>
          </div>
        </div>

        <!-- Sección de comentarios con el mismo ancho que el post -->
        <!-- Usamos un div con altura mínima cuando los comentarios no están visibles para mantener dimensiones consistentes -->
        <div
          v-if="showComments[forumData.forum.id]"
          class="border-t border-gray-200 dark:border-gray-700 bg-[var(--color-light-3)] dark:bg-[var(--color-dark-2)] p-6"
        >
          <div
            v-if="forumData.comments.length === 0"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            {{ $t('forum.noComments') }}
          </div>

          <div
            v-for="comment in forumData.comments"
            :key="comment.id"
            class="bg-[var(--color-light-2)] dark:bg-[var(--color-dark-3)] p-3 rounded-lg mb-3 border border-gray-200 dark:border-gray-700"
          >
            <div class="flex justify-between items-start">
              <p class="font-semibold text-sm text-gray-800 dark:text-gray-200">
                {{ comment.userName }}
              </p>
              <span class="text-xs text-gray-600 dark:text-gray-400">
                {{ formatDate(comment.createdAt) }}
              </span>
            </div>
            <p class="text-sm mt-1 text-gray-700 dark:text-gray-300">{{ comment.content }}</p>
          </div>

          <!-- Formulario para agregar comentario -->
          <div class="mt-6" v-if="isAuthenticated">
            <div class="flex items-start gap-3">
              <div
                class="w-10 h-10 rounded-full bg-osur-dark dark:bg-osur flex items-center justify-center text-white font-bold text-lg"
              >
                {{ isAuthenticated ? getUserInitials() : '?' }}
              </div>
              <div class="flex-1">
                <div class="relative">
                  <input
                    v-model="newComments[forumData.forum.id]"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[var(--color-dark-3)] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-osur-dark dark:focus:ring-osur"
                    :placeholder="$t('forum.writeComment')"
                    @keyup.enter="addComment(forumData.forum.id)"
                  />
                  <div class="flex justify-end mt-2">
                    <button
                      @click="addComment(forumData.forum.id)"
                      class="bg-osur-dark dark:bg-osur text-white dark:text-black py-1 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-colors border border-gray-300 dark:border-transparent shadow-md flex items-center"
                      :disabled="isSubmittingComment[forumData.forum.id]"
                    >
                      <span
                        v-if="isSubmittingComment[forumData.forum.id]"
                        class="flex items-center"
                      >
                        <svg
                          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {{ $t('forum.sendingComment') }}
                      </span>
                      <span v-else>{{ $t('forum.addComment') }}</span>
                    </button>
                  </div>
                </div>
                <p v-if="commentError[forumData.forum.id]" class="text-sm text-red-500 mt-1 ml-2">
                  {{ commentError[forumData.forum.id] }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-4" v-else>
            <div class="text-center">
              <router-link
                to="/login"
                class="inline-block py-2 px-6 bg-osur-dark dark:bg-osur rounded-lg hover:opacity-90 transition-colors text-sm font-medium border border-gray-300 dark:border-transparent shadow-md"
              >
                <span class=" text-light dark:text-dark">
                  {{ $t('forum.loginToComment') }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Agregamos un div con altura mínima cuando los comentarios no están visibles -->
        <div
          v-else
          class="border-t border-gray-200 dark:border-gray-700 bg-[var(--color-light-3)] dark:bg-[var(--color-dark-2)] min-h-[1px]"
        ></div>
      </div>
    </div>
  </div>
</template>
