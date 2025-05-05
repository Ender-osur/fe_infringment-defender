import api from "../api/apiClient";

export interface RatingData {
    qualification: number;
    comment: string;
    conversationId: number;
}

export interface ExistRatinResponse {
    existExperience: boolean;
}

export const ratingService = {
  async submitRating(data: RatingData): Promise<void> {
    await api.post('/conversations/experience/create', data);
  },
  async getRating(conversationId: number): Promise<ExistRatinResponse> {
    const response = await api.get(`/conversations/experience/exist?conversationId=${conversationId}`);
    console.log("response.data in get experience:: ", response.data);
    return response.data;
  }
};