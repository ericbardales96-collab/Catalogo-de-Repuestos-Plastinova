import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

import LoginScreen from './src/screens/LoginScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import AdminScreen from './src/screens/AdminScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { initializeDatabase } from './src/database/db';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
        setDbInitialized(true);
      } catch (error) {
        console.error('Error inicializando base de datos:', error);
      }
    };
    setupDatabase();
  }, []);

  const handleLogin = (userData, role) => {
    setUser(userData);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setIsLoggedIn(false);
  };

  if (!dbInitialized) {
    return (
      <View style={styles.container}>
        <Text>Inicializando aplicación...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen onLogin={handleLogin} />
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#999',
          headerShown: true,
        }}
      >
        <Tab.Screen
          name="Catálogo"
          children={() => <CatalogScreen user={user} userRole={userRole} />}
          options={{
            tabBarLabel: 'Catálogo',
            headerTitle: 'Catálogo de Repuestos',
          }}
        />
        {userRole === 'admin' && (
          <Tab.Screen
            name="Admin"
            children={() => <AdminScreen user={user} />}
            options={{
              tabBarLabel: 'Admin',
              headerTitle: 'Panel Administrativo',
            }}
          />
        )}
        <Tab.Screen
          name="Perfil"
          children={() => <ProfileScreen user={user} userRole={userRole} onLogout={handleLogout} />}
          options={{
            tabBarLabel: 'Perfil',
            headerTitle: 'Mi Perfil',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});