import { Credentials } from '../models/Credentials';

export interface AuthRepository {
  login(credentials: Credentials): Promise<string>;
}