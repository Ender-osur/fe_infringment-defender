import api from "../api/apiClient";

export interface RatingData {
    qualification: number;
    comment: string;
    conversationId: number;
}
export const ratingService = {
  async submitRating(data: RatingData): Promise<void> {
    await api.post('/conversations/experience/create', data);
  }
};