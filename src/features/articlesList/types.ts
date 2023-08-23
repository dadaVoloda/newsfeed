import { Source } from '@features/sources/types';
import { Category } from '@features/categories/types';
import { Article } from '@features/articleItem/types';

export interface NewsAPI {
  sources: Source[];
  categories: Category[];
  items: Article[];
}
