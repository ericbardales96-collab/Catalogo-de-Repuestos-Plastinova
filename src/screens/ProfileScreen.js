import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

const ProfileScreen = ({ user, userRole, onLogout }) => {
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, cerrar sesión',
          onPress: onLogout,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.userName}>{user}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {userRole === 'admin' ? 'Administrador' : 'Cliente'}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Usuario</Text>
          <Text style={styles.infoValue}>{user}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Rol</Text>
          <Text style={styles.infoValue}>
            {userRole === 'admin' ? 'Administrador' : 'Cliente'}
          </Text>
        </View>

        {userRole === 'admin' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Permisos</Text>
            <Text style={styles.infoValue}>
              • Ver catálogo completo{`\n`}
              • Agregar repuestos{`\n`}
              • Editar repuestos{`\n`}
              • Eliminar repuestos
            </Text>
          </View>
        )}

        {userRole !== 'admin' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Permisos</Text>
            <Text style={styles.infoValue}>
              • Ver catálogo de repuestos{`\n`}
              • Buscar por código, nombre{`\n`}
              • Filtrar por categoría{`\n`}
              • Ver detalles de repuestos
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Catálogo Digital de Repuestos</Text>
        <Text style={styles.footerText}>Plastinova v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 15,
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    lineHeight: 20,
  },
  actionContainer: {
    padding: 15,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;