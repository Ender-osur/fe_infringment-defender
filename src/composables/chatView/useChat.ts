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

  return {
    messages,
    handleSend,
  }
}
