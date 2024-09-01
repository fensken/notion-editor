"use client";

import { FC, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createNewDocument } from "@/actions/actions";

import { Button } from "@/components/ui/button";

type NewDocumentButtonProps = {};

const NewDocumentButton: FC<NewDocumentButtonProps> = ({}) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleCreateDocument = () => {
    startTransition(async () => {
      // create new document
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button disabled={isPending} onClick={handleCreateDocument}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
};

export default NewDocumentButton;
