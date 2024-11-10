export type LayoutPosition = 'bottom' | 'left' | 'right';

export interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}