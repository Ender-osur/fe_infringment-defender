import { ref } from 'vue';
import { ConversationService } from '@/services/chat/conversationService';
import type { Conversation } from '@/types/conversation';

export function useConversation() {
  const conversations = ref<Conversation[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getAllConversations = async () => {
    loading.value = true;
    error.value = null;
    try {
      conversations.value = await ConversationService.getAll();
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Error fetching conversations';
      }
    } finally {
      loading.value = false;
    }
  };

  const getConversationsByUserId = async (userId: number) => {
    loading.value = true;
    error.value = null;
    try {
      conversations.value = await ConversationService.getByUserId(userId);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Error fetching user conversations';
      }
    } finally {
      loading.value = false;
    }
  };

  const createConversation = async (userId: number, title: string) => {
    loading.value = true;
    error.value = null;
    try {
      const newConversation = await ConversationService.create(userId, title);
      conversations.value.push(newConversation);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Error creating conversation';
      }
    } finally {
      loading.value = false;
    }
  };

  const updateConversation = async (id: number, data: Partial<Conversation>) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedConversation = await ConversationService.update(id, data);
      const index = conversations.value.findIndex((conv) => conv.id === id);
      if (index !== -1) {
        conversations.value[index] = updatedConversation;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Error updating conversation';
      }
    } finally {
      loading.value = false;
    }
  };

  const deleteConversation = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await ConversationService.delete(id);
      conversations.value = conversations.value.filter((conv) => conv.id !== id);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Error deleting conversation';
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    conversations,
    loading,
    error,
    getAllConversations,
    getConversationsByUserId,
    createConversation,
    updateConversation,
    deleteConversation,
  };
}
