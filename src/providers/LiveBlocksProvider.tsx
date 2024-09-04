"use client";

import { FC } from "react";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

type LiveBlocksProviderProps = {
  children: React.ReactNode;
};

const LiveBlocksProvider: FC<LiveBlocksProviderProps> = ({ children }) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("Missing LIVEBLOCKS_PUBLIC_KEY environment variable");
  }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
};

export default LiveBlocksProvider;
