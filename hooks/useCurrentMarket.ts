import { selectedMarketIdAtom } from '@/components/Market/Market';
import { chosenMarketAtom, marketsAtom } from '@/store/store';
import { findMarketById } from '@/utils/findMarketById';
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const useCurrentMarket = () => {
  const [markets] = useAtom(marketsAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const [_, setChosenMarket] = useAtom(chosenMarketAtom);
  useEffect(() => {
    const chosenMarket = findMarketById(markets, selectedMarketId);
    if (chosenMarket) {
      setChosenMarket(chosenMarket);
    }
  }, [selectedMarketId, markets, setChosenMarket]);
};
