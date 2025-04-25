
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Clock, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface IbanHistoryProps {
  onSelect: (iban: string) => void;
}

const IbanHistory = ({ onSelect }: IbanHistoryProps) => {
  const [history, setHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('ibanHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('ibanHistory');
    setHistory([]);
    toast.success('History cleared');
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Recent IBANs</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-destructive hover:text-destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-24">
        <div className="space-y-2">
          {history.map((iban, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 text-sm bg-muted/50 rounded-md"
            >
              <span className="font-mono">{iban}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelect(iban)}
                >
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default IbanHistory;
