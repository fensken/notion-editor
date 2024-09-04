import { FC } from "react";
import { auth } from "@clerk/nextjs/server";

import RoomProvider from "@/providers/RoomProvider";

type DocLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const DocLayout: FC<DocLayoutProps> = ({ children, params }) => {
  auth().protect();

  return <RoomProvider roomId={params.id}>{children}</RoomProvider>;
};

export default DocLayout;
