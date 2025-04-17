import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<string[]>([]);
  const cameraRef = useRef<CameraView>(null);


  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const savedPhotos = await AsyncStorage.getItem('photos');
        if (savedPhotos) {
          setPhotos(JSON.parse(savedPhotos));
        }
      } catch (error) {
        console.error('Failed to load photos from AsyncStorage:', error);
      }
    };

    loadPhotos();
  }, []);

  useEffect(() => {
    const savePhotos = async () => {
      try {
        await AsyncStorage.setItem('photos', JSON.stringify(photos));
      } catch (error) {
        console.error('Failed to save photos to AsyncStorage:', error);
      }
    };

    savePhotos();
  }, [photos]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const newPhoto = await cameraRef.current.takePictureAsync();
      setPhotos(prevPhotos => [...prevPhotos, newPhoto.uri]);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>


      <ScrollView horizontal style={styles.previewContainer}>
        {photos.map((uri, index) => (
          <View key={index} style={styles.previewItem}>
            <Image source={{ uri }} style={styles.previewImage} />
            <Text style={styles.previewText}>Photo {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 24,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  previewContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  previewItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  previewText: {
    fontSize: 14,
    marginTop: 5,
  },
});