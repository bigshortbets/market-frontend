import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../public/logo.svg";
import { ConnectButton } from "../ConnectButton";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { UIConfiguration } from "../Market/UIConfiguration";
import { CurrentNetworkTab } from "./CurrentNetworkTab";

export const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { isConnected } = useAccount();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain?.id != 2137) {
      switchNetwork?.(2137);
    }
  }, [isConnected]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-primary-bg w-full h-[60px] ">
      <div className="mx-auto max-w-[1800px] flex justify-between h-full px-6 items-center">
        <Image src={logo} alt="BigShortBet$ Logo" width={50} priority />
        <div className="flex items-center gap-4">
          {isConnected && <CurrentNetworkTab />}
          <UIConfiguration />
          {isClient && <ConnectButton />}
        </div>
      </div>
    </nav>
  );
};
