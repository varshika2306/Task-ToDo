import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService.js';

export function useDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);
  const [loadedVersion, setLoadedVersion] = useState(null);

  const isLoading = loadedVersion !== version;

  useEffect(() => {
    let ignore = false;

    dashboardService
      .getSummary()
      .then((result) => {
        if (ignore) return;
        setData(result);
        setError(null);
        setLoadedVersion(version);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
          setLoadedVersion(version);
        }
      });

    return () => {
      ignore = true;
    };
  }, [version]);

  const refetch = useCallback(() => setVersion((v) => v + 1), []);

  return { data, isLoading, error, refetch };
}