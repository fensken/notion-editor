import { FC } from "react";
import LiveBlocksProvider from "@/providers/LiveBlocksProvider";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
};

export default PageLayout;
