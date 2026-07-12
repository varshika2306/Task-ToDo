import { useEffect, useState } from 'react';
import { useAuth } from './useAuth.js';
import { userService } from '../services/userService.js';

export function useProfile() {
  const { user, setUser } = useAuth();
  const [error, setError] = useState(null);
  const [loadedOnce, setLoadedOnce] = useState(false);

  useEffect(() => {
    if (user || loadedOnce) return undefined;

    let ignore = false;

    userService
      .getMe()
      .then((me) => {
        if (ignore) return;
        setUser(me);
        setLoadedOnce(true);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
          setLoadedOnce(true);
        }
      });

    return () => {
      ignore = true;
    };
  }, [user, loadedOnce, setUser]);

  const isLoading = !user && !loadedOnce && !error;

  return { user, isLoading, error };
}