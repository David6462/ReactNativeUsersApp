import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../shared/types/navigation';
import { UserListScreen, UserDetailScreen } from '../screens';
import { Colors } from '../../shared/constants/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{
            title: 'Usuarios',
          }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={({ route }) => ({
            title: route.params?.userName || 'Detalles',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;