import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeeklyProgressChart = () => {
  const { width } = useWindowDimensions();
  const screenWidth = width;
  const [userData, setUserData] = useState<{ height: number; weight: number; age: number } | null>(null);
  const [bmiData, setBmiData] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('formData');

        if (userData) {
          const user = JSON.parse(userData);
          setUserData(user);

          if (user.height && user.weight) {
            calculateBMI(user.height, user.weight);
          } else {
            console.log('Height or weight missing in user data'); 
            setBmiData([]); 
          }
        } else {
          console.log('No user data found in AsyncStorage');
          setBmiData([]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    const weeklyBmiData = Array.from({ length: 7 }, () => parseFloat((Math.random() * (30 - 20) + 20).toFixed(2)));

    setBmiData(weeklyBmiData);
  };

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: bmiData.length > 0 ? bmiData : [0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E1E1E',
    backgroundGradientTo: '#1E1E1E',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#8641F4',
    },
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { minHeight: 500 }]}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Progress (BMI)</Text>
        {bmiData.length > 0 ? (
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noDataText}>No BMI data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },  
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 15,
  },
  noDataText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeeklyProgressChart;