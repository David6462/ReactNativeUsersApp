import { UserMapper, UserModel } from '../src/data/models/UserModel';
import { UserRepositoryImpl } from '../src/data/repositories/UserRepositoryImpl';
import { UserRemoteDataSource } from '../src/data/datasources/remote/UserRemoteDataSource';

// Mock del Remote Data Source
class MockUserRemoteDataSource implements UserRemoteDataSource {
  private shouldThrow = false;
  private mockData = {
    id: '1',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      city: 'Bogotá',
      address: 'Calle 123',
      company: 'Tech Corp',
      phone: '+57 123 456 7890',
    } as UserModel
  };

  async getUsers() {
    if (this.shouldThrow) throw new Error('Error en la fuente de datos');
    return [this.mockData];
  }

  async getUserById(id: string) {
    if (this.shouldThrow) throw new Error('Usuario no encontrado');
    return { ...this.mockData, id };
  }

  async searchUsers(query: string) {
    if (this.shouldThrow) throw new Error('Búsqueda fallida');
    return [this.mockData];
  }

  setShouldThrow(value: boolean) {
    this.shouldThrow = value;
  }
}

describe('Pruebas de la capa de datos', () => {
  const mockUserModel: UserModel = {
    name: 'John Doe',
    email: 'john@example.com',
    city: 'Bogotá',
    address: 'Calle 123',
    company: 'Tech Corp',
    phone: '+57 123 456 7890',
  };

  describe('UserMapper', () => {
    test('debe asignar UserModel a la entidad de dominio User', () => {
      const result = UserMapper.toDomain('123', mockUserModel);

      expect(result.id).toBe('123');
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.address).toBe('Calle 123');
      expect(result.company).toBe('Tech Corp');
    });

    test('debe asignar UserModel a UserListItem', () => {
      const result = UserMapper.toListItem('123', mockUserModel);

      expect(result.id).toBe('123');
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.city).toBe('Bogotá');
      
      expect(result).not.toHaveProperty('address');
      expect(result).not.toHaveProperty('company');
      expect(result).not.toHaveProperty('phone');
    });

    test('debe tratar los valores vacíos', () => {
      const emptyModel: UserModel = {
        name: '',
        email: '',
        city: '',
        address: '',
        company: '',
        phone: '',
      };

      const result = UserMapper.toDomain('123', emptyModel);
      expect(result.name).toBe('');
      expect(result.id).toBe('123');
    });
  });

  describe('UserRepositoryImpl', () => {
    let mockDataSource: MockUserRemoteDataSource;
    let repository: UserRepositoryImpl;

    beforeEach(() => {
      mockDataSource = new MockUserRemoteDataSource();
      repository = new UserRepositoryImpl(mockDataSource);
    });

    describe('getUsers', () => {
      test('debe devolver un array UserListItem mapeado', async () => {
        const result = await repository.getUsers();

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('1');
        expect(result[0].name).toBe('John Doe');
        expect(result[0]).not.toHaveProperty('address');
      });

      test('debe propagar los errores desde la fuente de datos', async () => {
        mockDataSource.setShouldThrow(true);

        await expect(repository.getUsers()).rejects.toThrow('Error en la fuente de datos');
      });
    });

    describe('getUserById', () => {
      test('debe devolver el Usuario mapeado con todos los campos', async () => {
        const result = await repository.getUserById('123');

        expect(result.id).toBe('123');
        expect(result.name).toBe('John Doe');
        expect(result.address).toBe('Calle 123');
        expect(result.company).toBe('Tech Corp');
      });

      test('debe propagar los errores desde la fuente de datos', async () => {
        mockDataSource.setShouldThrow(true);

        await expect(repository.getUserById('123')).rejects.toThrow('Usuario no encontrado');
      });
    });

    describe('searchUsers', () => {
      test('debería devolver resultados de búsqueda mapeados', async () => {
        const result = await repository.searchUsers('John');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('John Doe');
        expect(result[0]).not.toHaveProperty('address');
      });

      test('should propagate search errors', async () => {
        mockDataSource.setShouldThrow(true);

        await expect(repository.searchUsers('John')).rejects.toThrow('Búsqueda fallida');
      });
    });
  });
});