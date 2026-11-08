import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.line}>No event with id {id}.</Text>
        <Link href="/events" style={styles.link}>
          Back to events
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.line}>Date: {event.date}</Text>
      <Text style={styles.line}>Place: {event.place}</Text>
      <Text style={styles.line}>Seats: {event.seats}</Text>
      <Link href="/events" style={styles.link}>
        Back to events
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 12,
  },
  line: {
    fontSize: 18,
    marginBottom: 8,
  },
  link: {
    marginTop: 16,
    fontSize: 16,
    color: '#1d4ed8',
  },
});
