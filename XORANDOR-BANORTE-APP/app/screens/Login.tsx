import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import correct navigation prop
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackParamList } from '../navigation'; // Import your param list

type LoginScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList, 
  'Login'
>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Use typed navigation

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logoBanorteBlanco.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>Bienvenido a Banorte</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>

        <Text style={styles.subText}>Aun no eres cliente?</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')} // Correct navigation type
        >
          <Text style={styles.buttonText}>Abre tu primera cuenta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image source={require('../assets/images/imageTorreBanorte.png')} style={styles.building} />
      </View>
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b20d30',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 180,
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#E4002B',
    fontSize: 16,
  },
  subText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
  },
  footer: {
    marginBottom: 20,
  },
  building: {
    width: 700,
    height: 700,
    borderRadius: 600,
    borderWidth: 3,
    borderColor: 'white',
    opacity: 0.7,
  },
});
