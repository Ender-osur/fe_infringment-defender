import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null);
  const isAuthenticated = ref(false);
  const conversationsId = ref<string | null>(null);

  function login({ id }: { id: string | number }) {
    userId.value = String(id);
    isAuthenticated.value = true;
  }

  function logout() {
    userId.value = null;
    isAuthenticated.value = false;
    conversationsId.value = null;
  }

  return {
    userId,
    isAuthenticated,
    conversationsId,
    setUser: login,
    logout,
  };
});
