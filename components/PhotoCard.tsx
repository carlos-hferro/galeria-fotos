import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type PhotoCardProps = {
  item: any;
  editingPhotoId: number | null;
  editingTitle: string;
  setEditingTitle: (value: string) => void;
  handleSaveRenamePhoto: () => void;
  handleStartRenamePhoto: (id: number, currentTitle: string) => void;
  handleDeletePhoto: (id: number) => void;
};

export function PhotoCard({
  item,
  editingPhotoId,
  editingTitle,
  setEditingTitle,
  handleSaveRenamePhoto,
  handleStartRenamePhoto,
  handleDeletePhoto,
}: PhotoCardProps) {
  return (
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

      {editingPhotoId === item.id && (
        <View
          style={{
            width: '100%',
            marginTop: 15,
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            ✏️ Editando título
          </Text>

          <TextInput
            placeholder="Digite o novo título"
            value={editingTitle}
            onChangeText={setEditingTitle}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              padding: 12,
              backgroundColor: '#fff',
              marginBottom: 10,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleSaveRenamePhoto}
              style={{
                flex: 1,
                backgroundColor: '#16a34a',
                padding: 12,
                borderRadius: 10,
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
                setEditingTitle('');
              }}
              style={{
                flex: 1,
                backgroundColor: '#6b7280',
                padding: 12,
                borderRadius: 10,
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

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            handleStartRenamePhoto(item.id, item.title)
          }
          style={{
            flex: 1,
            backgroundColor: '#2563eb',
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
            ✏️ Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeletePhoto(item.id)}
          style={{
            flex: 1,
            backgroundColor: '#ef4444',
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
            🗑️ Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}