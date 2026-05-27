import {
  deletePhoto,
  getPhotos,
  savePhoto,
  updatePhotoTitle,
} from '../../database/database';

import { Photo } from '../../types/Photo';

import { PhotoPreview } from '../../components/PhotoPreview';
import { PhotoCard } from '../../components/PhotoCard';
import { SearchBar } from '../../components/SearchBar';
import { ActionButtons } from '../../components/ActionButtons';

import { useEffect, useState } from 'react';

import {
  FlatList,
  Text,
  View,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
export default function HomeScreen() {

  const [latitude, setLatitude] = useState<number | null>(null);

  const [longitude, setLongitude] = useState<number | null>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);

  const [title, setTitle] = useState('');

  const [search, setSearch] = useState('');

  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);

  const [editingTitle, setEditingTitle] = useState('');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function loadPhotos() {

    const data = getPhotos();

    setPhotos(data);

    console.log(data);
  }

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDeletePhoto(id: number) {
    Alert.alert(
      '🗑️ Excluir foto',
      'Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deletePhoto(id);
            loadPhotos();

            Alert.alert(
              '✅ Excluído',
              'A foto foi removida da galeria.'
            );
          },
        },
      ]
    );
  }
  function handleStartRenamePhoto(id: number, currentTitle: string) {
    setEditingPhotoId(id);
    setEditingTitle(currentTitle);
  }

  function handleSaveRenamePhoto() {
    if (!editingTitle.trim() || editingPhotoId === null) {
      Alert.alert(
        '⚠️ Campo obrigatório',
        'Digite um título válido.'
      );
      return;
    }

    updatePhotoTitle(editingPhotoId, editingTitle);

    loadPhotos();

    setEditingPhotoId(null);
    setEditingTitle('');

    Alert.alert(
      '✅ Atualizado',
      'Título alterado com sucesso.'
    );
  }
  useEffect(() => {
    loadPhotos();
  }, []);

  async function pickImage() {

    // PEDIR PERMISSÃO DE LOCALIZAÇÃO
    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (permission.status !== 'granted') {
      alert('Permissão de localização negada');
      return;
    }

    // ABRIR GALERIA
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
      });

    if (!result.canceled) {

      let location =
        await Location.getLastKnownPositionAsync();

      if (!location) {
        location =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
          });
      }

      const imageUri = result.assets[0].uri;

      setSelectedImage(imageUri);

      setLatitude(location.coords.latitude);

      setLongitude(location.coords.longitude);
    }
  }

  async function takePhoto() {

    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização.'
      );
      return;
    }

    const cameraPermission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermission.status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar a câmera.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {

      let location =
        await Location.getLastKnownPositionAsync();

      if (!location) {
        location =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
          });
      }

      const imageUri = result.assets[0].uri;

      setSelectedImage(imageUri);

      setLatitude(location.coords.latitude);

      setLongitude(location.coords.longitude);
    }
  }

  function handleSavePhoto() {

    if (!title.trim()) {
      Alert.alert(
        '⚠️ Campo obrigatório',
        'Digite um título para continuar.'
      );

      return;
    }

    if (
      !selectedImage ||
      !latitude ||
      !longitude
    ) {
      Alert.alert(
        '📷 Nenhuma imagem',
        'Escolha uma foto antes de continuar.'
      );

      return;
    }

    savePhoto(
      title,
      selectedImage,
      latitude,
      longitude
    );

    loadPhotos();

    setTitle('');
    setSelectedImage(null);

    Alert.alert(
      '✅ Sucesso',
      'Sua foto foi salva na galeria.'
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >

        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          📸 Minha Galeria
        </Text>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {selectedImage && (
          <PhotoPreview
            selectedImage={selectedImage}
            title={title}
            setTitle={setTitle}
            handleSavePhoto={handleSavePhoto}
            handleCancel={() => {
              setSelectedImage(null);
              setTitle('');
              setLatitude(null);
              setLongitude(null);
            }}
          />
        )}

        <FlatList
          data={filteredPhotos}
          keyExtractor={(item) => String(item.id)}
          style={{ marginTop: 20, width: '100%' }}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                color: '#666',
                marginTop: 30,
                fontSize: 16,
              }}
            >
              {search
                ? 'Nenhuma foto encontrada.'
                : 'Nenhuma imagem cadastrada ainda.'
              }
            </Text>
          }
          renderItem={({ item }) => (
            <PhotoCard
              item={item}
              editingPhotoId={editingPhotoId}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              handleSaveRenamePhoto={handleSaveRenamePhoto}
              handleStartRenamePhoto={handleStartRenamePhoto}
              handleDeletePhoto={handleDeletePhoto}
            />
          )}
        />
        {!selectedImage && (
          <ActionButtons
            pickImage={pickImage}
            takePhoto={takePhoto}
          />
        )}
      </View>
    </SafeAreaView>
  );
}