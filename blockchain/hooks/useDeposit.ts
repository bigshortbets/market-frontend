import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { marketContract } from "../constants";
import { abi } from "../abi";
import { useAtom } from "jotai";
import { selectedMarketIdAtom } from "@/components/Market/Market";
import { parseEther } from "viem";
import { OrderSideEnum } from "@/components/Market/OrderManager/OrderManager";
import toast from "react-hot-toast";
import { handleBlockchainError } from "@/utils/handleBlockchainError";

export const useDeposit = (amount: number) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: marketContract as `0x${string}`,
    abi: abi,
    functionName: "deposit",
    args: [BigInt(selectedMarketId), parseEther(amount.toString())],
    onError(error) {
      handleBlockchainError(error.stack!);
    },

    onSuccess() {
      toast.success("Deposit was successfully made!", {
        duration: 4000,
      });
    },
  });

  return { data, isLoading, isSuccess, write };
};
