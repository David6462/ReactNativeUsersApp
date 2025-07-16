import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../shared/config/firebase';
import { UserModel } from '../../models/UserModel';

export interface UserRemoteDataSource {
  getUsers(): Promise<{ id: string; data: UserModel }[]>;
  getUserById(id: string): Promise<{ id: string; data: UserModel }>;
  searchUsers(query: string): Promise<{ id: string; data: UserModel }[]>;
}

export class FirestoreUserDataSource implements UserRemoteDataSource {
  private collectionName = 'users';

  async getUsers(): Promise<{ id: string; data: UserModel }[]> {
    try {
      const usersCollection = collection(db, this.collectionName);
      const q = query(usersCollection, orderBy('name'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data() as UserModel,
      }));
    } catch (error) {
      console.error('Error en la búsqueda de usuarios:', error);
      throw new Error('Fallo al recuperar usuarios desde Firestore');
    }
  }

  async getUserById(id: string): Promise<{ id: string; data: UserModel }> {
    try {
      const userDoc = doc(db, this.collectionName, id);
      const docSnap = await getDoc(userDoc);
      
      if (!docSnap.exists()) {
        throw new Error('Usuario no encontrado...');
      }

      return {
        id: docSnap.id,
        data: docSnap.data() as UserModel,
      };
    } catch (error) {
      console.error(`Error al buscar el usuario ${id}:`, error);
      throw new Error(`Error al encontrar el usuario con el Id: ${id}`);
    }
  }

  async searchUsers(searchQuery: string): Promise<{ id: string; data: UserModel }[]> {
    try {
      const allUsers = await this.getUsers();
      const lowercaseQuery = searchQuery.toLowerCase();

      return allUsers.filter(user =>
        user.data.name.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Fallo buscando usuarios:', error);
      throw new Error('Fallo al buscar usuarios...');
    }
  }
}