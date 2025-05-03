export interface HistoryResponse {
    conversations: Conversation[];
}

export interface Conversation {
    id: number;
    createdAt: string;
}

export interface Message {
    id: number;
    content: string;
    reference: string;
    createdAt: string;
}