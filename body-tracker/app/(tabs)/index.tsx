import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Body Tracker</Text>
      <Image
        source={{ uri: 'https://freepngimg.com/thumb/health/67606-green-healthcare-medicine-health-care-icon-thumb.png' }}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Track your health and fitness journey with ease.</Text>
      <TouchableOpacity style={styles.button}>

        <Link href={'/userForm'} style={styles.buttonText}>
        Start Tracking
        </Link>

      </TouchableOpacity>
      <Text style={styles.quote}>"Your body is your most priceless possession. Take care of it."</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',  
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: '#999',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, 
  },
  button: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quote: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});

export default Home;