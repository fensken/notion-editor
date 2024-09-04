"use client";

import { FC } from "react";
import {
  RoomProvider as RoomProviderWrapper,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import LiveCursorProvider from "./LiveCursorProvider";
import LoadingSpinner from "@/components/LoadingSpinner";

type RoomProviderProps = {
  children: React.ReactNode;
  roomId: string;
};

const RoomProvider: FC<RoomProviderProps> = ({ roomId, children }) => {
  return (
    <RoomProviderWrapper id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};

export default RoomProvider;
