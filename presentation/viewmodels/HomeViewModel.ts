import { useState } from 'react';
import { GetUser } from '../../domain/usecases/GetUser';
import { User } from '@/domain/models/User';
import { UserRepositoryData } from '@/data/repositories/UserRepositoryData';

const userRepository = new UserRepositoryData();
const getUser = new GetUser(userRepository);

export function useHomeViewModel() {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async (id: string) => {
    const userData = await getUser.execute(id);
    setUser(userData);
  };

  return { user, loadUser };
}
