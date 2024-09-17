import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Use useNavigation for typed navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation'; // Import your param list

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList, 
  'Register'
>;

const Register = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        <Text style={styles.subText}>
          Comienza tu proceso compartiendo tu correo y número celular.
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/phone.png' }}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Número Celular"
            keyboardType="phone-pad"
            maxLength={13}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <Text style={styles.helperText}>Debe contener 10 dígitos</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/new-post.png' }}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            maxLength={50}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={styles.helperText}>Debe contener hasta 50 caracteres</Text>
      </View>

      {/* Important Notice Section */}
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeHeader}>IMPORTANTE</Text>
        <Text style={styles.noticeText}>
          Enviaremos un código por SMS a tu número celular para verificarlo.
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Authentication', { phoneNumber })} // Pass phoneNumber as a parameter
      >
        <Text style={styles.continueText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#b20d30',
    padding: 40,
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    height: 50,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 15,
  },
  noticeContainer: {
    backgroundColor: '#ffe0e0',
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  noticeHeader: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  noticeText: {
    color: '#e53935',
    fontSize: 14,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
