import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';

export default function EventsScreen() {
  const { savedIds, toggleSaved } = useSavedIds();
  const [query, setQuery] = useState('');
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.status}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.status}>Could not load events</Text>
        <Text style={styles.errorText}>{error.message}</Text>
        <Pressable style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filtered = data.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
      />
      <FlatList
        data={filtered}
        keyExtractor={(e) => String(e.id)}
        keyboardShouldPersistTaps="handled"
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  status: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#b91c1c',
  },
  retry: {
    minHeight: 44,
    marginTop: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
  },
  retryText: {
    fontSize: 16,
    color: '#fff',
  },
  hint: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  search: {
    minHeight: 44,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  empty: {
    marginTop: 24,
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
  },
});
