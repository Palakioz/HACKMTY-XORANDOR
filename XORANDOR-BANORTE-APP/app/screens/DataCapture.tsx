import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Camera from './Camera'; // Import your updated Camera component here
import { useAppNavigation } from '../utils/useAppNavigation';


const DataCapture = () => {
  const navigation = useAppNavigation();

  const [captureType, setCaptureType] = useState<null | 'INE' | 'Comprobante'>(null);

  const handleCaptureClick = (type: 'INE' | 'Comprobante') => {
    setCaptureType(type);
  };

  const handlePhotoTaken = (photo: any) => {
    console.log('Photo taken for:', captureType, photo);
    setCaptureType(null); // Close camera after taking photo
  };

  return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📄</Text>
        </View>
      <Text style={styles.title}>Captura de datos</Text>
      <Text style={styles.requirementsTitle}>Requerimientos:</Text>
      <View style={styles.requirements}>
        <Text style={styles.bulletText}>• INE/IFE vigente con tu dirección, completa y visible</Text>
        <Text style={styles.bulletText}>• Celular con cámara y micrófono</Text>
      </View>

      <Text style={styles.infoText}>
        Esta información es esencial y nos permite identificarte para abrir tu cuenta
      </Text>
      <Text style={styles.infoText}>Todos tus datos son confidenciales</Text>
    
      <TouchableOpacity
        style={styles.captureBox}
        onPress={() => handleCaptureClick('INE')}
      >
        <Image source={require('../assets/images/cameraIcon.png')} style={styles.iconCamera} />
        <Text>Captura tu INE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.captureBox}
        onPress={() => handleCaptureClick('Comprobante')}
      >
        <Image source={require('../assets/images/cameraIcon.png')} style={styles.iconCamera} />
        <Text>Captura tu Comprobante de Domicilio</Text>
      </TouchableOpacity>

      {captureType && (
        <Camera
          onPhotoTaken={handlePhotoTaken}
          captureType={captureType}
        />
      )}

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DataCapture

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  iconContainer: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  icon: {
    fontSize: 50,
    textAlign: 'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requirements: {
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10, // Adds some space between the bullet and the text
    marginBottom: 5, // Adds spacing between list items
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  captureBox: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderStyle: 'dashed', // This makes the border dashed
  },
  iconCamera: {
    width: 20,
    height: 16.5,
    marginRight: 10,
  },
  continueButton: {
    backgroundColor: '#555',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
