import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { router, Router } from 'expo-router';

const FormScreen = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');


  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      if (!lastName.trim()) newErrors.lastName = 'Last Name is required';
      if (!firstName.trim()) newErrors.firstName = 'First Name is required';
      if (!age.trim()) newErrors.age = 'Age is required';
      if (!gender.trim()) newErrors.age = 'gander is required';

      if (isNaN(parseFloat(age)) || parseFloat(age) <= 0) newErrors.age = 'Invalid age';
    } else if (step === 1) {
      if (!nationality.trim()) newErrors.nationality = 'Nationality is required';
      if (!weight.trim()) newErrors.weight = 'Weight is required';
      if (isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) newErrors.weight = 'Invalid weight';
      if (!height.trim()) newErrors.height = 'Height is required';
      if (isNaN(parseFloat(height)) || parseFloat(height) <= 0) newErrors.height = 'Invalid height';
    } else if (step === 2) {
      if (!address.trim()) newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 2) {
        setStep(step + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      const formData = {
        firstName,
        lastName,
        age,
        nationality,
        weight,
        height,
        address,
        gender
      };

      try {
        await AsyncStorage.setItem('formData', JSON.stringify(formData));
        console.log('Form data saved successfully!');
        Alert.alert('Success', 'Form Submitted and Data Saved!');
        router.push('/Home')
      } catch (error) {
        console.error('Error saving form data:', error);
        Alert.alert('Error', 'Failed to save form data.');
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Text style={styles.stepTitle}>Step 1: Personal Information</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Enter your Last Name"
              placeholderTextColor="#a0a0a0"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setErrors((prev) => ({ ...prev, lastName: '' }));
              }}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="Enter your first Name"
              placeholderTextColor="#a0a0a0"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setErrors((prev) => ({ ...prev, firstName: '' }));
              }}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            <TextInput
              style={[styles.input, errors.age && styles.inputError]}
              placeholder="Enter your age"
              placeholderTextColor="#a0a0a0"
              value={age}
              onChangeText={(text) => {
                setAge(text);
                setErrors((prev) => ({ ...prev, age: '' }));
              }}
              keyboardType="numeric"
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => {
                setGender(itemValue);
                setErrors((prev) => ({ ...prev, gender: '' }));
              }}
              style={[styles.input, errors.gender && styles.inputError]}
            >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Step 2: Additional Information</Text>
            <TextInput
              style={[styles.input, errors.nationality && styles.inputError]}
              placeholder="Enter your nationality"
              placeholderTextColor="#a0a0a0"
              value={nationality}
              onChangeText={(text) => {
                setNationality(text);
                setErrors((prev) => ({ ...prev, nationality: '' }));
              }}
            />
            {errors.nationality && <Text style={styles.errorText}>{errors.nationality}</Text>}
            <TextInput
              style={[styles.input, errors.weight && styles.inputError]}
              placeholder="Enter your weight (kg)"
              placeholderTextColor="#a0a0a0"
              value={weight}
              onChangeText={(text) => {
                setWeight(text);
                setErrors((prev) => ({ ...prev, weight: '' }));
              }}
              keyboardType="numeric"
            />
            {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
            <TextInput
              style={[styles.input, errors.height && styles.inputError]}
              placeholder="Enter your height (cm)"
              placeholderTextColor="#a0a0a0"
              value={height}
              onChangeText={(text) => {
                setHeight(text);
                setErrors((prev) => ({ ...prev, height: '' }));
              }}
              keyboardType="numeric"
            />
            {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}

          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Step 3: Address</Text>
            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              placeholder="Enter your address"
              placeholderTextColor="#a0a0a0"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                setErrors((prev) => ({ ...prev, address: '' }));
              }}
              multiline
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
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
    marginBottom: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 10,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});

export default FormScreen;