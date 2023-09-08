import React, {useContext} from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../../../contexts/AuthContext';


const PreviewScreen = ({ route, navigation }) => {
      const { photoUri } = route.params;
      const {updateUser, accessToken} = useContext(AuthContext)

      const { loading, error, data, handleUpdate } = updateUser();
    
      const savePhoto = async () => {
        const asset = await MediaLibrary.createAssetAsync(photoUri);
        await FileSystem.deleteAsync(photoUri);
        const image = photoUri
        await handleUpdate(accessToken, image)

        navigation.goBack();
      };
    
      const deletePhoto = async () => {
        await FileSystem.deleteAsync(photoUri);
        navigation.goBack();
      };
    
      return (
        <View style={styles.container}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={savePhoto} />
            <Button title="Delete" onPress={deletePhoto} color="red" />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      previewImage: {
        width: '100%',
        height: '70%',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 20,
      },
    });

    export default PreviewScreen