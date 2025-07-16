import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: {
    userId: string;
    userName?: string;
  };
};

// Props tipadas para cada pantalla
export type UserListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserList'
>;

export type UserDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserDetail'
>;

// Hook tipado para navegación
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}