import PhotoPreviewSection from '../../components/PhotoPreviewSection';
import { AntDesign } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppNavigation } from '../utils/useAppNavigation';


interface CameraProps {
  onPhotoTaken: (photo: any) => void;
  captureType: 'INE' | 'Comprobante';
}

export default function Camera({ captureType }: CameraProps) {
  const navigation = useAppNavigation();


  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);

      setPhoto(takedPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  if (photo)
    return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} />;

  return (
    <View style={styles.container}>
      {/* Circular Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

        {/* Person Outline with low opacity */}
        <Image
          source={require('@/assets/images/person.jpg')} // Add the correct path to your image file
          style={styles.personOutline}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={44} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
        <AntDesign name="camera" size={44} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cameraContainer: {
    marginTop: 20,
    width: 300, // Size of the circle (diameter)
    height: 300,
    borderRadius: 150,
    overflow: 'hidden', // Clip the camera view to the circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  personOutline: {
    position: 'absolute', // Overlay the outline image on top of the camera view
    width: '80%', // Adjust to fit inside the circle
    height: '80%',
    opacity: 0.3, // Low opacity for the person outline
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 20,
    borderRadius: 50,
    padding: 10,
  },
  captureButton: {
    marginTop: 20,
    borderRadius: 50,
    padding: 10,
  },
});
