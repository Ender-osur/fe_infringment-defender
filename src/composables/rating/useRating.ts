import { ratingService } from '@/services/rating/ratingService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export const useRating = () => {
  const isModalOpen = ref(false);
  const isLoading = ref(false);
  const router = useRouter();

  let conversationId = 0;
  const error = ref<string | null>(null);
  const openModal = () => {
    isModalOpen.value = true;
  };
  const closeModal = () => {
    isModalOpen.value = false;
    error.value = null;
    router.push('/home');
  };
  const setConversationId = (id: number) => {
    conversationId = id;
  };
  const submitRating = async (data: { qualification: number; comment: string }) => {
    console.log("vamos a guardar el rating conversationId ...", conversationId);
    isLoading.value = true;
    error.value = null;
    try {
      await ratingService.submitRating({
        ...data,
        conversationId: conversationId
      });
      closeModal();
    } catch (e) {
        console.log("error in useRting :: ", e);
      error.value = 'Failed to submit rating. Please try again.';
    } finally {
      isLoading.value = false;
    }
  };
  return {
    isModalOpen,
    isLoading,
    error,
    openModal,
    closeModal,
    submitRating,
    setConversationId
  };
};