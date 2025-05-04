import { consultService } from '@/services/chat/ConsultService'
import { messageService } from '@/services/messages/MessageService'
import { AssistantService } from '@/services/assistant/AssistantService'
import { ConversationService } from '@/services/chat/conversationService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

  const conversationsData = ref<Conversation[]>([])
  const isCreatingConversation = ref(false)
  const selectedConversationId = ref<number | null>(null);
  const isLoading = ref(false);
  const router = useRouter();

  // Función para obtener el ID del usuario desde localStorage o desde el objeto user
  const getUserId = (): number | null => {
    // Intentar obtener directamente el userId
    const userId = localStorage.getItem('userId');
    if (userId) {
      return Number(userId);
    }
    
    // Si no existe, intentar obtenerlo del objeto user
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user && user.id) {
          // Guardar el userId para futuros accesos
          localStorage.setItem('userId', user.id.toString());
          return Number(user.id);
        }
      } catch (e) {
        console.error('Error al parsear el objeto user:', e);
      }
    }
    
    return null;
  };

  const handleSend = async (text: string) => {
    console.log('Mensaje enviado:', text)
    isLoading.value = true;
    
    // Agregar mensaje del usuario al chat
    const userMessageId = Date.now();
    messages.value.push({
      id: userMessageId,
      text,
      isUser: true,
      timestamp: new Date(),
    })
    
    try {
      // Verificar si ya existe una conversación o necesitamos crear una nueva
      let currentConversationId = selectedConversationId.value;
      
      // Si no hay conversación seleccionada y no estamos en proceso de crear una
      if (!currentConversationId && !isCreatingConversation.value) {
        isCreatingConversation.value = true;
        try {
          // Crear una nueva conversación
          console.log('Creando nueva conversación...');
          const userId = getUserId();
          
          if (!userId) {
            // Si no hay userId, el usuario no está autenticado
            console.error('Usuario no autenticado');
            messages.value.push({
              id: Date.now(),
              text: 'Debes iniciar sesión para usar el chat. Serás redirigido a la página de inicio de sesión.',
              isUser: false,
              timestamp: new Date(),
            });
            
            // Redirigir al usuario a la página de inicio de sesión después de un breve retraso
            setTimeout(() => {
              router.push('/login');
            }, 2000);
            
            isCreatingConversation.value = false;
            isLoading.value = false;
            return;
          }
          
          const newConversation = await ConversationService.create(
            userId, 
            `Conversación ${new Date().toLocaleString()}`
          );
          
          console.log('Nueva conversación creada:', newConversation);
          
          // Actualizar el estado con la nueva conversación
          conversationsData.value.unshift({
            id: newConversation.id,
            text: `Conversación ${new Date().toLocaleString()}`,
            timestamp: new Date(),
          });
          
          currentConversationId = newConversation.id;
          selectedConversationId.value = currentConversationId;
        } catch (error) {
          console.error('Error al crear la conversación:', error);
          messages.value.push({
            id: Date.now(),
            text: 'Error al crear la conversación. Por favor, intenta de nuevo.',
            isUser: false,
            timestamp: new Date(),
          });
          isCreatingConversation.value = false;
          isLoading.value = false;
          return;
        }
        isCreatingConversation.value = false;
      }
      
      if (!currentConversationId) {
        throw new Error('No se pudo obtener o crear una conversación');
      }
      
      console.log('Enviando mensaje al asistente con conversationId:', currentConversationId);
      
      // Usar el endpoint del asistente
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
    } finally {
      isLoading.value = false;
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
    console.log("el id de la conversación es :: ", conversationId);

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
    selectedConversationId,
    isLoading
  }
}
