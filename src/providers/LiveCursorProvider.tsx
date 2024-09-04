"use client";

import { FC, PointerEvent } from "react";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";

import FollowPointer from "@/components/FollowPointer";

type LiveCursorProviderProps = { children: React.ReactNode };

const LiveCursorProvider: FC<LiveCursorProviderProps> = ({ children }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };

    updateMyPresence({ cursor });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info, id }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}

      {children}
    </div>
  );
};

export default LiveCursorProvider;
