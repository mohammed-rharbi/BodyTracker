import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, StatusBar, Animated } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutPlans } from '@/utils/postsData';

type WorkoutPlan = {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string[];
};

const Workout: React.FC = () => {

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {

    const fetchedWorkoutPlans: WorkoutPlan[] = WorkoutPlans

    setWorkoutPlans(fetchedWorkoutPlans);


    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);



  const viewWorkoutDetails = (workout: WorkoutPlan) => {
    router.push({
      pathname: '/post',
      params: { post: JSON.stringify(workout) },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity style={styles.mainCard}>
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/736x/b6/8f/b7/b68fb7dfe0636a8da1afad02f10e1e65.jpg' }}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.5)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.mainCardTitle}>Workout Plans</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>


      <Text style={styles.title}>Explore Workouts</Text>


      {workoutPlans.map((workout) => (
        <Animated.View key={workout.id} style={{ opacity: fadeAnim }}>
          <TouchableOpacity style={styles.postCard} onPress={() => viewWorkoutDetails(workout)}>
            <ImageBackground source={{ uri: workout.image }} style={styles.postImage}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
                style={styles.gradientOverlay}
              >
                <View style={styles.postContent}>
                  <Text style={styles.postTitle}>{workout.title}</Text>
                  <Text style={styles.postDescription}>{workout.description}</Text>
                  <TouchableOpacity style={styles.viewMoreButton} onPress={() => viewWorkoutDetails(workout)}>
                    <Text style={styles.viewMoreButtonText}>View Plan</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  mainCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    borderRadius: 16,
  },
  mainCardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  postCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  postImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  postContent: {
    justifyContent: 'flex-end',
  },
  postTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 20,
  },
  viewMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  viewMoreButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default Workout;