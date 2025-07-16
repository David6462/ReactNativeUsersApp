// __tests__/domain-tests.test.ts
import { GetUsersUseCase } from '../src/domain/usecases/GetUsersUseCase';
import { GetUserByIdUseCase } from '../src/domain/usecases/GetUserByIdUseCase';
import { SearchUsersUseCase } from '../src/domain/usecases/SearchUsersUseCase';
import { UserRepository } from '../src/domain/repositories/UserRepository';
import { User, UserListItem } from '../src/domain/entities/User';

// Mock Repository para tests
class MockUserRepository implements UserRepository {
  private mockUsers: UserListItem[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', city: 'Bogotá' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', city: 'Medellín' },
  ];

  private mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    city: 'Bogotá',
    address: 'Calle 123',
    company: 'Tech Corp',
    phone: '+57 123 456 7890',
  };

  private shouldThrow = false;

  async getUsers(): Promise<UserListItem[]> {
    if (this.shouldThrow) throw new Error('Repository error');
    return this.mockUsers;
  }

  async getUserById(id: string): Promise<User> {
    if (this.shouldThrow) throw new Error('Usuario no encontrado');
    return { ...this.mockUser, id };
  }

  async searchUsers(query: string): Promise<UserListItem[]> {
    if (this.shouldThrow) throw new Error('Búsqueda fallida');
    return this.mockUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  setShouldThrow(value: boolean) {
    this.shouldThrow = value;
  }
}

describe('Domain Layer Tests', () => {
  let mockRepository: MockUserRepository;

  beforeEach(() => {
    mockRepository = new MockUserRepository();
  });

  describe('GetUsersUseCase', () => {
    test('debería devolver a los usuarios correctamente', async () => {
      const useCase = new GetUsersUseCase(mockRepository);
      const result = await useCase.execute();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('John Doe');
    });

    test('should throw error when repository fails', async () => {
      mockRepository.setShouldThrow(true);
      const useCase = new GetUsersUseCase(mockRepository);

      await expect(useCase.execute()).rejects.toThrow('Fallo en búsqueda de usuarios');
    });
  });

  describe('GetUserByIdUseCase', () => {
    test('should return user by id', async () => {
      const useCase = new GetUserByIdUseCase(mockRepository);
      const result = await useCase.execute('123');

      expect(result.id).toBe('123');
      expect(result.name).toBe('John Doe');
    });

    test('should throw error when id is empty', async () => {
      const useCase = new GetUserByIdUseCase(mockRepository);

      await expect(useCase.execute('')).rejects.toThrow('Se requiere Id de usuario');
    });
  });

  describe('SearchUsersUseCase', () => {
    test('should return filtered results', async () => {
      const useCase = new SearchUsersUseCase(mockRepository);
      const result = await useCase.execute('John');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    test('should return all users when query is empty', async () => {
      const useCase = new SearchUsersUseCase(mockRepository);
      const result = await useCase.execute('');

      expect(result).toHaveLength(2);
    });
  });
});