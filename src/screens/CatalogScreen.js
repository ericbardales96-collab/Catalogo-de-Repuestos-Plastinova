import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getAllRepuestos, searchRepuestos } from '../database/db';

const CatalogScreen = ({ user, userRole }) => {
  const [repuestos, setRepuestos] = useState([]);
  const [filteredRepuestos, setFilteredRepuestos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRepuestos();
  }, []);

  const loadRepuestos = async () => {
    try {
      setLoading(true);
      const data = await getAllRepuestos();
      setRepuestos(data);
      setFilteredRepuestos(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los repuestos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredRepuestos(repuestos);
    } else {
      const results = await searchRepuestos(text);
      setFilteredRepuestos(results);
    }
  };

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === 'all') {
      setFilteredRepuestos(repuestos);
    } else {
      const filtered = repuestos.filter(
        (item) => item.categoria && item.categoria.toLowerCase() === type.toLowerCase()
      );
      setFilteredRepuestos(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.codigo}>{item.codigo}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
      </View>
      <Text style={styles.descripcion}>{item.descripcion_iosa}</Text>
      <Text style={styles.rubro}>Rubro: {item.descripcion_rubro}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.stock}>Stock: {item.max}</Text>
        <Text style={styles.precio}>${item.codigo}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Cargando repuestos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por código, nombre o rubro..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.filterSection}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'all' && styles.filterTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'repuestos' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilter('repuestos')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'repuestos' && styles.filterTextActive,
            ]}
          >
            Repuestos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'consumible' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilter('consumible')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'consumible' && styles.filterTextActive,
            ]}
          >
            Consumibles
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRepuestos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay repuestos disponibles</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  searchSection: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  filterSection: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  categoria: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  descripcion: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  rubro: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stock: {
    fontSize: 12,
    color: '#666',
  },
  precio: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default CatalogScreen;