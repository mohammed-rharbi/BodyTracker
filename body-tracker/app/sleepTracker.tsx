import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import  React , { useEffect, useState } from 'react';

  

const SleepTraker = () => {

    

   const goToChart = ()=>{
    router.push('/Home');
   }

   
  return (
    <ScrollView contentContainerStyle={styles.container}>


      <TouchableOpacity style={styles.mainCard} onPress={goToChart} >
      <ImageBackground
          source={{ uri: 'https://i.pinimg.com/474x/30/ad/d8/30add883b1890351e2df8c9e15782c92.jpg' }} 
          style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}>
      </ImageBackground>
    </TouchableOpacity>

     
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



});

export default SleepTraker;