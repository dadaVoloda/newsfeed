import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { IPartnerArticle } from '@features/partnersArticles/types';
import { NewsAPI } from '@features/articlesList/types';
import { Category } from '@features/categories/types';
import { Source } from '@features/sources/types';
import { RelatedArticlesAPI } from '@features/relatedNews/types';
import { ArticleItemAPI } from '@features/articleItem/types';

export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCQC29uY6-ZE7BUHfn0fgoXDbm_aW6dsXY',
    authDomain: 'newsfeed-course.firebaseapp.com',
    projectId: 'newsfeed-course',
    storageBucket: 'newsfeed-course.appspot.com',
    messagingSenderId: '926000394280',
    appId: '1:926000394280:web:47c646326fadd94e64051d',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);

  return firebaseApp;
};

const partnersPostsCollection = 'partners-posts';

export const getPartnersArticles = async (): Promise<IPartnerArticle[]> => {
  const db = getFirestore();
  const articles: IPartnerArticle[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, partnersPostsCollection));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;
      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return articles;
};

export const createPartnerArticle = async (data: Omit<IPartnerArticle, 'id' | 'created'>) => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, partnersPostsCollection), {
      ...data,
      created: { nanoseconds: 0, seconds: Date.now() },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnerArticle = async (
  id: string,
  data: Omit<IPartnerArticle, 'id' | 'created'>
) => {
  const db = getFirestore();
  const ref = doc(db, partnersPostsCollection, id);

  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnerArticle = async (id: string) => {
  const db = getFirestore();

  try {
    await deleteDoc(doc(db, partnersPostsCollection, id));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPartnerArticle = async (id: string): Promise<IPartnerArticle> => {
  const db = getFirestore();
  const docRef = doc(db, partnersPostsCollection, id);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnerArticle, 'id'>;
      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw new Error('Такой статьи нет');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `${file.name}-${Date.now()}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMainPartnerArticle = async (): Promise<IPartnerArticle | null> => {
  const db = getFirestore();
  let article = null;

  try {
    const q = query(collection(db, partnersPostsCollection), orderBy('created', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id' | 'created'>;
      article = {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return article;
};

export const apiFetchNews = (): Promise<NewsAPI> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/ru/news').then((response) =>
    response.json()
  );
};

export const apiFetchTrends = (): Promise<NewsAPI> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/ru/trends').then((response) =>
    response.json()
  );
};

export const apiFetchCategory = (id: number): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${id}`).then((response) =>
    response.json()
  );
};

export const apiFetchCategories = (): Promise<Category[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/categories').then((response) =>
    response.json()
  );
};

export const apiFetchSources = (): Promise<Source[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) =>
    response.json()
  );
};

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then(
    (response) => response.json()
  );
};

export const apiFetchArticleItem = (id: number): Promise<ArticleItemAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`).then((response) =>
    response.json()
  );
};
