import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { signOutUser } from '../src/lib/auth';
import { decodeTokenPayload } from '../src/lib/jwt';

export default function AccountScreen() {
  const { user, status } = useAuth();
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);

  useEffect(() => {
    setMinutesLeft(null);
    if (!user) {
      return;
    }
    // if the user changes or signs out before the token arrives, ignore the old answer
    let current = true;
    user.getIdToken().then((token) => {
      const payload = decodeTokenPayload(token);
      // exp is in seconds, Date.now() in milliseconds; 60000 ms = 1 minute
      if (current) {
        setMinutesLeft(Math.round((payload.exp * 1000 - Date.now()) / 60000));
      }
    });
    return () => {
      current = false;
    };
  }, [user]);

  // Firebase has not told us yet whether a session was saved
  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <Text style={styles.line}>Checking sign-in</Text>
      </View>
    );
  }

  // the guard: nobody reaches this screen without an account
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.line}>Signed in as {user.email}</Text>
      {minutesLeft !== null ? (
        <Text style={styles.line}>Token expires in {minutesLeft} min</Text>
      ) : null}
      <Pressable
        onPress={() => signOutUser()}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  line: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    minHeight: 44,
    marginTop: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1e3a8a',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
