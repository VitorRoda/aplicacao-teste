import { UserRepository } from '../repositories/UserRepository';

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    return this.userRepository.getUserById(id);
  }
}