import { Moon, Sun, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { LayoutPosition } from '@/types';

interface HeaderProps {
  layoutPosition: LayoutPosition;
  setLayoutPosition: (position: LayoutPosition) => void;
  model: 'gpt' | 'claude';
  setModel: (model: 'gpt' | 'claude') => void;
}

export default function Header({ 
  layoutPosition, 
  setLayoutPosition,
  model,
  setModel
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <span className="font-semibold">ChinWag°TRC.chat</span>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Layout
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLayoutPosition('bottom')}>
                Bottom
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLayoutPosition('right')}>
                Right
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLayoutPosition('left')}>
                Left
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {model === 'gpt' ? 'ChatGPT' : 'Claude'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setModel('gpt')}>
                ChatGPT
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModel('claude')}>
                Claude
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}