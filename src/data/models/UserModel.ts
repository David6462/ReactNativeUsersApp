import { User, UserListItem } from '../../domain/entities/User';

export interface UserModel {
  name: string;
  email: string;
  city: string;
  address: string;
  company: string;
  phone: string;
}

export class UserMapper {
  static toDomain(id: string, model: UserModel): User {
    return {
      id,
      name: model.name,
      email: model.email,
      city: model.city,
      address: model.address,
      company: model.company,
      phone: model.phone,
    };
  }

  static toListItem(id: string, model: UserModel): UserListItem {
    return {
      id,
      name: model.name,
      email: model.email,
      city: model.city,
    };
  }
}