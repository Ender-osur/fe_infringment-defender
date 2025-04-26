import { ref } from 'vue';
import { type TranslationResponse } from '@/models/interfaces/translationResponse';
import { translateService } from '@/services/translateService';
import { type Message } from '@/models/interfaces/translate';

export const useTranslate = () => {
  const translationResponse = ref<TranslationResponse | null>(null);
  const errorTranslation = ref<string | null>(null);
  const statusTranslation = ref<number | null>(null);
  const isLoading = ref(false);

  const translate = async (message: Message) => {
    isLoading.value = true;
    errorTranslation.value = null;

    try {
      const response = await translateService.translate(message);

      if (response.data) {
        translationResponse.value = response.data;
        statusTranslation.value = response.status;
      } else {
        errorTranslation.value = (response.data as { error: string }).error;
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    translationResponse,
    statusTranslation,
    errorTranslation,
    isLoading,
    translate,
  };
};
