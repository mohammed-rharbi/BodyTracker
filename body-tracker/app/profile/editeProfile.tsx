import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';

interface UserTypes {
  name: string;
  firstName: string;
  age: string;
  nationality: string;
  weight: string;
  height: string;
  address: string;
}

const EditProfileScreen = () => {
  
  const { user } = useLocalSearchParams();
  const initialUser = user ? JSON.parse(user as string) : {
    lastName: '',
    firstName: '',
    age: '',
    nationality: '',
    weight: '',
    height: '',
    address: '',
  };

  const [lastName, setLastName] = useState(initialUser.lastName);
  const [firstName, setFirstName] = useState(initialUser.firstName);
  const [age, setAge] = useState(initialUser.age);
  const [nationality, setNationality] = useState(initialUser.nationality);
  const [weight, setWeight] = useState(initialUser.weight);
  const [height, setHeight] = useState(initialUser.height);
  const [address, setAddress] = useState(initialUser.address);

  const handleSave = async () => {
    const updatedUser = {
      lastName,
      firstName,
      age,
      nationality,
      weight,
      height,
      address,
    };

    try {
      await AsyncStorage.setItem('formData', JSON.stringify(updatedUser));
      alert('Profile updated successfully!');
      router.back();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Nationality"
          value={nationality}
          onChangeText={setNationality}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1e1e1e',
    padding: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#2c2c2c',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#34C759',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;