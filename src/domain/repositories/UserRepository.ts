import { User, UserListItem } from '../entities/User';

export interface UserRepository {
  getUsers(): Promise<UserListItem[]>;
  getUserById(id: string): Promise<User>;
  searchUsers(query: string): Promise<UserListItem[]>;
}