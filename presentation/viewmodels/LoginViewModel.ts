import { useState } from 'react';
import { Credentials } from '../../domain/models/Credentials';
import { useAuth } from '../../services/AuthContext';
import { useRouter } from 'expo-router';
import { AuthenticateUser } from '@/domain/usecases/AuthenticateUser';
import { AuthRepositoryData } from '@/data/repositories/AuthRepositoryData';


const userRepository = new AuthRepositoryData();
const authenticateUser = new AuthenticateUser(userRepository);

export function useLoginViewModel() {
  const { login } = useAuth();
  const router = useRouter();

  const [credentials, setCredentials] = useState<Credentials>({ user: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUserChange = (user: string) => {
    setCredentials((prev) => ({ ...prev, user }));
  };

  const handlePasswordChange = (password: string) => {
    setCredentials((prev) => ({ ...prev, password }));
  };

  const authenticate = async () => {
    if (credentials.user === '' || credentials.password === '') {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const token = await authenticateUser.execute(credentials);
      login(token); 
      router.replace('/');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    loading,
    error,
    setError,
    handleUserChange,
    handlePasswordChange,
    authenticate,
  };
}
