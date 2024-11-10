import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import { LayoutPosition } from '@/types';

function App() {
  const [layoutPosition, setLayoutPosition] = useState<LayoutPosition>('bottom');
  const [model, setModel] = useState<'gpt' | 'claude'>('gpt');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="chinwag-theme">
      <div className="min-h-screen bg-background">
        <Header 
          layoutPosition={layoutPosition} 
          setLayoutPosition={setLayoutPosition}
          model={model}
          setModel={setModel}
        />
        <main className="container mx-auto px-4">
          <Chat layoutPosition={layoutPosition} model={model} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;