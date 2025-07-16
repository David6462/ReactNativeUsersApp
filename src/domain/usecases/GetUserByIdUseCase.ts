import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    if (!id) {
      throw new Error('Se requiere Id de usuario');
    }

    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      throw new Error(`Fallo al encontrar usuario con Id: ${id}`);
    }
  }
}