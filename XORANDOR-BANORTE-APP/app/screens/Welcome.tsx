import React, { useEffect, useState } from 'react'; 
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation'; // Import your param list
import { useRoute, useNavigation } from '@react-navigation/native'; // Add useNavigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import correct navigation prop


type WelcomeScreenRouteProp = NativeStackScreenProps<
  OnboardingStackParamList,
  'Welcome'
>['route'];

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList, 
  'Welcome'
>;

const Welcome = () => {
    const route = useRoute<WelcomeScreenRouteProp>(); // Get route params
    const { msg } = route.params; // Extract the phone number
    
    const navigation = useNavigation<WelcomeScreenNavigationProp>(); // Initialize navigation

    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const ip = 'http://10.22.184.51'

    // Fetch data from FastAPI when component is loaded
    useEffect(() => {
        console.log("MESSAGE");
        console.log(msg);

        const fetchData = async () => {
            try {
                const response = await fetch(ip + ':8000/TextGeneration/' + msg);
                const result = await response.json();
                setData(result.response);  // Assuming the API response is { message: "some text" }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on component mount

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* ImageBackground for the top header */}
                <View style={styles.header}>
                    <Image source={require('../assets/images/logoBanorteBlanco.png')} style={styles.logo} />
                    <Text style={styles.welcomeText}>Bienvenido a Banorte</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Text style={styles.text}>{data}</Text>
                )}

                {/* Option section with buttons */}
                <View style={styles.optionContainer}>
                    <Text style={styles.optionHeader}>Tarjeta de Crédito Pagaré y más</Text>
                    
                    <TouchableOpacity style={styles.optionButton}>
                        <Text style={styles.buttonText}>Beneficios de mis tarjetas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}
                        onPress={() => navigation.navigate('EducacionFinanciera', { msg })} // Pass phoneNumber as a parameter
                        >
                        <Text style={styles.buttonText}>Educacion Financiera</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Image source={require('../assets/images/imageTorreBanorte.png')} style={styles.building} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  // Ensures that ScrollView can grow beyond the screen size
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b20d30',
    paddingBottom: 20,  // Add bottom padding to prevent content from getting cut off when scrolling
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,  // Adds margin to make the header look better when scrolling
  },
  logo: {
    width: 500,
    height: 180,
  },
  welcomeText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  
  // Styling for the card-like button section
  optionContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2, 
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  optionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#E4002B',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#E4002B',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  footer: {
    marginBottom: -400,
  },
  building: {
    width: 700, // Adjust size as needed
    height: 700, // Adjust size to match width for a perfect circle
    borderRadius: 600, // 50% of the width/height for a circle (150 / 2)
    borderWidth: 3, // White outline thickness
    borderColor: 'white', // White outline color
    opacity: 0.7, // Adjust opacity as needed
  },
});