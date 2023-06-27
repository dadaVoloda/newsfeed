export const categoryIds: { [index: string]: number } = {
  index: 0,
  tech: 1,
  sport: 2,
  fashion: 3,
  politics: 4,
};

export const beautifyDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
