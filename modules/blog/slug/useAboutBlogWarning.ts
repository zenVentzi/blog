import { useState } from 'react';

const showWarningKey = 'showAboutBlogWarning';

const useAboutBlogWarning = () => {
  const [showWarning, setShowWarning] = useState(() => {
    const isClient = typeof window !== 'undefined';

    if (isClient) {
      const resString = localStorage.getItem(showWarningKey);

      if (resString !== null) {
        const res = JSON.parse(resString);
        return res;
      }

      // warning is disabled with a click
      localStorage.setItem(showWarningKey, 'true');
      return true;
    }

    // SSG
    return false;
  });

  const disableWarning = () => {
    localStorage.setItem(showWarningKey, 'false');
  };

  const enableWarning = () => {
    localStorage.setItem(showWarningKey, 'true');
  };

  const closeWarning = () => {
    setShowWarning(false);
  };

  return {
    showAboutBlogWarning: showWarning,
    enableWarning,
    disableWarning,
    closeWarning,
  };
};

export default useAboutBlogWarning;
