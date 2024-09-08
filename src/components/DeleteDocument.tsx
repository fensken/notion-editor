"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteDocument } from "@/actions/actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type DeleteDocumentProps = {};

const DeleteDocument: FC<DeleteDocumentProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = pathname.split("/").pop();

    if (!roomId) return;

    startTransition(async () => {
      const { success } = await deleteDocument(roomId);

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Document deleted successfully!");
      } else {
        toast.error("Failed to delete document. Please try again later.");
      }
    });
  };

  return (
    <Dialog>
      <Button asChild variant="destructive">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>

          <DialogDescription>
            This action will delete the documents and all its contents, removing
            all the users form document as well.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocument;
