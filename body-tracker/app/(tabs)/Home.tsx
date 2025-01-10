import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>BodyTracker</Text>
        <Image
          source={{ uri: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png' }} 
          style={styles.headerLogo}
        />
      </View>



      <TouchableOpacity style={styles.mainCard}>
      <ImageBackground
          source={{ uri: 'https://i.pinimg.com/736x/e2/9f/87/e29f8773b1ebd9afd5006c3c622ba8ca.jpg' }} 
          style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>Health Summary</Text>
          <Text style={styles.cardText}>Track your progress daily.</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>


      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/professional-avatar-1/64/sport-man-avatar-men-runner-user-512.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Daily Progress</Text>
          <Text style={styles.cardText}>Track your daily fitness and health progress.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Workout Plans</Text>
          <Text style={styles.cardText}>Explore personalized workout routines.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Nutrition</Text>
          <Text style={styles.cardText}>Get meal plans and nutrition tips.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3589/3589036.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Sleep Tracker</Text>
          <Text style={styles.cardText}>Monitor your sleep patterns.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3048/3048124.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Body Measurements</Text>
          <Text style={styles.cardText}>Track your body stats over time.</Text>
        </View>
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
    margin: 20,
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },


});

export default Home;