import React, { createContext, useContext, useEffect, useState } from 'react';

type BackgroundMusicContext = {
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
};

const Context = createContext<BackgroundMusicContext | undefined>(undefined);

const localStorageKey = 'isBackgroundMusicMuted';

const BackgroundMusicContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMuted, setIsMuted] = useState(() => {
    return true;
  });

  useEffect(() => {
    const isMutedSavedValue = !!JSON.parse(
      localStorage.getItem(localStorageKey)!
    );

    setIsMuted(isMutedSavedValue);
  }, []);

  const setAndSave = (value: boolean) => {
    setIsMuted(value);
    localStorage.setItem(localStorageKey, `${value}`);
  };

  return (
    <Context.Provider value={{ isMuted, setIsMuted: setAndSave }}>
      {children}
    </Context.Provider>
  );
};

export const useBakgroundMusic = () => {
  const context = useContext(Context);

  if (!context) {
    throw Error('Background music context cannot be unfined');
  }

  return context;
};

export default BackgroundMusicContext;
