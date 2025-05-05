import api from "../api/apiClient";

export interface RatingData {
    qualification: number;
    comment: string;
    conversationId: number;
}

export interface ExistRatinResponse {
    existExperience: boolean;
}

export interface RatingDetailsResponse {
    existExperience: boolean;
    qualification?: number;
    comment?: string;
}

export const ratingService = {
  async submitRating(data: RatingData): Promise<void> {
    await api.post('/conversations/experience/create', data);
  },
  async getRating(conversationId: number): Promise<ExistRatinResponse> {
    const response = await api.get(`/conversations/experience/exist?conversationId=${conversationId}`);
    console.log("response.data in get experience:: ", response.data);
    return response.data;
  },
  async getRatingDetails(conversationId: number): Promise<RatingDetailsResponse> {
    const response = await api.get(`/conversations/experience/details?conversationId=${conversationId}`);
    console.log("response.data in get rating details:: ", response.data);
    return response.data;
  }
};