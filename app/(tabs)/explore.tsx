import { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';

import { getPhotos } from '../../database/database';

export default function MapScreen() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  useFocusEffect(() => {
    const data = getPhotos();
    setPhotos(data);
  });

  if (photos.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Nenhuma foto cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        region={{
          latitude: Number(photos[0].latitude),
          longitude: Number(photos[0].longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {photos.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
            }}
            onPress={() => setSelectedPhoto(item)}
          />
        ))}
      </MapView>

      {selectedPhoto && (
<View
  style={{
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,

    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',

    padding: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 10,
    alignItems: 'center',
  }}
>
<Text
  style={{
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  }}
>
  {selectedPhoto.title}
</Text>
<Image
  source={{ uri: selectedPhoto.image_uri }}
  style={{
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
  }}
  resizeMode="contain"
/>

<Text
  style={{
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  }}
>
  📅 {new Date(selectedPhoto.created_at).toLocaleDateString('pt-BR')} às{' '}
  {new Date(selectedPhoto.created_at).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}
</Text>

<TouchableOpacity
  onPress={() => setSelectedPhoto(null)}
  style={{
    backgroundColor: '#2563eb',
    width: '100%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    }}
  >
    Fechar
  </Text>
</TouchableOpacity>
        </View>
      )}
    </View>
  );
}