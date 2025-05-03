import axios, { type AxiosResponse } from 'axios'
import { apiMultiservice } from '../api/apiClient'
import type { HistoryResponse } from '@/models/interfaces/chatHistory';

class ConsultService {
    async getHistory(): Promise<AxiosResponse<HistoryResponse>> {
        const response: AxiosResponse<HistoryResponse> = await apiMultiservice.get(
            '/api/conversations/history/1/10',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        console.log('response :: ', response);
        return response;
    }
}
export const consultService = new ConsultService();

