import axios, { type AxiosResponse, type AxiosError, type CancelTokenSource } from 'axios';
import { type Message } from '../models/interfaces/translate';
import { type TranslationResponse } from '../models/interfaces/translationResponse';
import api from './api/apiClient';


let cancelTokenSource: CancelTokenSource;

export const translateService = {
  async translate(message: Message): Promise<AxiosResponse<TranslationResponse>> {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Translation request canceled by the user.');
    }

    cancelTokenSource = axios.CancelToken.source();

    try {
      cancelTokenSource = axios.CancelToken.source();
      const response: AxiosResponse<TranslationResponse> = await api.post(
        '/translate',
        message,
        {
          cancelToken: cancelTokenSource.token,
        },
      );
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isCancel(error)) {
        console.log('Request canceled:', axiosError.message);
        throw new Error('Translation request canceled');
      }
      console.error('Failed to create contact:', axiosError);
      throw error;
    }
  },
};
