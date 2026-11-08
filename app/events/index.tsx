import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()),
  );

  function toggleSaved(id: number) {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id],
    );
  }

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
