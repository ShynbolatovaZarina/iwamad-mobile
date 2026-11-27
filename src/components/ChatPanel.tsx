import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const { user } = useAuth();
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0;

  useEffect(() => {
    askNotificationPermission();
  }, []);

  function handleSend() {
    if (!canSend) {
      return;
    }
    sendMessage(eventId, text.trim());
    setText('');
  }

  // newest first, without changing the list from the hook
  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Live chat</Text>
      {user ? (
        <>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Write a message"
            maxLength={200}
          />
          <Pressable
            onPress={handleSend}
            disabled={!canSend}
            style={[styles.send, !canSend && styles.sendDisabled]}
          >
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </>
      ) : (
        // signed out: no message box, but the messages below stay visible
        <Pressable onPress={() => router.push('/login')} style={styles.send}>
          <Text style={styles.sendText}>Sign in to chat</Text>
        </Pressable>
      )}
      {status === 'connecting' ? <Text style={styles.status}>Connecting</Text> : null}
      {status === 'error' ? <Text style={styles.status}>Chat unavailable</Text> : null}
      {status === 'live' && messages.length === 0 ? (
        <Text style={styles.status}>No messages yet</Text>
      ) : null}
      {newestFirst.map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  send: {
    minHeight: 44,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
  },
  sendDisabled: {
    backgroundColor: '#9ca3af',
  },
  sendText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  status: {
    marginTop: 12,
    fontSize: 16,
    color: '#4b5563',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
  },
});
