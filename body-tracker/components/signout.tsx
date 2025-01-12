import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { router, Router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Logout() {


    const logout = ()=>{

        AsyncStorage.clear()
        router.push('/')
    }

    return (

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    );
  }
  

  const styles = StyleSheet.create({

  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
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

})