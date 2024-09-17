import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Add useNavigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation'; // Import your param list
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import correct navigation prop

type AuthenticationScreenRouteProp = NativeStackScreenProps<
  OnboardingStackParamList,
  'Authentication'
>['route'];

type AuthenticationScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList, 
  'Authentication'
>;

const Authentication = () => {
  const route = useRoute<AuthenticationScreenRouteProp>(); // Get route params
  const { phoneNumber } = route.params; // Extract the phone number
  
  const navigation = useNavigation<AuthenticationScreenNavigationProp>(); // Initialize navigation

  const initialCountdown = 0;
  const setCountdown = 59;
  const [timeLeft, setTimeLeft] = useState(initialCountdown);
  const [activationCode, setActivationCode] = useState('');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(phoneNumber);

    const fetchData = async () => {
      try {
        const response = await fetch('http://10.22.184.51:8000/SendCode/' + phoneNumber);
        const result = await response.json();
        setData(result.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (timeLeft > 0 && isCountingDown) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsCountingDown(false);
    }
  }, [timeLeft, isCountingDown]);

  const handleCodeChange = (text: string) => {
    setActivationCode(text);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.22.184.51:8000/TFA/' + activationCode);
      const result = await response.json();
      if (result.verification) {
        console.log("Verification successful, navigating to AccountInfo");
        navigation.navigate('AccountInfo');
      } else {
        console.log("Verification failed");
      }
      
      
    } catch (error) {
      console.error("Error fetching activation code:", error);
      alert("Failed to fetch activation code");
    }
  };
  

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Autentificación</Text>
        <Text style={styles.description}>
          Estamos enviando un SMS al número celular con terminación **** {phoneNumber.slice(-4)} para continuar con la activación.
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.activationContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>CÓDIGO DE ACTIVACIÓN</Text>
            <TextInput
              style={styles.input}
              value={activationCode}
              onChangeText={handleCodeChange}
              maxLength={6}
              placeholder="- - - - - -"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.timerSection}>
          <Text>Tiempo de espera</Text>
          <View style={styles.progressBar}>
            <View style={{ ...styles.progress, width: `${(timeLeft / setCountdown) * 100}%` }} />
          </View>
          <Text>{`00:${timeLeft.toString().padStart(2, '0')}`}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isCountingDown && styles.buttonDisabled]}
          onPress={() => setIsCountingDown(true)}
          disabled={isCountingDown}
        >
          <Text style={styles.buttonText}>Reenviar código</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={activationCode.length !== 6}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#b20d30',
    paddingTop: 75,
    paddingBottom: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 0,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  activationContainer: {
    backgroundColor: '#c6c6c6',
    padding: 25,
    borderRadius: 25,
    width: '100%',
    maxWidth: 320,
  },
  inputSection: {
    marginBottom: 20,
    alignItems: 'center',
    height: 80,
  },
  label: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    lineHeight: 36,
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 25,
  },
  progressBar: {
    width: 200,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#888',
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
});
