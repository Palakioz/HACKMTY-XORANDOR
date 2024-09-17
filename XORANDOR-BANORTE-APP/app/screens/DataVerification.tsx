import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAppNavigation } from '../utils/useAppNavigation';
import { useRoute, useNavigation } from '@react-navigation/native'; // Add useNavigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation'; // Import your param list
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import correct navigation prop

type DataVerificationScreenRouteProp = NativeStackScreenProps<
  OnboardingStackParamList,
  'DataVerification'
>['route'];

type DataVerificationScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList, 
  'DataVerification'
>;

const DataVerification = () => {
  const route = useRoute<DataVerificationScreenRouteProp>(); // Get route params
  const { msg } = route.params; // Extract the phone number
  
  const navigation = useNavigation<DataVerificationScreenNavigationProp>(); // Initialize navigation

  const [userInfo, setUserInfo] = useState({
    nombreCompleto: 'Juan Pérez',
    curp: 'JUAP900101HMCRNR01',
    vigencia: '2026',
    emision: '2021',
    claveElector: 'PERJ9001011',
    anoRegistro: '2020',
    noEmision: '123456',
    sexo: 'Masculino',
    rfc: 'JUAP900101XXX',
    paisNacimiento: 'México',
    entidadNacimiento: 'Ciudad de México',
    regimenFiscal: 'Persona Física',
    codigoPostal: '12345',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirm = () => {
    setIsEditing(false);
    navigation.navigate('Welcome', { msg });
  };

  const handleChange = (key: string, value: string) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verificación de Datos</Text>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📄</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Nombre Completo:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.nombreCompleto}
              onChangeText={(text) => handleChange('nombreCompleto', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.nombreCompleto}</Text>
          )}

          <Text style={styles.infoLabel}>CURP:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.curp}
              onChangeText={(text) => handleChange('curp', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.curp}</Text>
          )}

          <Text style={styles.infoLabel}>Vigencia:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.vigencia}
              onChangeText={(text) => handleChange('vigencia', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.vigencia}</Text>
          )}

          <Text style={styles.infoLabel}>Emisión:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.emision}
              onChangeText={(text) => handleChange('emision', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.emision}</Text>
          )}

          <Text style={styles.infoLabel}>Clave de Elector:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.claveElector}
              onChangeText={(text) => handleChange('claveElector', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.claveElector}</Text>
          )}

          <Text style={styles.infoLabel}>Año de Registro:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.anoRegistro}
              onChangeText={(text) => handleChange('anoRegistro', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.anoRegistro}</Text>
          )}

          <Text style={styles.infoLabel}>No. de Emisión:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.noEmision}
              onChangeText={(text) => handleChange('noEmision', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.noEmision}</Text>
          )}

          <Text style={styles.infoLabel}>Sexo:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.sexo}
              onChangeText={(text) => handleChange('sexo', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.sexo}</Text>
          )}

          <Text style={styles.infoLabel}>RFC:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.rfc}
              onChangeText={(text) => handleChange('rfc', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.rfc}</Text>
          )}

          <Text style={styles.infoLabel}>País de Nacimiento:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.paisNacimiento}
              onChangeText={(text) => handleChange('paisNacimiento', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.paisNacimiento}</Text>
          )}

          <Text style={styles.infoLabel}>Entidad de Nacimiento:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.entidadNacimiento}
              onChangeText={(text) => handleChange('entidadNacimiento', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.entidadNacimiento}</Text>
          )}

          <Text style={styles.infoLabel}>Régimen Fiscal:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.regimenFiscal}
              onChangeText={(text) => handleChange('regimenFiscal', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.regimenFiscal}</Text>
          )}

          <Text style={styles.infoLabel}>Código Postal:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userInfo.codigoPostal}
              onChangeText={(text) => handleChange('codigoPostal', text)}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.codigoPostal}</Text>
          )}

          <Text style={styles.termsConditions}>*Al presionar CONFIRMAR acepto los términos y condiciones. Tambien autorizo una consulta personal mia en el buró de crédito.
          </Text>

        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>
            {isEditing ? 'CONFIRMAR' : 'CONFIRMADO'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.editButtonText}>
            {isEditing ? 'CANCELAR' : 'EDITAR'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DataVerification

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#b20d30',
    paddingTop: 75,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  icon: {
    fontSize: 50,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  termsConditions: {
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#E53935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#757575',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
