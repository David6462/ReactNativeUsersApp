import { UserRepository } from '../repositories/UserRepository';
import { UserListItem } from '../entities/User';

export class SearchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(query: string): Promise<UserListItem[]> {
    if (!query || query.trim().length === 0) {
      return this.userRepository.getUsers();
    }

    try {
      return await this.userRepository.searchUsers(query.trim());
    } catch (error) {
      throw new Error('Fallo al encontrar usuarios');
    }
  }
}