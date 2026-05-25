import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Galeria',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="images"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Mapa',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="map"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}