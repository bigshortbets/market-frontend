import { useState, useEffect, useCallback } from 'react';
import { fetchDisplayName } from '@/utils/fetchIdentityInfo';

interface UseDisplayNameResult {
  displayName: string | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useDisplayName(address?: string): UseDisplayNameResult {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!address) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nickname = await fetchDisplayName(address);
      setDisplayName(nickname);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { displayName, isLoading, error, refresh: fetchData };
}
