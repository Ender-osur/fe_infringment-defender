import { consultService } from '@/services/chat/ConsultService'
import { messageService } from '@/services/messages/MessageService'
import { AssistantService } from '@/services/assistant/AssistantService'
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

  const selectedConversationId = ref<number | null>(null);

  const handleSend = async (text: string) => {
    console.log('Mensaje enviado:', text)
    
    // Agregar mensaje del usuario al chat
    const userMessageId = Date.now();
    messages.value.push({
      id: userMessageId,
      text,
      isUser: true,
      timestamp: new Date(),
    })
    
    // Obtener el ID de la conversación actual
    const currentConversationId = selectedConversationId.value || conversationsData.value[0]?.id;
    
    if (!currentConversationId) {
      console.error('No hay una conversación seleccionada');
      return;
    }
    
    try {
      console.log('Enviando mensaje al asistente con conversationId:', currentConversationId);
      
      // Usar directamente el endpoint principal
      const response = await AssistantService.sendMessage({
        conversationId: Number(currentConversationId),
        reqLanguage: localStorage.getItem('language') || 'es',
        reqText: text
      });
      
      console.log('Respuesta recibida del asistente:', response);
      
      // Agregar respuesta del asistente al chat
      messages.value.push({
        id: Date.now(),
        text: response.result,
        isUser: false,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error al enviar mensaje al asistente:', error);
      // Mostrar mensaje de error en el chat
      messages.value.push({
        id: Date.now(),
        text: 'Lo siento, ha ocurrido un error al procesar tu mensaje.',
        isUser: false,
        timestamp: new Date(),
      });
    }
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
    handleMessage,
    selectedConversationId
  }
}
