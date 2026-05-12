import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { addRepuesto } from '../database/db';

const AdminScreen = ({ user }) => {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [rack, setRack] = useState('');
  const [nivel, setNivel] = useState('');
  const [modulo, setModulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [codRubro, setCodRubro] = useState('');
  const [descripcionRubro, setDescripcionRubro] = useState('');
  const [bodega, setBodega] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddRepuesto = async () => {
    if (!codigo.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Código y descripción son obligatorios');
      return;
    }

    try {
      setLoading(true);
      await addRepuesto({
        codigo: codigo.trim(),
        descripcion_iosa: descripcion.trim(),
        presentacion: presentacion.trim(),
        tipo_compra: tipoCompra.trim(),
        max: parseInt(max) || 0,
        min: parseInt(min) || 0,
        rack: parseInt(rack) || 0,
        nivel: parseInt(nivel) || 0,
        modulo: parseInt(modulo) || 0,
        categoria: categoria.trim(),
        cod_rubro: codRubro.trim(),
        descripcion_rubro: descripcionRubro.trim(),
        bodega: bodega.trim(),
      });

      Alert.alert('Éxito', 'Repuesto agregado correctamente');
      // Limpiar formulario
      setCodigo('');
      setDescripcion('');
      setPresentacion('');
      setTipoCompra('');
      setMax('');
      setMin('');
      setRack('');
      setNivel('');
      setModulo('');
      setCategoria('');
      setCodRubro('');
      setDescripcionRubro('');
      setBodega('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el repuesto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Panel Administrativo</Text>
          <Text style={styles.subtitle}>Usuario: {user}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Agregar Nuevo Repuesto</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Código *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 2340029"
              value={codigo}
              onChangeText={setCodigo}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Descripción IOSA *</Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción del repuesto"
              value={descripcion}
              onChangeText={setDescripcion}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Presentación</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: UNIDAD"
              value={presentacion}
              onChangeText={setPresentacion}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de Compra</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: EXTRANJERO"
              value={tipoCompra}
              onChangeText={setTipoCompra}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Max</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={max}
                onChangeText={setMax}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Min</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={min}
                onChangeText={setMin}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}># Rack</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={rack}
                onChangeText={setRack}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Nivel</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={nivel}
                onChangeText={setNivel}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Módulo</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={modulo}
              onChangeText={setModulo}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Categoría</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: REPUESTOS"
              value={categoria}
              onChangeText={setCategoria}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Cód Rubro</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={codRubro}
                onChangeText={setCodRubro}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Descripción Rubro</Text>
              <TextInput
                style={styles.input}
                placeholder="Rubro"
                value={descripcionRubro}
                onChangeText={setDescripcionRubro}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Bodega</Text>
            <TextInput
              style={styles.input}
              placeholder="Bodega Principal"
              value={bodega}
              onChangeText={setBodega}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAddRepuesto}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Agregando...' : 'Agregar Repuesto'}
            </Text>
          </TouchableOpacity>
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
    padding: 15,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  formGroup: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminScreen;