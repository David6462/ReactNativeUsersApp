import { UserRepository } from '../repositories/UserRepository';
import { UserListItem } from '../entities/User';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserListItem[]> {
    try {
      return await this.userRepository.getUsers();
    } catch (error) {
      throw new Error('Fallo en búsqueda de usuarios');
    }
  }
}