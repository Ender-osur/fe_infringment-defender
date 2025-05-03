import { consultService } from '@/services/chat/ConsultService'
import { ref } from 'vue'

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

  const handleHistory = () => {

      const response = consultService.getHistory();
      console.log('response :: ', response);
      response.then((res) => {
        console.log('res :: ', res);
        const conversations = res.data.conversations;
        console.log('conversations :: ', conversations);
        conversations.forEach((conversation) => {
          conversation.messages.forEach((message) => {
            messages.value.push({
              id: message.id,
              text: message.content,
              isUser: message.reference === "true",
              timestamp: new Date(message.createdAt),
            })
          })
        })
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
