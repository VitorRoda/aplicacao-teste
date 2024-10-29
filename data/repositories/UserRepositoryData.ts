import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/models/User';

export class UserRepositoryData implements UserRepository {
  async getUserById(id: string): Promise<User> {
    const response = await fetch(`https:/fakestoreapi.com/users/${id}`);
    return await response.json();
  }
}