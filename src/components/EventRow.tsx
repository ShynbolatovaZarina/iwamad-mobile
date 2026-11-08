import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  isSaved?: boolean;
};

export default function EventRow({
  event,
  onPress,
  onLongPress,
  isSaved = false,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.textBlock}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>
          {event.date} · {event.place}
        </Text>
      </View>
      {isSaved ? <Text style={styles.saved}>★ Saved</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
    borderColor: '#1d4ed8',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
    fontSize: 14,
    color: '#4b5563',
  },
  saved: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#b45309',
  },
});
