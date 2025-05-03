export interface HistoryResponse {
    conversations: Conversation[];
}

export interface Conversation {
    id: number;
    createdAt: string;
    messages: Message[];
}

export interface Message {
    id: number;
    content: string;
    reference: string;
    createdAt: string;
}