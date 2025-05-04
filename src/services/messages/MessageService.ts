import { type AxiosResponse } from 'axios'
import api from '../api/apiClient'

export interface Message{
    id: number;
    conversationId: number;
    content: string;
    reference: string;
    createdAt: string;
}

export interface MessageResponse {
    result: Message[];
}

class MessageService {
    

    async getMessagesByUser(conversationId: number): Promise<AxiosResponse<MessageResponse>> {
        let currentPage = localStorage.getItem('currentPage');
        const limit  = import.meta.env.VITE_APP_LIMIT || '10';

        console.log("limit is :: ", limit);
        if (currentPage) {
            localStorage.setItem('currentPage', (parseInt(currentPage)+1).toString());
         }else {
            currentPage = '1';
            localStorage.setItem('currentPage', (parseInt(currentPage)+1).toString());
        }
        const response: AxiosResponse<MessageResponse> = await api.get(
            `/conversations/messages/pagination?id=${conversationId}&page=${currentPage}&limit=${limit}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        console.log('response in service message :: ', response.data);
        return response;
    }
}

export const messageService = new MessageService();