import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { Credentials } from '../../domain/models/Credentials';

export class AuthRepositoryData implements AuthRepository {
  async login(credentials: Credentials): Promise<string> {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: credentials.user,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    const data = await response.json();
    return data.token;
  }
}
