"use client";

import { FC } from "react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarsProps = {};

const Avatars: FC<AvatarsProps> = ({}) => {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm font-light">Users currently editing this page</p>

      <div className="flex -space-x-5">
        {all.map((user, i) => (
          <TooltipProvider key={user?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="border-2 hover:z-50">
                  <AvatarImage src={user?.info.avatar} />
                  <AvatarFallback>
                    <AvatarFallback className="bg-rose-400">
                      {user?.info.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>

              <TooltipContent>
                <p>{self?.id === user?.id ? "You" : user?.info.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default Avatars;
