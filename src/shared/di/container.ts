import { FirestoreUserDataSource } from '../../data/datasources/remote/UserRemoteDataSource';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';
import { GetUsersUseCase } from '../../domain/usecases/GetUsersUseCase';
import { GetUserByIdUseCase } from '../../domain/usecases/GetUserByIdUseCase';
import { SearchUsersUseCase } from '../../domain/usecases/SearchUsersUseCase';

// Singleton pattern para las instancias
class DIContainer {
  private static instance: DIContainer;
  
  // Data Sources
  private _userRemoteDataSource: FirestoreUserDataSource;
  
  // Repositories
  private _userRepository: UserRepositoryImpl;
  
  // Use Cases
  private _getUsersUseCase: GetUsersUseCase;
  private _getUserByIdUseCase: GetUserByIdUseCase;
  private _searchUsersUseCase: SearchUsersUseCase;

  private constructor() {
    // Inicializar data sources
    this._userRemoteDataSource = new FirestoreUserDataSource();
    
    // Inicializar repositories
    this._userRepository = new UserRepositoryImpl(this._userRemoteDataSource);
    
    // Inicializar use cases
    this._getUsersUseCase = new GetUsersUseCase(this._userRepository);
    this._getUserByIdUseCase = new GetUserByIdUseCase(this._userRepository);
    this._searchUsersUseCase = new SearchUsersUseCase(this._userRepository);
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Getters para los use cases
  get getUsersUseCase(): GetUsersUseCase {
    return this._getUsersUseCase;
  }

  get getUserByIdUseCase(): GetUserByIdUseCase {
    return this._getUserByIdUseCase;
  }

  get searchUsersUseCase(): SearchUsersUseCase {
    return this._searchUsersUseCase;
  }
}

export default DIContainer;