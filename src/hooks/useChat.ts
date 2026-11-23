import { useEffect, useState } from 'react';
import { subscribeToChat } from '../lib/chat';
import type { ChatMessage } from '../lib/chat';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<'connecting' | 'live' | 'error'>('connecting');

  useEffect(() => {
    setStatus('connecting');

    function onMessages(list: ChatMessage[]) {
      setMessages(list);
      setStatus('live');
    }

    function onError() {
      setStatus('error');
    }

    const unsubscribe = subscribeToChat(eventId, onMessages, onError);
    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
