import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PostDetails: React.FC = () => {
  const { post } = useLocalSearchParams();
  const postData = JSON.parse(post as string); 

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <ImageBackground
        source={{ uri: postData.image }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
          style={styles.gradientOverlay}
        >
          <Text style={styles.title}>{postData.title}</Text>
          <Text style={styles.description}>{postData.description}</Text>
        </LinearGradient>
      </ImageBackground>


      <View style={styles.contentContainer}>
        {postData.content.map((paragraph: string, index: number) => (
          <Text key={index} style={styles.contentText}>
            {paragraph}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212', 
  },
  backgroundImage: {
    height: 300,
    justifyContent: 'flex-end', 
  },
  backgroundImageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  gradientOverlay: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#E0E0E0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 16,
    lineHeight: 24,
  },
});

export default PostDetails;