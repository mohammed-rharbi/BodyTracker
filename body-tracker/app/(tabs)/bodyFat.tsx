import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function BodyFatScreen() {
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('formData');
        if (userInfo) {
          const data = JSON.parse(userInfo);
          setHeight(data.height);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    if (!waist.trim()) newErrors.waist = 'Waist is required';
    if (!neck.trim()) newErrors.neck = 'Neck is required';
    if (!height.trim()) newErrors.height = 'Height is required';
    if (gender === 'female' && !hip.trim()) newErrors.hip = 'Hip is required for females';
    if (isNaN(parseFloat(waist)) || parseFloat(waist) <= 0) newErrors.waist = 'Invalid waist measurement';
    if (isNaN(parseFloat(neck)) || parseFloat(neck) <= 0) newErrors.neck = 'Invalid neck measurement';
    if (isNaN(parseFloat(height)) || parseFloat(height) <= 0) newErrors.height = 'Invalid height measurement';
    if (gender === 'female' && (isNaN(parseFloat(hip)) || parseFloat(hip) <= 0)) newErrors.hip = 'Invalid hip measurement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBodyFat = () => {
    if (!validateInputs()) return;

    const waistCm = parseFloat(waist);
    const neckCm = parseFloat(neck);
    const heightCm = parseFloat(height);
    const hipCm = parseFloat(hip);

    let bodyFatPercentage;
    if (gender === 'male') {
      bodyFatPercentage =
        495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFatPercentage =
        495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.221 * Math.log10(heightCm)) - 450;
    }

    setBodyFat(bodyFatPercentage);
    AsyncStorage.setItem('bodyFat', JSON.stringify(bodyFatPercentage));
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body Fat Calculator (U.S. Navy Method)</Text>

      <TextInput
        style={[styles.input, errors.waist && styles.inputError]}
        placeholder="Waist Circumference (cm)"
        placeholderTextColor="#a0a0a0"
        value={waist}
        onChangeText={(text) => {
          setWaist(text);
          setErrors((prev) => ({ ...prev, waist: '' }));
        }}
        keyboardType="numeric"
      />
      {errors.waist && <Text style={styles.errorText}>{errors.waist}</Text>}

      <TextInput
        style={[styles.input, errors.neck && styles.inputError]}
        placeholder="Neck Circumference (cm)"
        placeholderTextColor="#a0a0a0"
        value={neck}
        onChangeText={(text) => {
          setNeck(text);
          setErrors((prev) => ({ ...prev, neck: '' }));
        }}
        keyboardType="numeric"
      />
      {errors.neck && <Text style={styles.errorText}>{errors.neck}</Text>}

      {gender === 'female' && (
        <>
          <TextInput
            style={[styles.input, errors.hip && styles.inputError]}
            placeholder="Hip Circumference (cm)"
            placeholderTextColor="#a0a0a0"
            value={hip}
            onChangeText={(text) => {
              setHip(text);
              setErrors((prev) => ({ ...prev, hip: '' }));
            }}
            keyboardType="numeric"
          />
          {errors.hip && <Text style={styles.errorText}>{errors.hip}</Text>}
        </>
      )}

      <TextInput
        style={[styles.input, errors.height && styles.inputError]}
        placeholder="Height (cm)"
        placeholderTextColor="#a0a0a0"
        value={height}
        onChangeText={(text) => {
          setHeight(text);
          setErrors((prev) => ({ ...prev, height: '' }));
        }}
        keyboardType="numeric"
      />
      {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue: 'male' | 'female') => setGender(itemValue)}
          dropdownIconColor="#a0a0a0"
        >
          <Picker.Item label="Male" value="male" style={styles.pickerItem} />
          <Picker.Item label="Female" value="female" style={styles.pickerItem} />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateBodyFat}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {bodyFat !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Body Fat Percentage:</Text>
          <Text style={styles.resultValue}>{bodyFat.toFixed(2)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', 
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    backgroundColor: '#1e1e1e', 
    color: '#ffffff', 
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    borderColor: '#333333', 
    borderWidth: 1,
    color: '#ffffff', 
  },
  pickerItem: {
    color: '#ffffff', 
  },
  button: {
    backgroundColor: '#34C759', 
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1e1e1e', 
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333', 
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff', 
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginTop: 8,
  },
});