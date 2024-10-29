import { AuthRepository } from '../repositories/AuthRepository';
import { Credentials } from '../models/Credentials';

export class AuthenticateUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: Credentials): Promise<string> {
    return await this.authRepository.login(credentials);
  }
}
