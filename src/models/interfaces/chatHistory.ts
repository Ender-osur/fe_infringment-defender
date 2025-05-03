export interface HistoryResponse {
    conversations: Conversation[];
}

export interface Conversation {
    id: number;
    createdAt: string;
}