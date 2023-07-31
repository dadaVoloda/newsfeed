import { User, UserCredential } from 'firebase/auth';

export interface IAuthContext {
  isAuthenticate: boolean | null;
  user: User | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => void;
  loginWithPopup: (provider: string) => Promise<UserCredential>;
}
