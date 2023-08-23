import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  User,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { IAuthContext } from '@features/auth/types';

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

const authContext = createContext<IAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  loginWithPopup: () => Promise.reject({}),
  logOut: () => undefined,
});

export const useAuth = (): IAuthContext => useContext(authContext);

const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};

interface Props {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
}

export const AuthContextProvider: FC<Props> = ({ children, firebaseApp }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<IAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  const processLogin = (loginPromise: Promise<UserCredential>): Promise<UserCredential> => {
    setIsAuthenticate(null);
    setUser(null);

    return loginPromise
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error('login error', error);
        throw error;
      });
  };
  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithPopup = (provider: string) => {
    return processLogin(signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider]));
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    if (!auth) return;

    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setIsAuthenticate(true);
            setUser(user);
          })
          .catch(() => {
            logOut();
            setIsAuthenticate(false);
            setUser(null);
          });
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <authContext.Provider
      value={{ isAuthenticate, user, loginWithEmailAndPassword, logOut, loginWithPopup }}
    >
      {children}
    </authContext.Provider>
  );
};
