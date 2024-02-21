import { useContractWrite } from "wagmi";
import { marketContract } from "../constants";
import { abi } from "../abi";
import { useAtom } from "jotai";
import { selectedMarketIdAtom } from "@/components/Market/Market";
import { parseEther } from "viem";
import toast from "react-hot-toast";
import { handleBlockchainError } from "@/utils/handleBlockchainError";

export const useWithdraw = (amount: number, onSuccessFunc?: Function) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: marketContract as `0x${string}`,
    abi: abi,
    functionName: "withdraw",
    args: [BigInt(selectedMarketId), parseEther(amount.toString())],
    onError(error) {
      handleBlockchainError(error.stack!);
    },

    onSuccess() {
      onSuccessFunc && onSuccessFunc();
      toast.success("Withdrawal was successfully made!", {
        duration: 4000,
      });
    },
  });

  return { data, isLoading, isSuccess, write };
};
