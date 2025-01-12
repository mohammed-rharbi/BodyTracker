import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, ImageBackground } from 'react-native';
import React, { Component } from 'react';
import { Link, router } from 'expo-router';
import Chart from '../components/chart'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserTypes {
    lastName: string;
    firstName: string;
    age: string;
    nationality: string;
    weight: string;
    height: string;
    address: string;
  }
  

const Traking = () => {
    const [user, setUser] = useState<UserTypes | null>(null);
    const [fat , setFat] = useState(null)
  
    useEffect(() => {
  
      const fetchUserInfo = async () => {
        try {
          const userInfo = await AsyncStorage.getItem('formData');
          const userFat = await AsyncStorage.getItem('bodyFat');
  
          
          if (userInfo) {
            const data = JSON.parse(userInfo);
            const fat = userFat ? JSON.parse(userFat) : null;
            setUser(data);
            setFat(fat)   
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
  
      fetchUserInfo();
    }, []);

   const goToChart = ()=>{
    router.push('/tracking');
   }

   if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user information...</Text>
      </View>
    );
  }
   

  return (
    <ScrollView contentContainerStyle={styles.container}>


      <TouchableOpacity style={styles.mainCard} onPress={goToChart} >
      <ImageBackground
          source={{ uri: 'https://i.pinimg.com/474x/7a/cb/ab/7acbab9d3678c8e06dff64bdbf582423.jpg' }} 
          style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}>
      </ImageBackground>
    </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/professional-avatar-1/64/sport-man-avatar-men-runner-user-512.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Daily Progress</Text>

           <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>BMI :</Text>
            <Text style={styles.infoValue}>{fat}</Text>
          </View>

        </View>
      </TouchableOpacity>


        <Chart/>


    <StatusBar barStyle="light-content" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 25,
    marginTop:20
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#A0A0A0',
  },

  mainCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBlock:20,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    borderRadius: 20,
  },

infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  infoLabel: {
    color: '#a0a0a0',
    fontSize: 16,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Traking;