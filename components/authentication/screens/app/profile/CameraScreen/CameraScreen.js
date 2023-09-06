import React, { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      setPreviewPhoto(photo.uri);

      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await FileSystem.deleteAsync(photo.uri);
    }
  }

  function toggleFlash() {
    setFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flashMode}
      >
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-ios" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFlash}>
            <MaterialIcons
              name={flashMode === FlashMode.on ? "flash-on" : "flash-off"}
              size={36}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtons}>
          {previewPhoto && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Preview", { photoUri: previewPhoto })
              }
            >
              <Image
                style={styles.previewPhoto}
                source={{ uri: previewPhoto }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={takePicture}>
            <MaterialIcons name="camera" size={70} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  topButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: 20,
  },
  previewPhoto: {
    width: 70,
    height: 70,
  },
});
