import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { ChatMessage } from './chat';

const supported = Platform.OS !== 'web';

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

// Android: our own channel with high importance, so the message pops up
// and also shows on the lock screen (the default channel only goes to the shade)
const CHANNEL_ID = 'chat-messages';

export async function askNotificationPermission(): Promise<void> {
  if (!supported) {
    return;
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Chat messages',
      importance: Notifications.AndroidImportance.MAX,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  await Notifications.requestPermissionsAsync();
}

export async function notifyNewMessage(eventTitle: string, message: ChatMessage): Promise<void> {
  if (!supported) {
    return;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `New message: ${eventTitle}`,
      body: `${message.author}: ${message.text}`,
    },
    // show it now; on Android use our channel
    trigger: Platform.OS === 'android' ? { channelId: CHANNEL_ID } : null,
  });
}
