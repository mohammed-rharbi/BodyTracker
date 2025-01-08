import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [address, setAddress] = useState('');

  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {

    const formData = {
      name,
      firstName,
      age,
      nationality,
      weight,
      height,
      address,
    };

    try {

      await AsyncStorage.setItem('formData', JSON.stringify(formData));
      console.log('Form data saved successfully!');
      alert('Form Submitted and Data Saved!');
    } catch (error) {
      console.error('Error saving form data:', error);
      alert('Failed to save form data.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Text style={styles.stepTitle}>Step 1: Personal Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#a0a0a0"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#a0a0a0"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="#a0a0a0"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Step 2: Additional Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your nationality"
              placeholderTextColor="#a0a0a0"
              value={nationality}
              onChangeText={setNationality}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your weight (kg)"
              placeholderTextColor="#a0a0a0"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your height (cm)"
              placeholderTextColor="#a0a0a0"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Step 3: Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              placeholderTextColor="#a0a0a0"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Before We Start, we need you to fill up this form</Text>

        {renderStep()}

        <View style={styles.buttonContainer}>
          {step > 0 && (
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {step < 2 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  stepTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e1e1e',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#34C759',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormScreen;