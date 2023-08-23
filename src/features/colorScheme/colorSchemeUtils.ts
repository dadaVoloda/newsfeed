const LS_COLOR_SCHEME_KEY = 'newsfeed:scheme';

type SchemeType = 'dark' | 'light';

export const applyScheme = (scheme: SchemeType, persist = false) => {
  document.documentElement.setAttribute('scheme', scheme);

  if (persist) localStorage.setItem(LS_COLOR_SCHEME_KEY, scheme);
};

export const getSystemScheme = (): SchemeType => {
  return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
};

export const getSavedScheme = (): SchemeType | null => {
  return localStorage.getItem(LS_COLOR_SCHEME_KEY) as SchemeType | null;
};

export const removeSavedScheme = () => {
  localStorage.removeItem(LS_COLOR_SCHEME_KEY);
};
