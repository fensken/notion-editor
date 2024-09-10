"use client";

import { FC, FormEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Y from "yjs";
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
import { MessageChannel } from "worker_threads";
import { BotIcon, MessageCircle, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

type ChatToDocumentProps = {
  doc: Y.Doc;
};

const ChatToDocument: FC<ChatToDocumentProps> = ({ doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();

    setQuestion(input);

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            question: input,
          }),
        }
      );

      if (res.ok) {
        const { message } = await res.json();

        setInput("");
        setSummary(message);

        toast.success("Question asked successfully!");
      }
    });
  };

  return (
    <Dialog>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode /> Chat to document
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to the Document!</DialogTitle>

          <DialogDescription>
            Ask a question and chat to the document with AI.
          </DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-auto p-5 gap-2 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />

              <p className="font-bold">
                GPT {isPending ? "is thinking..." : "Says: "}
              </p>
            </div>

            <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder="i.e What is this about?"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button type="submit" disabled={!input || isPending}>
            {isPending ? "Asking..." : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatToDocument;
