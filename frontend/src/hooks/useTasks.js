import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService.js';

export function useTasks(params = {}) {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);
  const [loadedKey, setLoadedKey] = useState(null);

  const paramsKey = JSON.stringify(params);
  const requestKey = `${paramsKey}::${version}`;
  const isLoading = loadedKey !== requestKey;

  useEffect(() => {
    let ignore = false;

    taskService
      .getTasks(JSON.parse(paramsKey))
      .then((result) => {
        if (ignore) return;
        // Backend always returns { page, limit, total, data }
        setTasks(result.data || []);
        setMeta({ page: result.page, limit: result.limit, total: result.total });
        setError(null);
        setLoadedKey(`${paramsKey}::${version}`);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
          setLoadedKey(`${paramsKey}::${version}`);
        }
      });

    return () => {
      ignore = true;
    };
  }, [paramsKey, version]);

  const refetch = useCallback(() => setVersion((v) => v + 1), []);

  return { tasks, meta, isLoading, error, refetch };
}