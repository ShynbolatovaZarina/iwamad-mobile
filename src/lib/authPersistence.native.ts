import AsyncStorage from '@react-native-async-storage/async-storage';
// Firebase's types leave out the React Native build; the function is there when the app runs.
// @ts-expect-error
import { getReactNativePersistence } from 'firebase/auth';

// Android and iOS: the session survives closing the app.
export const persistence = getReactNativePersistence(AsyncStorage);
