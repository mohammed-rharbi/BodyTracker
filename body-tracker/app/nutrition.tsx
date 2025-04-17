import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, StatusBar, Animated } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Posts } from '@/utils/postsData';


type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string[]; 
};

const Nutrition: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0]; 

  useEffect(() => {

    const fetchedPosts: Post[] = Posts

    setPosts(fetchedPosts);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

 
  const viewPostDetails = (post: Post) => {
    router.push({
      pathname: '/post',
      params: { post: JSON.stringify(post) },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />


      <TouchableOpacity style={styles.mainCard} >
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/736x/ef/8f/f5/ef8ff5411363b47129612f6812e4c377.jpg' }}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.5)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.mainCardTitle}>Keep It Healthy</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>


      <Text style={styles.title}>Explore Posts</Text>

      {posts.map((post) => (
        <Animated.View key={post.id} style={{ opacity: fadeAnim }}>
          <TouchableOpacity style={styles.postCard} onPress={() => viewPostDetails(post)}>
            <ImageBackground source={{ uri: post.image }} style={styles.postImage}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
                style={styles.gradientOverlay}
              >
                <View style={styles.postContent}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postDescription}>{post.description}</Text>
                  <TouchableOpacity style={styles.viewMoreButton} onPress={() => viewPostDetails(post)}>
                    <Text style={styles.viewMoreButtonText}>Read Article</Text>
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

export default Nutrition;