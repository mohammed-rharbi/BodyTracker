import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Landing = () => {
  const [isUser, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await AsyncStorage.getItem('formData');
        if (data) {
          const User = JSON.parse(data);
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Body Tracker</Text>
      <Image
        source={{ uri: 'https://freepngimg.com/thumb/health/67606-green-healthcare-medicine-health-care-icon-thumb.png' }}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Track your health and fitness journey with ease.</Text>

      {isUser ? (
        <Link href={'/Home'} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </Link>
      ) : (
        <Link href={'/userForm'} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Tracking</Text>
          </TouchableOpacity>
        </Link>
      )}

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

export default Landing;