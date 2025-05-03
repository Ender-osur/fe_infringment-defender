import { consultService } from '@/services/chat/ConsultService'
import { messageService } from '@/services/messages/MessageService'
import { ref } from 'vue'

export interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export interface Conversation {
  id: number
  text: string
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

  const conversationsData = ref<Conversation[]>([
    {
      id: 1,
      text: '',
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
        console.log('res solo :: ', res);
        const conversations = res.data;
        console.log('conversations :: ', conversations);
        conversations.forEach((conversation) => {
          //conversation.messages.forEach((message) => {
            conversationsData.value.push({
              id: conversation.id,
              text: "Conversation "+ conversation.id,
              timestamp: new Date(),
            })
          //})
        })
        return responseConversation;
      }).catch((error) => {
        console.log('Error fetching history :: ', error)
      })
  }



  const handleMessage = (conversationId: number) => {
    console.log("el id de la conversacion es :: ", conversationId);

const response = messageService.getMessagesByUser(conversationId);
    console.log('response :: ', response);
    response.then((res) => {
      console.log('res :: ', res);
      const messagesData = res.data;
      console.log('messagesData :: ', messagesData);


      messagesData.forEach((message) => {
          messages.value.unshift({
            id: message.id,
            text: message.content,
            isUser: message.reference === "true",
            timestamp: new Date(message.createdAt),
          })
        })
      
    }).catch((error) => {
      console.error('Error fetching messages:', error)
    })
}



  return {
    messages,
    handleSend,
    handleHistory,
    conversationsData,
    handleMessage
  }
}
