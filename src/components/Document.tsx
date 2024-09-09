"use client";

import { FC, FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useOwner } from "@/lib/useOwner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Editor from "@/components/Editor";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

type DocumentProps = {
  id: string;
};

const Document: FC<DocumentProps> = ({ id }) => {
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="max-w-6xl flex mx-auto justify-between pb-5">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {/* isOwner && inviteUser, delete Document */}
          {isOwner && (
            <>
              {/* invite */}
              <InviteUser />

              {/* delete */}
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        {/* manage users */}
        <ManageUsers />

        {/* avatars */}
        <Avatars />
      </div>

      {/* collaborative editor */}
      <Editor />
    </div>
  );
};

export default Document;
