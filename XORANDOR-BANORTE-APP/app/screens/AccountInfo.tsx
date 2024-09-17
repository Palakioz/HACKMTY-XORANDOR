import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useAppNavigation } from '../utils/useAppNavigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation'; // Import your param list
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import correct navigation prop


type AccountInfoScreenRouteProp = NativeStackScreenProps<
  OnboardingStackParamList,
  'AccountInfo'
>['route'];

type AccountInfoScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList, 
  'AccountInfo'
>;

const AccountInfo = () => {
  const navigation = useNavigation<AccountInfoScreenNavigationProp>();
  
  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    vigencia: '',
    emision: '',
    claveElector: '',
    Añoregistro: '',
    Noem: '',
    // diferente seccion: informacion personal
    Sexo: '',
    RFC: '',
    PaisNacimiento: '',
    EntidadNacimiento: '',
    RegimenFiscal: '',
    CodigoPostal: '',
    Estado: '', 

    Alcaldia: '',
    Colonia: '', 
    Calle: '',
    edad: '',
    creditosEn: ''
  });

  const [section, setSection] = useState('Información de la cuenta');

  // Helper function to handle input change
  const handleInputChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', form);
    const msg = "nombre:" + form.nombre + 
                ",edad:" + form.edad + 
                ",genero:" + form.Sexo + 
                ",ciudad:" + form.RegimenFiscal + 
                ",creditosen:" + form.creditosEn;

    // Navigate to 'DataVerification' screen and pass the 'msg' as a parameter
    navigation.navigate('DataVerification', { msg });

    alert('Form submitted!');
};


  // This function will handle the scroll and determine which section is visible
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Set thresholds for different sections based on your layout
    if (scrollY < 500) {
      setSection('Información de la cuenta');
    } else if (scrollY >= 500 && scrollY < 1200) {
      setSection('Información personal');
    } else {
      setSection('Domicilo');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        {/* Full-width square at the top */}
      <View style={styles.scrollContainer}>

        <View style={styles.square}>
          <Text style={styles.title}>Crea una cuenta nueva</Text>
          <Text style={styles.subTitle}>{section}</Text>
        </View>

      </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} onScroll={handleScroll} scrollEventThrottle={16}>


        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={form.nombre}
          onChangeText={(text) => handleInputChange('nombre', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido Paterno"
          value={form.apellidoPaterno}
          onChangeText={(text) => handleInputChange('apellidoPaterno', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido Materno"
          value={form.apellidoMaterno}
          onChangeText={(text) => handleInputChange('apellidoMaterno', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={form.edad}
          onChangeText={(text) => handleInputChange('edad', text)}
        />
        <Text> Estamos muy emocionados de recibirte en BANORTE</Text>
        <TextInput
          style={styles.input}
          placeholder="CURP"
          value={form.curp}
          onChangeText={(text) => handleInputChange('curp', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Vigencia"
          value={form.vigencia}
          onChangeText={(text) => handleInputChange('vigencia', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Emisión"
          value={form.emision}
          onChangeText={(text) => handleInputChange('emision', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Clave de elector"
          value={form.claveElector}
          onChangeText={(text) => handleInputChange('claveElector', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Año de registro"
          value={form.Añoregistro}
          onChangeText={(text) => handleInputChange('Añoregistro', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="No. de emisión"
          value={form.Noem}
          onChangeText={(text) => handleInputChange('Noem', text)}
        />
         <Text> Sigue Asi! Pronto abriras tu cuenta en BANORTE</Text>
        {/* Personal Information Section */}
        <View style={styles.divider} />
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={form.Sexo}
          onChangeText={(text) => handleInputChange('Sexo', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="RFC (con homoclave)"
          value={form.RFC}
          onChangeText={(text) => handleInputChange('RFC', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="País de nacimiento"
          value={form.PaisNacimiento}
          onChangeText={(text) => handleInputChange('PaisNacimiento', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Entidad de nacimiento"
          value={form.EntidadNacimiento}
          onChangeText={(text) => handleInputChange('EntidadNacimiento', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Régimen Fiscal"
          value={form.RegimenFiscal}
          onChangeText={(text) => handleInputChange('RegimenFiscal', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código Postal"
          value={form.CodigoPostal}
          onChangeText={(text) => handleInputChange('CodigoPostal', text)}
        />

      <TextInput
          style={styles.input}
          placeholder="Estado"
          value={form.Estado}
          onChangeText={(text) => handleInputChange('Estado', text)}
        />

<View style={styles.divider} />

      <TextInput
          style={styles.input}
          placeholder="Alcaldia/Municipio"
          value={form.Alcaldia}
          onChangeText={(text) => handleInputChange('Alcaldia', text)}
        />
      <TextInput
          style={styles.input}
          placeholder="Colonia"
          value={form.Colonia}
          onChangeText={(text) => handleInputChange('Colonia', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Calle/Prolongación/Avenida y Numero"
          value={form.Calle}
          onChangeText={(text) => handleInputChange('Calle', text)}
        />
        <TextInput
          style={styles.input}
          placeholder=" CreditosEn"
          value={form.creditosEn}
          onChangeText={(text) => handleInputChange('creditosEn', text)}
        />
         <Text> Felicidades! YA ESTAS LISTO!</Text>

      </ScrollView>

      {/* Button at the Bottom */}
      <View style={styles.buttonContainer}>
        <Button title="Crear cuenta" onPress={handleSubmit} color="#FF0000" />
      </View>
    </KeyboardAvoidingView>
  );
}

export default AccountInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    position: 'relative', // Required for the square to stick to the top
    zIndex: 0, // Set z-index to 0 to prevent overlap with the button
  },
  square: {
    width: '100%', // Full width
    height: 200, // Adjust height if needed
    backgroundColor: '#b20d30', // Background fill color
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingTop: 40, // To push content from the top
    top: 0, // Stick to the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text to contrast with red background
  },
  subTitle: {
    fontSize: 16,
    color: '#fff', // White text
    marginTop: 5,
  },
  input: {
    height: 55, // Slightly increased height
    borderColor: 'transparent', // Remove border color
    borderWidth: 1,
    borderRadius: 25, // Fully rounded corners
    paddingHorizontal: 20, // Increased padding for a more modern look
    marginTop: 20, // Add some margin between inputs
    marginBottom: 20, // Add some margin between inputs
    backgroundColor: '#F5F5F5', // Light background for the inputs
    marginHorizontal: 20, // Space on the sides
    shadowColor: '#000', // Adding shadow to match the design
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});
