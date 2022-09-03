import Image from "next/image";

import MetamakSVG from "@/public/assets/svg/metamask.svg";
import NotificationSVG from "@/public/assets/svg/notification.svg";
import WalletconnectSVG from "@/public/assets/svg/walletconnect-logo.svg";

const Metamask = () => <Image src={MetamakSVG} />;
const Walletconnect = () => <Image src={WalletconnectSVG} />;
const Notification = () => <Image src={NotificationSVG} />;

export { Metamask, Notification, Walletconnect };
