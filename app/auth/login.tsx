import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLoginViewModel } from '../../presentation/viewmodels/LoginViewModel';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const {
    credentials,
    loading,
    error,
    setError,
    handleUserChange,
    handlePasswordChange,
    authenticate,
  } = useLoginViewModel();

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      setError(null);
    }
  }, [error, setError]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Para acessar a aplicação preencha os campos abaixo com suas informações de acesso!</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={credentials.user}
        onChangeText={handleUserChange}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={credentials.password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={authenticate} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
