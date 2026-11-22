import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import HolidayNote from '../../src/components/HolidayNote';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Event' }} />
        <ActivityIndicator size="large" />
        <Text style={styles.status}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.status}>Could not load events</Text>
        <Text style={styles.errorText}>{error.message}</Text>
        <Pressable style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((item) => item.id === Number(id));

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
      <HolidayNote date={event.date} />
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
