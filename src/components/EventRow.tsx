import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  isSaved?: boolean;
};

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  isSaved = false,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      style={styles.row}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{isSaved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.textBlock}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.meta}>
              {event.date} · {event.place}
            </Text>
          </View>
          {isSaved ? (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          ) : null}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
  },
  card: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  action: {
    minHeight: 44,
    minWidth: 96,
    marginLeft: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
