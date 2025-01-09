import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface UserTypes {
  lastName: string;
  firstName: string;
  age: string;
  nationality: string;
  weight: string;
  height: string;
  address: string;
}

const ProfileScreen = () => {
  const [user, setUser] = useState<UserTypes | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('formData');
        if (userInfo) {
          const data = JSON.parse(userInfo);
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditProfile = () => {
    if (user) {
      router.push({
        pathname: '/profile/editeProfile', 
        params: { user: JSON.stringify(user) },
      });
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user information...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://cdn3.iconfinder.com/data/icons/professional-avatar-1/64/sport-man-avatar-men-runner-user-512.png' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user.lastName} {user.firstName}</Text>
          <Text style={styles.profileBio}>Health Enthusiast</Text>
        </View>


        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>{user.age}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nationality:</Text>
            <Text style={styles.infoValue}>{user.nationality}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{user.weight} kg</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>{user.height} cm</Text>
          </View>
        </View>


        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.addressText}>{user.address}</Text>
        </View>


        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileBio: {
    color: '#a0a0a0',
    fontSize: 16,
    marginTop: 5,
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#2c2c2c',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  addressText: {
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#34C759',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;