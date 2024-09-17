import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppNavigation } from '../utils/useAppNavigation';


const APIpage = () => {
  const navigation = useAppNavigation();


  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from FastAPI when component is loaded
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.10.236:8000/TextGeneration/Genérame%20un%20párrafo%20cortito%20vendiéndole%20la%20plataforma%20Banorte%20al%20usuario%20dirigiéndose%20a%20algo%20que%20leerá/Nombre:María,Edad:21,Género:F,Ciudad:San%20Pedro%20Garza%20Garcia,CréditosEn:Banamex');
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
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.text}>{data}</Text>
      )}
    </View>
  );
};

export default APIpage

// StyleSheet for styling components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
