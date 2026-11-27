import { Redirect } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { signOutUser } from '../src/lib/auth';

export default function AccountScreen() {
  const { user, status } = useAuth();

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
