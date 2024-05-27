import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import gql from "graphql-tag";
import { useEffect } from "react";
import { currentBlockAtom } from "@/components/Market/Market";

const CURRENT_BLOCK_QUERY = gql`
  query height {
    squidStatus {
      height
    }
  }
`;

export const useCurrentBlock = () => {
  const { data, loading, error } = useQuery(CURRENT_BLOCK_QUERY);
  const [, setCurrentBlock] = useAtom(currentBlockAtom);

  useEffect(() => {
    if (data) {
      setCurrentBlock(data.squidStatus.height);
    }
  }, [data, setCurrentBlock]);

  return { loading, error };
};
