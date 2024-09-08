"use client";

import { FC, FormEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteDocument, inviteUserToDocument } from "@/actions/actions";

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
import { Input } from "@/components/ui/input";

type InviteUserProps = {};

const InviteUser: FC<InviteUserProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathname.split("/").pop();

    if (!roomId) return;

    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User added to the document successfully!");
      } else {
        toast.error("Failed to add user to the document!");
      }
    });
  };

  return (
    <Dialog>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a user to collaborate!</DialogTitle>

          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>

        <form className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" disabled={!email || isPending}>
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
