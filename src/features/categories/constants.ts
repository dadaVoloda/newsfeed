import { CategoryNames } from '@features/categories/types';

export const categoryIds: Record<CategoryNames, number> = {
  tech: 1,
  sport: 2,
  fashion: 3,
  politics: 4,
  ['karpov.courses']: 6,
  other: 5,
};

export const categoryTitles: Record<CategoryNames, string> = {
  tech: 'Технологии',
  sport: 'Спорт',
  fashion: 'Мода',
  politics: 'Политика',
  ['karpov.courses']: 'Karpov',
  other: 'Прочее',
};
