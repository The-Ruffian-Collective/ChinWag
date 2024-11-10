import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { LayoutPosition } from '@/types';
import { Message } from '@/types';

interface ChatProps {
  layoutPosition: LayoutPosition;
  model: 'gpt' | 'claude';
}

export default function Chat({ layoutPosition, model }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      content: input,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: `This is a simulated ${model === 'gpt' ? 'ChatGPT' : 'Claude'} response.`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const layoutClasses = {
    bottom: 'flex flex-col h-[calc(100vh-4rem)]',
    left: 'grid grid-cols-[350px,1fr] gap-4 h-[calc(100vh-4rem)]',
    right: 'grid grid-cols-[1fr,350px] gap-4 h-[calc(100vh-4rem)]',
  };

  return (
    <div className={layoutClasses[layoutPosition]}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {message.role === 'assistant' ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src="https://cdn.midjourney.com/u/02ddf64c-9530-474c-92c6-4481b15a930a/38bec1afb9ee0543aa4ba397a5dfe58affd48e7ec2f6bc125ac12f8fb111f995_384_N.png" 
                    alt="AI Assistant"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-10 w-10">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}