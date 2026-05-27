import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ActionButtonsProps = {
  pickImage: () => void;
  takePhoto: () => void;
};

export function ActionButtons({
  pickImage,
  takePhoto,
}: ActionButtonsProps) {
  return (
    <View
      style={{
        gap: 10,
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: '#2563eb',
          padding: 15,
          borderRadius: 14,
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
          🖼️ Escolher da galeria
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={takePhoto}
        style={{
          backgroundColor: '#16a34a',
          padding: 15,
          borderRadius: 14,
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
          📷 Tirar foto
        </Text>
      </TouchableOpacity>
    </View>
  );
}