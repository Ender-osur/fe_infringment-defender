import { ratingService } from '@/services/rating/ratingService';
import { ref } from 'vue';


export const useRating = () => {
  const isModalOpen = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const openModal = () => {
    isModalOpen.value = true;
  };
  const closeModal = () => {
    isModalOpen.value = false;
    error.value = null;
  };
  const submitRating = async (data: { qualification: number; comment: string, conversationId: number }) => {
    isLoading.value = true;
    error.value = null;
    try {
      await ratingService.submitRating(data);
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
    submitRating
  };
};