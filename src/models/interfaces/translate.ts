export interface Message {
  codReqUser: string;
  reqLanguage: string;
  reqText: string;
  modelProvider: 'openai' | 'deepseek';
}
