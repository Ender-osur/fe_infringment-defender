import { consultService } from '@/services/chat/ConsultService'
import { ref } from 'vue'
import { useConversation } from './useConversation'

export interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export const useChat = () => {
  const messages = ref<Message[]>([
    {
      id: 1,
      text: '¡Hola! ¿Cómo puedo ayudarte?',
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const handleSend = (text: string) => {
    console.log('Mensaje enviado:', text)
    messages.value.push({
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date(),
    })
  }

  const handleHistory = async () => {

      const responseConversation = consultService.getHistory();
      console.log('response :: ', responseConversation);
      responseConversation.then((res) => {
        console.log('res :: ', res);
        const conversations = res.data.conversations;
        console.log('conversations :: ', conversations);
        conversations.forEach((conversation) => {
          conversation.messages.forEach((message) => {
            messages.value.unshift({
              id: message.id,
              text: message.content,
              isUser: message.reference === "true",
              timestamp: new Date(message.createdAt),
            })
          })
        })
        return responseConversation;
      }).catch((error) => {
        console.error('Error fetching history:', error)
      })
  }

  return {
    messages,
    handleSend,
    handleHistory,
  }
}
