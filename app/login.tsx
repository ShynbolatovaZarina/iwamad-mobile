import { FirebaseError } from 'firebase/app';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { authErrorMessage, signIn, signUp } from '../src/lib/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Sign in and Create account share this; only the Firebase function differs
  async function submit(action: typeof signIn) {
    setError('');
    setBusy(true);
    try {
      await action(email, password);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/account');
      }
    } catch (e) {
      setError(authErrorMessage(e instanceof FirebaseError ? e.code : ''));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        onPress={() => submit(signIn)}
        disabled={busy}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, busy && styles.buttonBusy]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable
        onPress={() => submit(signUp)}
        disabled={busy}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, busy && styles.buttonBusy]}
      >
        <Text style={styles.buttonText}>Create account</Text>
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
  input: {
    minHeight: 44,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    marginBottom: 12,
    fontSize: 16,
    color: '#b91c1c',
  },
  button: {
    minHeight: 44,
    marginTop: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1e3a8a',
  },
  buttonBusy: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
