import { type AxiosResponse } from 'axios'
import api from '../api/apiClient'

export interface Message{
    id: number;
    conversationId: number;
    content: string;
    reference: string;
    createdAt: string;
}

class MessageService {

    async getMessagesByUser(conversationId: number): Promise<AxiosResponse<Message[]>> {
        const response: AxiosResponse<Message[]> = await api.get(
            `/conversations/messages/${conversationId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        console.log('response in service message :: ', response);
        return response;
    }
}

export const messageService = new MessageService();