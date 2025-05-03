import axios, { type AxiosResponse } from 'axios'
import type { HistoryResponse } from '@/models/interfaces/chatHistory';
import api from '../api/apiClient';

class ConsultService {
    async getHistory(): Promise<AxiosResponse<HistoryResponse>> {

        // si existe la paginacion, la guardo en el local storage
         let currentPage = localStorage.getItem('currentPage');
         let pageSize = localStorage.getItem('pageSize');
         if (currentPage && pageSize) {
             localStorage.setItem('currentPage', (parseInt(currentPage)+1).toString());
             localStorage.setItem('pageSize', pageSize);
         }else {
            currentPage = '1';
            pageSize = '10';
            localStorage.setItem('currentPage', (parseInt(currentPage)+1).toString());
            localStorage.setItem('pageSize', pageSize);
        }

        const response: AxiosResponse<HistoryResponse> = await api.get(
            `/conversations/history/${currentPage}/${pageSize}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        console.log('response :: ', response);
        return response;
    }
}
export const consultService = new ConsultService();

