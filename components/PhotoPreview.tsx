import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type PhotoPreviewProps = {
  selectedImage: string;
  title: string;
  setTitle: (value: string) => void;
  handleSavePhoto: () => void;
  handleCancel: () => void;
};

export function PhotoPreview({
  selectedImage,
  title,
  setTitle,
  handleSavePhoto,
  handleCancel,
}: PhotoPreviewProps) {
  return (
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
          onPress={handleCancel}
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
  );
}