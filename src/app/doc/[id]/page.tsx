import { FC } from "react";

import Document from "@/components/Document";

type DocumentPageProps = {
  params: {
    id: string;
  };
};

const DocumentPage: FC<DocumentPageProps> = ({ params }) => {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={params.id} />
    </div>
  );
};

export default DocumentPage;
