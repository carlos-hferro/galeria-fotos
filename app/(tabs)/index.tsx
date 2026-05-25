import {
  deletePhoto,
  getPhotos,
  savePhoto
} from '../../database/database';

import { useEffect, useState } from 'react';

import {
  Button,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function HomeScreen() {


  const [image, setImage] = useState<string | null>(null);

  const [latitude, setLatitude] = useState<number | null>(null);

  const [longitude, setLongitude] = useState<number | null>(null);

  const [photos, setPhotos] = useState<any[]>([]);

  const [title, setTitle] = useState('');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function loadPhotos() {

    const data = getPhotos();

    setPhotos(data);

    console.log(data);
  }

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

    // PEGAR LOCALIZAÇÃO
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setLatitude(location.coords.latitude);

    setLongitude(location.coords.longitude);

    // ABRIR GALERIA
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
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



        {selectedImage && (
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 15,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.15,
              shadowRadius: 4,

              elevation: 5,
              alignItems: 'center',
            }}
          >

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
              }}
            >
              Pré-visualização
            </Text>

            <Image
              source={{ uri: selectedImage }}
              style={{
                width: '100%',
                height: 250,
                borderRadius: 14,
                marginBottom: 15,
              }}
              resizeMode="contain"
            />

            <TextInput
              placeholder="Digite o título da foto"
              value={title}
              onChangeText={setTitle}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 12,
                marginBottom: 15,
                backgroundColor: '#f5f5f5',
              }}
            />
<View
  style={{
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  }}
>

  <TouchableOpacity
    onPress={handleSavePhoto}
    style={{
      flex: 1,
      backgroundColor: '#16a34a',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        color: '#fff',
        fontWeight: 'bold',
      }}
    >
      ✅ Salvar
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      setSelectedImage(null);
      setTitle('');
      setLatitude(null);
      setLongitude(null);
    }}
    style={{
      flex: 1,
      backgroundColor: '#6b7280',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        color: '#fff',
        fontWeight: 'bold',
      }}
    >
      ❌ Cancelar
    </Text>
  </TouchableOpacity>

</View>
          </View>
        )}

        <FlatList
          data={photos}
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
              Nenhuma imagem cadastrada ainda.
            </Text>
          }
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#fff',
                borderRadius: 16,
                padding: 12,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 4,

                elevation: 4,
              }}
            >
              <Image
                source={{ uri: item.image_uri }}
                style={{
                  width: '100%',
                  height: 260,
                  borderRadius: 14,
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: '#666',
                  marginBottom: 5,
                }}
              >
                📅 {new Date(item.created_at).toLocaleDateString('pt-BR')}
              </Text>

              <Text
                style={{
                  color: '#666',
                }}
              >
                📍 Latitude: {Number(item.latitude).toFixed(4)}
              </Text>

              <Text
                style={{
                  color: '#666',
                  marginBottom: 10,
                }}
              >
                📍 Longitude: {Number(item.longitude).toFixed(4)}
              </Text>

<TouchableOpacity
  onPress={() => handleDeletePhoto(item.id)}
  style={{
    backgroundColor: '#ef4444',
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }}
  >
    🗑️ Excluir foto
  </Text>
</TouchableOpacity>

            </View>
          )}
        />
        {!selectedImage && (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: '#2563eb',
              padding: 15,
              borderRadius: 14,
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              📷 Adicionar imagem
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}