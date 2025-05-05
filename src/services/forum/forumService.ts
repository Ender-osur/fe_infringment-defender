import api from "../api/apiClient";

export interface ForumPayload {
  title: string;
  description: string;
}

export interface Forum {
  id: string;
  title: string;
  description: string;
  userName?: string;
  createdAt?: string;
}

export interface Comment {
  id: string;
  content: string;
  userName: string;
  createdAt: string;
  forumId: string;
  userId: string;
}

export interface ForumWithComments {
  forum: Forum;
  comments: Comment[];
}

const ForumService = {
  async create(payload: ForumPayload): Promise<Forum> {
    const response = await api.post('/forum', payload);
    return response.data;
  },

  async pagination(page = 1, limit = 50): Promise<ForumWithComments[]> {
    const response = await api.get(`/forum/pagination?page=${page}&limit=${limit}`);
    
    // Transformar los datos si es necesario para adaptarlos a nuestra estructura
    if (Array.isArray(response.data)) {
      return response.data.map((item) => {
        // Si los datos ya vienen en el formato esperado
        if (item.forum && Array.isArray(item.comments)) {
          return item;
        }
        
        // Si los datos vienen en un formato diferente, adaptarlos
        return {
          forum: {
            id: item.id || '',
            title: item.title || '',
            description: item.description || '',
            userName: item.userName || 'Anónimo',
            createdAt: item.createdAt || new Date().toISOString()
          },
          comments: []
        };
      });
    }
    
    // Si no es un array, devolver un array vacío
    console.error('La respuesta del backend no es un array:', response.data);
    return [];
  },

  async addComment(forumId: string, content: string): Promise<Comment> {
    // Obtener el ID de usuario del localStorage
    const userId = localStorage.getItem('userId');
    const userStr = localStorage.getItem('user');
    let userName = 'Usuario';
    
    // Intentar obtener el nombre del usuario para mostrarlo en el comentario
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        if (userObj.fullName) {
          userName = userObj.fullName;
        } else if (userObj.email) {
          userName = userObj.email.split('@')[0];
        }
      } catch (error) {
        console.error('Error al parsear datos de usuario:', error);
      }
    }
    
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    
    const response = await api.post('/forum/comment', { forumId, content, userId });
    return response.data;
  }
};

export default ForumService;
