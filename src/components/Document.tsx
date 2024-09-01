"use client";

import { FC, FormEvent, useEffect, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

type DocumentProps = {
  id: string;
};

const Document: FC<DocumentProps> = ({ id }) => {
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

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
    <div>
      <div className="max-w-6xl flex mx-auto justify-between pb-5">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      {/* manage users */}
      {/* avatars */}
      {/* collaborative editor */}
    </div>
  );
};

export default Document;
