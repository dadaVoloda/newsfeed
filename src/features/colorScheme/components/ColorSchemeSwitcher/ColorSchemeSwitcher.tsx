import React, { FC, useEffect, useRef, useState } from 'react';
import {
  applyScheme,
  getSavedScheme,
  getSystemScheme,
  removeSavedScheme,
} from '../../colorSchemeUtils';
import { Auto } from '@components/Icons/Auto';
import { Moon } from '@components/Icons/Moon';
import { Sun } from '@components/Icons/Sun';
import { Dropdown } from '@components/Dropdown/Dropdown';

import './ColorSchemeSwitcher.css';

import check from '@images/check.svg';

type ColorSchemeSwitcherValues = 'auto' | 'dark' | 'light';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

interface SchemeItem {
  name: ColorSchemeSwitcherValues;
  text: string;
  icon: React.ReactNode;
}

const schemes: SchemeItem[] = [
  {
    name: 'auto',
    text: 'Авто',
    icon: <Auto />,
  },
  {
    name: 'light',
    text: 'Светлая',
    icon: <Sun />,
  },
  {
    name: 'dark',
    text: 'Темная',
    icon: <Moon />,
  },
];

export const ColorSchemeSwitcher: FC = () => {
  const [userScheme, setUserScheme] = useState<ColorSchemeSwitcherValues>(
    getSavedScheme() || 'auto'
  );
  const [dropdownShown, setDropdownShown] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === 'auto') {
        applyScheme(getSystemScheme());
      }
    };
    matchMedia.addEventListener('change', systemColorSchemeListener);

    return () => {
      matchMedia.removeEventListener('change', systemColorSchemeListener);
    };
  }, [userScheme]);

  const changeScheme = (scheme: ColorSchemeSwitcherValues) => {
    setUserScheme(scheme);
    setDropdownShown(!dropdownShown);
  };

  return (
    <div className="color-scheme-switcher" onClick={(e) => e.stopPropagation()}>
      <button
        className="color-scheme-switcher__value"
        ref={targetRef}
        onClick={() => setDropdownShown(!dropdownShown)}
      >
        {userScheme === 'auto' && <Auto />}
        {userScheme === 'dark' && <Moon />}
        {userScheme === 'light' && <Sun />}
      </button>
      <Dropdown targetRef={targetRef} shown={dropdownShown} onShownChange={setDropdownShown}>
        {schemes.map((scheme) => (
          <button
            className="color-scheme-switcher__option"
            key={scheme.name}
            onClick={() => changeScheme(scheme.name)}
          >
            {scheme.icon}
            <span className="color-scheme-switcher__text">{scheme.text}</span>
            {userScheme === scheme.name && (
              <img className="color-scheme-switcher__check" src={check} alt="Выбранная тема" />
            )}
          </button>
        ))}
      </Dropdown>
    </div>
  );
};
