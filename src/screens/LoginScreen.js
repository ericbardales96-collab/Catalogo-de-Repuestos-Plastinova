import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const adminUsers = [
    { username: 'CarlosGallardo', password: 'Carlos123' },
    { username: 'KevinHernandez', password: 'Kevin123' },
    { username: 'EliMendoza', password: 'Eli123' },
    { username: 'EricBardales', password: 'Eric123' },
  ];

  const handleLogin = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Por favor ingresa un usuario');
      return;
    }

    if (isAdmin) {
      if (!password.trim()) {
        Alert.alert('Error', 'Por favor ingresa una contraseña');
        return;
      }

      const adminUser = adminUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (adminUser) {
        onLogin(username, 'admin');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } else {
      onLogin(username, 'client');
    }
  };

  const handleToggleMode = () => {
    setIsAdmin(!isAdmin);
    setPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Catálogo de Repuestos</Text>
          <Text style={styles.subtitle}>Plastinova</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, !isAdmin && styles.modeButtonActive]}
              onPress={() => isAdmin && handleToggleMode()}
            >
              <Text style={[styles.modeText, !isAdmin && styles.modeTextActive]}>
                Cliente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, isAdmin && styles.modeButtonActive]}
              onPress={() => !isAdmin && handleToggleMode()}
            >
              <Text style={[styles.modeText, isAdmin && styles.modeTextActive]}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />

          {isAdmin && (
            <>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>
              {isAdmin ? 'Usuarios Admin de Prueba:' : 'Modo Cliente'}
            </Text>
            {isAdmin && (
              <>
                <Text style={styles.infoText}>• CarlosGallardo / Carlos123</Text>
                <Text style={styles.infoText}>• KevinHernandez / Kevin123</Text>
                <Text style={styles.infoText}>• EliMendoza / Eli123</Text>
                <Text style={styles.infoText}>• EricBardales / Eric123</Text>
              </>
            )}
            {!isAdmin && (
              <Text style={styles.infoText}>
                Ingresa tu nombre para acceder como cliente
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeButtonActive: {
    backgroundColor: '#2196F3',
  },
  modeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  modeTextActive: {
    color: 'white',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 11,
    color: '#1565C0',
    marginBottom: 4,
  },
});

export default LoginScreen;