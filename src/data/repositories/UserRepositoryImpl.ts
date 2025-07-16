import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, UserListItem } from '../../domain/entities/User';
import { UserRemoteDataSource } from '../datasources/remote/UserRemoteDataSource';
import { UserMapper } from '../models/UserModel';

export class UserRepositoryImpl implements UserRepository {
  constructor(private remoteDataSource: UserRemoteDataSource) {}

  async getUsers(): Promise<UserListItem[]> {
    try {
      const users = await this.remoteDataSource.getUsers();
      return users.map(user => UserMapper.toListItem(user.id, user.data));
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.remoteDataSource.getUserById(id);
      return UserMapper.toDomain(user.id, user.data);
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(query: string): Promise<UserListItem[]> {
    try {
      const users = await this.remoteDataSource.searchUsers(query);
      return users.map(user => UserMapper.toListItem(user.id, user.data));
    } catch (error) {
      throw error;
    }
  }
}